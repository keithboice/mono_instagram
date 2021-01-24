import pkg from 'instagram-private-api';


const { IgApiClient } = pkg;
const ig = new IgApiClient();

const { proxyUrl } = require('./proxyUrl');

/**
 *
 * Basic login-procedure
 * @returns {Promise<void>}
 *
 */
async function login(username, password) {
	ig.state.generateDevice(username);
	ig.state.proxyUrl = await proxyUrl();
	await ig.simulate.preLoginFlow ();
	await ig.account.login(username, password);
}


module.exports.login = login;