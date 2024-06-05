<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage, ElLoading } from 'element-plus';
import axios from 'axios';
import { PictureRounded } from "@element-plus/icons-vue";
import MainLogo from "@/components/icons/MainLogo.vue";
import VideoPlayer from "@/views/VideoPlayer.vue"

const videoUrl = ref("https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8");
const fileList = ref([]); // 存储文件列表
const videoUrls = ref([]); // 存储上传和处理后的视频URL
let loadingInstance = null; // 存储加载实例





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

  // 显示加载提示
  loadingInstance = ElLoading.service({
    lock: true,
    text: '正在检测...',
    background: 'rgba(0, 0, 0, 0.7)',
  });

  const formData = new FormData();
  formData.append('video1', fileList.value[0].raw);
  formData.append('video2', fileList.value[1].raw);

  axios.post(backUpload, formData, {
    headers
  })
      .then(response => {
        ElMessage.success('视频检测完成');
        videoUrls.value = [response.data.video1_url, response.data.video2_url, response.data.output_url];
      })
      .catch(error => {
        ElMessage.error(`视频检测失败: ${error.message}`);
      })
      .finally(() => {
        // 隐藏加载提示
        if (loadingInstance) {
          loadingInstance.close();
        }
      });
};

// 文件状态改变时的处理，包括上传成功和失败
const handleChange = (file, newFileList) => {
  fileList.value = newFileList;

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
                    <PictureRounded />
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
          <el-col :span="6">
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
            <el-button type="primary" style="display: flex;justify-items: center;align-items: center;margin-left: 12vw" @click="uploadVideos">开始检测</el-button>

<!--            <div v-if="videoUrls.length" class="original-videos">-->
<!--              <div v-for="(url, index) in videoUrls" :key="index" class="video-container">-->
<!--                <video width="320" height="240" controls>-->
<!--                  <source :src="url" :type="url.includes('.avi') ? 'video/x-msvideo' : 'video/mp4'">-->
<!--                  Your browser does not support the video tag.-->
<!--                </video>-->
<!--              </div>-->
<!--            </div>-->

          </el-col>

          <el-col :span="9">
                11111111111111
            <div style="display: flex;flex-direction: row;background-color: #a8abb2">
              <VideoPlayer id="a"></VideoPlayer>
            </div>

              <VideoPlayer id="b"></VideoPlayer>

          </el-col>

          <el-col  :span="8">
                2222222222222
            <div style="display: flex;flex-direction: row;background-color: #a8abb2">
              <VideoPlayer></VideoPlayer>
            </div>

            <VideoPlayer></VideoPlayer>

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
  margin: 0;
}

.el-icon--upload {
  font-size: 30px;
  color: #ccc;
}
</style>
