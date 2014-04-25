var fs = require("fs");

AV.Cloud.define("accountsRegister", function(request, response) {
    var user = new AV.User();
    user.set("email", request.params.email);
    user.set("username", request.params.username);
    user.set("password", request.params.password);

    user.signUp(null).then(function(loginUser) {
        console.log("success")
        response.success(loginUser)
    }, function(loginUser, error) {
        console.log("error :" + error.code + "___________" + error.message);
        response.error(error);
    });
});

AV.Cloud.define("accountsLogin", function(request, response) {

    AV.User.logIn(request.params.email, request.params.password).then(function(user) {
        console.log("login success")

//        var roleACL = new AV.ACL();
//        console.log(roleACL);
//        roleACL.setPublicReadAccess(true);
//        roleACL.setPublicWriteAccess(true);
//        var role = new AV.Role("admin", roleACL);
//        console.log(role)
//        role.getUsers().add(user);
//        role.save();

//        var query = new AV.Query(AV.Role)
//        query.get("53575dcce4b05a5d84500df1").then(function(role) {
//            role.getUsers().add();
//        }, function(role, error) {
//
//        });
        response.success(user)
    }, function(user, error) {
        console.log("error :" + error.code + "___________" + error.message);
        response.error(error.message);
    })

});

AV.Cloud.define("createDir", function(req, res) {
    fs.mkdir("a", function(a,b,c) {
        console.error(a, b, c);
    });
    res.success("create dir over");
})

AV.Cloud.define("accountsModifyName", function(request, response) {
    var user = AV.User.current();
    if(user)
        console.log("user :" + user.objectId + "_______" + user.get("email"));
    else
        console.log("user : is null");

    if(user) {
        user.set("username", request.params.username);

        var acl = new AV.ACL();
        acl.setPublicReadAccess(true);
        acl.setWriteAccess(user, true);
        user.setACL(acl);

        user.save(null).then(function(user) {
                console.log("user :" + user.objectId + "_______" + user.get("email"));
                var query = new AV.Query(AV.User)
                query.get("53563a51e4b09111bac12b32",{
                    success: function(userAgain) {
                        userAgain.set("username", "test");
                        userAgain.save(null, {
                            success:function(userAgain) {
                                console.log("userAgain :" + userAgain.objectId + "_______" + userAgain.get("email"));
                                response.success(userAgain)
                            },
                            error: function (userAgain, error) {
                                console.log("error :" + error.code + "___________" + error.message);
                            }
                        })
                    }
                })
            },function(user, error) {
            console.log("error :" + error.code + "___________" + error.message);
        })
    } else
        response.error("no login")
})