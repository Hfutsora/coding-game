<template>
  <div class="bot">
     <div class="tool-bar">
      <div id="top-tool">
        <div id="logo-img">
          <el-tooltip class="item" effect="light" content="回到主页" placement="bottom-start" transition="el-fade-in-linear" :open-delay= 200>
            <img src="../assets/logo.png" class= "logo" @click="returnHome"/>
          </el-tooltip>
        </div>
        <div id="nav">
          <div class="nav-menu">
            <router-link tag="a" :to="{name: 'HomePage'}">首页</router-link>
            <router-link tag="a" :to="{name: 'ChoosePage'}">游戏</router-link>
            <router-link v-if="!isOn" tag="a" :to="{name: 'Login'}">
              <span>登录</span>
            </router-link>
          </div>
          <div class="dropdown">
            <router-link v-if="isOn" tag="a" :to="{name: 'PersonalPage'}">
              <img v-if="isOn" class="headpic" :src= headpic />
            </router-link>
            <div class="dropdown-content">
              <router-link tag="a" :to="{name: 'HomePage'}">首页</router-link>
              <router-link tag="a" :to="{name: 'ChoosePage'}">游戏</router-link>
              <router-link tag="a" :to="{name: 'setFreedomPage'}">创建地图</router-link>
              <router-link tag="a" :to="{name: 'Login'}">退出登录</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOn: false,
      headpic: ''
    };
  },
  methods: {
    returnHome() {
      this.$router.push({ name: 'HomePage' });
    },
    update() {
      this.headpic =
        this.getImg() + JSON.parse(window.sessionStorage.userMsg).portrait;
    }
  },
  mounted() {
    if (window.sessionStorage.userMsg) {
      this.headpic =
        this.getImg() + JSON.parse(window.sessionStorage.userMsg).portrait;
      this.isOn = true;
    }
  }
};
</script>

<style lang="less" scoped>
.dropdown {
  display: inline-block;
  &:hover {
    .dropdown-content {
      display: block;
      animation: dropdown 0.5s;
      animation-fill-mode: forwards;
    }
  }
}
@keyframes dropdown {
  from {
    height: 0;
  }
  to {
    height: 340%;
    display: block;
  }
}
.dropdown-content {
  display: none;
  overflow: hidden;
  position: absolute;
  z-index: 999;
  top: 52px;
  background: rgba(173, 190, 159, 0.8);
  min-width: 200px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  a {
    float: left;
    width: 100%;
    font-size: 120%;
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    border-bottom: solid 2px rgba(255, 255, 255, 0.5);
    opacity: 0.6;
    overflow: hidden;
    white-space: nowrap;
    background: rgba(173, 190, 159, 0.8);
    transition: all 1s;
    &:hover {
      opacity: 1;
      color: rgb(68, 116, 68);
      border-bottom: solid 2px rgb(104, 121, 101);
      animation: fillRight .5s;
      animation-fill-mode: forwards;
      animation-timing-function: ease-out;
    }
  }
}
@keyframes fillRight {
  from {
    background: rgba(173, 190, 159, 0);
    width: 15%;
  }
  to {
    background: rgba(244, 248, 240, 0.8);
    width: 100%;
  }
}
.bot {
  margin-bottom: 60px;
}
.logo {
  height: 60px;
  margin-left: 30px;
  width: 70px;
}
.plz-login {
  display: block;
  float: left;
  padding: 3% 8.3%;
  line-height: 130%;
  color: #3c4637;
  font-size: 150%;
  text-decoration: none;
  &:hover {
    color: rgb(44, 22, 97);
    background: rgba(228, 223, 230, 0.5);
  }
}
.headpic {
  border-radius: 50%;
  margin: 0 18px;
  position: absolute;
  top: 5px;
  width: 50px;
  height: 50px;
}
.account {
  position: absolute;
  line-height: 60px;
  margin-left: 45%;
  height: 100%;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 150%;
  color: aliceblue;
  width: 200px;
}
.tool-bar {
  width: 100%;
  height: 60px;
  min-width: 1280px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  background: url("../assets/img/top_nav.png");
}
#top-tool {
  height: 100%;
  width: 99%;
  float: left;
}
#logo-img {
  position: absolute;
  float: left;
  margin-left: 4%;
  filter: saturate(0.8);
  &:hover {
    filter: brightness(1.5);
    filter: saturate(1.2);
  }
}
#nav {
  float: right;
  height: 100%;
  width: 500px;
  margin-left: 20%;
}
#nav .nav-menu {
  width: 100%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
}
#nav .nav-menu a {
  display: block;
  float: left;
  padding: 3% 8.3%;
  line-height: 130%;
  color: #3c4637;
  font-size: 150%;
  text-decoration: none;
  &:hover {
    color: rgb(44, 22, 97);
    background: rgba(228, 223, 230, 0.5);
  }
}
</style>
