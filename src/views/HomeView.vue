<template>
  <div class="home">
    <div class="container">
      <img alt="Rick and Morty" src="../assets/imgs/homeImg.png" class="img-responsive">
      <HelloWorld msg="This is the project of Vue Course in the ACM group"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>

<style scoped>
.container{
  width: 40%;
  margin: auto;
}
.img-responsive{
  width: 100%;
  margin: auto;
  
}
</style>
