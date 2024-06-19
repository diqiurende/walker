<script setup>
import {ref, onMounted} from 'vue';
import {ElMessage, ElLoading} from 'element-plus';
import axios from 'axios';
import {PictureRounded} from "@element-plus/icons-vue";
import MainLogo from "@/components/icons/MainLogo.vue";

const videoUrl = ref("https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8");
const fileList = ref([]); // 存储文件列表
const videoUrls = ref([]); // 存储上传和处理后的视频URL
let loadingInstance = null; // 存储加载实例

let isIdentify1 = ref(false)//是否第一个框框已经识别
let isIdentify2 = ref(false)//是否第二个框框已经识别
let outputPath = ref('/src/assets/video1_20240608_115441new.mp4');
let output2=ref('src/assets/video2_20240608_195430new.mp4')
let resultvideo=ref('src/assets/result_20240615_171121new.mp4')
let isResult =ref(false)
const isProcessing = ref(false);
const backUpload = "http://localhost:5000/process_videos";

const headers = {
  'Content-Type': 'multipart/form-data'
};

const video1File = ref(null);
const video2File = ref(null);

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
const handvideo1 = async (file) => {
  isIdentify1.value = true;
  console.log(isIdentify1.value);
  video1File.value = file.raw;
  const formData = new FormData();
  formData.append('video', file.raw);

  try {
    const response = await axios.post('http://localhost:5000/upload_video1', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    // 获取完整的 outputpath
    const fullPath = response.data.outputpath;
    let player = document.querySelector('#video1')

    // 截取 assets 目录及其后面的文件名部分
    const startIndex = fullPath.indexOf('assets\\');
     outputPath.value = fullPath.substring(startIndex);
    // 替换反斜杠为斜杠，并添加 ../ 表示上一级目录
    outputPath.value = outputPath.value.replace(/\\/g, '/');
    outputPath.value = `/src/${outputPath.value}`;
    player.src = outputPath. value
    player.play()
    console.log(outputPath.value)

  } catch (error) {
    ElMessage.error(`第一份视频上传失败: ${error.message}`);
    isIdentify1.value = false;
  }


};

const  handvideo2 =async (file) => {
  isProcessing.value = true;
  isIdentify2.value = true;
  video2File.value = file.raw;
  console.log(video2File.value);
  const formData = new FormData();
  formData.append('video', file.raw);

  try {
    const response = await axios.post('http://localhost:5000/upload_video2', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    // 获取完整的 outputpath
    const fullPath = response.data.outputpath;
    let player = document.querySelector('#video2')

    // 截取 assets 目录及其后面的文件名部分
    const startIndex = fullPath.indexOf('assets\\');
    output2.value = fullPath.substring(startIndex);
    // 替换反斜杠为斜杠，并添加 ../ 表示上一级目录
    output2.value = output2.value.replace(/\\/g, '/');
    output2.value = `/src/${output2.value}`;
    player.src = output2.value
    player.play()
    console.log(output2.value)

  } catch (error) {
    ElMessage.error(`第一份视频上传失败: ${error.message}`);
    isIdentify2.value = false;
  }
};

// 开始上传视频
async function startPost() {
  const loadingInstance = ElLoading.service({
    lock: true,
    text: '正在检测...',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  });

  isResult=true;

  const formData = new FormData();
  formData.append('video1', video1File.value);
  formData.append('video2', video2File.value);

 try {
   const response = await axios.post(backUpload,formData,{
     headers: {
       'Content-Type': 'multipart/form-data'
     },
     onUploadProgress: (progressEvent) => {
       // 可以根据需要更新进度条
     }
   });
   const fullPath = response.data.output;
   let player = document.querySelector('#video3')

   // 截取 assets 目录及其后面的文件名部分
   const startIndex = fullPath.indexOf('assets\\');
   resultvideo.value = fullPath.substring(startIndex);
   // 替换反斜杠为斜杠，并添加 ../ 表示上一级目录
   resultvideo.value = resultvideo.value.replace(/\\/g, '/');
   resultvideo.value = `/src/${resultvideo.value}`;

   // player.src = resultvideo.value
   // player.play()
   console.log(resultvideo.value)
 } catch (error) {
   ElMessage.error(`视频处理失败: ${error.message}`);
   isResult=false;
 } finally {
   loadingInstance.close();

 }


}
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
                  <el-icon size="25" style="margin: 1vh 0 0 1vw ;color: rgba(15,119,86,0.6)">
                    <PictureRounded/>
                  </el-icon>
                </el-col>
                <el-col :span="13" style="margin: 1vh 0 0 1vw">
                  <el-container style="flex-direction: column">
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
            <p class="goodText">输入视频1</p>
            <div v-if="!isIdentify1">
              <el-upload
                  :before-upload="beforeUpload"
                  :on-change="handvideo1"
                  :limit="2"
                  :auto-upload="false"
                  :on-success="uploadSuccess1"
                  drag
                  multiple
                  name="video"
                  style="margin: 20px; border: 1px dashed #ccc;"

              >
                <div style="width: 100%;height: 30vh;
              display: flex;align-items: center;justify-content: center;
              flex-direction: column;">
                  <el-icon class="el-icon--upload">
                    <PictureRounded/>
                  </el-icon>
                  <div>
                    把第一个文件拖拽至此
                  </div>
                </div>
              </el-upload>


            </div>
            <div v-else>
              <video
                  id="video1" playsinline autoplay muted loop  controls style="width: 23vw;height: 35vh;margin-top: 10vh"
                  :src="outputPath" type="video/mp4">
              </video>

            </div>
          </el-col>

          <el-col :span="6">
            <p class="goodText">输入视频2</p>
            <div v-if="!isIdentify2">
              <el-upload
                  :before-upload="beforeUpload"
                  :on-change="handvideo2"
                  :limit="1"
                  :auto-upload="false"
                  :on-success="uploadSuccess1"
                  drag
                  multiple
                  name="video"
                  style="margin: 20px; border: 1px dashed #ccc;"

              >
                <div style="width: 100%;height: 30vh;
              display: flex;align-items: center;justify-content: center;
              flex-direction: column;">
                  <el-icon class="el-icon--upload">
                    <PictureRounded/>
                  </el-icon>
                  <div>
                    把第二个文件拖拽至此
                  </div>
                </div>
              </el-upload>


            </div>
            <div v-else >
              <video  id="video2" playsinline="" autoplay="" muted="" loop="" controls
                     style="width: 23vw;height: 35vh;margin-top: 10vh;margin-left: 0.1vw">
                <source
                    :src="output2"
                    type="video/mp4">
              </video>
            </div>
            <el-button type="primary" style="display: flex;justify-items: center;align-items: center;margin-left: -3vw"
                       @click="startPost">开始检测
            </el-button>
            <el-dialog :visible.sync="isProcessing" title="正在检测">
              <el-progress :percentage="uploadPercentage" />
            </el-dialog>
          </el-col>
          <el-col :span="1">

          </el-col>
          <el-col :span="11">
            <p class="goodText">输出视频</p>

            <div v-if="isResult"  >
              <video id="video3" playsinline autoplay muted loop controls style="margin-left:7vw;width: 30vw;height: 35vh;margin-top: 10vh">
                <source :src="resultvideo"   type="video/mp4">
              </video>
            </div>
            <div v-else>
              {{resultvideo}}
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
  margin: 0;
}

.el-icon--upload {
  font-size: 30px;
  color: #ccc;
}

.goodText {
  background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
  break-word-webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bolder;
  font-size: 1.6vw;
  display: flex;
  justify-content: center
}
</style>
