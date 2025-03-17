const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const errorController = require("./controllers/error");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const MONGODB_URI =
  "mongodb+srv://omarkamal:oMk6294@cluster0.ayo0i.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0";

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");
const { name } = require("ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store,
  })
);

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "Omar",
          email: "omar@mail.com",
          cart: { items: [] },
        });

        user.save();
      }
    });
    app.listen(3001);
  })
  .catch((err) => console.log(err));
