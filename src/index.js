'use strict';

import pkg from 'instagram-private-api';


const { IgApiClient } = pkg;
const ig = new IgApiClient();

/**
 *
 * Basic login-procedure
 * @returns {Promise<void>}
 *
 */
async function login(username, password, proxy) {
	ig.state.generateDevice(username);
	//ig.state.proxyUrl = proxy;
	await ig.simulate.preLoginFlow ();
	await ig.account.login(username, password);
}


/**
 *
 * @function
 *
 * @example
 *
 *      getMessages('keithboicetest', 'somepassword').then(response => console.log(response));
 *
 * @param username
 * @param password
 * @param proxy
 * @returns {Promise<string>} - An array containing Instagram message objects
 * @see https://github.com/dilame/instagram-private-api
 * @author Keith Boice
 *
 */
async function getMessages(username, password, proxy) {
	return new Promise(async (resolve, reject) => {

		await login(username, password, proxy);

		const dmFeed = await ig.feed.directInbox().records();

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
 *
 */
function parseMessages(messages) {
	return new Promise(async (resolve, reject) => {
		let response = [];

		await messages.forEach((message) => {
			checkVerifyCode(message.last_permanent_item.text).then((match) => {
				if (match)
					response.push({
						isMatch: true,
						thread: message.thread_v2_id,
						with: message.thread_title,
						initiator: message.inviter.username,
						body: message.last_permanent_item.text,
					});
			});
		});

		return resolve(response);
	});
}

/**
 *
 * @param body
 * @returns {Promise<unknown>} - Promise with an array containing all of the matches, or null if no match is found
 *
 */
function checkVerifyCode(body) {
	return new Promise((resolve, reject) => {
		const exp = /^[A-Z0-9]{6}$/;
		console.log('match results: ' + body.match(exp));
		return resolve(body.match(exp));
	});
}

getMessages('keithboicetest', 'J0hnnyC@sh.23').then((r) => console.table(r));

//module.exports.igPrivateApi = igPrivateApi;
