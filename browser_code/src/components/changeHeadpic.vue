<template>
  <!-- 修改头像组件 -->
  <div class="change-headpic-wraper">
    <div class="white-item-wrpaer">
      <label for="man">头像:</label>
      <input type="file" name="headpic" id="headpic" class="head-pic" multiple="multiple" v-on:change="changeHeadpic();" />
      <img :src= personalMsg.headpic id="show-headpic" />
    </div>

    <div class="white-item-wrpaer">
      <label for="username">用户名:</label>
      <input type="text" id="username" v-model= personalMsg.username>
    </div>
    <div class="white-item-wrpaer">
      <label for="sex">性别:</label>
      <el-select v-model="personalMsg.sex" placeholder="请选择" size= "small" class="selection">
        <el-option
          v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="white-item-wrpaer">
      <label for="message">简介:</label>
      <input type="text" id="message" v-model= personalMsg.message>
    </div>
    <el-button type="primary" class="submit-btn" @click= submit>确定</el-button>
  </div>
</template>

<script type="text/ecmascript-6">
import $ from 'jquery';
import axios from 'axios';

export default {
  data() {
    return {
      dialogVisible: false,
      options: [
        {
          value: '男',
          label: '男'
        },
        {
          value: '女',
          label: '女'
        }
      ],
      personalMsg: {
        playerId: '',
        headpic: '',
        username: '',
        message: '',
        sex: '男',
        headChange: 0
      }
    };
  },
  components: {},
  mounted() {
    const userMsg = JSON.parse(window.sessionStorage.userMsg);
    this.personalMsg.playerId = userMsg.id;
    this.personalMsg.username = userMsg.name;
    this.personalMsg.message = userMsg.description;
    this.personalMsg.headpic = this.getImg() + userMsg.portrait;
    this.personalMsg.sex = userMsg.gender;
  },
  methods: {
    changeHeadpic() {
      const file = $('#headpic').get(0).files[0];
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
        this.personalMsg.headpic = imgFile;
        this.personalMsg.headChange = 1;
      };
    },
    submit() {
      this.$confirm('确认修改？')
        .then(() => {
          axios
            .post(`/v1/game/modifyInformation/${this.personalMsg.playerId}`, {
              name: this.personalMsg.username,
              gender: this.personalMsg.sex,
              description: this.personalMsg.message,
              portrait: this.personalMsg.headpic,
              headChange: this.personalMsg.headChange
            })
            .then(res => {
              this.$notify({
                title: '成功',
                message: '修改成功',
                type: 'success',
                offset: 150
              });
              window.sessionStorage.userMsg = JSON.stringify(res.data);
            })
            .catch(err => {
              this.$notify.error({
                title: '失败',
                message: err.response.data.error.message,
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

<style scoped lang="less" rel="stylesheet/less">
.white-item-wrpaer {
  margin: 5%;
  display: block;
  position: relative;
  height: 50px;
  padding: 0 1%;
  line-height: 50px;
  text-align: right;
  background-color: #fff;
  border-bottom: 1px solid #efeded;
  .selection {
    width: 100px;
  }
  label {
    position: absolute;
    left: 20px;
    top: 0;
  }
  .head-pic {
    position: absolute;
    left: 20%;
    top: 0;
    width: 80%;
    height: 50px;
    opacity: 0;
    z-index: 1;
  }
  img {
    position: absolute;
    right: -2px;
    bottom: 2px;
    border-radius: 50%;
    border: solid 2px rgba(120, 148, 223, 0.4);
    z-index: 0;
    width: 55px;
    height: 55px;
  }
}
.submit-btn {
  margin: 0 5%;
  width: 90%;
}
input {
  height: 30px;
  border: none;
  text-align: right;
  background: rgba(248, 246, 246, 0);
  &:focus {
    outline: none;
    box-shadow: 0 2px #9ecaed;
    transition: 0.5s;
  }
}
</style>