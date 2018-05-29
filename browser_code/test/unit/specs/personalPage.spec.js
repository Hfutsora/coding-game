import personalPage from '@/pages/personalPage.vue';

describe('personalPage.vue', () => {
  it('页面初始化状态', () => {
    expect(typeof personalPage.data).toBe('function');
    expect(typeof personalPage.mounted).toBe('function');
    const defaultData = personalPage.data();
    expect(defaultData.centerDialogVisible).toEqual(false);
    expect(defaultData.personalPage).toEqual('personalPage');
    const personalMsg = {
      passNum: '',
      username: '',
      vip: false,
      headpic: '',
      message: '',
      pass: ''
    };
    expect(defaultData.personalMsg).toEqual(personalMsg);
    const collections = [{
      img: ''
    }];
    expect(defaultData.collections).toEqual(collections);
    const passGame = '';
    expect(defaultData.passGame).toEqual(passGame);
  });
  // const Constructor = Vue.extend(personalPage);
  // const vm = new Constructor().$mount();
  // it('页面加载后状态', () => {
  //   expect(vm.pageNum).toEqual(1);
  //   expect(vm.show).toEqual(true);
  //   expect(vm.centerDialogVisible).toEqual(false);
  //   expect(vm.lastStage).toEqual(6);
  // });
});
