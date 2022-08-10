const { Client, RichEmbed } = require("discord.js");
var { Util } = require("discord.js");
const client = new Client({ disableEveryone: true });
const canvas = require("canvas");
const convert = require("hh-mm-ss");
const fetchVideoInfo = require("youtube-info");
const botversion = require("./package.json").version;
const simpleytapi = require("simple-youtube-api");
const moment = require("moment");
const fs = require("fs");
const util = require("util");
const gif = require("gif-search");
const opus = require("node-opus");
const ms = require("ms");
const jimp = require("jimp");
const { get } = require("snekfetch");
const guild = require("guild");
const dateFormat = require("dateformat");
const YouTube = require("simple-youtube-api");
const youtube = new YouTube("AIzaSyAXaeBh837k38o_lwSADet8UTO7X21DGsY"); //تعديل اساسي سوي اي بي اي جديد
const hastebins = require("hastebin-gen");
const getYoutubeID = require("get-youtube-id");
const yt_api_key = "AIzaSyAXaeBh837k38o_lwSADet8UTO7X21DGsY"; ///تعديل اساسي سوي اي بي اي جديد
const pretty = require("pretty-ms");
client.login(process.env.TOKEN);
const queue = new Map();
var table = require("table").table;
const prefix = "";
const Discord = require("discord.js");
const SQLite = require("sqlite"); // SQLpackage
const path = require("path"); // PATHpackage
const invites = {}; // Codes


//// كود فتح واغلاق الروم
client.on("message", message => {
    if (message.content === "اقفل") {
      if (!message.channel.guild)
        return;
  
      if (!message.member.hasPermission("MANAGE_MESSAGES"))
        return message.reply("شششش");
      message.channel
        .overwritePermissions(message.guild.id, {
          SEND_MESSAGES: false
        })
        .then(() => {
          message.reply("Chat locked :lock:");
        });
    }
    if (message.content === "افتح") {
      if (!message.channel.guild)
        return;
  
      if (!message.member.hasPermission("MANAGE_MESSAGES"))
        return message.reply("شششششششش");
      message.channel
        .overwritePermissions(message.guild.id, {
          SEND_MESSAGES: true
        })
        .then(() => {
          message.reply("Chat opened, :unlock:");
        });
    }
  });



  
const { Canvas } = require("canvas-constructor");
const { Attachment } = require("discord.js");
const { resolve, join } = require("path");
const fetch = require("node-fetch");
const prettySeconds = require("pretty-seconds");
const fsn = require("fs-nextra");

const welcome = JSON.parse(fs.readFileSync("./welcomer.json", "utf8")); //ملف تخزين كود الويلكم

//كود الويلكم

client.on("guildMemberAdd", async member => {
  if (!welcome) return;
  if (!welcome[member.guild.id]) return;
  var findingWlcChannel = welcome[member.guild.id]
    ? welcome[member.guild.id].channel
    : "null";
  const channel = await member.guild.channels.find(
    r => r.name == findingWlcChannel
  );
  if (!channel) return;
  if (channel) {
    const imageUrlRegex = /\?size=2048$/g; ///تعديل غير اساسي
    const wlcImage = await fsn.readFile("./wlc-img.png"); //اسم الصورة
    let result = await fetch(
      member.user.displayAvatarURL.replace(imageUrlRegex, "?size=128")
    );
    if (!result.ok) throw new Error("Failed to get the avatar!");
    let avatar = await result.buffer();

    let name =
      member.user.username.length > 6
        ? member.user.username.substring(0, 6) + ".."
        : member.user.username;

    // تعديل غير اساسي : هنا خيارات الصورة لو تبى تغيرها

    //Welcome Image (background)
    var imageWidth = 500; //عرض الصورة
    var imageHeight = 250; //ارتفاع الصورة

    //Avatar
    var imageX = 115; //X coordinate
    var imageY = 153; //Y coordinate
    var imageRadius = 85.5; //نصف قطر الصورة الدائرية

    //Member Name
    var nameSize = "16.5pt"; //حجم خط الاسم
    var nameKind = "Source Sans Pro (OT1)"; //نوع خط الاسم
    var nameColor = "#ffffff";

    //Name Position
    var nameX = 260; //position x
    var nameY = 155; //position y

    let buffer = await new Canvas(500, 300)
        .addImage(wlcImage, 0, 0, imageWidth, imageHeight)
      .addCircularImage(avatar, imageX, imageY, imageRadius)
      .setTextAlign("center")
      .setTextFont(`${nameSize} ${nameKind}`)
      .setColor(nameColor)
      .addText(name, nameX, nameY)
      .toBuffer();
    const filename = `tahaWELCOMER${member.id}.jpg`;
    const attachment = new Attachment(buffer, filename);
    await channel.send(attachment);
  }
});

//تحديد روم الويلكم
const wait = require("util").promisify(setTimeout);
client.on("ready", async () => {
  wait(1000);

  await client.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});
var gg2;

client.on("guildMemberAdd", async member => {
  if (!welcome[member.guild.id])
    welcome[member.guild.id] = {
      by: "Off",
      channel: null
    };

  if (welcome[member.guild.id].by === "Off") return;
  let channel = member.guild.channels.find(
    c => c.name == welcome[member.guild.id].channel
  );
  if (!channel) return;

  await member.guild.fetchInvites().then(async guildInvites => {
    const ei = await invites[member.guild.id];
    invites[member.guild.id] = guildInvites;
    const invite = await guildInvites.find(i => ei.get(i.code).uses < i.uses);
    const inviter1 = await invite.inviter;
    const inviter =
      (await client.users.get(invite.inviter.id)) ||
      client.users.get(member.guild.owner.user.id);
    const logChannel = member.guild.channels.find(
      channel => channel.name === `${welcome[member.guild.id].channel}`
    );
    if (!logChannel) return console.log("I can't find welcomeChannel");
    let gg1 = await welcome[member.guild.id].msg.replace(
      "[member]",
      `<@!${member.id}>`
    );
    if (!inviter1 || !inviter1.id) {
      gg2 = await gg1.replace("[inviter]", `<@${member.guild.ownerID}>`);
    } else {
      gg2 = await gg1.replace("[inviter]", `<@${inviter1.id}>`);
    }
    setTimeout(() => {
      logChannel.send(`${gg2}`);
    }, 2000);
    fs.writeFile("./welcome.json", JSON.stringify(welcome), err => {
      if (err)
        console.error(err).catch(err => {
          console.error(err);
        });
    });
  });
});
client.on("message", async message => {
  if (!message.channel.guild) return;
  let room = message.content.split(" ").slice(1);
  let findroom = message.guild.channels.find(r => r.name == room);
  if (message.content.startsWith(prefix + "setWelcomer")) {
    if (!welcome[message.guild.id]) {
      if (!message.channel.guild)
        return;
      if (!message.member.hasPermission("MANAGE_GUILD"))
        return;
      if (!room) return message.channel.send("Type The Channel Name");
      if (!findroom) return message.channel.send("Cant Find This Channel");
      let embed = new Discord.RichEmbed()
        .setTitle("**Done The Welcome Has Been Setup**")
        .addField("Channel:", `${room}`)
        .addField("By:", `${message.author}`)
        .addField(
          "Default Message:",
          `**Welcome [member], You Joined by [inviter] invite**`
        )
        .setThumbnail(message.author.avatarURL)
        .setFooter(`${client.user.username}`);
      message.channel.sendEmbed(embed);
      welcome[message.guild.id] = {
        channel: room,
        onoff: "On",
        by: "On",
        msg: `**Welcome [member], You Joined by [inviter] invite**`
      };
      fs.writeFile("./welcomer.json", JSON.stringify(welcome), err => {
        if (err) console.error(err);
      });
    } else if (welcome[message.guild.id].channel) {
      let msg = await welcome[message.guild.id].msg;
      let by = await welcome[message.guild.id].by;
      if (!message.channel.guild)
        return;
      if (!message.member.hasPermission("MANAGE_GUILD"))
        return message.channel.send(
          "Sorry But You Dont Have Permission `MANAGE_GUILD`"
        );
      if (!room) return message.channel.send("Please Type The Channel Name");
      if (!findroom) return message.channel.send("Cant Find This Channel");
      let embed = new Discord.RichEmbed()
        .setTitle("**Done The Welcome Has Been Setup**")
        .addField("Channel:", `${room}`)
        .addField("Requested By:", `${message.author}`)
        .addField("Default Message:", msg)
        .setThumbnail(message.author.avatarURL)
        .setFooter(`${client.user.username}`);
      message.channel.sendEmbed(embed);
      welcome[message.guild.id] = {
        channel: room,
        onoff: "On",
        by: by,
        msg: msg
      };
      fs.writeFile("./welcomer.json", JSON.stringify(welcome), err => {
        if (err) console.error(err);
      });
    }
  }
});

client.on("message", async message => {
  let messageArray = message.content.split(" ");
  if (message.content.startsWith(prefix + "setmessage")) {
    if (!welcome[message.guild.id] || !welcome[message.guild.id].onoff == "On")
      return message.channel.send(
        `**please type \`${prefix}setWelcomer\` first **`
      );
    let filter = m => m.author.id === message.author.id;
    let thisMessage;
    let thisFalse;
    let room = welcome[message.guild.id].channel;
    if (!message.member.hasPermission("MANAGE_GUILD"))
      return message.channel.send("You don't have permission").then(msg => {
        msg.delete(4500);
        message.delete(4500);
      });

    message.channel
      .send(
        `
        Type a welcome message
        example; Hey [member] invited by [inviter]
        `
      )
      .then(msg => {
        message.channel
          .awaitMessages(filter, {
            max: 1,
            time: 90000,
            errors: ["time"]
          })
          .then(collected => {
            collected.first().delete();
            thisMessage = collected.first().content;
            msg.edit("Done").then(msg => {
              let embed = new Discord.RichEmbed()
                .setTitle("**Done The Welcome Msg Has Been Setup**")
                .addField("Message:", `${thisMessage}`)
                .setThumbnail(message.author.avatarURL)
                .setFooter(`${client.user.username}`);
              message.channel.sendEmbed(embed);
              welcome[message.guild.id] = {
                channel: room,
                onoff: "On",
                by: "On",
                msg: thisMessage
              };
              fs.writeFile("./welcomer.json", JSON.stringify(welcome), err => {
                if (err) console.error(err);
              });
            });
          });
      });
  }
});


client.on("message", message => {
    if (message.author.codes) return;
    if (!message.content.startsWith(prefix)) return;
  
    var command = message.content.split(" ")[0];
    command = command.slice(prefix.length);
  
    var args = message.content.split(" ").slice(1);
  
    if (message.content.startsWith(prefix + "كيك")) {
      if (!message.guild.member(message.author).hasPermission("KICK_MEMBERS"))
        return message.channel.send(``);
      if (!message.guild.member(client.user).hasPermission("KICK_MEMBERS"))
        return message.reply(
          "  I couldn't kick that user, Please Check me role and permissions Then try again,"
        );
      let user = message.mentions.users.first();
  
          if(!user) return message.reply(`Mention a user`);
       if(user.id === message.author.id) return message.reply(' You cannot kick yourself out .');
        if(message.guild.member(user).highestRole.position >= message.guild.member(message.member).highestRole.position) return message.channel.send(`:no_mouth: **You cannot kick this user because he has a higher role .**`); 
  
      if (!message.guild.member(user).bannable)
        return message.reply(
          "I couldn't kick that user, Please Check me role and permissions Then try again"
        );
  
      message.guild.member(user).kick(7, user);
  
      message.channel.send(
        `** \`${user.username}\` was kicked,** :airplane: `
      );
      
    }
  });



  
client.on("message", message => {
    if (message.author.codes) return;
    if (!message.content.startsWith(prefix)) return;
  
    let command = message.content.split(" ")[0];
    command = command.slice(prefix.length);
  
    let args = message.content.split(" ").slice(1);
  
    if (message.content.startsWith(prefix + "بان")) {
      if (!message.guild.member(message.author).hasPermission("BAN_MEMBERS"))
        return message.channel.send(``);
      if (!message.guild.member(client.user).hasPermission("BAN_MEMBERS"))
        return message.reply(
          " I couldn't ban that user, Please Check me role and permissions Then try again"
        );
      let user = message.mentions.users.first();
       if(!user) return message.reply(`Mention a user`);
        if(user.id === message.author.id) return message.reply(' You cannot banned yourself  .');
         if(message.guild.member(user).highestRole.position >= message.guild.member(message.member).highestRole.position) return message.channel.send(`:no_mouth: **You cannot banned this user because he has a higher role .**`);    
          if (!message.guild.member(user).bannable)
           return message.reply(
            "  I couldn't ban that user, Please Check me role and permissions Then try again"
        );
            message.guild.member(user).ban(7, user);
  
             message.channel.send(
        `** \`${user.username}\` was banned,** :airplane: `
      );
    }
  });
  client.on('message', message => {
    if(message.content.includes("discord.gg/")) {
     if(message.channel.type === "dm") return;
      if(message.member.hasPermission('ADMINISTRATOR')) return console.log(` >> Someone admin has putting a link on channel! <<`);
        message.delete()
    //  console.log(' >> Message delete and a reason is: member has shared a server link <<')
    }
});
