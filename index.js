const Discord = require("discord.js")
require("dotenv").config()
const generateImage = require("./generateImage")

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS"
    ]
})

client.on("ready", ()=> {
    console.log(`Ingelogd als ${client.user.tag}`)
})

client.on("messageCreate", (message) => {
    if (message.content == "hoi"){
        message.reply("Je bent niet alleen!")
    }
})

const welcomeChannelId = "975045729687068672"

client.on("guildMemberAdd", async (member) => {
    const img = await generateImage(member)
    member.guild.channels.cache.get(welcomeChannelId).send({
        content: `<@${member.id}> Welkom in de server!`,
        files: [img]
    })
})

client.login(process.env.TOKEN)