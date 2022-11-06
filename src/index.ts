import 'dotenv/config';
import { Client, Events, GatewayIntentBits } from 'discord.js';
import { MINUTE } from './vars';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const env = process.env;

client.once(Events.ClientReady, (c) => {
	console.log(`Ready! Logged in as ${c.user.tag}`);

	// setInterval(callback, MINUTE)
});

client.login(env.BOT_TOKEN);
