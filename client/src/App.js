import { useMemo, useState } from 'react';
import axios from 'axios';
import fallbackImage from './assets/fallback.svg';
import pc1Image from './assets/pc-1.svg';
import pc2Image from './assets/pc-2.svg';
import pc3Image from './assets/pc-3.svg';
import pc4Image from './assets/pc-4.svg';
import pc5Image from './assets/pc-5.svg';
import pc6Image from './assets/pc-6.svg';
import pc7Image from './assets/pc-7.svg';
import pc8Image from './assets/pc-8.svg';
import pc9Image from './assets/pc-9.svg';
import pc10Image from './assets/pc-10.svg';
import pc11Image from './assets/pc-11.svg';
import pc12Image from './assets/pc-12.svg';

const apiBaseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : '';

const handleImageError = (event) => {
  const target = event.currentTarget;
  if (target.src !== fallbackImage) {
    target.src = fallbackImage;
    target.onError = null;
  }
};

const fields = [
  { label: 'CPU', name: 'cpu', placeholder: 'e.g. Intel Core i7-13700K' },
  { label: 'GPU', name: 'gpu', placeholder: 'e.g. NVIDIA RTX 4070 Ti' },
  { label: 'RAM', name: 'ram', placeholder: 'e.g. 32GB DDR5' },
  { label: 'Storage', name: 'storage', placeholder: 'e.g. 1TB NVMe SSD' },
  { label: 'Motherboard', name: 'motherboard', placeholder: 'e.g. ASUS ROG Strix Z790' },
  { label: 'Power Supply', name: 'powerSupply', placeholder: 'e.g. 750W Gold' },
  { label: 'Operating System', name: 'operatingSystem', placeholder: 'e.g. Windows 11 Pro' }
];

const conditionOptions = [
  { value: 'new', label: 'New' },
  { value: 'used', label: 'Used' }
];

const marketplaceListings = [
  {
    id: 1,
    name: 'Casablanca Cyber Raptor',
    priceDH: 18499,
    cpu: 'AMD Ryzen 9 7900X',
    gpu: 'NVIDIA RTX 4080',
    ram: '32GB DDR5',
    storage: '2TB NVMe SSD',
    motherboard: 'ASUS ROG Strix X670E',
    psu: '850W Gold',
    condition: 'Used',
    rating: 4.9,
    date: '2026-08-01',
    image: pc1Image,
    description: 'A premium gaming rig optimized for 4K play and creative work.'
  },
  {
    id: 2,
    name: 'Rabat Roadrunner',
    priceDH: 12999,
    cpu: 'Intel Core i7-13700K',
    gpu: 'NVIDIA RTX 4070 Ti',
    ram: '32GB DDR5',
    storage: '1TB NVMe SSD',
    motherboard: 'MSI MPG Z790',
    psu: '750W Gold',
    condition: 'Used',
    rating: 4.7,
    date: '2026-07-27',
    image: pc2Image,
    description: 'High-performance desktop for gaming and streaming with premium cooling.'
  },
  {
    id: 3,
    name: 'Marrakech Midnight',
    priceDH: 8999,
    cpu: 'AMD Ryzen 7 7700X',
    gpu: 'NVIDIA RTX 4070',
    ram: '16GB DDR5',
    storage: '1TB NVMe SSD',
    motherboard: 'Gigabyte B650 Aorus',
    psu: '700W Gold',
    condition: 'New',
    rating: 4.8,
    date: '2026-08-05',
    image: pc3Image,
    description: 'Ready-to-play PC with balanced power for modern games and productivity.'
  },
  {
    id: 4,
    name: 'Tangier Titan',
    priceDH: 14499,
    cpu: 'Intel Core i9-13900K',
    gpu: 'NVIDIA RTX 4080',
    ram: '32GB DDR5',
    storage: '2TB NVMe SSD',
    motherboard: 'ASUS TUF Z790',
    psu: '850W Gold',
    condition: 'Used',
    rating: 4.6,
    date: '2026-07-30',
    image: pc4Image,
    description: 'A strong workstation with fast CPU and GPU for gaming and design.'
  },
  {
    id: 5,
    name: 'Fes Flame',
    priceDH: 7599,
    cpu: 'AMD Ryzen 5 7600X',
    gpu: 'NVIDIA RTX 3060 Ti',
    ram: '16GB DDR5',
    storage: '1TB NVMe SSD',
    motherboard: 'MSI B650',
    psu: '650W Gold',
    condition: 'New',
    rating: 4.5,
    date: '2026-08-03',
    image: pc5Image,
    description: 'Affordable midrange gaming build with strong 1080p performance.'
  },
  {
    id: 6,
    name: 'Agadir Apex',
    priceDH: 12499,
    cpu: 'Intel Core i7-13700KF',
    gpu: 'NVIDIA RTX 4070 Super',
    ram: '32GB DDR5',
    storage: '2TB NVMe SSD',
    motherboard: 'ASRock Z790 Steel Legend',
    psu: '800W Gold',
    condition: 'Used',
    rating: 4.8,
    date: '2026-08-04',
    image: pc6Image,
    description: 'Strong hybrid build with fast storage and powerful graphics.'
  },
  {
    id: 7,
    name: 'Essaouira Edge',
    priceDH: 6799,
    cpu: 'AMD Ryzen 5 5600X',
    gpu: 'AMD Radeon RX 6700 XT',
    ram: '16GB DDR4',
    storage: '1TB NVMe SSD',
    motherboard: 'Gigabyte B550 Aorus',
    psu: '650W Bronze',
    condition: 'Used',
    rating: 4.4,
    date: '2026-07-29',
    image: pc7Image,
    description: 'A well-rounded secondhand rig with a solid Radeon GPU.'
  },
  {
    id: 8,
    name: 'Sahara Storm',
    priceDH: 15999,
    cpu: 'Intel Core i9-14900K',
    gpu: 'NVIDIA RTX 4090',
    ram: '64GB DDR5',
    storage: '2TB NVMe SSD',
    motherboard: 'ASUS ROG Maximus Z790',
    psu: '1000W Platinum',
    condition: 'New',
    rating: 4.9,
    date: '2026-08-02',
    image: pc8Image,
    description: 'Ultimate high-end rig built for 4K gaming and content creation.'
  },
  {
    id: 9,
    name: 'Atlas Armor',
    priceDH: 10499,
    cpu: 'AMD Ryzen 9 7900',
    gpu: 'NVIDIA RTX 4070',
    ram: '32GB DDR5',
    storage: '1TB NVMe SSD',
    motherboard: 'MSI MEG X670E',
    psu: '850W Gold',
    condition: 'Used',
    rating: 4.7,
    date: '2026-07-26',
    image: pc9Image,
    description: 'Solid all-rounder with excellent value and modern components.'
  },
  {
    id: 10,
    name: 'Safi Shadow',
    priceDH: 8399,
    cpu: 'Intel Core i5-13600K',
    gpu: 'NVIDIA RTX 3060 Ti',
    ram: '16GB DDR5',
    storage: '1TB NVMe SSD',
    motherboard: 'ASUS TUF B660',
    psu: '700W Gold',
    condition: 'New',
    rating: 4.6,
    date: '2026-08-06',
    image: pc10Image,
    description: 'Great price for efficient gaming and everyday productivity.'
  },
  {
    id: 11,
    name: 'Ouarzazate Orbital',
    priceDH: 18999,
    cpu: 'AMD Ryzen 9 7950X',
    gpu: 'NVIDIA RTX 4090',
    ram: '64GB DDR5',
    storage: '4TB NVMe SSD',
    motherboard: 'Gigabyte X670E Aorus',
    psu: '1000W Platinum',
    condition: 'New',
    rating: 4.95,
    date: '2026-08-07',
    image: pc11Image,
    description: 'Top-tier powerhouse for demanding creative workloads and premium gaming.'
  },
  {
    id: 12,
    name: 'Chefchaouen Chill',
    priceDH: 7199,
    cpu: 'AMD Ryzen 5 7600',
    gpu: 'NVIDIA RTX 3050',
    ram: '16GB DDR5',
    storage: '512GB NVMe SSD',
    motherboard: 'MSI B650M',
    psu: '650W Bronze',
    condition: 'Used',
    rating: 4.3,
    date: '2026-07-25',
    image: pc12Image,
    description: 'Compact and efficient gaming PC suitable for everyday use with a premium look.'
  }
];

function App() {
  const [activePage, setActivePage] = useState('estimate');
  const [form, setForm] = useState({
    cpu: '',
    gpu: '',
    ram: '',
    storage: '',
    motherboard: '',
    powerSupply: '',
    operatingSystem: '',
    condition: 'new'
  });
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMinPrice, setFilterMinPrice] = useState('');
  const [filterMaxPrice, setFilterMaxPrice] = useState('');
  const [filterGPU, setFilterGPU] = useState('');
  const [filterCPU, setFilterCPU] = useState('');
  const [filterRAM, setFilterRAM] = useState('');
  const [sortOption, setSortOption] = useState('newest');
  const [selectedListing, setSelectedListing] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setResponse(null);
    setLoading(true);

    const payload = {
      cpu: form.cpu.trim(),
      gpu: form.gpu.trim(),
      ram: form.ram.trim(),
      storage: form.storage.trim(),
      motherboard: form.motherboard.trim(),
      powerSupply: form.powerSupply.trim(),
      operatingSystem: form.operatingSystem.trim(),
      condition: form.condition
    };

    try {
      const { data } = await axios.post(`${apiBaseUrl}/api/price-estimate`, payload);
      setResponse(data);
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Unable to connect to pricing service.');
    } finally {
      setLoading(false);
    }
  };

  const filteredListings = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return marketplaceListings
      .filter((listing) => {
        if (query) {
          const combined = `${listing.name} ${listing.cpu} ${listing.gpu} ${listing.ram} ${listing.storage} ${listing.motherboard}`.toLowerCase();
          if (!combined.includes(query)) {
            return false;
          }
        }

        if (filterGPU && !listing.gpu.toLowerCase().includes(filterGPU.toLowerCase())) {
          return false;
        }

        if (filterCPU && !listing.cpu.toLowerCase().includes(filterCPU.toLowerCase())) {
          return false;
        }

        if (filterRAM && !listing.ram.toLowerCase().includes(filterRAM.toLowerCase())) {
          return false;
        }

        const min = Number(filterMinPrice || 0);
        if (filterMinPrice && listing.priceDH < min) {
          return false;
        }

        const max = Number(filterMaxPrice || 0);
        if (filterMaxPrice && listing.priceDH > max) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortOption === 'lowest') {
          return a.priceDH - b.priceDH;
        }
        if (sortOption === 'highest') {
          return b.priceDH - a.priceDH;
        }
        return new Date(b.date) - new Date(a.date);
      });
  }, [searchQuery, filterGPU, filterCPU, filterRAM, filterMinPrice, filterMaxPrice, sortOption]);

  const uniqueGpus = useMemo(
    () => Array.from(new Set(marketplaceListings.map((item) => item.gpu))).sort(),
    []
  );

  const uniqueCpus = useMemo(
    () => Array.from(new Set(marketplaceListings.map((item) => item.cpu))).sort(),
    []
  );

  const uniqueRams = useMemo(
    () => Array.from(new Set(marketplaceListings.map((item) => item.ram))).sort(),
    []
  );

  return (
    <div className="min-h-screen bg-bg text-text px-4 py-10">
      <div className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-surface/80 p-8 shadow-2xl shadow-black/20 backdrop-blur-xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-accent font-semibold uppercase tracking-[0.3em]">PC Price Checker</p>
            <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">Browse Moroccan PC marketplace</h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-muted sm:text-base">
              Explore curated desktop listings with real specs, prices in DH, search, filters, and detailed views.
            </p>
          </div>
          <div className="inline-flex rounded-3xl bg-surface2 p-3 shadow-inner shadow-black/20">
            <button
              type="button"
              onClick={() => setActivePage('estimate')}
              className={`rounded-3xl px-5 py-3 text-sm font-semibold transition ${activePage === 'estimate' ? 'bg-accent text-black' : 'text-white/80 hover:text-white'}`}
            >
              Check Market Value
            </button>
            <button
              type="button"
              onClick={() => setActivePage('browse')}
              className={`rounded-3xl px-5 py-3 text-sm font-semibold transition ${activePage === 'browse' ? 'bg-accent text-black' : 'text-white/80 hover:text-white'}`}
            >
              Browse PCs
            </button>
          </div>
        </div>

        {activePage === 'estimate' ? (
          <>
            <header className="mb-10 flex flex-col gap-4 text-center md:text-left md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-accent font-semibold uppercase tracking-[0.3em]">Estimate your desktop market value</p>
                <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Submit your PC specifications</h2>
                <p className="mt-4 max-w-2xl text-sm leading-6 text-muted sm:text-base">
                  Fill in your PC details below and get a local estimated market price with no API key required.
                </p>
              </div>
              <div className="rounded-3xl bg-surface2 p-5 text-sm text-muted shadow-inner shadow-black/20">
                <p className="font-semibold text-white">Instant estimate</p>
                <p className="mt-2">The existing pricing tool remains unchanged and fully functional.</p>
              </div>
            </header>

            <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
              {fields.map((field) => (
                <label key={field.name} className="block rounded-3xl border border-white/10 bg-surface2 p-4 shadow-sm shadow-black/10">
                  <span className="block text-sm font-medium text-muted">{field.label}</span>
                  <input
                    type="text"
                    name={field.name}
                    placeholder={field.placeholder}
                    value={form[field.name]}
                    onChange={handleChange}
                    className="mt-3 w-full rounded-2xl border border-white/10 bg-[#111827] px-4 py-3 text-white outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                  />
                </label>
              ))}

              <label className="block rounded-3xl border border-white/10 bg-surface2 p-4 shadow-sm shadow-black/10">
                <span className="block text-sm font-medium text-muted">Condition</span>
                <select
                  name="condition"
                  value={form.condition}
                  onChange={handleChange}
                  className="mt-3 w-full rounded-2xl border border-white/10 bg-[#111827] px-4 py-3 text-white outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                >
                  {conditionOptions.map((option) => (
                    <option key={option.value} value={option.value} className="bg-surface text-white">
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <div className="md:col-span-2 flex flex-col gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center rounded-3xl bg-accent px-6 py-4 text-sm font-semibold text-black transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? 'Checking value…' : 'Check Market Value'}
                </button>
                {error && <p className="rounded-3xl bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p>}
              </div>
            </form>

            <section className="mt-10 rounded-3xl border border-white/10 bg-surface2 p-6 shadow-lg shadow-black/10">
              <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-white">Results</h2>
                  <p className="text-sm text-muted">Estimated market value for the submitted PC specifications.</p>
                </div>
                <div>
                  {loading && <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-accent">Calculating…</span>}
                  {!loading && response && <span className="rounded-full bg-accent/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-accent">{response.condition === 'new' ? 'New' : 'Used'}</span>}
                </div>
              </div>

              {error && <div className="mb-4 rounded-3xl bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</div>}

              {!loading && !response && !error && (
                <div className="rounded-3xl border border-white/5 bg-[#0f1724] p-6 text-sm text-muted">Fill the form above and click <strong className="text-white">Check Market Value</strong> to see an estimate.</div>
              )}

              {loading && (
                <div className="rounded-3xl p-6 bg-[#0b1220] text-center text-sm text-muted">Calculating estimate…</div>
              )}

              {response && (
                <>
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mt-4">
                    <div className="rounded-3xl bg-[#111827] p-5">
                      <p className="text-sm uppercase tracking-[0.2em] text-muted">Estimated</p>
                      <p className="mt-4 text-3xl font-semibold text-white">{response.estimatedPrice ?? 'N/A'}</p>
                    </div>

                    <div className="rounded-3xl bg-[#111827] p-5">
                      <p className="text-sm uppercase tracking-[0.2em] text-muted">Lowest</p>
                      <p className="mt-4 text-3xl font-semibold text-white">{response.lowestPrice ?? 'N/A'}</p>
                    </div>

                    <div className="rounded-3xl bg-[#111827] p-5">
                      <p className="text-sm uppercase tracking-[0.2em] text-muted">Highest</p>
                      <p className="mt-4 text-3xl font-semibold text-white">{response.highestPrice ?? 'N/A'}</p>
                    </div>

                    <div className="rounded-3xl bg-[#111827] p-5">
                      <p className="text-sm uppercase tracking-[0.2em] text-muted">Average</p>
                      <p className="mt-4 text-3xl font-semibold text-white">{response.averagePrice ?? 'N/A'}</p>
                    </div>
                  </div>

                  <div className="mt-6 rounded-3xl border border-white/10 bg-bg p-5 text-sm text-muted">
                    <p>Comparable listings: <span className="font-semibold text-white">{response.comparableListings}</span></p>
                    <p className="mt-2">{response.note}</p>
                    <div className="mt-4 text-sm">
                      <p className="font-semibold text-white">Specifications used</p>
                      <ul className="mt-2 ml-4 list-disc text-white/90">
                        <li>CPU: {response.cpu}</li>
                        <li>GPU: {response.gpu}</li>
                        <li>RAM: {response.ram}</li>
                        <li>Storage: {response.storage}</li>
                        <li>Motherboard: {response.motherboard}</li>
                        <li>Power Supply: {response.powerSupply}</li>
                        <li>Operating System: {response.operatingSystem}</li>
                      </ul>
                    </div>
                  </div>
                </>
              )}
            </section>
          </>
        ) : (
          <div>
            <section className="rounded-3xl border border-white/10 bg-surface2 p-6 shadow-lg shadow-black/10">
              <div className="mb-8 grid gap-5 lg:grid-cols-[1fr_280px]">
                <div>
                  <h2 className="text-3xl font-semibold text-white">Marketplace Listings</h2>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
                    Browse Moroccan desktop offers with search, filters, and live sorting.
                  </p>
                </div>
                <div className="grid gap-3">
                  <input
                    type="text"
                    placeholder="Search PCs, CPU, GPU..."
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    className="w-full rounded-3xl border border-white/10 bg-[#111827] px-4 py-3 text-white outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      placeholder="Min price DH"
                      value={filterMinPrice}
                      onChange={(event) => setFilterMinPrice(event.target.value)}
                      className="rounded-3xl border border-white/10 bg-[#111827] px-4 py-3 text-white outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                    />
                    <input
                      type="number"
                      placeholder="Max price DH"
                      value={filterMaxPrice}
                      onChange={(event) => setFilterMaxPrice(event.target.value)}
                      className="rounded-3xl border border-white/10 bg-[#111827] px-4 py-3 text-white outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                    />
                  </div>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <select
                      value={filterGPU}
                      onChange={(event) => setFilterGPU(event.target.value)}
                      className="rounded-3xl border border-white/10 bg-[#111827] px-4 py-3 text-white outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                    >
                      <option value="">All GPUs</option>
                      {uniqueGpus.map((gpu) => (
                        <option key={gpu} value={gpu}>{gpu}</option>
                      ))}
                    </select>
                    <select
                      value={filterCPU}
                      onChange={(event) => setFilterCPU(event.target.value)}
                      className="rounded-3xl border border-white/10 bg-[#111827] px-4 py-3 text-white outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                    >
                      <option value="">All CPUs</option>
                      {uniqueCpus.map((cpu) => (
                        <option key={cpu} value={cpu}>{cpu}</option>
                      ))}
                    </select>
                    <select
                      value={filterRAM}
                      onChange={(event) => setFilterRAM(event.target.value)}
                      className="rounded-3xl border border-white/10 bg-[#111827] px-4 py-3 text-white outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                    >
                      <option value="">All RAM</option>
                      {uniqueRams.map((ram) => (
                        <option key={ram} value={ram}>{ram}</option>
                      ))}
                    </select>
                  </div>
                  <select
                    value={sortOption}
                    onChange={(event) => setSortOption(event.target.value)}
                    className="rounded-3xl border border-white/10 bg-[#111827] px-4 py-3 text-white outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                  >
                    <option value="newest">Newest</option>
                    <option value="lowest">Lowest price</option>
                    <option value="highest">Highest price</option>
                  </select>
                </div>
              </div>
            </section>

            <section className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredListings.map((listing) => (
                <article key={listing.id} className="overflow-hidden rounded-3xl border border-white/10 bg-[#111827] shadow-lg shadow-black/20">
                  <div className="relative overflow-hidden">
                    <img
                      src={listing.image || fallbackImage}
                      alt={listing.name}
                      onError={handleImageError}
                      className="h-56 w-full object-cover transition duration-300 hover:scale-105"
                    />
                    <div className="absolute left-4 top-4 rounded-full bg-black/75 px-4 py-2 text-xs uppercase tracking-[0.22em] text-white/90">{listing.condition}</div>
                  </div>
                  <div className="p-5">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <h3 className="text-xl font-semibold text-white">{listing.name}</h3>
                      <span className="rounded-3xl bg-accent/10 px-3 py-1 text-sm font-semibold text-accent">{listing.rating.toFixed(1)}★</span>
                    </div>
                    <p className="mb-4 text-sm text-muted">{listing.description}</p>
                    <div className="grid gap-3 text-sm text-white/80">
                      <div className="flex items-center justify-between"><span className="text-muted">Price</span><strong>{listing.priceDH.toLocaleString()} DH</strong></div>
                      <div className="flex items-center justify-between"><span className="text-muted">CPU</span><span>{listing.cpu}</span></div>
                      <div className="flex items-center justify-between"><span className="text-muted">GPU</span><span>{listing.gpu}</span></div>
                      <div className="flex items-center justify-between"><span className="text-muted">RAM</span><span>{listing.ram}</span></div>
                      <div className="flex items-center justify-between"><span className="text-muted">Storage</span><span>{listing.storage}</span></div>
                      <div className="flex items-center justify-between"><span className="text-muted">Motherboard</span><span>{listing.motherboard}</span></div>
                      <div className="flex items-center justify-between"><span className="text-muted">PSU</span><span>{listing.psu}</span></div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedListing(listing)}
                      className="mt-6 inline-flex w-full items-center justify-center rounded-3xl bg-accent px-4 py-3 text-sm font-semibold text-black transition hover:bg-indigo-500"
                    >
                      View Details
                    </button>
                  </div>
                </article>
              ))}
            </section>

            {filteredListings.length === 0 && (
              <div className="mt-10 rounded-3xl border border-white/10 bg-surface2 p-6 text-center text-muted">
                No PCs match your filters. Try widening the search or resetting the criteria.
              </div>
            )}
          </div>
        )}
      </div>

      {selectedListing?.id && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6">
          <div className="w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-surface2 shadow-2xl shadow-black/50">
            <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-3xl font-semibold text-white">{selectedListing.name}</h2>
                <p className="mt-2 text-sm text-muted">Full PC specification and local DH pricing.</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedListing(null)}
                className="rounded-full border border-white/10 bg-[#111827] px-5 py-3 text-sm font-semibold text-white transition hover:border-accent"
              >
                Close
              </button>
            </div>
            <div className="border-t border-white/10 px-6 pb-6">
              <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
                <div className="overflow-hidden rounded-3xl bg-black/50">
                  <img
                    src={selectedListing.image || fallbackImage}
                    alt={selectedListing.name}
                    onError={handleImageError}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="space-y-5">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-3xl bg-[#111827] p-5">
                      <p className="text-sm uppercase tracking-[0.2em] text-muted">Price</p>
                      <p className="mt-3 text-3xl font-semibold text-white">{selectedListing.priceDH.toLocaleString()} DH</p>
                    </div>
                    <div className="rounded-3xl bg-[#111827] p-5">
                      <p className="text-sm uppercase tracking-[0.2em] text-muted">Rating</p>
                      <p className="mt-3 text-3xl font-semibold text-white">{selectedListing.rating.toFixed(1)}★</p>
                    </div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-3xl bg-[#111827] p-5">
                      <p className="text-sm uppercase tracking-[0.2em] text-muted">Condition</p>
                      <p className="mt-3 text-lg font-semibold text-white">{selectedListing.condition}</p>
                    </div>
                    <div className="rounded-3xl bg-[#111827] p-5">
                      <p className="text-sm uppercase tracking-[0.2em] text-muted">Added</p>
                      <p className="mt-3 text-lg font-semibold text-white">{new Date(selectedListing.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="rounded-3xl bg-[#111827] p-5">
                    <p className="text-sm uppercase tracking-[0.2em] text-muted">Complete specifications</p>
                    <ul className="mt-4 space-y-3 text-sm text-white/80">
                      <li><span className="font-semibold text-white">CPU:</span> {selectedListing.cpu}</li>
                      <li><span className="font-semibold text-white">GPU:</span> {selectedListing.gpu}</li>
                      <li><span className="font-semibold text-white">RAM:</span> {selectedListing.ram}</li>
                      <li><span className="font-semibold text-white">Storage:</span> {selectedListing.storage}</li>
                      <li><span className="font-semibold text-white">Motherboard:</span> {selectedListing.motherboard}</li>
                      <li><span className="font-semibold text-white">PSU:</span> {selectedListing.psu}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
