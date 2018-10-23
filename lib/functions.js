const { youtubeLink, instaLink, twitterLink } = require('./links')

function echo(target, context, params, instance) {
	// If there's something to echo:
	if (params.length) {
		// Join the params into a string:
		const msg = params.join(' ')
		// Send it back to the correct place:
		sendMessage(target, context, msg, instance)
	} else {
		// Nothing to echo
		console.log(`* Nothing to echo`)
	}
}

function youtube(target, context, instance) {
	const channel = target.split('#')
	const msg =
		"Pour nous rejoindre sur YouTube, c'est par ici : " +
		youtubeLink[channel[1]]
	sendMessage(target, context, msg, instance)
}

function insta(target, context, instance) {
	const channel = target.split('#')
	const msg = "Les jolies photos, c'est par là : " + instaLink[channel[1]]
	sendMessage(target, context, msg, instance)
}

function twitter(target, context, instance) {
	const channel = target.split('#')
	const msg = 'Pour être au courant de tout : ' + twitterLink[channel[1]]
	sendMessage(target, context, msg, instance)
}

// Helper function to send the correct type of message:
function sendMessage(target, context, message, instance) {
	if (context['message-type'] === 'whisper') {
		instance.whisper(target, message)
	} else {
		instance.say(target, message)
	}
}

module.exports = {
    echo,
    youtube,
    insta,
    twitter,
    sendMessage
}