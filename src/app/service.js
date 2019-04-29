var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://admin:admin01@ds145786.mlab.com:45786/web_test1";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});

function login(username, password) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
        var dbo = db.db("web_test1");
        dbo.collection("MST_Employee")
        .findOne({ user: username }, function(err, result) {
          if (err) throw err;
          if(result) {
            if (result.password === password) {
              resolve({loggedIn : true, user: result}) 
            } else {
              resolve({loggedIn : false, user: result}) 
            }
          }
          db.close();
        });
    });
  })
}

module.exports = {
  login: login
};
