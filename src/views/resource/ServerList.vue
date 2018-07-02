<template>
  <div>
    <el-form ref="searchForm" :model="searchForm" :inline="true">
      <el-form-item>
        <el-select v-model="searchForm.idc" style="width: 150px">
          <el-option
            v-for="(item, index) in searchIdcsList"
            :key="index"
            :label="item.idc_name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchForm.cabinet" style="width: 150px">
          <el-option
            v-for="(item, index) in searchCabinetList"
            :key="index"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchForm.service_id" style="width: 150px">
          <el-option
            v-for="(item, index) in searchServiceIdList"
            :key="index"
            :label="item.service_name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchForm.server_purpose" style="width: 150px">
          <el-option
            v-for="(item, index) in searchServerPurposeList"
            :key="index"
            :label="item.service_name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchForm.hostname" placeholder="请输入主机名或IP地址" style="width: 180px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchClick()">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table
          v-loading="loading"
          element-loading-text="拼命加载中"
          :data="serverList"
          border
          class="table">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form  label-position="left" inline class="table-form-expand">
            <el-form-item label="制造商：">
              <span>{{ props.row.manufacturer.vendor_name }}</span>
            </el-form-item>
            <el-form-item label="出厂日期：">
              <span>{{ props.row.manufacture_data }}</span>
            </el-form-item>
            <el-form-item label="服务器类型：">
              <span>{{ props.row.model_name.model_name }}</span>
            </el-form-item>
            <el-form-item label="SN：">
              <span>{{ props.row.sn }}</span>
            </el-form-item>
            <el-form-item label="操作系统：">
              <span>{{ props.row.os }}</span>
            </el-form-item>
            <el-form-item label="CPU：">
              <span>{{ props.row.server_cpu }}</span>
            </el-form-item>
            <el-form-item label="内存：">
              <span>{{ props.row.server_mem }}</span>
            </el-form-item>
            <el-form-item label="硬盘：">
              <span>{{ props.row.disk }}</span>
            </el-form-item>
            <el-form-item label="uuid：">
              <span>{{ props.row.uuid }}</span>
            </el-form-item>
            <el-form-item label="机器类型：">
              <span>{{ props.row.device_type.name }}</span>
            </el-form-item>
            <el-form-item label="备注：">
              <span>{{ props.row.remark }}</span>
            </el-form-item>
            <el-form-item label="网卡列表">
              <span>
                  <div v-for="i in cardList">
                    <span v-if=" i.host.id ==  props.row.id "> {{i.name + ' [' + i.mac+']'}}</span>
                      <div v-for="j in ipList">
                        <span v-if="i.host.id ==  props.row.id && i.id == j.device.id"> |- {{j.ip_addr}}</span>
                      </div>
                  </div>
              </span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        prop="idc.name"
        label="机房"
        align="center">
      </el-table-column>
      <el-table-column
            prop="service.name"
            label="业务线"
            align="center">
      </el-table-column>
      <el-table-column
              prop="server_purpose.name"
              label="产品线"
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
              prop="device_type.name"
              label="机型类型"
              align="center">
      </el-table-column>
      <el-table-column
              prop="status"
              label="状态"
              width="60"
              align="center">
      </el-table-column>
      <el-table-column
              prop="last_check"
              label="LAST CHECK"
              width="155"
              align="center">
      </el-table-column>
      <el-table-column
              prop=""
              label="操作"
              width="100"
              align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editClick(scope.row)">修改</el-button>
            <el-button type="text" size="small" @click="deleteClick(scope.row)">删除</el-button>
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
    <el-dialog title="修改服务器" :visible.sync="changeServerVisible">
      <el-form ref="changeServerForm" :model="changeServerForm" label-width="70px" :rules="changeServerFormRules">
        <el-form-item label="主机名称" prop="hostname">
            <el-input v-model="changeServerForm.hostname" :disabled="true" placeholder="请输入主机名称"></el-input>
        </el-form-item>
        <el-form-item label="管理IP" prop="manage_ip">
            <el-input v-model="changeServerForm.manage_ip" :disabled="true" placeholder="请输入IP地址"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
            <el-select v-model="changeServerForm.status">
              <el-option
                v-for="(item, index) in statusList"
                :key="index"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="机房" prop="idc">
          <el-select v-model="changeServerForm.idc" @change="changeIdc">
            <el-option
              v-for="(item, index) in idcsList"
              :key="index"
              :label="item.idc_name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="机柜" prop="cabinet">
          <el-select v-model="changeServerForm.cabinet">
            <el-option
              v-for="(item, index) in cabinetList"
              :key="index"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="业务线" prop="service">
          <el-select v-model="changeServerForm.service" @change="changeService">
            <el-option
              v-for="(item, index) in serviceIdList"
              :key="index"
              :label="item.service_name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品线" prop="server_purpose">
          <el-select v-model="changeServerForm.server_purpose">
            <el-option
              v-for="(item, index) in serverPurposeList"
              :key="index"
              :label="item.service_name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
            <el-input v-model="changeServerForm.remark" placeholder="请输入备注"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button @click="changeServerVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitchangeServerClick">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getServerList, deleteServer, getIdcsList, getCabinetList, getProductLevel, updateServer, getNetworkDeviceList, getIpList } from '@/api/resource'
export default {
  data() {
    return {
      loading: false,
      serverList: [],
      total_num: 0,
      page: 1,
      state: 0,
      searchForm: {
        hostname: '',
        idc: '',
        cabinet: '',
        service_id: '',
        server_purpose: '',
        'page': 1
      },
      idcsList: [],
      cabinetList: [],
      serviceIdList: [],
      cardList: [],
      ipList: [],
      searchCabinetList: [{ id: '', name: '所有机柜' }],
      searchServerPurposeList: [{ id: '', service_name: '所有产品线' }],
      serverPurposeList: [],
      changeServerVisible: false,
      statusList: ['线上', '下线', '测试', '故障', '发布', '维护'],
      changeServerForm: {
        id: '',
        hostname: '',
        manage_ip: '',
        status: '',
        remark: '',
        idc: '',
        cabinet: '',
        service: '',
        server_purpose: ''
      },
      changeServerFormRules: {
        status: [
          { required: true, trigger: 'blur', message: '请选择状态' }
        ],
        idc: [
          { required: true, trigger: 'blur', message: '请选择机房' }
        ],
        cabinet: [
          { required: true, trigger: 'blur', message: '请选择机柜' }
        ],
        service: [
          { required: true, trigger: 'change', message: '请选择业务线' }
        ],
        server_purpose: [
          { required: true, trigger: 'change', message: '请选择产品线' }
        ]
      }
    }
  },
  computed: {
    searchIdcsList() {
      return [{ id: '', idc_name: '所有机房' }].concat(this.idcsList)
    },
    searchServiceIdList() {
      return [{ id: '', service_name: '所有业务线' }].concat(this.serviceIdList)
    }
  },
  watch: {
    state() {
      getIdcsList({ page_size: 0 }).then(res => {
        this.idcsList = res.map(item => {
          return { id: item.id, idc_name: item.name }
        })
      })
      getProductLevel({ pid: 0, page_size: 0 }).then(res => {
        this.serviceIdList = res.map(item => {
          return { id: item.id, service_name: item.service_name }
        })
      })
      this.fetchData()
      getNetworkDeviceList({ page_size: 0 }).then(res => {
        this.cardList = res
        console.log(this.cardList)
      })
      getIpList({ page_size: 0 }).then(res => {
        this.ipList = res
      })
      // getCabinetList({ page_size: 0 }).then(res => {
      //   this.cabinetList = res
      //   console.log(this.cabinetList)
      // })
    },
    'searchForm.idc'(val) {
      this.searchCabinetList = [{ id: '', name: '所有机柜' }]
      this.searchForm.cabinet = ''
      // if (!val) {
      //   this.searchForm.cabinet = ''
      //   return
      // }
      getCabinetList({ idc: val, page_size: 0 }).then(res => {
        this.searchCabinetList = this.searchCabinetList.concat(res.map(item => {
          return { id: item.id, name: item.name }
        }))
      })
    },
    'searchForm.service_id'(val) {
      this.searchServerPurposeList = [{ id: '', service_name: '所有产品线' }]
      if (!val) {
        this.searchForm.server_purpose = ''
        return
      }
      getProductLevel({ pid: val, page_size: 0 }).then(res => {
        this.searchServerPurposeList = this.searchServerPurposeList.concat(res.map(item => {
          return { id: item.id, service_name: item.service_name }
        }))
      })
    },
    'changeServerForm.service'(val) {
      if (!val) {
        this.changeServerForm.server_purpose = ''
        return
      }
      getProductLevel({ pid: val, page_size: 0 }).then(res => {
        this.serverPurposeList = res.map(item => {
          return { id: item.id, service_name: item.service_name }
        })
      })
    },
    'changeServerForm.idc'(val) {
      if (!val) {
        this.changeServerForm.cabinet = ''
        return
      }
      getCabinetList({ idc: val, page_size: 0 }).then(res => {
        this.cabinetList = res.map(item => {
          return { id: item.id, name: item.name }
        })
      })
    }
  },
  created() {
    this.state = 1
  },
  methods: {
    fetchData(params) {
      this.loading = true
      getServerList(params).then(res => {
        this.serverList = res.results
        this.total_num = res.count
        this.loading = false
      })
    },
    paginationChange(val) {
      this.searchForm.page = val
      this.fetchData(Object.assign(this.searchForm))
    },
    searchClick() {
      this.fetchData(Object.assign(this.searchForm))
    },
    changeIdc() {
      this.changeServerForm.cabinet = ''
    },
    changeService() {
      this.changeServerForm.server_purpose = ''
    },
    editClick(row) {
      if (this.$refs['changeServerForm'] !== undefined) {
        this.$refs['changeServerForm'].resetFields()
      }
      const { id, hostname, manage_ip, status, remark, cabinet } = row
      const { idc, service, server_purpose } = { idc: row.idc.id, service: row.service.id, server_purpose: row.server_purpose.id }
      this.changeServerForm = { id, hostname, manage_ip, status, remark, idc, cabinet, service, server_purpose }
      this.changeServerVisible = true
    },
    deleteClick(row) {
      this.$confirm('是否删除 ' + row.hostname + '【' + row.manage_ip + '】', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteServer(row.id).then(() => {
          this.$message({
            message: '删除业务线成功',
            type: 'success'
          })
          if (this.serverList.length === 1 && this.searchForm.page > 1) {
            this.searchForm.page = this.searchForm.page - 1
          }
          this.fetchData(Object.assign(this.searchForm))
        })
      }).catch(() => {
        this.$message({
          message: '操作失败',
          type: 'error'
        })
      })
    },
    submitchangeServerClick() {
      this.$refs['changeServerForm'].validate((valid) => {
        if (!valid) {
          return
        }
        updateServer(this.changeServerForm.id, this.changeServerForm).then(res => {
          this.changeServerVisible = false
          this.fetchData(Object.assign(this.searchForm))
          this.$message({
            message: '操作成功',
            type: 'success'
          })
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.table-form-expand {
  font-size: 0;
  label {
    width: 90px;
    color: #99a9bf;
  }
  .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
}
</style>



