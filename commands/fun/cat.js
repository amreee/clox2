 const { RichEmbed } = require("discord.js");
const randomPuppy = require("random-puppy");
const fetch = require('node-fetch');
const snekfetch = require('snekfetch')

module.exports = {
  name: "cat",
  aliases: ["meow"],
  category: "fun",
  description: "This command gives you a random cat photos",
  usage: "[command | alias]",
  run: async (client, message, args) => {


     try {
			const { body, headers } = await snekfetch
				.get('http://thecatapi.com/api/images/get')
				.query({ api_key: 'APIKEY' });
			const format = headers['content-type'].replace(/image\//i, '');
			return message.channel.send({ files: [{ attachment: body, name: `cat.${format}` }] });
		} catch (err) {
			return message.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
  }}