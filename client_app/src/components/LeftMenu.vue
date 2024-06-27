<template>
    <el-row class="menu_page">
      <el-col>
        <el-menu
          mode="vertical"
          background-color="#324057"
          text-color="#fff"
          active-text-color="#409EFF"
          class="el-menu-vertical-demo">
          <el-menu-item index="1">
            <router-link to="/home">
              <i class="fa fa-margin fa-home"></i>
              <span>Home</span>
            </router-link>
          </el-menu-item>
          <el-submenu v-for="item in items" :index="item.path" :key="item.path">
            <template #title>
              <i :class="'fa fa-margin ' + item.icon"></i>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item 
              v-for="child in item.children" 
              :index="child.path" 
              :key="child.path">
              <router-link :to="child.path">
                {{ child.name }}
              </router-link>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: "LeftMenu",
    setup() {
      const items = [
        {
          icon: "fa-robot",
          name: "Furhat Management",
          path: "furhat",
          children: [{ path: "robotlist", name: "Robot List" }]
        },
        {
          icon: "fa-user",
          name: "User Management",
          path: "users",
          children: [
            { path: "profile", name: "Profile" },
            { path: "settings", name: "Settings" }
          ]
        }
      ];
      
      return { items };
    }
  });
  </script>
  
  
  
  
  <style scoped>
  .menu_page {
    position: fixed;
    top: 71px;
    left: 0;
    height: 100%;
    background-color: #324057;
    z-index: 99;
    color: #fff; /* Ensures text is white */
  }
  
  .el-menu {
    border: none;
    color: #fff; /* Ensures text is white */
  }
  
  .el-menu-item,
  .el-submenu__title {
    color: #fff; /* Ensures text is white */
  }
  
  .fa-margin {
    margin-right: 5px;
  }
  
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 180px;
    min-height: 400px;
  }
  
  .el-menu-vertical-demo {
    width: 200px; /* Adjusted to fit content */
  }
  
  .el-submenu .el-menu-item {
    min-width: 180px;
  }
  
  .hiddenDropdown,
  .hiddenDropname {
    display: none;
  }
  
  a {
    text-decoration: none;
    color: #fff; /* Ensures link text is white */
  }
  
  /* Add this to ensure white text for submenu items */
  .el-submenu .el-menu-item span {
    color: #fff;
  }
  
  /* Add this to ensure white text for icons if they are not changing color */
  .fa {
    color: #fff;
  }
  </style>
  
  