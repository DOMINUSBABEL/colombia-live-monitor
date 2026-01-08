# COLOMBIA LIVE MONITOR BY TALLEYRAND

[![OSINT](https://img.shields.io/badge/OSINT-Colombia-00d4aa)](https://github.com)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9.4-green.svg)](https://leafletjs.com/)

> **Real-time Open Source Intelligence (OSINT) Dashboard for Colombia**
> 
> A comprehensive situational awareness platform integrating multi-source intelligence feeds for monitoring political, economic, territorial, and social dynamics in Colombia.

---

## Abstract

This paper presents **COLINT** (Colombia Intelligence Monitor), a web-based Open Source Intelligence (OSINT) platform designed for real-time monitoring of Colombian national affairs. The system aggregates data from 15+ heterogeneous sources including government APIs (SECOP, TRM), social media sentiment analysis, geospatial conflict mapping, cryptocurrency markets, and aviation tracking (ADS-B). The architecture employs a modular panel-based design pattern with automatic refresh cycles, enabling continuous situational awareness across multiple intelligence domains.

**Keywords:** OSINT, Colombia, Real-time Intelligence, Data Aggregation, Geospatial Analysis, Government Transparency, Political Risk Assessment

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [System Architecture](#2-system-architecture)
3. [Data Sources & APIs](#3-data-sources--apis)
4. [Intelligence Modules](#4-intelligence-modules)
5. [Technical Implementation](#5-technical-implementation)
6. [Deployment](#6-deployment)
7. [Future Work](#7-future-work)
8. [References](#8-references)

---

## 1. Introduction

### 1.1 Background

Colombia represents a complex geopolitical environment characterized by:
- **Political volatility**: Ongoing peace process implementation, electoral dynamics
- **Economic factors**: Heavy dependence on commodities (petroleum, coal, coffee)
- **Security challenges**: Active armed conflict zones, narcotrafficking corridors
- **Institutional transparency**: Extensive open government data initiatives

### 1.2 Problem Statement

Traditional news monitoring provides fragmented, delayed intelligence. Decision-makers require:
1. **Multi-domain integration**: Combine fiscal, electoral, territorial, and social signals
2. **Real-time updates**: Sub-minute latency for financial and security alerts
3. **Geospatial context**: Department-level granularity for regional analysis
4. **Relationship mapping**: Cross-reference contractors, politicians, and funders

### 1.3 Solution Overview

COLINT addresses these requirements through:
- **26 specialized intelligence panels** covering distinct analytical domains
- **Real-time API integration** with Colombian government portals
- **Interactive geospatial visualization** with department-level drill-down
- **Cryptocurrency and commodity tracking** for economic indicators
- **Social media trend analysis** for sentiment monitoring

---

## 2. System Architecture

### 2.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        COLINT SYSTEM ARCHITECTURE                        │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │
│  │  SECOP API  │  │  CoinGecko  │  │ OpenSky Net │  │  RSS Feeds  │   │
│  │ (Contracts) │  │  (Crypto)   │  │  (Flights)  │  │  (News)     │   │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘   │
│         │                │                │                │          │
│         ▼                ▼                ▼                ▼          │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │                    DATA AGGREGATION LAYER                        │  │
│  │   - API Normalization    - Error Handling    - Rate Limiting     │  │
│  │   - Cache Management     - Retry Logic       - Data Validation   │  │
│  └─────────────────────────────────────────────────────────────────┘  │
│                                    │                                   │
│                                    ▼                                   │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │                      STATE MANAGEMENT                            │  │
│  │   - Panel Visibility    - Custom Monitors    - Refresh Timers   │  │
│  │   - Map Layers          - Department Focus   - Crypto Cache     │  │
│  └─────────────────────────────────────────────────────────────────┘  │
│                                    │                                   │
│                                    ▼                                   │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │                    PRESENTATION LAYER                            │  │
│  │                                                                   │  │
│  │   ┌────────────────────────────────────────────────────────┐    │  │
│  │   │              INTERACTIVE MAP (Leaflet.js)               │    │  │
│  │   │  - Department Markers  - Conflict Hotspots  - Flights   │    │  │
│  │   └────────────────────────────────────────────────────────┘    │  │
│  │                                                                   │  │
│  │   ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐  │  │
│  │   │ Crypto  │ │ Markets │ │  News   │ │ SECOP   │ │ Alerts  │  │  │
│  │   │  Panel  │ │  Panel  │ │  Panel  │ │  Panel  │ │  Panel  │  │  │
│  │   └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘  │  │
│  │        ... (26 Total Intelligence Panels) ...                    │  │
│  │                                                                   │  │
│  └─────────────────────────────────────────────────────────────────┘  │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | Vanilla JavaScript (ES6+) | Zero-dependency execution |
| **Styling** | CSS3 with Custom Properties | Bloomberg Terminal aesthetic |
| **Mapping** | Leaflet.js 1.9.4 | Interactive geospatial visualization |
| **Data Fetching** | Fetch API | Asynchronous HTTP requests |
| **Data Format** | JSON, GeoJSON | Structured data interchange |

### 2.3 Design Principles

1. **Zero Backend Dependency**: Pure client-side execution for maximum portability
2. **Progressive Enhancement**: Core functionality works without JavaScript failures
3. **Modular Panel Architecture**: Each intelligence domain is self-contained
4. **Graceful Degradation**: Mock data fallbacks when APIs are unavailable

---

## 3. Data Sources & APIs

### 3.1 Government APIs (Colombia)

| Source | API Type | Endpoint | Data Type | Update Frequency |
|--------|----------|----------|-----------|------------------|
| **SECOP II** | REST (Socrata) | `datos.gov.co/resource/jbjy-vk9h` | Contracts | 5 min |
| **TRM** | REST (Socrata) | `datos.gov.co/resource/32sa-8pi3` | Exchange Rate | 1 min |
| **DANE** | REST | `dane.gov.co/api` | Demographics | Daily |

### 3.2 Financial APIs

| Source | API | Coverage | Rate Limit |
|--------|-----|----------|------------|
| **CoinGecko** | REST (Free) | BTC, ETH, SOL, DOGE, ADA, AVAX, TRUMP, SHIB | 10-30 req/min |
| **Yahoo Finance** | Unofficial | Commodities, Equities | Variable |

### 3.3 Aviation Intelligence

| Source | Protocol | Coverage | Latency |
|--------|----------|----------|---------|
| **OpenSky Network** | REST API | ADS-B worldwide | 5-10 sec |

### 3.4 Social & News APIs

| Source | Method | Rate Limit |
|--------|--------|------------|
| **RSS Feeds** | rss2json proxy | N/A |
| **Reddit** | JSON API | 60 req/min |

---

## 4. Intelligence Modules

### 4.1 Module Classification

```
INTELLIGENCE DOMAINS
├── ECONOMIC
│   ├── Crypto Markets (8 assets, 30s refresh)
│   ├── Colombian Markets (TRM, COLCAP)
│   └── Commodities (Oil, Gold, Coal, Coffee)
│
├── FISCAL
│   ├── SECOP Contracts (Real-time state procurement)
│   ├── Cuentas Claras (Campaign finance)
│   ├── Regalías (Royalty distribution)
│   └── Contraloría (Fiscal responsibility)
│
├── POLITICAL
│   ├── Congress (Legislative tracking)
│   ├── SIGEP (Public officials)
│   ├── Electoral 2026 (Election monitoring)
│   ├── Encuestas (Polling data)
│   └── Personaje del Día (Trending figure)
│
├── TERRITORIAL
│   ├── Interactive Map (32 departments)
│   ├── Conflict Zones (Armed group presence)
│   ├── Mining Cadastre (ANM titles)
│   ├── Flights (ADS-B tracking)
│   └── Alerts (Security incidents)
│
├── SOCIAL
│   ├── Twitter/X Trends (National hashtags)
│   ├── Reddit r/Colombia (Community sentiment)
│   ├── Telegram OSINT (Channel monitoring)
│   └── News (Multi-source RSS)
│
└── SPECIALIZED
    ├── OFAC Sanctions (SDN list matches)
    ├── Border Status (Migration checkpoints)
    ├── Emergencies (UNGRD disasters)
    ├── Weather/IDEAM (Climate alerts)
    └── Sports (Liga BetPlay, International)
```

### 4.2 Department-Level Intelligence

The system provides granular monitoring for all 32 Colombian departments:

| Department | Key Indicators | Risk Level |
|------------|----------------|------------|
| Norte de Santander | Catatumbo conflict, border activity | HIGH |
| Arauca | ELN presence, petroleum infrastructure | HIGH |
| Nariño | Pacific corridor, coca cultivation | HIGH |
| Antioquia | Economic hub, urban security | MEDIUM |
| Valle del Cauca | Port activity, organized crime | MEDIUM |
| Bogotá D.C. | Political epicenter, protests | MEDIUM |

---

## 5. Technical Implementation

### 5.1 File Structure

```
colombia-monitor/
├── index.html          # Main application structure (380 lines)
├── styles.css          # Bloomberg 2026 UI theme (1600+ lines)
├── app.js              # Core logic and API integration (900+ lines)
└── data/
    └── colombia-geo.js # GeoJSON boundaries + metadata
```

### 5.2 State Management

```javascript
const state = {
    map: null,              // Leaflet instance
    layers: {},             // Map layer groups
    markers: [],            // Active map markers
    customMonitors: [],     // User-defined watchers
    panelVisibility: {},    // Panel toggle states
    refreshTimers: {},      // Auto-refresh intervals
    activeSources: 0,       // Connected feed count
    selectedDepartment: null,
    cryptoData: {}          // Cached price data
};
```

### 5.3 Refresh Cycle Architecture

```
REFRESH INTERVALS
├── Crypto          → 30 seconds
├── Flights (ADS-B) → 45 seconds
├── Alerts          → 60 seconds
├── News (RSS)      → 120 seconds
├── SECOP           → 300 seconds
└── Markets         → 60 seconds
```

### 5.4 Error Handling Strategy

```javascript
async function loadPanel(loader, container, fallback) {
    try {
        await loader();
        state.activeSources++;
    } catch (error) {
        console.error(`Panel Error:`, error);
        container.innerHTML = fallback || errorState('Error loading data');
    }
}
```

---

## 6. Deployment

### 6.1 Local Development

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/colombia-live-monitor.git
cd colombia-live-monitor

# Option 1: Python HTTP Server
python -m http.server 8080

# Option 2: Node.js
npx serve -l 8080

# Open browser
http://localhost:8080
```

### 6.2 Network Deployment

For LAN access:
```bash
python -m http.server 8080 --bind 0.0.0.0
# Access from any device: http://<YOUR_IP>:8080
```

### 6.3 Static Hosting (GitHub Pages, Vercel, Netlify)

```bash
# GitHub Pages
git add .
git commit -m "Deploy COLINT"
git push origin main
# Enable Pages in repository settings

# Vercel/Netlify
# Connect repository → Auto-deploy
```

---

## 7. Future Work

### 7.1 Phase 2: Graph Database Integration

```
NEO4J SCHEMA
(Person) -[:OWNS]-> (Company)
(Company) -[:WON]-> (Contract)
(Contract) -[:AWARDED_BY]-> (Entity)
(Person) -[:FUNDED_BY]-> (Donor)
(Donor) -[:LINKED_TO]-> (Company)
```

### 7.2 Phase 3: Machine Learning Integration

| Model | Purpose | Input |
|-------|---------|-------|
| **NER (Named Entity Recognition)** | Extract entities from news | RSS text |
| **Sentiment Analysis** | Classify social media tone | Twitter/Reddit |
| **Anomaly Detection** | Flag unusual contract patterns | SECOP data |
| **Network Analysis** | Identify hidden relationships | Graph data |

### 7.3 Phase 4: Mobile Application

- React Native cross-platform implementation
- Push notifications for critical alerts
- Offline caching via Service Workers

---

## 8. References

1. **SECOP API Documentation**: https://www.datos.gov.co/
2. **OpenSky Network**: Schäfer, M., et al. (2014). "Bringing Up OpenSky: A Large-scale ADS-B Sensor Network for Research"
3. **CoinGecko API**: https://www.coingecko.com/api/documentation
4. **Leaflet.js**: https://leafletjs.com/reference.html
5. **Colombian Conflict Data**: CERAC, CINEP Reports
6. **OFAC SDN List**: U.S. Department of Treasury

---

## License

MIT License - See [LICENSE](LICENSE) for details.

---

## Author

**TALLEYRAND Intelligence Systems**

*"Information is the currency of democracy."* — Thomas Jefferson

---

## Citation

If you use this system in academic research, please cite:

```bibtex
@software{colint2026,
  author = {TALLEYRAND},
  title = {COLINT: Colombia Intelligence Monitor},
  year = {2026},
  url = {https://github.com/TALLEYRAND/colombia-live-monitor},
  version = {2.0.0}
}
```
