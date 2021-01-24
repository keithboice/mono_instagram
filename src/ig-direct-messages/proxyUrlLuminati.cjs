'use strict';


/**
 *
 * Constructs Luminati proxy url
 * @module
 * @param username {string}
 * @param password {string}
 * @param port {number}
 * @returns url {string}
 */
function proxyUrlLuminati(username, password, port) {
	if (!username || !password || !port) return 'missing required arguments';

	const session_id = (1000000 * Math.random ()) | 0;

	return 'http://' + username + '-unblocker-session-' + session_id + ':' + password + '@zproxy.lum-superproxy.io:' + port;
}


module.exports.proxyUrlLuminati = proxyUrlLuminati;