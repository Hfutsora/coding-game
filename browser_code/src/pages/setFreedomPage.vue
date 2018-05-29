<template>
  <div>
    <div class="title">创建地图</div>
    <div class="game-page" id="game-page">
      <toolbar></toolbar>
      <section id="tools" class="tools">
        <!-- 工具箱 -->
        <img crossOrigin="anonymous" v-for="item in tool" :id="item.id" :key="item.id" :src= "item.src"
        :draggable="item.draggable" @dragstart="drag($event)"/>
      </section>
      <!-- 选择封面 -->
      <div class="select-top">
        <label for="mapImg" class="mapImg-label">地图封面:</label>
        <input type="file" name="mapImg" id="mapImg" class="map-img" multiple="multiple" v-on:change="changeImg();" />
        <el-button class="html-btn" id="htmlBtn" round icon="el-icon-upload2" @click="renderImage">html截图</el-button>
        <el-button for="mapImg" round icon="el-icon-upload" class="local-btn" @click="clickBtn">上传本地图片</el-button>
        <img crossOrigin="anonymous" :src="mapImg" id="show-mapImg" class="map-img-select" @click="changeImg"/>
      </div>

      <canvas width="320" height="180" style="width:160px;height:90px;"></canvas>
      <div @dragover="allowDrop($event)" @drop="drop($event)" class="trashbin">
        <img crossOrigin="anonymous" id="trashbin" :src="trashbin" class="trashbin-img" />
      </div>
      <div class="map" id="map">
        <div class="map-in" id="map-in">
          <div class="map-outer  map-nogrid"
            v-for="(map, index) in maps" :key="index" :id="index" @drop="drop($event)" @dragover="allowDrop($event)">
            <img crossOrigin="anonymous"  v-if="map[0].status" class="grid-map" :style="{ left: `${map[0].x}px`, top: `${map[0].y}px`}" :id="`${index}-0`" :key="map.id" :src= map[0].src
             draggable="map.draggable"
             @dragstart="drag($event)"/>
             <img crossOrigin="anonymous"  v-if="map[1].status" class="grid-map" :style="{ left: `${map[1].x}px`, top: `${map[1].y}px`}" :id="`${index}-1`" :key="map.id" :src= map[1].src
             draggable="map.draggable"
             @dragstart="drag($event)"/>
          </div>
        </div>
      </div>
      <div class="blockly-choice">
        <p class="block-title">请选择您需要的blockly块</p>
        <el-checkbox-group v-model="blockly" class="block-group" size="medium">
          <el-checkbox-button label="action-forward" class="block-btn"></el-checkbox-button>
          <el-checkbox-button label="action-turnleft" class="block-btn"></el-checkbox-button>
          <el-checkbox-button label="action-turnright"></el-checkbox-button>
          <el-checkbox-button label="action-turtle"></el-checkbox-button>
          <el-checkbox-button label="action-if"></el-checkbox-button>
          <el-checkbox-button label="action-ifElse"></el-checkbox-button>
          <el-checkbox-button label="controls-repeat"></el-checkbox-button>
        </el-checkbox-group>
        <div class="set-btn">
          <el-button @click= saveMap class="save-map">保存地图</el-button>
          <el-button @click= goTest class="go-test">前往测试</el-button>
        </div>
      </div>
    </div>
    <!-- <div class="right-workspace"></div> -->
  </div>
</template>

<script>
import toolbar from '../components/toolbar.vue';
import $ from 'jquery';
import * as Const from '../assets/js/const';

import html2canvas from 'html2canvas';
import { saveCustomGame } from '../api/api';

export default {
  data() {
    return {
      // 工具箱元素
      childId: '',
      trashbin: '',
      tool: [],
      // 工作区元素
      mapImg: '',
      mapId: '',
      // 青蛙的初始化位置
      frogPosition: [-1, -1],
      frogDirection: -1,
      turtlePosition: [-1, -1],
      turtleDirection: -1,
      leave: [],
      blockly: [],
      maps: [],
      mapNum: [],
      isShowDropError: false,
      showDropErrorMessage: ''
    };
  },
  components: {
    toolbar
  },
  mounted() {
    this.initMap();
    this.innitTool();
    this.$nextTick(() => {
      $('#htmlBtn').click();
    });
  },
  created() {
    this.trashbin = `${this.getImg()}media/trashbin.png`;
  },
  methods: {
    showDropError() {
      if (this.isShowDropError) {
        this.$notify.error({
          title: '放置出错',
          message: this.showDropErrorMessage,
          offset: 150
        });
      }
    },
    innitTool() {
      const path = this.getImg();
      this.tool = [
        {
          id: 'frog-0',
          type: 'frog',
          src: `${path}media/frog-top.png`,
          draggable: true
        },
        {
          id: 'frog-1',
          type: 'frog',
          src: `${path}media/frog-right.png`,
          draggable: true
        },
        {
          id: 'frog-2',
          type: 'frog',
          src: `${path}media/frog-bottom.png`,
          draggable: true
        },
        {
          id: 'frog-3',
          type: 'frog',
          src: `${path}media/frog-left.png`,
          draggable: true
        },
        {
          id: 'leaves',
          type: 'leave',
          src: `${path}media/clover.gif`,
          draggable: true
        },
        {
          id: 'turtle-0',
          type: 'turtle',
          src: `${path}media/turtle-top.png`,
          draggable: true
        },
        {
          id: 'turtle-1',
          type: 'turtle',
          src: `${path}media/turtle-right.png`,
          draggable: true
        },
        {
          id: 'turtle-2',
          type: 'turtle',
          src: `${path}media/turtle-bottom.png`,
          draggable: true
        },
        {
          id: 'turtle-3',
          type: 'turtle',
          src: `${path}media/turtle-left.png`,
          draggable: true
        },
        {
          id: 'river',
          type: 'river',
          src: `${path}media/water.png`,
          draggable: true
        },
        {
          id: 'stone',
          type: 'stone',
          src: `${path}media/stone.png`,
          draggable: true
        },
        {
          id: 'path',
          type: 'path',
          src: `${path}media/grid1.png`,
          draggable: true
        }
      ];
    },
    initMap() {
      for (let i = 0; i < 48; i ++) {
        const map = {
          value: 0,
          status: true,
          id: '',
          src: `${this.getImg()}media/grid2.png`,
          draggable: false,
          type: ''
        };
        const mapFrog = {
          value: 0,
          status: false,
          id: '',
          src: '',
          draggable: false,
          type: ''
        };
        const mapBlock = [];
        mapBlock.push(map);
        mapBlock.push(mapFrog);

        this.maps.push(mapBlock);
      }
    },
    // 更改青蛙和河流的拖动
    changeTurtleAndFrog(type, canDrag) {
      this.tool.forEach((element, index) => {
        if (element.id.includes(type)) {
          this.tool[index].draggable = canDrag;
        }
      });
    },
    // 重置元素
    childResetItem(childId, mapIndex) {
      // 叶子处理
      if (childId.includes(Const.LEAVE)) {
        const x = parseInt(mapIndex / Const.COLUMNNUM);
        const y = parseInt(mapIndex % Const.COLUMNNUM);
        let currentIndex = null;
        this.tool.forEach((element, index) => {
          if (element[0] === x && element[1] === y) {
            currentIndex = index;
          }
        });
        if (currentIndex >= 0) {
          this.leave.splice(currentIndex, 1);
        }

        return true;
      }
      // 青蛙处理
      if (childId.includes(Const.FROG)) {
        this.frogPosition.x = -1;
        this.frogPosition.y = -1;
        this.frogDirection = -1;
        this.changeTurtleAndFrog(Const.FROG, true);

        return true;
      }
      // 乌龟处理
      if (childId.includes(Const.TURTLE)) {
        this.turtlePosition.x = -1;
        this.turtlePosition.y = -1;
        this.turtleDirection = -1;
        this.changeTurtleAndFrog(Const.TURTLE, true);

        return true;
      }

      return true;
    },
    // 新加元素要更改值
    childChangeItem() {
      this.frogPosition = [-1, -1];
      this.turtlePosition = [-1, -1];
      this.leave = [];
      this.mapNum = [];
      this.maps.forEach((block, index) => {
        const positionPlus = block[1].id.indexOf('-');
        if (block[1].id.includes('frog')) {
          this.frogPosition[0] = Math.floor(index / 8) + 1;
          this.frogPosition[1] = (index % 8) + 1;
          this.frogDirection = parseInt(block[1].id[positionPlus + 1]);
        }
        if (block[1].id.includes('turtle')) {
          this.turtlePosition[0] = Math.floor(index / 8) + 1;
          this.turtlePosition[1] = (index % 8) + 1;
          this.turtleDirection = parseInt(block[1].id[positionPlus + 1]);
        }
        if (block[1].id.includes('leaves')) {
          const oneLeave = [];
          oneLeave.push(Math.floor(index / 8) + 1);
          oneLeave.push((index % 8) + 1);
          this.leave.push(oneLeave);
        }
        if (block[0].id === '') {
          this.mapNum.push(0);
        }
        if (block[0].id.includes('path')) {
          this.mapNum.push(1);
        }
        if (block[0].id.includes('stone')) {
          this.mapNum.push(2);
        }
        if (block[0].id.includes('river')) {
          this.mapNum.push(3);
        }
      });

      return false;
    },
    copyElement(id) {
      // 记录index
      let newElement = null;
      let originIndex = -1;
      this.tool.forEach((element, index) => {
        if (element.id === id) {
          newElement = element;
          newElement.id = `${element.id}1`;
          originIndex = index;
        }
      });
      this.tool.splice(originIndex, 1);
      this.tool.push(newElement);

      return originIndex;
    },
    changeTool(eventTargetId, childId) {
      const targetId = $(`#${eventTargetId}`).parent()[0].id;
      if (targetId === '') {
        return true;
      }
      let layer = 0;
      if (
        childId.includes('turtle') ||
        childId.includes('frog') ||
        childId === 'leaves'
      ) {
        layer = 1;
        // 此时要更改元素值
        // this.childChangeItem(`${this.tool[index].id}1`, targetId);
      }
      const index = this.tool.findIndex(function(val) {
        return val.id === childId;
      });
      const time = new Date().getTime();
      const element = this.tool[index];
      this.tool[index].id = `${element.id}`;
      this.maps[targetId][layer].status = true;
      this.maps[targetId][layer].id = `${this.tool[index].id}${time}`;
      this.maps[targetId][layer].src = element.src;
      this.maps[targetId][layer].draggable = element.draggable;
      this.maps[targetId][layer].type = element.type;
      if (childId.includes('turtle')) {
        this.changeTurtleAndFrog(Const.TURTLE, false);
      }
      if (childId.includes('frog')) {
        this.changeTurtleAndFrog(Const.FROG, false);
      }

      return true;
    },
    toTrashbin(targetId, childId) {
      if (targetId !== 'trashbin') {
        return true;
      }
      const positionPlus = childId.indexOf('-');
      const index = parseInt(childId.slice(0, positionPlus));
      const layer = parseInt(childId.slice(positionPlus + 1));

      if (this.maps[index][layer].id.includes('turtle')) {
        this.changeTurtleAndFrog(Const.TURTLE, true);
      }
      if (this.maps[index][layer].id.includes('frog')) {
        this.changeTurtleAndFrog(Const.FROG, true);
      }
      this.maps[index][layer].id = '';
      if (layer === 0) {
        this.maps[index][layer].status = true;
        this.maps[index][layer].src = `${this.getImg()}media/grid2.png`;
      }
      else {
        this.maps[index][layer].status = false;
        this.maps[index][layer].src = '';
      }
      this.maps[index][layer].draggable = false;
      this.maps[index][layer].type = '';

      return true;
    },
    drag(event) {
      this.childId = event.target.id;
      if (event.target.draggable !== false) {
        event.dataTransfer.setData('id', event.target.id);
      }
      setTimeout(() => {
        this.showDropError();
      }, 500);
    },
    drop(event) {
      event.preventDefault();
      const childId = event.dataTransfer.getData('id');
      this.changeTool(event.target.id, childId);
      this.toTrashbin(event.target.id, childId);

      return true;
    },
    allowDrop(event) {
      // 只有地图可以放
      const childId = this.childId;
      const positionPlus = event.target.id.indexOf('-');
      if (positionPlus >= 0) {
        const index = $(`#${event.target.id}`).parent()[0].id;
        if (childId === 'path' || childId === 'river' || childId === 'stone') {
          if (this.maps[index][1].id !== '') {
            this.isShowDropError = true;
            this.showDropErrorMessage = '路/河流/石头只能置于底层';

            return;
          }
        }
        if (childId.includes('turtle')) {
          if (
            this.maps[index][1].id !== '' ||
            !this.maps[index][0].id.includes('river')
          ) {
            this.isShowDropError = true;
            this.showDropErrorMessage = '乌龟只能放在河流上';

            return;
          }
        }
        if (childId.includes('frog')) {
          if (
            !this.maps[index][0].id.includes('path') ||
            this.maps[index][1].id !== ''
          ) {
            this.isShowDropError = true;
            this.showDropErrorMessage = '青蛙只能放在路上';

            return;
          }
        }
        if (childId === 'leaves') {
          if (
            this.maps[index][1].id !== '' ||
            this.maps[index][0].id.includes('stone') ||
            this.maps[index][0].id === ''
          ) {
            this.isShowDropError = true;
            this.showDropErrorMessage = '四叶草只能放在路和河流上';

            return;
          }
        }
        this.isShowDropError = false;
        this.showDropErrorMessage = '';
        event.preventDefault();
      }
      else {
        if (event.target.id === 'trashbin') {
          this.isShowDropError = false;
          this.showDropErrorMessage = '';
          event.preventDefault();
        }
      }
    },
    goTest() {
      if (this.mapId === '') {
        this.$confirm('请先保存地图').then(() => {
          this.$emit('closeDialog');
        });
      }
      else {
        this.$router.push({
          name: 'testMapPage',
          query: { id: this.mapId }
        });
      }
    },
    renderImage() {
      const opts = { useCORS: true };
      html2canvas(document.getElementById('map-in'), opts).then(canvas => {
        var imgUri = canvas.toDataURL('image/png');
        this.mapImg = imgUri;
      });
    },
    clickBtn() {
      $('#mapImg').click();
    },
    changeImg() {
      const file = $('#mapImg').get(0).files[0];
      const reader = new FileReader();

      const type = file.type.split('/')[0];
      if (type !== 'image') {
        this.$notify.error({
          title: '请上传图片',
          offset: 150
        });

        return;
      }
      const size = Math.round(file.size / 1024 / 1024);
      if (size > 3) {
        this.$notify.error({
          title: '图片大小不得超过3M',
          offset: 150
        });

        return;
      }
      reader.readAsDataURL(file);
      reader.onload = e => {
        const imgFile = e.target.result;
        this.mapImg = imgFile;
      };
    },
    saveMap() {
      this.childChangeItem();
      if (
        this.frogPosition[0] === -1 ||
        this.leave.length === 0 ||
        this.blockly.length === 0
      ) {
        this.$notify.error({
          title: '失败',
          message: '缺少必要元素',
          offset: 150
        });

        return;
      }
      const map = this.mapNum.join(',');
      const leaves = [];
      const blocklyId = this.blockly.map(one => {
        return Const.blocklyName.indexOf(one) + 1;
      });
      this.leave.forEach(oneLeave => {
        leaves.push({
          x: oneLeave[0],
          y: oneLeave[1]
        });
      });
      const playerId = JSON.parse(window.sessionStorage.userMsg).id;
      this.$confirm('确认修改？')
        .then(() => {
          saveCustomGame(playerId, {
            map: map,
            mapImg: this.mapImg,
            frog: {
              x: this.frogPosition[0],
              y: this.frogPosition[1],
              direction: this.frogDirection
            },
            turtle: {
              x: this.turtlePosition[0],
              y: this.turtlePosition[1],
              direction: this.turtleDirection
            },
            leaves: leaves,
            blockly: blocklyId
          })
            .then(res => {
              this.$notify({
                title: '成功',
                message: '修改成功',
                type: 'success',
                offset: 150
              });
              this.mapId = res.data.mapId;
            })
            .catch(err => {
              this.$notify.error({
                title: '失败',
                message: err.response.data,
                offset: 150
              });
            });
          this.$emit('closeDialog');
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

<style lang='less' scoped>
@import "../assets/css/animate.css";

@graWid: 700px;
@graHeight: 520px;
@marLeft: 16%;

.game-page {
  background: url("../assets/img/setStage.png");
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  height: 100%;
  z-index: -1;
}
.tools {
  line-height: 0;
  position: absolute;
  top: 60px;
  width: 550px;
  height: 200px;
  padding: 0 30px 20px 60px;
  background-color: rgba(102, 102, 102, 0.452);
  border: solid 5px rgba(12, 12, 12, 0.5);
  color: rgb(255, 255, 255);
  transition: all 0.5s;
  &:hover {
    background-color: rgba(118, 153, 145, 0.5);
    border: solid 5px rgba(12, 12, 12, 0.6);
    box-shadow: 0px 0px 10px rgba(64, 100, 78, 0.5);
  }
  z-index: 999;
}
.map-outer {
  line-height: 0px;
  text-align: center;
  width: 1000px;
  height: 700px;
  z-index: 0;

  .grid-map {
    position: absolute;
  }
  img {
    width: 75px;
    height: 75px;
  }
}
.map-inner {
  line-height: 0px;
  text-align: center;
  width: 1000px;
  height: 700px;
  color: rgb(255, 255, 255);
  z-index: 0;
}
.title {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 160%;
  color: snow;
  margin-left: 850px;
  margin-top: 11px;
}
.submit-btn {
  z-index: 99;
}
.save-map {
  position: absolute;
  left: 650px;
  z-index: 999;
}
.go-test {
  position: absolute;
  left: 800px;
  z-index: 999;
}
.trashbin {
  position: absolute;
  left: 700px;
  top: 80px;
  width: 200px;
  z-index: 999;
}
.map {
  line-height: 0px;
  text-align: center;
  position: absolute;
  top: 18%;
  margin-left: 80px;
  width: 600px;
  height: 700px;
  color: rgb(255, 255, 255);
  // padding: 20px 0;
  z-index: 0;
}
.map-in {
  line-height: 0px;
  text-align: center;
  position: absolute;
  width: 650px;
  height: 460px;
  background: rgba(22, 22, 22, 0.7);
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
.trashbin-img {
  width: 200px;
}
.map-nogrid {
  width: 75px;
  height: 75px;
  display: inline-flex;
  border: solid 1px rgba(66, 47, 42, 0);
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
.map-gird {
  width: 75px;
  height: 75px;
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
.blockly-choice {
  position: absolute;
  left: 100px;
  top: 800px;
  z-index: 999;
}
.block-title {
  position: absolute;
  font-size: 120%;
  font-family: Arial, Helvetica, sans-serif;
  width: 220px;
  padding: 5px 10px;
  background: rgba(49, 52, 61, 0.5);
  margin: -50px -60px 0;
  color: rgba(243, 243, 243, 0.8);
}
.block-group {
  position: absolute;
  left: -45px;
  top: -400px;
}
.set-btn {
  position: absolute;
  margin-left: 500px;
  margin-top: -20px;
}
.html-btn {
  z-index: 1000;
  padding: 10px 20px;
  width: 200px;
  font-size: 90%;
  top: 300px;
  background: rgb(246, 246, 246);
  color: black;
  text-align: center;
  border: solid 2px rgba(72, 149, 72, 0.5);
  margin-left: -50px;
  cursor: pointer;
  left: 73%;
  position: absolute;
  &:hover {
    filter: brightness(1.1);
  }
}
.local-btn {
  .html-btn;
  margin-left: -300px;
  width: 200px;
}
.select-top {
  margin: 200px 0 0 1300px;
  display: block;
  position: relative;
  height: 50px;
  width: 300px;
  padding: 0 1%;
  line-height: 50px;
  text-align: right;
  font-size: 140%;
  color: black;
  font-family: Arial, Helvetica, sans-serif;
  .mapImg-label {
    position: absolute;
    left: -180px;
    top: -25px;
    padding: 5px 10px;
    background: rgba(49, 52, 61, 0.5);
    color: rgba(243, 243, 243, 0.8);
    &:hover {
      cursor: pointer;
    }
  }
  .map-img-select {
    width: 400px;
    height: 300px;
    position: absolute;
    right: -50px;
    top: -50px;
  }
  .map-img {
    position: absolute;
    right: -2px;
    display: none;
    z-index: 0;
    width: 55px;
    height: 55px;
  }
}
.right-workspace {
  height: 100%;
  top: 0;
  right: 0;
  width: 50%;
  background: rgb(185, 185, 185);
  opacity: 0.8;
  position: absolute;
  z-index: -10;
}
</style>
