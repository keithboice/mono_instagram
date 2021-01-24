'use strict';


/**
 *
 * Generates random string of specified length
 * @module
 * @param len {number}
 * @returns {string}
 */
function randStr(len) {
	if (!len) return 'missing required argument';

	return Math.random().toString(36).substring(1, len) + Math.random().toString(36).substring(1, len);
}


module.exports.randStr = randStr;