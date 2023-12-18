<template>
  <div class="home">
    <ul>
      <li><a @click="gotoPubsub">发布订阅</a></li>
      <li><a @click="gotoLog">接收日志</a></li>
    </ul>
    <!-- <button @click="tmp">test</button> -->
  </div>
</template>

<script setup lang="ts">
import router from '@/router'

function gotoPubsub() {
  router.push({
    path: 'pubsub',
  })
}
function gotoLog() {
  router.push({
    path: 'log',
  })
}

// async function tmp() {
//   const resp = await request({
//     url: 'http://127.0.0.1:8070/',
//     method: 'POST',
//     headers: { 'Content-Type': 'application/octet-stream' },
//     data: new TextEncoder().encode(JSON.stringify({ name: 'abc' }))
//   })
//   console.log('resp: ', resp)
// }
</script>

<style lang="less" scoped>
.back {
  margin-left: 20px;
  margin-top: 10px;
}
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--c-text);
  padding: calc(var(--w-space) * 3) 0;
  margin: 0 auto;
}
</style>
