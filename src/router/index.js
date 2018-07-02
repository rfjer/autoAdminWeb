import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/

const Layout = () => import('@/views/layout/Layout')
const Login = () => import('@/views/login/Login')
const Page = () => import('@/views/404')

/* users */
const Dashboard = () => import('@/views/dashboard/Dashboard')
const UserList = () => import('@/views/users/UserList')
const GroupList = () => import('@/views/users/GroupList')
const GroupPermissionList = () => import('@/views/users/GroupPermissionList')

/* business */
const ProductList = () => import('@/views/resource/ProductList')
const ServerList = () => import('@/views/resource/ServerList')

/* manufacturer */
const ManufacturerList = () => import('@/views/resource/ManufacturerList')

/* product_model */
const ProductModelList = () => import('@/views/resource/ProductModelList')

/* IDC */
const IdcList = () => import('@/views/resource/IdcList')

/* 机柜 */
const CabinetList = () => import('@/views/resource/CabinetList')

/* 网卡 */
const NetworkDeviceList = () => import('@/views/resource/NetworkDeviceList')

/* IP */
const IpList = () => import('@/views/resource/IpList')

/* 监控管理 */
const Zabbix = () => import('@/views/monitor/zabbix')

export const constantRouterMap = [
  {
    path: '/login',
    component: Login,
    hidden: true
  },
  {
    path: '/404',
    component: Page,
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    icon: 'dashboard',
    children: [{
      path: '',
      component: Dashboard,
      name: 'Dashboard',
      meta: { title: 'Dashboard', icon: 'dashboard', noCache: true }
    }]
  },
  {
    path: '/users',
    component: Layout,
    redirect: '/users/list',
    name: '用户管理',
    meta: {
      title: '用户管理',
      icon: 'user'
    },
    children: [
      {
        path: 'list',
        component: UserList,
        name: '用户列表',
        meta: { title: '用户列表', icon: 'user' }
      },
      {
        path: 'group',
        component: GroupList,
        name: '角色',
        meta: { title: '角色', icon: 'solution' }
      },
      {
        path: 'group/groupPermission',
        component: GroupPermissionList,
        name: '权限列表',
        meta: { title: '权限列表', icon: 'user' },
        hidden: true
      }
    ]
  },
  {
    path: '/resources',
    component: Layout,
    redirect: '/resources/product',
    name: '资源管理',
    meta: {
      title: '资源管理',
      icon: 'user'
    },
    children: [
      {
        path: 'product',
        component: ProductList,
        name: '业务线',
        meta: { title: '业务线', icon: 'user' }
      },
      {
        path: 'manufacturer',
        component: ManufacturerList,
        name: '制造商',
        meta: { title: '制造商', icon: 'user' }
      },
      {
        path: 'product_model',
        component: ProductModelList,
        name: '机型型号',
        meta: { title: '机型型号', icon: 'user' }
      },
      {
        path: 'idc',
        component: IdcList,
        name: 'IDC机房',
        meta: { title: 'IDC机房', icon: 'user' }
      },
      {
        path: 'cabinet',
        component: CabinetList,
        name: '机柜管理',
        meta: { title: '机柜管理', icon: 'user' }
      },
      {
        path: 'network_device',
        component: NetworkDeviceList,
        name: '网卡管理',
        meta: { title: '网卡管理', icon: 'user' }
      },
      {
        path: 'ip',
        component: IpList,
        name: 'IP管理',
        meta: { title: 'IP管理', icon: 'user' }
      },
      {
        path: 'server',
        component: ServerList,
        name: '服务器',
        meta: { title: '服务器', icon: 'user' }
      }
    ]
  },
  {
    path: '/monitor',
    component: Layout,
    name: '监控管理',
    meta: {
      title: '监控管理',
      icon: 'user'
    },
    children: [
      {
        path: 'zabbix',
        component: Zabbix,
        name: 'zabbix',
        meta: { title: 'zabbix', icon: 'user' }
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
