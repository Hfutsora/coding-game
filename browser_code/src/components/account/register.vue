<template>
  <div class="register-page">
    <div class="back-home" @click="backHome">返回主页</div>
    <router-link tag="div" class="back-login" :to="{name: 'Login'}">返回登录</router-link>
    <div class="register-body">
      <div class="title">注册codefrog新账号</div>
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <el-form-item prop="phone">
          <el-input v-model="ruleForm2.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="18">
            <el-form-item prop="identify">
              <el-input v-model="ruleForm2.identify" placeholder="请输入验证码" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button class="send-button" @click="send" :icon= sendIcon :loading = isLoading :disabled= hasSent>{{sendStatus}}</el-button>
          </el-col>
        </el-row>
        <el-form-item prop="username">
          <el-input v-model="ruleForm2.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
          <el-form-item prop="pass">
            <el-input type="password" v-model="ruleForm2.pass" auto-complete="off" placeholder="请输入密码"></el-input>
          </el-form-item>
        <el-form-item prop="checkPass">
          <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="请确认密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')" class="submit-btn" >注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="register-area-bg"></div>
  </div>
</template>

<script>
import axios from 'axios';
import $ from 'jquery';
import crypto from 'crypto';

export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      }
      else {
        if (this.ruleForm2.checkPass !== '') {
          this.$refs.ruleForm2.validateField('checkPass');
        }
        callback();
      }
    };
    const validatePass2 = async(rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      }
      else {
        await this.sleep(500);
        if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致'));
        }
        else {
          callback();
        }
      }
    };
    const checkIdentify = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入手机验证码'));
      }
      callback();
    };
    const checkName = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入用户名'));
      }
      callback();
    };
    const checkPhone = async(rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入手机号'));
      }
      const myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!myreg.test(value)) {
        await this.sleep(500);
        callback(new Error('手机号码格式不正确,请重新输入'));

        return false;
      }
      callback();

      return true;
    };

    return {
      hasSent: false,
      sendStatus: '发送验证码',
      passIn: true,
      isLoading: false,
      isValid: false,
      sendIcon: 'el-icon-message',
      errorMsg: '',
      ruleForm2: {
        pass: '',
        checkPass: '',
        username: '',
        identify: '',
        phone: ''
      },
      rules2: {
        pass: [
          {
            validator: validatePass,
            trigger: 'blur'
          }
        ],
        checkPass: [
          {
            validator: validatePass2,
            trigger: 'blur'
          }
        ],
        username: [
          {
            validator: checkName,
            trigger: 'blur'
          }
        ],
        identify: [
          {
            validator: checkIdentify,
            trigger: 'blur'
          }
        ],
        phone: [
          {
            validator: checkPhone,
            trigger: 'blur'
          }
        ]
      }
    };
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
    },
    send() {
      const myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (myreg.test(this.ruleForm2.phone)) {
        this.isLoading = true;
        this.sendStatus = '正在发送';
        setTimeout(() => {
          this.isLoading = false;
          this.sendIcon = 'el-icon-success';
          this.sendStatus = '已发送';
          this.hasSent = true;
          axios
            .get(`/v1/game/veriCode/${this.ruleForm2.phone}`, {
              params: {
                type: 'register'
              }
            })
            .then(response => {
              this.notifyMsg(response);
              this.$router.push('/');
            })
            .catch(error => {
              this.$notify.error({
                title: '失败',
                message: error.response.data.error.message,
                offset: 150
              });
            });
        }, 2000);
      }
      else {
        this.$notify.error({
          title: '手机号码格式不正确,请重新输入',
          offset: 150
        });
      }
    },
    submitForm(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          const md5 = crypto.createHash('md5');
          md5.update(this.ruleForm2.pass);
          const password = md5.digest('hex');
          axios
            .put('/v1/game/register', {
              name: this.ruleForm2.username,
              tel: this.ruleForm2.phone,
              vericode: this.ruleForm2.identify,
              passwd: password,
              type: 'register'
            })
            .then(() => {
              this.$notify({
                title: '注册成功',
                message: '',
                type: 'success',
                offset: 150
              });
              setTimeout(() => {
                this.$router.push({ name: 'Login' });
              }, 2000);
            })
            .catch(error => {
              this.$notify.error({
                title: '失败',
                message: error.response.data.error.message,
                offset: 150
              });
            });
        }
      });
    }
  }
};
</script>

<style lang="less">
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
.register-page {
  background: url("../../assets/img/index.jpg") fixed;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.back-login {
  position: absolute;
  top: 10%;
  left: 72%;
  color: darkcyan;
  font-size: 120%;
  cursor: pointer;
  &:hover {
    border-bottom: darkcyan solid 1px;
  }
  z-index: 99;
}
.title {
  margin-left: 40%;
  font-size: 200%;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 5%;
  z-index: 99;
}
.register-body {
  position: absolute;
  width: 40%;
  background: rgba(152, 185, 207, 0.2);
  padding: 50px 200px 50px 100px;
  margin: 8% 21%;
  z-index: 99;
  transition: all 0.5s;
  &:hover {
    box-shadow: 0px 0px 10px rgba(64, 100, 78, 0.5);
  }
}
.register-area-bg {
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
.send-button {
  float: right;
}
.submit-btn {
  width: 100%;
  margin-top: 2%;
}
</style>
