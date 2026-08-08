# PC Price Checker

A fullstack React + Tailwind CSS + Node.js/Express project scaffolded to support realistic marketplace API connections.

## Features
- Responsive, dark-themed UI
- PC component form with CPU, GPU, RAM, Storage, Motherboard, Power Supply, Operating System, and condition
- Backend API route to receive component data and return pricing metadata
- Placeholder result model ready for real marketplace integration

## Setup

1. Install dependencies:
   - `npm install`
   - `cd client && npm install`

2. Start the development app:
   - `npm run dev`

3. Build for production:
   - `npm run build`

## API

- `POST /api/price-estimate`
  - Request body: `{ cpu, gpu, ram, storage, motherboard, powerSupply, operatingSystem, condition }`
  - Response: pricing output ready for marketplace data connection

## Notes

This project includes API scaffolding but does not yet use real marketplace pricing data. Connect a marketplace API in `server/index.js` for live price estimates.
