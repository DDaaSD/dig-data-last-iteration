var util = require('../util/util');

var Block = function(transaction) {
    
    this.from               = transaction.from;
    this.to                 = transaction.to;
    this.amount             = transaction.amount;

    this.blockId            = util.generate.blockId();
    this.previousBlockHash  = transaction.previousBlockHash;
    this.blockHash          = this.calculateHash();    
};

Block.prototype.calculateHash = function() {

    var blockTransactionHash =  this.from   + 
                                this.to     + 
                                this.amount + 
                                this.blockId;

    return util.encryptWith.sha256(blockTransactionHash);
};

Block.prototype.getHash = function() {
    return this.blockHash;
};

Block.prototype.getInfo = function() {

    console.log("@Block info");
    console.log("Block id :     " + this.blockId)
    console.log("Block hash :   " + this.blockHash);
    console.log("Block hash :   " + this.amount);

    return {
        blockId             : this.blockId,
        blockHash           : this.blockHash,
        previousBlockHash   : this.previousBlockHash,
        from                : this.from,
        to                  : this.to,
        amount              : this.amount
    };
};

// function call
// Block();

// function constructor call
// var b = new Block();