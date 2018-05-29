<template>
  <div>
    <pre-loading :progressLeft="progressLeft"></pre-loading>
    <img :src="randomCg.left" id="random-cg-left" />
    <img :src="randomCg.right" id="random-cg-right" />
    <!-- <i class="audio-icon" icon="el-icon-service"></i>
    <el-switch
      v-model="audioPlay"
      class="audio-btn"
      active-color="#13ce66">
    </el-switch> -->
    <audio controls autoplay loop id="audio">
      <source :src="mp3" type="audio/mpeg">
      Audio player not available.
    </audio>
    <div class="title">闯关模式第{{mapId}}关</div>
    <el-dialog class="pass-dialog" title="Congratulation!" :visible.sync="passDialogVisible" width="900px" center>
      <passStage :blockly="blocklyNum" :index="mapId" :shareURL="shareURL" :stageScore="stageScore" @nextStage="pushNext"></passStage>
    </el-dialog>
    <div class="game-page">
      <toolbar></toolbar>
      <el-popover
        ref="popover"
        placement="bottom"
        title="关卡说明"
        width="300"
        trigger="click"
        transition="fade-in-linear"
        :content="content">
      </el-popover>
      <el-button  type="info" plain round class="game-tips" v-popover:popover>查看提示</el-button>

      <div class="map">
        <div class="map-outer"></div>
        <transition-group name="bounce">
          <img v-for="(cpos, index ) in clovers" v-if="cpos.show" :src="clover" :id="`clover-${index}`" :key="index"
          :style="{ left: cpos.left  + 'px', top: cpos.top  + 'px'}" class="clover"/>
        </transition-group>
        <img class="turtle" v-if="turtle.show" :style="{ left: turtle.x  + 'px', top: turtle.y  + 'px'}" :src="turtle.img" ref="frog" />
        <img class="frog" :style="{ left: pos.left  + 'px', top: pos.top  + 'px'}" :src="frog" ref="frog"/>
        <div class="map-inner">
          <img class="map-gird" v-for="(map, index) in maps" :key="index" :id="index" :src="mapImages[index]" />
        </div>
      </div>
      <div class="coding">
        <blockly ref="blockly" v-on:runGame="move" v-on:blockCount="getBlockCount" :blocklies="blocks" :maps="maps" :arrays="array" :xmlText="xmlText"></blockly>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-mixed-operators */
import toolbar from '../components/toolbar.vue';
import blockly from '../components/blockly.vue';
import passStage from '../components/passStage.vue';
import preLoading from '../components/preLoading.vue';

import $ from 'jquery';

import * as constValue from '../assets/js/const';
import { returnBlocks } from '../assets/js/returnBlocks';
import { turnDirect } from '../assets/js/turnFrog';
import { turnTurtle } from '../assets/js/turnTurtle';

import { getStandardMapDetail } from '../api/api';
import { throughStandardMap } from '../api/api';

export default {
  name: 'game-page',
  data() {
    return {
      progressLeft: 0,
      img: 0,
      mp3: '',
      audioPlay: true,
      randomCg: {
        left: '',
        right: ''
      },
      stageScore: 0,
      xmlText: '',
      shareURL: '',
      content: 'hfutsora',
      passDialogVisible: false,
      tipDialogVisible: true,
      clover: `${this.getImg()}media/clover.gif`,
      clovers: [],
      mapImages: [],
      // 使用的blockly数量
      blocklyNum: 0,
      // 过关
      // 青蛙背景 4个朝向
      frog: '',
      // 青蛙的初始化位置
      frogMap: [],
      turtle: {
        x: '',
        y: '',
        oriX: '',
        oriY: '',
        oriD: '',
        img: '',
        show: true
      },
      frogCurrentPos: [],
      blocks: [],
      array: [],
      pos: {
        // 0 0 -225 140 wid 76 height 71
        left: '',
        top: '',
        oriLeft: '',
        oritop: '',
        oriD: ''
      },
      mapId: '',
      pageNum: 2,
      maps: []
    };
  },
  components: {
    blockly,
    toolbar,
    passStage,
    preLoading
  },
  created() {
    if (!this.$route.query.id) {
      this.$router.push('ChoosePage');
    }
    this.mapId = this.$route.query.id;
    this.xmlText = this.$route.query.xmlText;

    this.initMap();
  },
  mounted() {
    const self = this;
    this.$nextTick(() => {
      let loadTotal = $('img').length;
      $('img').attr('onload', () => {
        setTimeout(() => {
          self.img ++;
          self.progressLeft = Math.floor(100 * self.img / loadTotal);
          if (self.progressLeft >= 100) {
            setTimeout(() => {
              self.openGate();
            }, 500);
          }
        }, 1000 * Math.random());
      });

      const path = this.getImg();
      const randomNum = Math.floor(Math.random() * 6 + 1);
      this.randomCg.left = `${path}media/swich${randomNum}-left.png`;
      this.randomCg.right = `${path}media/swich${randomNum}-right.png`;
      this.mp3 = `${path}media/BGM.mp3`;
    });
  },
  methods: {
    openGate() {
      $($('#random-cg-left')).animate(
        {
          left: '-=1980px'
        },
        2000
      );
      $($('#random-cg-right')).animate(
        {
          left: '+=1980px'
        },
        2000
      );
    },
    initMap() {
      getStandardMapDetail(this.mapId, {
        playerId: JSON.parse(window.localStorage.userMsg).id
      })
        .then(res => {
          const path = this.getImg();
          this.maps = res.data.map;
          this.blocks = returnBlocks(res.data.blocky);
          this.frog = `${path}media/${turnDirect(res.data.frog.direction)}`;
          this.frogMap[0] = res.data.frog.y - 1;
          this.frogMap[1] = res.data.frog.x - 1;
          this.frogMap[2] = this.frog;
          this.frogCurrentPos[0] = this.frogMap[0];
          this.frogCurrentPos[1] = this.frogMap[1];

          this.content = res.data.tip;


          if (res.data.turtle.y === -1) {
            this.turtle.show = false;
          }
          else {
            this.turtle.x = 233 + (res.data.turtle.y - 1) * 76;
            this.turtle.y = 175 + (res.data.turtle.x - 1) * 71;
            this.turtle.oriX = this.turtle.x;
            this.turtle.oriY = this.turtle.y;
            this.turtle.oriD = `${path}media/${turnTurtle(
              res.data.turtle.direction
            )}`;
            this.turtle.img = `${path}media/${turnTurtle(
              res.data.turtle.direction
            )}`;
          }

          this.pos.left = this.frogMap[0] * 76 - 225;
          this.pos.top = this.frogMap[1] * 71 + 140;
          this.pos.oriLeft = this.pos.left;
          this.pos.oriTop = this.pos.top;

          const frogArray = [];
          frogArray.push(res.data.frog.x - 1);
          frogArray.push(res.data.frog.y - 1);
          // 0 1 2 3
          frogArray.push(res.data.frog.direction);
          frogArray.push(res.data.turtle.x - 1);
          frogArray.push(res.data.turtle.y - 1);
          frogArray.push(res.data.turtle.direction);
          const leaves = res.data.leaves;
          frogArray.push(leaves);

          for (let i = 0; i < leaves.length; i ++) {
            this.clovers.push({
              id: i,
              left: 160 + (leaves[i].y - 1) * 76,
              top: 120 + (leaves[i].x - 1) * 71,
              x: leaves[i].y - 1,
              y: leaves[i].x - 1,
              show: true
            });
          }

          this.array = frogArray;

          for (let i = 0; i < 48; i ++) {
            if (this.maps[i] === '0') {
              this.mapImages[i] = `${path}media/grid2.png`;
            }
            else if (this.maps[i] === '1') {
              this.mapImages[i] = `${path}media/grid1.png`;
            }
            else if (this.maps[i] === '2') {
              this.mapImages[i] = `${path}media/stone.png`;
            }
            else if (this.maps[i] === '3') {
              this.mapImages[i] = `${path}media/water.png`;
            }
          }
        })
        .catch(err => {
          if (err.response.data.error.id === 67009) {
            this.$router.push('Login');
          }
          this.$notify.error({
            title: '获取地图失败',
            message: err.response.data,
            offset: 150
          });
        });
    },
    pushNext() {
      this.mapId = this.$route.query.id;
      this.passDialogVisible = false;
      location.reload();
    },
    getBlockCount(blockNum) {
      this.blocklyNum = blockNum;
    },
    judge() {
      for (let j = 0; j < this.clovers.length; j ++) {
        if (
          this.clovers[j].x === this.frogCurrentPos[0] &&
          this.clovers[j].y === this.frogCurrentPos[1]
        ) {
          this.clovers[j].show = false;
        }
      }
    },
    setOrigin() {
      this.pos.left = this.pos.oriLeft;
      this.pos.top = this.pos.oriTop;
      this.turtle.x = this.turtle.oriX;
      this.turtle.y = this.turtle.oriY;
      this.turtle.img = this.turtle.oriD;
      this.frogCurrentPos[0] = this.frogMap[0];
      this.frogCurrentPos[1] = this.frogMap[1];
      this.frog = this.frogMap[2];
      this.clovers.forEach(e => {
        e.show = true;
      });
    },
    move(moveTo) {
      const imgPath = `${this.getImg()}media/`;
      // 初始化青蛙和乌龟的位置 以及四叶草的bool-show
      this.setOrigin();
      const step = Math.floor(moveTo.length / 5);
      const time = 400;
      for (let i = 0; i < step; i ++) {
        setTimeout(() => {
          if (moveTo[i * 5 + 4] !== constValue.TURTLEMOVEFLAG) {
            this.frog = imgPath + turnDirect(parseInt(moveTo[i * 5 + 2]));
          }
          if (
            moveTo[i * 5 + 4] === constValue.TOUCHENDFLAG ||
            moveTo[i * 5 + 4] === constValue.TURTLEANDFROGTOUCHENDFLAG ||
            moveTo[i * 5 + 4] === constValue.TURTLEANDFROGNOTTOUCHENDFLAG ||
            moveTo[i * 5 + 4] === constValue.NOTTOUCHENDFLAG ||
            moveTo[i * 5 + 4] === constValue.TURTLEANDFROGTOUCHENDFLAG
          ) {
            this.pos.left += moveTo[i * 5] * 76;
            this.pos.top += moveTo[i * 5 + 1] * 71;
            this.frogCurrentPos[0] += moveTo[i * 5];
            this.frogCurrentPos[1] += moveTo[i * 5 + 1];
          }
          if (
            moveTo[i * 5 + 4] === constValue.TURTLEANDFROGNOTTOUCHENDFLAG ||
            moveTo[i * 5 + 4] === constValue.TURTLEMOVEFLAG ||
            moveTo[i * 5 + 4] === constValue.TURTLEANDFROGTOUCHENDFLAG
          ) {
            this.turtle.img = imgPath + turnTurtle(parseInt(moveTo[i * 5 + 3]));
            this.turtle.x += moveTo[i * 5] * 76;
            this.turtle.y += moveTo[i * 5 + 1] * 71;
          }
          this.judge();
          if (i === step - 1 && moveTo[moveTo.length - 1] !== 0) {
            this.stageScore = moveTo[moveTo.length - 1];
            const codeXML = escape(this.$refs.blockly.codeXML());
            this.shareURL = `http://localhost:8080/#/gamePage?id=${
              this.mapId
            }&xmlText=${codeXML}`;
            setTimeout(() => {
              this.passDialogVisible = true;
            }, 1000);
            throughStandardMap({
              playerId: JSON.parse(window.sessionStorage.userMsg).id,
              mapId: parseInt(this.mapId),
              star: parseInt(this.stageScore)
            }).catch(err => {
              this.$notify.error({
                title: '通关数据传送失败',
                message: err.response,
                offset: 150
              });
            });
          }
          if (
            moveTo[i * 5 + 4] === constValue.TOUCHWALLFLAG ||
            moveTo[i * 5 + 4] === constValue.TURTLEANDFROGTOUCHWALLFLAG ||
            moveTo[i * 5 + 4] === constValue.TURTLETOUCHWALLFLAG
          ) {
            this.$notify.error({
              title: '失败',
              message: moveTo[i * 5 + 4],
              offset: 150
            });
          }
          if (i === step - 1 && moveTo[moveTo.length - 1] === 0) {
            this.$notify.error({
              title: '失败',
              message: '再试试吧 /(ㄒoㄒ)/~~',
              offset: 300
            });
          }
          if (i === step - 1) {
            setTimeout(() => {
              this.setOrigin();
            }, 2000);
          }
        }, time * i);
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/css/animate.css";

@graWid: 700px;
@graHeight: 520px;
@marLeft: 16%;

#audio {
  display: none;
}
.audio-icon {
  position: absolute;
  z-index: 99;
  top: 110px;
  left: 150px;
}
.audio-btn {
  position: absolute;
  z-index: 99;
  top: 110px;
  left: 150px;
}
#random-cg-left {
  position: absolute;
  z-index: 999;
  top: 0;
  right: 0;
}
#random-cg-right {
  position: absolute;
  z-index: 999;
  top: 0;
  right: 0;
}
.title {
  position: absolute;
  top: 0;
  left: 100px;
  font-size: 160%;
  width: 200px;
  color: snow;
  margin-left: 38%;
  margin-top: 11px;
}
.game-tips {
  position: absolute;
  left: 20px;
  top: 100px;
  opacity: 0.8;
  background: rgba(58, 83, 66, 0.9);
  z-index: 999;
  color: snow;
  transition: all 0.5s;
  &:hover {
    border-radius: 0;
  }
}
.game-page {
  background: url("../assets/img/grass-bg.png");
  position: absolute;
  width: 100%;
  left: 0;
  height: 100%;
  top: 0;
  z-index: -1;
}
.pass-dialog {
  z-index: 1000;
}
.wrapper {
  margin-top: 5%;
  font-size: 200%;
  margin-left: @marLeft;
}
.map {
  line-height: 0px;
  text-align: center;
  position: absolute;
  top: 18%;
  margin-left: 80px;
  width: 1000px;
  height: 700px;
  color: rgb(255, 255, 255);
  padding: 20px 0;
  z-index: 99;
}
.map-outer {
  background: url("../assets/img/map-bg.png") no-repeat;
  line-height: 0px;
  text-align: center;
  position: absolute;
  width: 1000px;
  height: 700px;
  color: rgb(255, 255, 255);
  padding: 20px 0;
  z-index: 99;
}
.map-inner {
  line-height: 0px;
  text-align: center;
  position: absolute;
  width: 650px;
  height: 420px;
  left: 215px;
  top: 150px;
  padding: 20px 0;
  z-index: 0;
}
.frog {
  position: relative;
  z-index: 9999;
  &:hover {
    filter: brightness(1.1);
  }
}
.turtle {
  position: absolute;
  z-index: 99;
}
.clover {
  position: absolute;
  z-index: 99;
}
.map-gird {
  width: 75px;
  height: 70px;
  display: inline-flex;
  border: solid 1px rgb(66, 47, 42);
  margin: 0;
  position: relative;
  flex-wrap: wrap;
  .number {
    line-height: 70px;
    font-size: 200%;
    margin: 0 auto;
    opacity: 0.6;
  }
  &:hover {
    filter: brightness(1.1);
  }
}
.coding {
  .map;
  margin-top: 3%;
  padding: 0;
  height: @graHeight + 100px;
  width: 540px;
  margin-left: calc(@marLeft + 5% + @graWid);
}
.bounce-enter-active {
  animation: bounce-in 0.6s;
}
.bounce-leave-active {
  animation: bounce-in 0.6s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
