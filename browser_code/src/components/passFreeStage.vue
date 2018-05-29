<template>
  <div class="dialog">
    <div class="heading-a">恭喜闯关成功</div>
    <img src="../assets/img/congratulation.png" class="bg bounceIn">
    <div class="blockly-msg">您在自由模式{{index}}关的blockly块消耗为:{{blockly}}块</div>
    <el-button :type="type" :icon="icon" round class="collect-map" @click="collectMap">{{message}}</el-button>
    <div class="block">
      <span class="demonstration">给个评分吧</span>
      <el-rate
        v-on:change="sendScore"
        v-model="value"
        show-text
        :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
      </el-rate>
    </div>
    <el-button type="primary" class="next-btn" @click="directFreeStage">选择其他关卡</el-button>
    <div class="share" @click="shareSolution" :data-clipboard-text="shareURL">分享我的解法</div>
    <p v-if="false" class="share-url" >{{shareURL}}</p>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios';
import Clipboard from 'clipboard';

export default {
  data() {
    return {
      value: 0,
      message: '收藏',
      collection: '',
      type: 'warning',
      icon: 'el-icon-star-off',
      dialogVisible: false,
      mapId: ''
    };
  },
  props: ['index', 'shareURL', 'blockly'],
  mounted() {
    this.mapId = this.index;
  },
  methods: {
    sendScore() {
      axios
        .post(`/v1/game/scoreCustomGame`, {
          mapId: parseInt(this.mapId),
          score: this.value
        })
        .catch(err => {
          this.$notify.error({
            title: '失败',
            message: err.response.data.error.message,
            offset: 150
          });
        });
    },
    shareSolution() {
      const clipboard = new Clipboard('.share');
      this.$notify({
        title: '链接已复制',
        message: '分享给其他人吧 -o(*￣▽￣*)ブ',
        type: 'success',
        offset: 150
      });

      clipboard.on('error', () => {
        this.$notify.error({
          title: '链接复制失败',
          message: '再试试吧 /(ㄒoㄒ)/~~',
          type: 'success',
          offset: 150
        });
      });
    },
    collectMap() {
      this.icon = 'el-icon-loading';
      if (this.message === '收藏') {
        this.collection = 1;
        setTimeout(() => {
          this.type = 'success';
          this.icon = 'el-icon-check';
          this.message = '已收藏';
        }, 1000);
      }
      else {
        this.collection = -1;
        setTimeout(() => {
          this.type = 'warning';
          this.icon = 'el-icon-star-off';
          this.message = '收藏';
        }, 1000);
      }
      axios
        .post(`/v1/game/collectionMap`, {
          mapId: parseInt(this.mapId),
          type: 1,
          playerId: JSON.parse(window.sessionStorage.userMsg).id,
          collection: this.collection
        })
        .then(() => {
          setTimeout(() => {
            if (this.collection === 1) {
              this.$notify({
                title: '收藏成功',
                type: 'success',
                offset: 150
              });
            }
            else {
              this.$notify({
                title: '已取消收藏',
                type: 'success',
                offset: 150
              });
            }
          }, 1000);
        })
        .catch(err => {
          this.$notify.error({
            title: '失败',
            message: err.response.data,
            offset: 150
          });
        });
    },
    directFreeStage() {
      this.$router.push('ChoosePage');
    }
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
@import "../assets/css/animate.css";

.collect-map {
  position: absolute;
  left: 540px;
  top: 336px;
}
.block {
  text-align: center;
  position: relative;
  margin: 20px 0;
  margin-left: -25px;
}
.dialog {
  width: 100%;
  padding: 0 20px 30px;
  min-width: 600px;
  font-size: 120%;
}
.bg {
  position: absolute;
  z-index: 5;
  width: 500px;
  height: 200px;
  top: 20px;
  left: 185px;
}
.heading-a {
  position: absolute;
  font-size: 150%;
  font-family: Arial, Helvetica, sans-serif;
  color: rgb(255, 255, 255);
  margin-left: 37%;
  top: 105px;
  z-index: 99;
}
.blockly-msg {
  padding: 20px 0;
  margin-top: 100px;
  margin-left: 30%;
  font-size: 120%;
}
.next-btn {
  width: 200px;
  margin: 10px 30%;
}
.share {
  float: right;
  padding: 10px 20px;
  color: rgb(146, 146, 146);
  transition: all 0.4s;
  &:hover {
    color: rgb(93, 169, 189);
    background: rgba(218, 230, 227, 0.2);
  }
}
</style>
