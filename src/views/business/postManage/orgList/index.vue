<template>
  <div class="view_title">党组织列表</div>
  <div class="filter_list">
    <div class="lf_contnet">
      {{ listQuery.type }}
      <el-input v-model="listQuery.keyCode" placeholder="请输入" />
      <el-select v-model="listQuery.type" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div class="rg_content"></div>
  </div>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue'

export default defineComponent({
  setup() {
    const a = ref(0)
    const options = reactive([
      {
        value: 1,
        label: '1212'
      }
    ])
    const listQuery = reactive({
      keyCode: '',
      type: 1
    })
    return {
      a,
      options,
      listQuery
    }
  }
})
</script>
