const express = require("express");
const jwt = require('jsonwebtoken');
var bodyParser = require('body-parser')
const app = express();
require("dotenv").config()
const cors = require('cors')
const http = require('http');
const server = http.createServer(app)
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
})


const { Client } = require("pg");
const { getUserByLoginToken, blockUser } = require("./crud/user");
const { getUserDetailsByRequest } = require('./utils/user')
const { insertMessage, getMessagesBefore, getMessagesAfter, hideMessage, getChatById } = require('./crud/chat')

const { generateTicket } = require('./crud/ticket')


// const whitelist = ['http://localhost:3000']
const corsOptions = {
  origin: function (origin, callback) {
    return callback(null, true)
    // if (whitelist.indexOf(origin) !== -1) {
    //   callback(null, true)
    // } else {
    //   callback(new Error('Not allowed by CORS'))
    // }
  },
}

io.on("connection", () => {
  console.log('got connection')
})

app.use(cors(corsOptions))
app.use(bodyParser.json())

const client = new Client({
  user: "postgres",
  password: process.env.PG_PASS,
  database: "postgres",
  host: process.env.DB,
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
    case "moderator":
      return (req, res, next) => {
        if (req.user.scopes.includes("moderator")) {
          next()
        } else {
          return res.status(403).send("Forbidden")
        }
      }
    case "admin":
      return (req, res, next) => {
        if (req.user.scopes.includes("admin")) {
          next()
        } else {
          return res.status(403).send("Forbidden")
        }
      }
  }
}

app.get("/user/scopes", authenticate, (req, res) => {
  res.send(req.user.scopes)
})

app.post("/login", async (req, res) => {

  const token = req.body.token;
  try {
    res.send({ token: await getUserByLoginToken(token, client) })

  } catch (err) {
    res.status(401).send("Unathenticated")
  }

});

app.get("/chat", authenticate, authorization("read_chat"), async (req, res) => {

  let before = req.body.before !== undefined ? new Date(req.body.before) : new Date()
  if (before == "Invalid Date") {
    return res.status(400).send("Bad request")
  }
  res.send(await getMessagesBefore(client, before, req.user))
})

app.get("/chat/after", authenticate, authorization("read_chat"), async (req, res) => {

  let after = req.body.after !== undefined ? new Date(req.body.after) : new Date()
  if (after == "Invalid Date") {
    return res.status(400).send("Bad request")
  }
  res.send(await getMessagesAfter(client, after))
})

app.post("/chat", authenticate, authorization("write_chat"), async (req, res) => {
  if (!req.body.message) {
    return res.status(400).send('Bad request')
  }

  const message = req.body.message
  const result = await insertMessage(req.user, message, client)
  io.emit("chat", await getChatById(client, result.id, req.user.userId))
  res.send(result)

})

app.put("/chat/mod", authenticate, authorization("moderator"), async (req, res) => {
  if (req.body.userId && req.body.chattable) {
    res.send(await blockUser(client, req.body.userId, req.body.chattable))
  } else {
    res.status(400).send("Bad request")
  }
})

app.put("/chat/message/hide", authenticate, authorization("moderator"), async (req, res) => {
  if (req.body.chatId) {
    res.send(await hideMessage(client, req.body.chatId))
  } else {
    res.status(400).send("Bad request")
  }
})

app.post("/user", authenticate, authorization("admin"), async (req, res) => {
  if (req.body.email && req.body.name && req.body.ticket_type && req.body.onlyChat !== undefined && req.body.extraChats !== undefined) {
    res.send(await generateTicket(client, req.body.email, req.body.name, req.body.ticket_type, req.body.onlyChat, req.body.extraChats))
  } else {
    return res.status(400).send("Bad request")
  }
})

app.get("/video", authenticate, async (req, res) => {
  res.send({
    experimental: `https://stream.jakoblj.xyz/securedstreaming.html?token=${req.user.userId}`,
    youtube: 'lOWSP-iFzF4'
  })
})

app.get("/", async (req, res) => {
  res.send("hællæ");
});

server.listen(9000, () => { });
