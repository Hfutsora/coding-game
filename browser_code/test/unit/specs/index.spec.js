import Vue from 'vue';
import index from '@/components/account/index.vue';

describe('index.vue', () => {
  const Constructor = Vue.extend(index);
  const vm = new Constructor().$mount();
  it('页面初始化状态', () => {
    expect(vm.userMsg.phone).toEqual('');
    expect(vm.userMsg.username).toEqual('');
    expect(vm.userMsg.passRecord).toEqual(0);
    expect(vm.userMsg.headpic).toEqual('');
    expect(vm.pageNum).toEqual(3);
    expect(vm.personalPage).toEqual('AccountIndex');
  });
});
