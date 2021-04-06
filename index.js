const rbx = require('noblox.js');
const fetch = require('node-fetch');
const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('Hey');
});
server.listen(process.env.PORT);

const cookie = process.env.COOKIE

async function startBot() {
    await rbx.setCookie(cookie)
    rbx.onFriendRequest().on('data', function(data) {
        console.log('Accepted Friend Request!', data)
        rbx.acceptFriendRequest(data)
    });
    rbx.onNewMessage().on('data', async function(data) {
        console.log('New message!', data)
        const messages = await rbx.getChatMessages(data, 1, 1)
        console.log(messages[0].content)
        fetch(process.env.API + messages[0].content)
        .then(res => res.json())
        .then(json => {
            rbx.sendChatMessage(data, json.cnt)
        });
    });
}

startBot()
