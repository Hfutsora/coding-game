<template>
  <div class="dialog">
    <div class="heading-a">恭喜闯关成功</div>
    <img src="../assets/img/congratulation.png" class="bg bounceIn">
    <div class="blockly-msg">您在第{{index}}关的blockly块消耗为:{{blockly}}块</div>
    <div class="heading-b">本关评价</div>
    <div class="rate">
      <el-rate v-model="stageScore" disabled show-text :texts="['菜鸡','入门','新秀','老手','大神']"></el-rate>
    </div>
    <el-button type="primary" class="next-btn" @click="directStage">下一关</el-button>
    <div class="share" @click="shareSolution" :data-clipboard-text="shareURL">分享我的解法</div>
    <p v-if="false" class="share-url" >{{shareURL}}</p>
  </div>
</template>

<script type="text/ecmascript-6">
import Clipboard from 'clipboard';

export default {
  data() {
    return {
      showURL: false,
      rate: null,
      dialogVisible: false,
      mapId: ''
    };
  },
  props: ['blockly', 'index', 'shareURL', 'stageScore'],
  methods: {
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
          offset: 150
        });
      });
    },
    directStage() {
      const nextId = parseInt(this.$route.query.id) + 1;
      this.$router.push({
        name: 'GamePage',
        query: {
          id: nextId
        }
      });
      this.$emit('nextStage');
    }
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
@import "../assets/css/animate.css";

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
.heading-b {
  margin-left: 44%;
}
.rate {
  padding: 20px 0;
  margin-left: 39%;
}
.next-btn {
  width: 200px;
  margin: 10px 36.5%;
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
.share-url {
  display: none;
  width: 400px;
  background: none;
  padding: 0;
  overflow: hidden;
  margin: 10px 20px 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-bottom: solid 1px black;
}
</style>
