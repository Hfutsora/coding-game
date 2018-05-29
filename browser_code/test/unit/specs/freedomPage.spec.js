import freedomPage from '@/pages/freedomPage.vue';

describe('freedomPage.vue', () => {
  it('页面初始化状态', () => {
    expect(typeof freedomPage.data).toBe('function');
    const maps = [
      {
        author: 'hfutsora',
        star: '5星',
        collection: '1000收藏',
        createTime: '4/3'
      },
      {
        author: 'salutyfish',
        star: '',
        collection: '',
        createTime: ''
      }
    ];
    expect(freedomPage.data().maps).toEqual(maps);
  });
  // const Constructor = Vue.extend(freedomPage);
  // const vm = new Constructor().$mount();
  // it('页面加载后状态', () => {
  //   expect(vm.pageNum).toEqual(1);
  //   expect(vm.show).toEqual(true);
  //   expect(vm.centerDialogVisible).toEqual(false);
  //   expect(vm.lastStage).toEqual(6);
  // });
});
