<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import axios from 'axios';
import { PictureRounded } from "@element-plus/icons-vue";
import MainLogo from "@/components/icons/MainLogo.vue";

const fileList = ref([]); // 存储文件列表
const uploadedVideoUrl = ref(''); // 存储上传成功后的视频URL
const originalVideoUrls=ref([]);//原始视频url
const backUpload = "http://localhost:5000/process_videos";

const headers = {
  'Content-Type': 'multipart/form-data'
};

// 视频上传前的处理
const beforeUpload = (rawFile) => {
  const fileType = rawFile.type;
  const isVideo = fileType.includes('video');
  const isLt1GB = rawFile.size / 1024 / 1024 < 1000;

  if (!isVideo) {
    ElMessage.error('只能上传视频文件！');
    return false;
  }
  if (!isLt1GB) {
    ElMessage.error('视频大小不能超过 1000MB!');
    return false;
  }
  return true;
};
// 自定义上传方法
const uploadVideos = () => {
  if (fileList.value.length !== 2) {
    ElMessage.error('请上传两个视频文件');
    return;
  }
  const formData = new FormData();
  formData.append('video1', fileList.value[0].raw);
  formData.append('video2', fileList.value[1].raw);

  axios.post(backUpload, formData, {
    headers,
    responseType: 'blob'
  })
      .then(response => {
        ElMessage.success('视频检测完成');
        uploadedVideoUrl.value = URL.createObjectURL(response.data);
      })
      .catch(error => {
        ElMessage.error(`视频检测失败: ${error.message}`);
      });
};

// 文件状态改变时的处理，包括上传成功和失败
const handleChange = (file, newFileList) => {
  fileList.value = newFileList;
  originalVideoUrls.value = [];
  newFileList.forEach(file => {
    const reader = new FileReader();
    reader.onload = (e) => {
      originalVideoUrls.value.push(URL.createObjectURL(file.raw));
      console.log('视频URL:', URL.createObjectURL(file.raw)); // 在这里输出视频的 URL
    };
    reader.readAsArrayBuffer(file.raw);
  });

  if (file.status === 'success') {
    ElMessage.success('文件上传成功');
  } else if (file.status === 'fail') {
    ElMessage.error('文件上传失败');
  }
};

</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="3">
            <main-logo size="30"></main-logo>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-row>
          <el-col :span="12">
            <el-container
                style="
                width:100%;
                height: 16vh;
                margin: 2vh 0.6vw 2vh 0.6vw;
                padding: 2vh 0.6vw 2vh 0.6vw;
                background-color: rgba(0,153,102,.05);
                border-radius: 5px;
                flex-direction: column;
"

            >
              <el-row style="width: 100%">
                <el-col :span="2">
                  <el-icon size="25" style="margin: 1vh 0 0 1vw ;color: rgba(15,119,86,0.6)"   >
                    <PictureFilled />
                  </el-icon>
                </el-col>
                <el-col :span="13" style="margin: 1vh 0 0 1vw">
                  <el-container style="flex-direction: column" >
                    <el-row style="font-weight: bold;font-size: 1.0vw">
                      识别视频
                    </el-row>
                    <el-row style="font-weight: lighter;font-size: 1.0vw;margin-top: 1vh">
                      观察上传的两个视频
                    </el-row>
                    <el-row style="font-weight: lighter;font-size: 1.0vw;margin-top: 1vh">
                      找到被重识别的行人
                    </el-row>
                  </el-container>
                </el-col>
              </el-row>

            </el-container>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-upload
                :before-upload="beforeUpload"
                :on-change="handleChange"
                :limit="2"
                :auto-upload="false"
                drag
                multiple
                name="video"
                style="margin: 20px; border: 1px dashed #ccc;"
            >
              <div style="width: 100%;height: 40vh;
              display: flex;align-items: center;justify-content: center;
              flex-direction: column;">
                <el-icon class="el-icon--upload">
                  <PictureRounded />
                </el-icon>
                <div>
                  把两个文件拖拽至此
                </div>
              </div>

            </el-upload>
            <el-button type="primary"style="display: flex;justify-items: center;align-items: center;margin-left: 12vw" @click="uploadVideos">开始检测</el-button>

            <div v-if="originalVideoUrls.length" class="original-videos">
              <div v-for="(url, index) in originalVideoUrls" :key="index" class="video-container">
                <video width="320" height="240" controls>
                  <source src="http://localhost:5173/30feaa84-50a2-4165-8858-568e1b681117" type="video/mp4">
                  Your browser does not support the video tag.
                </video>


              </div>
            </div>
          </el-col>




        </el-row>

      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
.common-layout {
  margin: 0 0 0 0;
  width: 100vw;
  display: flex;
}

.flagFont {
  font-weight: bolder;
  font-size: 1.6vw;
  color: #55c048;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: YouYuan;
}

.title2 {
  font-size: 20px;
  color: #1f1f1f;
  letter-spacing: 0;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
}

.description2 {
  font-size: 14px;
  color: #858585;
  letter-spacing: 0;
  font-weight: 400;
  display: flex;
  justify-content: center;
  align-items: center;
}

.backgrondTopImg {
  position: fixed;
  top: 0vh;
  height: 99.5vh;
  width: 100vw;
  z-index: -1;
}
.common-layout{
  height: 100vh;
  background-color: rgb(248, 248, 248)
}
.original-videos {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.video-container {
  margin: 10px;
}
</style>