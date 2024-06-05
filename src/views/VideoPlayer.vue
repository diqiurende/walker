<template>
  <div class="box">
    <el-card>
      <div :id="newid"></div>
    </el-card>
  </div>
</template>

<script setup>
import { onMounted, ref, toRefs } from 'vue';
import DPlayer from 'dplayer';
import Hls from 'hls.js';

// 定义 props
const props = defineProps({
  newid: {
    type: String,
    required: true
  },
  url:{
    type: String,
    required: true
  }
});

const { newid } = toRefs(props);
const {url}=toRefs((props));
const dp = ref(null);

onMounted(() => {
  dp.value = new DPlayer({
    container: document.getElementById(newid.value),
    video: {
      url: url.value,
      type: 'customHls',
      customType: {
        customHls: (video, player) => {
          const hls = new Hls();
          hls.loadSource(video.src);
          hls.attachMedia(video);
        }
      }
    },
    autoplay: false,
    theme: '#FADFA3',
    loop: true,
    lang: 'zh-cn',
    screenshot: false,
    hotkey: true,
    preload: 'auto',
    volume: 0.7,
    mutex: false
  });
});
</script>

<style lang="less" scoped>
</style>
