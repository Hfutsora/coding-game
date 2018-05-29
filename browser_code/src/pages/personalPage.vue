<template>
  <div class="personal-page">
    <toolbar ref="toolbar"></toolbar>
    <el-dialog title="修改个人信息"  :visible.sync="centerDialogVisible" width="30%" center>
      <changeHeadpic @closeDialog="updataMsg"></changeHeadpic>
    </el-dialog>
    <el-dialog title="VIP充值"  :visible.sync="vipDialogVisible" width="30%" center>
      <recharge @closeDialog="updataMsg" :vip="personalMsg.vip"></recharge>
    </el-dialog>
    <div class="personal" v-if="onLoad">
      <img class="personal-headpic bounceIn" @click="centerDialogVisible = true" :src= personalMsg.headpic />
      <div class="personal-headpic-vip">
        <el-tooltip class="item personal-headpic-vip-tip" :content="vipMsg" placement="right-end" transition="el-fade-in-linear" :open-delay= 200>
          <img class="personal-headpic-vip-img" @click="vipDialogVisible = true" :src="vipImage"/>
        </el-tooltip>
      </div>
      <div class="personal-message">
        <img class="personal-message-img"  @click="centerDialogVisible = true" src="../assets/img/tag.png" alt="" />
        <div class="personal-message-oval" @click="centerDialogVisible = true">{{personalMsg.message}}</div>
      </div>
      <div class="personal-passnum">
        <img class="personal-passnum-img" src="../assets/img/tag-left.png" alt="">
        <span class="personal-passnum-title">您已通过了{{passGame.stage - 1}}关 请继续加油!</span>
        <div class="personal-passnum-best" v-if="passGame.stage - 1 > 0">
          <p class="average-score">您的平均成绩: {{passGame.score}} &nbsp;(*￣▽￣*)ブ</p>
          <h3 class="best-title">您的最佳关卡</h3>
          <div class="best-stage" v-for="(item, index) in passGame.bestThree" :key= index>
            <p>关卡: &nbsp; {{item.standardGameId}} &nbsp; | &nbsp; 星级: &nbsp; {{item.star}}</p>
          </div>
        </div>
        <div class="no-record" v-else>
           <router-link tag="a" :to="{ name: 'GamePage', query: { id: 1 }}">暂无闯关记录，前往闯关</router-link>
        </div>
      </div>
      <div class="personal-map">
        <div class="create-map" v-if="myMaps.length > 0">
          <h3 class="map-title">个人地图</h3>
          <img src= "../assets/img/bt_left.png" class="personal-map-star-btn-left" @click="scrollLeftClick"/>
          <img src= "../assets/img/bt_right.png" class="personal-map-star-btn-right" @click="scrollRightClick"/>
          <div class="personal-map-create">
            <div class="personal-map-star-item" v-for="(myMap, index) in myMaps" @click="directFreeMap(myMap.id)" :key="index"
            :style="{background: 'url('+ myMap.img +')', 'background-size': '100% 100%'}">
              <div class="personal-map-star-item-bottom">
                <p>作者: {{myMap.playerName}}</p>
                <p>评分: {{myMap.score}}</p>
                <p>通过: {{myMap.runStatus}}</p>
                <p>发布: {{myMap.publishStatus}}</p>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <p class="no-create-map">
            <router-link tag="a" :to="{ name: 'setFreedomPage'}">您尚未创建个人地图,立即前往创建</router-link>
          </p>
        </div>
        <div class="star-map" v-if="collectMaps.length > 0">
          <h3 class="map-title">收藏地图</h3>
          <img src= "../assets/img/bt_left.png" class="personal-map-star-btn-left" @click="scrollLeftClick2"/>
          <img src= "../assets/img/bt_right.png" class="personal-map-star-btn-right" @click="scrollRightClick2"/>
          <div class="personal-map-star">
            <div class="personal-map-star-item" v-for="(map, index) in collectMaps" @click="directFreeMap(map.id)" :key="index"
            :style="{background: `url(${map.img})`, 'background-size': '100% 100%'}">
              <i class="personal-map-delete" @click.stop="deleteCollection(map.id)">取消</i>
              <div class="personal-map-star-item-bottom">
                <p>作者: {{map.playerName}}</p>
                <p>mapId: {{map.id}}</p>
                <p>通过: {{map.runStatus}}</p>
                <p>发布: {{map.publishStatus}}</p>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <p class="no-star-map">
            <router-link tag="a" :to="{ name: 'ChoosePage'}">您尚未收藏任何,立即前往自由模式</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import toolbar from '../components/toolbar.vue';
import changeHeadpic from '../components/changeHeadpic.vue';
import recharge from '../components/recharge.vue';

import { getVip, getNotVip } from '../assets/js/getPath.js';
import axios from 'axios';
import $ from 'jquery';

import * as api from '../api/api';

export default {
  data() {
    return {
      onLoad: false,
      centerDialogVisible: false,
      vipDialogVisible: false,
      personalPage: 'personalPage',
      vipMsg: '您当前不是VIP',
      vipImage: getNotVip(),
      myMaps: [],
      collectMaps: [],
      personalMsg: {
        passNum: '',
        username: '',
        vip: false,
        headpic: '',
        message: '',
        pass: ''
      },

      backgroundSize: '100% 100%',
      cursor: 'pointer',
      textAlign: 'center',
      width: '230px',
      height: '100%',
      margin: '2% 1%',
      display: 'inline-flex',

      collections: [
        {
          img: ''
        }
      ],
      passGame: ''
    };
  },
  mounted() {
    if (!window.sessionStorage.userMsg) {
      this.$router.push('Login');
    }

    this.$nextTick(() => {
      const userMsg = JSON.parse(window.sessionStorage.userMsg);
      api
        .getCollection(userMsg.id, {
          query: {
            perPage: 999,
            start: 0
          }
        })
        .then(res => {
          this.collectMaps = res.data.collections;
          for (let i = 0; i < this.collectMaps.length; i ++) {
            this.collectMaps[i].img = this.getImg() + this.collectMaps[i].img;
          }
        })
        .catch(err => {
          this.$notify.error({
            title: 'getCollection失败',
            message: err.response.data.error.message,
            offset: 150
          });
        });
      api
        .getCustomeGame(userMsg.id, {
          perPage: 999,
          start: 0
        })
        .then(res => {
          this.myMaps = res.data.customGames;
          for (let i = 0; i < this.myMaps.length; i ++) {
            this.myMaps[i].img = this.getImg() + this.myMaps[i].img;
          }
        })
        .catch(err => {
          this.$notify.error({
            title: 'getCustomeGame失败',
            message: err.response.data.error.message,
            offset: 150
          });
        });
      api
        .getGameScore(userMsg.id)
        .then(res => {
          this.passGame = res.data;
        })
        .catch(err => {
          this.$notify.error({
            title: 'getGameScore失败',
            message: err.response.data.error.message,
            offset: 150
          });
        });
      this.updataMsg();
    });
  },
  methods: {
    updataMsg() {
      this.centerDialogVisible = false;
      setTimeout(() => {
        const userMsg = JSON.parse(window.sessionStorage.userMsg);
        api
          .getPlayer(userMsg.id)
          .then(res => {
            this.personalMsg.headpic = this.getImg() + res.data.portrait;
            this.personalMsg.message = res.data.description;
            this.personalMsg.vip = res.data.vip;
            if (this.personalMsg.vip === 1) {
              this.vipMsg = '尊贵的VIP,您好';
              this.vipImage = getVip();
            }
            this.onLoad = true;
          })
          .catch(err => {
            this.$notify.error({
              title: 'getPlayer失败',
              message: err.response.data.error.message,
              offset: 150
            });
          });
        this.$refs.toolbar.update();
      }, 1000);
    },
    deleteCollection(mapId) {
      const userId = JSON.parse(window.sessionStorage.userMsg).id;
      axios
        .post(`/v1/game/collectionMap`, {
          mapId: mapId,
          type: 1,
          playerId: parseInt(userId),
          collection: -1
        })
        .then(() => {
          axios
            .get(`/v1/game/getCollection/${userId}`, {
              query: {
                perPage: 999,
                start: 0
              }
            })
            .then(res => {
              this.collectMaps = res.data.collections;
              for (let i = 0; i < this.collectMaps.length; i ++) {
                this.collectMaps[i].img =
                  this.getImg() + this.collectMaps[i].img;
              }
              this.$message({
                message: '取消收藏成功',
                type: 'success',
                center: true
              });
            })
            .catch(err => {
              this.$notify.error({
                title: '更新收藏失败',
                message: err.response.data.error.message,
                offset: 150
              });
            });
        })
        .catch(err => {
          this.$notify.error({
            title: '取消收藏失败',
            message: err.response.data,
            offset: 150
          });
        });
    },
    directFreeMap(index) {
      this.$router.push({
        name: 'PlayFreePage',
        query: { id: index }
      });
    },
    scrollLeftClick() {
      const time = 8;
      for (let i = 0; i < 150; i ++) {
        setTimeout(() => {
          $('.personal-map-create').scrollLeft(
            $('.personal-map-create').scrollLeft() - 2
          );
        }, time * i);
      }
    },
    scrollRightClick() {
      const time = 8;
      for (let i = 0; i < 150; i ++) {
        setTimeout(() => {
          $('.personal-map-create').scrollLeft(
            $('.personal-map-create').scrollLeft() + 2
          );
        }, time * i);
      }
    },
    scrollLeftClick2() {
      const time = 8;
      for (let i = 0; i < 150; i ++) {
        setTimeout(() => {
          $('.personal-map-star').scrollLeft(
            $('.personal-map-star').scrollLeft() - 2
          );
        }, time * i);
      }
    },
    scrollRightClick2() {
      const time = 8;
      for (let i = 0; i < 150; i ++) {
        setTimeout(() => {
          $('.personal-map-star').scrollLeft(
            $('.personal-map-star').scrollLeft() + 2
          );
        }, time * i);
      }
    }
  },
  components: {
    toolbar,
    changeHeadpic,
    recharge
  }
};
</script>

<style lang="less" scoped>
@import "../assets/css/animate.css";

@width: 90%;
@height: 750px;
@left: 1%;

.personal-page {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: url("../assets/img/personal-bg.jpg") no-repeat;
  background-size: 100% 100%;
}
.personal {
  margin: 3% 100px 0;
  height: @height;
  width: @width;
}
.personal-headpic {
  margin: 2% 0;
  width: 200px;
  height: 200px;
  position: relative;
  top: -2%;
  left: @left;
  border: solid 5px #1c4938;
  border-radius: 50%;
  transition: all 1s linear;
  &:hover {
    border-radius: 0;
    border: solid 5px #8ebfce;
    filter: brightness(1.1);
    transition: 1s;
  }
}
.personal-headpic-vip {
  position: absolute;
  top: 240px;
  left: 290px;
  width: 30%;
}
.personal-headpic-vip-img {
  background-size: 60px 60px;
  width: 60px;
  height: 60px;
  border: none;
  &:hover {
    filter: brightness(1.2);
    animation: vip 0.5s;
    animation-fill-mode: forwards;
  }
}
@keyframes vip {
  from {
    left: 0px;
  }
  to {
    width: 65px;
    height: 65px;
  }
}
.personal-message {
  width: 400px;
  height: 100px;
  left: @left;
  font-size: 30px;
  color: #1c4938;
  position: relative;
}
.personal-message-img {
  position: relative;
  left: -60px;
  top: -20px;
  z-index: 1;
  transition: all 0.4s;
  cursor: pointer;
  &:hover {
    filter: brightness(1.1);
  }
}
.personal-message-oval {
  position: absolute;
  left: 10px;
  top: 0;
  line-height: 100px;
  font-family: Arial, serif;
  margin: 0 8%;
  z-index: 999;
}
.personal-passnum {
  top: 1%;
  width: 500px;
  height: 50%;
  position: relative;
  left: @left;
  margin-top: 2%;
}
.personal-passnum-img {
  position: relative;
  left: -140px;
  top: -50px;
  z-index: 1;
}
.personal-passnum-title {
  position: relative;
  top: -225px;
  left: -70px;
  color: rgba(34, 34, 34, 0.8);
  z-index: 99;
  padding: 5px 10px;
  font-size: 25px;
  letter-spacing: 2px;
}
.personal-passnum-best {
  margin: -160px 50px 0;
  color: rgba(231, 245, 245, 0.9);
  font-family: Arial, Helvetica, sans-serif;
}
.average-score {
  font-size: 140%;
  margin: 20px -20px;
}
.best-title {
  font-size: 140%;
  margin: 15px -20px;
}
.best-stage {
  font-size: 120%;
  white-space: nowrap;
  margin: 5px 0;
  width: 300px;
  border-bottom: solid 1px rgba(224, 224, 224, 0.5);
  padding: 10px 5px;
  transition: 0.5s;
  &:hover {
    background: rgba(87, 158, 187, 0.2);
  }
}
.no-record {
  position: absolute;
  top: 120px;
  left: 10px;
  font-size: 150%;
  letter-spacing: 2px;
  a {
    color: rgba(209, 185, 49, 0.8);
    text-decoration: none;
    transition: all 0.5s;
    &:hover {
      background: rgba(0, 0, 0, 0.2);
      padding: 10px 20px;
      left: -30px;
      filter: brightness(1.1);
    }
  }
}
.personal-map {
  position: absolute;
  top: 100px;
  left: 40%;
  width: 50%;
  height: 80%;
}
.map-title {
  position: absolute;
  color: rgba(221, 220, 220, 0.8);
  letter-spacing: 5px;
}
.personal-map-create {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 280px;
  overflow-x: hidden;
  overflow-y: hidden;
  white-space: nowrap;
}
::-webkit-scrollbar {
  display: none;
}
.personal-map-star-btn-left {
  cursor: pointer;
  position: relative;
  left: -50px;
  top: 180px;
  z-index: 99;
  transition: all 0.8s;
  &:hover {
    filter: brightness(1.2);
  }
}
.personal-map-star-btn-right {
  .personal-map-star-btn-left;
  left: 950px;
}
.personal-map-star {
  .personal-map-create;
}
.personal-map-star-item {
  cursor: pointer;
  text-align: center;
  width: 230px;
  height: 100%;
  margin: 2% 1%;
  display: inline-flex;
}
.personal-map-delete {
  position: relative;
  background: rgba(12, 12, 12, 1);
  color: snow;
  width: 15%;
  height: 8%;
  left: 85%;
  font-weight: 500;
  text-align: center;
  line-height: 200%;
  font-size: 50%;
  z-index: 999;
  opacity: .4;
  transition: all .5s;
  &:hover {
    background: rgba(12, 12, 12, .8);
    opacity: .8;
  }
}
.personal-map-star-item-bottom {
  line-height: 8px;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: rgba(255, 254, 254, 0.6);
  background: rgba(28, 29, 37, 0.5);
  height: 20%;
  width: 230px;
  top: 80%;
  position: absolute;
  transition: all 1.5s;
  &:hover {
    height: 60%;
    top: 40%;
    transition: 1.5s;
    line-height: 20px;
    color: snow;
    background: rgba(28, 29, 37, 0.8);
  }
}
.star-map {
  margin-top: 95px;
}
.no-star-map {
  position: absolute;
  top: 500px;
  left: 100px;
  font-size: 150%;
  letter-spacing: 2px;
  a {
    color: rgba(209, 185, 49, 0.8);
    text-decoration: none;
    transition: all 0.5s;
    &:hover {
      background: rgba(0, 0, 0, 0.2);
      padding: 10px 20px;
      left: -30px;
      filter: brightness(1.1);
    }
  }
}
.no-create-map {
  .no-star-map;
  top: 200px;
}
</style>
