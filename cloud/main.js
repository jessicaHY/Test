require("cloud/app.js");
require("cloud/services/user.js")

// Use AV.Cloud.define to define as many cloud functions as you want.
// For example:
AV.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

AV.Cloud.beforeSave("_Notification", function(req, res){
    console.error("notification before save!!!")
    res.error("error!");
})

AV.Cloud.beforeSave("AndroidScore", function(req, res){
    console.error("AndroidScore before save!!!")
    res.error("error!");
})