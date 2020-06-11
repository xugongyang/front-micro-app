<template>
  <div class="app-loading-box">
      <van-loading v-if="pageLoadingShow"  size="48px" :type="loadType" vertical  color="#1989fa">{{loadText}}</van-loading>
  </div>
</template>

<script>
import { Loading } from 'vant';
export default {
  components: {
    [Loading.name]: Loading
  },
  props: {
    pageLoadingShow: Boolean,
    loadText: {type: String,default: ''},
    loadType: {type: String,default: 'circular'} // circular spinner
  }
}
</script>

<style lang="scss" scoped>
.app-loading-box{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  padding: 10px;
  z-index: 9;
  .van-loading__text{color: #1429a0;}
}
</style>
