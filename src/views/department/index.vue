<template>
  <div class="app-container">
    <!--    <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;" />-->
    <div class="left-block">

      <div class="sidebar-action">
        <el-button icon="el-icon-plus" @click="toAddDepartmentPage">新增部门</el-button>
        <el-button icon="el-icon-delete" @click="deleteDepartment">删除部门</el-button>
      </div>

      <el-tree
        ref="tree2"
        :data="data1"
        :props="defaultProps"
        :filter-node-method="filterNode"
        class="filter-tree"
        default-expand-all
      />
    </div>

    <div class="right-block">
      <div class="sidebar-action">
        <el-button icon="el-icon-plus" @click="dialogFormVisible = true">新增人员</el-button>
        <el-button icon="el-icon-delete">批量删除</el-button>
      </div>
      <!-- 在表格中显示用户信息 -->
      <el-table :data="tableData" border stripe>
        <el-table-column type="index" width="80" />
        <el-table-column label="ID" prop="id" width="80" />
        <el-table-column label="姓名" prop="username" width="80" />
        <el-table-column label="邮箱" prop="email" width="150" />
        <el-table-column label="电话" prop="phone" width="120" />
        <el-table-column label="年龄" prop="age" width="70" />
        <el-table-column label="部门id" prop="did" width="70" />
        <el-table-column
          fixed="right"
          label="操作"
          width="150"
        >
          <template slot-scope="scope">
            <el-button @click="deleteEmployee(scope.id)">删除</el-button>
            <el-button @click="editEmployee(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="新增员工" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="form.username" auto-complete="off" />
          </el-form-item>
          <el-form-item label="邮箱" :label-width="formLabelWidth">
            <el-input v-model="form.email" auto-complete="off" />
          </el-form-item>
          <el-form-item label="电话" :label-width="formLabelWidth">
            <el-input v-model="form.phone" auto-complete="off" />
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input v-model="form.password" auto-complete="off" />
          </el-form-item>
          <el-form-item label="年龄" :label-width="formLabelWidth">
            <el-input v-model="form.age" auto-complete="off" />
          </el-form-item>
          <el-form-item label="部门id" :label-width="formLabelWidth">
            <el-input v-model="form.did" autocomplete="off" />
          </el-form-item>
          <el-form-item label="状态" :label-width="formLabelWidth">
            <el-select v-model="form.state" placeholder="请选择你的状态">
              <el-option label="在职" value="0" />
              <el-option label="离职" value="1" />
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="add">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { list } from '@/api/department'
import { getList } from '@/api/table'
import { deleteDepartment } from '@/api/department'
import { addEmployee, findAll, deleteEmployee, updateEmployee } from '@/api/employee'
import scope from 'mockjs'

export default {
  data() {
    return {
      filterText: '',
      data1: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      tableData: [],
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  }, created() {
    this.treeData()
    this.fetchData()
    this.fetchDatas()
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },

    treeData() {
      this.listLoading = true
      list().then(Response => {
        this.data = Response.data
        this.data1 = this.data
      })
    },
    fetchData() {
      this.listLoading = true
      findAll().then(Response => {
        this.data = Response.data
        this.tableData = this.data
        console.log(this.data)
      })
    },
    fetchDatas() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    toAddDepartmentPage() {
      const r = this.$refs.tree2.getCurrentNode()
      console.log(r)
      if (r) {
        this.$router.push({ name: 'Create', params: { data: r }})
      } else {
        const d1 = this.data1[0]
        this.$router.push({ name: 'Create', params: { data: d1 }})
      }
      // 获取当前的企业是那个
      // this.$router.push({ path: '/department/create' })
    },

    deleteDepartment() {
      const currentNode = this.$refs.tree2.getCurrentNode()
      if (!currentNode) {
        this.$message.warning('请选择要删除的部门')
        return
      }
      const departmentId = currentNode.id
      this.$confirm('确认删除该部门吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteDepartment({ id: departmentId })
            .then(() => {
              // 处理删除成功的情况
              this.treeData()
              this.fetchDatas()
              this.$message.success('部门删除成功')
            })
            .catch(error => {
              // 处理删除失败的情况
              console.error('删除部门失败', error)
              this.$message.error('部门删除失败')
            })
        })
    },
    add() {
      this.$message('submit!')
      console.log(this.form)
      const requestData = {
        username: this.form.username,
        password: this.form.password,
        email: this.form.email,
        phone: this.form.phone,
        state: this.form.state,
        age: this.form.age,
        did: this.form.did

      }
      addEmployee(requestData).then(response => {
        console.log(response)
        if (response['resultCode'] === 200) {
          this.$router.push({ path: '/department/index' })
        } else {
          this.$message(response['message'])
        }
      })
    },
    editEmployee(row) {
      this.$message('submit!')
      console.log(this.form)
      const requestData = {
        username: this.form.username,
        password: this.form.password,
        email: this.form.email,
        phone: this.form.phone,
        state: this.form.state,
        age: this.form.age,
        did: this.form.did
      }
      updateEmployee(requestData).then(response => {
        console.log(response)
        if (response['resultCode'] === 200) {
          this.fetchData()
          this.$router.push({ path: '/department/index' })
        } else {
          this.$message(response['message'])
        }
      })
    },
    deleteEmployee() {
      const id = scope.id
      console.log(id)
      console.log(this.tableData)
      this.$confirm('确认删除吗？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteEmployee(id)
          .then(() => {
            this.$message.success('删除成功')
          })
          .catch(error => {
            console.error('删除失败', error)
            this.$message.error('删除失败')
          })
      })
    }
  }
}
</script>

<style scoped>
.sidebar-action{
  margin-bottom: 16px;
  margin-top: 18px;
}
.app-container {
  flex: 1;
  display: flex;
  justify-content: flex-start;
  font-size: 14px;
  padding-right: 8px;
}
.left-block{
  width: 300px;
  flex-grow: 1;
  margin-left: 32px;
  margin-right: 32px;
  border-right: 2px solid gainsboro;
}
.right-block{
  flex-grow: 2;
}
</style>

