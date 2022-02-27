const express = require('express')

const app = express()
const PORT = 3000

app.use(express.static(__dirname + '/index.html'))

app.get('/login', (req, res) => {
  console.log('/login', __dirname + '/pages/login/index.html')
  res.sendFile(__dirname + '/pages/login/index.html')
})

// app.get('/*', (req, res) => {
//   res.sendFile(__dirname + '/pages/login/index.html')
// })


app.listen(PORT, () => {
  console.log(`Мой текст и порт: ${PORT}!`)
});

