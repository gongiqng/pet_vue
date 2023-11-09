<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px" style="width: 1000px">
      <el-form-item label="店铺名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="店铺地址">
        <el-input v-model="form.address" type="textarea" />
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="form.phone" />
      </el-form-item>
      <el-form-item label="Logo">
        <el-input v-model="form.logo" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">注册店铺</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { registerShop } from '@/api/shop'

export default {
  data() {
    return {
      form: {
        name: '',
        phone: '',
        address: '',
        logo: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
      console.log(this.form)
      const requestData = {
        tel: this.form.phone,
        name: this.form.name,
        address: this.form.address,
        logo: this.form.logo
      }
      registerShop(requestData).then(response => {
        console.log('requestData:', requestData)
        if (response['resultCode'] === 200) {
          this.$message('您的申请已提交，请耐心等待')
          this.$router.back()
        } else {
          this.$message(response['message'])
          alert(response['message'])
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
