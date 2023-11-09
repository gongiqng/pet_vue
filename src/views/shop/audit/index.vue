<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="55">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="店铺名称" width="150">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="店铺地址" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.address }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.tel }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="60" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.state | statusFilter">{{ scope.row.state }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="注册时间" width="145">
        <template slot-scope="scope">
          <span>{{ formatDate(scope.row.registerTime) }}</span>
        </template>
      </el-table-column>
<!--      <el-table-column label="操作" width="430">-->
<!--        <el-table-column prop="created_at" label="通过" width="88">-->
<!--          <el-button slot-scope="scope" @click="pass(scope.row)">通过</el-button>-->
<!--        </el-table-column>-->
<!--        <el-table-column prop="created_at" label="拒绝" width="88">-->
<!--          <el-button slot-scope="scope" @click="refuse(scope.row)">拒绝</el-button>-->
<!--        </el-table-column>-->
<!--        <el-table-column prop="created_at" label="删除" width="88">-->
<!--          <el-button slot-scope="scope" @click="deleteshop(scope.row)">删除</el-button>-->
<!--        </el-table-column>-->
<!--        <el-table-column prop="created_at" label="修改" width="88">-->
<!--          <el-button slot-scope="scope" @click="update(scope.row)">修改</el-button>-->
<!--        </el-table-column>-->
<!--      </el-table-column>-->
      <el-table-column prop="created_at" label="通过" width="100">
        <el-button slot-scope="scope" @click="pass(scope.row)">通过</el-button>
      </el-table-column>
      <el-table-column prop="created_at" label="拒绝" width="100">
        <el-button slot-scope="scope" @click="refuse(scope.row)">拒绝</el-button>
      </el-table-column >
      <el-table-column prop="created_at" label="删除" width="100">
        <el-button slot-scope="scope" @click="deleteshop(scope.row)">删除</el-button>
      </el-table-column>
      <el-table-column prop="created_at" label="修改" width="100">
        <el-button slot-scope="scope" @click="update(scope.row)">修改</el-button>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      align="center"
      background
      layout="prev,pager,next"
      :total="size"
    />
    <div>
      <el-dialog :title="dialogTitle" :visible.sync="dialogVisible">
        <el-form :model="Data">
          <el-form-item label="店铺名" :label-width="formLabelWidth">
            <el-input v-model="Data.name" autocomplete="off"/>
          </el-form-item>
          <el-form-item label="手机号" :label-width="formLabelWidth">
            <el-input v-model="Data.tel" autocomplete="off"/>
          </el-form-item>
          <el-form-item label="店铺地址" :label-width="formLabelWidth">
            <el-input v-model="Data.address" autocomplete="off"/>
          </el-form-item>
          <el-form-item label="state" :label-width="formLabelWidth">
            <el-input v-model="Data.state" autocomplete="off"/>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="makeSure()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>

import { deleteShop, list, passShop, refuseShop, updateShop } from '@/api/shop'

export default {
  filters: {
    statusFilter(state) {
      const statusMap = {
        0: '待审核',
        1: '审核成功',
        2: '审核失败'
      }
      return statusMap[state]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      Data: [],
      headArr: [
        { prop: 'id', label: 'id' },
        { prop: 'name', label: '店铺名' },
        { prop: 'tel', label: '手机号' },
        { prop: 'address', label: '店铺地址' },
        { prop: 'state', label: '状态' }
      ]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    formatDate(time) {
      var date = new Date(time)
      const strDateTime = (new Date(date)).toLocaleString()
      console.log(strDateTime)
      return strDateTime
    },
    fetchData() {
      this.listLoading = true
      list().then(response => {
        console.log(response)
        if (response['resultCode'] === 200) {
          this.list = response.data
          this.listLoading = false
        } else {
          this.listLoading = false
          this.list = []
          this.$message('数据请求失败，请刷新重试')
        }
      })
    },
    refuse(row) {
      console.log(row.id)
      const adminId = {
        id: row.id
      }
      refuseShop(adminId).then(response => {
        if (response['resultCode'] === 200) {
          this.$message('审核失败')
          this.$router.go(0)
        } else {
          this.$message(response['message'])
        }
      })
    },
    pass(row) {
      console.log(row.id)
      const adminId = {
        id: row.id
      }
      passShop(adminId).then(response => {
        if (response['resultCode'] === 200) {
          this.$message('审核成功')
          this.$router.go(0)
        } else {
          this.$message(response['message'])
        }
      })
    },
    deleteshop(row) {
      console.log(row.id)
      const adminId = {
        id: row.id
      }
      deleteShop(adminId).then(response => {
        if (response['resultCode'] === 200) {
          this.$message('删除成功')
          this.$router.go(0)
        } else {
          this.$message(response['message'])
        }
      })
    },
    update(row) {
      this.ifMaterialEdit = 0
      this.dialogVisible = true
      this.dialogTitle = '编辑'
      this.Data = row
    },
    makeSure() {
      const params = {
        id: this.Data.id,
        name: this.Data.name,
        tel: this.Data.tel,
        address: this.Data.address,
        state: this.Data.state
      }
      console.log(params)
      updateShop(params).then(response => {
        if (response['resultCode'] === 200) {
          this.$message('修改成功')
          this.$router.go(0)
        } else {
          this.$message(response['message'])
        }
      })
    }
  }
}
</script>
