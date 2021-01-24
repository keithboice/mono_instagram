'use strict';


/**
 *
 * Extracts substring based on regex pattern
 * @param {string} body
 * @param {string} pattern
 * @returns {boolean}
 */
function extractStr(body, pattern) {
	if (!body || !pattern) return false;

	const exp = new RegExp(pattern); // ex: 'ABC123';

	return Boolean(body.match(exp));
}


module.exports.extractStr = extractStr;