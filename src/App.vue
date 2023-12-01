<template>
  <div id="app">
    <Header></Header>
    <Menus></Menus>
    <router-view/>
    
  </div>
</template>
<script>
import Header from '@/components/Header.vue';
import Menus from '@/components/Menus.vue';
import {factPrice, currency,formatTime}from './utils/util.js'
export default {
  components:{
    Header,
    Menus
  },
  //使用provide和inject方式可以在所有组件间传递
  provide(){
    return {
      factPrice,
      currency,
      formatTime
    }
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
