<template>
  <div class="user-list-container">
    <el-row :gutter="24">
      <el-col :span="12" >
         <el-input placeholder="搜索" v-model="search_key" @keyup.enter.native="searchClick">
              <el-button slot="append" icon="el-icon-search" @click="searchClick"></el-button>
          </el-input>
      </el-col>
      <el-col :span="6" :offset="6" class="text-right">
        <el-button type="primary" @click="addManu">添加</el-button>
      </el-col>
    </el-row>
    <!-- 添加机器型号开始 -->
    <el-dialog title="添加机器型号" :visible.sync="isFormVisible">
        <el-form ref="addForm" :model="addForm" label-width="70px" :rules="addRule">
            <el-form-item label="型号名称" prop="model_name">
                <el-input v-model="addForm.model_name" placeholder="请输入型号名称"></el-input>
            </el-form-item>
            <el-form-item label="所属于厂商" prop="vendor">
              <el-select class="select" v-model="addForm.vendor" placeholder="选择厂商">
                <el-option
                  v-for="(item, index) in ManuList"
                  :key="index"
                  :label="item.vendor_name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="isFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm">确 定</el-button>
        </div>
    </el-dialog>
    <!-- /结束 -->
    <!-- 修改机器型号开始 -->
    <el-dialog title="修改机器型号" :visible.sync="isEditFormVisible">
        <el-form ref="editForm" :model="editForm" label-width="70px" :rules="addRule">
            <el-form-item label="型号名称" prop="model_name">
                <el-input v-model="editForm.model_name" placeholder="请输型号名称"></el-input>
            </el-form-item>
            <el-form-item label="所属于厂商" prop="vendor">
              <el-select class="select" v-model="editForm.vendor" placeholder="选择厂商">
                <el-option
                  v-for="(item, index) in ManuList"
                  :key="index"
                  :label="item.vendor_name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="isEditFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitEditForm">确 定</el-button>
        </div>
    </el-dialog>
    <!-- /结束 -->
    <el-table
            class="table"
            v-loading="loading"
            element-loading-text="拼命加载中"
            :data="manufacturerList"
            border
            >
        <el-table-column
                prop="model_name"
                label="型号名称"
                align="center">
        </el-table-column>
        <el-table-column
                prop="vendor.name"
                label="所属于厂商"
                width=""
                align="center">
        </el-table-column>
        <el-table-column
                prop=""
                label="操作"
                width="215"
                align="center">
            <template slot-scope="scope">
              <el-button type="text" size="small"  @click="editClick(scope.row)">修改</el-button>
              <el-button type="text" size="small"  @click="deleteClick(scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <div class="text-center" v-show="total_num>=10">
        <el-pagination
                background
                @current-change="paginationChange"
                layout="total, prev, pager, next, jumper"
                :current-page.sync="page"
                :total="total_num">
        </el-pagination>
    </div>
  </div>
</template>

<script>
import { getProductModelList, addProductModel, updateProductModel, deleteProductModel, getManufacturerList } from '@/api/resource'

export default {
  data() {
    return {
      loading: false,
      manufacturerList: [],
      total_num: 0,
      page: 1,
      state: 0,

      search_key: '',
      isFormVisible: false,
      isEditFormVisible: false,
      editForm: {},
      addForm: {
        model_name: '',
        vendor: ''
      },
      addRule: {
        model_name: [
          { required: true, message: '请输入型号名称', trigger: 'blur' }
        ],
        vendor: [
          { required: true, message: '请输入所属厂商', trigger: 'blur' }
        ]
      },
      ManuList: []
    }
  },
  methods: {
    fetchData() {
      this.loading = true
      console.log(this.search_key)
      getProductModelList({ page: this.page, model_name: this.search_key }).then(res => {
        this.manufacturerList = res.results
        this.total_num = res.count
        this.loading = false
      })
    },
    searchClick() {
      this.page = 1
      this.fetchData()
    },
    paginationChange(val) {
      this.page = val
      this.fetchData()
    },
    addManu() {
      this.isFormVisible = true
      if (this.$refs['addForm'] !== undefined) {
        this.$refs['addForm'].resetFields()
      }
    },
    submitForm() {
      this.$refs['addForm'].validate((valid) => {
        if (!valid) {
          return
        }
        const params = Object.assign({}, this.addForm)
        addProductModel(params).then(res => {
          this.isFormVisible = false
          this.fetchData()
          this.$message({
            message: '操作成功',
            type: 'success'
          })
        })
      })
    },
    editClick(row) {
      if (this.$refs['editForm'] !== undefined) {
        this.$refs['editForm'].resetFields()
      }
      const { id, model_name } = row
      const { vendor } = { vendor: row.vendor.id }
      this.editForm = { id, model_name, vendor }
      this.isEditFormVisible = true
    },
    submitEditForm() {
      this.$refs['editForm'].validate((valid) => {
        if (!valid) {
          return
        }
        const id = this.editForm.id
        const params = this.editForm
        delete params.id
        updateProductModel(id, params).then(res => {
          this.isEditFormVisible = false
          this.fetchData()
          this.$message({
            message: '操作成功',
            type: 'success'
          })
        })
      })
    },
    deleteClick(row) {
      this.$confirm('此操作将删除 “' + row.model_name + '” , 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteProductModel(row.id).then(response => {
          this.$message({
            message: '删除 “' + row.model_name + '” 成功',
            type: 'success'
          })
          this.fetchData()
        })
      }).catch(() => {
        this.$message({
          message: '操作失败',
          type: 'error'
        })
      })
    }
  },
  created() {
    this.state = 1
  },
  watch: {
    state() {
      this.fetchData()
      getManufacturerList({ page_size: 0 }).then(res => {
        this.ManuList = res
      })
    }
  }
}
</script>
