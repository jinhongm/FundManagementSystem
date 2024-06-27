const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const passport = require("passport");
const mongoose = require('mongoose');
const dbConfig = require('./config/keys');

// 引入路由
const users = require("./routers/apis/users");
const profile = require("./routers/apis/profiles");

const app = express(); // 创建一个 Express 应用实例

// 使用环境变量定义的端口或者指定端口
const port = process.env.PORT || 3001;

// 设置 CORS
app.use(cors({
  origin: [
    'https://arriving-bull-secondly.ngrok-free.app',
    'http://localhost:9999'  // 添加其他需要的源
  ]
}));

// 使用 bodyParser 中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 连接到 MongoDB
mongoose
  .connect(dbConfig.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Passport 初始化
app.use(passport.initialize());
require("./config/passport")(passport);

// 设置基础路由
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from Express!' });
});

// 使用路由
app.use("/api/users", users);
app.use('/api/profiles', profile);

// 启动 Express 服务器
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
