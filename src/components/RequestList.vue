<template>
  <div class="back" @click="goBack"> &lt; 返回 </div>
  <div>
    <h1>log</h1>
    <div v-for="item in list" :key="item">
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
import { ref, onBeforeUnmount } from 'vue'
import { BasePlugin } from '@plaoc/plugins'
import manifest from '../../manifest.json'
import type { $MMID } from '@dweb-browser/js-process'

type Records = {key: string, val: any}[]

class IDB extends BasePlugin {
  getEntries() {
    const url = '/keyval'
    return this.fetchApi(url, { method: 'GET' }).object<Records>()
  }
}
const iDB = new IDB(manifest.id as $MMID)

const list = ref([])

const clearTime = setInterval(() => {
  iDB.getEntries().then((resp) => {
    list.value = resp as never[]
  })
}, 3000)

onBeforeUnmount(() => {
  clearInterval(clearTime)
})

function goBack() {
  router.go(-1)
}

</script>
