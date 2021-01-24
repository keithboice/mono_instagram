#!/usr/bin/env node
import request from 'request-promise';


const username = 'lum-customer-hl_173732b6-zone-social_networks-route_err-pass_dyn';
const password = 'cbahznaze0cp';
const port = 22225;
const user_agent = 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36';
const session_id = (1000000 * Math.random ()) | 0;
const super_proxy = 'http://' + username + '-unblocker-session-' + session_id + ':' + password + '@zproxy.lum-superproxy.io:' + port;
const options = {
	url: 'https://instagram.com/keithboicetest/?__a=1',
	proxy: super_proxy,
	rejectUnauthorized: false,
	headers: { 'User-Agent': user_agent }
};

console.log('Performing request');

request(options)
	.then(function(data){ console.log(data); }, function(err){ console.error(err); });