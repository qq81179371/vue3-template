<template>
  <!-- <div class="view_title">请填写党组织资料</div> -->
  <el-form
    :model="formData"
    :rules="rules"
    ref="formRef"
    class="form_info"
    label-width="100px"
  >
    <el-form-item label="上级组织" prop="parentId">
      <el-select v-model="formData.parentId" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="组织名称" prop="name">
      <el-input v-model="formData.name"></el-input>
    </el-form-item>
    <el-form-item label="联系电话" prop="contactNumber">
      <el-input v-model="formData.contactNumber"></el-input>
    </el-form-item>
    <el-form-item label="选择城区" prop="areaCode">
      <el-select v-model="formData.areaCode" placeholder="请选择省/市/街道">
        <el-option label="区域一" value="shanghai"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="详细街道" prop="address">
      <el-input v-model="formData.address"></el-input>
      <MapLocation />
    </el-form-item>
    <el-form-item label="位置定位" prop="longitude" class="tude">
      <span class="margin_right_5">经:</span>
      <el-input v-model="formData.longitude"></el-input>
      <span class="margin_left_20 margin_right_5">纬:</span>
      <el-input v-model="formData.latitude"></el-input>
    </el-form-item>
    <el-form-item label="概述" prop="summary">
      <el-input
        class="max_width_800"
        type="textarea"
        :autosize="{ minRows: 4, maxRows: 10}"
        v-model="formData.summary"
      ></el-input>
    </el-form-item>
    <el-form-item label="简介" prop="notes">
      <editor v-model="formData.notes" />
    </el-form-item>
    <el-form-item>
      <el-button @click="resetForm()">取消</el-button>
      <el-button type="primary" @click="submitForm()">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { defineComponent, reactive } from 'vue'
import Editor from '@/components/Tinymce/index.vue'
import MapLocation from '@/components/MapLocation/index.vue'

export default defineComponent({
  components: {
    Editor,
    MapLocation
  },
  setup() {
    const formData = reactive({
      id: '',
      name: '',
      parentId: '',
      contactNumber: '',
      areaCode: '',
      address: '',
      longitude: 0,
      latitude: 0,
      summary: '',
      notes: '21312321'
    })
    const rules = reactive({})
    const submitForm = () => {}
    const resetForm = () => {}

    return {
      formData,
      rules,
      submitForm,
      resetForm
    }
  }
})
</script>

<style lang="scss" scoped>
.form_info {
  margin: 30px 0;
  .el-form-item {
    .el-input {
      max-width: 400px;
    }
    &.tude {
      display: flex;
      .el-input {
        max-width: 100px;
      }
      span {
        color: #666;
      }
    }
    .max_width_800 {
      max-width: 800px;
    }
  }
}
</style>
