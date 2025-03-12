// const mysql = require("mysql2");

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "oMk6294$",
//   database: "node-complete",
// });

// module.exports = pool.promise();

// const Sequelize = require("sequelize").Sequelize;

// const sequelize = new Sequelize("node-complete", "root", "oMk6294$", {
//   dialect: "mysql",
//   host: "localhost",
// });

// module.exports = sequelize;

const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://omarkamal:oMk6294@cluster0.ayo0i.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0"
  )
    .then((client) => {
      console.log("Connected");
      _db = client.db();
      callback(client);
    })
    .catch((err) => console.log(err));
};

const getDb = () => {
  if (_db) return _db;
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
