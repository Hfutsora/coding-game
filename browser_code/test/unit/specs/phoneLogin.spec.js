import Vue from 'vue';
import PhoneLogin from '@/components/account/phoneLogin.vue';
// import axios from 'axios';
// import { mount } from '@vue/test-utils';
// import ElementUI from 'element-ui';
// Vue.use(ElementUI);

describe('PhoneLogin.vue', () => {
  const Constructor = Vue.extend(PhoneLogin);
  const vm = new Constructor().$mount();
  it('页面初始化状态', () => {
    expect(vm.sendStatus).toEqual('发送验证码');
    // expect(vm.passIn).toEqual(true);
    // expect(vm.isLoading).toEqual(false);
    // expect(vm.hasSent).toEqual(false);
    // expect(vm.sendIcon).toEqual('el-icon-message');
    // expect(vm.ruleForm2.phone).toEqual('');
    // expect(vm.ruleForm2.identify).toEqual('');
  });
});

describe('PhoneLogin.vue', () => {
  it('用户点击验证码发送', () => {
    const Constructor = Vue.extend(PhoneLogin);
    const vm = new Constructor().$mount();

    setTimeout(() => {
      expect(vm.sendStatus).toEqual('已发送');
      expect(vm.isLoading).toEqual(false);
      expect(vm.sendIcon).toEqual('el-icon-check');
      expect(vm.hasSent).toEqual(true);
    }, 2000);
  });
});
// jest.mock('axios', () => ({
//   get: jest.fn()
// }));
// describe('PhoneLogin.vue', () => {
//   it('Calls axios.get', () => {
//     const Constructor = Vue.extend(PhoneLogin);
//     const vm = new Constructor().$mount();
//     setTimeout(() => {
//       expect(vm.sendStatus).toEqual('已发送');
//       expect(axios.get).toBeCalledWith('/v1/game/veriCode/');
//     }, 2000);
//   });
// });
// describe('PhoneLogin.vue', () => {
//   let wrapperDeep = null;

//   beforeEach(() => {
//     wrapperDeep = mount(PhoneLogin, {});
//   });

//   // works
//   it('测试命名', () => {
//     wrapperDeep.setData({ ruleForm2: {
//       phone: '18755199125',
//       identify: '1234'
//     }
//     });
//     setTimeout(() => {}, 1000);

//     // expect(wrapperDeep.data.ruleForm2.name).toBe('姓名');
//     expect(wrapperDeep.find('#phone').text()).toBe('18755199125');
//     // expect(wrapperDeep.find('#pass').text()).toBe('20133201');
//     // expect(wrapperDeep.data.checkName).toBe(true);
//     // expect(wrapperDeep.data.validatePass).toBe(true);
//   });
// });
