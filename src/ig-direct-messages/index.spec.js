const expect = require('chai').expect;
const igPrivateApi = require('./index.js');

describe('igPrivateApi', function () {
	describe('igPrivateApi', function () {
		it('should accept a igObj (Json) and return a response (Json)', function () {
			igPrivateApi('Json').then((response) => {
				expect(response).to.be.a('Json');
			});
		});
	});
});
