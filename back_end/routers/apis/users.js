// @login & register
const express = require("express")
const router = express.Router();
// 引入model 里面的 User
const User = require("../../User_Models/user");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
// $route GET api/users/test
// @desc 返回 请求的json数据
// @access public 
router.get("/test",(req, res)=>{
    res.json({
        msg:"login works"
    })
})

router.post("/register", (req,res)=>{
    console.log(req.body)
    User.findOne({email:req.body.email})
    .then((user) => {
        if(user){
            return res.status(400).json("email has been registered")
        }else{
            // mm 给出的 一个virtual 头像
            // const avatar = gravatar.url(req.body.email, { s: '200', r: 'pg', d: 'mm' });
            const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(req.body.name)}&size=200&background=random`;
            console.log(avatar);
            const newUser = new User({
                name:req.body.name,
                email:req.body.email,
                avatar: avatar,
                password:req.body.password,
                identity:req.body.identity
            });

        bcrypt.genSalt(10, function(err, salt){
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) throw err;
                newUser.password = hash;
                newUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
            })
        })
        }
    })
})

router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    
    // 查找用户
    User.findOne({ email }).then(user => {
        if (!user) {
            return res.status(404).json("The account does not exist" );
        }
        // 检查密码
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // 用户匹配，创建JWT Payload
                const payload = { 
                    id: user.id, 
                    name: user.name,
                    avatar: user.avatar,
                    identity: user.identity
                };
                // 签名JWT
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    { expiresIn: 3600 },
                    (err, token) => {
                        if (err) throw err;
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
            } else {
                return res.status(400).json("Password is incorrect");
            }
        });
    });
});

router.get("/current", passport.authenticate("jwt", {session:false}), (req,res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        identity: req.user.identity 
    })
});


module.exports = router;
