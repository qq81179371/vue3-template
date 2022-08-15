<template>
  <div class="filter_list">
    <div class="lf_contnet">
      <el-input
        class="margin_right_10"
        v-model="listQuery.name"
        placeholder="请输入"
        clearable
        @keyup.enter="getList()"
        @clear="getList()"
      />
      <!-- <el-select
        class="margin_right_10"
        v-model.number="listQuery.type"
        placeholder="请选择"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select> -->
      <el-button plain @click="getList()">查找</el-button>
    </div>
    <div class="rg_content">
      <el-button plain>查看组织架构图</el-button>
      <el-button type="primary" plain @click="handleJumpDetail()"
        >添加党组织</el-button
      >
    </div>
  </div>
  <div class="table_contnet">
    <el-table :data="tableData" border v-loading="isLoading">
      <el-table-column prop="id" align="center" label="编号"> </el-table-column>
      <el-table-column prop="name" align="center" label="支部名称">
      </el-table-column>
      <el-table-column
        prop="subordinateNum"
        align="center"
        width="120px"
        label="下级支部"
      >
      </el-table-column>
      <el-table-column prop="parentPbName" align="center" label="上级支部">
      </el-table-column>
      <el-table-column align="center" label="操作">
        <el-button type="text">添加下级支部</el-button>
        <el-button type="text">添加党员</el-button>
        <el-button type="text">编辑</el-button>
        <el-button type="text">删除</el-button>
      </el-table-column>
    </el-table>
    <div class="pagination_wrap">
      <el-pagination
        @current-change="handleCurrentChange"
        v-model:currentPage="listQuery.page"
        :page-size="10"
        background
        layout="prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
      <span class="count"
        >总共{{ Math.ceil(total / 10) }}页, 本页{{ listQuery.page }}页</span
      >
    </div>
  </div>
</template>

<script>
import {
  defineComponent, ref, reactive, onMounted, toRefs
} from 'vue'
import { useRouter } from 'vue-router'
import usePagination from '@/hooks/usePagination'
import { getBusinessList } from '@/api/business'

export default defineComponent({
  setup() {
    const initData = reactive({
      tableData: [],
      options: []
    })

    const total = ref(0)

    const isLoading = ref(false)

    const listQuery = reactive({
      name: '',
      parentPbId: '',
      limit: 10,
      page: 1
    })
    const router = useRouter()
    const getList = async() => {
      try {
        isLoading.value = true
        const res = await getBusinessList(listQuery)
        initData.tableData = res.data
        total.value = res.count
        isLoading.value = false
      } catch (err) {
        // err
      }
    }

    const handleJumpDetail = (val, type) => {
      router.push({
        path: '/business/org_manage_detail',
        query: {
          id: val ? val.id : undefined,
          type
        }
      })
    }

    onMounted(() => {
      getList()
    })

    const { handleCurrentChange } = usePagination(listQuery, getList)

    return {
      total,
      isLoading,
      listQuery,
      ...toRefs(initData),
      getList,
      handleJumpDetail,
      handleCurrentChange
    }
  }
})
</script>
