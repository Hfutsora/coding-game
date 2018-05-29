<template>
  <!-- 充值组件 -->
  <div class="vip-recharge">
    <div class="heading">
      您当前{{isVIP}}VIP
    </div>
    <div v-if= "!vip" class="msg">
      <div class="tit">购买vip价格:&nbsp;￥15</div>
      充值VIP将解锁全部闯关关卡和自由模式。
    </div>
    <div v-else class="msg">
      全部闯关关卡和自由模式已解锁
    </div>
    <a :href="uri" v-if= "!vip" class="btn">立即充值</a>
  </div>
</template>

<script type="text/ecmascript-6">
import { recharge } from '../api/api';

export default {
  data() {
    return {
      dialogVisible: false,
      isVIP: '是',
      uri: ''
    };
  },
  props: ['vip'],
  components: {},
  mounted() {
    if (this.vip === 1) {
      this.isVIP = '是';
    }
    else {
      this.isVIP = '不是';
    }
    const playerId = JSON.parse(window.sessionStorage.userMsg).id;
    recharge(playerId)
      .then(res => {
        this.uri = res.data.uri;
      })
      .catch(err => {
        this.$notify.error({
          title: '失败',
          message: err.response.data.error.message,
          offset: 150
        });
      });
  },
  methods: {}
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.vip-recharge {
  margin: 0 auto;
  padding: 10px 50px 50px;
  text-align: center;
}
.heading {
  margin: 0 auto;
  font-size: 150%;
}
.msg {
  font-size: 130%;
  margin: 30px 0 60px;
  .tit {
    margin: 20px;
    color: rgb(158, 154, 154);
  }
}
.btn {
  text-align: left;
  text-decoration: none;
  color: rgb(22, 21, 14);
  background: url("../assets/img/recharge.png") no-repeat;
  background-size: contain;
  padding: 18px 50px;
  width: 400px;
  font-size: 120%;
  transition: all 0.2s;
  &:hover {
    filter: brightness(1.1);
  }
}
</style>
