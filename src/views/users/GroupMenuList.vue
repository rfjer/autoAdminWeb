<template>
  <div class="user-list-container">
    <div style="margin-bottom:20px;font-size:14px;">{{ '修改角色的前端menu：' + name }}</div>
    <el-tree
      :data="data"
      show-checkbox
      default-expand-all
      node-key="id"
      ref="tree"
      highlight-current
      :render-content="renderContent">
    </el-tree>
  </div>
</template>

<script>
import { getGroupMenuList, updateGroupMenu, deleteGroupMenu } from '@/api/users'
export default {
  data() {
    return {
      data: []
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
      getGroupMenuList(this.gid, { page: this.page, name: this.search_name, modify: true }).then(res => {
        this.data = res
      })
    },
    renderContent(h, { node, data, store }) {
      return (
        <span style='flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;'>
          <span>
            <span>{node.label}</span>
          </span>
          <span>
            <el-button style='font-size: 12px;' type='text' >Append</el-button>
            <el-button style='font-size: 12px;' type='text' >Delete</el-button>
          </span>
        </span>)
    },
    statusChange(row) {
      row.status = !row.status
      if (row.status) {
        deleteGroupMenu(this.gid, { mid: row.id }).then(res => {
          row.status = !row.status
          this.$message.success('删除前端菜单成功！')
        })
      } else {
        updateGroupMenu(this.gid, { mid: row.id }).then(res => {
          row.status = !row.status
          this.$message.success('添加前端菜单成功！')
        })
      }
    }
  }
}
</script>
