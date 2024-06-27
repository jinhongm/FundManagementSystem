<template>
    <header class="head-nav">
      <el-row>
        <el-col :span="8" class="logo-container">
          <img src="../assets/logo.png" class="logo" alt="Company Logo">
          <span class="title">Zoom Online Management System</span>
        </el-col>
        <el-col :span="16" class="user-info">
          <div class="userinfo">
            <!-- Spacing element to push content to the right -->
            <div class="spacer"></div>
            <div class='welcome'>
                    <p class='name comename'>Welcome</p>
                    <p class='name avatarname'>{{user.name}}</p>
            </div>
            <el-avatar :src="user.avatar" class="avatar"></el-avatar>
            <el-dropdown trigger="click" @command="setDialogInfo">
                <span class="el-dropdown-link">
                    User_Info<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                    <el-dropdown-item command="info">info</el-dropdown-item>
                    <el-dropdown-item command="logout">logout</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
          </div>
        </el-col>
      </el-row>
    </header>  
</template>
  
  <script>
  import { ElRow, ElCol, ElDropdown, ElDropdownMenu, ElDropdownItem, ElAvatar } from 'element-plus';
  
  export default {
    name: "HeadNav",
    components: {
      ElRow,
      ElCol,
      ElDropdown,
      ElDropdownMenu,
      ElDropdownItem,
      ElAvatar
    },
    computed: {
      user() {
        return this.$store.getters.user;
      }
    },
    methods: {
      setDialogInfo(cmditem) {
      if (!cmditem) {
        console.log("test");
        this.$message("Menu option lacks of command!!!");
        return;
      }
      switch (cmditem) {
        case "info":
            this.showInfo(); 
            break;
        case "logout":
          this.logout();
          break;
      }
    },
    showInfo() {
        this.$router.push("/infoshow");
        // console.log("individual info")
      },  
    logout() {
      localStorage.removeItem("eleToken");
      this.$store.dispatch("clearCurrentState");
      this.$router.push("/login");
    }
  }
};
</script>



<style scoped>
.head-nav {
  background: #546e7a;
  color: #fff;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo {
  height: 80px;
  margin-right: 15px;
}

.title {
  font-size: 1.2rem;
  font-weight: 300;
  color: #fff;
  white-space: nowrap;
}

.el-dropdown-link {
    cursor: pointer;
    color: #409eff;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }


.user-info {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.userinfo {
  display: flex;
  align-items: center;
  width: 100%;
}

.spacer {
  flex-grow: 1;
}

.avatar {
  width: 50px;
  height:50px;
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
  margin-right: 1200;
}
.welcome {
  display: inline-block;
  width: auto;
  vertical-align: middle;
  padding: 0 5px;
  margin-right: 1300;
}

.username {
  font-size: 1rem;
  font-weight: 500;
}

.avatar {
  --el-avatar-size: 50px;
  margin-right: 10px;
}

.el-icon-more {
  --el-icon-font-size: 20px;
}

</style>


