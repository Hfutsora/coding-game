<template>
  <div>
    <div class="loading-progress" v-show="progressLeft < 100">
      <div class="loading-line">
        <div class="progress-val" id="progressVal" :style="{ left: progressLeft + '%'}">{{progressLeft}}%</div>
        <span class="progress-bar">
          <span class="progress-in" id="progressIn" :style="{ width: progressLeft + '%'}"></span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['progressLeft']
};
</script>

<style lang="less" scoped>
.loading-progress {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999999;
  width: 100%;
  height: 100%;
  background: rgb(73, 102, 88);
}
.loading-line {
  position: absolute;
  top:40%;
  left: 5%;
  height: 20%;
  width: 90%;
}
#loading {
  display: none;
}
.progress-bar {
  display: block;
  overflow: hidden;
  height: 20%;
  margin: 3% 0;
  background: #b8b8b8;
  border-radius: 4px;
  background-image: -webkit-linear-gradient(
    top,
    rgba(0, 0, 0, 0.2),
    transparent 60%
  );
  background-image: -moz-linear-gradient(
    top,
    rgba(0, 0, 0, 0.2),
    transparent 60%
  );
  background-image: -o-linear-gradient(
    top,
    rgba(0, 0, 0, 0.2),
    transparent 60%
  );
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.2),
    transparent 60%
  );
  -webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.2),
    0 1px rgba(255, 255, 255, 0.6);
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.2), 0 1px rgba(255, 255, 255, 0.6);
}
.progress-val {
  // left: 10px;
  position: absolute;
  font-size: 150%;
  color: snow;
}
.progress-in {
  display: block;
  position: absolute;
  min-width: 20px;
  height: 20%;
  background: #1997e6;
  background-image: -webkit-linear-gradient(
      top,
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0) 60%,
      rgba(0, 0, 0, 0) 61%,
      rgba(0, 0, 0, 0.2)
    ),
    -webkit-linear-gradient(left, #147cd6, #24c1fc);
  background-image: -moz-linear-gradient(
      top,
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0) 60%,
      rgba(0, 0, 0, 0) 61%,
      rgba(0, 0, 0, 0.2)
    ),
    -moz-linear-gradient(left, #147cd6, #24c1fc);
  background-image: -o-linear-gradient(
      top,
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0) 60%,
      rgba(0, 0, 0, 0) 61%,
      rgba(0, 0, 0, 0.2)
    ),
    -o-linear-gradient(left, #147cd6, #24c1fc);
  background-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0) 60%,
      rgba(0, 0, 0, 0) 61%,
      rgba(0, 0, 0, 0.2)
    ),
    linear-gradient(to right, #147cd6, #24c1fc);
  border-radius: 4px;
  -webkit-box-shadow: inset 0 1px rgba(0, 0, 0, 0.2),
    inset 0 0 0 1px rgba(0, 0, 0, 0.2);
  box-shadow: inset 0 1px rgba(0, 0, 0, 0.2), inset 0 0 0 1px rgba(0, 0, 0, 0.2);
}
</style>