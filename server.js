const express = require('express');
const http = require('http');

const app = express();
const port = parseInt((process.env.PORT || 1337), 10);
const Player = require('./Player');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/', (req, res) => {
  const { action, game_state } = req.body;

  switch (action) {
    case 'version':
      res.send(Player.VERSION);
      break;
    case 'bet_request':
      Player.betRequest(JSON.parse(game_state), function(bet) {
        res.json(bet);
      });
      break;
    case 'showdown':
      Player.showdown(JSON.parse(game_state));
      res.send('Ok');
      break;
    case 'check':
      res.send('Ok');
      break;
    default:
      res.send('Unknown action');
  }
});

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server listening at: localhost:${port}`);
});
