<template>
  <div class="login">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">Zoom Online Back Office Management System</span>
      </div>
      <el-form :model="loginUser" :rules="rules" ref="loginForm" class="loginForm" label-width="60px">
        <el-form-item label="Email" prop="email">
          <el-input v-model="loginUser.email" placeholder="Please enter your email"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input v-model="loginUser.password" placeholder="Please enter your password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">Log In</el-button>
        </el-form-item>
        <div class="tiparea">
          <p>Don't have an account? <router-link to='/register'>Sign up now</router-link></p>
        </div>
      </el-form>
    </section>
  </div>
</template>

<script>
import { ElForm, ElFormItem, ElInput, ElButton, ElMessage, ElLoading } from 'element-plus';
import { ref } from 'vue';
import axios from 'axios';
import router from '@/router'; // Make sure the path is correct for your project
import { jwtDecode } from 'jwt-decode';
import { useStore } from 'vuex';

export default {
  name: "Login",
  components: {
    ElForm,
    ElFormItem,
    ElInput,
    ElButton
  },
  setup() {
    const loginUser = ref({
      email: "",
      password: ""
    });
    const loginForm = ref(null); // Reference to the form instance
    const store = useStore(); // Use the store within the setup function

    // Convert rules to a ref if you need them to be reactive, or use reactive({})
    const rules = ref({ // Make rules reactive
      email: [
        { type: "email", required: true, message: "The email format is incorrect", trigger: "blur" }
      ],
      password: [
        { required: true, message: "Password cannot be empty", trigger: "blur" },
        { min: 6, max: 30, message: "The length must be between 6 to 30 characters", trigger: "blur" }
      ]
    });

    // Helper function to check if an object is empty
    const isEmpty = (obj) => {
      return Object.keys(obj).length === 0;
    };

    const submitForm = async () => {
      if (loginForm.value) {
        try {
          await loginForm.value.validate();  // Validate the form
          const response = await axios.post("/api/users/login", loginUser.value);
          const { token } = response.data;
          localStorage.setItem('eleToken', token);

          const decode = jwtDecode(token);
          console.log(decode)
          // Error.MSG
          store.dispatch("setIsAuthenticated", !isEmpty(decode));
          store.dispatch("setUser", decode);
          
          
          ElMessage.success('Login successful!');
          await router.push('/index');
        } catch (error) {
          if (error.response && error.response.status == 401) {
            ElMessage.error(error.response.data.message);
          } else {
            ElMessage.error(error.message || 'An unexpected error occurred.');
          }
          ElLoading.service().close()
        }
      } else {
        console.log("Form validation failed");
        ElMessage.error("Please fill in the form correctly")
      }
    };

    return {
      loginUser,
      loginForm,
      rules,
      submitForm
    };
  }
};

</script>
  
  
  <style scoped>
  /* Common styles for both register and login */
  .form_container {
    width: 370px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); /* Center the form */
    padding: 25px;
    border-radius: 5px;
    background-color: #fff; /* White background */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
    text-align: center;
  }
  
  .manage_tip .title {
    font-family: "Microsoft YaHei";
    font-weight: bold;
    font-size: 26px;
    color: #000; /* Black color for the title */
    margin-bottom: 20px;
  }
  
  /* Input styles */
  .el-input__inner {
    background-color: #f5f5dc !important; /* Beige background for the inputs */
    border-color: #c0c0c0; /* A darker border for better visual effect */
    color: #333; /* Dark text for better readability */
  }
  
  .el-input__inner:focus {
    border-color: #a0a0a0; /* Darker border color on focus */
  }
  
  /* Button styles */
  .submit_btn, .el-button {
    width: 100%;
    border: none;
    color: #fff;
    background-image: linear-gradient(135deg, #329bff 0%, #2063ff 100%); /* Gradient background */
    border-radius: 4px;
    font-weight: bold;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease; /* Smooth transition for hover effects */
  }
  
  .el-button:hover, .el-button:focus {
    background-image: linear-gradient(135deg, #1ab9ff 0%, #0061ff 100%); /* Hover gradient color */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Hover shadow */
  }
  
  /* Tip area styles */
  .tiparea {
    text-align: right;
    font-size: 12px;
    color: #333;
  }
  
  .tiparea p a {
    color: #409eff; /* Link color */
  }
  .login {
    position: relative;
    width: 100%;
    height: 100%;
    background: url(../assets/bg.jpg) no-repeat center center;
    background-size: 100% 100%;
  }

  </style>
  