import Vue from 'vue';
import Carousel from '@/components/carousel.vue';

describe('carousel.vue', () => {
  const Constructor = Vue.extend(Carousel);
  const vm = new Constructor().$mount();
  it('页面初始化状态', () => {
    expect(vm.autoplay)
      .toEqual(false);
  });
});
