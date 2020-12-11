<template>
  <a-layout id="components-layout-demo-responsive">
    <a-layout-sider
      breakpoint="lg"
      @collapse="onCollapse"
      v-model="collapsed"
      @breakpoint="onBreakpoint"
      :trigger="null"
      collapsible
    >
      <div class="logo">Logo</div>
      <a-menu theme="dark" mode="inline" :default-selected-keys="selectedKeys" :open-keys="openKeys" @openChange="onOpenChange">
        <a-sub-menu v-for="item in menu" :key="item.path">
          <span slot="title">
            <a-icon :type="item.icon" />
            <span class="nav-text">{{ item.title }}</span>
          </span>
          <a-menu-item v-for="subItem in item.submenu" :key="subItem.path">
            <router-link :to="subItem.path">
              <a-icon :type="subItem.icon" />
              <span class="nav-text">{{ subItem.title }}</span>
            </router-link>
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="header">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />
        <a-dropdown>
          <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
            <a-avatar style="backgroundcolor: #87d068" icon="user" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a href="javascript:;" @click="logout">退出登录</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
// import { mapMutations } from "vuex";
export default {
  data() {
    return {
      collapsed: false,
      menu: [
        {
          title: "首页",
          path: "/home",
          icon: "sketch",
          submenu: [
            {
              title: '数据看版',
              path: '/home/panel',
              icon: "dot-chart"
            }
          ]
        }
      ],
      openKeys: [this.$route.path.substr(0, this.$route.path.lastIndexOf('/'))],
      selectedKeys: [this.$route.path],
      rootSubmenuKeys: ['/panel'] // 有几个子菜单项就贴几个
    };
  },
  methods: {
    // ...mapMutations(["setToken"]),
    onCollapse(collapsed, type) {
      console.log(collapsed, type);
    },
    onBreakpoint(broken) {
      console.log(broken);
    },
    // 只展开一个子菜单
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1)
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
    },
    select ({ item, key, selectedKeys }) { // 选中项
      this.selectedKeys = [key]
    },
    logout() {
      // this.setToken("");
      this.$router.push("/login");
    },
  }
};
</script>

<style>
#components-layout-demo-responsive {
  height: 100vh;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}
#components-layout-demo-responsive .logo {
  height: 64px;
  line-height: 64px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  background: #0a9688;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background-color: #fff;
}
.content {
  margin: 24px 16px;
  padding: 24px;
  background: #fff;
  overflow: auto;
}
</style>
