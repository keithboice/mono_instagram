'use strict';


import pkg from 'instagram-private-api';
import pub from './pub.cjs';


const { IgApiClient } = pkg;
const ig = new IgApiClient();



/**
 *
 * @function
 *
 * @example
 *
 *      getMessages('keithboicetest', 'somepassword').then(response => console.log(response));
 *
 * @returns {Promise<string>} - An array containing Instagram message objects
 * @see https://github.com/dilame/instagram-private-api
 * @author Keith Boice
 *
 */
async function getMessages() {

	return new Promise(async (resolve, reject) => {

		console.log('generating device');
		ig.state.generateDevice(pub.conf.IG_USERNAME);
		console.log('generating proxyUrl');
		ig.state.proxyUrl = await pub.lib.proxyUrlLuminati(pub.conf.PROXY_USERNAME, pub.conf.PROXY_PASSWORD, pub.conf.PROXY_PORT);

		//console.log('simulating preLoginFlow');
		//await ig.simulate.preLoginFlow ();
		console.log('logging in');
		const loggedInUser = await ig.account.login(pub.conf.IG_USERNAME, pub.conf.IG_PASSWORD);
		console.log('loggedInUser: ' + loggedInUser);
		//process.nextTick(async () => await ig.simulate.postLoginFlow());

		/**
		 *
		 * @type {Promise<UserFeedResponseItemsItem[]>}
		 */
		const userFeed = ig.feed.user(loggedInUser.pk).items();
		console.log(JSON.stringify(userFeed));

		/**
		 *
		 * @type {DirectInboxFeedResponseThreadsItem[]}
		 */
		const dmFeed = await ig.feed.directInbox().items();
		console.log(JSON.stringify(dmFeed));

		await parseMessages(dmFeed).then((response) => {
			return response
				? resolve(response)
				: reject({ error: 'missing required argument' });
		});
	});
}



/**
 *
 * @param messages
 * @returns {Promise<unknown>}
 */
function parseMessages(messages) {
	return new Promise(async (resolve) => {
		let response = [];

		await messages.forEach((message) => {

			const match = pub.lib.extractStr(message.last_permanent_item.text, pub.conf.VERIFY_CODE_PATTERN);

			if (match)
					response.push({
						isMatch: true,
						thread: message.thread_v2_id,
						with: message.thread_title,
						initiator: message.inviter.username,
						body: message.last_permanent_item.text,
			});

		});

		return resolve(response);
	});
}


getMessages().then((r) => console.table(r)).catch(err => console.error(err));

//module.exports.igPrivateApi = igPrivateApi;
