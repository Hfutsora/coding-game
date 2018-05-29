import Vue from 'vue';
import Register from '@/components/account/register.vue';

describe('register.vue', () => {
  it('注册页面渲染', () => {
    const Constructor = Vue.extend(Register);
    const vm = new Constructor().$mount();

    expect(vm.$el.querySelector('.title').textContent)
      .toEqual('注册codefrog新账号');
  });
});

describe('register.vue', () => {
  it('send函数', () => {
    const Constructor = Vue.extend(Register);
    const vm = new Constructor().$mount();

    setTimeout(() => {
      expect(vm.sendStatus)
        .toEqual('已发送');
    }, 2000);
  });
});

// describe('register.vue', () => {
//   it('注册验证码错误或用户名重复', () => {
//     const Constructor = Vue.extend(Register);
//     const vm = new Constructor().$mount();

//     vm.ruleForm2.phone = 15155189170;
//     vm.ruleForm2.identify = 123456;
//     vm.ruleForm2.username = 'hfutsora';
//     vm.ruleForm2.pass = 123456;
//     vm.ruleForm2.checkPass = 123456;

//     const button = vm.$el.querySelector('.submit-btn');
//     const clickEvent = new window.Event('click');
//     button.dispatchEvent(clickEvent);

//     vm._watcher.run()

//     expect(vm.errorMsg)
//       .toEqual('');
//   });
// });
