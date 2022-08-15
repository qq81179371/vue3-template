<template>
  <LayoutHeader ref="LayoutHeader" />
  <div class="menu_content">
    <div class="side_left">
      <partyBusinessSide />
    </div>
    <div class="content_shell">
      <breadcrumb />
      <div class="view_content">
        <div class="view_title">{{ route.meta.title }}</div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import LayoutHeader from './layoutHeader.vue'
import partyBusinessSide from './navMenu/partyBusiness.vue'
import breadcrumb from '@/components/Breadcrumb/index.vue'

export default defineComponent({
  components: {
    LayoutHeader,
    breadcrumb,
    partyBusinessSide
  },
  setup() {
    const route = useRoute()
    return {
      route
    }
  }
})
</script>

<style lang="scss" scoped>
.menu_content {
  display: flex;
  .side_left {
    width: 210px;
    flex-shrink: 0;
  }
  .content_shell {
    background: #f2f2f2;
    flex: 1;
    min-height: calc(100vh - 61px);
    padding: 10px 20px 0 20px;
    display: flex;
    flex-direction: column;
    .view_content {
      flex: 1;
      margin-top: 20px;
      background: #fff;
      padding: 20px;
      .view_title {
        padding-bottom: 5px;
        border-bottom: 1px solid #333;
      }
    }
  }
}
</style>
