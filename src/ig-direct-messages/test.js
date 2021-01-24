'use strict';


import pkg from 'instagram-private-api';
import pub from './pub.cjs';


const { IgApiClient } = pkg;
const ig = new IgApiClient();


// Device id must be generated before each login.
ig.state.generateDevice(pub.lib.randStr(15));
console.log('generateDevice');

// Setup proxy url
const proxyUrl = pub.lib.proxyUrlLuminati(pub.conf.PROXY_USERNAME, pub.conf.PROXY_PASSWORD, pub.conf.PROXY_PORT);
console.log('proxyUrl is: ' + proxyUrl);
ig.state.proxyUrl = proxyUrl;
console.log('setup proxyUrl');

(async () => {

	// Execute all requests prior to authorization in the real Android application
	// Not required but recommended
	await ig.simulate.preLoginFlow();
	console.log('preLoginFlow');

	const loggedInUser = await ig.account.login(pub.conf.IG_USERNAME, pub.conf.IG_PASSWORD);
	console.log('loggedInUser');

	// The same as preLoginFlow()
	// Optionally wrap it to process.nextTick so we dont need to wait ending of this bunch of requests
	process.nextTick(async () => await ig.simulate.postLoginFlow());
	console.log('postLoginFlow');

	// Create UserFeed instance to get loggedInUser's posts
	const userFeed = ig.feed.user(loggedInUser.pk);
	console.log('userFeed');

	const myPostsFirstPage = await userFeed.items();
	console.table(myPostsFirstPage)

})();
