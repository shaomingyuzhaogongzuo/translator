<script setup>
import Translator from './components/Translator.vue'
</script>

<template>
  <div id="app">
    <Translator/>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f5f7fa;
}

#app {
  min-height: 100vh;
}
</style>