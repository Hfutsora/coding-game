import Vue from 'vue';
import ChangeHeadpic from '@/components/changeHeadpic.vue';

describe('changeHeadpicl.vue', () => {
  const Constructor = Vue.extend(ChangeHeadpic);
  const vm = new Constructor().$mount();
  it('页面初始化状态', () => {
    expect(vm.dialogVisible).toEqual(false);
    expect(vm.options[0].value).toEqual('男');
    expect(vm.options[0].label).toEqual('男');
    expect(vm.options[1].value).toEqual('女');
    expect(vm.options[1].label).toEqual('女');
    expect(vm.personalMsg.playerId).toEqual('');
    expect(vm.personalMsg.headpic).toEqual('');
    expect(vm.personalMsg.username).toEqual('');
    expect(vm.personalMsg.message).toEqual('');
    expect(vm.personalMsg.sex).toEqual('男');
    expect(vm.personalMsg.headChange).toEqual(0);
  });
});
