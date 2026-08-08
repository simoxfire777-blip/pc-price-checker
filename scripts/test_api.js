const axios = require('../client/node_modules/axios');
axios.post('http://localhost:4000/api/price-estimate', {
  cpu: 'Intel Core i7-13700K',
  gpu: 'NVIDIA RTX 4070 Ti',
  ram: '32GB DDR5',
  storage: '1TB NVMe SSD',
  motherboard: 'ASUS ROG Strix Z790',
  powerSupply: '750W Gold',
  operatingSystem: 'Windows 11 Pro',
  condition: 'used'
}).then(res => { console.log(JSON.stringify(res.data, null, 2)); process.exit(0); }).catch(err => { console.error(err.toString()); if (err.response) console.error(JSON.stringify(err.response.data, null, 2)); process.exit(1); });
