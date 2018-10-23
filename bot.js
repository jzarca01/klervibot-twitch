const tmi = require('tmi.js')
const config = require('./config/config.json')
const {
	echo,
	youtube,
	twitter,
	insta,
	sendMessage
} = require('./lib/functions')

const KNOWN_COMMANDS = ['echo', 'youtube', 'insta', 'twitter']
const COMMAND_PREFIX = '!'

const client = new tmi.client({
	options: {
		debug: true
	},
	connection: {
		reconnect: true
	},
	identity: {
		username: config.username,
		password: `OAuth:${config.oauth}`
	},
	channels: config.channels
})

client.on('message', onMessageHandler)
client.on('connected', onConnectedHandler)
client.on('connected', (adress, port) => {
	console.log(
		client.getUsername() +
			" s'est connecté sur : " +
			adress +
			', port : ' +
			port
	)
})
client.on('disconnected', onDisconnectedHandler)

client.connect()

function onMessageHandler(target, context, msg, self) {
	if (self) {
		return
	} // Ignore messages from the bot

	// This isn't a command since it has no prefix:
	if (msg.substr(0, 1) !== COMMAND_PREFIX) {
		console.log(
			`[${target} (${context['message-type']})] ${context.username}: ${msg}`
		)
		return
	}

	const parsedMessage = msg.slice(1).split(' ')
	const commandName = parsedMessage[0]
	const params = parsedMessage.splice(1)

	if (KNOWN_COMMANDS.indexOf(commandName) > -1) {
		eval(commandName)(target, context, params, client)
		console.log(`* Executed ${commandName} command for ${context.username}`)
	} else {
		console.log(`* Unknown command ${commandName} from ${context.username}`)
	}
}

function onConnectedHandler(addr, port) {
	console.log(`* Connected to ${addr}:${port}`)
}

function onDisconnectedHandler(reason) {
	console.log(`Disconnected: ${reason}`)
	process.exit(1)
}
