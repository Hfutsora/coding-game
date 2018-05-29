export default{
  install(Vue) {
    Vue.prototype.notifyErr = err => {
      this.$notify.error({
        title: '失败',
        message: err,
        offset: 150
      });
    };
    Vue.prototype.notifyMsg = msg => {
      this.$notify({
        title: '成功',
        message: msg,
        type: 'success',
        offset: 150
      });
    };
    Vue.prototype.getImg = () => {
      return 'http://bio.measurex.top/public/';
    };
    Vue.prototype.sleep = ms => {
      return new Promise(resolve => setTimeout(resolve, ms));
    };
  }
};
