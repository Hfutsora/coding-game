<template>
<div>
  <el-carousel :interval="4000" type="card" height="500px" trigger="click" autoplay="autoplay">
    <el-carousel-item v-for="(stage, index) in stages" :key="index">
      <img class="stage-name" :src="stage.img" @click="directStage(index+1)"/>
      <div v-if="index >= 5 && stages[index - 1].star === 0 ">
        <img src="../assets/img/lock.png" class="lock" alt="">
        <div class="black-bg"></div>
      </div>
      <div class="stage-index">第{{ index+1 }}关</div>
      <el-rate
        class="value-rate"
        v-model="stage.star"
        disabled
        show-score
        text-color="#ff9900"
        score-template="{value}">
      </el-rate>
    </el-carousel-item>
  </el-carousel>
</div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      autoplay: false,
      stages: []
    };
  },
  mounted() {
    let userMsgId = -1;
    if (window.sessionStorage.userMsg) {
      userMsgId = JSON.parse(window.sessionStorage.userMsg).id;
    }
    axios
      .get(`/v1/game/getStages/${userMsgId}`)
      .then(res => {
        this.stages = res.data.stages;
        for (let i = 0; i < this.stages.length; i ++) {
          this.stages[i].img = `${this.getImg()}${this.stages[i].img}`;
        }
      })
      .catch(err => {
        this.$notify.error({
          title: '失败',
          message: err.response.data.error.message,
          offset: 150
        });
      });
  },
  methods: {
    directStage(index) {
      if (this.stages[index - 1].star > 0 || index === 1) {
        this.$router.push({
          name: 'GamePage',
          query: { id: index }
        });
      }
      else {
        this.$notify.error({
          title: '必须先通过上一关卡',
          offset: 150
        });
      }
    }
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.stage-index {
  line-height: 100px;
  z-index: 999;
  position: absolute;
  text-align: center;
  width: 100%;
  background: rgba(27, 27, 27, 0.5);
  top: 0;
  font-size: 150%;
  font-weight: bold;
  color: rgba(253, 253, 253, 0.8);
  transition: all 0.5s;
  &:hover {
    opacity: 1;
  }
}
.lock {
  position: absolute;
  z-index: 9999;
  left: 25%;
  top: 10%;
  width: 50%;
  height: 80%;
  overflow: hidden;
  filter: brightness(999);
}
.black-bg {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: #000;
  opacity: 0.5;
  position: absolute;
  z-index: 9998;
}
.value-rate {
  font-size: 20px;
  position: absolute;
  z-index: 999;
  bottom: 0;
  background: rgba(32, 31, 31, 0.5);
  padding: 5px 10px;
  width: 200px;
  margin-left: 38%;
  text-align: center;
  opacity: 0.5;
  transition: all 0.5s;
  &:hover {
    opacity: 0.9;
    height: 60px;
  }
}
.stage-name {
  text-align: center;
  line-height: 400px;
  width: 100%;
}
.el-carousel__item h3 {
  color: #f7faff;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
