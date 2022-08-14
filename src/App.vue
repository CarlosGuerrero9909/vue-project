<template>
  <!-- <va-affix :offset-top="100">
      <div style="padding: 10px 30px; background-color: lightblue;">
        Fixed at the top: 100
      </div>
  </va-affix> -->
  <va-navbar color="success" class="mb-2" shape>
    <template #left>
      <va-navbar-item>
        <router-link to="/" class="ancla"><img class="logo" src="@/assets/imgs/Logo.png" alt=""></router-link>
      </va-navbar-item>
    </template>
    <!-- <template #center>
      
    </template> -->
    <template #right>
      <va-navbar-item><router-link to="/" class="ancla">Home</router-link></va-navbar-item>
      <va-navbar-item><router-link to="/characters" class="ancla">Characters</router-link></va-navbar-item>
      <va-navbar-item><router-link to="/locations" class="ancla">Locations</router-link></va-navbar-item>
      <va-navbar-item><router-link to="/episodes" class="ancla">Episodes</router-link></va-navbar-item>
    </template>
  </va-navbar>
  <!-- <nav>
    <router-link to="/">Home</router-link> 
    <router-link to="/about">About</router-link> 
    <router-link to="/otros">Otros</router-link> 
  </nav> -->
  <router-view/>
</template>

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

.ancla{
  font-size: 1.5rem;
  color: #2c82e0;
  padding: 10px;
}

.ancla:focus{
  color: lightcyan;
}

.ancla:hover{
  background-color: #2c82e0;
  color: lightcyan;
  box-shadow: 5px 5px 10px #2c82e0;
  transform: translateY(-10%);
  transition: all 300ms ease;
}

.logo{
  height: 100px;
}


</style>
