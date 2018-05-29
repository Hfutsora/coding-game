<template>
  <div class="map-page">
    <div class="annimate" v-if="isLoading">
      <i class="el-icon-loading"></i>
      <span>正在玩命加载中...</span>
    </div>
    <div class="map-line" id="map-line">
      <div class="map-content">
        <div v-for="(map, index) in maps" :key="index" class="map-item" id="index" :style="{background: `url(${map.img}) no-repeat 0% 0%/100% 100%`}" @click="directFreeMap(index)">
          <div class="map-msg">
            <p>作者: {{map.playerName}}</p>
            <p>地图id: {{map.id}}</p>
            <p>评分: {{map.score}}</p>
            <p>收藏: {{map.people}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="scroll-line">
      <div @mousedown="scrollBtn" class="scroll-block" :style="{ left: scrollLeft + '%'}"></div>
    </div>
  </div>
</template>

<script>
import * as api from '../api/api';
import $ from 'jquery';

export default {
  data() {
    return {
      maps: [],
      page: 0,
      self: '',
      isLoading: false,
      scrollLeft: ''
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.self = this;
      const _self = this.self;
      api
        .getFreeMaps({
          perPage: 5,
          start: Math.floor(this.maps.length / 5)
        })
        .then(res => {
          // console.log(res.data.customGames);
          this.maps = res.data.customGames;
          for (let i = 0; i < this.maps.length; i ++) {
            this.maps[i].img = `${this.getImg() + this.maps[i].img}`;
          }
          this.page ++;

          let $this = $('#map-line');

          if (document.addEventListener) {
            document.addEventListener('mousewheel', scroll, false);
          }
          else {
            document.attachEvent('onmousewheel', scroll);
          }

          function scroll(event) {
            const direction = event.wheelDelta;
            $this.scrollLeft($this.scrollLeft() - (direction * 0.6));
            // 可见宽度
            const viewW = $this.width();
            // 内容宽度
            const contentW = $this.get(0).scrollWidth;
            // 滚动宽度
            const scrollLeft = $this.scrollLeft();

            _self.scrollLeft = 95 * scrollLeft / (contentW - viewW);
            // if(contentH - viewH - scrollTop <= 100) { //到达底部100px时,加载新内容
            if (scrollLeft / (contentW - viewW) >= 0.95) {
              // 到达底部100px时,加载新内容
              _self.animate = true;
              if (!_self.isLoading) {
                _self.isLoading = true;
                _self.pushMore();
              }
            }
          }
        })
        .catch(err => {
          this.$notify.error({
            title: '获取自由模式地图失败',
            message: err.response.data.error.message,
            offset: 150
          });
        });
    });
  },
  methods: {
    pushMore() {
      api
        .getFreeMaps({
          perPage: 5,
          start: Math.floor(this.maps.length / 5)
        })
        .then(res => {
          res.data.customGames.forEach(e => {
            e.img = `${this.getImg() + e.img}`;
            if (e.id > this.maps[this.maps.length - 1].id) {
              this.maps.push(e);
            }
          });
          setTimeout(() => {
            this.isLoading = false;
          }, 500);
          if (res.data.customGames.length < 5) {
            this.$notify.error({
              title: '没有更多地图啦 /(ㄒoㄒ)/~~',
              offset: 50
            });
          }
          this.page ++;
        })
        .catch(err => {
          if (err.response.data.error.id === 67012) {
            this.hasNoMore = true;
          }
        });
    },
    directFreeMap(index) {
      this.$router.push({
        name: 'PlayFreePage',
        query: { id: index + 1 }
      });
    },
    scrollBtn() {
      this.$message({
        message: '暂不支持拖动, 前端累了 /(ㄒoㄒ)/~~',
        type: 'warning',
        center: true
      });
    }
  }
};
</script>

<style lang="less" scoped>
::-webkit-scrollbar {
  display: none;
}
.annimate {
  text-align: center;
  line-height: 450px;
  font-size: 500%;
  position: absolute;
  color: snow;
  background: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 75%;
  top: 12%;
  left: 0;
  z-index: 999;
}
.map-line {
  width: 100%;
  height: 500px;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
}
.map-img {
  z-index: 0;
  position: absolute;
  width: 320px;
  height: 400px;
}
.map-item {
  height: 450px;
  width: 400px;
  display: inline-block;
  box-sizing: border-box;
  margin: 0 30px;
  transition: all 0.5s;
  font-size: 110%;
  &:hover {
    filter: brightness(1.1);
  }
}
.map-msg {
  margin-top: 89%;
  background: rgba(0, 0, 0, 0.3);
  width: 400px;
  height: 21%;
  z-index: 999;
  opacity: 0.8;
  color: rgba(255, 255, 255, 0.5);
  text-align: center;
  overflow: hidden;
  transition: all 0.5s;
  &:hover {
    height: 45%;
    color: rgb(253, 253, 253);
    margin-top: 62%;
    background: rgba(0, 0, 0, 0.8);
  }
}
.scroll-line {
  border: solid 10px rgb(226, 226, 226);
  position: absolute;
  width: 90%;
  height: 10px;
  margin-top: 1%;
  background: rgba(255, 255, 255, 0.4);
  box-shadow: 0px 5px 10px rgb(51, 51, 51);
  left: 5%;
}
.scroll-block {
  position: absolute;
  width: 5%;
  height: 15px;
  top: -2px;
  background: rgb(255, 255, 255);
  box-shadow: 0px 0px 15px rgb(199, 84, 109);
  &:hover {
    cursor: move;
  }
}
</style>
