import { useLocalStorage } from '@vueuse/core'

const cache = {
  topics: [],
}

// type CacheVaueType = typeof cache
type CacheVaueType = {
  topics: string[]
}
type Keys = keyof CacheVaueType

export function useLocalCache() {
  function getCache<T extends Keys>(key: T): CacheVaueType[T] {
    return useLocalStorage(key, cache[key]).value
  }

  function setCache<T extends Keys>(key: T, value: CacheVaueType[T]) {
    useLocalStorage(key, cache[key] as CacheVaueType[T]).value = value
  }

  function removeCache(key: Keys) {
    useLocalStorage(key, cache[key]).value = null
  }

  function clearCache() {
    localStorage.clear()
  }

  return { getCache, setCache, removeCache, clearCache }
}
