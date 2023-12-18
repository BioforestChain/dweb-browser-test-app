<template>
  <div class="back" @click="router.go(-1)"> &lt; 返回 </div>
  <div class="home">
    <div class="sub">
      <input v-model="topic" />
      <button @click="sub()">订阅topic</button>
    </div>

    <div class="pub">
      <div>
        <span>订阅历史：</span>
        <select v-model="selectedTopic">
          <option v-for="topic in topics" :key="topic">{{ topic }}</option>
        </select>
        <button @click="topic = selectedTopic; sub();">重新订阅</button>
      </div>
      <textarea v-model="data" />
      <button @click="pub()">发布消息</button>
    </div>

    <div class="log">
      <h3>订阅收到的数据</h3>
      <span v-for="(log, index) in logs" :key="index">{{ log }}</span>
    </div>

    <Loading ref="loadingComponent" :loadingText="loadingText"/>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount } from 'vue'
import { useLocalCache } from '@/utils/cache'
import router from '@/router'
import Loading from '@/components/Loading.vue'
import pubsub from '@/api/pubsub'
import type { Result } from '@/api/pubsub'

const loadingText = ref('处理中...')
const loadingComponent = ref()

const { getCache, setCache } = useLocalCache()

const topic = ref<string>()
const topics = ref<string[]>([])
const selectedTopic = ref<string>()
const data = ref<string>()
const logs = ref<{}[]>([])
topics.value = getCache('topics') as string[]
selectedTopic.value = topics.value[0]

const intervalID = setInterval(async () => {
  logs.value = await getLogs()
}, 2000)

onBeforeUnmount(() => {
  clearInterval(intervalID)
})

async function sub() {
  if (topic.value) {
    loadingComponent.value.show()

    const resp: Result = await pubsub.sub<Result>(JSON.stringify({ topic: topic.value }))
    console.log('test sub resp: ', resp)
    loadingComponent.value.hide()

    if (resp.success) {
      addUnshift(topic.value, topics.value)
      setCache('topics', topics.value)
      selectedTopic.value = topic.value
      topic.value = ''
      alert('订阅成功')
      return
    }
    alert(resp.message)
  }
}

async function pub() {
  if (selectedTopic.value && data.value) {
    loadingComponent.value.show()

    const resp: Result = await pubsub.pub(JSON.stringify({topic: selectedTopic.value, data: data.value }))
    console.log('test pub resp: ', resp)
    loadingComponent.value.hide()

    if (!resp.success) {
      alert(resp.message)
    } else {
      alert('发布成功')
    }
  }
}

async function getLogs() {
  const lgs = []

  const allLogs = await pubsub.logs<{ key: string; val: any }[]>()
  for (const log of allLogs) {
    if ('topic' in (log.val as {})) {
      lgs.push(log)
    }
  }

  return lgs
}

const addUnshift = (n: string, ns: string[]) => {
  for (const item of ns) {
    if (n === item) {
      return
    }
  }

  ns.unshift(n)
}
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
  padding: calc(var(--w-space) * 2) 0;
  margin: 0 auto;
}
input {
  height: 20px;
}

button {
  padding: 5px;
  margin: 0 20px;
}
.sub {
  background-color: #f4f4f5;
  height: 69px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
}
.pub {
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #e9e9eb;
  padding: 50px;

  select {
    width: 100px;
    height: 28px;
    margin-bottom: 10px;
    option {
      padding: 0 10px;
    }
  }
  textarea {
    height: 100px;
    width: 200px;
    margin-bottom: 10px;
  }
}
.log {
  background-color: #dedfe0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  p {
    word-wrap: break-word;
    word-break: break-all;
  }
}
</style>
