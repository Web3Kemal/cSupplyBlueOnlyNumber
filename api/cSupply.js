const axios = require("axios");

module.exports = async (req, res) => {
  try {
    const totalSupply = await getTotalSupply();
    const lpSupply = await getLPSupply();
    const airdropSupply = await getAirdropSupply();
    const circulatingSupply = totalSupply - lpSupply - airdropSupply;
    res.status(200).send({
      result: circulatingSupply,
    });
  } catch (err) {
    res.status(500).send({
      message: "Error fetching data"
    });
  }
};

async function getTotalSupply() {
  const response = await axios.get(
    "https://api.bscscan.com/api?module=stats&action=tokensupply&contractaddress=0x3a36dc12efaa14a3f692b94f97450594459661b6&apikey=929FQNKF895HQGVBAZBM4J5M9X7T73N8BN"
  );
  return BigInt(response.data.result);
}

async function getLPSupply() {
  const response = await axios.get(
    "https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=0x3a36dc12eFaa14a3F692B94f97450594459661b6&address=0x84E7380DE236cD12B312E078d99d5bb9bA68Bf3b&tag=latest&apikey=929FQNKF895HQGVBAZBM4J5M9X7T73N8BN"
  );
  return BigInt(response.data.result);
}

async function getAirdropSupply() {
  const response = await axios.get(
    "https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=0x3a36dc12eFaa14a3F692B94f97450594459661b6&address=0x407993575c91ce7643a4d4cCACc9A98c36eE1BBE&tag=latest&apikey=929FQNKF895HQGVBAZBM4J5M9X7T73N8BN"
  );
  return BigInt(response.data.result);
}
