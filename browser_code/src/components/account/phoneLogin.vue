<template>
  <div>
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
      <el-form-item for="phone" prop="phone">
        <el-input v-model="ruleForm2.phone" id="phone" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item for="vertify" prop="identify">
        <el-row>
          <el-col :span="15"><el-input id="vertify" placeholder="请输入验证码" v-model="ruleForm2.identify"></el-input></el-col>
          <el-col :span="9"><el-button @click="send" class="send-button" :icon= sendIcon :loading = isLoading :disabled= hasSent>{{sendStatus}}</el-button></el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"  class="submit-login" @click="submitForm('ruleForm2')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    const checkPhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入手机号'));
      }
      const myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!myreg.test(value)) {
        setTimeout(() => {
          callback(new Error('手机号码格式不正确,请重新输入'));
        }, 500);
      }
      else {
        callback();
      }
    };
    const checkIdentify = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入手机验证码'));
      }
      else {
        callback();
      }
    };

    return {
      sendStatus: '发送验证码',
      isLoading: false,
      hasSent: false,
      sendIcon: 'el-icon-message',
      ruleForm2: {
        phone: '',
        identify: ''
      },
      rules2: {
        phone: [
          {
            validator: checkPhone,
            trigger: 'blur'
          }
        ],
        identify: [
          {
            validator: checkIdentify,
            trigger: 'blur'
          }
        ]
      },
      props: []
    };
  },
  methods: {
    submitForm(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          axios
            .post('/v1/game/login', {
              tel: this.ruleForm2.phone,
              vericode: this.ruleForm2.identify
            })
            .then(response => {
              const userMsg = response.data;
              window.localStorage.userMsg = JSON.stringify(userMsg);
              window.sessionStorage.userMsg = JSON.stringify(userMsg);
              this.$router.push('/');
            })
            .catch(e => {
              this.$notify.error({
                title: '失败',
                message: e.response.data.error.message,
                offset: 150
              });
            });
        }
      });
    },
    async send() {
      const myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (myreg.test(this.ruleForm2.phone)) {
        this.isLoading = true;
        this.sendStatus = '正在发送';

        await this.sleep(1000);

        this.isLoading = false;
        this.sendIcon = 'el-icon-check';
        this.sendStatus = '已发送';
        this.hasSent = true;

        axios.get(`/v1/game/veriCode/${this.ruleForm2.phone}`, {
          params: {
            type: 'login'
          }
        });
      }
      else {
        this.$notify.error({
          title: '手机号码格式不正确,请重新输入',
          offset: 150
        });
      }
    }
  }
};
</script>

<style lang="less">
.submit-login {
  width: 100%;
}
.send-button {
  float: right;
}
</style>
