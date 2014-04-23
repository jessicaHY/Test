require("cloud/app.js");
require("cloud/services/user.js")

// Use AV.Cloud.define to define as many cloud functions as you want.
// For example:
AV.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

AV.Cloud.beforeSave("_Notification", function(req, res){
    var user = AV.User.current();
    if (!user)
        res.error("error!")
    var query = new AV.Query(AV.User)
    query.get(user.objectId, {
        success: function(user){
            res.success(user);
        },
        error: function(user, error) {
            res.error("error!");
        }
    })
})

