# bot-auto-leave-discord-channel

<img width="653" height="194" alt="Screenshot_123" src="https://github.com/user-attachments/assets/6c55ad52-4d79-4f75-914f-5e877ed28921" />

# Features
- Auto leave discord bulk accounts
- Discord channel exception

# Requirement
- VS Code
- Node.js or bun

# How to get token
- Open discord
- Inspect Element (F12)
- Go to Network -> Fetch/XHR -> select one on the list and copy value of Authorization start with "O" for discord

# How to run
- Open VS Code
- Open terminal
- Command:
  > npm install

  > node index
- Fill accessToken.txt format e.g. Oxxxxxxxx (1 acc each line)
- Fill guildExcepts.txt with discord id channel (1 id each line)
- Run command above
