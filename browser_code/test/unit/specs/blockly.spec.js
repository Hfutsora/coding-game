import Vue from 'vue';
import blockly from '@/components/blockly.vue';

describe('blockly.vue', () => {
  const Constructor = Vue.extend(blockly);
  const vm = new Constructor().$mount();
  it('页面初始化状态', () => {
    expect(vm.workspace).toEqual(null);
    expect(typeof vm.runCode).toBe('function');
    expect(typeof vm.showCode).toBe('function');
  });
});
