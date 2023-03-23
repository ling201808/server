//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mailchimp = require("@mailchimp/mailchimp_marketing");

const app = express();

mailchimp.setConfig({
  apiKey: "d37fe97e7bb1eef2447cfc406e7159f7-us21",
  server: "us21"
});

app.set('view engine', 'ejs');
const path = require('path');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')))

const failedSubscribe = "😞 Oops, something went wrong, please fill out the form again.";
const successSubscribe = "✅ Thanks for subscribing. From now on, you'll be the first to know about our updates.";
const successContactForm = "✅ Thanks for contacting us. We'll get back to you as soon as possible.";
const failedContactForm = "😞 Oops, something went wrong, please try again.";

app.get("/", function (req, res) {
  res.render("home");
});

app.get("/buyFromUs", function (req, res) {
  res.render("buyFromUs");
});

app.get("/consulting", function (req, res) {
  res.render("consulting");
});

app.get("/contact", function (req, res) {
  res.render("contact");
});

app.get("/sellToUs", function (req, res) {
  res.render("sellToUs");
});

app.post("/subscribe", function (req, res) {
  const email = req.body.email;
  const listId = "48e9f94ffb";
  const subscribingUser = {
    email: email,
  };
  async function run() {
    const response = await mailchimp.lists.addListMember(listId, {
      email_address: subscribingUser.email,
      status: "subscribed",

    });
    res.render("subscribe", { message: successSubscribe });
    console.log('Successfully added contact as an audience member.');
  }
  run().catch(e => res.render("subscribe", { message: failedSubscribe }));
});

app.listen(3000, function () {
  console.log("Server is running on port 3000")
})
