<template>
  <div>
    <transition-group name="bounce">
      <div v-for="(clover, index) in clovers" :key= index v-if="clovers[index].clover" :id= index @mouseover="clovers[index].clover = false"></div>
    </transition-group>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  data() {
    return {
      clovers: []
    };
  },
  methods: {

  },
  mounted() {
    const leaf = 150;
    for (let i = 0; i < leaf; i ++) {
      this.clovers.push({
        clover: true
      });
      const left = Math.floor((Math.random() * 45) + 1) * 20;
      const top = Math.floor((Math.random() * 35) + 1) * 15;

      this.$nextTick(() => {
        $(`#${i}`).addClass('clover');
        $(`#${i}`).css(
          { left: `${left}px`,
            top: `${top}px` }
        );
      });
    }
  }
};
</script>

<style lang="less" scoped>
.clover {
  cursor: url('../assets/img/sickle.png'), auto;
  top: 200px;
  left: 4%;
  position: absolute;
  width: 200px;
  height: 200px;
  background: url("../assets/img/clover.gif") no-repeat;
}
.bounce-enter-active {
  animation: bounce-in .6s;
}
.bounce-leave-active {
  animation: bounce-in .6s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>

