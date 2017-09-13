<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <el-button @click.native="startHacking">Yes!</el-button>
    <router-link to="/test">test</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
        msg: 'Want something new?'
    }
  },

  methods: {
    startHacking () {
      this.$notify({
        title: 'Shhh',
        message: 'Just be patient...',
        duration: 6000
      })
    }
  }
}
</script>

<style>
#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
}
</style>
