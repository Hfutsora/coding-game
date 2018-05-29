<template>
  <div>
    <div class="title">测试自由地图</div>
    <el-dialog class="pass-dialog" title="Congratulation!" :visible.sync="passDialogVisible" width="900px" center>
      <passStage :blockly="blocklyNum" :index="mapId" @nextStage="pushNext"></passStage>
    </el-dialog>
    <div class="game-page">
      <toolbar></toolbar>
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
        <blockly v-on:runGame="move" v-on:blockCount="getBlockCount" :blocklies="blocks" :maps="maps" :arrays="array"></blockly>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-mixed-operators */
import toolbar from '../components/toolbar.vue';
import blockly from '../components/blockly.vue';
import passStage from '../components/passStage.vue';
import gameTips from '../components/gameTips.vue';

import { getCustomMapDetail } from '../api/api';
import { testCustomGame } from '../api/api';
import { publishCustomGame } from '../api/api';

import * as constValue from '../assets/js/const';
import { returnBlocks } from '../assets/js/returnBlocks';
import { turnDirect } from '../assets/js/turnFrog';
import { turnTurtle } from '../assets/js/turnTurtle';

export default {
  name: 'game-page',
  data() {
    return {
      passDialogVisible: false,
      tipDialogVisible: false,
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
        oritop: ''
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
    gameTips
  },
  created() {
    if (!this.$route.query.id) {
      this.$router.push('ChoosePage');
    }
    this.mapId = this.$route.query.id;
    this.initMap();
  },
  methods: {
    initMap() {
      getCustomMapDetail(this.mapId)
        .then(res => {
          this.maps = res.data.map;
          this.blocks = returnBlocks(res.data.blocky);
          this.frog = `${this.getImg()}media/${turnDirect(res.data.frog.direction)}`;
          this.frogMap[0] = res.data.frog.y - 1;
          this.frogMap[1] = res.data.frog.x - 1;
          this.frogMap[2] = this.frog;
          this.frogCurrentPos[0] = this.frogMap[0];
          this.frogCurrentPos[1] = this.frogMap[1];

          if (res.data.turtle.y === -1) {
            this.turtle.show = false;
          }
          else {
            this.turtle.x = 233 + (res.data.turtle.y - 1) * 76;
            this.turtle.y = 175 + (res.data.turtle.x - 1) * 71;
            this.turtle.oriX = this.turtle.x;
            this.turtle.oriY = this.turtle.y;
            this.turtle.img = `${this.getImg()}media/${turnTurtle(
              res.data.turtle.direction
            )}`;
            this.turtle.oriD = this.turtle.img;
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
              this.mapImages[i] = `${this.getImg()}media/grid2.png`;
            }
            else if (this.maps[i] === '1') {
              this.mapImages[i] = `${this.getImg()}media/grid1.png`;
            }
            else if (this.maps[i] === '2') {
              this.mapImages[i] = `${this.getImg()}media/stone.png`;
            }
            else if (this.maps[i] === '3') {
              this.mapImages[i] = `${this.getImg()}media/water.png`;
            }
          }
        })
        .catch(err => {
          if (err.response.data.error.id === 67009) {
            this.$router.push('Login');
          }
          this.$notify.error({
            title: '获取地图失败',
            message: err.response.data.error.message,
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
          this.frog = imgPath + turnDirect(parseInt(moveTo[i * 5 + 2]));
          if (
            moveTo[i * 5 + 4] === constValue.TOUCHENDFLAG ||
            moveTo[i * 5 + 4] === constValue.TURTLEANDFROGTOUCHENDFLAG ||
            moveTo[i * 5 + 4] === constValue.TURTLEANDFROGNOTTOUCHENDFLAG ||
            moveTo[i * 5 + 4] === constValue.NOTTOUCHENDFLAG
          ) {
            this.pos.left += moveTo[i * 5] * 76;
            this.pos.top += moveTo[i * 5 + 1] * 71;
            this.frogCurrentPos[0] += moveTo[i * 5];
            this.frogCurrentPos[1] += moveTo[i * 5 + 1];
          }
          if (
            moveTo[i * 5 + 4] === constValue.TURTLEANDFROGNOTTOUCHENDFLAG ||
            moveTo[i * 5 + 4] === constValue.TURTLEMOVEFLAG
          ) {
            this.turtle.img = imgPath + turnTurtle(parseInt(moveTo[i * 5 + 3]));
            this.turtle.x += moveTo[i * 5] * 76;
            this.turtle.y += moveTo[i * 5 + 1] * 71;
          }
          this.judge();
          let testSuccess = 0;

          if (i === step - 1 && moveTo[moveTo.length - 1] !== 0) {
            this.$notify({
              title: '成功',
              message: '测试成功',
              type: 'success',
              offset: 150
            });
            testSuccess = 1;
          }
          if (
            moveTo[i * 5 + 4] === constValue.TOUCHWALLFLAG ||
            moveTo[i * 5 + 4] === constValue.TURTLEANDFROGTOUCHWALLFLAG ||
            moveTo[i * 5 + 4] === constValue.TURTLETOUCHWALLFLAG
          ) {
            this.$notify.error({
              title: '失败',
              message: moveTo[i * 4 + 3],
              offset: 150
            });
            testSuccess = 0;
          }
          if (i === step - 1 && moveTo[moveTo.length - 1] === 0) {
            this.$notify.error({
              title: '失败',
              message: '未成功获取四叶草 /(ㄒoㄒ)/~~',
              offset: 150
            });
            testSuccess = 0;
          }
          if (i === step - 1) {
            testCustomGame({
              mapId: parseInt(this.mapId),
              test: testSuccess
            })
              .then(() => {
                if (testSuccess) {
                  this.$confirm('测试成功，是否直接发布').then(() => {
                    publishCustomGame({
                      mapId: parseInt(this.mapId),
                      publish: 1
                    })
                      .then(() => {
                        this.$notify({
                          title: '成功',
                          message: '发布成功',
                          type: 'success',
                          offset: 150
                        });
                      })
                      .catch(err => {
                        this.$notify.error({
                          title: '失败',
                          message: err.response.data.error.message,
                          offset: 150
                        });
                      });
                  });
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

.title {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 160%;
  color: snow;
  margin-left: 850px;
  margin-top: 11px;
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
