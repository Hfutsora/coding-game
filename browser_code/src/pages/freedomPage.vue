<template>
  <div class="freedom-map">
    <toolbar :pageName= '自由关卡'></toolbar>
    <div>
      <div class="freedom-map-item" v-for="(map, index) in maps" :key= index>
        <div class="freedom-map-item-map">这是地图</div>
        <div class="freedom-map-item-info">
          <h3>{{map.author}}</h3>
          <p>{{map.star}}</p>
          <h3>{{map.author}}</h3>
        </div>
        <div class="freedom-map-item-collect">收藏</div>
      </div>
    </div>
  </div>
</template>

<script>
import toolbar from '../components/toolbar.vue';
import { getMap } from '../api/api';

export default {
  data() {
    return {
      maps: [
        {
          author: 'hfutsora',
          star: '5星',
          collection: '1000收藏',
          createTime: '4/3'
        },
        {
          author: 'salutyfish',
          star: '',
          collection: '',
          createTime: ''
        }
      ]
    };
  },
  components: {
    toolbar
  },
  mounted() {
    getMap(JSON.parse(window.localStorage.userMsg).id)
      .then(res => {
        this.Map.push(JSON.stringify(res.data));
      })
      .catch(err => {
        this.notifyErr(err);
      });
  }
};
</script>

<style lang="less" scoped>
@mapWidth: 400px;
@mapHeight: 200px;

.freedom-map {
  background: rgba(31, 83, 15, 0.5);
  height: 750px;
}
.freedom-map-item {
  width: @mapWidth;
  height: @mapHeight;
  margin: 80px 40px;
  background: rgb(48, 41, 51);
}
.freedom-map-item-map {
  display: block;
  margin: 0;
  padding: 0;
}
.freedom-map-item-info {
  position: relative;
}
.freedom-map-item-collect {
  width: @mapWidth;
  height: 20px;
  margin-bottom: 0;
  bottom: 0;
  line-height: 0px;
  position: relative;
  background: rgb(255, 255, 255);
}
</style>

