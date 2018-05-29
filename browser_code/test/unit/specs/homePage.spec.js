import homePage from '@/pages/homePage.vue';

describe('homePage.vue', () => {
  it('页面初始化状态', () => {
    expect(typeof homePage.data).toBe('function');
    expect(homePage.data().pageNum).toEqual(0);
    expect(homePage.data().loginOn).toEqual(true);
  });
  // const Constructor = Vue.extend(homePage);
  // const vm = new Constructor().$mount();
  // it('页面加载后状态', () => {
  //   expect(vm.pageNum).toEqual(1);
  //   expect(vm.show).toEqual(true);
  //   expect(vm.centerDialogVisible).toEqual(false);
  //   expect(vm.lastStage).toEqual(6);
  // });
});
