
var fs = require('fs');

var generateWallet = function() {

    return {
        id      : 'Mihail Petrov',
        amount  : 30
    };
};


var saveWallet = function(walletObject) {

    var walletStringRepresentation = JSON.stringify(walletObject);
    fs.writeFileSync('_meta/_wallet', walletStringRepresentation);
};

module.exports = {
    generateWallet  : generateWallet,
    saveWallet      : saveWallet
}

// # Valid way of writing exports
// module.exports = {
//     generateWallet  : genefunction() {

//         return {
//             id      : 'Mihail Petrov',
//             amount  : 0
//         };
//     }ateWallet,
//     saveWallet      : function(walletObject) {
//         fs.writeFileSync('_meta/_wallet', walletObject);
//     }
// }