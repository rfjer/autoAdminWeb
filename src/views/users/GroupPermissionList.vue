<template>
    <div class="user-list-container">
      <div style="margin-bottom:20px;font-size:14px;">{{ '修改权限：' + name }}</div>
      <el-row :gutter="24">
        <el-col :span="12" >
          <el-input placeholder="搜索" v-model="search_name" @keyup.enter.native="searchClick">
                <el-button slot="append" icon="el-icon-search" @click="searchClick"></el-button>
            </el-input>
        </el-col>
      </el-row>
      <el-table
              v-loading="loading"
              element-loading-text="拼命加载中"
              :data="permissionList"
              border
              class="table">
          <el-table-column
                  prop="content_type.app_label"
                  label="app"
                  align="center">
          </el-table-column>
          <el-table-column
                  prop="content_type.model"
                  label="model"
                  align="center">
          </el-table-column>
          <el-table-column
                  prop="codename"
                  label="code name"
                  align="center">
          </el-table-column>
          <el-table-column
                  prop="name"
                  label="描述"
                  align="center">
          </el-table-column>
          <el-table-column
                  prop=""
                  label="操作"
                  align="center">
              <template slot-scope="scope">
                <el-switch
                        v-model="scope.row.status"
                        @change="statusChange(scope.row)">
                </el-switch>
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
import { getGroupPermissionsList, deleteGroupPermissions, updateGroupPermissions } from '@/api/users'
export default {
  data() {
    return {
      permissionList: [],
      permission: [],
      total_num: 0,
      page: 1,
      loading: true,
      search_name: '',
      gid: ''
    }
  },
  created() {
    const query = this.$route.query
    this.name = query.name
    this.gid = query.gid
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true
      getGroupPermissionsList(this.gid, { page: this.page, name: this.search_name, modify: true }).then(res => {
        this.permissionList = res.results
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
    statusChange(row) {
      row.status = !row.status
      if (row.status) {
        deleteGroupPermissions(this.gid, { pid: row.id }).then(res => {
          row.status = !row.status
          this.$message.success('删除权限成功！')
        })
      } else {
        updateGroupPermissions(this.gid, { pid: row.id }).then(res => {
          row.status = !row.status
          this.$message.success('添加权限成功！')
        })
      }
    }
  }
}
</script>
