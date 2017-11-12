# hex

[![Build Status](https://travis-ci.org/tomasz-chojna/hex.svg?branch=develop)](https://travis-ci.org/tomasz-chojna/hex)
[![Coverage Status](https://coveralls.io/repos/github/tomasz-chojna/hex/badge.svg?branch=develop)](https://coveralls.io/github/tomasz-chojna/hex?branch=develop)

[Hex](https://en.wikipedia.org/wiki/Hex_(board_game)) is a board game for 2 players. In order to to win, one of the players has to connect opposite sides of the board with unbroken chain. Every player can ocupy single free hexagon on the board during the move.

Technically, solving for a winner requires finding a path between the opposite sides of the board, which is implemented here as traversing a graph consisting of hexagons (nodes) linked to each other through their edges. [Breadth-first search](https://en.wikipedia.org/wiki/Breadth-first_search) graph traversal algorithm is used. See [here](/).


![Board graph](/designs/winner_algorithm.png)

## Backend

GraphQL API (with GraphQL Subscriptions for Websockets handling) is implemented using Node.js and Express framework.

Data about players and game sessions is stored in PostgreSQL database.

This implementation assumes single game server, although it could be extended to use a different Pub/Sub mechanism (Redis Pub/Sub for example) to scale to more instances.

## Frontend

Frontend of the game is built as a Single Page Application using Facebook's React.

The following views can be presented in the app:

- Homepage with Login (including fb login)

![Homepage](/designs/homepage.png)

- Registration (regular registration with email)
- Fb login account creation confirmation (setting up a profile)
- Online players view
- Game invitation
- Invitations list
- Game board
- Winner popup
- Scoreboard



## Development environment

Application is dockerized and `docker-compose.yml` file is included, so it can be launched with a single command:

	docker-compose up
	

By default the application will listen on `http://localhost:5000/`.


| Environment variables   |
|-------------------------|
| FACEBOOK\_APP\_ID       |
| FACEBOOK\_APP\_SECRET   |
| DATABASE\_HOST          |
| DATABASE\_USER          |
| DATABASE\_PASSWORD      |
| DATABASE\_NAME          |
| PORT                    |
