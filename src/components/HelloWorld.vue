<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      Vue is a JavaScript framework for building user interfaces. It builds on top of standard HTML, CSS and JavaScript, and 
      provides a declarative and component-based programming model that helps you efficiently develop user interfaces, be it simple or complex.
      <a href="https://vuejs.org" target="_blank" rel="noopener">vue-page</a>.
    </p>
    <h3>FJDC Distrital University</h3>
    <h3>Carlos Alberto Guerrero Benavides</h3>
    <h4>20182135043</h4>
    <h3>ACM Group</h3>
    <h4>Vue Course</h4>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
