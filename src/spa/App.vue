<template>
  <div id="app">
    <img src="./assets/test.jpg" />
    <p>
      <router-link to="/">redirect Init</router-link>
    </p>
    <p>
      <router-link to="/A">redirect A</router-link>
    </p>
    <p>
      <router-link to="/B">redirect B</router-link>
    </p>
    <p>
      <router-link to="/C">redirect C</router-link>
    </p>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
