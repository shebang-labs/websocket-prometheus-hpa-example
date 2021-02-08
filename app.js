var express = require('express')
var app = express()

var http = require('http').createServer(app)
var WS = require('ws')

var websocket = new WS.Server({ server: http, path: '/ws/' })

websocket.on('connection', (socket) => {
  socket.on('close', () => {
    console.log('Connection Closed!')
  })

  socket.on('message'), (data) => {
    console.log('Message Recieved!')
  })
})


var Prometheus = require("prometheus-client")
var client = new Prometheus()

setInterval(() => {
  client.newGauge({
    namespace: “myapp”,
    name: "websockets_connections_total",
    help: "The number of active websockets connections."
  }).set({ period: "1sec" }, websocket.clients.size)
}, 1000)

// Expose websockets_connections_total prometheus metric on port 9095
client.listen(9095)
