const { MessageEmbed } = require("discord.js")
const { getVoteMulti } = require("../economy/utils.js")

const cooldown = new Map()

module.exports = {
    name: "vote",
    description: "vote every 12 hours to get a 10% bonus on gambling wins",
    category: "money",
    run: async (message, args) => {

        if (cooldown.has(message.member.id)) {
            const init = cooldown.get(message.member.id)
            const curr = new Date()
            const diff = Math.round((curr - init) / 1000)
            const time = 10 - diff

            const minutes = Math.floor(time / 60)
            const seconds = time - minutes * 60

            let remaining

            if (minutes != 0) {
                remaining = `${minutes}m${seconds}s`
            } else {
                remaining = `${seconds}s`
            }
            return message.channel.send("❌ still on cooldown for " + remaining );
        }

        cooldown.set(message.member.id, new Date());

        setTimeout(() => {
            cooldown.delete(message.member.id);
        }, 10000);

        const voted = await getVoteMulti(message.member) > 0

        const embed = new MessageEmbed()
        embed.setURL("https://top.gg/bot/678711738845102087/vote")
        embed.setDescription("https://top.gg/bot/678711738845102087/vote")
        embed.setFooter("bot.tekoh.wtf")

        if (voted) {
            embed.setTitle("vote ✅ | " + message.member.user.username)
            embed.setColor("#5efb8f")
            embed.addField("status", "you currently have a 20% bonus on all gambling wins")
        } else {
            embed.setTitle("vote ❌ | " + message.member.user.username)
            embed.setColor("#e4334f")
            embed.addField("status", "by voting you can gain a 20% bonus on all gambling wins")
        }

        message.channel.send(embed).catch(() => {
            return message.channel.send("❌ i may be lacking permission: 'EMBED_LINKS'");
        })

    }
}