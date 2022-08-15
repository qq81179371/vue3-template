<template>
  <div class="side_title">党务</div>
  <div class="side_nav">
    <el-menu class="el-menu-vertical-demo">
      <template v-for="item in menuList" :key="item.name">
        <el-submenu :index="item.name" v-if="item.children">
          <template #title>
            <i class="el-icon-menu"></i>
            <span>{{ item.label }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              v-for="subItem in item.children"
              :key="subItem.name"
              @click="handleJump(subItem)"
              :index="subItem.name"
              >{{ subItem.label }}
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item :index="item.name" @click="handleJump(item)" v-else>
          <i class="el-icon-menu"></i>
          <template #title>{{ item.label }}</template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const router = useRouter()
    const menuList = reactive([
      {
        name: 'org_manage',
        label: '党组织管理',
        auth: true,
        path: '',
        children: [
          {
            name: 'org_manage_list',
            label: '党组织列表',
            auth: true,
            path: '/org_manage_list'
          },
          {
            name: '党组织地图',
            label: '党组织地图',
            auth: true,
            path: '/党组织地图'
          }
        ]
      },
      {
        name: '党内职务管理',
        label: '党内职务管理',
        auth: true,
        path: '/党内职务管理',
        children: null
      },
      {
        name: '党员管理',
        label: '党员管理',
        auth: true,
        path: '',
        children: [
          {
            name: '党员列表',
            label: '党员列表',
            auth: true,
            path: '/党员列表'
          },
          {
            name: '历史党员',
            label: '历史党员',
            auth: true,
            path: '/历史党员'
          },
          {
            name: '党员登记审核',
            label: '党员登记审核',
            auth: true,
            path: '/党员登记审核'
          }
        ]
      },
      {
        name: '荣誉评选管理',
        label: '荣誉评选管理',
        auth: true,
        path: '',
        children: [
          {
            name: '党员荣誉评选',
            label: '党员荣誉评选',
            auth: true,
            path: '/党员荣誉评选'
          },
          {
            name: '党组织荣誉评选',
            label: '党组织荣誉评选',
            auth: true,
            path: '/党组织荣誉评选'
          }
        ]
      },
      {
        name: '党员发展记实',
        label: '党员发展记实',
        auth: true,
        path: '/党员发展记实',
        children: null
      },
      {
        name: '组织关系转移',
        label: '组织关系转移',
        auth: true,
        path: '',
        children: [
          {
            name: '党员转出系统外',
            label: '党员转出系统外',
            auth: true,
            path: '/党员转出系统外'
          },
          {
            name: '系统外党员转入',
            label: '系统外党员转入',
            auth: true,
            path: '/系统外党员转入'
          },
          {
            name: '系统内关系转移',
            label: '系统内关系转移',
            auth: true,
            path: '/系统内关系转移'
          },
          {
            name: '审核关系转移',
            label: '审核关系转移',
            auth: true,
            path: '/审核关系转移'
          }
        ]
      },
      {
        name: '流动党员',
        label: '流动党员',
        auth: true,
        path: '',
        children: [
          {
            name: '流动党员流出',
            label: '流动党员流出',
            auth: true,
            path: '/流动党员流出'
          },
          {
            name: '流动党员流入',
            label: '流动党员流入',
            auth: true,
            path: '/流动党员流入'
          }
        ]
      },
      {
        name: '积分管理',
        label: '积分管理',
        auth: true,
        path: '',
        children: [
          {
            name: '党员积分',
            label: '党员积分',
            auth: true,
            path: '/党员积分'
          },
          {
            name: '党组织积分',
            label: '党组织积分',
            auth: true,
            path: '/党组织积分'
          }
        ]
      },
      {
        name: '第一书记',
        label: '第一书记',
        auth: true,
        path: '',
        children: [
          {
            name: '书记设置',
            label: '书记设置',
            auth: true,
            path: '/书记设置'
          },
          {
            name: '工作动态',
            label: '工作动态',
            auth: true,
            path: '/工作动态'
          },
          {
            name: '书记日记',
            label: '书记日记',
            auth: true,
            path: '/书记日记'
          }
        ]
      },
      {
        name: '党费缴纳记录',
        label: '党费缴纳记录',
        auth: true,
        path: '/党费缴纳记录',
        children: null
      },
      {
        name: '政治生日',
        label: '政治生日',
        auth: true,
        path: '/政治生日',
        children: null
      }
    ])
    const handleJump = data => {
      router.push({
        name: data.name
      })
    }
    return {
      menuList,
      handleJump
    }
  }
})
</script>
