App = {
  web3Provider: null,
  contracts: {},
  names: new Array(),
  url: 'http://127.0.0.1:7545',
  chairPerson:null,
  currentAccount:null,
  init: function() {
    // $.getJSON('../proposals.json', function(data) {
    //   var proposalsRow = $('#proposalsRow');
    //   var proposalTemplate = $('#proposalTemplate');

    //   for (i = 0; i < data.length; i ++) {
    //     proposalTemplate.find('.panel-title').text(data[i].name);
    //     proposalTemplate.find('img').attr('src', data[i].picture);
    //     proposalTemplate.find('.btn-vote').attr('data-id', data[i].id);

    //     proposalsRow.append(proposalTemplate.html());
    //     App.names.push(data[i].name);
    //   }
    // });
    return App.initWeb3();
  },

  initWeb3: function() {
        // Is there is an injected web3 instance?
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
    } else {
      // If no injected web3 instance is detected, fallback to the TestRPC
      App.web3Provider = new Web3.providers.HttpProvider(App.url);
    }
    web3 = new Web3(App.web3Provider);

    ethereum.enable();
    window.ethereum.enable();
    console.log("HERERERERERERER")
    App.populateAddress();
    return App.initContract();
  },

  initContract: function() {
      $.getJSON('MedicineSupplyChain.json', function(data) {
          // Get the necessary contract artifact file and instantiate it with truffle-contract
          var createArtifact = data;
          App.contracts.createItem = TruffleContract(createArtifact);

          // Set the provider for our contract
          App.contracts.createItem.setProvider(App.web3Provider);

          App.contracts.triggerPayment = TruffleContract(createArtifact);
          App.contracts.triggerPayment.setProvider(App.web3Provider);

          App.contracts.triggerDelivery = TruffleContract(createArtifact);
          App.contracts.triggerDelivery.setProvider(App.web3Provider);

          App.contracts.trackOrder = TruffleContract(createArtifact);
          App.contracts.trackOrder.setProvider(App.web3Provider);

          App.contracts.transferTokenAmount = TruffleContract(createArtifact);
          App.contracts.transferTokenAmount.setProvider(App.web3Provider);

          App.contracts.getTokenBalance = TruffleContract(createArtifact);
          App.contracts.getTokenBalance.setProvider(App.web3Provider);
          
      });
      $.getJSON('medCoin.json', function(data) {
          // Get the necessary contract artifact file and instantiate it with truffle-contract
          var createArtifact = data;
        
          App.contracts.approveSmartContract = TruffleContract(createArtifact);
          App.contracts.approveSmartContract.setProvider(App.web3Provider);
          return App.bindEvents();
      });

    
  },

  bindEvents: function() {

    $(document).on('click', '#approve_smartcontract', function(){ var amount = $('#approve_amount').val(); App.handleSmartContractApproval(amount); });

    $(document).on('click', '#get_token_balance', function(){  App.handlegetTokenBalance(); });
    
    $(document).on('click', '#transfer_token_amount', function(){ var toaccountaddress = $('#to_account_add').val(); var tranferamount = $('#tranfer_amount').val(); App.handletransfertokenamount(toaccountaddress,tranferamount); });

    $(document).on('click', '#create_item', function(){ var custName = $('#customer_name').val(); var productId = $('#create_productid').val(); App.handleAddingMedicine(custName,productId); });
    $(document).on('click', '#paid_status_click', function(){ var productId = $('#update_productid').val(); App.handlePaid(productId); });
    $(document).on('click', '#delivery_status_click', function(){ var productId = $('#update_productid').val(); App.handleDelivery(productId); });
    $(document).on('click', '#track_status_click', function(){ var productId = $('#track_productid').val(); App.handleTrack(productId); });
  },

  populateAddress : function(){
    new Web3(new Web3.providers.HttpProvider(App.url)).eth.getAccounts((err, accounts) => {
      web3.eth.defaultAccount=web3.eth.accounts[0]
      
      console.log("++++++++++++++",web3.eth.defaultAccount)
      jQuery.each(accounts,function(i){
        if(web3.eth.coinbase != accounts[i]){
          console.log("++++++++++++++",accounts[i])
          // var optionElement = '<option value="'+accounts[i]+'">'+accounts[i]+'</option';
          // jQuery('#enter_address').append(optionElement);  
        }
      });
    });
  },

  handlegetTokenBalance: function(amount){

    var createInstance;
    web3.eth.getAccounts(function(error, accounts) {
    // Returns the account address
    var account = accounts[0];
    
      App.contracts.getTokenBalance.deployed().then(function(instance){
          return instance.getTokenBalance();
      }).then(function(result, err){
          console.log("result in balance",result["c"][0])
          document.getElementById("balanceofaccount").innerHTML = result["c"][0];
      })

    })
},

  handleSmartContractApproval: function(amount){

      if (amount === '' ){
        alert("Please enter amount.")
        return false
      }
      var createInstance;
      web3.eth.getAccounts(function(error, accounts) {
      // Returns the account address
      var account = accounts[0];
      
        App.contracts.approveSmartContract.deployed().then(function(instance){
            return instance.approveSmartContract(amount);
        }).then(function(result, err){
            alert("Approval Success")
        })

      })
  },

  handletransfertokenamount: function(toaccountaddress,tranferamount){

      if (toaccountaddress === '' || tranferamount === ''){
        alert("Please enter details of transfer.")
        return false
      }
      var createInstance;
      web3.eth.getAccounts(function(error, accounts) {
        // Returns the account address
        var account = accounts[0];
      
        App.contracts.transferTokenAmount.deployed().then(function(instance){
          console.log(toaccountaddress,tranferamount)
          return instance.transferTokenAmount(toaccountaddress,tranferamount);
        }).then(function(result, err){
            alert("Transfer Success")
        })
      })
  },
 
  handleAddingMedicine: function(custName,productId){
      if (custName === '' && productId === '' ){
        alert("Please enter Customer Name and product ID.")
        return false
      }
      if (custName === '' ){
        alert("Please enter product ID.")
        return false
      }
      if (productId === '' ){
        alert("Please enter product ID.")
        return false
      }
      var createInstance;
      web3.eth.getAccounts(function(error, accounts) {
      // Returns the account address
      var account = accounts[0];
      // let check = new Array();
   
      App.contracts.trackOrder.deployed().then(function(instance){
        return instance.trackOrder(productId);
      }).then(function(result, err){
        
        if(result["c"][0]===1 || result["c"][0]===2){
          alert("Item with Product ID: "+productId+" already created");
        }
        else{
          App.contracts.createItem.deployed().then(function(instance){
            return instance.createItem(custName,productId);
          }).then(function(result, err){
            alert("Item Created  \r\nProduct ID: " +productId+ "\r\nCustomer Name: "+custName);
          })
        }
          
      })

      })
  },

  handlePaid: function(productId){

      if (productId === '' ){
        alert("Please enter product ID.")
        return false
      }
      var createInstance;
      web3.eth.getAccounts(function(error, accounts) {
      // Returns the account address
      var account = accounts[0];

      App.contracts.trackOrder.deployed().then(function(instance){
        return instance.trackOrder(productId);
      }).then(function(result, err){
          
          if(result["c"][0]===0){
            App.contracts.triggerPayment.deployed().then(function(instance){
              return instance.triggerPayment(productId);
            }).then(function(result, err){
              alert("Item with ID: " +productId+ " Paid");
            })
          }
          else{
            alert("Item already paid")
          }
          
      })

      })
  },

  handleDelivery: function(productId){

      if (productId === '' ){
        alert("Please enter product ID.")
        return false
      }
      var createInstance;
      web3.eth.getAccounts(function(error, accounts) {
      // Returns the account address
      var account = accounts[0];
     
      App.contracts.trackOrder.deployed().then(function(instance){

          return instance.trackOrder(productId);

      }).then(function(result, err){
          
          if(result["c"][0]===1){
              App.contracts.triggerDelivery.deployed().then(function(instance){
                  return instance.triggerDelivery(productId);
              }).then(function(result, err){
                alert("Item with ID: " +productId+ " Delivered");
              })
          }
          else if(result["c"][0]===0){
              alert("Item Not Paid");
          }
          else if(result["c"][0]===2){
              alert("Item already delivered");
          }

      })

      })
  },

  handleTrack: function(productId){

      if (productId === '' ){
        alert("Please enter product ID.")
        return false
      }
      var createInstance;
      web3.eth.getAccounts(function(error, accounts) {
      // Returns the account address
      var account = accounts[0];

      App.contracts.trackOrder.deployed().then(function(instance){
        return instance.trackOrder(productId);
      }).then(function(result, err){

          let state="not set";
          if(result["c"][0]===0){
            state="Created"
          }
          else if(result["c"][0]===1){
            state="Paid"
          }
          else if(result["c"][0]===2){
            state="Delivered"
          }
          alert("ID: "+productId+"\r\nItem Status: "+state);
      })

      })
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
