import request from '@/utils/request'

// zabbix status
export function getZabbixStatus() {
  return request({
    url: '/zabbixStatus/',
    method: 'get'
  })
}
export function getZabbixProduct() {
  return request({
    url: 'zabbixProduct',
    method: 'get'
  })
}
