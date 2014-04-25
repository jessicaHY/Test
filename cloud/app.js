// 在 Cloud code 里初始化 Express 框架
var express = require('express');
var fs = require('fs');
var app = express();
//var avosExpressCookieSession = require('avos-express-cookie-session')

// App 全局配置
app.set('views','cloud/views');   // 设置模板目录
app.set('view engine', 'jade');    // 设置 template 引擎
app.use(express.bodyParser());    // 读取请求 body 的中间件

//启用cookie
//app.use(express.cookieParser('*%^$#d~x&*X!'));
//使用avos-express-cookie-session记录信息到cookie。
//app.use(avosExpressCookieSession({cookie:{maxAge:3600000}}))

// 使用 Express 路由 API 服务 /hello 的 HTTP GET 请求
app.get('/login', function(req, res) {
  res.render('login');
});

app.post("/login", function(req, res){
//    res.set("X-AVOSCloud-Application-Production", 0);
    AV.Cloud.run("accountsLogin", {email:req.body.email, password:req.body.password}, {
        success: function(data) {
            console.log(data)
            res.send(data)
        },
        error : function(err) {
            console.error(err)
            res.send(err)
        }
    })
});

app.get('/register', function(req, res) {
    res.render('register');
});

app.get('/createDir', function(req, res) {
    fs.mkdir("a", function(abc) {
        console.error("createDir error: ", abc);
        fs.readdir("a", function(err, files) {
            console.error(err, files.length)
            res.send("aaaaaaaaaaaaaaa  ...");
        })
    })
})

app.post("/register", function(req, res){

    AV.Cloud.run("accountsRegister", {email:req.body.email, username:req.body.username, password:req.body.password}, {
        success: function(data) {
            console.log(data)
            res.send(data)
        },
        error : function(err) {
            console.error(err)
            res.send(err)
        }
    })
});


// 最后，必须有这行代码来使 express 响应 HTTP 请求
app.listen();