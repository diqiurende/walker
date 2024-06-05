<template>
  <div>
    <video-player ref="videoPlayer" :options="playerOptions" @ready="onPlayerReady"></video-player>
  </div>
</template>

<script>
import { videoPlayer } from 'vue-video-player';
import 'video.js/dist/video-js.css';
// import 'vue-video-player/src/custom-theme.css';

export default {
  name: 'LpVideoPlayerTest',
  components: {
    videoPlayer
  },

  data() {
    return {
      playerOptions: {},
      videoUrl: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'
    };
  },

  methods: {
    onPlayerReady(player) {
      console.log('Player is ready: ', player);
      player.src({ type: 'video/mp4', src: this.videoUrl });
    }
  }
};
</script>