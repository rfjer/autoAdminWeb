<template>
    <div class="zabbix-container">
      <el-row>
        <el-col style="width:25%;text-align:center;padding:10px;">
          <el-progress type="circle" :percentage=monitor_host_percent :stroke-width=15 ></el-progress>
          <div style="width:100%;text-align:center;line-height:40px;">已监控的主机</div>
        </el-col>
        <el-col style="width:25%;text-align:center;padding:10px;">
          <el-progress type="circle" :percentage=success_monitor_percent :stroke-width=15 ></el-progress>
          <div style="width:100%;text-align:center;line-height:40px;">正常监控的主机</div>
        </el-col>
        <el-col style="width:25%;text-align:center;padding:10px;">
          <el-progress type="circle" :percentage=exception_monitor_percent :stroke-width=15  ></el-progress>
          <div style="width:100%;text-align:center;line-height:40px;">异常监控</div>
        </el-col>
        <el-col style="width:25%;text-align:center;padding:10px;">
          <el-progress type="circle" :percentage=not_monitor_percent stroke-width=15 ></el-progress>
          <div style="width:100%;text-align:center;line-height:40px;">未监控</div>
        </el-col>
      </el-row>
      <el-row>
        <el-table
          class="table"
          v-loading="loading"
          element-loading-text="拼命加载中"
          :data="zabbixProductData"
          border>
          <el-table-column
            prop="name"
            label="业务线"
            align="center">
          </el-table-column>
          <el-table-column
            prop="total_host"
            label="服务器数据"
            align="center">
          </el-table-column>
          <el-table-column
            prop="monitor_total"
            label="已监控数"
            align="center">
          </el-table-column>
          <el-table-column
            prop="not_monitor"
            label="未监控数"
            align="center">
          </el-table-column>
          <el-table-column
            prop="problem_disaster"
            label="disaster"
            align="center">
          </el-table-column>
          <el-table-column
            prop="problem_high"
            label="high"
            align="center">
          </el-table-column>
          <el-table-column
            prop="problem_average"
            label="average"
            align="center">
          </el-table-column>
          <el-table-column
            prop="problem_warning"
            label="warning"
            align="center">
          </el-table-column>
          <el-table-column
            prop="problem_information"
            label="information"
            align="center">
          </el-table-column>
        </el-table>
      </el-row>
    </div>
</template>

<script>
  import { getZabbixStatus, getZabbixProduct } from '@/api/zabbix'

  export default {
    data() {
      return {
        total_host: 0, // 服务器总数量
        zabbix_total_host: 0, // zabbix 中 host 总数
        zabbix_monitor_host: 0, // zabbix 中正常监控的host数
        zabbix_not_monitor_host: 0, // zabbix中，没有监控的主机数
        zabbix_monitor_exception_host: 0, // zabbix中，监控异常的主机数： zabbix agent 异常
        zabbixProductData: [],
        loading: false
      }
    },
    created() {
      this.fetchZabbixStatusData()
      this.fetchZabbixProductData()
    },
    computed: {
      monitor_host_percent: function() {
        const percent = this.zabbix_total_host / this.total_host
        return this.verifyPercent(percent)
      },
      success_monitor_percent: function() {
        const percent = this.zabbix_monitor_host / this.zabbix_total_host
        return this.verifyPercent(percent)
      },
      exception_monitor_percent: function() {
        const percent = this.zabbix_monitor_exception_host / this.zabbix_total_host
        return this.verifyPercent(percent)
      },
      not_monitor_percent: function() {
        const percent = this.zabbix_not_monitor_host / this.total_host
        return this.verifyPercent(percent)
      }
    },
    methods: {
      fetchZabbixStatusData() {
        getZabbixStatus().then(res => {
          this.total_host = res.total_host
          this.zabbix_total_host = res.zabbix_total_host
          this.zabbix_monitor_host = res.zabbix_monitor_host
          this.zabbix_not_monitor_host = res.zabbix_not_monitor_host
          this.zabbix_monitor_exception_host = res.zabbix_monitor_exception_host
        })
      },
      fetchZabbixProductData() {
        this.loading = true
        getZabbixProduct().then(res => {
          this.zabbixProductData = res
          this.loading = false
        })
      },
      verifyPercent(percent) {
        const value = parseFloat((percent * 100).toFixed(2))
        return isNaN(value) ? 0 : value
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
