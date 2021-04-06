const rbx = require('noblox.js');
const fetch = require('node-fetch');

const cookie = '_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_FEE741AD8589E99174262BC930AF01006DB84DF9D6AAD68B7ED8FA9239E2534C0BE54C25861839DDFC0256F911F070DE7E4326CF39FDBBF4F0DDDB3696053332EF2033F9B37BEE28B70B31E1AD13FE4B8492CF82DC06162727D431DBBDC0AFB84F9AE8E4B3F2BFF88D2022D462D643A5FEA42EDB02B3D5B50FA160BA1E351644E8377B1BBB1BF6F3A7B8BC62BEBA641665B1B451C36AE7DE0AD2A2B0EF788F1962D803F8FE976772DEE2F226AEBADFA9C3EACA12F6A47C6DBD1CDA45904D3F602C868C245FB9A76AF1CE58977593082CC7949C7D185AA67743BB7ABB372722FBCACE5A005109B795B2371D7A8636FB2BE4D310B0EB58790A0DA804208794303D861DBD2F3105C294DD8A97AD067353D6F971E47DC4BFF7BDE84E0BF5BCDB144A060F23C415166506DED685198BEBD070CC7FA67F30124652DD5EAEC5755EA22B132FA39C'

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
        fetch('http://api.brainshop.ai/get?bid=155557&key=VHfgJaXQRXhnnQYs&uid=155557&msg=' + messages[0].content)
        .then(res => res.json())
        .then(json => {
            rbx.sendChatMessage(data, json.cnt)
        });
    });
}

startBot()
