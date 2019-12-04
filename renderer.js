var fs = require('fs');




var path = require('path'),
  fs = require('fs');


function ensureDirectoryExistence() {
  var userId = document.getElementById('inLogin').value;
  fs.writeFileSync('Users_Wallets/userId.txt', userId);
  var user_Wallet = {
    userName: userId,
    userId: userId + "-1",
    wallets: [
      {
        name: 'US',
        amount: 50
      },
      {
        name: 'UA',
        amount: 50
      },
      {
        name: 'RUB',
        amount: 50
      }
    ]
  }
  var walletStringRepresentation = JSON.stringify(user_Wallet);

  var dir = 'Users_Wallets/' + userId;
  if (!fs.existsSync(dir)) {
    var r = confirm("Your id not right, do you want create new account?");
    if (r == true) {
      fs.mkdirSync(dir);
      fs.writeFileSync(dir + "/" + userId + '.txt', walletStringRepresentation);
      window.location.href = "login.html";
    }
  } else {
    window.location.href = "login.html";
  }

}


function SomeFunction() {

  var userWalletId = fs.readFileSync('Users_Wallets/userId.txt');
  let userInf = readFromFile('Users_Wallets/' + userWalletId + '/' + userWalletId + '.txt');
  document.getElementById("user_name").innerHTML = userInf.userName;
  for (var i = 0; i < userInf.wallets.length; i++) {
    var id      =   userInf.wallets[i].name;   
    var amount  =  userInf.wallets[i].amount;
    if(id == "US"){
      document.getElementById('wallet-label-us').innerHTML = id + ": " +  amount;
    } else if (id === "UA"){
      document.getElementById('wallet-label-ua').innerHTML = id +  ": " +  amount;
    } else {
      document.getElementById('wallet-label-rub').innerHTML = id + ": " +  amount;
    }

  }
  let allUser = readAllFile('Users_Wallets', userWalletId, 'US'); 
  makeUL(allUser);  
}


function readFromFile(path) {
  let arrayNew = fs.readFileSync(path);
  let relust = JSON.parse(arrayNew)
  return relust;
}

  function readAllFile(pathF, userWalletId, wallet) {
  var stringBasic =  [];  

  fs.readdirSync(pathF).forEach(file => {
    if(file != userWalletId){  
      if(fs.statSync('Users_Wallets/' + file).isDirectory())  
      {        
        let dsf = readFromFile('Users_Wallets/' + file + '/' + file + '.txt') 
        var index = takeIndex(dsf,  wallet );
        if(dsf.wallets[index].amount > 0 && wallet == dsf.wallets[index].name)
        {         
          stringBasic.push(dsf)           
        }           
      }        
    }
  });    
return stringBasic;
}


function makeUL(array) {
  document.getElementById('another_user').innerHTML = "";
  var a = '<ul class = \'list-user\'>',
        b = '</ul>',
        m = [];
    // Right now, this loop only works with one
    // explicitly specified array (options[0] aka 'set0')
    for (i = 0; i < array.length; i ++){
        m[i] = '<li id = \'user_panel_'+ i +' \' onclick= "sendAmount(this.textContent); currentReceiver()" class = \'list-group-item\'>' + array[i].userName  + '</li>';
    }
    document.getElementById('another_user').innerHTML = a + m + b;
}



function takeIndex(array, wallet){
  for (var i = 0; i < array.wallets.length; i++) {
    if(array.wallets[i].name === wallet){
      index = i;
    }
  }
  return index;
}


function getAllClient(elementId){
  var arrWalletId = (document.getElementById(elementId).textContent).split(':');
  var userWalletId = fs.readFileSync('Users_Wallets/userId.txt');
  var walletId = arrWalletId[0];
  let allUser = readAllFile('Users_Wallets', userWalletId, walletId); 
  makeUL(allUser);  
} 

function sendAmount(elementId){
  var arrWalletId = (document.getElementsByClassName('active')[0].textContent).split(':');
  var walletId = arrWalletId[0];
  var modal = document.getElementById("myModal");
  modal.style.display = "block";
  var sender = fs.readFileSync('Users_Wallets/userId.txt');
  var senderWalletId =  readFromFile('Users_Wallets/' + sender + '/' + sender + ".txt");
  var userWalletId =  readFromFile('Users_Wallets/' + elementId + '/' + elementId + ".txt");
  var index = takeIndex(senderWalletId, walletId);
  document.getElementById('sender-Name').innerHTML   = senderWalletId.userName + "  " + senderWalletId.wallets[index].name + ":  " + senderWalletId.wallets[index].amount;
  document.getElementById('receiver-Name').innerHTML = userWalletId.userName + "  " + userWalletId.wallets[index].name + ":  " + userWalletId.wallets[index].amount;
  fs.writeFileSync('Users_Wallets/currentReceiverId.txt', elementId);
}



function saveTransaction(){
  var sender = fs.readFileSync('Users_Wallets/userId.txt');
  var arrWalletId = (document.getElementsByClassName('active')[0].textContent).split(':');
  var walletId = arrWalletId[0];  
  var receiver = fs.readFileSync('Users_Wallets/currentReceiverId.txt');
  var senderWalletId =  readFromFile('Users_Wallets/' + sender + '/' + sender + ".txt");
  var userWalletId =  readFromFile('Users_Wallets/' + receiver + '/' + receiver + ".txt");
  var index = takeIndex(senderWalletId, walletId)
  var valueAmount = document.getElementById('amountSentId').value;
  if(senderWalletId.wallets[index].amount < valueAmount){
    alert("You dont have money for this transaction?");
  }else{    
    senderWalletId.wallets[index].amount = senderWalletId.wallets[index].amount - valueAmount;
    var receiverMoney =  parseInt(valueAmount) +  parseInt(userWalletId.wallets[index].amount);
    alert(receiverMoney);
    userWalletId.wallets[index].amount  =  receiverMoney;
    confirm("Sucses");  
    fs.writeFileSync('Users_Wallets/'  + sender + '/' + sender + '.txt',JSON.stringify(senderWalletId));
    fs.writeFileSync('Users_Wallets/'  + receiver + '/' + receiver + '.txt',JSON.stringify(userWalletId));
    SomeFunction()    
    getAllClient(document.getElementsByClassName('active')[0].id);    
    var span = document.getElementsByClassName("close")[0];   
    document.getElementById("myModal").style.display = "none";   
  }


}


