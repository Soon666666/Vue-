<template>
  <div class="scrollPic">
    <img id="lunbo_img" src="/ad01.jpg">
  </div>
</template>
   


<script>
var timer = null;//定时器操作句柄
export default {
  created() {
    //2.定义定时器
    timer = setInterval(lunbo, 2000);
  },
  beforeDestroy() {
    //3.销毁组件时候，取消定时器
    clearInterval(timer);
  }
};
var index = 1;

function lunbo() {
  index++;
  //判断index是否大于3
  if (index > 2) {
    index = 1;
  }
  //获取img对象
  var img = document.getElementById("lunbo_img");
  //设置图片
  if (img) {
    img.src = "/ad0" + index + ".jpg";
  }
}


//
</script>
  
<style scoped>
.scrollPic {
  width: 610px;
  height: 220px;
  float: left;
  margin: 10px 50px auto 50px;
}

.scrollPic img {
  width: 610px;
  height: 220px;
}
</style>