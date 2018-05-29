<template>
  <div>
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="rule-form">
      <el-form-item for="name" prop="name">
        <el-input v-model="ruleForm2.name" id="name" placeholder="请输入用户名或手机号"></el-input>
      </el-form-item>
      <el-form-item for="pass" prop="pass">
        <el-input type="password" id="pass" v-model="ruleForm2.pass" auto-complete="off" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="submit-btn" @click="submitForm('ruleForm2')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import crypto from 'crypto';
import axios from 'axios';

export default {
  data() {
    const checkName = (rule, value, callback) => {
      if (!value) {
        callback(new Error('姓名不能为空'));

        return;
      }

      this.sleep(1000);
      callback();
    };
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      }
      else {
        callback();
      }
    };

    return {
      sendStatus: '发送验证码',
      isLoading: false,
      sendIcon: 'el-icon-message',
      ruleForm2: {
        pass: '',
        name: ''
      },
      rules2: {
        pass: [{ validator: validatePass,
          trigger: 'blur' }],
        name: [{ validator: checkName,
          trigger: 'blur' }]
      },
      props: [

      ]
    };
  },
  methods: {
    submitForm(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          const md5 = crypto.createHash('md5');
          md5.update(this.ruleForm2.pass);
          const passwd = md5.digest('hex');
          axios
            .post('/v1/game/LoginPasswd', {
              tel: this.ruleForm2.name,
              passwd: passwd
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
  }
};
</script>

<style>
.rule-form {
  color: snow;
}
.submit-btn {
  width: 100%;
}
</style>
