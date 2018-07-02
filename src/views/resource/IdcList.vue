<template>
  <div class="user-list-container">
    <el-row :gutter="24">
      <el-col :span="12" >
         <el-input placeholder="搜索" v-model="search_key" @keyup.enter.native="searchClick">
              <el-button slot="append" icon="el-icon-search" @click="searchClick"></el-button>
          </el-input>
      </el-col>
      <el-col :span="6" :offset="6" class="text-right">
        <el-button type="primary" @click="addClick">添加</el-button>
      </el-col>
    </el-row>
    <!-- 添加IDC开始 -->
    <el-dialog title="添加IDC" :visible.sync="isFormVisible">
        <el-form ref="addForm" :model="addForm" label-width="80px" :rules="addRule">
            <el-form-item label="IDC名称" prop="name">
                <el-input v-model="addForm.name" maxlength="15" placeholder="请输入IDC名称"></el-input>
            </el-form-item>
            <el-form-item label="字母简称" prop="letter">
                <el-input v-model="addForm.letter" maxlength="10" placeholder="请输入字母简称"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="tel">
                <el-input v-model="addForm.tel" maxlength="15" placeholder="请输入联系电话"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="mail">
                <el-input v-model="addForm.mail" maxlength="20"  placeholder="请输入邮箱"></el-input>
            </el-form-item>
            <el-form-item label="地址" prop="address">
                <el-input v-model="addForm.address" maxlength="30" placeholder="请输入地址"></el-input>
            </el-form-item>
            <el-form-item label="备注" maxlength="50" prop="remark">
                <el-input v-model="addForm.remark" placeholder="备注"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="isFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm">确 定</el-button>
        </div>
    </el-dialog>
    <!-- /结束 -->
    <!-- 修改IDC开始 -->
    <el-dialog title="修改IDC" :visible.sync="isEditFormVisible">
        <el-form ref="editForm" :model="editForm" label-width="80px" :rules="addRule">
            <el-form-item label="IDC名称" prop="name">
                <el-input v-model="editForm.name" maxlength="15" placeholder="请输入IDC名称"></el-input>
            </el-form-item>
            <el-form-item label="字母简称" prop="letter">
                <el-input v-model="editForm.letter" maxlength="10" placeholder="请输入字母简称"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="tel">
                <el-input v-model="editForm.tel" maxlength="15" placeholder="请输入联系电话"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="mail">
                <el-input v-model="editForm.mail" maxlength="20" placeholder="请输入邮箱"></el-input>
            </el-form-item>
            <el-form-item label="地址" maxlength="30" prop="address">
                <el-input v-model="editForm.address" placeholder="请输入地址"></el-input>
            </el-form-item>
            <el-form-item label="备注" maxlength="50" prop="remark">
                <el-input v-model="editForm.remark" placeholder="备注"></el-input>
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
            :data="dataList"
            border
            >
        <el-table-column
                prop="name"
                label="IDC名称"
                align="center">
        </el-table-column>
        <el-table-column
                prop="letter"
                label="字母简称"
                align="center">
        </el-table-column>
        <el-table-column
                prop="tel"
                label="联系电话"
                align="center">
        </el-table-column>
        <el-table-column
                prop="mail"
                label="邮箱"
                align="center">
        </el-table-column>
        <el-table-column
                prop="address"
                label="地址"
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
import { getIdcList, addIdc, updateIdc, deleteIdc } from '@/api/resource'

export default {
  data() {
    return {
      loading: false,
      dataList: [],
      total_num: 0,
      page: 1,
      state: 0,

      search_key: '',
      isFormVisible: false,
      isEditFormVisible: false,
      editForm: {},
      addForm: {
        name: '',
        letter: '',
        mail: '',
        tel: '',
        address: '',
        remark: ''
      },
      addRule: {
        name: [
          { required: true, message: '请输入IDC名称', trigger: 'blur' }
        ],
        letter: [
          { required: true, message: '请输入字母简称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    fetchData() {
      this.loading = true
      console.log(this.search_key)
      getIdcList({ page: this.page, name: this.search_key }).then(res => {
        this.dataList = res.results
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
    addClick() {
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
        addIdc(params).then(res => {
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

      const { id, name, letter, tel, mail, address, remark } = row
      this.editForm = { id, name, letter, tel, mail, address, remark }
      this.isEditFormVisible = true
    },
    submitEditForm() {
      this.$refs['editForm'].validate((valid) => {
        if (!valid) {
          return
        }
        updateIdc(this.editForm.id, this.editForm).then(res => {
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
      this.$confirm('此操作将删除 “' + row.name + '” , 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteIdc(row.id).then(response => {
          this.$message({
            message: '删除 “' + row.name + '” 成功',
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
