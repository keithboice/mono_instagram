'use strict';


const { extractStr } = require('./extractStr.cjs');
const { proxyUrlLuminati } = require('./proxyUrlLuminati.cjs');
const { randStr } = require('./randStr.cjs');


/**
 *
 * @type {{randStr: (function(number): string), extractStr: (function(string, string): boolean), proxyUrlLuminati: (function(string, string, number): string)}}
 */
module.exports.lib = {
	extractStr: extractStr,
	proxyUrlLuminati: proxyUrlLuminati,
	randStr: randStr
}


/**
 *
 * @type {{VERIFY_CODE_EXP: RegExp, PROXY_USERNAME: string, IG_PASSWORD: string, VERIFY_CODE_PATTERN: string, IG_USERNAME: string, PROXY_PORT: number, PROXY_PASSWORD: string}}
 */
module.exports.conf = {
	IG_USERNAME: 'keithboicetest',
	IG_PASSWORD: 'J0hnnyC@sh.23',
	VERIFY_CODE_EXP: /^[A-Z0-9]{6}$/,
	VERIFY_CODE_PATTERN: 'ABC123',
	PROXY_USERNAME: 'lum-customer-hl_173732b6-zone-social_networks-route_err-pass_dyn',
	PROXY_PASSWORD: 'cbahznaze0cp',
	PROXY_PORT: 22225
}