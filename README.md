# Multiplayer Tic Tac Toe! 
Welcome to my multiplayer tic tac toe game, built using React and Socket.io!

## How to load the web app
- We will use yarn to install certain packages. 
- If you do not have yarn installed, download it [here](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)
### 1. Setting up the server
- `cd` into the server directory: `cd server`
- Run the command `yarn init` to download the relevant dependencies
- Run the command `yarn start` to run the server locally
### 2. Setting up the frontend
- `cd` into the client directory: `cd tictactoe`
- Run the command `yarn install` to download the relevant dependencies
- Run the command `yarn start` to run the client


## Creating a game session and playing with friends!
- Enter a room number to play in (both players have to be in the same room)
- Click the "Join Room" button 
- Click empty squares to mark them (alternatively, use the tab key to select squares)
- Click the "Play Again" button if you wish to rematch!

## Tech stack and API
- Frontend is built by React
- Server is built using the Socket.io API

## Summary on design decisions
- Given the context of creating a game that is accessible to user with sensory impairments, I wanted to create an app that focused on accessibility rather than graphics or animations. The rationale for the rather plain UI is because I wanted the app to have less "noise", so that external tools such as Screen Readers would be able to give visually-impaired users more accurate information.
- Additionally, other concerns I had were users being unable to use the mouse effectively. I wanted the game to be playable with the keyboard alone.
- Given more time, I would love to explore speech-to-text APIs to allow users who are unable to use a keyboard or mouse to use my app as well

## Architecture diagram
- The app follows a client-server architecture style.
<img src="https://user-images.githubusercontent.com/80802319/218538496-9a1a25c6-e365-4078-9a48-13bef8499321.jpeg" width = "20%" height = "20%">

