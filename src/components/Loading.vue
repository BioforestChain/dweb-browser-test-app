<template>
  <div v-if="isLoading" class="loading">
    <div class="loading-spinner"/>
    <div class="loading-text">{{ loadingText }}</div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'

export default {
  props: {
    loadingText: {
      type: String,
      default: 'Loading...',
    },
  },
  setup(props) {
    const isLoading = ref(false)

    const show = () => {
      isLoading.value = true
    }

    const hide = () => {
      isLoading.value = false
    }

    return { isLoading, show, hide, loadingText: props.loadingText }
  },
};
</script>

<style scoped>
.loading {
  position: fixed;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid #3498db;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

.loading-text {
  margin-top: 10px;
}
</style>
