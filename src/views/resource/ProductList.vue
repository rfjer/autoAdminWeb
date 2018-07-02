<template>
    <div class="user-list-container">
      <el-row :gutter="24">
        <el-col :span="6" >
          <el-row :gutter="24">
            <el-col :span="16" >
              <el-input
                placeholder="输入关键字过滤"
                v-model="filterText">
              </el-input>
            </el-col>
            <el-col :span="8" >
              <el-button @click="addClick">添加</el-button>
            </el-col>
          </el-row>
          <div class="filter-tree">
            <el-tree
              :data="productTreeList"
              :props="defaultProps"
              :default-expand-all="expandAll"
              :highlight-current="true"
              :filter-node-method="filterNode"
              ref="tree"
              @node-click="treeNodeClick">
            </el-tree>
          </div>
        </el-col>
        <el-col :span="18">
          <el-form ref="productForm" size="mini" :model="productForm" label-width="100px" v-show="showForm" :rules="productRules">
            <el-form-item label="业务线名称" prop="service_name">
                  <el-input v-model="productForm.service_name"  :disabled="disabled" placeholder="请输入业务线名称"></el-input>
              </el-form-item>
              <el-form-item label="字母简称" prop="module_letter">
                  <el-input v-model="productForm.module_letter"  :disabled="disabled" placeholder="请输入字母简称"></el-input>
              </el-form-item>
              <el-form-item label="上级业务线" prop="pid">
                  <el-select class="select" v-model="productForm.pid"  :disabled="disabled" placeholder="上级业务线">
                    <el-option
                      v-for="(item, index) in productLevel"
                      :key="index"
                      :label="item.service_name"
                      :value="item.id">
                    </el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="运维接口人" prop="op_interface">
                  <el-select multiple class="select" v-model="productForm.op_interface"  :disabled="disabled" filterable placeholder="请选择">
                    <el-option
                      v-for="(item, index) in userList"
                      :key="index"
                      :label="item.name"
                      :value="item.id">
                        <span style="float: left">{{ item.name }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.email }}</span>
                    </el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="业务接口人" prop="dev_interface">
                  <el-select multiple class="select" v-model="productForm.dev_interface" size="mini" :disabled="disabled" filterable placeholder="请选择">
                    <el-option
                      v-for="(item, index) in userList"
                      :key="index"
                      :label="item.name"
                      :value="item.id"
                      size="mini">
                        <span style="float: left">{{ item.name }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.email }}</span>
                    </el-option>
                  </el-select>
              </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitClick" :disabled="disabled">提交</el-button>
              <el-button type="primary" @click="editClick" :disabled="buttonDisabled">修改</el-button>
              <el-button type="primary" @click="deleteClick" :disabled="buttonDisabled">删除</el-button>
            </el-form-item>
          </el-form>
          <el-table
              class="table"
              v-loading="serverListloading"
              element-loading-text="拼命加载中"
              :data="serverList"
              border
              v-show="showServerListTable">
            <el-table-column
                    prop="idc.name"
                    label="机房"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="hostname"
                    label="主机名"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="manage_ip"
                    label="管理IP"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="状态"
                    align="center">
            </el-table-column>
             <el-table-column
                    prop="last_check"
                    label="LAST CHECK"
                    align="center">
            </el-table-column>
          </el-table>
          <div class="text-center" v-show="serverListTotalNum>=10">
            <el-pagination
                    background
                    @current-change="paginationChange"
                    layout="total, prev, pager, next, jumper"
                    :current-page.sync="serverListPage"
                    :total="serverListTotalNum">
            </el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
import { getUserList } from '@/api/users'
import { getProductTree, getProductLevel, getProductLevelInfo, addProduct, updateProduct, deleteProductLevelInfo, getServerList } from '@/api/resource'

export default {
  data() {
    return {
      productFlag: '',
      showForm: false,
      disabled: false,
      buttonDisabled: false,
      name: '',
      showServerListTable: false,
      server_purpose: 0,
      serverList: [],
      serverListTotalNum: 0,
      serverListPage: 1,
      serverListloading: false,
      expandAll: false,
      productForm: {
        service_name: '',
        module_letter: '',
        dev_interface: [],
        op_interface: [],
        pid: ''
      },
      productRules: {
        service_name: [
          { required: true, trigger: 'blur', message: '请输入业务线名称' }
        ],
        pid: [
          { required: true, trigger: 'blur', message: '请选择上级业务线' }
        ],
        module_letter: [
          { required: true, trigger: 'change', message: '请输入字母简称' }
        ]
      },
      userList: [],
      filterText: '',
      productTreeList: [],
      productLevel: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      state: 0
    }
  },
  created() {
    this.state = 1
  },
  watch: {
    state() {
      getUserList({ page_size: 0 }).then(res => {
        this.userList = res
      })
      getProductTree().then(res => {
        this.productTreeList = res
      })
      getProductLevel({ pid: 0, page_size: 0 }).then(res => {
        this.productLevel = [{ id: 0, service_name: '顶级' }].concat(res)
      })
    },
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    fetchServerListData() {
      this.loading = true
      getServerList({ page: this.serverListPage, server_purpose: this.server_purpose }).then(res => {
        this.serverList = res.results
        this.serverListTotalNum = res.count
        this.serverListloading = false
      })
    },
    paginationChange(val) {
      this.serverListPage = val
      this.fetchServerListData()
    },
    addClick() {
      this.productFlag = 'add'
      this.$refs['productForm'].resetFields()
      this.showForm = true
      this.showServerListTable = false
      this.disabled = false
      this.buttonDisabled = true
    },
    editClick() {
      this.productFlag = 'edit'
      this.disabled = false
      this.buttonDisabled = true
    },
    deleteClick() {
      this.$confirm('此操作将删除该业务线, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteProductLevelInfo(this.productForm.id).then(() => {
          this.$message({
            message: '删除业务线成功',
            type: 'success'
          })
          this.showForm = false
          this.showServerListTable = false
          this.getProductTreeInfo()
        })
      }).catch(() => { })
    },
    submitClick() {
      this.$refs['productForm'].validate((valid) => {
        if (!valid) {
          return
        }
        if (this.productFlag === 'add') {
          const params = Object.assign({}, this.productForm)
          addProduct(params).then(res => {
            this.$refs['productForm'].resetFields()
            this.$message.success('添加业务线成功')
            this.showForm = false
            this.showServerListTable = false
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.getProductTreeInfo()
          })
        } else {
          const id = this.productForm.id
          delete this.productForm.id
          const params = Object.assign({}, this.productForm)
          updateProduct(id, params).then(res => {
            this.$message.success('修改业务线成功')
            this.showForm = false
            this.showServerListTable = false
            this.disabled = true
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.getProductTreeInfo()
          })
        }
      })
    },
    getProductTreeInfo() {
      getProductTree().then(res => {
        this.productTreeList = res
      })
    },
    treeNodeClick(data) {
      this.$refs['productForm'].resetFields()
      getProductLevelInfo(data.id).then(res => {
        const op_interface = []
        const dev_interface = []
        res.op_interface.forEach(item => {
          op_interface.push(item.id)
        })
        res.dev_interface.forEach(item => {
          dev_interface.push(item.id)
        })
        const { id, pid, module_letter, service_name } = res
        this.productForm = { id, pid, module_letter, service_name, op_interface, dev_interface }
        this.disabled = true
        this.buttonDisabled = false
        this.showForm = true
        if (pid === 0) {
          this.showServerListTable = false
        } else {
          this.serverListPage = 1
          this.server_purpose = data.id
          this.serverList = []
          this.fetchServerListData()
          this.showServerListTable = true
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .filter-tree {
    margin-top: 20px;
  }
  .select {
    width: 100%;
  }
</style>


