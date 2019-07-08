# Battleship Commander
This project is an assignment of a turn-based game we need to design within a week by [Pedro Abel Díaz Sánchez](https://github.com/coderHook) and [Billy Vlachos](http://github.com/lakylekidd).

## Description
Battleship commander is guessing game for two players. It is played on ruled grids on which each player's fleet of ships (including battleshipts) are marked. The locations of the fleets are concealed from the other player. Players alternate turns calling "shots" at the other player's ships, and the objective of the game is to destroy the opposing player's fleet.

## Technologies Used
For this project we will be using the following technologies:
* PostgreSQL
* React - Redux
* Javascript

## Redux Stores
1. activeGames = A list of available games the user can join. Only games that are not full will be shown.
2. currentGame = The game the user selected. Object of Game which includes the two boards and their tiles.
3. gameState = There will be 4 different states of the game 
    * Idle: User is browsing the website (not in game)
    * InGame: User has entered a game and is preparing his board
    * Running: Both users are ready to play
    * GameOver: Win condition met. Displaying score.

## Website Routes
@root : http://mywebsite.com/
* GET @root/games : a list of available games to join
* POST @root/games : creates a new game
* POST @root/games/:id : accepts acctions from players

## File Structure
For the client we will be following the conventional React Redux file strucutre.

The API will have the following file structure:
api
|--controllers
|--helpers
|--middlewares
|--models
|--routes
app.js
config.js
db.js
server.js
