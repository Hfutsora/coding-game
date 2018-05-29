// jest.mock('axios', () => ({
//   post: jest.fn()
// }));
import Vue from 'vue';
import login from '@/components/account/login.vue';
// import { mount } from '@vue/test-utils';
// import axios from 'axios';


describe('login.vue', () => {
  const Constructor = Vue.extend(login);
  const vm = new Constructor().$mount();
  it('页面初始化状态', () => {
    expect(vm.sendStatus)
      .toEqual('发送验证码');
    // expect(vm.passIn)
    //   .toEqual(true);
    // expect(vm.isLoading)
    //   .toEqual(false);
    // expect(vm.sendIcon)
    //   .toEqual('el-icon-message');
  });
});
// describe('login.vue', () => {
//   let wrapperDeep = null;

//   beforeEach(() => {
//     const Constructor = Vue.extend(login);
//     wrapperDeep = new Constructor().$mount();
//   });

//   it('测试名字验证为空', () => {
//     wrapperDeep.ruleForm2.name = '';
//     //获得error
//     expect();
//   });
//   it('测试名字正确', () => {
//     wrapperDeep.ruleForm2.name = '姓名';
//     global.setTimeout(() => {
//       expect(wrapperDeep.checkName).toEqual(true);
//     }, 1000);
//   });
//   it('测试名字的callback', () => {
//     wrapperDeep.ruleForm2.name = '姓名';
//     global.setTimeout(() => {
//       expect(wrapperDeep.checkName).toEqual(true);
//     }, 1000);
//   });
// });
// // works
// test.only('测试名字验证为空', () => {
//   wrapperDeep.ruleForm2.name = '';
//   expect(axios.get).toBeCalledWith('/v1/game/veriCode/');
//   console.log(,
//     JSON.stringify(wrapperDeep.ruleForm2, null, ' '));
//   // wrapperDeep.setData({ ruleForm2: ruleForm });
//   global.setTimeout(() => {
//     expect(vm.sendStatus).toEqual('已发送');
//     expect(axios.get).toBeCalledWith('/v1/game/veriCode/');
//   }, 2000);
//   });
// // expect(wrapperDeep.data.ruleForm2.name).toBe('姓名');
// expect(wrapperDeep.find('#name').text()).toBe('姓名');
// expect(wrapperDeep.find('#pass').text()).toBe('20133201');
// // expect(wrapperDeep.data.checkName).toBe(true);
// // expect(wrapperDeep.data.validatePass).toBe(true);
// const input = wrapperDeep.find('#name');
// input.element.value = '姓名';
// input.trigger('click');
// const Constructor = Vue.extend(login);
// const vm = new Constructor().$mount();
// expect(vm.checkName).toBe(true);
// expect(wrapperDeep.checkName).toBe(true);



// jest.mock('axios', () => ({
//   post: jest.fn()
// }))

// describe('login.vue', () => {
//   it('Calls axios.post', () => {
//   const Constructor = Vue.extend(login);
//   const vm = new Constructor().$mount();
//     vm.$nextTick(() => {
//       expect(axios.get).toBeCalledWith('/v1/game/getStandardMapDetail/');
//       done();
//   });
//   })
// });

// describe('login.vue', () => {
//   let wrapperDeep = null;

//   beforeEach(() => {
//     const Constructor = Vue.extend(login);
//     wrapperDeep = new Constructor().$mount();
//   });

//   it('测试请求发送成功', () => {
//     const form = {
//       pass: '123456',
//       name: '姓名'
//     };
//     wrapperDeep.ruleForm2 = form;
//     const button = wrapperDeep.find('el-button');
//     button.trigger('click');
//     expect(axios.get).toBeCalledWith('https://jsonplaceholder.typicode.com/posts?q=an')
//     //获得error
//     expect();
//   });
// });
