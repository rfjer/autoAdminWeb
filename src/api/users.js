import request from '@/utils/request'

// 用户列表
export function getUserList(params) {
  return request({
    url: '/users/',
    method: 'get',
    params
  })
}

export function deleteUser(userid) {
  return request({
    url: '/users/' + userid + '/',
    method: 'delete'
  })
}

export function addUser(params) {
  return request({
    url: '/userreg/',
    method: 'post',
    data: params
  })
}
export function updateUser(userid, params) {
  return request({
    url: '/users/' + userid + '/',
    method: 'put',
    data: params
  })
}
export function getUserGroupsList(uid, params) {
  return request({
    url: '/usergroups/' + uid + '/',
    method: 'get',
    params
  })
}

export function updateUserGroupsList(userid, params) {
  return request({
    url: '/usergroups/' + userid + '/',
    method: 'put',
    data: params
  })
}

// 角色列表
export function getGroupsList(params) {
  return request({
    url: '/groups/',
    method: 'get',
    params
  })
}
export function addRole(params) {
  return request({
    url: '/groups/',
    method: 'post',
    data: params
  })
}

export function getGroupPermissionsList(id, params) {
  return request({
    url: '/grouppermissions/' + id + '/',
    method: 'get',
    params
  })
}
export function deleteGroup(gid) {
  return request({
    url: '/groups/' + gid + '/',
    method: 'delete'
  })
}

// 成员列表
export function getGroupMembers(gid, params) {
  return request({
    url: '/groupmembers/' + gid + '/',
    method: 'get',
    params
  })
}

export function deleteGroupMember(gid, data) {
  return request({
    url: '/groupmembers/' + gid + '/',
    method: 'delete',
    data
  })
}

export function updateGroupPermissions(id, params) {
  return request({
    url: '/grouppermissions/' + id + '/',
    method: 'put',
    data: params
  })
}

export function deleteGroupPermissions(id, params) {
  return request({
    url: '/grouppermissions/' + id + '/',
    method: 'delete',
    data: params
  })
}

// 获取用户组的前端菜单
export function getGroupMenuList(id, params) {
  return request({
    url: '/groupmenus/' + id + '/',
    method: 'get',
    params
  })
}

// 给指定用户组增加新的前端菜单
export function updateGroupMenu(id, params) {
  return request({
    url: '/groupmenus/' + id + '/',
    method: 'put',
    data: params
  })
}

