<template>
    <scroll-bar>
        <el-menu router mode="vertical" unique-opened :default-active="onRouters" :collapse="isCollapse" background-color="#304156" text-color="#fff" active-text-color="#409EFF">
            <template v-for="(item, index) in routes">
              <router-link v-if="item.children.length===0" :to="item.path" :key="index">
                  <el-menu-item :index="item.path" class="submenu-title-noDropdown">
                      <svg-icon :icon-class="item.icon"></svg-icon>
                      <span>{{item.label}}</span>
                  </el-menu-item>
              </router-link>
              <el-submenu v-else :index="item.path" :key="index">
                  <template slot="title">
                      <svg-icon :icon-class="item.icon"></svg-icon>
                      <span>{{ item.label }}</span>
                  </template>

                  <template v-for="(child, _index) in item.children" v-if="child.show">
                      <router-link :to="item.path+child.path" :key="_index">
                          <el-menu-item :index="item.path+child.path">
                              <!-- <svg-icon :icon-class="item.icon"></svg-icon> -->
                              <span>{{child.label}}</span>
                          </el-menu-item>
                      </router-link>
                  </template>
              </el-submenu>
          </template>
        </el-menu>
    </scroll-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import ScrollBar from '@/components/ScrollBar'

export default {
  components: { ScrollBar },
  computed: {
    ...mapGetters({
      sidebar: 'sidebar',
      routes: 'menus'
    }),
    onRouters() {
      const array = this.$route.path.split('/')
      if (array[3]) {
        return '/' + array[1] + '/' + array[2]
      }
      return this.$route.path
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
