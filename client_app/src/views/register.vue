<template>
  <div class="register">
      <section class="form_container">
          <div class="manage_tip">
              <span class="title">Zoom Furhat Back Office Management System</span>
          </div>
          <el-form :model="registerUser" :rules="rules" class="registerForm" ref="registerForm" label-width="80px">
              <el-form-item label="Administer" prop="name">
                  <el-input v-model="registerUser.name" placeholder="Please enter your administer name"></el-input>
              </el-form-item>
              <el-form-item label="Email" prop="email">
                  <el-input v-model="registerUser.email" placeholder="Please enter your email"></el-input>
              </el-form-item>
              <el-form-item label="Password" prop="password">
                  <el-input v-model="registerUser.password" placeholder="Please enter your password" type="password"></el-input>
              </el-form-item>
              <el-form-item label="Confirm" prop="password2">
                  <el-input v-model="registerUser.password2" placeholder="Please confirm your password" type="password"></el-input>
              </el-form-item>
              <el-form-item label="Identity">
                  <el-select v-model="registerUser.identity" placeholder="please choose your identity">
                      <el-option label="Manager" value="manager"></el-option>
                      <el-option label="Employee" value="employee"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary"  class="submit_btn" @click="submitForm('registerForm')">Register</el-button>
              </el-form-item>
          </el-form>
      </section>
  </div>
</template>

<script>
import axios from 'axios';
import { ElMessage } from 'element-plus';
export default {
  name: 'Register',
  data() {
    var validatePass = (rule, value, callback) => {
      if(value !== this.registerUser.password){
        callback(new Error('The password is not the same twice'))
      } else {
        callback();
      }
    }
    return {
      registerUser: {
        name: "",
        email: "",
        password: "",
        password2: "",
        identity: ""
      },
      rules: {
        // Define validation rules here
        name: [{
          required:true, message:"Administer can not be null", trigger:"blur"
        },
        {
          min:2, max:30, message:"length must be between 2 to 20 characters", trigger:"blur"
        }],
        email: [{
          type:"email",
          required:true,
          message:"email format is not correct",
          trigger:'blur'
        }],
        password: [{
          required:true,
          message:"password can not be null",
          trigger:"blur"
        },
        {
          min:6,
          max:30,
          message:"length must be between 6 to 30 characters",
          trigger: 'blur'
        }],
        password2: [{
          required:true,
          message:"must confirm password can not be null",
          trigger:"blur"
        },
        {
          min:6,
          max:30,
          message:"length must be between 6 to 30 characters",
          trigger: 'blur'
        },
        {
          validator:validatePass,
          trigger: 'blur'
        }]
      }
    }
  },
  
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post("/api/users/register", this.registerUser)
            .then(res => {
              this.$message({
                message: "Register Successfully！",
                type: "success"
              });
              this.$router.push("/login");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>


  
  <style scoped>
  .register {
    position: relative;
    width: 100%;
    height: 100%;
    background: url(../assets/bg.jpg) no-repeat center center;
    background-size: 100% 100%;
  }
  .form_container {
    width: 370px;
    height: 210px;
    position: absolute;
    top: 10%;
    left: 34%;
    padding: 25px;
    border-radius: 5px;
    text-align: center;
  }
  .form_container .manage_tip .title {
    font-family: "Microsoft YaHei";
    font-weight: bold;
    font-size: 26px;
    color: #000;
  }
  .registerForm {
    margin-top: 20px;
    background-color: #fff;
    padding: 20px 40px 20px 20px;
    border-radius: 5px;
    box-shadow: 0px 5px 10px #cccc;
  }
  
  .submit_btn {
    width: 100%;
  }

  .el-button {
  width: 100%;
  border: none;
  color: #fff;
  background-image: linear-gradient(135deg, #329bff 0%, #2063ff 100%); 
  border-radius: 4px;
  font-weight: bold;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease; 
}

  .el-button:hover, .el-button:focus {
    background-image: linear-gradient(135deg, #1ab9ff 0%, #0061ff 100%); 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 
  }

  .el-button--primary {
    background-image: linear-gradient(135deg, #329bff 0%, #2063ff 100%) !important; 
    border-color: transparent !important; 
  }

  .el-button--primary:hover {
    background-image: linear-gradient(135deg, #1ab9ff 0%, #0061ff 100%) !important;
  }

  .el-button--primary:focus {
    background-image: linear-gradient(135deg, #1ab9ff 0%, #0061ff 100%) !important;
    box-shadow: 0 0 0 2px rgba(50, 155, 255, 0.5) !important; 
  }

  </style>
  