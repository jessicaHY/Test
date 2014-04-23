require("cloud/app.js");
require("cloud/services/user.js")

// Use AV.Cloud.define to define as many cloud functions as you want.
// For example:
AV.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

AV.Cloud.beforeSave("_Notification", function(req, res){
    res.error("error!");
})

