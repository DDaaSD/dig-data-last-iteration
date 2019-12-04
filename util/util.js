var cryptoReference = require('crypto');
// AES-256
// SHA-256

//var sha256 = cryptoReference.createHash("sha256");
//console.log("TEST HASH");
//console.log(sha256);
//console.log("=========");

//sha256.update('Hello World');
//console.log(sha256.digest('hex'));

// sha256.update(' My new world');
// console.log(sha256.digest('hex'));

var CryptoService = {};

var buildHash = function(algorith, str) {

    var hashInstance = cryptoReference.createHash(algorith);
    hashInstance.update(str);
    return hashInstance.digest('hex');
};

CryptoService.sha256 = function(str) {
    return buildHash("sha256", str);
};


var GeneratorService = {};

GeneratorService.blockId = function() {

    var getTimestamp = (new Date()).getTime() + 'BC';
    return CryptoService.sha256(getTimestamp);
};

module.exports = {
    encryptWith      : CryptoService,
    decryptWhih      : CryptoService,
    generate         : GeneratorService
}