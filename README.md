**Instructions to deploy, test, and interact:**

**Smart Contract Deployment:**

Go inside contract app : cd contract Compile truffle : truffle compile Migration Reset : truffle migrate --reset

**Front-end Deployment:**

Go inside app: cd app
Install node Modules: npm install Start node server: npm start

**About the Project:**

**Abstract:**
The COVID-19 pandemic is spreading rapidly across the globe, which makes it a lot easier for people to buy fake medicine on the street. An application based on blockchain technology is being used in the project to track medicines throughout a supply chain and ensure that customers receive authentic medicine supplies. In order to trace medications via the supply chain and guarantee that consumers obtain real pharmaceuticals, a blockchain application is created as part of the project to track fake drugs distributed around the world.
**Goals:**
1.	Add or create medicine.
2.	Update medicine status such as paid and delivered.
3.	Track medicine whether the medicine is paid or delivered.

**Issue(s) addressed:**
●	Tracking medicines through this application.
●	Tracking the status of medicine whether its paid or delivered.
●	Building this application using blockchain adds a layer of trust for security and transparency.

**Use case diagram:**

![image](https://github.com/user-attachments/assets/cf685a99-3f78-4376-baad-241749fe08ca)

**Sequence diagram:**

![image](https://github.com/user-attachments/assets/a02ff4f6-8e21-4e6d-a99c-e353653fe94e)


**User Interface:**
![image](https://github.com/user-attachments/assets/14330b52-6db0-4b12-9671-3808e11e2a7d)

**Implementation steps of Smart Contracts:**

**Token creation:**
 
We imported an open zeppelin ERC20.sol file to create a token. In the above solidity code I passed my token name and token symbol (medCoin,med). Minting the token creation was given in the deploy file and passed to constructor.
 
One Lakh tokens were created initially.

**Approve Smart Contract Logic:**
Approve Smart contract address with the user’s account by specifying how many tokens he can transfer through that smart contract address.
Token amount is taken from the below input and smart contract address is taken from the deploy file and updated.
![image](https://github.com/user-attachments/assets/410672ae-a664-47d5-885f-8219739350ab)


**Transfer Tokens Logic:**
 
function transferTokenAmount() : This function used to transfer the token amount from sender to receiver after approval of smart contract in approval function.
Token Amount and receiver account address given in user inputs and passed to solidity function as given in below UI.	

**Fetch Token Balance Logic:**
 
function getTokenBalance(): User’s can check token balance by clicking on Get Token Balance in the UI below. We use the balanof function to fetch balance of sender.
  

**Trigger Payment Logic:**
 
triggerPayment(): In the trigger we are allowing the sender to transfer payments to the owner account. We deduct 10 med tokens from the user account for each medicine purchased.     
 
**Trigger Delivery Logic:**
 
triggerDelivery(): In this trigger we use transferFrom of ERC20 token function to deduct tokens from the user account. For every medicine delivery, we deduct 5 med tokens from the user.

