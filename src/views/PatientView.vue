<script setup>
import {useRouter} from "vue-router";
import MainLogo from "@/components/icons/MainLogo.vue";
const router= useRouter()
function  toInquiry(){
  router.push({
    path:'/inquiry'
  })
}
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header style="position: fixed;top: 0;width: 100vw;z-index: 20;background: white">
        <el-row style="height: 8vh;background: white">
          <el-col :span="6">
            <main-logo></main-logo>
          </el-col>
          <el-col :span="5">&nbsp;
          </el-col>
          <el-col :span="2">
            <p class="menuFont2" @click="toInquiry">问诊</p>
          </el-col>
          <el-col :span="2">
            <p class="menuFont2"> 关于我们</p>
          </el-col>
          <el-col :span="2">
            <p class="menuFont2"> ESG</p>
          </el-col>
          <el-col :span="2">
            <p class="menuFont2"> 投资者关系</p>
          </el-col>
          <el-col :span="2">
            <p class="menuFont2"> 联系我们</p>
          </el-col>

        </el-row>
      </el-header>
      <div style="height: 85vh;width: 99vw">&nbsp;</div>
      <el-main style="background: white;border-radius: 18px;width: 99vw; overflow-y:hidden; overflow-x:hidden">
        <el-row >
          <el-col :span="1">&nbsp;</el-col>
          <el-col :span="8" >
            <el-carousel  arrow="never" height="50vh">
              <el-carousel-item  style="background: whitesmoke;border-radius: 15px" >
                <el-image src="/doctor.png" style="border-radius: 15px"></el-image>
                <div
                    style="background: whitesmoke;
                    width: 100%;
                    height: 30vh;
"
                >
                  <p class="aliTitle">云大健康ESG评级上升至A级，项目发展健康度获认可&nbsp;</p>
                  <p class="aliDescription" style="height: 10vh">近日，国际知名指数供应商明晟公司（英文简称：MSCI）将雲大健康ESG（环境、社会、公司治理）评级从BBB上调至A</p>
                </div>
              </el-carousel-item>
            </el-carousel>
          </el-col>
          <el-col :offset="2" :span="2">
            <el-divider direction="vertical" style="height: 50vh" />
          </el-col>
          <el-col :span="10">
            <p class="aliTitle" style="background: transparent">
              《智慧健康养老产业发展行动计划（2021-2025年）》
            </p>
            <p class="aliDescription" >
              以习近平新时代中国特色社会主义思想为指导，全面贯彻党的十九大和十九届二中、三中、四中、五中全会精神，立足新发展阶段、贯彻新发展理念、构建新发展格局，深入实施健康中国战略和积极应对人口老龄化国家战略，坚持以人民为中心，坚持供给侧结构性改革和需求侧管理相结合，强化科技支撑，优化产业生态，协同推进技术融合、产业融合、数据融合、标准融合，推动产业数字化发展，打造智慧健康养老新产品、新业态、新模式，为满足人民群众日益增长的健康及养老需求提供有力支撑<br />
              <p style="text-align: right">
              <br /><br />
              工业和信息化部<br />
              民政部<br />
              国家卫生健康委<br />
              2021年10月20日<br />
              </p>
            </p>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <div style="height: 10vh;width: 100vw;">&nbsp;</div>
          </el-col>
        </el-row>

        <el-row style="background: #55c048;">
          <el-col>
            <div style="height: 60vh;width: 100vw;left: 0">
              &nbsp;
              <p class="flagFont" style="color:white;position: absolute;left: 5vw;height: 5vh;font-size: 2.5vw" >
                <el-icon size="50" style="color:#eac922;">
                  <Help/>
                </el-icon>

                云大健康
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
          src="../assets/pc_cn.mp4"
          type="video/mp4">
    </video>
  </div>

</template>

<style scoped>
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
  font-size: 3vh;
  font-family: YouYuan;
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
  width: 100vw;
  overflow: hidden;
}

</style>