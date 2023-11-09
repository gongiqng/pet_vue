<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="部门SN">
        <el-input v-model="form.sn" />
      </el-form-item>
      <el-form-item label="部门名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="部门状态">
        <el-select v-model="form.state" placeholder="please select your zone">
          <el-option label="正常" value="0" />
          <el-option label="已停用" value="1" />
        </el-select>
      </el-form-item>
      <el-form-item label="上级部门">
        <el-tag
          v-for="tag in tags"
          :key="tag.name"
          closable
          :type="tag.type">
          {{tag.name}}
        </el-tag>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { createDepartment } from '@/api/department'
export default {
  data() {
    return {
      form: {
        sn: '',
        name: '',
        state: ''
      },
      parentDepartment: null,
      tags: []
    }
  },
  // parentDepartment: null,
  created() {
    this.parentDepartment = this.$route.params.data
    console.log(this.parentDepartment)
    if (!this.parentDepartment) {
      this.tags.push({
        name: '暂未选择'
      })
    } else {
      this.tags.push({
        name: this.parentDepartment['name']
      })
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
      console.log(this.form)
      const requestData = {
        sn: this.form.sn,
        name: this.form.name,
        state: this.form.state,
        parent: {
          id: this.parentDepartment['id']
        }
      }
      createDepartment(requestData).then(response => {
        console.log('requestData:', requestData)
        if (response['resultCode'] === 200) {
          this.$router.push({ path: '/department/index' })
        } else {
          this.$message(response['message'])
        }
      })
    },

    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

