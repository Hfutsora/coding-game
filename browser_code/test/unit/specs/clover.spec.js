import Vue from 'vue';
import clover from '@/components/clover.vue';

describe('clover.vue', () => {
  const Constructor = Vue.extend(clover);
  const vm = new Constructor().$mount();
  it('页面初始化状态', () => {
    expect(typeof clover.data).toBe('function');
    const defaultData = clover.data();
    const cloverInit = [];
    expect(defaultData.clovers).toEqual(cloverInit);
  });
  it('页面渲染后的clover', () => {
    const length = 150;
    expect(vm.clovers).toHaveLength(length);
  });
});
