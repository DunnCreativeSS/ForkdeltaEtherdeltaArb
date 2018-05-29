var request = require('request');
var cheerio = require('cheerio');
var GoogleSpreadsheet = require('google-spreadsheet');
var async = require('async');
var gocompare = true;
var emitone = 1;
var gogo1 = true;
var gogo2 = true;
var emittwo = 1;
var addrEd = {};
var addrFd = {};
var bidsEd = {};
var array = [];
var asksEd = {};
var call1 = true;
var bidsFd = {};
var asksFd = {};
var arbFd = {};
var buyTotals = {};
var sellTotals = {};
var buyPrice = {};
var sellPrice = {};
var edBuys = {};
var edSells = {};
var fdBuys = {};
var fdSells = {};
var arbEd = {};
// spreadsheet key is the long id in the sheets URL
var doc = new GoogleSpreadsheet('1SE_ztgj0NnuZ_zvxL-t7kE1Zy-bdjJx4VPQFvgJz01k');
var sheet;
var sheet2;
var i = 0;
var goemitone = true;
var goemittwo = true;

var sleep = require('system-sleep');
var doc = new GoogleSpreadsheet('1qesinqLVXnq55bHcVn3F-UUj4oKHOfUPqt2kev1_en4');
var sheet;
var math = require("mathjs");
var BigNumber = require("bignumber.js");

const user = '0x42a55769F451fB8ad894599eDeda26EDebad9ab1';
var request = require("request");
const sha256 = require('js-sha256').sha256;
const ethUtil = require('ethereumjs-util');
var sleep = require('system-sleep');
var sheet;
var crypto = require("crypto");
var Web3 = require("web3");
var web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/SQ566ZL5jvEr02BKFIRV"));
var Eth = require('web3-eth');
const wei = 1000000000000000000;
var SOME_EXIT_CONDITION = false;
(function wait() {
    //if (!SOME_EXIT_CONDITION) setTimeout(wait, 1000);
})();
// "Eth.providers.givenProvider" will be set if in an Ethereum supported browser.
var eth = new Eth(Eth.givenProvider || 'https://mainnet.infura.io/SQ566ZL5jvEr02BKFIRV');

var contractABI = require('./etherdelta.json');

var contract = new eth.Contract(contractABI, "0x8d12a197cb00d4747a1fe03395095ce2a5cc6819");
const io = require('socket.io-client');

var socket = io.connect("https://socket.etherdelta.com", {
    transports: ['websocket']
});

socket.on("connect", function() {
    console.log('lala');
    socket.emit("getMarket", {
        user: "0xb44dd0456ca2eB42506549aAcfF6724826c89599"
    })
});
var socket2 = io.connect("https://api.forkdelta.com", {
    transports: ['websocket']
});

socket2.on("connect", function() {
    console.log('lala');
    socket2.emit("getMarket", {
        user: "0xb44dd0456ca2eB42506549aAcfF6724826c89599"
    })
});

function doTimeout(emit) {
    setTimeout(function() {
        console.log(emit);
        socket.emit("getMarket", {
            token: emit
        })
        socket2.emit("getMarket", {
            token: emit
        })
    }, Math.floor(Math.random() * 10000 * Object.keys(arbEd).length));
}

function compare() {
    if (gocompare == true) {
        gocompare = false;
        console.log('compare ' + 10000 * Object.keys(arbEd).length + ' threshold: ' + threshold);
        setTimeout(function() {
            console.log('gocompare');
            for (var addr in edBuys) {
                for (var addr2 in fdSells) {
                    if (addr == addr2) {
                        console.log(addr);
                        console.log('bp: ' + buyPrice[addr]);
                        console.log('sp: ' + sellPrice[addr]);
                        var arb = -1 * (1 - (buyPrice[addr] / sellPrice[addr]));
                        console.log('arb: ' + arb);
                        if (arb > 0.005) {
							if (!array.includes(addr)){
								array.push(addr);
								if (buyTotals){
									
                            sheet.addRow({
								'erc20': addr,
                                'threshold': threshold,
                                'arb': (arb * 100) + '%',
                                'ask': buyPrice[addr],
                                'bid': sellPrice[addr],
                                'askVol': buyTotals[addr],
                                'bidVol': sellTotals[addr],
                                'link 1': 'https://etherdelta.com/#' + addr + '-ETH',
                                'link 2': 'https://forkdelta.github.io/#!/trade/' + addr2 + '-ETH'
                            }, function() {})
							}else{
								
                            sheet.addRow({
								'erc20': addr,
                                'threshold': threshold,
                                'arb': (arb * 100) + '%',
                                'ask': buyPrice[addr],
                                'bid': sellPrice[addr],
                                'askVol': '',
                                'bidVol': '',
                                'link 1': 'https://etherdelta.com/#' + addr + '-ETH',
                                'link 2': 'https://forkdelta.github.io/#!/trade/' + addr2 + '-ETH'
                            }, function() {})
							}
							}
						}
                    }
                }
            }
            for (var addr in fdBuys){
            for (var addr2 in edSells){

            				if (addr == addr2){
            					console.log(addr);
            					console.log('bp: ' + buyPrice[addr]);
            					console.log('sp: ' + sellPrice[addr]);
            					var arb = -1 * (1 - (buyPrice[addr] / sellPrice[addr]));
            					console.log('arb: ' + arb);
            					if (arb > 0){
							if (!array.includes(addr)){
								array.push(addr);                       sheet.addRow({
								'erc20': addr,
                                'threshold': threshold,
                                'arb': (arb * 100) + '%',
                                'ask': buyPrice[addr],
                                'bid': sellPrice[addr],
                                'askVol': buyTotals[addr],
                                'bidVol': sellTotals[addr],
                                'link 1': 'https://etherdelta.com/#' + addr + '-ETH',
                                'link 2': 'https://forkdelta.github.io/#!/trade/' + addr2 + '-ETH'
                            }, function() {})
	
	}
							}
            				}
            }
            }		
            goemittwo = true;
            goemitone = true;
            addrEd = {};
            addrFd = {};
            bidsEd = {};
            asksEd = {};
            bidsFd = {};
            gogo1 = true;
            gogo2 = true;
            asksFd = {};
            arbFd = {};
			emitone = 1;
			emittwo = 1;
            buyPrice = {};
            buyTotals = {};
            sellTotals= {};
            gocompare = true;
            sellPrice = {};
            edBuys = {};
            edSells = {};
            call1 = true;
            fdBuys = {};
            fdSells = {};
            arbEd = {};
			array = [];
            threshold = Math.random() * 0.5 + 0.01;
            
            setTimeout(function(){
            socket2.emit("getMarket", {
                user: "0xb44dd0456ca2eB42506549aAcfF6724826c89599"
            })
            }, Math.random() * 10000);
            
        }, 10000 + 10000 * Object.keys(arbEd).length);
    }
}
socket.on("market", function(data) {
    console.log('lala2');
    if (data.orders) {
        var data6 = data.orders;
        var buyDone = false;
        var sellDone = false;
        var buyTotal = 0;
        var sellTotal = 0;
        //console.log(data6);
        if (data6['buys']) {
            while (buyDone == false) {

                for (var buys in data6['buys']) {
                    //console.log(data6['buys'][buys]['tokenGet']);
                    edBuys[data6['buys'][buys]['tokenGet']] = {};
                    edBuys[data6['buys'][buys]['tokenGet']][buys] = {};
                    edBuys[data6['buys'][buys]['tokenGet']][buys]['nonce'] = data6['buys'][buys]['nonce'];
                    edBuys[data6['buys'][buys]['tokenGet']][buys]['v'] = data6['buys'][buys]['v'];
                    edBuys[data6['buys'][buys]['tokenGet']][buys]['r'] = data6['buys'][buys]['r'];
                    edBuys[data6['buys'][buys]['tokenGet']][buys]['expires'] = data6['buys'][buys]['expires'];
                    edBuys[data6['buys'][buys]['tokenGet']][buys]['s'] = data6['buys'][buys]['s'];
                    edBuys[data6['buys'][buys]['tokenGet']][buys]['user'] = data6['buys'][buys]['user'];
                    edBuys[data6['buys'][buys]['tokenGet']][buys]['amountGet'] = math.bignumber(Number(data6['buys'][buys]['amountGet'])).toFixed(); //tokens
                    edBuys[data6['buys'][buys]['tokenGet']][buys]['amountGive'] = math.bignumber(Number(data6['buys'][buys]['amountGive'])).toFixed(); //eth
                    //console.log(edBuys);
                    if (buys == data6['buys'].length) {
                        buyDone = true;
                        break;
                        buyTotals[data6['buys'][buys]['tokenGet']] = buyTotal;
                        buyPrice[data6['buys'][buys]['tokenGet']] = 0;

                    }
                    buyTotal = buyTotal + parseFloat(data6['buys'][buys]['ethAvailableVolumeBase']);
                    if (buyTotal >= threshold) {
                        buyDone = true;
                        buyTotals[data6['buys'][buys]['tokenGet']] = buyTotal
                        buyPrice[data6['buys'][buys]['tokenGet']] = data6['buys'][buys]['price'];
                        var bps = buyPrice;
                        break;
                    }
                }
            }
        }


        if (data6['sells']) {
            while (sellDone == false) {
                var buyDone = false;
                var sellDone = false;
                var buyTotal = 0;
                var sellTotal = 0;
                for (var sells in data6['sells']) {
                    edSells[data6['sells'][sells]['tokenGive']] = {};
                    //console.log(data6['sells'][sells]['tokenGive']);
                    edSells[data6['sells'][sells]['tokenGive']][sells] = {};
                    edSells[data6['sells'][sells]['tokenGive']][sells]['nonce'] = data6['sells'][sells]['nonce'];
                    edSells[data6['sells'][sells]['tokenGive']][sells]['v'] = data6['sells'][sells]['v'];
                    edSells[data6['sells'][sells]['tokenGive']][sells]['r'] = data6['sells'][sells]['r'];
                    edSells[data6['sells'][sells]['tokenGive']][sells]['expires'] = data6['sells'][sells]['expires'];

                    edSells[data6['sells'][sells]['tokenGive']][sells]['s'] = data6['sells'][sells]['s'];
                    edSells[data6['sells'][sells]['tokenGive']][sells]['user'] = data6['sells'][sells]['user'];
                    edSells[data6['sells'][sells]['tokenGive']][sells]['amountGet'] = math.bignumber(Number(data6['sells'][sells]['amountGet'])).toFixed(); //tokens
                    edSells[data6['sells'][sells]['tokenGive']][sells]['amountGive'] = math.bignumber(Number(data6['sells'][sells]['amountGive'])).toFixed(); //eth
                    sellDone = true;
                    //console.log(edSells);
                    if (sells == data6['sells'].length) {
                        break;
                       sellTotals[data6['sells'][sells]['tokenGive']] = sellTotal;

                        sellPrice[data6['sells'][sells]['tokenGive']] = 1000000;

                    }

                    sellTotal = sellTotal + parseFloat(data6['sells'][sells]['ethAvailableVolumeBase']);
                    if (sellTotal >= threshold) {
                        sellDone = true;
                        sellTotals[data6['sells'][sells]['tokenGive']] = sellTotal;

                        sellPrice[data6['sells'][sells]['tokenGive']] = data6['sells'][sells]['price'];


                        var sps = sellPrice;
                        break;
                    }
                }
            }
            compare();
        }
        if (gogo1 == true) {
            gogo1 = false;
			var count = 1;
            for (var emit in arbEd) { 
			if (count == emitone){
				emitone++;
                doTimeout(emit);
			}
				count++;
				
            }
        }
    } else {
        for (var ticker in data.returnTicker) {
            if (data.returnTicker[ticker].tokenAddr != undefined) {
                //console.log(data.returnTicker[ticker].tokenAddr);
                addrEd[data.returnTicker[ticker].tokenAddr] = {
                    'bid': data.returnTicker[ticker].bid,
                    'ask': data.returnTicker[ticker].ask
                };

            }
        }
    }
});
var  threshold = Math.random() * 1 + 0.01;
console.log('threshold: ' + threshold);
socket2.on("market", function(data) {
    if (call1 == true){
        console.log('call1');
        call1 = false;
         socket.emit("getMarket");
    }
    console.log('lala3');
    if (data.orders) {
        var data6 = data.orders;
        var buyDone = false;
        var sellDone = false;
        var buyTotal = 0;
        var sellTotal = 0;
        if (data6['sells']) {
            while (sellDone == false) {
                for (var sells in data6['sells']) {
                    fdSells[data6['sells'][sells]['tokenGive']] = {}
                    //	console.log(data6['sells'][sells]['tokenGive']);
                    fdSells[data6['sells'][sells]['tokenGive']][sells] = {};
                    fdSells[data6['sells'][sells]['tokenGive']][sells]['nonce'] = data6['sells'][sells]['nonce'];
                    fdSells[data6['sells'][sells]['tokenGive']][sells]['v'] = data6['sells'][sells]['v'];
                    fdSells[data6['sells'][sells]['tokenGive']][sells]['r'] = data6['sells'][sells]['r'];
                    fdSells[data6['sells'][sells]['tokenGive']][sells]['expires'] = data6['sells'][sells]['expires'];

                    fdSells[data6['sells'][sells]['tokenGive']][sells]['s'] = data6['sells'][sells]['s'];
                    fdSells[data6['sells'][sells]['tokenGive']][sells]['user'] = data6['sells'][sells]['user'];
                    fdSells[data6['sells'][sells]['tokenGive']][sells]['amountGet'] = math.bignumber(Number(data6['sells'][sells]['amountGet'])).toFixed(); //tokens
                    fdSells[data6['sells'][sells]['tokenGive']][sells]['amountGive'] = math.bignumber(Number(data6['sells'][sells]['amountGive'])).toFixed(); //eth
                    sellDone = true;
                    //console.log(fdSells);
                    if (sells == data6['sells'].length) {
                        break;
                        sellTotals[data6['sells'][sells]['tokenGive']] = sellTotal;

                        sellPrice[data6['sells'][sells]['tokenGive']] = 1000000;

                    }

                    sellTotal = sellTotal + parseFloat(data6['sells'][sells]['ethAvailableVolumeBase']);
                    if (sellTotal >= threshold) {
                        sellDone = true;
                                                sellTotals[data6['sells'][sells]['tokenGive']] = sellTotal;

                        sellPrice[data6['sells'][sells]['tokenGive']] = data6['sells'][sells]['price'];


                        var sps = sellPrice;
                        break;
                    }
                }
            }
        }

        var buyDone = false;
        var sellDone = false;
        var buyTotal = 0;
        var sellTotal = 0;
        if (data6['buys']) {
            while (buyDone == false) {
                for (var buys in data6['buys']) {
                    //	console.log(data6['buys'][buys]['tokenGet']);
                    fdBuys[data6['buys'][buys]['tokenGet']] = {};
                    fdBuys[data6['buys'][buys]['tokenGet']][buys] = {};
                    fdBuys[data6['buys'][buys]['tokenGet']][buys]['nonce'] = data6['buys'][buys]['nonce'];
                    fdBuys[data6['buys'][buys]['tokenGet']][buys]['v'] = data6['buys'][buys]['v'];
                    fdBuys[data6['buys'][buys]['tokenGet']][buys]['r'] = data6['buys'][buys]['r'];
                    fdBuys[data6['buys'][buys]['tokenGet']][buys]['expires'] = data6['buys'][buys]['expires'];
                    fdBuys[data6['buys'][buys]['tokenGet']][buys]['s'] = data6['buys'][buys]['s'];
                    fdBuys[data6['buys'][buys]['tokenGet']][buys]['user'] = data6['buys'][buys]['user'];
                    fdBuys[data6['buys'][buys]['tokenGet']][buys]['amountGet'] = math.bignumber(Number(data6['buys'][buys]['amountGet'])).toFixed(); //tokens
                    fdBuys[data6['buys'][buys]['tokenGet']][buys]['amountGive'] = math.bignumber(Number(data6['buys'][buys]['amountGive'])).toFixed(); //eth
                    //console.log(fdBuys);
                    if (buys == data6['buys'].length) {
                        buyDone = true;
                        break;
                        buyTotals[data6['buys'][buys]['tokenGet']] = buyTotal;
                        
                        buyPrice[data6['buys'][buys]['tokenGet']] = 0;

                    }
                    buyTotal = buyTotal + parseFloat(data6['buys'][buys]['ethAvailableVolumeBase']);
                    if (buyTotal >= threshold) {
                        buyDone = true;
                                                buyTotals[data6['buys'][buys]['tokenGet']] = buyTotal;

                        buyPrice[data6['buys'][buys]['tokenGet']] = data6['buys'][buys]['price'];
                        var bps = buyPrice;
                        break;
                    }
                }
            }
        }
            compare();
        if (gogo2 == true) {
            gogo2 = false;
			var count = 1;
            for (var emit in arbFd) { 
			if (count == emittwo){
				emitone++;
                doTimeout(emit);
			}
				count++;
				
            }
        }
    } else {

        for (var ticker in data.returnTicker) {
            if (data.returnTicker[ticker].tokenAddr != undefined) {
                addrFd[data.returnTicker[ticker].tokenAddr] = {
                    'bid': data.returnTicker[ticker].bid,
                    'ask': data.returnTicker[ticker].ask
                }

            }
        }
        setTimeout(function() {

            console.log('lala4');

            for (var addr in addrEd) {
                for (var addr2 in addrFd) {
                    if (addr == addr2) {
                        //console.log(addr);
                        if (addrEd[addr].bid != 0 && addrFd[addr2].ask != 0) {
                            var arb1 = -1 * (1 - (addrEd[addr].bid / addrFd[addr2].ask));
                        }
                        if (addrFd[addr2].bid != 0 && addrEd[addr].ask != 0) {

                            var arb2 = -1 * (1 - (addrFd[addr2].bid / addrEd[addr].ask));
                        }
                        if (arb1 > -0.02) {
                            console.log(addr + ' ' + arb1);
                            //	sheet.addRow({'arb': arb1, 'ask': addrFd[addr2].ask, 'bid': addrEd[addr].bid, 'bid link': 'https://etherdelta.com/#'+ addr + '-ETH','ask link': 'https://forkdelta.github.io/#!/trade/'+ addr2 + '-ETH'}, function(){})
                            arbEd[addr2] = {addr2};
                            if (goemitone == true) {
                                goemitone = false;
                                socket.emit("getMarket", {
                                    token: addr2
                                })
                                socket2.emit("getMarket", {
                                    token: addr2
                                })
                            }
                        }
                        if (arb2 > -0.02) {
							arbFd[addr] = {addr};
                            console.log(addr + ' ' + arb2);
                            if (goemittwo == true) {
                                goemittwo = false;
                                arbFd[addr] = {};
                                socket.emit("getMarket", {
                                    token: addr
                                })
                                socket2.emit("getMarket", {
                                    token: addr2
                                })

                            }
                            //sheet.addRow({'arb': arb2, 'ask': addrEd[addr].ask, 'bid': addrFd[addr2].bid, 'ask link': 'https://etherdelta.com/#'+ addr + '-ETH','bid link': 'https://forkdelta.github.io/#!/trade/'+ addr2 + '-ETH'}, function(){})
                        }

                    }
                }
            }
        }, 15000);
    }
});

function checkbal(ticker) {
    contract.methods.balanceOf(ticker.tokenAddr, "0xb44dd0456ca2eB42506549aAcfF6724826c89599").call().then(function(data2) {
        if (data2.toString() != '0') {
            console.log(ticker.tokenAddr);
            console.log(data2);
        }
    });
}
async.series([
    function setAuth(step) {
        // see notes below for authentication instructions!
        var creds = require('./TwitterPush-5e2367822949.json');

        doc.useServiceAccountAuth(creds, step);
    },
    function getInfoAndWorksheets(step) {
        doc.getInfo(function(err, info) {
            console.log('Loaded doc: ' + info.title + ' by ' + info.author.email);
            sheet = info.worksheets[0];
            console.log('sheet 1: ' + sheet.title + ' ' + sheet.rowCount + 'x' + sheet.colCount);
            step();
        });
    },
    function workingWithRows(step) {

    }
]);
