const express = require("express");
const jwt = require('jsonwebtoken');
var bodyParser = require('body-parser')
require("dotenv").config()

const { Client } = require("pg");
const { getUserByLoginToken } = require("./crud/user");
const { getUserDetailsByRequest } = require('./utils/user')
const { insertMessage, getMessages } = require('./crud/chat')

const app = express();

app.use(bodyParser.json())

const client = new Client({
  user: "postgres",
  password: process.env.PG_PASS,
  database: "postgres",
  host: "localhost",
  port: 5432,
});

client.connect()

const authenticate = async (req, res, next) => {
  const user = await getUserDetailsByRequest(req)
  if (user !== null) {
    req.user = user
    return next()
  } else {
    return res.status(401).send("Unathenticated")
  }
}

const authorization = (level) => {
  switch (level) {
    case "write_chat":
    case "read_chat":
      return (req, res, next) => {
        if (req.user.scopes.includes("Normal")) {
          next()
        }
        else {
          return res.status(403).send("Forbidden")
        }
      }

  }
}

app.post("/login", async (req, res) => {

  const token = req.body.token;
  res.send({ token: await getUserByLoginToken(token, client) })

});

app.get("/chat", authenticate, authorization("read_chat"), async (req, res) => {
  res.send(await getMessages(client))
})

app.post("/chat", authenticate, authorization("write_chat"), async (req, res) => {

  if (!req.body.message) {
    return res.status(400).send('Bad request')
  }

  const message = req.body.message
  res.send(await insertMessage(req.user, message, client))

})

app.get("/", async (req, res) => {
  res.send("hællæ");
});

app.listen(9000, () => { });
