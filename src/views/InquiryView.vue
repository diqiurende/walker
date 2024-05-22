<script setup>

import MainLogoWhite from "@/components/icons/MainLogoWhite.vue";
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { ElMessage } from 'element-plus'; // 引入Element Plus的消息提示
import DoctorBackgrond from '@/assets/DoctorBackgrond.jpg'


const fileList = ref([]); // 用于存储文件列表
const uploadedImageUrl = ref(''); // 存储上传成功后的图片URL
let backUpload="http://localhost:8310/api/images/upload"
// 图片上传前的处理
const beforeUpload = (rawFile) => {
  const isJPGorPNG = rawFile.type === 'image/jpeg' || rawFile.type === 'image/png';
  const isLt2M = rawFile.size / 1024 / 1024 < 1000;

  if (!isJPGorPNG) {
    ElMessage.error('上传图片只能是 JPG 或 PNG 格式!');
  }
  if (!isLt2M) {
    ElMessage.error('图片大小不能超过 1000MB!');
  }
  return isJPGorPNG && isLt2M;
};

// 文件状态改变时的处理，包括上传成功和失败
const handleChange = (uploadFile, fileList) => {
  if (uploadFile.status === 'success') {
    handleUploadSuccess(uploadFile.response.data.url);
  } else if (uploadFile.status === 'failed') {
    ElMessage.error(`文件上传失败: ${uploadFile.message}`);
  }
};

// 处理上传成功的逻辑
// const handleUploadSuccess = (url) => {
//   uploadedImageUrl.value = url;
// };

// 文件超出限制时的处理
const handleExceed = (files, fileList) => {
  ElMessage.warning(`当前限制选择 ${files.length} 个文件，已选择 ${files.length + fileList.length} 个文件`);
};

// 文件移除时的处理
const handleRemove = (file, fileList) => {
  // 这里可以根据需要添加删除逻辑，比如从服务器删除文件
  console.log('文件被移除:', file);
};

// 文件预览的处理（如果需要）
const handlePreview = (file) => {
  console.log('预览文件:', file);
};
function onSuccess(res){
  ElMessage({
    message: '上传文件成功',
    type: 'success',
  })
  uploadedImageUrl.value=res
  console.log(uploadedImageUrl.value)
  window.open(uploadedImageUrl.value)
}
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header >
        <el-row>
          <el-col :span="6">
            <main-logo-white size="50"></main-logo-white>
          </el-col>
        </el-row>
      </el-header>
<!--      <el-main style="background-color: #f8f8f8">-->
<!--        <el-row>-->
<!--            <p class="title2">健康医典</p>-->
<!--            <p class="description2">&nbsp;&nbsp;|&nbsp;&nbsp;权威专家    权威机构    三审三校</p>-->
<!--        </el-row>-->
<!--      </el-main>-->
      <el-main>
        <el-row>
          <el-col :span="24">
            <p style="
            font-size: 4vw;
            height: 10vh;
            width: 97vw;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #55c048;;
            font-weight: bolder;
            letter-spacing: 1vw;
"
            >云大健康 医你所病</p>
          </el-col>

        </el-row>
        <el-row>
          <el-col :offset="6" :span="10">
            <el-input
                v-model="uploadedImageUrl"
                placeholder="你的图片网址在这里显示"
                size="large" style="
            border-radius: 70px;
            border:  #55c048 1px solid;
"
            >
            </el-input>
          </el-col>
          <el-col :span="3">
            <el-upload
                :action="backUpload"
                :before-upload="beforeUpload"
                :on-success="onSuccess"
                :limit="3"
                name="image"

            >
            <el-button type="success" size="large" style="width: 7vw">
              检查一下
            </el-button>
<!--              :auto-upload="true"-->
<!--              :on-preview="handlePreview"-->
<!--              :on-remove="handleRemove"-->
<!--              :before-upload="beforeUpload"-->
<!--              :on-exceed="handleExceed"-->
<!--              :file-list="fileList"-->
<!--              :on-change="handleChange"-->
            </el-upload>
            <div v-if="uploadedImageUrl">
              <img :src="uploadedImageUrl" alt="Uploaded Image" style="=width: 10vw;height: 10vh">
            </div>
          </el-col>

        </el-row>

      </el-main>
    </el-container>
    <el-image class="backgrondTopImg" :src="DoctorBackgrond" fit="cover">

    </el-image>
  </div>
</template>

<style scoped>
.common-layout {
  margin: 0 0 0 0;
  width: 100vw;
  display: flex;
}
.flagFont{
  font-weight: bolder;
  font-size: 1.6vw;
  color: #55c048;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: YouYuan;
}
.title2{
  font-size: 20px;
  color: #1f1f1f;
  letter-spacing: 0;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
}
.description2{
  font-size: 14px;
  color: #858585;
  letter-spacing: 0;
  font-weight: 400;
  display: flex;
  justify-content: center;
  align-items: center;
}
.backgrondTopImg{
  position: fixed;
  top: 0vh;
  height: 99.5vh;
  width: 100vw;
  z-index: -1;
.tilteTop{



}

}
</style>