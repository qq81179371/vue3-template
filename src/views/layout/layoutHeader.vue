<template>
  <div class="ly_header">
    <div class="logo">
      <img src="" v-img alt="" />
    </div>
    <div class="menu">
      <el-menu
        :default-active="route.name"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item
          v-for="item in navMenu"
          :key="item.name"
          :index="item.name"
          >{{ item.label }}</el-menu-item
        >
      </el-menu>
    </div>
    <!-- <div class="notie">
      <el-icon :size="20">
        <bell-filled />
      </el-icon>
      系统通知(0)
    </div> -->
    <div class="user_tabs">
      <el-dropdown size="small">
        <span class="el-dropdown-link">
          <el-icon :size="20">
            <avatar />
          </el-icon>
          <span class="text"> 管理员 </span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-for="item in userOptions" :key="item.name">{{
              item.name
            }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue'
import {
  // BellFilled,
  Avatar
} from '@element-plus/icons'
import { useRoute } from 'vue-router'

export default defineComponent({
  components: {
    // BellFilled,
    Avatar
  },
  setup() {
    const count = ref(0)
    const navMenu = reactive([
      {
        name: 'home',
        label: '首页',
        path: '/home'
      },
      {
        name: 'partyWork',
        label: '党务',
        path: '/party_work'
      },
      {
        name: '大数据',
        label: '大数据',
        path: '/home'
      },
      {
        name: '学习',
        label: '学习',
        path: '/home'
      },
      {
        name: '宣传',
        label: '宣传',
        path: '/home'
      },
      {
        name: '办公',
        label: '办公',
        path: '/home'
      },
      {
        name: '民生',
        label: '民生',
        path: '/home'
      },
      {
        name: '活动',
        label: '活动',
        path: '/home'
      },
      {
        name: '监督',
        label: '监督',
        path: '/home'
      }
    ])
    const userOptions = reactive([
      {
        name: '系统设置',
        label: '系统设置',
        path: '/home'
      },
      {
        name: '账号管理',
        label: '账号管理',
        path: '/home'
      },
      {
        name: '修改密码',
        label: '修改密码',
        path: '/home'
      },
      {
        name: '退出登录',
        label: '退出登陆',
        path: '/login'
      }
    ])
    const route = useRoute()

    return {
      count,
      navMenu,
      route,
      userOptions
    }
  }
})
</script>

<style lang="scss" scoped>
.ly_header {
  display: flex;
  padding: 0 30px;
  align-items: center;
  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      max-width: 60px;
      max-height: 50px;
    }
  }
  .menu {
    flex: 1;
    margin-left: 100px;
    display: flex;
  }
  .notie {
    display: flex;
    align-items: center;
  }
}
.user_tabs {
  .el-dropdown-link {
    display: flex;
    align-items: center;
  }
  .text {
    margin: 0 5px;
  }
}
</style>
