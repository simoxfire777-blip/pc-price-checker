const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'PC Price Checker API is ready' });
});

app.post('/api/price-estimate', (req, res) => {
  let { cpu, gpu, ram, storage, motherboard, powerSupply, operatingSystem, condition } = req.body;

  if (!cpu || !gpu || !ram || !storage || !motherboard || !powerSupply || !condition) {
    return res.status(400).json({ error: 'CPU, GPU, RAM, Storage, Motherboard, Power Supply, and Condition are required.' });
  }

  operatingSystem = (operatingSystem || '').toString().trim() || 'Unknown OS';

  const normalize = (value) => (value || '').toString().trim().toLowerCase();
  const parseNumber = (text) => {
    const match = (text || '').match(/([\d.]+)/);
    return match ? Number(match[1]) : null;
  };

  const cpuPrices = [
    { keyword: 'core i9', price: 600 },
    { keyword: 'ryzen 9', price: 550 },
    { keyword: 'core i7', price: 420 },
    { keyword: 'ryzen 7', price: 380 },
    { keyword: 'core i5', price: 280 },
    { keyword: 'ryzen 5', price: 250 },
    { keyword: 'core i3', price: 150 },
    { keyword: 'ryzen 3', price: 130 }
  ];

  const gpuPrices = [
    { keyword: 'rtx 4090', price: 1800 },
    { keyword: 'rtx 4080', price: 1200 },
    { keyword: 'rtx 4070', price: 700 },
    { keyword: 'rtx 4060', price: 450 },
    { keyword: 'rx 7900', price: 900 },
    { keyword: 'rx 7800', price: 650 },
    { keyword: 'rx 7700', price: 420 },
    { keyword: 'gtx 1660', price: 190 },
    { keyword: 'gtx 1650', price: 170 },
    { keyword: 'radeon', price: 240 }
  ];

  const pickPrice = (text, list, fallback) => {
    const value = normalize(text);
    const match = list.find((item) => value.includes(item.keyword));
    return match ? match.price : fallback;
  };

  const ramValue = (() => {
    const amount = parseNumber(ram);
    if (!amount) return 80;
    if (amount >= 64) return 220;
    if (amount >= 32) return 120;
    if (amount >= 16) return 70;
    return 40;
  })();

  const storageValue = (() => {
    const amount = parseNumber(storage);
    const lower = normalize(storage);
    const isSsd = lower.includes('ssd') || lower.includes('nvme');
    if (!amount) return 80;
    if (amount >= 2000) return isSsd ? 280 : 120;
    if (amount >= 1000) return isSsd ? 180 : 80;
    if (amount >= 500) return isSsd ? 90 : 50;
    return isSsd ? 50 : 30;
  })();

  const motherboardValue = (() => {
    const value = normalize(motherboard);
    if (value.includes('rog') || value.includes('strix') || value.includes('meg') || value.includes('aorus')) return 210;
    if (value.includes('z790') || value.includes('x670') || value.includes('b650') || value.includes('z690') || value.includes('x570')) return 160;
    return 110;
  })();

  const powerValue = (() => {
    const amount = parseNumber(powerSupply);
    if (!amount) return 60;
    if (amount >= 1000) return 120;
    if (amount >= 800) return 90;
    if (amount >= 650) return 70;
    return 50;
  })();

  const osValue = normalize(operatingSystem).includes('windows') ? 60 : 30;
  const conditionFactor = condition === 'used' ? 0.82 : 1;

  const estimatedRaw = Math.max(
    120,
    (pickPrice(cpu, cpuPrices, 330) + pickPrice(gpu, gpuPrices, 370) + ramValue + storageValue + motherboardValue + powerValue + osValue) * conditionFactor
  );

  const formatPrice = (value) => `$${Number(value.toFixed(0)).toLocaleString()}`;

  const result = {
    cpu,
    gpu,
    ram,
    storage,
    motherboard,
    powerSupply,
    operatingSystem,
    condition,
    estimatedPrice: formatPrice(estimatedRaw),
    lowestPrice: formatPrice(estimatedRaw * 0.88),
    highestPrice: formatPrice(estimatedRaw * 1.12),
    averagePrice: formatPrice(estimatedRaw),
    comparableListings: Math.max(4, Math.round(8 + estimatedRaw / 220)),
    note: `Local estimate calculated from component values and condition; no external API key is required.`
  };

  res.json(result);
});

app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
