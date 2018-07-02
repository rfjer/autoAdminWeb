<template>
  <div class="user-list-container">
    <el-row :gutter="24">
      <el-col :span="12" >
         <el-input placeholder="搜索" v-model="search_key" @keyup.enter.native="searchClick">
              <el-button slot="append" icon="el-icon-search" @click="searchClick"></el-button>
          </el-input>
      </el-col>
      <el-col :span="6" :offset="6" class="text-right">
        <el-button type="primary" @click="addManu">添加制造商</el-button>
      </el-col>
    </el-row>
    <!-- 添加制造商信息开始 -->
    <el-dialog title="增加制造商" :visible.sync="isManuFormVisible">
        <el-form ref="addManuForm" :model="addManuForm" label-width="70px" :rules="addManuRule">
            <el-form-item label="厂商名称" prop="vendor_name">
                <el-input v-model="addManuForm.vendor_name" placeholder="请输入厂商名称"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="tel">
                <el-input v-model="addManuForm.tel" placeholder="请输联系方式a"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="mail">
                <el-input v-model="addManuForm.mail" placeholder="请输入邮箱"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
                <el-input v-model="addManuForm.remark" placeholder="请输入备注信息"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="isManuFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitManuForm">确 定</el-button>
        </div>
    </el-dialog>
    <!-- /结束 -->
    <!-- 修改制造商信息开始 -->
    <el-dialog title="修改制造商" :visible.sync="isEditManuFormVisible">
        <el-form ref="editManuForm" :model="editManuForm" label-width="70px" :rules="addManuRule">
            <el-form-item label="厂商名称" prop="vendor_name">
                <el-input v-model="editManuForm.vendor_name" placeholder="请输入厂商名称"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="tel">
                <el-input v-model="editManuForm.tel" placeholder="请输联系方式a"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="mail">
                <el-input v-model="editManuForm.mail" placeholder="请输入邮箱"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
                <el-input v-model="editManuForm.remark" placeholder="请输入备注信息"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="isEditManuFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitEditManuForm">确 定</el-button>
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
                prop="vendor_name"
                label="名称"
                align="center">
        </el-table-column>
        <el-table-column
                prop="tel"
                label="电话"
                width=""
                align="center">
        </el-table-column>
        <el-table-column
                prop="mail"
                label="邮箱"
                align="center">
        </el-table-column>
        <el-table-column
                prop="remark"
                label="备注"
                align="center">
        </el-table-column>
        <el-table-column
                prop=""
                label="操作"
                width="215"
                align="center">
            <template slot-scope="scope">
              <el-button type="text" size="small"  @click="editManu(scope.row)">修改</el-button>
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
import { getManufacturerList, addManufacturer, updateManufacturer, deleteManufacturer } from '@/api/resource'

export default {
  data() {
    return {
      loading: false,
      manufacturerList: [],
      total_num: 0,
      page: 1,
      state: 0,

      search_key: '',
      isManuFormVisible: false,
      isEditManuFormVisible: false,
      editManuForm: {},
      addManuForm: {
        vendor_name: '',
        tel: '',
        mail: '',
        remark: ''
      },
      addManuRule: {
        vendor_name: [
          { required: true, message: '请输入厂商名称', trigger: 'blur' }
        ],
        tel: [
          { required: true, message: '请输入联系电话', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    fetchData() {
      this.loading = true
      console.log(this.search_key)
      getManufacturerList({ page: this.page, vendor_name: this.search_key }).then(res => {
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
      this.isManuFormVisible = true
      if (this.$refs['addManuForm'] !== undefined) {
        this.$refs['addManuForm'].resetFields()
      }
    },
    submitManuForm() {
      this.$refs['addManuForm'].validate((valid) => {
        if (!valid) {
          return
        }
        const params = Object.assign({}, this.addManuForm)
        addManufacturer(params).then(res => {
          this.isManuFormVisible = false
          this.fetchData()
          this.$message({
            message: '操作成功',
            type: 'success'
          })
        })
      })
    },
    editManu(row) {
      this.isEditManuFormVisible = true
      this.editManuForm = row
    },
    submitEditManuForm() {
      this.$refs['editManuForm'].validate((valid) => {
        if (!valid) {
          return
        }
        const id = this.editManuForm.id
        const params = this.editManuForm
        delete params.id
        updateManufacturer(id, params).then(res => {
          this.isEditManuFormVisible = false
          this.fetchData()
          this.$message({
            message: '操作成功',
            type: 'success'
          })
        })
      })
    },
    deleteClick(row) {
      this.$confirm('此操作将删除 “' + row.vendor_name + '” , 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteManufacturer(row.id).then(response => {
          this.$message({
            message: '删除 “' + row.vendor_name + '” 成功',
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
    }
  }
}
</script>
