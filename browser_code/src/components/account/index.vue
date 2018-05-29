<template>
  <div class="index-page">
    <div class="back-home" @click="backHome">返回主页</div>
    <div class="login-area">
      <div class="account-check">
        <router-link tag="div" :to="{name: 'Login'}" active-class="this-account-model" class="account-check-btn"><span>密码登录</span></router-link>
        <router-link tag="div" :to="{name: 'PhoneLogin'}" active-class="this-account-model" class="account-check-btn"><span>手机登录</span></router-link>
      </div>
      <div class="account-context">
        <router-view></router-view>
      </div>
      <router-link class="register-btn" tag="div" :to="{name: 'Register'}" >注册CodeFrog账号</router-link>
    </div>
    <div class="login-area-bg"></div>
  </div>
</template>

<script>
import $ from 'jquery';
// import { logOut } from '../../api/api';

export default {
  data() {
    return {
      userMsg: {
        phone: '',
        username: '',
        passRecord: 0,
        headpic: ''
      },
      pageNum: 3,
      personalPage: 'AccountIndex'
    };
  },
  mounted() {
    window.sessionStorage.removeItem('userMsg');
    // logOut().then(() => {
    //   this.$notify({
    //     title: '退出成功',
    //     type: 'success',
    //     offset: 150
    //   });
    this.$router.push({ name: 'Login' });
    // });
  },
  methods: {
    backHome() {
      $('.back-home').css({
        width: '97%',
        top: '0',
        height: '97%',
        left: '0',
        transition: '0.2s',
        background: 'snow',
        opacity: '1'
      });
      setTimeout(() => {
        this.$router.push('/');
      }, 500);
    }
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.back-home {
  font-size: 150%;
  color: rgba(235, 238, 240, 0.74);
  width: 100px;
  height: 40px;
  position: absolute;
  z-index: 999;
  top: 80px;
  left: 60px;
  opacity: 0.5;
  transition: all 0.5s;
  &:hover {
    filter: brightness(1.2);
    color: rgba(255, 255, 255, 0.99);
    background: rgba(181, 226, 228, 0.2);
    padding: 10px 20px;
    left: 40px;
    top: 70px;
  }
}
.index-page {
  background: url("../../assets/img/index.jpg") fixed;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.login-area-bg {
  background: inherit;
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  height: 100%;
  overflow: hidden;
  filter: blur(8px);
  transition: all 1s;
  &:hover {
    filter: blur(2px);
  }
}
.login-area {
  position: absolute;
  width: 60%;
  height: 400px;
  margin: 10% 20%;
  padding: 50px 0 40px;
  z-index: 99;
  background: rgba(152, 185, 207, 0.2);
  transition: all 0.6s;
  &:hover {
    box-shadow: 0px 0px 10px rgba(64, 100, 78, 0.5);
  }
}
.account-context {
  margin: 2% 18%;
  width: 55%;
}
.account-check {
  width: 60%;
  display: flex;
  margin-left: 20%;
  margin-top: 2%;
  flex-flow: row nowrap;
  .account-check-btn {
    flex: 1;
    position: relative;
    height: 50px;
    span {
      display: block;
      position: absolute;
      width: 100px;
      height: 32px;
      left: 50%;
      top: 8px;
      margin-left: -50px;
      line-height: 32px;
      text-align: center;
      font-size: 15px;
      color: #b3a7a7;
      font-size: 110%;
    }
    &.this-account-model span {
      border-bottom: 2px solid #ffb000;
      color: #faf1f1;
      font-size: 120%;
      top: 0px;
    }
  }
}
.register-btn {
  width: 145px;
  margin-top: 5%;
  margin-left: 43%;
  color: #415c80;
  &:hover {
    border-bottom: rgb(28, 33, 37) solid 2px;
  }
}
</style>