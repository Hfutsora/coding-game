<template>
  <div class="helloChild">
    <toolbar></toolbar>
    <div class="bg"></div>
    <div v-if="loginOn" class="bg-showall"></div>
    <el-row type="flex" justify="center">
      <!-- <el-col :span="6"><div class="grid-content bg-purple">Hfutsora</div></el-col> -->
      <!-- <el-col :span="6"><div class="grid-content bg-purple-light">CodeFrog</div></el-col> -->
    </el-row>
    <clover></clover>
    <span class="footer"><strong>1_巭仧-group04 Coding Game-</strong></span>
  </div>
</template>

<script>
import toolbar from '../components/toolbar.vue';
import clover from '../components/clover.vue';

export default {
  name: 'HomePage',
  data() {
    return {
      pageNum: 0,
      loginOn: true
    };
  },
  components: {
    toolbar,
    clover
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">

.footer {
  width: 20%;
  position: absolute;
  bottom: 5%;
  left: 40%;
}
.bg {
  position: absolute;
  background: url("../assets/img/HomePage.png");
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  background-size: cover;
}
.bg-showall {
  position: absolute;
  background: url("../assets/img/HomePage_all.png");
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  background-size: cover;
}
.title {
  width: 300px;
  margin: 25% 36% 0;
  font-weight: normal;
}
.el-row {
  margin: 100px 0 0 2%;
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
  text-align: center;
  height: 200px;
  width: 80%;
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
