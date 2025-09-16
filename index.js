import axios from 'axios';
import delay from 'delay';
import chalk from 'chalk';
import fs from 'fs';

// mendapatkan list guild yang telah kita join
const getMe = (token) => new Promise((resolve, reject) => {
    try {
        axios.get('https://discord.com/api/v9/users/@me', {
            headers: {
                'Authorization': `${token}`
            }
        })
        .then(res => res.data)
        .then(res => resolve(res))
        .catch(err => reject(err.message))
    } catch (err) {
        console.log("Error to getMe")
    }
});


// mendapatkan list guild yang telah kita join
const getGuilds = (token) => new Promise((resolve, reject) => {
    try {
        axios.get('https://discord.com/api/v9/users/@me/guilds', {
            headers: {
                'Authorization': `${token}`
            }
        })
        .then(res => res.data)
        .then(res => resolve(res))
        .catch(err => reject(err))
    } catch (err) {
        console.log("Error to getData")
    }
});

// keluar dari guild yang telah kita join
const leaveGuild = (token, id) => new Promise((resolve, reject) => {
    try {
        axios.delete(`https://discord.com/api/v9/users/@me/guilds/${id}`, {
            headers: {
                'Authorization': `${token}`
            }
        })
        .then(res => res.data)
        .then(res => resolve(res))
        .catch(err => reject(err))
    } catch (err) {
        console.log("Error to leaveGuild")
    }
});

(async () => {
    try {
        // read accessToken.txt
        const data = fs.readFileSync('accessToken.txt', 'utf-8');
        const accessTokens = data.split('\n')

        for (const accessToken of accessTokens) {
            if (accessToken != "") {
                // get me
                const me = await getMe(accessToken)
                console.log(`🤖 Username: ${chalk.green(me.username)}`)

                // getlist guild
                const guilds = await getGuilds(accessToken);

                if (fs.existsSync('guildExcepts.txt')) {
                    // read guildExcepts.txt
                    const guilde = fs.readFileSync('guildExcepts.txt', 'utf-8');
                    const guildexcepts = guilde.split('\n')

                    for (const guild of guilds) {
                        const nameguild = guild.name
                        const idguild = guild.id
                        let isAvailable = false
                        
                        // check except guild
                        for (const guildex of guildexcepts) {
                            if (Number(idguild) == Number(guildex)) {
                                console.log(`[!] Tidak keluar dari guild dengan id ${chalk.yellow(idguild)} - ${chalk.green(nameguild)} (termasuk pengecualian)`)
                                isAvailable = true;
                                break;
                            }
                        }
                
                        if (isAvailable == false) {
                            console.log(`[>] Mulai untuk keluar dari guild dengan id ${chalk.yellow(idguild)} - ${chalk.green(nameguild)}`)
                            await delay(1000)
                            await leaveGuild(accessToken, idguild)
                        }
                    }
                    console.log('')
                } else {
                    for (const guild of guilds) {
                        const nameguild = guild.name
                        const idguild = guild.id

                        console.log(`[>] Mulai untuk keluar dari guild ${chalk.yellow(nameguild)}`)
                        await delay(1000)
                        await leaveGuild(accessToken, idguild)
                    }
                    console.log('')
                }
            }
        }

    } catch (e) {
        // jika accessToken.txt not exist
        if (e.code == 'ENOENT') {
            console.log('📝 Fill the accessToken.txt first!');
            fs.writeFileSync('accessToken.txt', "accessToken1\naccessToken2\netc...")
            process.exit()
        } else {
            throw e
        }
    }
})();

