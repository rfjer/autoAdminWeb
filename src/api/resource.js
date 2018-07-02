import request from '@/utils/request'

export function getProductTree() {
  return request({
    url: '/productmanage/',
    method: 'get'
  })
}

export function getProductLevel(params) {
  return request({
    url: '/products/',
    method: 'get',
    params
  })
}

export function addProduct(params) {
  return request({
    url: '/products/',
    method: 'post',
    data: params
  })
}

export function getProductLevelInfo(id) {
  return request({
    url: '/products/' + id + '/',
    method: 'get'
  })
}

export function updateProduct(id, params) {
  return request({
    url: '/products/' + id + '/',
    method: 'put',
    data: params
  })
}
export function deleteProductLevelInfo(id) {
  return request({
    url: '/products/' + id + '/',
    method: 'delete'
  })
}

export function getServerList(params) {
  return request({
    url: '/servers/',
    method: 'get',
    params
  })
}

export function countServer() {
  return request({
    url: '/ServerCount/',
    method: 'get'
  })
}

export function deleteServer(id) {
  return request({
    url: '/servers/' + id + '/',
    method: 'delete'
  })
}

export function getIdcsList(params) {
  return request({
    url: '/idcs/',
    method: 'get',
    params
  })
}

export function updateServer(id, data) {
  return request({
    url: '/servers/' + id + '/',
    method: 'PATCH',
    data
  })
}

/*
 * 制造商
 */
export function getManufacturerList(params) {
  return request({
    url: '/manufacturer/',
    method: 'get',
    params
  })
}

export function addManufacturer(data) {
  return request({
    url: '/manufacturer/',
    method: 'post',
    data
  })
}

export function updateManufacturer(id, data) {
  return request({
    url: '/manufacturer/' + id + '/',
    method: 'put',
    data
  })
}

export function deleteManufacturer(id) {
  return request({
    url: '/manufacturer/' + id + '/',
    method: 'delete'
  })
}

/*
 * 机器型号
 */
export function getProductModelList(params) {
  return request({
    url: '/product_model/',
    method: 'get',
    params
  })
}

export function addProductModel(data) {
  return request({
    url: '/product_model/',
    method: 'post',
    data
  })
}

export function updateProductModel(id, data) {
  return request({
    url: '/product_model/' + id + '/',
    method: 'put',
    data
  })
}

export function deleteProductModel(id) {
  return request({
    url: '/product_model/' + id + '/',
    method: 'delete'
  })
}

/*
 * idcs
 */
export function getIdcList(params) {
  return request({
    url: '/idcs/',
    method: 'get',
    params
  })
}

export function addIdc(data) {
  return request({
    url: '/idcs/',
    method: 'post',
    data
  })
}

export function updateIdc(id, data) {
  return request({
    url: '/idcs/' + id + '/',
    method: 'put',
    data
  })
}

export function deleteIdc(id) {
  return request({
    url: '/idcs/' + id + '/',
    method: 'delete'
  })
}

/*
 * 机柜
 */
export function getCabinetList(params) {
  return request({
    url: '/cabinet/',
    method: 'get',
    params
  })
}

export function addCabinet(data) {
  return request({
    url: '/cabinet/',
    method: 'post',
    data
  })
}

export function updateCabinet(id, data) {
  return request({
    url: '/cabinet/' + id + '/',
    method: 'put',
    data
  })
}

export function deleteCabinet(id) {
  return request({
    url: '/cabinet/' + id + '/',
    method: 'delete'
  })
}

/*
 * 网卡管理
 */
export function getNetworkDeviceList(params) {
  return request({
    url: '/network_device/',
    method: 'get',
    params
  })
}

export function addNetworkDevice(data) {
  return request({
    url: '/network_device/',
    method: 'post',
    data
  })
}

export function updateNetworkDevice(id, data) {
  return request({
    url: '/network_device/' + id + '/',
    method: 'put',
    data
  })
}

export function deleteNetworkDevice(id) {
  return request({
    url: '/network_device/' + id + '/',
    method: 'delete'
  })
}

/*
 * IP管理
 */
export function getIpList(params) {
  return request({
    url: '/ip/',
    method: 'get',
    params
  })
}

export function addIP(data) {
  return request({
    url: '/ip/',
    method: 'post',
    data
  })
}

export function updateIP(id, data) {
  return request({
    url: '/ip/' + id + '/',
    method: 'put',
    data
  })
}

export function deleteIP(id) {
  return request({
    url: '/ip/' + id + '/',
    method: 'delete'
  })
}
