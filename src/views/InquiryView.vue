<script setup>


import { ref, onMounted } from 'vue';

import { ElMessage } from 'element-plus';
import MainLogo from "@/components/icons/MainLogo.vue"; // 引入Element Plus的消息提示



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
          <el-col :span="3">
            <main-logo size="30"></main-logo>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-row>
          <el-col :span="11">
            <el-container
                style="
                width:100%;
                height: 16vh;
                margin: 2vh 0.6vw 2vh 0.6vw;
                padding: 2vh 0.6vw 2vh 0.6vw;
                background-color: rgba(0,153,102,.05);
                border-radius: 5px;
"

            >

            </el-container>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-upload
                :action="backUpload"
                :before-upload="beforeUpload"
                :on-success="onSuccess"
                :limit="3"
                drag
                name="image"
            >
              <div style="width: 100%;height: 20vh;
              margin: 2vh 1vw 2vh 1vw;
              display: flex;align-items: center;justify-content: center;
              flex-direction: column;">
                <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                <div >
                  把文件拖拽至此
                </div>
              </div>

            </el-upload>
            <div v-if="uploadedImageUrl">
              <img :src="uploadedImageUrl" alt="Uploaded Image" style="=width: 10vw;height: 10vh">
            </div>
          </el-col>

          <el-col :span="11" :offset="1">
            <el-upload
                drag
                @click="null"
                :auto-upload="false"
                :disabled="true"
            >
              <div style="width: 100%;height: 20vh;
              margin: 2vh 1vw 2vh 1vw;
              display: flex;align-items: center;justify-content: center;
              flex-direction: column;">
                <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                <div >
                  在这显示图片
                </div>
              </div>

            </el-upload>
            <div v-if="uploadedImageUrl">
              <img :src="uploadedImageUrl" alt="Uploaded Image" style="=width: 10vw;height: 10vh">
            </div>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="11">
            <el-upload
                :action="backUpload"
                :before-upload="beforeUpload"
                :on-success="onSuccess"
                :limit="3"
                drag
                name="image"
            >
              <div style="width: 100%;height: 20vh;
              margin: 2vh 1vw 2vh 1vw;
              display: flex;align-items: center;justify-content: center;
              flex-direction: column;">
                <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                <div >
                  把文件拖拽至此
                </div>
              </div>

            </el-upload>
            <div v-if="uploadedImageUrl">
              <img :src="uploadedImageUrl" alt="Uploaded Image" style="=width: 10vw;height: 10vh">
            </div>
          </el-col>

          <el-col :span="11" :offset="1">
            <el-upload
                drag
                @click="null"
                :auto-upload="false"
                :disabled="true"
            >
              <div style="width: 100%;height: 20vh;
              margin: 2vh 1vw 2vh 1vw;
              display: flex;align-items: center;justify-content: center;
              flex-direction: column;">
                <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                <div >
                  在这显示图片
                </div>
              </div>

            </el-upload>
            <div v-if="uploadedImageUrl">
              <img :src="uploadedImageUrl" alt="Uploaded Image" style="=width: 10vw;height: 10vh">
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