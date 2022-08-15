<template>
 <el-config-provider :locale="locale">
  <div id="app">
    <router-view></router-view>
  </div>
 </el-config-provider>
</template>

<script>
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

export default {
  components: {
    [ElConfigProvider.name]: ElConfigProvider
  },
  setup() {
    const locale = zhCn
    return {
      locale
    }
  }
}

</script>
