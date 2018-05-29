import Vue from 'vue';
import choosePage from '@/pages/choosePage.vue';

describe('choosePage.vue', () => {
  it('页面初始化状态', () => {
    expect(typeof choosePage.data).toBe('function');
    expect(typeof choosePage.mounted).toBe('function');
    expect(choosePage.data().show).toEqual(false);
    expect(choosePage.data().pageNum).toEqual(1);
    expect(choosePage.data().centerDialogVisible).toEqual(false);
    expect(choosePage.data().lastStage).toEqual(1);
  });
  const Constructor = Vue.extend(choosePage);
  const vm = new Constructor().$mount();
  it('页面加载后状态', () => {
    expect(vm.pageNum).toEqual(1);
    expect(vm.show).toEqual(true);
    expect(vm.centerDialogVisible).toEqual(false);
    expect(vm.lastStage).toEqual(1);
  });
});
