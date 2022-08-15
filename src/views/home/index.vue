<template>
  {{ count }}
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const count = ref('213123')
    const store = useStore()
    onMounted(() => {
      console.log(store)
    })
    return {
      count
    }
  }
})
</script>
