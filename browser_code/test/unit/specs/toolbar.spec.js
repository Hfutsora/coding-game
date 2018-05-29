import Vue from 'vue';
import toolbar from '@/components/toolbar.vue';

describe('toolbar.vue', () => {
  const Constructor = Vue.extend(toolbar);
  const vm = new Constructor().$mount();
  it('页面初始化状态', () => {
    expect(vm.personalMsg).toEqual(undefined);
    expect(typeof toolbar.data).toBe('function');
    expect(typeof toolbar.methods.returnHome).toBe('function');
  });
});
