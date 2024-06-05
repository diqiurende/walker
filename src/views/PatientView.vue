<script setup>
import {useRouter} from "vue-router";
import MainLogo from "@/components/icons/MainLogo.vue";
import Card from "@/views/Card.vue";
const router= useRouter()
function  toInquiry(){
  router.push({
    path:'/identify'
  })
}
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header style="position: fixed;top: 0;width: 100vw;z-index: 20;background: white">
        <el-row style="height: 8vh;background: white">
          <el-col :span="6">
            <p class="flagFont" @click="toHome">
              <el-icon :size="size" style="color:#eac922;">
                <Help/>
              </el-icon>
              行人重识别
            </p>
          </el-col>
          <el-col :span="5">&nbsp;
          </el-col>
          <el-col :span="2">
            <p class="menuFont2" @click="toInquiry">识别</p>
          </el-col>
          <el-col :span="2">
            <p class="menuFont2"> 系统设置</p>
          </el-col>
          <el-col :span="2">
            <p class="menuFont2"> 历史记录</p>
          </el-col>
          <el-col :span="2">
            <p class="menuFont2"> 关于我们</p>
          </el-col>
          <el-col :span="2">
            <p class="menuFont2"> 联系我们</p>
          </el-col>

        </el-row>
      </el-header>
      <div style="height: 85vh;width: 99vw">&nbsp;</div>
      <el-main style="background: white;border-radius: 18px;width: 99vw; overflow-y:hidden; overflow-x:hidden">
        <el-row >
          <el-col :span="10" >
            <el-carousel  arrow="never" height="60vh">
              <el-carousel-item  style="background: whitesmoke;border-radius: 15px" >
                <el-image src="src/assets/walkerjpg.jpg" style="border-radius: 15px"></el-image>
                <div
                    style="background: whitesmoke;
                    width: 100%;
                    height: 30vh;
"
                >
                  <p class="aliTitle1">智能安防已进入行业大发展时期&nbsp;</p>
                  <p class="aliDescription" style="height: 3vh;font-size: 1.1vw;margin-left: 8vw;color: #0e0e0e">传统监控分析投入大，罪犯识别准确率低 </p>
                  <p style="margin: 1vw">随着城市化进程的加快和人口流动的增多，人
                    口走丢、走失与走散频次上升。《中国走失人
                    口白皮书(2020)》数据显示，在整个 2020 年期
                    间，我国走失人次达到了 100 万，每天处于或
                    经历走失状态的人次为 2739</p>
                </div>

              </el-carousel-item>
            </el-carousel>
          </el-col>

          <el-col :span="1" style="display: flex;justify-content: center;align-items: center">
            <el-divider direction="vertical" style="height: 100%;" />
          </el-col>

          <el-col :span="6">
            <p class="aliTitle" style="background: transparent; font-size: 0.9vw">
              《“十四五” 城乡社区服务体系建设规划》
            </p>
            <p class="aliDescription" >
                &nbsp; &nbsp;国务院印发《“十四五”城乡社区服务体系建设规划》中指
              出，推动社区物业设备设施、安防等智能化改造升级。促进人工智能和实体经济
              深度融合，要把握新一代人工智能发展的特点，坚持以市场需求为导向，以产业
              应用为目标，深化改革创新，优化制度环境，激发企业创新活力和内生动力。
              <br /> <br /> <br /> <br /> <br /> <br /> <br />

            </p>
            <!--            <el-image src="src/assets/camera.png" style="border-radius: 15px;margin-top: 12vh"></el-image>-->
            <Card data-image="src/assets/camera.png"> </Card>
          </el-col>
          <el-col :span="1" style="display: flex;justify-content: center;align-items: center">
            <el-divider direction="vertical" style="height: 100%;" />
          </el-col>

          <el-col :span="6">
            <p class="aliTitle" style="background: transparent">
              YOLOv8：行人重识别的技术突破
            </p>
            <p class="aliDescription" >
              采用了最新的 YOLOv8（You
              Only Look Once version 8）技术，这是一种先进的目标检测算法，它能够在保
              持高速处理的同时，提供高精度的物体识别。在面对海量图像分类的挑战时，
              YOLOv8 通过其强大的特征提取能力和高效的分类策略，能够快速准确地将图像
              中的不同元素归类。这意味着即使在复杂的公共环境中，该系统也能够有效地识
              别出人、车辆和其他障碍物，从而为盲人用户提供精确的导航信息。通过云端的
              集中处理，YOLOv8 技术不仅提升了监控图像的处理质量，也为盲人用户带来了
              更为安全和便捷的出行体验。 <br />

            </p>
            <!--            <el-image fit="cover" src="src/assets/yolo.png" style="border-radius: 15px;margin-top: 14vh;height: 20vh;display: flex;justify-content: center"></el-image>-->
            <Card data-image="src/assets/yolo.png"> </Card>
          </el-col>

        </el-row>
        <el-row>
          <el-col>
            <div style="height: 10vh;width: 100vw;">&nbsp;</div>
          </el-col>
        </el-row>
        <el-row style="background: #228def;">
          <el-col>
            <div style="height: 60vh;width: 100vw;left: 0">
              &nbsp;
              <p class="flagFont" style="color:white; position: absolute; left: 5vw; height: 5vh; font-size: 2.5vw; display: flex; align-items: center;">
                <el-icon size="130" style="color:#eac922;">
                  <Help/>
                </el-icon>
                行人重识别
              </p>

            </div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
  <div class="videoContainer">
    <video class="fullscreenVideo" id="bgVid" playsinline="" autoplay="" muted="" loop="">
      <source
          src="../assets/walker_video.mp4"
          type="video/mp4">
    </video>
  </div>

</template>

<style scoped>
.flagFont{
  font-weight: bolder;
  font-size: 1.6vw;
  color: #228def;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: YouYuan;
  cursor: pointer;
}
.title {
  font-size: 2.8vw;
  font-weight: bolder;
  display: flex;
  align-items: center;
  justify-content: center;
}

.menuFont2 {
  font-size: 1.3vw;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.description1 {
  font-size: 1.8vh;
  font-weight: lighter;
  display: flex;
  align-items: center;
  justify-content: center;
}
.aliTitle{
  background: whitesmoke;
  padding-left: 2.6vw;
  padding-right: 2.6vw;
  display: flex;
  justify-content: center;
  font-size: 1vw;


  font-weight: bolder;
}
.aliTitle1{
  background: whitesmoke;
  padding-left: 2.6vw;
  padding-right: 2.6vw;
  display: flex;
  justify-content: center;
  font-size: 2vw;


  font-weight: bolder;
}
.aliDescription{
  padding: 0 1vw 0 1vw;
  font-size: 2vh;
  text-overflow: ellipsis;
  word-break: break-all;
  -webkit-line-clamp: 2;
}
.common-layout {
  margin: 0 0 0 0;
  width: 100vw;
  display: flex;
}

.videoContainer {
  top: 8vh;
  left: 0;
  position: fixed;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  z-index: -100;

}

.fullscreenVideo {
  overflow: hidden;
  width: 100vw;
  height: 80vh;
}

.underclass {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>