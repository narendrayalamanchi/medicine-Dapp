
module.exports = {
  

  networks: {
  
    development: {
      host: "127.0.0.1",
      port: 7545,
      // network_id: "5777",
      network_id: "*" ,// Match any network id
    },
   
  },

  // Set default mocha options here, use special reporters, etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.17" // Fetch exact version from solc-bin (default: truffle's version)
    }
  }

};
