const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  name: state => state.user.name,
  avatar: state => state.user.avatar,
  menus: state => state.user.menus
}
export default getters
