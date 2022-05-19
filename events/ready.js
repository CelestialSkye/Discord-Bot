const c = require('colors');

module.exports = {
    name: 'ready',
    async execute(client) {
      console.log(c.cyan('[BOT]')+` Online em ${client.user.username}#${client.user.discriminator}`)
    }
}  