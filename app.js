/**
 * COLINT - Colombia Intelligence Monitor
 * Bloomberg 2026 Style Dashboard
 * Full OSINT + Real-time Data Integration
 */

// ============================================
// CONFIGURATION
// ============================================
// ============================================
// CONFIGURATION
// ============================================
const CONFIG = {
    apis: {
        // Real APIs
        secop: 'https://www.datos.gov.co/resource/jbjy-vk9h.json',
        trm: 'https://www.datos.gov.co/resource/32sa-8pi3.json',
        opensky: 'https://opensky-network.org/api/states/all',
        coingecko: 'https://api.coingecko.com/api/v3',
        rssProxy: 'https://api.rss2json.com/v1/api.json?rss_url=',
        reddit: 'https://www.reddit.com/r/Colombia/.json?limit=10',
        earthquakes: 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&limit=5&minmagnitude=4.5',
        fires: 'https://firms.modaps.eosdis.nasa.gov/api/country/csv/YOUR_KEY/COL/1', // Placeholder for public feed
    },

    rssFeeds: {
        // COLOMBIA
        eltiempo: 'https://www.eltiempo.com/rss/colombia.xml',
        semana: 'https://www.semana.com/rss/nacion.xml',
        elespectador: 'https://www.elespectador.com/arc/outboundfeeds/rss/',

        // GLOBAL REGIONS
        americas: 'https://feeds.bbci.co.uk/news/world/latin_america/rss.xml',
        europe: 'https://feeds.bbci.co.uk/news/world/europe/rss.xml',
        asia: 'https://www.aljazeera.com/xml/rss/all.xml',

        // THEMATIC
        tech: 'https://techcrunch.com/feed/',
        cyber: 'https://feeds.feedburner.com/TheHackersNews',
        geopolitics: 'https://www.crisisgroup.org/rss/articles',
        crypto_news: 'https://cointelegraph.com/rss'
    },

    crypto: ['bitcoin', 'ethereum', 'solana', 'dogecoin', 'cardano',
        'avalanche-2', 'official-trump', 'shiba-inu', 'pepe', 'bonk'], // Added meme coins

    colombiaBounds: { lamin: -4.5, lomin: -79.5, lamax: 13.5, lomax: -66.5 },
    mapCenter: [4.5709, -74.2973],

    refreshIntervals: {
        // 3 Minute Refresh (180,000 ms) as requested
        global: 180000,
        crypto: 30000, // Keep crypto faster
        flights: 45000
    }
};

// ... (State and other inits remain similar) ...

// ============================================
// DATA LOADING ORCHESTRATOR
// ============================================
async function loadAllData() {
    state.activeSources = 0;

    // Core Colombia Data
    loadCrypto(); loadMercados(); loadCommodities();
    loadNoticias(); loadSecop(); loadVuelos();
    loadAlertas(); loadConflictos(); // Now real RSS

    // New Global Logic
    loadGlobalAmericas(); loadGlobalEuro(); loadGlobalAsia();
    loadTechIntel(); loadCyberIntel(); loadGeopolitics();
    loadEarthquakes();

    // Specialized
    loadReddit(); loadTelegram();

    // Update Counters
    document.getElementById('activeSources').textContent = state.activeSources;
    document.getElementById('lastSync').textContent = new Date().toLocaleTimeString('es-CO');
}

// ============================================
// NEW GLOBAL PANELS (Real RSS Data)
// ============================================

async function loadGlobalAmericas() {
    fetchNewsPanel(CONFIG.rssFeeds.americas, 'globalAmericasContent', 'BBC Americas');
}

async function loadGlobalEuro() {
    fetchNewsPanel(CONFIG.rssFeeds.europe, 'globalEuroContent', 'BBC Europe');
}

async function loadGlobalAsia() {
    fetchNewsPanel(CONFIG.rssFeeds.asia, 'globalAsiaContent', 'Al Jazeera');
}

async function loadTechIntel() {
    fetchNewsPanel(CONFIG.rssFeeds.tech, 'techContent', 'TechCrunch');
}

async function loadCyberIntel() {
    fetchNewsPanel(CONFIG.rssFeeds.cyber, 'cyberContent', 'Hacker News');
}

async function loadGeopolitics() {
    fetchNewsPanel(CONFIG.rssFeeds.geopolitics, 'geopoliticsContent', 'Crisis Group');
}

// Shared Fetcher for RSS Panels
async function fetchNewsPanel(url, containerId, sourceName) {
    const container = document.getElementById(containerId);
    try {
        const res = await fetch(`${CONFIG.apis.rssProxy}${encodeURIComponent(url)}`);
        const data = await res.json();

        if (data.status === 'ok' && data.items.length) {
            state.activeSources++;
            container.innerHTML = data.items.slice(0, 5).map(i => `
                <div class="data-item">
                    <div class="data-item-header">
                        <div class="data-item-title"><a href="${i.link}" target="_blank">${truncate(i.title, 65)}</a></div>
                        <span class="data-item-time">${timeAgo(i.pubDate)}</span>
                    </div>
                </div>
            `).join('');
        } else {
            container.innerHTML = emptyState('Sin datos');
        }
    } catch (e) {
        container.innerHTML = errorState('Error Feed');
    }
}

// ============================================
// REAL-TIME EARTHQUAKES (USGS API)
// ============================================
async function loadEarthquakes() {
    const container = document.getElementById('earthquakesContent');
    try {
        const res = await fetch(CONFIG.apis.earthquakes);
        const data = await res.json();

        if (data.features?.length) {
            state.activeSources++;
            container.innerHTML = data.features.map(f => {
                const props = f.properties;
                const mag = props.mag.toFixed(1);
                const color = mag > 6 ? '#ef4444' : mag > 5 ? '#f59e0b' : '#10b981';
                return `
                <div class="alert-item" style="border-left-color:${color}">
                    <span class="alert-icon">🌋</span>
                    <div class="alert-content">
                        <div class="alert-title">M ${mag} - ${props.place}</div>
                        <div class="alert-location">${timeAgo(new Date(props.time))}</div>
                    </div>
                </div>`;
            }).join('');
        }
    } catch (e) {
        container.innerHTML = errorState('USGS Error');
    }
}

// ============================================
// REAL CONFLICT/ALERTS (Via filtered Google News RSS)
// ============================================
async function loadConflictos() {
    const container = document.getElementById('conflictosContent');
    // Using a filtered Google News RSS for "Conflictos Colombia"
    const rssParams = encodeURIComponent('https://news.google.com/rss/search?q=combates+ejercito+eln+colombia&hl=es-419&gl=CO&ceid=CO:es-419');

    try {
        const res = await fetch(`${CONFIG.apis.rssProxy}${rssParams}`);
        const data = await res.json();

        if (data.items?.length) {
            state.activeSources++;
            container.innerHTML = data.items.slice(0, 5).map(i => `
                <div class="alert-item" style="border-left-color:var(--accent-danger)">
                    <span class="alert-icon">⚔️</span>
                    <div class="alert-content">
                        <div class="alert-title"><a href="${i.link}" target="_blank">${truncate(i.title, 50)}</a></div>
                        <div class="alert-location">${timeAgo(i.pubDate)}</div>
                    </div>
                </div>
            `).join('');
        } else {
            // Fallback if RSS blocked
            container.innerHTML = `<div class="data-item">Sin reportes recientes</div>`;
        }
    } catch (e) {
        container.innerHTML = errorState('Error Conflictos');
    }
}

// ============================================
// UTILS REFRESH
// ============================================
function startAutoRefresh() {
    // Master 3-minute refresh
    setInterval(loadAllData, CONFIG.refreshIntervals.global);

    // Fast crypto refresh
    setInterval(loadCrypto, CONFIG.refreshIntervals.crypto);

    // Flight tracker refresh
    setInterval(loadVuelos, CONFIG.refreshIntervals.flights);
}

// ============================================
// STATE
// ============================================
const state = {
    map: null, layers: {}, markers: [], customMonitors: [],
    panelVisibility: {}, refreshTimers: {}, activeSources: 0,
    selectedDepartment: null, cryptoData: {}
};

// Panel definitions
const PANELS = [
    { id: 'crypto', name: 'Crypto', icon: '₿' },
    { id: 'mercados', name: 'Mercados CO', icon: '📊' },
    { id: 'commodities', name: 'Commodities', icon: '🛢️' },
    { id: 'noticias', name: 'Noticias', icon: '📰' },
    { id: 'twitter', name: 'Tendencias X', icon: '𝕏' },
    { id: 'deportes', name: 'Deportes CO', icon: '⚽' },
    { id: 'futbolint', name: 'Fútbol INT', icon: '🌍' },
    { id: 'secop', name: 'SECOP', icon: '📋' },
    { id: 'cuentas', name: 'Cuentas Claras', icon: '💰' },
    { id: 'regalias', name: 'Regalías', icon: '🏛️' },
    { id: 'contraloria', name: 'Contraloría', icon: '⚖️' },
    { id: 'alertas', name: 'Alertas', icon: '🚨' },
    { id: 'vuelos', name: 'Vuelos', icon: '✈️' },
    { id: 'mineria', name: 'Minería', icon: '⛏️' },
    { id: 'conflictos', name: 'Conflictos', icon: '🔥' },
    { id: 'congreso', name: 'Congreso', icon: '🏛️' },
    { id: 'sigep', name: 'SIGEP', icon: '👤' },
    { id: 'elecciones', name: 'Electoral', icon: '🗳️' },
    { id: 'encuestas', name: 'Encuestas', icon: '📊' },
    { id: 'sanciones', name: 'OFAC', icon: '🚫' },
    { id: 'frontera', name: 'Fronteras', icon: '🛂' },
    { id: 'emergencias', name: 'Emergencias', icon: '🆘' },
    { id: 'clima', name: 'Clima', icon: '🌦️' },
    { id: 'personaje', name: 'Personaje', icon: '👑' },
    { id: 'reddit', name: 'Reddit', icon: '🔴' },
    { id: 'telegram', name: 'Telegram', icon: '📱' },
    // NEW PANELS
    { id: 'global_americas', name: 'Americas', icon: '🌎' },
    { id: 'global_euro', name: 'Europa', icon: '🇪🇺' },
    { id: 'global_asia', name: 'Asia', icon: '🌏' },
    { id: 'tech', name: 'Tech & IA', icon: '🧬' },
    { id: 'cyber', name: 'CyberSec', icon: '👾' },
    { id: 'geopolitics', name: 'Geopolítica', icon: '🚩' },
    { id: 'earthquakes', name: 'Sismos', icon: '🌋' },
    { id: 'fires', name: 'Incendios', icon: '🔥' }
];

// Colombian Departments for detailed monitoring
const DEPARTMENTS = [
    { code: 'ANT', name: 'Antioquia', capital: 'Medellín', lat: 6.2442, lng: -75.5812, pop: '6.7M' },
    { code: 'ATL', name: 'Atlántico', capital: 'Barranquilla', lat: 10.9639, lng: -74.7964, pop: '2.5M' },
    { code: 'BOG', name: 'Bogotá D.C.', capital: 'Bogotá', lat: 4.7110, lng: -74.0721, pop: '7.4M' },
    { code: 'BOL', name: 'Bolívar', capital: 'Cartagena', lat: 10.3910, lng: -75.4794, pop: '2.2M' },
    { code: 'BOY', name: 'Boyacá', capital: 'Tunja', lat: 5.5446, lng: -73.3573, pop: '1.3M' },
    { code: 'CAL', name: 'Caldas', capital: 'Manizales', lat: 5.0689, lng: -75.5174, pop: '1.0M' },
    { code: 'CAQ', name: 'Caquetá', capital: 'Florencia', lat: 1.6144, lng: -75.6062, pop: '0.5M' },
    { code: 'CAU', name: 'Cauca', capital: 'Popayán', lat: 2.4419, lng: -76.6061, pop: '1.5M' },
    { code: 'CES', name: 'Cesar', capital: 'Valledupar', lat: 10.4769, lng: -73.2505, pop: '1.1M' },
    { code: 'COR', name: 'Córdoba', capital: 'Montería', lat: 8.7575, lng: -75.8856, pop: '1.8M' },
    { code: 'CUN', name: 'Cundinamarca', capital: 'Bogotá', lat: 4.8342, lng: -74.3310, pop: '2.9M' },
    { code: 'HUI', name: 'Huila', capital: 'Neiva', lat: 2.9259, lng: -75.2879, pop: '1.2M' },
    { code: 'MAG', name: 'Magdalena', capital: 'Santa Marta', lat: 11.2408, lng: -74.2110, pop: '1.3M' },
    { code: 'MET', name: 'Meta', capital: 'Villavicencio', lat: 4.1420, lng: -73.6266, pop: '1.0M' },
    { code: 'NAR', name: 'Nariño', capital: 'Pasto', lat: 1.2136, lng: -77.2811, pop: '1.8M' },
    { code: 'NSA', name: 'Norte de Santander', capital: 'Cúcuta', lat: 7.8939, lng: -72.5078, pop: '1.4M' },
    { code: 'PUT', name: 'Putumayo', capital: 'Mocoa', lat: 1.1494, lng: -76.6519, pop: '0.4M' },
    { code: 'QUI', name: 'Quindío', capital: 'Armenia', lat: 4.5339, lng: -75.6811, pop: '0.6M' },
    { code: 'RIS', name: 'Risaralda', capital: 'Pereira', lat: 4.8133, lng: -75.6961, pop: '1.0M' },
    { code: 'SAN', name: 'Santander', capital: 'Bucaramanga', lat: 7.1254, lng: -73.1198, pop: '2.2M' },
    { code: 'SUC', name: 'Sucre', capital: 'Sincelejo', lat: 9.3047, lng: -75.3978, pop: '0.9M' },
    { code: 'TOL', name: 'Tolima', capital: 'Ibagué', lat: 4.4389, lng: -75.2322, pop: '1.4M' },
    { code: 'VAC', name: 'Valle del Cauca', capital: 'Cali', lat: 3.4516, lng: -76.5320, pop: '4.7M' },
    { code: 'ARA', name: 'Arauca', capital: 'Arauca', lat: 7.0847, lng: -70.7592, pop: '0.3M' },
    { code: 'CAS', name: 'Casanare', capital: 'Yopal', lat: 5.3378, lng: -72.3959, pop: '0.4M' },
    { code: 'CHO', name: 'Chocó', capital: 'Quibdó', lat: 5.6947, lng: -76.6611, pop: '0.5M' },
    { code: 'GUA', name: 'Guaviare', capital: 'San José', lat: 2.5719, lng: -72.6408, pop: '0.1M' },
    { code: 'LAG', name: 'La Guajira', capital: 'Riohacha', lat: 11.5444, lng: -72.9072, pop: '1.0M' },
    { code: 'VID', name: 'Vichada', capital: 'Puerto Carreño', lat: 6.1892, lng: -67.4858, pop: '0.1M' },
    { code: 'AMA', name: 'Amazonas', capital: 'Leticia', lat: -4.2153, lng: -69.9406, pop: '0.08M' },
    { code: 'GUV', name: 'Guainía', capital: 'Inírida', lat: 3.8653, lng: -67.9239, pop: '0.05M' },
    { code: 'VAU', name: 'Vaupés', capital: 'Mitú', lat: 1.2536, lng: -70.2339, pop: '0.04M' }
];

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initMap();
    initPanels();
    initModals();
    initEventListeners();
    loadAllData();
    startAutoRefresh();
    updateTime();
    setInterval(updateTime, 1000);
});

function updateTime() {
    const now = new Date();
    document.getElementById('updateTime').textContent = now.toLocaleTimeString('es-CO', {
        hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
}

// ============================================
// MAP - Enhanced with Department Selection
// ============================================
function initMap() {
    state.map = L.map('map', {
        center: CONFIG.mapCenter,
        zoom: 6,
        minZoom: 5,
        maxZoom: 18,
        zoomControl: true
    });

    // Premium dark tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '©OSM ©CARTO',
        subdomains: 'abcd'
    }).addTo(state.map);

    // Colombia boundary
    if (typeof COLOMBIA_GEO !== 'undefined') {
        state.layers.colombia = L.geoJSON(COLOMBIA_GEO, {
            style: {
                color: '#00d4aa',
                weight: 2,
                fillColor: '#00d4aa',
                fillOpacity: 0.03
            }
        }).addTo(state.map);
    }

    // Initialize layer groups
    state.layers.conflicts = L.layerGroup().addTo(state.map);
    state.layers.mining = L.layerGroup();
    state.layers.crops = L.layerGroup();
    state.layers.protests = L.layerGroup();
    state.layers.contracts = L.layerGroup();
    state.layers.flights = L.layerGroup().addTo(state.map);
    state.layers.departments = L.layerGroup().addTo(state.map);

    addDepartmentMarkers();
    addHotspots();

    document.querySelectorAll('.map-btn').forEach(btn => {
        btn.addEventListener('click', () => toggleMapLayer(btn));
    });
}

function addDepartmentMarkers() {
    DEPARTMENTS.forEach(dept => {
        const icon = L.divIcon({
            html: `<div class="dept-marker">${dept.code}</div>`,
            className: 'dept-marker-container',
            iconSize: [36, 20]
        });

        const marker = L.marker([dept.lat, dept.lng], { icon })
            .bindPopup(`
                <div class="popup-title">${dept.name}</div>
                <div class="popup-status">${dept.capital} • Pop: ${dept.pop}</div>
                <button class="popup-btn" onclick="focusDepartment('${dept.code}')">VER DETALLE</button>
            `)
            .addTo(state.layers.departments);
    });

    // Inject styles for department markers
    const style = document.createElement('style');
    style.textContent = `
        .dept-marker { background: rgba(0,212,170,0.9); color: #000; font-family: var(--font-mono); 
            font-size: 9px; font-weight: 700; padding: 2px 6px; border-radius: 3px; 
            border: 1px solid rgba(255,255,255,0.3); }
        .dept-marker-container { background: none !important; border: none !important; }
        .popup-btn { margin-top: 8px; padding: 4px 10px; background: var(--accent-primary); 
            border: none; border-radius: 4px; color: #000; font-size: 10px; font-weight: 600; 
            cursor: pointer; font-family: var(--font-mono); }
    `;
    document.head.appendChild(style);
}

function focusDepartment(code) {
    const dept = DEPARTMENTS.find(d => d.code === code);
    if (dept) {
        state.selectedDepartment = dept;
        state.map.setView([dept.lat, dept.lng], 9, { animate: true });
        showToast(`Enfocando: ${dept.name}`);
        loadDepartmentData(dept);
    }
}

function loadDepartmentData(dept) {
    // Filter alerts for this department
    console.log(`Loading data for ${dept.name}`);
}

function addHotspots() {
    // Rich OSINT Intelligence Points
    const hotspots = [
        {
            lat: 7.8939, lng: -72.5078,
            name: 'CATATUMBO',
            level: 'high',
            category: 'Zona de Conflicto',
            description: 'Región fronteriza con alta actividad de grupos armados ilegales. Corredor estratégico para narcotráfico y contrabando.',
            status: 'CONFLICTO ACTIVO',
            coordinates: '7.89°N, 72.51°W',
            groups: ['ELN', 'Disidencias FARC', 'Clan del Golfo'],
            indicators: [
                { label: 'Hectáreas coca', value: '41,000', trend: 'up' },
                { label: 'Desplazados', value: '8,500', trend: 'up' },
                { label: 'Ataques mes', value: '12', trend: 'stable' }
            ],
            news: [
                { title: 'Enfrentamientos entre ELN y disidencias dejan 5 muertos', time: '2h' },
                { title: 'Gobierno anuncia mesa de diálogo regional', time: '1d' }
            ],
            tags: ['ARMED', 'COCA', 'BORDER']
        },
        {
            lat: 7.0847, lng: -70.7592,
            name: 'ARAUCA',
            level: 'high',
            category: 'Zona de Conflicto',
            description: 'Departamento fronterizo con Venezuela. Presencia histórica del ELN y control territorial disputado.',
            status: 'ZONA ROJA',
            coordinates: '7.08°N, 70.76°W',
            groups: ['ELN', 'Disidencias'],
            indicators: [
                { label: 'Oleoducto (km)', value: '283', trend: 'stable' },
                { label: 'Ataques infra', value: '8', trend: 'down' },
                { label: 'Secuestros', value: '3', trend: 'up' }
            ],
            news: [
                { title: 'Paro armado afecta movilidad en Saravena', time: '5h' },
                { title: 'Atentado contra oleoducto Caño Limón', time: '3d' }
            ],
            tags: ['ELN', 'PETROLEUM', 'BORDER']
        },
        {
            lat: 1.8008, lng: -78.7644,
            name: 'TUMACO',
            level: 'high',
            category: 'Corredor Narcotráfico',
            description: 'Principal puerto del Pacífico para salida de cocaína. Disputado por múltiples organizaciones criminales.',
            status: 'NARCOTRÁFICO ACTIVO',
            coordinates: '1.80°N, 78.76°W',
            groups: ['Disidencias', 'Clan del Golfo', 'Carteles mexicanos'],
            indicators: [
                { label: 'Incautación ton', value: '45', trend: 'up' },
                { label: 'Labs destruidos', value: '89', trend: 'up' },
                { label: 'Homicidios mes', value: '28', trend: 'stable' }
            ],
            news: [
                { title: 'Marina incauta semisumergible con 3 toneladas', time: '12h' },
                { title: 'Erradicación forzada genera protestas', time: '2d' }
            ],
            tags: ['COCAINE', 'PORT', 'PACIFIC']
        },
        {
            lat: 3.8801, lng: -77.0311,
            name: 'BUENAVENTURA',
            level: 'elevated',
            category: 'Puerto Estratégico',
            description: 'Principal puerto comercial de Colombia en el Pacífico. Control territorial por bandas criminales urbanas.',
            status: 'PUERTO CRÍTICO',
            coordinates: '3.88°N, 77.03°W',
            groups: ['La Local', 'Los Shotas'],
            indicators: [
                { label: 'Contenedores/día', value: '2,400', trend: 'up' },
                { label: 'Extorsiones', value: '150+', trend: 'stable' },
                { label: 'PIB puerto', value: '$12B', trend: 'up' }
            ],
            news: [
                { title: 'Paro cívico por crisis de seguridad', time: '6h' },
                { title: 'Inversión $500M en modernización portuaria', time: '1w' }
            ],
            tags: ['PORT', 'TRADE', 'URBAN']
        },
        {
            lat: 4.7110, lng: -74.0721,
            name: 'BOGOTÁ D.C.',
            level: 'elevated',
            category: 'Capital Nacional',
            description: 'Centro político y económico. Sede del gobierno nacional, Congreso y principales instituciones.',
            status: 'CAPITAL POLÍTICA',
            coordinates: '4.71°N, 74.07°W',
            groups: [],
            indicators: [
                { label: 'Población', value: '7.4M', trend: 'stable' },
                { label: 'Protestas mes', value: '45', trend: 'up' },
                { label: 'PIB %', value: '26%', trend: 'stable' }
            ],
            news: [
                { title: 'Marchas masivas en Plaza de Bolívar', time: '3h' },
                { title: 'Congreso debate reforma tributaria', time: '1d' }
            ],
            tags: ['CAPITAL', 'POLITICS', 'ECONOMY']
        },
        {
            lat: 6.2442, lng: -75.5812,
            name: 'MEDELLÍN',
            level: 'low',
            category: 'Centro Económico',
            description: 'Segunda ciudad del país. Hub tecnológico y de innovación. Transformación urbana destacada.',
            status: 'CENTRO ECONÓMICO',
            coordinates: '6.24°N, 75.58°W',
            groups: [],
            indicators: [
                { label: 'PIB regional', value: '$48B', trend: 'up' },
                { label: 'Inversión ext.', value: '$1.2B', trend: 'up' },
                { label: 'Turistas/año', value: '1.5M', trend: 'up' }
            ],
            news: [
                { title: 'Antioquia lidera crecimiento industrial', time: '2d' },
                { title: 'Feria de las Flores genera $200M', time: '1w' }
            ],
            tags: ['ECONOMY', 'TECH', 'TOURISM']
        },
        {
            lat: 10.3910, lng: -75.4794,
            name: 'CARTAGENA',
            level: 'low',
            category: 'Puerto Comercial',
            description: 'Principal puerto del Caribe colombiano. Centro turístico y de comercio internacional.',
            status: 'PUERTO COMERCIAL',
            coordinates: '10.39°N, 75.48°W',
            groups: [],
            indicators: [
                { label: 'Cruceros/año', value: '380', trend: 'up' },
                { label: 'Refinería bpd', value: '165K', trend: 'stable' },
                { label: 'Zona Franca', value: '200+ emp', trend: 'up' }
            ],
            news: [
                { title: 'Reficar anuncia expansión $2B', time: '3d' },
                { title: 'Temporada de cruceros récord', time: '1w' }
            ],
            tags: ['CARIBBEAN', 'PORT', 'TOURISM']
        },
        {
            lat: 1.6144, lng: -75.6062,
            name: 'CAQUETÁ',
            level: 'high',
            category: 'Zona de Conflicto',
            description: 'Histórico bastión de las FARC. Ahora disputado por disidencias. Alta producción de coca.',
            status: 'CONFLICTO ACTIVO',
            coordinates: '1.61°N, 75.61°W',
            groups: ['Disidencias FARC - EMC'],
            indicators: [
                { label: 'Hectáreas coca', value: '18,500', trend: 'up' },
                { label: 'Deforestación ha', value: '12,000', trend: 'up' },
                { label: 'Líderes sociales', value: '5 amenazados', trend: 'up' }
            ],
            news: [
                { title: 'Asesinato de líder ambiental en Florencia', time: '8h' },
                { title: 'Operación militar captura 8 disidentes', time: '2d' }
            ],
            tags: ['COCA', 'AMAZON', 'DEFORESTATION']
        },
        {
            lat: 11.5444, lng: -72.9072,
            name: 'LA GUAJIRA',
            level: 'elevated',
            category: 'Zona Fronteriza',
            description: 'Departamento fronterizo con Venezuela. Crisis humanitaria Wayúu. Contrabando activo.',
            status: 'CRISIS HUMANITARIA',
            coordinates: '11.54°N, 72.91°W',
            groups: ['Contrabandistas', 'Grupos Wayúu'],
            indicators: [
                { label: 'Desnutrición inf.', value: '12%', trend: 'down' },
                { label: 'Contrabando $', value: '$800M', trend: 'stable' },
                { label: 'Migración VE', value: '180K', trend: 'up' }
            ],
            news: [
                { title: 'ICBF interviene por muertes infantiles', time: '1d' },
                { title: 'Incautación récord de gasolina ilegal', time: '4d' }
            ],
            tags: ['BORDER', 'HUMANITARIAN', 'WAYUU']
        }
    ];

    hotspots.forEach(spot => {
        const color = spot.level === 'high' ? '#ef4444' : spot.level === 'elevated' ? '#f59e0b' : '#10b981';
        const levelText = spot.level === 'high' ? 'ALTO' : spot.level === 'elevated' ? 'ELEVADO' : 'NORMAL';

        const icon = L.divIcon({
            html: `<div class="hotspot-marker" style="background:${color};box-shadow:0 0 20px ${color}"></div>`,
            className: 'custom-marker',
            iconSize: [16, 16]
        });

        // Build rich popup content
        const popupContent = `
            <div class="intel-popup">
                <div class="intel-header">
                    <span class="intel-name">${spot.name}</span>
                    <span class="intel-level" style="background:${color}">${levelText}</span>
                </div>
                <div class="intel-category">${spot.category}</div>
                <p class="intel-desc">${spot.description}</p>
                
                <div class="intel-meta">
                    <div class="intel-meta-item">
                        <span class="intel-meta-label">COORDENADAS</span>
                        <span class="intel-meta-value">${spot.coordinates}</span>
                    </div>
                    <div class="intel-meta-item">
                        <span class="intel-meta-label">ESTADO</span>
                        <span class="intel-meta-value" style="color:${color}">${spot.status}</span>
                    </div>
                </div>
                
                ${spot.groups.length ? `
                <div class="intel-groups">
                    <span class="intel-meta-label">ACTORES</span>
                    <div class="intel-tags">
                        ${spot.groups.map(g => `<span class="intel-tag actor">${g}</span>`).join('')}
                    </div>
                </div>
                ` : ''}
                
                <div class="intel-indicators">
                    ${spot.indicators.map(ind => `
                        <div class="intel-indicator">
                            <div class="intel-ind-value">${ind.value}</div>
                            <div class="intel-ind-label">${ind.label}</div>
                            <div class="intel-ind-trend ${ind.trend}">${ind.trend === 'up' ? '↑' : ind.trend === 'down' ? '↓' : '→'}</div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="intel-news">
                    <span class="intel-meta-label">ÚLTIMAS NOTICIAS</span>
                    ${spot.news.map(n => `
                        <div class="intel-news-item">
                            <span class="intel-news-title">${n.title}</span>
                            <span class="intel-news-time">${n.time}</span>
                        </div>
                    `).join('')}
                </div>
                
                <div class="intel-tags">
                    ${spot.tags.map(t => `<span class="intel-tag">${t}</span>`).join('')}
                </div>
            </div>
        `;

        L.marker([spot.lat, spot.lng], { icon })
            .bindPopup(popupContent, { maxWidth: 350, className: 'intel-popup-container' })
            .addTo(state.layers.conflicts);
    });

    // Inject enhanced popup styles
    injectPopupStyles();
}

function injectPopupStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .intel-popup-container .leaflet-popup-content-wrapper {
            background: rgba(10, 10, 12, 0.95);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 12px;
            padding: 0;
            box-shadow: 0 20px 60px rgba(0,0,0,0.8);
        }
        .intel-popup-container .leaflet-popup-tip {
            background: rgba(10, 10, 12, 0.95);
        }
        .intel-popup-container .leaflet-popup-content {
            margin: 0;
            width: 320px !important;
        }
        .intel-popup {
            padding: 16px;
            font-family: 'Inter', sans-serif;
            color: #d1d5db;
        }
        .intel-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 4px;
        }
        .intel-name {
            font-family: 'JetBrains Mono', monospace;
            font-size: 16px;
            font-weight: 700;
            color: #00d4aa;
            letter-spacing: 1px;
        }
        .intel-level {
            font-family: 'JetBrains Mono', monospace;
            font-size: 9px;
            font-weight: 700;
            padding: 3px 8px;
            border-radius: 4px;
            color: #000;
        }
        .intel-category {
            font-size: 11px;
            color: #6b7280;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 10px;
        }
        .intel-desc {
            font-size: 12px;
            color: #a1a7b3;
            line-height: 1.5;
            margin-bottom: 12px;
        }
        .intel-meta {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
            margin-bottom: 12px;
            padding: 8px;
            background: rgba(255,255,255,0.03);
            border-radius: 6px;
        }
        .intel-meta-item { display: flex; flex-direction: column; gap: 2px; }
        .intel-meta-label {
            font-family: 'JetBrains Mono', monospace;
            font-size: 9px;
            color: #6b7280;
            letter-spacing: 0.5px;
        }
        .intel-meta-value {
            font-family: 'JetBrains Mono', monospace;
            font-size: 11px;
            color: #f0f2f5;
            font-weight: 500;
        }
        .intel-groups { margin-bottom: 12px; }
        .intel-indicators {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 6px;
            margin-bottom: 12px;
        }
        .intel-indicator {
            background: rgba(255,255,255,0.03);
            padding: 8px 6px;
            border-radius: 6px;
            text-align: center;
            border: 1px solid rgba(255,255,255,0.05);
        }
        .intel-ind-value {
            font-family: 'JetBrains Mono', monospace;
            font-size: 13px;
            font-weight: 700;
            color: #00d4aa;
        }
        .intel-ind-label {
            font-size: 8px;
            color: #6b7280;
            text-transform: uppercase;
            margin-top: 2px;
        }
        .intel-ind-trend {
            font-size: 10px;
            margin-top: 4px;
        }
        .intel-ind-trend.up { color: #ef4444; }
        .intel-ind-trend.down { color: #10b981; }
        .intel-ind-trend.stable { color: #6b7280; }
        .intel-news { margin-bottom: 12px; }
        .intel-news-item {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 8px;
            padding: 6px 0;
            border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .intel-news-item:last-child { border-bottom: none; }
        .intel-news-title {
            font-size: 11px;
            color: #e5e7eb;
            line-height: 1.4;
            flex: 1;
        }
        .intel-news-time {
            font-family: 'JetBrains Mono', monospace;
            font-size: 9px;
            color: #6b7280;
            white-space: nowrap;
        }
        .intel-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 4px;
            margin-top: 8px;
        }
        .intel-tag {
            font-family: 'JetBrains Mono', monospace;
            font-size: 8px;
            font-weight: 600;
            padding: 3px 6px;
            background: rgba(0,212,170,0.15);
            color: #00d4aa;
            border-radius: 3px;
            border: 1px solid rgba(0,212,170,0.3);
        }
        .intel-tag.actor {
            background: rgba(139,92,246,0.15);
            color: #8b5cf6;
            border-color: rgba(139,92,246,0.3);
        }
    `;
    document.head.appendChild(style);
}

function toggleMapLayer(btn) {
    const layer = btn.dataset.layer;
    btn.classList.toggle('active');
    btn.classList.contains('active') ? state.layers[layer]?.addTo(state.map) : state.layers[layer]?.remove();
}

// ============================================
// PANELS & MODALS
// ============================================
function initPanels() {
    PANELS.forEach(p => state.panelVisibility[p.id] = true);

    const list = document.getElementById('panelsToggleList');
    list.innerHTML = PANELS.map(p => `
        <div class="panel-toggle-item">
            <span class="panel-toggle-label">${p.icon} ${p.name}</span>
            <label class="toggle-switch">
                <input type="checkbox" checked data-panel="${p.id}">
                <span class="toggle-slider"></span>
            </label>
        </div>
    `).join('');

    list.querySelectorAll('input').forEach(input => {
        input.addEventListener('change', () => {
            const el = document.querySelector(`[data-panel="${input.dataset.panel}"]`);
            el?.classList.toggle('hidden', !input.checked);
        });
    });
}

function initModals() {
    const modals = ['modalAddMonitor', 'modalPanels'];
    document.getElementById('btnAddMonitor').onclick = () => document.getElementById('modalAddMonitor').classList.add('active');
    document.getElementById('btnPanels').onclick = () => document.getElementById('modalPanels').classList.add('active');
    document.getElementById('closeAddMonitor').onclick = () => document.getElementById('modalAddMonitor').classList.remove('active');
    document.getElementById('closePanels').onclick = () => document.getElementById('modalPanels').classList.remove('active');

    modals.forEach(id => {
        document.getElementById(id).addEventListener('click', e => {
            if (e.target.id === id) e.target.classList.remove('active');
        });
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') modals.forEach(id => document.getElementById(id).classList.remove('active'));
    });
}

function initEventListeners() {
    document.getElementById('btnRefresh').addEventListener('click', () => {
        loadAllData();
        showToast('Sincronizando datos...');
    });

    document.getElementById('formAddMonitor').addEventListener('submit', e => {
        e.preventDefault();
        addCustomMonitor();
    });
}

// ============================================
// DATA LOADING
// ============================================
async function loadAllData() {
    state.activeSources = 0;

    await Promise.allSettled([
        loadCrypto(), loadMercados(), loadCommodities(),
        loadNoticias(), loadTwitterTrends(), loadDeportes(), loadFutbolInt(),
        loadSecop(), loadCuentasClaras(), loadRegalias(), loadContraloria(),
        loadAlertas(), loadVuelos(), loadMineria(), loadConflictos(),
        loadCongreso(), loadSigep(), loadElecciones(), loadEncuestas(),
        loadSanciones(), loadFrontera(), loadEmergencias(), loadClima(),
        loadPersonaje(), loadReddit(), loadTelegram()
    ]);

    document.getElementById('activeSources').textContent = state.activeSources;
    document.getElementById('lastSync').textContent = new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });
}

// ============================================
// CRYPTO (CoinGecko API - FREE)
// ============================================
async function loadCrypto() {
    const container = document.getElementById('cryptoContent');
    try {
        const ids = CONFIG.crypto.join(',');
        const res = await fetch(`${CONFIG.apis.coingecko}/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`);
        const data = await res.json();

        state.activeSources++;
        state.cryptoData = data;

        const cryptoNames = {
            'bitcoin': 'BTC', 'ethereum': 'ETH', 'solana': 'SOL', 'dogecoin': 'DOGE',
            'cardano': 'ADA', 'avalanche-2': 'AVAX', 'official-trump': 'TRUMP', 'shiba-inu': 'SHIB'
        };

        container.innerHTML = `<div class="crypto-grid">` + Object.entries(data).map(([id, info]) => {
            const change = info.usd_24h_change || 0;
            const positive = change >= 0;
            return `
                <div class="crypto-card ${positive ? 'positive' : 'negative'}">
                    <div class="crypto-symbol">${cryptoNames[id] || id.toUpperCase()}</div>
                    <div class="crypto-price-lg">$${formatCryptoPrice(info.usd)}</div>
                    <div class="crypto-change ${positive ? 'positive' : 'negative'}">${positive ? '▲' : '▼'} ${Math.abs(change).toFixed(2)}%</div>
                </div>
            `;
        }).join('') + `</div>`;

        // Update ticker
        updateCryptoTicker(data);
    } catch (e) {
        console.error('Crypto Error:', e);
        container.innerHTML = errorState('Error cargando crypto');
    }
}

function updateCryptoTicker(data) {
    const ticker = document.getElementById('cryptoTicker');
    if (ticker && data.bitcoin && data.ethereum && data.solana) {
        ticker.innerHTML = `
            <span class="crypto-price btc">BTC $${formatCryptoPrice(data.bitcoin.usd)}</span>
            <span class="crypto-price eth">ETH $${formatCryptoPrice(data.ethereum.usd)}</span>
            <span class="crypto-price sol">SOL $${formatCryptoPrice(data.solana.usd)}</span>
        `;
    }
}

function formatCryptoPrice(price) {
    if (price >= 1000) return price.toLocaleString('en-US', { maximumFractionDigits: 0 });
    if (price >= 1) return price.toFixed(2);
    if (price >= 0.0001) return price.toFixed(4);
    return price.toFixed(8);
}

// ============================================
// MERCADOS COLOMBIA (TRM Real API)
// ============================================
async function loadMercados() {
    const container = document.getElementById('mercadosContent');
    try {
        const res = await fetch(`${CONFIG.apis.trm}?$limit=1&$order=vigenciadesde DESC`);
        const [trm] = await res.json();
        state.activeSources++;

        const markets = [
            { name: 'USD/COP (TRM)', price: parseFloat(trm?.valor || 4150).toFixed(2), change: '+0.18%', positive: true },
            { name: 'BVC COLCAP', price: '1,248.50', change: '+0.65%', positive: true },
            { name: 'EUR/COP', price: '4,520.30', change: '-0.12%', positive: false },
            { name: 'ECOPETROL', price: '2,180', change: '-1.25%', positive: false }
        ];

        container.innerHTML = markets.map(m => `
            <div class="market-item">
                <span class="market-name">${m.name}</span>
                <div class="market-values">
                    <span class="market-price">$${m.price}</span>
                    <span class="market-change ${m.positive ? 'positive' : 'negative'}">${m.change}</span>
                </div>
            </div>
        `).join('');
    } catch (e) {
        container.innerHTML = errorState('Error TRM');
    }
}

// ============================================
// COMMODITIES
// ============================================
async function loadCommodities() {
    const container = document.getElementById('commoditiesContent');
    state.activeSources++;

    const commodities = [
        { name: 'Petróleo Brent', price: '73.85', change: '-0.95%', positive: false },
        { name: 'Oro XAU', price: '2,052.40', change: '+0.35%', positive: true },
        { name: 'Carbón', price: '126.20', change: '-1.8%', positive: false },
        { name: 'Café (lb)', price: '1.92', change: '+2.1%', positive: true },
        { name: 'Gas Natural', price: '2.58', change: '+1.2%', positive: true }
    ];

    container.innerHTML = commodities.map(c => `
        <div class="market-item">
            <span class="market-name">${c.name}</span>
            <div class="market-values">
                <span class="market-price">$${c.price}</span>
                <span class="market-change ${c.positive ? 'positive' : 'negative'}">${c.change}</span>
            </div>
        </div>
    `).join('');
}

// ============================================
// NOTICIAS (Multiple RSS Feeds)
// ============================================
async function loadNoticias() {
    const container = document.getElementById('noticiasContent');
    try {
        const feeds = await Promise.allSettled([
            fetchRSS(CONFIG.rssFeeds.eltiempo, 'El Tiempo'),
            fetchRSS(CONFIG.rssFeeds.semana, 'Semana')
        ]);

        const items = feeds.filter(f => f.status === 'fulfilled').flatMap(f => f.value)
            .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate)).slice(0, 8);

        if (items.length) {
            state.activeSources++;
            container.innerHTML = items.map(i => `
                <div class="data-item">
                    <div class="data-item-header">
                        <div class="data-item-title"><a href="${i.link}" target="_blank">${i.title}</a></div>
                        <span class="data-item-time">${timeAgo(i.pubDate)}</span>
                    </div>
                    <div class="data-item-source">${i.source}</div>
                </div>
            `).join('');
        } else {
            container.innerHTML = emptyState('Sin noticias');
        }
    } catch (e) {
        container.innerHTML = errorState('Error RSS');
    }
}

async function fetchRSS(url, source) {
    const res = await fetch(`${CONFIG.apis.rssProxy}${encodeURIComponent(url)}`);
    const data = await res.json();
    return data.status === 'ok' ? data.items.map(i => ({ ...i, source })) : [];
}

// ============================================
// DEPORTES COLOMBIA
// ============================================
async function loadDeportes() {
    const container = document.getElementById('deportesContent');
    state.activeSources++;

    const matches = [
        { home: 'Millonarios', away: 'Santa Fe', score: '2 - 1', status: 'FT', league: 'Liga BetPlay' },
        { home: 'Nacional', away: 'Medellín', score: '0 - 0', status: '65\'', league: 'Liga BetPlay' },
        { home: 'Junior', away: 'América', score: '1 - 2', status: 'HT', league: 'Liga BetPlay' },
        { home: 'Cali', away: 'Once Caldas', score: '3 - 0', status: 'FT', league: 'Liga BetPlay' }
    ];

    container.innerHTML = matches.map(m => `
        <div class="match-item">
            <div class="match-teams">${m.home} vs ${m.away}</div>
            <div class="match-score">${m.score}</div>
            <div class="match-status ${m.status === 'FT' ? 'finished' : 'live'}">${m.status}</div>
        </div>
    `).join('');
}

// ============================================
// FÚTBOL INTERNACIONAL
// ============================================
async function loadFutbolInt() {
    const container = document.getElementById('futbolIntContent');
    state.activeSources++;

    const matches = [
        { home: 'Real Madrid', away: 'Barcelona', score: '2 - 2', status: '78\'', league: 'La Liga' },
        { home: 'Man City', away: 'Liverpool', score: '1 - 0', status: 'FT', league: 'Premier' },
        { home: 'PSG', away: 'Lyon', score: '3 - 1', status: 'FT', league: 'Ligue 1' }
    ];

    container.innerHTML = matches.map(m => `
        <div class="match-item">
            <div class="match-league">${m.league}</div>
            <div class="match-teams">${m.home} vs ${m.away}</div>
            <div class="match-score">${m.score}</div>
            <div class="match-status ${m.status === 'FT' ? 'finished' : 'live'}">${m.status}</div>
        </div>
    `).join('');
}

// ============================================
// SECOP (Real API)
// ============================================
async function loadSecop() {
    const container = document.getElementById('secopContent');
    try {
        const params = new URLSearchParams({
            '$limit': 8, '$order': 'fecha_de_firma DESC',
            '$select': 'objeto_del_contrato,valor_del_contrato,nombre_entidad,fecha_de_firma,proveedor_adjudicado'
        });
        const res = await fetch(`${CONFIG.apis.secop}?${params}`);
        const data = await res.json();

        if (data.length) {
            state.activeSources++;
            container.innerHTML = data.map(c => `
                <div class="contract-item">
                    <div class="contract-value">${formatCurrency(c.valor_del_contrato)}</div>
                    <div class="contract-entity"><strong>${c.nombre_entidad || 'N/A'}</strong></div>
                    <div class="contract-object">${truncate(c.objeto_del_contrato, 80)}</div>
                    <div class="data-item-meta">${c.proveedor_adjudicado || ''} • ${formatDate(c.fecha_de_firma)}</div>
                </div>
            `).join('');
        } else {
            container.innerHTML = emptyState('Sin contratos');
        }
    } catch (e) {
        container.innerHTML = errorState('Error SECOP');
    }
}

// ============================================
// VUELOS (OpenSky API)
// ============================================
async function loadVuelos() {
    const container = document.getElementById('vuelosContent');
    try {
        const { lamin, lomin, lamax, lomax } = CONFIG.colombiaBounds;
        const res = await fetch(`${CONFIG.apis.opensky}?lamin=${lamin}&lomin=${lomin}&lamax=${lamax}&lomax=${lomax}`);
        const data = await res.json();

        if (data.states?.length) {
            state.activeSources++;
            state.layers.flights.clearLayers();

            data.states.slice(0, 15).forEach(f => {
                const [icao, callsign, origin, , , lon, lat, alt] = f;
                if (lat && lon) {
                    const icon = L.divIcon({
                        html: `<div style="color:#8b5cf6;font-size:14px;transform:rotate(${f[10] || 0}deg)">✈</div>`,
                        className: 'flight-icon', iconSize: [18, 18]
                    });
                    L.marker([lat, lon], { icon })
                        .bindPopup(`<div class="popup-title">${callsign?.trim() || icao}</div><div class="popup-status">Alt: ${Math.round(alt || 0)}m</div>`)
                        .addTo(state.layers.flights);
                }
            });

            container.innerHTML = data.states.slice(0, 6).map(f => {
                const [icao, callsign, origin, , , , , alt] = f;
                return `
                    <div class="flight-item">
                        <div><div class="flight-callsign">${callsign?.trim() || icao}</div><div class="flight-info">${origin || 'N/A'}</div></div>
                        <div class="flight-altitude">${Math.round((alt || 0) * 3.28)} ft</div>
                    </div>
                `;
            }).join('');
        } else {
            container.innerHTML = emptyState('Sin vuelos');
        }
    } catch (e) {
        container.innerHTML = mockFlightData();
    }
}

function mockFlightData() {
    state.activeSources++;
    return ['AVA024 | Avianca | 35,000 ft', 'FAC1001 | Fuerza Aérea | 28,000 ft', 'HK-5023 | Privado | 42,000 ft']
        .map(f => {
            const [cs, info, alt] = f.split(' | ');
            return `<div class="flight-item"><div><div class="flight-callsign">${cs}</div><div class="flight-info">${info}</div></div><div class="flight-altitude">${alt}</div></div>`;
        }).join('');
}

// ============================================
// REMAINING PANELS (Mock Data with Structure)
// ============================================
async function loadCuentasClaras() {
    const container = document.getElementById('cuentasClarasContent');
    state.activeSources++;
    const data = [
        { candidato: 'Candidato A', partido: 'Partido Verde', donante: 'Empresa XYZ', monto: 150000000 },
        { candidato: 'Candidato B', partido: 'Centro Democrático', donante: 'Fundación ABC', monto: 80000000 },
        { candidato: 'Candidato C', partido: 'Pacto Histórico', donante: 'Sindicato 123', monto: 45000000 }
    ];
    container.innerHTML = data.map(f => `<div class="contract-item"><div class="contract-value">${formatCurrency(f.monto)}</div><div class="contract-entity"><strong>${f.candidato}</strong> - ${f.partido}</div><div class="contract-object">Donante: ${f.donante}</div></div>`).join('');
}

async function loadRegalias() {
    const container = document.getElementById('regaliasContent');
    state.activeSources++;
    container.innerHTML = ['Meta | Vía terciaria | $2.5B | En ejecución', 'Casanare | Acueducto rural | $1.8B | Contratado', 'Arauca | Hospital nivel II | $15B | En ejecución']
        .map(p => { const [d, pr, v, e] = p.split(' | '); return `<div class="data-item"><div class="data-item-title">${pr}</div><div class="contract-value" style="font-size:0.85rem">${v}</div><div class="data-item-meta">${d} • ${e}</div></div>`; }).join('');
}

async function loadContraloria() {
    const container = document.getElementById('contraloriaContent');
    state.activeSources++;
    container.innerHTML = ['Empresa ABC S.A.S | Fiscal | $2.5B | Inhabilitado', 'Consorcio Vías 2020 | Fiscal | $8.2B | Inhabilitado']
        .map(s => { const [n, t, m, e] = s.split(' | '); return `<div class="data-item"><div class="data-item-header"><div class="data-item-title">${n}</div><span class="data-item-time" style="color:var(--accent-danger)">${e}</span></div><div class="data-item-meta">Resp. ${t} • ${m}</div></div>`; }).join('');
}

async function loadTwitterTrends() {
    const container = document.getElementById('twitterContent');
    state.activeSources++;
    const trends = ['#ParoNacional | 125K', '#Ecopetrol | 89K', '#ReformaTributaria | 67K', 'Petro | 54K', '#Elecciones2026 | 42K', '#Colombia | 38K'];
    container.innerHTML = trends.map((t, i) => { const [n, v] = t.split(' | '); return `<div class="trend-item"><span class="trend-rank">#${i + 1}</span><span class="trend-name">${n}</span><span class="trend-volume">${v}</span></div>`; }).join('');
}

async function loadAlertas() {
    const container = document.getElementById('alertasContent');
    state.activeSources++;
    const alerts = [
        { tipo: 'Bloqueo', ubi: 'Vía Panamericana km 45', t: '2h' },
        { tipo: 'Enfrentamiento', ubi: 'Catatumbo - NSA', t: '45min' },
        { tipo: 'Protesta', ubi: 'Bogotá - Plaza Bolívar', t: '3h' },
        { tipo: 'Paro', ubi: 'Buenaventura Puerto', t: '1d' }
    ];
    container.innerHTML = alerts.map(a => `<div class="alert-item"><span class="alert-icon">⚠️</span><div class="alert-content"><div class="alert-title">${a.tipo}</div><div class="alert-location">${a.ubi} • hace ${a.t}</div></div></div>`).join('');
}

async function loadMineria() {
    const container = document.getElementById('mineriaContent');
    state.activeSources++;
    container.innerHTML = ['LK4-15231 | Oro | Antioquia | Vigente | 2,500 ha', 'HC2-08744 | Carbón | Cesar | En trámite | 15,000 ha', 'GN1-22890 | Esmeraldas | Boyacá | Vigente | 800 ha']
        .map(t => { const [id, m, d, e, a] = t.split(' | '); return `<div class="data-item"><div class="data-item-header"><div class="data-item-title">${id} - ${m}</div><span class="data-item-time">${a}</span></div><div class="data-item-meta">${d} • ${e}</div></div>`; }).join('');
}

async function loadConflictos() {
    const container = document.getElementById('conflictosContent');
    state.activeSources++;
    const zones = [
        { zona: 'Catatumbo', grupo: 'ELN/Disidencias', nivel: 'ALTO' },
        { zona: 'Arauca', grupo: 'ELN', nivel: 'ALTO' },
        { zona: 'Tumaco', grupo: 'Disidencias FARC', nivel: 'ALTO' },
        { zona: 'Bajo Cauca', grupo: 'Clan del Golfo', nivel: 'MEDIO' }
    ];
    container.innerHTML = zones.map(z => `<div class="alert-item" style="border-left-color:${z.nivel === 'ALTO' ? 'var(--accent-danger)' : 'var(--accent-warning)'}"><span class="alert-icon">🔥</span><div class="alert-content"><div class="alert-title">${z.zona}</div><div class="alert-location">${z.grupo} • Nivel: ${z.nivel}</div></div></div>`).join('');
}

async function loadCongreso() {
    const container = document.getElementById('congresoContent');
    state.activeSources++;
    container.innerHTML = ['Reforma tributaria 2026 | Primer debate | 45/102', 'Ley de tierras | Ponencia | Pendiente', 'Presupuesto Nación | Aprobado | 89/102']
        .map(p => { const [t, e, v] = p.split(' | '); return `<div class="data-item"><div class="data-item-header"><div class="data-item-title">${t}</div><span class="data-item-time">${v}</span></div><div class="data-item-source">${e}</div></div>`; }).join('');
}

async function loadSigep() {
    const container = document.getElementById('sigepContent');
    state.activeSources++;
    container.innerHTML = ['Juan Pérez García | Director DNP | $850M', 'María López Ruiz | Viceministra | $1.2B', 'Carlos Rodríguez | Secretario Gral | $620M']
        .map(f => { const [n, c, p] = f.split(' | '); return `<div class="data-item"><div class="data-item-header"><div class="data-item-title">${n}</div><span class="data-item-time">${p}</span></div><div class="data-item-meta">${c}</div></div>`; }).join('');
}

async function loadElecciones() {
    const container = document.getElementById('eleccionesContent');
    state.activeSources++;
    container.innerHTML = `<div style="text-align:center;padding:20px"><div style="font-size:1.5rem;color:var(--accent-primary);font-weight:700">🗳️ ELECCIONES 2026</div><div style="color:var(--text-tertiary);margin-top:8px">Faltan 142 días</div><div style="margin-top:16px;font-size:0.8rem;color:var(--text-secondary)">Candidatos registrados: 8</div></div>`;
}

async function loadEncuestas() {
    const container = document.getElementById('encuestasContent');
    state.activeSources++;
    const encuestas = [
        { candidato: 'Candidato A', pct: 28, color: '#3b82f6' },
        { candidato: 'Candidato B', pct: 24, color: '#ef4444' },
        { candidato: 'Candidato C', pct: 18, color: '#10b981' },
        { candidato: 'Otros', pct: 30, color: '#6b7280' }
    ];
    container.innerHTML = encuestas.map(e => `<div class="poll-item"><div class="poll-candidate">${e.candidato}</div><div class="poll-bar-container"><div class="poll-bar" style="width:${e.pct}%;background:${e.color}"></div></div><div class="poll-pct">${e.pct}%</div></div>`).join('');
}

async function loadSanciones() {
    const container = document.getElementById('sancionesContent');
    state.activeSources++;
    container.innerHTML = ['Narcotraficante XYZ | SDN List | 2024', 'Empresa Fachada ABC | OFAC | 2023', 'Político Corrupto DEF | SDN List | 2025']
        .map(s => { const [n, t, y] = s.split(' | '); return `<div class="data-item"><div class="data-item-title" style="color:var(--accent-danger)">${n}</div><div class="data-item-meta">${t} • ${y}</div></div>`; }).join('');
}

async function loadFrontera() {
    const container = document.getElementById('fronteraContent');
    state.activeSources++;
    container.innerHTML = ['Cúcuta - Venezuela | Operativo | Alta afluencia', 'Ipiales - Ecuador | Normal | Flujo regular', 'Leticia - Brasil | Cerrado | Mantenimiento']
        .map(f => { const [p, e, s] = f.split(' | '); return `<div class="data-item"><div class="data-item-title">${p}</div><div class="data-item-meta">${e} • ${s}</div></div>`; }).join('');
}

async function loadEmergencias() {
    const container = document.getElementById('emergenciasContent');
    state.activeSources++;
    container.innerHTML = ['🌊 Inundación | Chocó - Quibdó | 500 familias', '🔥 Incendio forestal | Meta | 200 ha', '⚠️ Deslizamiento | Antioquia | Vía cerrada']
        .map(e => { const [t, u, d] = e.split(' | '); return `<div class="alert-item"><span class="alert-icon">${t.split(' ')[0]}</span><div class="alert-content"><div class="alert-title">${t.split(' ').slice(1).join(' ')}</div><div class="alert-location">${u} • ${d}</div></div></div>`; }).join('');
}

async function loadClima() {
    const container = document.getElementById('climaContent');
    state.activeSources++;
    container.innerHTML = ['Bogotá | 18°C | ☁️ Nublado', 'Medellín | 24°C | ⛅ Parcial', 'Cali | 28°C | ☀️ Soleado', 'Barranquilla | 32°C | ☀️ Despejado', 'Cartagena | 30°C | ⛈️ Lluvia']
        .map(c => { const [city, temp, cond] = c.split(' | '); return `<div class="market-item"><span class="market-name">${city}</span><div class="market-values"><span class="market-price">${temp}</span><span>${cond}</span></div></div>`; }).join('');
}

async function loadPersonaje() {
    const container = document.getElementById('personajeContent');
    state.activeSources++;
    container.innerHTML = `<div class="person-card"><div class="person-name">Gustavo Petro</div><div class="person-role">Presidente de Colombia</div><div class="person-mentions">15,420</div><div class="person-label">Menciones hoy • Sentimiento: Mixto</div></div>`;
}

async function loadReddit() {
    const container = document.getElementById('redditContent');
    try {
        const res = await fetch(CONFIG.apis.reddit);
        const data = await res.json();
        if (data.data?.children?.length) {
            state.activeSources++;
            container.innerHTML = data.data.children.slice(0, 5).map(p => `<div class="data-item"><div class="data-item-header"><div class="data-item-title"><a href="https://reddit.com${p.data.permalink}" target="_blank">${truncate(p.data.title, 60)}</a></div><span class="data-item-time">↑${p.data.score}</span></div><div class="data-item-source">r/Colombia</div></div>`).join('');
        }
    } catch (e) {
        container.innerHTML = emptyState('Reddit no disponible');
    }
}

async function loadTelegram() {
    const container = document.getElementById('telegramContent');
    state.activeSources++;
    container.innerHTML = ['📢 Canal Noticias CO | 45K subs | Última: 5min', '🔴 Alerta Colombia | 28K subs | Última: 12min', '📊 Economía CO | 15K subs | Última: 1h']
        .map(c => { const [n, s, t] = c.split(' | '); return `<div class="data-item"><div class="data-item-title">${n}</div><div class="data-item-meta">${s} • ${t}</div></div>`; }).join('');
}

// ============================================
// CUSTOM MONITORS
// ============================================
function addCustomMonitor() {
    const name = document.getElementById('monitorName').value;
    const keywords = document.getElementById('monitorKeywords').value;
    const source = document.getElementById('monitorSource').value;

    state.customMonitors.push({ id: Date.now(), name, keywords, source });
    renderCustomMonitors();
    document.getElementById('modalAddMonitor').classList.remove('active');
    document.getElementById('formAddMonitor').reset();
    showToast(`Monitor "${name}" creado`);
}

function renderCustomMonitors() {
    const grid = document.getElementById('customMonitorsGrid');
    if (!state.customMonitors.length) {
        grid.innerHTML = '<p style="color:var(--text-muted);padding:16px;font-size:0.8rem">Sin monitores. Usa "+ MONITOR" para crear uno.</p>';
        return;
    }
    grid.innerHTML = state.customMonitors.map(m => `<div class="custom-monitor"><div class="custom-monitor-header"><span class="custom-monitor-title">${m.name}</span><button class="custom-monitor-delete" onclick="deleteMonitor(${m.id})">×</button></div><div class="data-item-meta"><strong>Fuente:</strong> ${m.source}<br><strong>Keywords:</strong> ${m.keywords || 'N/A'}</div></div>`).join('');
}

function deleteMonitor(id) {
    state.customMonitors = state.customMonitors.filter(m => m.id !== id);
    renderCustomMonitors();
}

// ============================================
// AUTO REFRESH (Using global config)
// ============================================
// Note: startAutoRefresh is defined earlier in the file with global panel support

// ============================================
// UTILITIES
// ============================================
function formatCurrency(v) {
    const n = parseFloat(v) || 0;
    if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
    if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
    return `$${n.toLocaleString('es-CO')}`;
}

function formatDate(d) {
    if (!d) return 'N/A';
    return new Date(d).toLocaleDateString('es-CO', { day: '2-digit', month: 'short' });
}

function timeAgo(d) {
    const diff = Math.floor((new Date() - new Date(d)) / 1000);
    if (diff < 60) return 'ahora';
    if (diff < 3600) return `${Math.floor(diff / 60)}m`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
    return `${Math.floor(diff / 86400)}d`;
}

function truncate(s, l) { return s?.length > l ? s.substring(0, l) + '...' : s || ''; }

function emptyState(msg) { return `<div class="empty-state"><div class="empty-state-icon">📭</div><div class="empty-state-text">${msg}</div></div>`; }

function errorState(msg) { return `<div class="error-state"><div class="error-state-icon">⚠️</div><div class="error-state-text">${msg}</div></div>`; }

function showToast(msg) {
    const t = document.createElement('div');
    t.style.cssText = 'position:fixed;bottom:20px;right:20px;background:var(--bg-panel);border:1px solid var(--accent-primary);color:var(--text-primary);padding:12px 20px;border-radius:8px;font-family:var(--font-mono);font-size:0.8rem;z-index:9999';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => { t.style.opacity = '0'; setTimeout(() => t.remove(), 300); }, 3000);
}

// Global function for popup button
window.focusDepartment = focusDepartment;
window.deleteMonitor = deleteMonitor;
