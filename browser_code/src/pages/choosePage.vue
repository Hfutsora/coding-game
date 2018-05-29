<template>
  <div>
    <toolbar></toolbar>
    <div>
      <img id="leaf-top-left" src="../assets/img/leaf_tl.png" class="leaf-top-left">
      <img id="leaf-top-right" src="../assets/img/leaf_tr.png" class="leaf-top-right">
    </div>

    <el-dialog title="Choose your stage" :visible.sync="centerDialogVisible" width="95%" center>
      <carousel></carousel>
      <span slot="footer" class="dialog-footer">
      </span>
    </el-dialog>

    <el-dialog title="选择自由关卡" :visible.sync="freeDialogVisible" width="100%" center>
      <el-button class="create-map" @click="createMap()">创建地图</el-button>
      <freedomMap></freedomMap>
    </el-dialog>

    <div class="title">choose your game mode</div>
    <div class="choose">
      <transition name="el-fade-in-linear" v-if="stagePercent > 0">
        <el-progress  class="progress-line"  :text-inside="true" :percentage="stagePercent"  lass="progress" :stroke-width='20'></el-progress>
      </transition>

      <transition name="el-fade-in">
        <el-row type="flex" :gutter="15" class="transition-box" justify="center"  v-show="show">
          <el-col :span="10" id="passMode">
            <div class="grid-content rel size-740-420 bg-black li-special"  @click="centerDialogVisible = true">
              <img class="abs event-none bl size-740-420 trans-opacity" src="../assets/img/game1.jpg">
              <h2 class="abs event-none w740 h2-set trans-h2">闯关模式&nbsp;&nbsp;</h2>
              <h3 class="abs event-none w740 h3-set trans-h3">上次在第{{lastStage}}关</h3>
            </div>
          </el-col>
          <el-col :span="10" id="freeMode">
            <div class="grid-content rel size-740-420 bg-black li-special" @click="freeDialogVisible = true">
              <img class="abs event-none bl size-740-420 trans-opacity" src="../assets/img/game2.jpg">
              <h2 class="abs event-none w740 h2-set trans-h2">自由模式&nbsp;&nbsp;</h2>
            </div>
          </el-col>
        </el-row>
      </transition>
    </div>
  </div>
</template>

<script>
import toolbar from '../components/toolbar.vue';
import carousel from '../components/carousel.vue';
import freedomMap from '../components/freedomMap.vue';

// import $ from 'jquery';
import { getGameScore } from '../api/api';

export default {
  data() {
    return {
      pageNum: 1,
      show: false,
      centerDialogVisible: false,
      freeDialogVisible: false,
      lastStage: 1,
      stagePercent: 0
    };
  },
  components: {
    toolbar,
    carousel,
    freedomMap
  },
  mounted() {
    this.$nextTick(() => {
      this.show = true;
    });
  },
  methods: {
    createMap() {
      this.$router.push({ name: 'setFreedomPage' });
    }
  },
  created() {
    let userMsgId = '';
    if (window.sessionStorage.userMsg) {
      userMsgId = JSON.parse(window.sessionStorage.userMsg).id;
      getGameScore(userMsgId)
        .then(res => {
          this.lastStage = res.data.stage;
          const percent = Math.ceil(this.lastStage * 100 / 15);
          const time = 20;
          for (let currentP = 0; currentP < percent; currentP ++) {
            setTimeout(() => {
              this.stagePercent += 1;
            }, time * currentP);
          }
        })
        .catch(err => {
          this.$notify.error({
            title: '失败',
            message: err.response.data.error.message,
            offset: 150
          });
        });
    }
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
@import "../assets/css/layout.css";
@import "../assets/css/reset.css";
@import "../assets/css/Transitions.css";

.progress-line {
  position: relative;
  left: 160px;
  width: 41%;
}
.create-map {
  width: 100px;
  height: 60px;
  position: absolute;
  top: 10px;
  left: 50px;
  transition: all 0.5s;
  color: rgb(41, 42, 44);
  font-size: 120%;
  opacity: 0.6;
  font-family: Arial, Helvetica, sans-serif;
  background: rgba(118, 169, 189, 0.1);
  &:hover {
    opacity: 0.9;
    color: rgb(39, 39, 39);
    background: rgba(178, 203, 212, 0.9);
  }
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  font-family: Courier, monospace;
  font-size: 300%;
  line-height: 400px;
  text-align: center;
  border-radius: 4px;
  min-height: 36px;
}
.title {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 160%;
  color: snow;
  margin-left: 42%;
  min-width: 310px;
  margin-top: 11px;
  z-index: 999;
}
.choose {
  margin: 220px auto 0;
}
.progress {
  width: 41.5%;
  margin-left: 8.5%;
}
.leaf {
  position: absolute;
  top: 55px;
  z-index: 1;
}
.leaf-top-left {
  .leaf;
  left: 0;
}
.leaf-top-right {
  .leaf;
  right: 0;
}
</style>
