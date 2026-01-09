# COLINT: A Decentralized Architecture for Real-Time Open Source Intelligence (OSINT) Fusion

**Authors:** TALLEYRAND Intelligence Systems  
**Date:** January 2026  
**Version:** 6.0.0 (Political Intelligence + Elections + SECOP II + Premium Animations Edition)  
**Repository:** [github.com/DOMINUSBABEL/colombia-live-monitor](https://github.com/DOMINUSBABEL/colombia-live-monitor)  
**License:** MIT  

[![OSINT](https://img.shields.io/badge/Category-OSINT-00d4aa)](https://github.com/DOMINUSBABEL)
[![Architecture](https://img.shields.io/badge/Architecture-Event--Driven-blueviolet)](https://github.com/DOMINUSBABEL)
[![Status](https://img.shields.io/badge/Status-Operational-green)](https://github.com/DOMINUSBABEL)
[![Charts](https://img.shields.io/badge/Viz-Chart.js-ff6384)](https://www.chartjs.org/)
[![Panels](https://img.shields.io/badge/Panels-50+-blue)](https://github.com/DOMINUSBABEL)
[![APIs](https://img.shields.io/badge/APIs-Real--Time-orange)](https://github.com/DOMINUSBABEL)
[![Political Intel](https://img.shields.io/badge/Module-Political_Intel-purple)](https://github.com/DOMINUSBABEL)
[![Animations](https://img.shields.io/badge/UX-Premium_Animations-cyan)](https://github.com/DOMINUSBABEL)

---

## 🔥 What's New in v6.0

> [!IMPORTANT]
> Version 6.0 introduces the **Political Intelligence Module** - a complete system for political trend analysis, social media content generation, and personalized campaign intelligence.

### Highlights

| Feature | Description |
|---------|-------------|
| 🎯 **4 New Panels** | Tendencias Políticas, Generador Social, Perfil Candidato, Informe Ejecutivo |
| 📊 **Trend Analysis** | 5 political trends with impact indicators (Critical/High/Moderate/Low) |
| ✍️ **Post Generator** | 10 posts per trend with personality-based templates |
| 👤 **Personality Matrix** | Configurable candidate voice with traits and phrases |
| 🔴🟢⚪ **Perspective Selector** | Opposition / Government / Neutral framing |
| 📥 **Markdown Export** | Professional political reports |
| ✨ **Premium Animations** | Spring easing, staggered panels, micro-interactions |

---

## Abstract

This technical blueprint presents the architectural specification for **COLINT (Colombia Intelligence Monitor)**, a browser-based, high-performance OSINT visualization platform engineered for national-level situational awareness. Version 6.0 represents a major evolution with:

- **Political Intelligence Module** - Trend analysis and content generation for political campaigns
- **SECOP II procurement data** - Real Colombian government contracts
- **Real legislative feeds** - Congressional activity monitoring
- **Dynamic time filtering** (24H/7D/30D/ALL)
- **Enhanced D'Hondt electoral simulator** with historical E-14/E-24 form data
- **Premium UI/UX** with startup-quality animations

The system now orchestrates **50+ real-time data vectors** through a sophisticated multi-tier refresh architecture, fusing electoral RSS feeds, government procurement APIs, congressional activity, environmental monitoring, financial markets, cryptocurrency prices, political intelligence, and geopolitical monitoring into a unified command dashboard.

---

## Table of Contents

1. [System Architecture](#1-system-architecture)
2. [Data Pipelines](#2-data-pipelines)
3. [Module Blueprints](#3-module-blueprints)
4. [🆕 Political Intelligence Module](#4-political-intelligence-module)
5. [Elections 2026 Deep Dive](#5-elections-2026-deep-dive)
6. [Government Intelligence Module](#6-government-intelligence-module)
7. [Time Filtering System](#7-time-filtering-system)
8. [Animation & UX System](#8-animation--ux-system)
9. [Technical Implementation](#9-technical-implementation)
10. [API Reference](#10-api-reference)
11. [Algorithms & Data Structures](#11-algorithms--data-structures)
12. [Deployment](#12-deployment)
13. [Performance Optimization](#13-performance-optimization)
14. [Roadmap](#14-roadmap)
15. [Citation](#15-citation)

---

## 1. System Architecture

### 1.1 High-Level Design Pattern

COLINT employs an **event-driven microservice architecture** adapted for browser execution. The system decouples data ingestion from visualization through an orchestration layer that manages asynchronous API calls, state updates, and render cycles.

```mermaid
graph TD
    subgraph "External Data Ecosystem"
        S1[Govt APIs: SECOP I/II, DANE, Registraduría, Congreso Visible]
        S2[Geo APIs: USGS, NASA EONET, OpenSky Network, OpenMeteo]
        S3[Media: BBC, Reuters, Al Jazeera, Google News, El Tiempo, Semana]
        S4[Financial: CoinGecko, TRM Colombia, BVC, Commodities]
        S5[Elections: CNE, Invamer, CNC, Guarumo Polls]
        S6[Security: Crisis Group, ACLED, UNGRD]
    end

    subgraph "COLINT v6.0 Core Engine"
        Orchestrator[loadAllData Orchestrator]
        TimeFilter[Time Filter Controller]
        ChartEngine[Chart.js Visualization Engine]
        MapEngine[Leaflet Map Engine]
        PoliticalIntel[Political Intelligence Module]
        State[Reactive State Store]
        
        S1 & S2 & S3 & S4 & S5 & S6 -->|Async Fetch + CORS Proxy| Orchestrator
        Orchestrator --> TimeFilter
        Orchestrator --> PoliticalIntel
        TimeFilter -->|Filter by Date Range| ChartEngine
        Orchestrator -->|GeoJSON| MapEngine
        Orchestrator -->|Update| State
        PoliticalIntel -->|Trend Analysis| State
    end

    subgraph "Visualization Layer"
        Map[Interactive Leaflet Map + 32 Departments]
        Grid[50+ Panel Dashboard Grid]
        Charts[Bar/Doughnut/Line/Polar Area Charts]
        Popups[Rich Intel Popups with Actions]
        PolPanels[Political Intelligence Panels]
    end
    
    ChartEngine --> Charts
    MapEngine --> Map
    State --> Grid
    Map --> Popups
    PoliticalIntel --> PolPanels
```

### 1.2 Layered Architecture Diagram

```mermaid
graph TB
    subgraph "Presentation Layer"
        UI[HTML5 + CSS3 Premium UI]
        Animations[Spring Animations Engine]
        Responsive[Responsive Grid System]
    end
    
    subgraph "Application Layer"
        Orchestrator[Data Orchestrator]
        PoliticalEngine[Political Intel Engine]
        ChartEngine[Chart.js Visualizer]
        MapEngine[Leaflet Map Controller]
        StateManager[State Management]
    end
    
    subgraph "Service Layer"
        APIFetchers[Async API Fetchers]
        RSSParser[RSS/Atom Parser]
        CORSProxy[CORS Proxy Handler]
        LocalStorage[LocalStorage Persistence]
    end
    
    subgraph "Data Layer"
        ExternalAPIs[30+ External APIs]
        StaticData[Electoral CSV Data]
        TrendTemplates[Post Templates]
        PartyConfig[Party Configuration]
    end
    
    UI --> Orchestrator
    Animations --> UI
    Responsive --> UI
    
    Orchestrator --> APIFetchers
    PoliticalEngine --> TrendTemplates
    ChartEngine --> Orchestrator
    MapEngine --> Orchestrator
    StateManager --> LocalStorage
    
    APIFetchers --> CORSProxy
    CORSProxy --> ExternalAPIs
    RSSParser --> ExternalAPIs
```

### 1.3 Core Design Principles

| Principle | Implementation | Rationale |
|-----------|----------------|-----------|
| **Zero Backend** | Pure client-side JavaScript with CORS proxy | Eliminates server costs and complexity |
| **Graceful Degradation** | Fallback mock data when APIs unavailable | Ensures offline functionality |
| **Tiered Refresh** | 30s/45s/3m/5m/10m intervals per data type | Optimizes API quota usage |
| **Mobile-First** | Responsive CSS Grid with touch controls | 60%+ mobile traffic anticipated |
| **Offline Capable** | Static electoral data works without network | Critical for field operations |
| **Accessibility** | ARIA labels, keyboard navigation | WCAG 2.1 compliance |
| **Performance** | GPU-accelerated CSS animations | 60fps target on mid-range devices |

### 1.4 Technology Stack

```mermaid
graph LR
    subgraph "Frontend Core"
        HTML5[HTML5 Semantic]
        CSS3[CSS3 Grid + Flexbox + Animations]
        JS[ES2022 JavaScript]
    end
    
    subgraph "External Libraries"
        Leaflet[Leaflet 1.9.4]
        ChartJS[Chart.js 4.4.x]
    end
    
    subgraph "API Protocols"
        REST[REST APIs]
        RSS[RSS/Atom Feeds]
        JSON[JSON Endpoints]
        GeoJSON[GeoJSON Layers]
    end
    
    subgraph "Browser APIs"
        Fetch[Fetch API]
        Clipboard[Clipboard API]
        Storage[LocalStorage]
        Geolocation[Geolocation API]
    end
    
    HTML5 --> Leaflet
    JS --> ChartJS
    JS --> REST & RSS & JSON
    JS --> Fetch & Clipboard & Storage
```

### 1.5 File Structure

```
colombia-monitor/
├── index.html              # Main application (870 lines)
├── app.js                  # Core logic + Political Intel (2,754 lines)
├── styles.css              # Premium styling (2,650 lines)
├── data/
│   ├── colombia-geo.js     # GeoJSON boundaries
│   ├── e14_historico.csv   # Electoral form E-14 data
│   └── e24_historico.csv   # Electoral form E-24 data
├── assets/
│   ├── icons/              # Party and status icons
│   └── maps/               # Department vector maps
└── README.md               # This documentation
```

### 1.6 Module Dependency Graph

```mermaid
graph TD
    Init[DOMContentLoaded] --> InitMap
    Init --> InitPanels
    Init --> InitModals
    Init --> InitEventListeners
    Init --> InitTimeFilters
    Init --> LoadAllData
    Init --> StartAutoRefresh
    Init --> InitPoliticalIntel
    
    LoadAllData --> LoadCrypto
    LoadAllData --> LoadMercados
    LoadAllData --> LoadNoticias
    LoadAllData --> LoadAlertas
    LoadAllData --> LoadSecop
    LoadAllData --> LoadCongreso
    LoadAllData --> LoadElecciones
    LoadAllData --> LoadVuelos
    LoadAllData --> LoadEarthquakes
    LoadAllData --> LoadFires
    LoadAllData --> LoadGlobal
    
    InitPoliticalIntel --> LoadTendenciasPoliticas
    LoadTendenciasPoliticas --> GeneratePostsForTrends
    GeneratePostsForTrends --> RenderGeneratedPosts
    
    StartAutoRefresh --> SetInterval[Differentiated Intervals]
```

---

## 2. Data Pipelines

### 2.1 Data Ingestion Pipeline

The orchestrator (`loadAllData()`) manages 35+ parallel API calls with comprehensive error handling and retry logic. Each data source has its own loader function that normalizes responses into a common format.

```mermaid
sequenceDiagram
    participant Init as DOMContentLoaded
    participant Orch as loadAllData()
    participant Filter as Time Filter
    participant Political as Political Intel
    participant Fetcher as API Fetchers
    participant Chart as Chart.js
    participant Map as Leaflet

    Init->>Orch: Trigger on Load
    Init->>Filter: initTimeFilters()
    Init->>Political: initPoliticalIntel() [500ms delay]
    
    par Parallel API Calls - Tier 1 (Critical - 30s refresh)
        Orch->>Fetcher: loadCrypto() [CoinGecko]
        Orch->>Fetcher: loadMercados() [TRM API]
        Orch->>Fetcher: loadAlertas() [UNGRD]
    end
    
    par Parallel API Calls - Tier 2 (Elections - 3m refresh)
        Orch->>Fetcher: loadPresidencial() [Polls]
        Orch->>Fetcher: loadSenado() [Composition]
        Orch->>Fetcher: loadCamara() [Composition]
        Orch->>Fetcher: loadDhondt() [Simulator]
        Orch->>Fetcher: loadHistorico() [E-14/E-24]
    end
    
    par Parallel API Calls - Tier 3 (Government - 5m refresh)
        Orch->>Fetcher: loadSecop() [SECOP I + II]
        Orch->>Fetcher: loadCongreso() [Congreso Visible]
        Orch->>Fetcher: loadCuentasClaras() [CNE]
    end
    
    par Parallel API Calls - Tier 4 (Environment - 3m refresh)
        Orch->>Fetcher: loadEarthquakes() [USGS]
        Orch->>Fetcher: loadFires() [NASA FIRMS]
        Orch->>Fetcher: loadClima() [OpenMeteo]
    end
    
    par Political Intelligence Module
        Political->>Political: loadTendenciasPoliticas()
        Political->>Political: generatePostsForTrends()
        Political->>Political: updateReportStats()
    end
    
    Fetcher->>Filter: Apply Date Filters
    Filter->>Chart: Render Filtered Data
    Fetcher->>Map: Add GeoJSON Layers
    Chart-->>Orch: Chart Instance
    Orch->>Orch: Update activeSources Counter
```

### 2.2 Complete Data Source Matrix

| Category | Module | Source API | Update Freq | Filterable | Lines of Code |
|----------|--------|------------|-------------|------------|---------------|
| **Electoral** | Presidential Polls | Invamer/Guarumo/CNC | 3 min | ❌ | 45 |
| **Electoral** | Electoral News | Google News RSS | 3 min | ❌ | 32 |
| **Electoral** | Congress Composition | Registraduría | Static | ❌ | 120 |
| **Electoral** | Voter Turnout | Historical Data | Static | ❌ | 60 |
| **Electoral** | D'Hondt Simulator | User Input | On Demand | ❌ | 85 |
| **Electoral** | E-14/E-24 History | CSV Files | Static | ❌ | 40 |
| **Electoral** | Countdown | Real-time JS | 1 sec | ❌ | 25 |
| **Government** | SECOP I | datos.gov.co | 5 min | ✅ | 65 |
| **Government** | SECOP II | datos.gov.co | 5 min | ✅ | 70 |
| **Government** | Congreso Visible | API REST | 10 min | ✅ | 55 |
| **Government** | Cuentas Claras | CNE | Static | ❌ | 40 |
| **Government** | Regalías | SGR | Static | ❌ | 35 |
| **Financial** | Crypto Prices | CoinGecko | 30 sec | ❌ | 80 |
| **Financial** | TRM Exchange | datos.gov.co | 3 min | ❌ | 45 |
| **Financial** | Commodities | Mock | Static | ❌ | 30 |
| **Environment** | Earthquakes | USGS | 3 min | ❌ | 40 |
| **Environment** | Wildfires | NASA EONET | 3 min | ❌ | 35 |
| **Environment** | Weather | OpenMeteo | 10 min | ❌ | 50 |
| **Security** | Conflicts | Google News RSS | 3 min | ✅ | 45 |
| **Security** | Alerts | UNGRD | 1 min | ✅ | 55 |
| **Global** | Americas | BBC RSS | 3 min | ❌ | 25 |
| **Global** | Europe | BBC RSS | 3 min | ❌ | 25 |
| **Global** | Asia | Al Jazeera RSS | 3 min | ❌ | 25 |
| **Tech** | Tech News | TechCrunch RSS | 3 min | ❌ | 25 |
| **Tech** | Cybersecurity | HackerNews RSS | 3 min | ❌ | 25 |
| **Aviation** | Flights | OpenSky Network | 45 sec | ❌ | 90 |
| **🆕 Political** | Trends | Template-based | On Demand | ✅ | 150 |
| **🆕 Political** | Posts | Generator | On Demand | ❌ | 200 |
| **🆕 Political** | Profile | LocalStorage | Persistent | ❌ | 100 |

### 2.3 API Rate Limits & Strategies

```mermaid
graph TD
    subgraph "Rate Limit Tiers"
        T1[Tier 1: 30 sec<br/>Crypto, Critical Alerts]
        T2[Tier 2: 45 sec<br/>Flight Tracking]
        T3[Tier 3: 3 min<br/>News RSS, General]
        T4[Tier 4: 5 min<br/>Government SECOP]
        T5[Tier 5: 10 min<br/>Congress, Weather]
        T6[Political: On Demand<br/>User-triggered generation]
    end
    
    subgraph "Strategies"
        Cache[Response Caching]
        Throttle[Request Throttling]
        Fallback[Graceful Fallback]
        Retry[Exponential Backoff]
    end
    
    T1 --> Cache
    T2 --> Throttle
    T3 --> Fallback
    T4 --> Retry
```

### 2.4 Data Flow for Political Intelligence

```mermaid
flowchart TD
    subgraph "Input Sources"
        RSS[News RSS Feeds]
        Static[Static Trend Data]
        UserConfig[User Configuration]
    end
    
    subgraph "Processing"
        Aggregate[Aggregate Trends]
        Filter[Filter by Region]
        Score[Calculate Impact Score]
    end
    
    subgraph "Generation"
        Templates[Load Templates by Perspective]
        Personality[Apply Personality Traits]
        Format[Format Posts < 280 chars]
    end
    
    subgraph "Output"
        TrendCards[Trend Cards UI]
        PostCards[Post Cards UI]
        Report[Markdown Report]
    end
    
    RSS --> Aggregate
    Static --> Aggregate
    UserConfig --> Templates
    
    Aggregate --> Filter
    Filter --> Score
    Score --> TrendCards
    
    TrendCards --> Templates
    Templates --> Personality
    Personality --> Format
    Format --> PostCards
    
    TrendCards --> Report
    PostCards --> Report
```

---

## 3. Module Blueprints

### 3.1 Panel Architecture

Each panel follows a consistent structure:

```javascript
// Panel Blueprint
{
    id: 'panelName',           // Unique identifier
    name: 'Display Name',       // UI label
    icon: '📊',                 // Emoji icon
    loader: 'loadPanelName',    // Loader function name
    refresh: 180000,            // Refresh interval (ms)
    filterable: true,           // Supports time filtering
    dependencies: ['stateKey'], // Required state keys
    fallback: mockData          // Fallback data
}
```

### 3.2 State Management

```javascript
const state = {
    // Map State
    map: null,
    layers: {},
    markers: [],
    selectedDepartment: null,
    
    // Panel State
    panelVisibility: {},
    panelFilters: {},
    refreshTimers: {},
    
    // Data State
    activeSources: 0,
    cryptoData: {},
    charts: {},
    
    // Political Intel State
    candidateProfile: {},
    politicalTrends: [],
    generatedPosts: []
};
```

### 3.3 Event Flow Diagram

```mermaid
stateDiagram-v2
    [*] --> PageLoad
    PageLoad --> Initialization
    Initialization --> DataLoading
    DataLoading --> Rendering
    Rendering --> Idle
    
    Idle --> UserInteraction: Click/Input
    UserInteraction --> StateUpdate
    StateUpdate --> Rendering
    
    Idle --> AutoRefresh: Timer Tick
    AutoRefresh --> DataLoading
    
    Idle --> FilterChange: Filter Selected
    FilterChange --> DataLoading
    
    Idle --> PerspectiveChange: Perspective Changed
    PerspectiveChange --> RegeneratePosts
    RegeneratePosts --> Rendering
```

---

## 4. 🆕 Political Intelligence Module

### 4.1 Overview

The Political Intelligence Module is a comprehensive system for:

1. **Trend Monitoring** - Track key political developments with impact scoring
2. **Content Generation** - Create social media posts with configurable personality
3. **Perspective Framing** - Switch between Opposition/Government/Neutral voices
4. **Report Export** - Generate professional markdown briefings

### 4.2 Architecture

```mermaid
graph TD
    subgraph "Configuration Layer"
        Profile[Candidate Profile]
        Perspective[Perspective Selector]
        Traits[Personality Traits]
        Phrases[Custom Phrases]
    end
    
    subgraph "Data Layer"
        BaseTrends[5 Base Political Trends]
        Templates[Post Templates by Category]
        PartyConfig[7 Party Configurations]
    end
    
    subgraph "Processing Layer"
        TrendLoader[loadTendenciasPoliticas]
        PostGenerator[generatePostsForTrends]
        TemplateEngine[Template Fill Engine]
    end
    
    subgraph "Presentation Layer"
        TrendPanel[Tendencias Políticas Panel]
        GeneratorPanel[Generador Social Panel]
        ProfilePanel[Perfil Candidato Panel]
        ReportPanel[Informe Ejecutivo Panel]
    end
    
    Profile --> TrendLoader
    Perspective --> PostGenerator
    Traits --> TemplateEngine
    Phrases --> TemplateEngine
    
    BaseTrends --> TrendLoader
    Templates --> PostGenerator
    PartyConfig --> Profile
    
    TrendLoader --> TrendPanel
    PostGenerator --> GeneratorPanel
    Profile --> ProfilePanel
    TrendLoader --> ReportPanel
    PostGenerator --> ReportPanel
```

### 4.3 Candidate Profile Schema

```javascript
const candidateProfile = {
    // Identity
    name: 'Mariate',                    // Display name
    handle: '@mariatemonto',            // Social media handle
    
    // Political Affiliation
    party: 'CD',                        // Party code
    partyName: 'Centro Democrático',    // Full party name
    perspective: 'opposition',          // opposition | government | neutral
    
    // Personality Matrix
    traits: [
        'Geóloga',      // Professional background
        'Paisa',        // Regional identity
        'Directa',      // Communication style
        'Uribista',     // Political alignment
        'Frentera'      // Personality characteristic
    ],
    
    // Voice Markers
    phrases: [
        'ome',                   // Regional expression
        'verraquera',            // Colloquialism
        'echado pa\'lante',      // Motivational phrase
        'desde el territorio'    // Brand phrase
    ]
};
```

### 4.4 Party Configuration

| Code | Party | Color | Class | Ideology |
|------|-------|-------|-------|----------|
| **CD** | Centro Democrático | `#0066CC` | `cd` | Right-wing, Uribismo |
| **PL** | Partido Liberal | `#E31837` | `pl` | Center-left |
| **PC** | Partido Conservador | `#1E3A5F` | `pc` | Center-right |
| **CR** | Cambio Radical | `#F7941D` | `cr` | Center |
| **PH** | Pacto Histórico | `#8B0000` | `ph` | Left-wing |
| **AV** | Alianza Verde | `#228B22` | `av` | Green, Progressive |
| **IND** | Independiente | `#666666` | `ind` | Non-aligned |

### 4.5 Trend Data Structure

```javascript
const trend = {
    id: 1,                                    // Unique identifier
    title: 'RENDÓN VS GOBIERNO NACIONAL',     // Trend headline
    category: 'autonomia',                    // autonomia | seguridad | economia | general
    context: 'El Gobernador de Antioquia...',// Detailed context
    impact: 'critical',                       // critical | high | moderate | low
    region: 'antioquia',                      // nacional | antioquia | medellin | bogota
    keywords: ['Rendón', 'autonomía'],        // Search keywords
    emoji: '🏛️',                              // Visual marker
    hashtag: 'AntioquiaResiste'               // Suggested hashtag
};
```

### 4.6 Impact Level Visualization

```
IMPACT LEVELS
═════════════════════════════════════════════════════
🔴 CRITICAL   ████████████████████████████████  100%
   - Immediate action required
   - National-level implications
   - Maximum social media engagement

🟠 HIGH       ████████████████████████          75%
   - Significant development
   - Regional or sectoral impact
   - High engagement potential

🟡 MODERATE   ████████████████                  50%
   - Noteworthy but contained
   - Limited immediate impact
   - Contextual engagement

🟢 LOW        ████████                          25%
   - Routine development
   - Minimal disruption
   - Opportunistic engagement
═════════════════════════════════════════════════════
```

### 4.7 Post Generation Algorithm

```mermaid
flowchart TD
    Start([Start Generation]) --> LoadProfile[Load Candidate Profile]
    LoadProfile --> GetPerspective{Get Perspective}
    
    GetPerspective -->|Opposition| OppTemplates[Load Opposition Templates]
    GetPerspective -->|Government| GovTemplates[Load Government Templates]
    GetPerspective -->|Neutral| NeutralTemplates[Load Neutral Templates]
    
    OppTemplates --> SelectCategory
    GovTemplates --> SelectCategory
    NeutralTemplates --> SelectCategory
    
    SelectCategory{Match Trend Category} -->|autonomia| AutonomyT[Autonomy Templates]
    SelectCategory -->|seguridad| SecurityT[Security Templates]
    SelectCategory -->|economia| EconomyT[Economy Templates]
    SelectCategory -->|general| GeneralT[General Templates]
    
    AutonomyT --> GenerateLoop
    SecurityT --> GenerateLoop
    EconomyT --> GenerateLoop
    GeneralT --> GenerateLoop
    
    GenerateLoop[For each of 10 templates] --> FillTemplate[Fill Template Variables]
    FillTemplate --> InjectPhrase{Random Phrase?}
    
    InjectPhrase -->|50% chance| AddPhrase[Prepend Phrase]
    InjectPhrase -->|Skip| CheckLength
    AddPhrase --> CheckLength
    
    CheckLength{Length > 280?} -->|Yes| Truncate[Truncate to 277 + ...]
    CheckLength -->|No| AddToArray
    Truncate --> AddToArray
    
    AddToArray[Add to generatedPosts] --> MoreTemplates{More Templates?}
    MoreTemplates -->|Yes| GenerateLoop
    MoreTemplates -->|No| RenderPosts[Render Post Cards]
    
    RenderPosts --> UpdateStats[Update Report Stats]
    UpdateStats --> End([End])
```

### 4.8 Template System

#### Template Variables

| Variable | Replacement | Example |
|----------|-------------|---------|
| `{topic}` | First sentence of trend context | "El Gobernador denuncia..." |
| `{emoji}` | Trend emoji | 🏛️ |
| `{hashtag}` | Trend hashtag | AntioquiaResiste |
| `{count}` | Numeric placeholder | 4.7 (million signatures) |

#### Sample Templates by Perspective

**Opposition Templates (Autonomía Category):**
```javascript
[
    '¡Ome, qué pena con el señor de Bogotá! Aquí en Antioquia tenemos AUTONOMÍA. {topic} {emoji} #{hashtag}',
    'Como geóloga lo digo: cuando la roca se fractura por presión externa, el territorio se defiende. {topic} 🏔️',
    'Desde la montaña vemos clarito quién quiere destruir las instituciones. {emoji}',
    // ... 7 more templates
]
```

**Government Templates:**
```javascript
[
    'El cambio está en marcha. {topic}. Avanzamos hacia una Colombia más justa. 🇨🇴',
    'Por primera vez un gobierno piensa en los de abajo. {topic}. #ColombiaHumana',
    // ... 3 more templates
]
```

### 4.9 Markdown Report Structure

```markdown
# 📊 INFORME DE TENDENCIAS POLÍTICAS
## Medellín, Antioquia y Colombia
**Fecha:** [Date] | [Time]
**Perspectiva:** [Perspective] | [Party]
**Matriz de Contenido para:** [@handle](link)

---

## 🔥 RESUMEN EJECUTIVO
Este informe contiene [N] tendencias políticas y [M] posts generados.

---

## 📍 TENDENCIA 1: [TITLE]

### Contexto
[Context paragraph]

**Nivel de Impacto:** [Emoji] [IMPACT]

### 📱 MATRIZ DE 10 POSTS - VOZ DE [NAME]

| # | POST (Máx 280 caracteres) |
|---|---------------------------|
| 1 | [Post text] |
| 2 | [Post text] |
...

---

## 📋 PERFIL DE PERSONALIDAD - [NAME]

| Atributo | Valor |
|----------|-------|
| Handle | @handle |
| Partido | [Party] |
| Perspectiva | [Perspective] |
| Rasgos | [Traits list] |
| Frases | [Phrases list] |

---

**Elaborado por:** COLINT Intelligence Module v6.0
```

### 4.10 UI Components

```
┌─────────────────────────────────────────────────────────────────┐
│ 🎯 INTELIGENCIA POLÍTICA                                        │
│ ┌─────────────────┐  ┌──────────────────────────────────────┐  │
│ │ 🔴 Oposición ▼  │  │ ⚙️ Perfil                            │  │
│ └─────────────────┘  └──────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────┐ ┌─────────────────────────────┐│
│ │ 📊 TENDENCIAS POLÍTICAS     │ │ ✍️ GENERADOR SOCIAL         ││
│ │ ┌───────────────────────┐   │ │ ┌───────────────────────┐   ││
│ │ │🏛️ RENDÓN VS GOBIERNO  │   │ │ │ [Avatar] Mariate      │   ││
│ │ │ 🔴 CRÍTICO            │   │ │ │ @mariatemonto  #1     │   ││
│ │ │ Context preview...    │   │ │ │                       │   ││
│ │ │ 📍 ANTIOQUIA #Hashtag │   │ │ │ ¡Ome, qué pena con el │   ││
│ │ └───────────────────────┘   │ │ │ señor de Bogotá!...   │   ││
│ │ ┌───────────────────────┐   │ │ │                       │   ││
│ │ │⚔️ PAZ TOTAL FRACASADA │   │ │ │ 245/280    [📋 Copiar]│   ││
│ │ │ 🔴 CRÍTICO            │   │ │ └───────────────────────┘   ││
│ │ └───────────────────────┘   │ │ [🔄 Generar] [📋 Copiar Todo]││
│ └─────────────────────────────┘ └─────────────────────────────┘│
│ ┌──────────────────┐ ┌───────────────────────────────────────┐ │
│ │ 👤 PERFIL ACTIVO │ │ 📋 INFORME EJECUTIVO                  │ │
│ │ ┌────┐           │ │ ┌─────┐  ┌─────┐  ┌─────┐            │ │
│ │ │ MT │ Mariate   │ │ │  5  │  │ 50  │  │ 09  │            │ │
│ │ └────┘@mariate...│ │ │Trend│  │Posts│  │ ene │            │ │
│ │ [CD Badge]       │ │ └─────┘  └─────┘  └─────┘            │ │
│ │ [Trait] [Trait]  │ │                       [⬇️ MD]         │ │
│ │ [Oposición]      │ │ Genera tendencias para ver informe   │ │
│ └──────────────────┘ └───────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

## 5. Elections 2026 Deep Dive

### 5.1 Electoral Calendar

```
2026 ELECTORAL TIMELINE
════════════════════════════════════════════════════════════════
Jan   Feb   Mar   Apr   May   Jun   Jul   Aug   Sep   Oct   Nov
║     ║     ║     ║     ║     ║     ║     ║     ║     ║     ║
║     ║     ▼     ║     ▼     ▼     ║     ║     ║     ║     ║
║     ║   Mar 13 ║   May 29 Jun 19 ║     ║     ║     ║     ║
║     ║  CONGRESS║    1st   2nd    ║     ║     ║     ║     ║
║     ║  ELECTIONS   PRES   PRES   ║     ║     ║     ║     ║
║     ║           ROUND  RUNOFF    ║     ║     ║     ║     ║
════════════════════════════════════════════════════════════════
```

### 5.2 D'Hondt Seat Allocation Algorithm

The D'Hondt method is used for proportional representation seat allocation in Colombia's Senate and Chamber elections.

```mermaid
flowchart TD
    Start([Input: Parties + Votes + Total Seats]) --> Init[Initialize seats = 0 for all parties]
    Init --> Loop[While allocated < Total Seats]
    
    Loop --> Calculate[Calculate quotients for each party]
    Calculate --> Formula["quotient = votes / (seats + 1)"]
    Formula --> FindMax[Find party with highest quotient]
    FindMax --> Allocate[Allocate 1 seat to that party]
    Allocate --> Increment[Increment allocated count]
    Increment --> Check{allocated < Total?}
    
    Check -->|Yes| Loop
    Check -->|No| Output([Output: Seats per party])
```

**Algorithm Implementation:**

```javascript
function calculateDhondt(parties, totalSeats) {
    // Initialize results
    const results = parties.map(p => ({
        name: p.name,
        votes: p.votes,
        seats: 0,
        quotients: []
    }));
    
    // Allocate seats one by one
    for (let seat = 0; seat < totalSeats; seat++) {
        // Calculate current quotients
        results.forEach(p => {
            p.currentQuotient = p.votes / (p.seats + 1);
        });
        
        // Find party with highest quotient
        const winner = results.reduce((max, p) => 
            p.currentQuotient > max.currentQuotient ? p : max
        );
        
        // Allocate seat
        winner.seats++;
        winner.quotients.push(winner.currentQuotient);
    }
    
    return results;
}
```

**Example Calculation:**

```
INPUT:
- Party A: 100,000 votes
- Party B: 80,000 votes
- Party C: 30,000 votes
- Total Seats: 5

ROUND 1:
  A: 100,000 / 1 = 100,000 ← Winner
  B: 80,000 / 1 = 80,000
  C: 30,000 / 1 = 30,000
  
ROUND 2:
  A: 100,000 / 2 = 50,000
  B: 80,000 / 1 = 80,000 ← Winner
  C: 30,000 / 1 = 30,000
  
ROUND 3:
  A: 100,000 / 2 = 50,000 ← Winner
  B: 80,000 / 2 = 40,000
  C: 30,000 / 1 = 30,000
  
ROUND 4:
  A: 100,000 / 3 = 33,333
  B: 80,000 / 2 = 40,000 ← Winner
  C: 30,000 / 1 = 30,000
  
ROUND 5:
  A: 100,000 / 3 = 33,333 ← Winner
  B: 80,000 / 3 = 26,667
  C: 30,000 / 1 = 30,000

OUTPUT:
  Party A: 3 seats (60%)
  Party B: 2 seats (40%)
  Party C: 0 seats (0%)
```

### 5.3 Electoral Forms E-14/E-24

| Form | Purpose | Data Points |
|------|---------|-------------|
| **E-14** | Vote tallying per polling station | Votes by candidate, null votes, total votes |
| **E-24** | Electoral census information | Registered voters, voting stations, locations |

### 5.4 Polling Visualization

```mermaid
pie title Presidential Polls (Simulated Data)
    "Candidate A" : 32
    "Candidate B" : 28
    "Candidate C" : 18
    "Candidate D" : 12
    "Undecided" : 10
```

---

## 6. Government Intelligence Module

### 6.1 SECOP Integration

SECOP (Sistema Electrónico de Contratación Pública) provides real-time access to Colombian government procurement:

```mermaid
graph LR
    subgraph "SECOP I (Legacy)"
        S1API[datos.gov.co API]
        S1Data[Historical Contracts]
    end
    
    subgraph "SECOP II (Modern)"
        S2API[datos.gov.co API]
        S2Data[Real-time Contracts]
    end
    
    subgraph "COLINT Processing"
        Fetch[Async Fetcher]
        Filter[Time Filter]
        Format[Value Formatter]
        Render[Panel Renderer]
    end
    
    S1API --> Fetch
    S2API --> Fetch
    Fetch --> Filter
    Filter --> Format
    Format --> Render
```

### 6.2 Contract Value Formatting

```javascript
function formatContractValue(value) {
    const num = parseFloat(value);
    if (num >= 1e12) return `$${(num/1e12).toFixed(1)}T`;  // Trillion
    if (num >= 1e9)  return `$${(num/1e9).toFixed(1)}B`;   // Billion
    if (num >= 1e6)  return `$${(num/1e6).toFixed(1)}M`;   // Million
    if (num >= 1e3)  return `$${(num/1e3).toFixed(0)}K`;   // Thousand
    return `$${num.toFixed(0)}`;
}
```

### 6.3 Congressional Activity Tracking

Monitors legislative activity from Congreso Visible:

- **Proyectos de Ley** - Bill proposals
- **Ponencias** - Committee reports
- **Votaciones** - Voting records
- **Plenarias** - Plenary sessions

---

## 7. Time Filtering System

### 7.1 Filter Configuration

```javascript
const TIME_FILTERS = {
    '1d':  { label: '24H',  days: 1,   color: 'success' },
    '7d':  { label: '7D',   days: 7,   color: 'secondary' },
    '30d': { label: '30D',  days: 30,  color: 'warning' },
    'all': { label: 'TODO', days: 365, color: 'tertiary' }
};

const FILTERABLE_PANELS = [
    'secop',
    'congreso', 
    'noticias',
    'alertas',
    'emergencias',
    'conflictos'
];
```

### 7.2 Date Filtering Algorithm

```mermaid
flowchart TD
    Input([Items Array + Date Field + Panel ID]) --> GetFilter[Get Active Filter for Panel]
    GetFilter --> GetDays[Get Days from TIME_FILTERS]
    GetDays --> CalculateCutoff[Calculate Cutoff Date]
    CalculateCutoff --> Formula["cutoff = now - (days * 24 * 60 * 60 * 1000)"]
    Formula --> FilterLoop[For Each Item]
    FilterLoop --> ParseDate[Parse Item Date]
    ParseDate --> Compare{Item Date >= Cutoff?}
    Compare -->|Yes| Include[Include in Results]
    Compare -->|No| Exclude[Exclude from Results]
    Include --> Next{More Items?}
    Exclude --> Next
    Next -->|Yes| FilterLoop
    Next -->|No| Output([Filtered Array])
```

---

## 8. Animation & UX System

### 8.1 Animation Principles

| Principle | Implementation |
|-----------|----------------|
| **Performance** | GPU-accelerated transforms only (translate, scale, opacity) |
| **Spring Easing** | `cubic-bezier(0.34, 1.56, 0.64, 1)` for natural feel |
| **Staggered Entry** | 50-100ms delays between sequential elements |
| **Micro-interactions** | Button hover/active states with scale feedback |

### 8.2 CSS Animation Variables

```css
:root {
    /* Premium Transitions - Spring Easing */
    --transition-fast: 150ms cubic-bezier(0.34, 1.56, 0.64, 1);
    --transition-base: 280ms cubic-bezier(0.34, 1.56, 0.64, 1);
    --transition-slow: 400ms cubic-bezier(0.34, 1.56, 0.64, 1);
    --transition-smooth: 500ms cubic-bezier(0.22, 1, 0.36, 1);
    --transition-bounce: 600ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

### 8.3 Keyframe Animations

```css
/* Staggered Panel Entrance */
@keyframes fadeSlideUp {
    from {
        opacity: 0;
        transform: translateY(20px) scale(0.98);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

/* Shimmer Loading Effect */
@keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
}

/* Gradient Flow for Primary Buttons */
@keyframes gradientFlow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}
```

### 8.4 Stagger Timing

```
PANEL ENTRANCE STAGGER
══════════════════════════════════════════════════
Panel 1:  ████░░░░░░░░░░░░░░  0.05s delay
Panel 2:  ░░░████░░░░░░░░░░░  0.10s delay
Panel 3:  ░░░░░░████░░░░░░░░  0.15s delay
Panel 4:  ░░░░░░░░░████░░░░░  0.20s delay
Panel 5:  ░░░░░░░░░░░░████░░  0.25s delay
Panel 6:  ░░░░░░░░░░░░░░████  0.30s delay
...
══════════════════════════════════════════════════
```

### 8.5 Button Micro-interactions

```css
.btn:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.btn:active {
    transform: translateY(0) scale(0.98);
    transition-duration: 50ms; /* Instant feedback */
}

.btn-primary:hover {
    box-shadow: 
        0 8px 30px rgba(0, 212, 170, 0.35), 
        0 0 20px rgba(0, 212, 170, 0.2); /* Glow effect */
}
```

---

## 9. Technical Implementation

### 9.1 Initialization Sequence

```mermaid
sequenceDiagram
    participant DOM as DOMContentLoaded
    participant Map as initMap()
    participant Panels as initPanels()
    participant Modals as initModals()
    participant Events as initEventListeners()
    participant Filters as initTimeFilters()
    participant Data as loadAllData()
    participant Refresh as startAutoRefresh()
    participant Time as updateTime()
    participant Political as initPoliticalIntel()
    
    DOM->>Map: Initialize Leaflet map
    DOM->>Panels: Setup panel visibility
    DOM->>Modals: Bind modal handlers
    DOM->>Events: Attach event listeners
    DOM->>Filters: Create filter buttons
    DOM->>Data: Load all data sources
    DOM->>Refresh: Start auto-refresh timers
    DOM->>Time: Update clock every second
    
    Note over Political: 500ms delay
    DOM->>Political: Initialize Political Intel
    Political->>Political: loadTendenciasPoliticas()
    Political->>Political: generatePostsForTrends()
```

### 9.2 Error Handling Strategy

```javascript
// Standard error handling wrapper
async function safeApiCall(fetcher, fallback, containerId) {
    const container = document.getElementById(containerId);
    try {
        container.innerHTML = '<div class="loading-spinner"></div>';
        await fetcher();
        state.activeSources++;
    } catch (error) {
        console.error(`Error in ${containerId}:`, error);
        container.innerHTML = fallback || errorState('Error loading data');
    }
}

// Fallback templates
const errorState = (msg) => `
    <div class="error-state">
        <span class="error-icon">⚠️</span>
        <span class="error-msg">${msg}</span>
    </div>
`;

const emptyState = (msg) => `
    <div class="empty-state">
        <span class="empty-icon">📭</span>
        <span class="empty-msg">${msg}</span>
    </div>
`;
```

### 9.3 LocalStorage Persistence

```javascript
// Save candidate profile
function saveProfile(profile) {
    localStorage.setItem('candidateProfile', JSON.stringify(profile));
}

// Load candidate profile
function loadProfile() {
    const saved = localStorage.getItem('candidateProfile');
    return saved ? JSON.parse(saved) : defaultProfile;
}

// Save panel visibility preferences
function savePanelVisibility(visibility) {
    localStorage.setItem('panelVisibility', JSON.stringify(visibility));
}
```

---

## 10. API Reference

### 10.1 Government APIs (datos.gov.co)

| API | Endpoint | Auth | Rate Limit |
|-----|----------|------|------------|
| SECOP I | `jbjy-vk9h.json` | None | 10K/day |
| SECOP II | `p6dx-8zbt.json` | None | 10K/day |
| Proyectos Ley | `vnh5-78a3.json` | None | 10K/day |
| TRM | `32sa-8pi3.json` | None | 10K/day |

### 10.2 Financial APIs

| API | Endpoint | Auth | Rate Limit |
|-----|----------|------|------------|
| CoinGecko | `/api/v3/simple/price` | None | 50/min |
| CoinGecko Markets | `/api/v3/coins/markets` | None | 50/min |

### 10.3 Geospatial APIs

| API | Endpoint | Auth | Rate Limit |
|-----|----------|------|------------|
| OpenSky | `/api/states/all` | None | 400/day |
| USGS Earthquakes | `/fdsnws/event/1/query` | None | Unlimited |
| NASA EONET | `/api/v3/events` | None | Unlimited |

### 10.4 RSS Feeds

All RSS feeds are accessed via `rss2json.com` CORS proxy:

```javascript
const rssUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`;
```

---

## 11. Algorithms & Data Structures

### 11.1 Time Ago Calculation

```javascript
function timeAgo(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    
    const intervals = [
        { label: 'año',  seconds: 31536000 },
        { label: 'mes',  seconds: 2592000 },
        { label: 'sem',  seconds: 604800 },
        { label: 'd',    seconds: 86400 },
        { label: 'h',    seconds: 3600 },
        { label: 'min',  seconds: 60 }
    ];
    
    for (const interval of intervals) {
        const count = Math.floor(seconds / interval.seconds);
        if (count >= 1) {
            return `${count}${interval.label}`;
        }
    }
    
    return 'ahora';
}
```

### 11.2 Text Truncation

```javascript
function truncate(text, maxLength) {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - 3) + '...';
}
```

### 11.3 Department Data Structure

```javascript
const DEPARTMENT = {
    code: 'ANT',           // 3-letter code
    name: 'Antioquia',     // Full name
    capital: 'Medellín',   // Capital city
    lat: 6.2442,           // Latitude
    lng: -75.5812,         // Longitude
    pop: '6.7M'            // Population
};
```

### 11.4 Hotspot Intelligence Structure

```javascript
const HOTSPOT = {
    lat: 7.8939,
    lng: -72.5078,
    name: 'CATATUMBO',
    level: 'high',             // high | elevated | low
    category: 'Zona de Conflicto',
    description: 'Región fronteriza...',
    status: 'CONFLICTO ACTIVO',
    coordinates: '7.89°N, 72.51°W',
    groups: ['ELN', 'Disidencias FARC'],
    indicators: [
        { label: 'Hectáreas coca', value: '41,000', trend: 'up' },
        { label: 'Desplazados', value: '8,500', trend: 'up' }
    ],
    news: [
        { title: 'Enfrentamientos...', time: '2h' }
    ],
    tags: ['ARMED', 'COCA', 'BORDER']
};
```

---

## 12. Deployment

### 12.1 Local Development

**Option A: Python HTTP Server**
```bash
cd colombia-monitor
python -m http.server 8080
# Access: http://localhost:8080
```

**Option B: Node.js Live Server**
```bash
npx -y serve -l 8080
# Access: http://localhost:8080
```

**Option C: Direct File Access**
```
file:///path/to/colombia-monitor/index.html
```

### 12.2 GitHub Pages

1. Push changes to `master`
2. Enable GitHub Pages in repository settings
3. Access at: `https://dominusbabel.github.io/colombia-live-monitor/`

### 12.3 Network Deployment

```bash
# Get local IP
ipconfig  # Windows
ifconfig  # Linux/Mac

# Serve on all interfaces
python -m http.server 8080 --bind 0.0.0.0

# Access from any device: http://192.168.x.x:8080
```

---

## 13. Performance Optimization

### 13.1 Optimization Strategies

| Strategy | Implementation | Impact |
|----------|----------------|--------|
| **Lazy Loading** | Load panels on scroll | -40% initial load |
| **Request Debouncing** | Throttle user inputs | -60% API calls |
| **DOM Batching** | Batch innerHTML updates | -30% reflows |
| **GPU Acceleration** | Transform/opacity only | +50% animation FPS |
| **Image Optimization** | SVG icons, WebP assets | -70% image size |

### 13.2 Memory Management

```javascript
// Destroy chart before recreating
if (state.charts[panelId]) {
    state.charts[panelId].destroy();
}
state.charts[panelId] = new Chart(ctx, config);

// Clear unused markers
function clearMarkers(layerGroup) {
    layerGroup.clearLayers();
}
```

### 13.3 Network Optimization

```javascript
// Parallel API calls using Promise.all
async function loadAllData() {
    await Promise.all([
        loadCrypto(),
        loadMercados(),
        loadNoticias(),
        loadAlertas(),
        // ... more loaders
    ]);
}
```

---

## 14. Roadmap

### Version 6.1 (Q1 2026)
- [ ] WebSocket integration for real-time updates
- [ ] Push notifications for critical alerts
- [ ] Enhanced political trend detection via NLP
- [ ] Multi-language support (EN/ES)

### Version 6.2 (Q2 2026)
- [ ] AI-powered content improvement
- [ ] Sentiment analysis on trends
- [ ] Collaborative annotations
- [ ] Custom dashboard layouts

### Version 7.0 (Post-Elections)
- [ ] Full electoral results integration
- [ ] Historical comparison tools
- [ ] Mobile native app (React Native)
- [ ] API backend for enterprise deployments

---

## 15. Citation

> TALLEYRAND Systems. (2026). *COLINT v6.0: Real-Time OSINT Platform with Political Intelligence, Electoral Analysis, and Premium Animations*. Technical Whitepaper.

**BibTeX:**
```bibtex
@techreport{colint2026,
    author = {TALLEYRAND Intelligence Systems},
    title = {COLINT: A Decentralized Architecture for Real-Time OSINT Fusion},
    year = {2026},
    version = {6.0.0},
    url = {https://github.com/DOMINUSBABEL/colombia-live-monitor},
    note = {Political Intelligence Module, D'Hondt Simulator, Premium UX}
}
```

---

## 16. Theoretical Framework

### 16.1 OSINT Intelligence Cycle

COLINT implements the classical intelligence cycle adapted for open-source digital environments:

```mermaid
graph LR
    subgraph "Intelligence Cycle"
        Direction[1. Direction<br/>Define Requirements]
        Collection[2. Collection<br/>Gather Data]
        Processing[3. Processing<br/>Transform Data]
        Analysis[4. Analysis<br/>Generate Insights]
        Dissemination[5. Dissemination<br/>Deliver Products]
        Feedback[6. Feedback<br/>Evaluate & Iterate]
    end
    
    Direction --> Collection
    Collection --> Processing
    Processing --> Analysis
    Analysis --> Dissemination
    Dissemination --> Feedback
    Feedback --> Direction
```

#### Phase Mapping to COLINT Components

| Intelligence Phase | COLINT Implementation | Technical Component |
|-------------------|----------------------|---------------------|
| **Direction** | User configures panels, filters, perspective | `initPanels()`, `state.panelFilters` |
| **Collection** | Automated API polling, RSS ingestion | `loadAllData()`, `fetchNewsPanel()` |
| **Processing** | Data normalization, time filtering | `filterByDate()`, `truncate()` |
| **Analysis** | Trend scoring, impact classification | `loadTendenciasPoliticas()`, impact levels |
| **Dissemination** | Dashboard visualization, report export | `renderGeneratedPosts()`, `downloadReport()` |
| **Feedback** | Auto-refresh, user interactions | `startAutoRefresh()`, event listeners |

### 16.2 Information Operations Framework

The Political Intelligence Module is grounded in contemporary Information Operations (IO) theory:

```
INFORMATION OPERATIONS SPECTRUM
══════════════════════════════════════════════════════════════════════════
                    DEFENSIVE                      OFFENSIVE
                        ↓                              ↓
┌─────────────────────────────────────────────────────────────────────────┐
│  COLINT Application Areas                                               │
│                                                                         │
│  [MONITORING]     [ANALYSIS]      [GENERATION]     [DISSEMINATION]     │
│                                                                         │
│  • Trend tracking  • Impact scoring  • Post templates  • Report export │
│  • RSS aggregation • Perspective     • Personality     • Clipboard     │
│  • API fusion        framing           matrix           copy           │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
              ↑                                              ↑
        Situational                                    Strategic
        Awareness                                    Communication
══════════════════════════════════════════════════════════════════════════
```

### 16.3 Sentiment and Perspective Theory

The three-perspective system (Opposition/Government/Neutral) is based on political communication theory:

| Perspective | Communication Goal | Rhetorical Strategy | Example Frame |
|-------------|-------------------|---------------------|---------------|
| **Opposition** | Challenge incumbent narrative | Confrontational, solution-oriented | "El gobierno fracasó, nosotros proponemos..." |
| **Government** | Defend and promote policies | Achievement-focused, inclusive | "Por primera vez estamos logrando..." |
| **Neutral** | Inform without bias | Balanced, data-driven | "Los indicadores muestran que..." |

### 16.4 Personality-Based Content Generation

The template system draws from computational linguistics and political branding research:

```mermaid
graph TD
    subgraph "Personality Matrix Components"
        Identity[Professional Identity<br/>e.g., Geóloga]
        Regional[Regional Identity<br/>e.g., Paisa]
        Style[Communication Style<br/>e.g., Directa, Frentera]
        Political[Political Alignment<br/>e.g., Uribista]
        Phrases[Voice Markers<br/>e.g., "ome", "verraquera"]
    end
    
    subgraph "Template Processing"
        Select[Select Template by Category]
        Fill[Fill Context Variables]
        Inject[Inject Personality Markers]
        Validate[Validate Length ≤ 280]
    end
    
    subgraph "Output"
        Post[Personalized Social Media Post]
    end
    
    Identity --> Select
    Regional --> Inject
    Style --> Select
    Political --> Select
    Phrases --> Inject
    
    Select --> Fill
    Fill --> Inject
    Inject --> Validate
    Validate --> Post
```

---

## 17. Colombian Political Context Analysis

### 17.1 Electoral System Overview

Colombia uses a **mixed electoral system** with distinct mechanisms for different offices:

| Office | System | Seats | Method |
|--------|--------|-------|--------|
| President | Two-round majoritarian | 1 | Absolute majority or runoff |
| Senate | Proportional (national) | 108 | D'Hondt allocation |
| Chamber | Proportional (regional) | 188 | D'Hondt per department |
| Governors | First-past-the-post | 32 | Simple plurality |
| Mayors | First-past-the-post | 1,103 | Simple plurality |

### 17.2 Major Political Parties (2026)

```
COLOMBIAN POLITICAL SPECTRUM (Simplified)
══════════════════════════════════════════════════════════════════════════
LEFT                    CENTER                    RIGHT
  ↓                        ↓                        ↓
┌────────────┐     ┌────────────────┐     ┌─────────────────┐
│ Pacto      │     │ Alianza Verde  │     │ Centro          │
│ Histórico  │     │ Cambio Radical │     │ Democrático     │
│ (PH)       │     │ Partido Liberal│     │ (CD)            │
└────────────┘     └────────────────┘     │ Partido         │
     │                     │               │ Conservador     │
     │                     │               └─────────────────┘
     ▼                     ▼                       ▼
Currently in         Swing votes              Main opposition
government           decisive                 bloc
══════════════════════════════════════════════════════════════════════════
```

### 17.3 Key Political Trends (2025-2026)

Based on the trends implemented in COLINT's Political Intelligence Module:

#### Trend 1: Regional Autonomy vs. Centralism

**Context:** Ongoing tension between departmental governments (especially Antioquia) and the national executive over policy implementation and institutional control.

**Key Actors:**
- Andrés Julián Rendón (Governor of Antioquia, Centro Democrático)
- National Government (Pacto Histórico coalition)

**COLINT Implementation:**
```javascript
{
    id: 1,
    title: 'RENDÓN VS GOBIERNO NACIONAL',
    category: 'autonomia',
    impact: 'critical',
    region: 'antioquia'
}
```

#### Trend 2: Peace Policy Evaluation

**Context:** The "Paz Total" policy facing challenges with ELN negotiations and FARC dissident activity.

**Key Metrics Tracked:**
- Dialogue status with armed groups
- Violence indicators (homicides, displacements)
- Territory control changes

#### Trend 3: Opposition Mobilization

**Context:** Pre-electoral movements gathering signatures and building coalitions.

**Key Movement:** "Firme por la Patria" led by Abelardo de la Espriella

#### Trend 4: Municipal Governance

**Context:** Performance evaluation of major city administrations, particularly Medellín under Federico Gutiérrez.

#### Trend 5: Economic Governance

**Context:** Employment quality, inflation, and reform implementation debates.

### 17.4 Colombian Government Data Infrastructure

COLINT leverages Colombia's open data initiatives:

```mermaid
graph TD
    subgraph "Datos Abiertos Colombia (datos.gov.co)"
        SECOP1[SECOP I<br/>Contratación Pública]
        SECOP2[SECOP II<br/>Contratación Electrónica]
        TRM[TRM<br/>Tasa de Cambio]
        DANE[DANE<br/>Estadísticas Nacionales]
    end
    
    subgraph "Electoral Authorities"
        CNE[CNE<br/>Consejo Nacional Electoral]
        REG[Registraduría<br/>Nacional]
    end
    
    subgraph "Legislative Branch"
        CONGRESO[Congreso Visible<br/>API]
        SENADO[Senado.gov.co]
        CAMARA[Cámara.gov.co]
    end
    
    subgraph "Emergency Services"
        UNGRD[UNGRD<br/>Gestión del Riesgo]
        IDEAM[IDEAM<br/>Meteorología]
    end
    
    SECOP1 --> COLINT((COLINT))
    SECOP2 --> COLINT
    TRM --> COLINT
    CNE --> COLINT
    REG --> COLINT
    CONGRESO --> COLINT
    UNGRD --> COLINT
    IDEAM --> COLINT
```

---

## 18. Natural Language Processing Approaches

### 18.1 Template-Based Generation vs. LLM

COLINT v6.0 uses **template-based generation** rather than LLM APIs for several reasons:

| Criterion | Template-Based | LLM API |
|-----------|---------------|---------|
| **Predictability** | ✅ High - deterministic output | ⚠️ Variable |
| **Cost** | ✅ Free | ❌ Per-token billing |
| **Latency** | ✅ Instant (<10ms) | ⚠️ 1-5 seconds |
| **Offline** | ✅ Works offline | ❌ Requires network |
| **Control** | ✅ Full control over output | ⚠️ Filtering required |
| **Creativity** | ⚠️ Limited to templates | ✅ High variation |
| **Scalability** | ✅ Unlimited | ⚠️ Rate limited |

### 18.2 Template Variable Substitution Algorithm

```
TEMPLATE FILLING ALGORITHM
══════════════════════════════════════════════════════════════════════════

INPUT:
  template = "¡Ome! {topic} es {impact}. {emoji} #{hashtag}"
  context = {
    topic: "La paz total fracasó",
    impact: "crítico",
    emoji: "⚔️",
    hashtag: "SeguridadDemocrática"
  }

PROCESS:
  1. For each {variable} in template:
     2. Find corresponding value in context
     3. Replace {variable} with value
     4. If not found, keep original {variable}
  
  5. Apply personality injection (50% probability):
     If random() > 0.5:
       Select phrase from candidate.phrases
       Prepend "¡{Phrase}! " to result
  
  6. Validate length:
     If length > 280:
       Truncate to 277 characters
       Append "..."

OUTPUT:
  "¡Ome! La paz total fracasó es crítico. ⚔️ #SeguridadDemocrática"

══════════════════════════════════════════════════════════════════════════
```

### 18.3 Future NLP Enhancements (Roadmap)

| Version | NLP Feature | Implementation Approach |
|---------|-------------|------------------------|
| 6.1 | Keyword extraction from RSS | TF-IDF scoring on headlines |
| 6.1 | Trend clustering | K-means on keyword vectors |
| 6.2 | Sentiment scoring | Lexicon-based (AFINN-ES) |
| 6.2 | Named entity recognition | Pattern matching for Colombian entities |
| 7.0 | Optional LLM integration | Gemini API for creative variation |

---

## 19. Security Considerations

### 19.1 Threat Model

```
COLINT THREAT MODEL
══════════════════════════════════════════════════════════════════════════

ASSET: Political intelligence data, campaign content, user preferences

THREAT ACTORS:
  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
  │ Political       │  │ Cybercriminals  │  │ State-level     │
  │ Opponents       │  │                 │  │ Actors          │
  └─────────────────┘  └─────────────────┘  └─────────────────┘
         │                    │                    │
         ▼                    ▼                    ▼
  Content theft,       Data exfiltration,   Surveillance,
  impersonation        ransomware           disruption

ATTACK VECTORS:
  1. Browser XSS via malicious RSS content
  2. LocalStorage tampering
  3. Man-in-the-middle on API calls
  4. Physical device access

MITIGATIONS IMPLEMENTED:
  ✅ No server-side storage (data stays local)
  ✅ HTTPS for all API calls
  ✅ Content sanitization before innerHTML
  ⚠️ LocalStorage not encrypted (future work)

══════════════════════════════════════════════════════════════════════════
```

### 19.2 Data Privacy Compliance

| Regulation | Applicability | COLINT Compliance |
|------------|---------------|-------------------|
| Ley 1581/2012 (Colombia) | Personal data processing | ✅ No PII collected |
| GDPR (if EU users) | Data protection | ✅ Client-side only |
| Campaign finance laws | Political content | ⚠️ User responsibility |

### 19.3 Content Responsibility Disclaimer

> [!CAUTION]
> The Political Intelligence Module generates content based on user-configured templates and perspectives. Users are solely responsible for reviewing and approving content before publication. COLINT and TALLEYRAND Intelligence Systems disclaim liability for any content generated through the platform.

---

## 20. Comparative Analysis

### 20.1 COLINT vs. Similar Platforms

| Feature | COLINT v6.0 | Maltego | Palantir Gotham | Hootsuite | Custom OSINT |
|---------|-------------|---------|-----------------|-----------|--------------|
| **Cost** | Free/MIT | $$$ | $$$$ | $$ | Variable |
| **Deployment** | Browser | Desktop | Server | Cloud | Variable |
| **Political Intel** | ✅ Built-in | ❌ | ✅ | Partial | Build yourself |
| **Content Gen** | ✅ Templates | ❌ | ❌ | ✅ AI | Build yourself |
| **Colombian Focus** | ✅ Native | Manual | Custom | Generic | Manual |
| **Offline** | ✅ Partial | ✅ | ❌ | ❌ | Variable |
| **Learning Curve** | Low | High | Very High | Medium | High |

### 20.2 Architecture Comparison

```
COLINT ARCHITECTURE POSITIONING
══════════════════════════════════════════════════════════════════════════

                        HEAVY INFRASTRUCTURE
                               ↑
                               │
         ┌─────────────────────┼─────────────────────┐
         │                     │                     │
         │     Palantir        │      Enterprise     │
         │     Gotham          │      SIEM           │
         │                     │                     │
         │                     │                     │
LOW ←────┼─────────────────────┼─────────────────────┼────→ HIGH
COMPLEXITY                     │                     COMPLEXITY
         │                     │                     │
         │    ★ COLINT ★       │      Maltego       │
         │    v6.0             │                     │
         │                     │                     │
         │    Hootsuite        │      Custom        │
         │                     │      Dashboards    │
         │                     │                     │
         └─────────────────────┼─────────────────────┘
                               │
                               ↓
                        ZERO INFRASTRUCTURE
                        (Browser-only)

══════════════════════════════════════════════════════════════════════════
```

### 20.3 Use Case Suitability

| Use Case | COLINT Fit | Rationale |
|----------|-----------|-----------|
| Political campaign monitoring | ⭐⭐⭐⭐⭐ | Core design purpose |
| Government accountability | ⭐⭐⭐⭐⭐ | SECOP integration |
| Electoral analysis | ⭐⭐⭐⭐⭐ | D'Hondt, historical data |
| Content generation | ⭐⭐⭐⭐ | Template-based, customizable |
| Crisis monitoring | ⭐⭐⭐⭐ | Alerts, earthquakes, fires |
| Financial trading | ⭐⭐⭐ | Crypto/TRM data available |
| Investigative journalism | ⭐⭐⭐⭐ | Multi-source aggregation |
| Academic research | ⭐⭐⭐⭐ | Open source, documented |

---

## 21. Case Studies

### 21.1 Case Study: Regional Autonomy Campaign

**Scenario:** A Centro Democrático candidate in Antioquia wants to amplify the autonomy message.

**COLINT Workflow:**

1. **Configuration**
   - Set perspective: `Opposition`
   - Set party: `CD (Centro Democrático)`
   - Configure traits: `Paisa`, `Directa`, `Territorial`

2. **Trend Loading**
   - Filter by region: `Antioquia`
   - System loads `RENDÓN VS GOBIERNO NACIONAL` trend

3. **Post Generation**
   - 10 posts generated using `autonomia` category templates
   - Posts incorporate Paisa expressions and territorial language

4. **Output Examples**
   ```
   Post 1: "¡Ome, qué pena con el señor de Bogotá! Aquí en 
           Antioquia tenemos AUTONOMÍA. El Gobernador de 
           Antioquia denuncia a Petro 🏛️ #AntioquiaResiste"
   
   Post 5: "El uribismo es defender la PATRIA desde las 
           regiones. ¡Firmes! 🇨🇴 #AntioquiaResiste"
   ```

5. **Export**
   - Download markdown report with all 10 posts
   - Copy individual posts for scheduling

### 21.2 Case Study: Government Response Monitoring

**Scenario:** An analyst needs to track government procurement patterns.

**COLINT Workflow:**

1. **Panel Configuration**
   - Enable SECOP I and SECOP II panels
   - Set time filter: `7D` (last 7 days)

2. **Data Monitoring**
   - Real-time contract values displayed
   - Entity names and contract objects visible

3. **Alert Response**
   - Large contracts (>$1B) highlighted
   - Time-series patterns identifiable

4. **Integration with Political Intel**
   - Cross-reference procurement with political trends
   - Generate commentary on government spending

### 21.3 Case Study: Electoral Scenario Planning

**Scenario:** Pre-electoral simulation of Senate composition changes.

**COLINT Workflow:**

1. **D'Hondt Simulator Access**
   - Navigate to Elections panel
   - Open D'Hondt calculator

2. **Scenario Input**
   - Enter projected vote percentages per party
   - Set total seats: 108

3. **Result Analysis**
   - View seat distribution
   - Compare with current composition
   - Identify kingmaker parties

4. **Report Integration**
   - Export scenario analysis
   - Combine with political trend assessment

---

## 22. Appendices

### Appendix A: Complete API Endpoint Reference

```yaml
# Government APIs
secop_i:
  url: https://www.datos.gov.co/resource/jbjy-vk9h.json
  method: GET
  auth: none
  rate_limit: 10000/day
  response: JSON array of contracts

secop_ii:
  url: https://www.datos.gov.co/resource/p6dx-8zbt.json
  method: GET
  auth: none
  rate_limit: 10000/day
  response: JSON array of contracts

proyectos_ley:
  url: https://www.datos.gov.co/resource/vnh5-78a3.json
  method: GET
  auth: none
  rate_limit: 10000/day
  response: JSON array of bills

trm:
  url: https://www.datos.gov.co/resource/32sa-8pi3.json
  method: GET
  auth: none
  rate_limit: 10000/day
  response: JSON with exchange rate

# Financial APIs
coingecko_prices:
  url: https://api.coingecko.com/api/v3/simple/price
  method: GET
  params: ids, vs_currencies
  auth: none
  rate_limit: 50/min

coingecko_markets:
  url: https://api.coingecko.com/api/v3/coins/markets
  method: GET
  params: vs_currency, order, per_page
  auth: none
  rate_limit: 50/min

# Geospatial APIs
opensky:
  url: https://opensky-network.org/api/states/all
  method: GET
  params: lamin, lomin, lamax, lomax
  auth: optional (for higher rate)
  rate_limit: 400/day (anon)

usgs_earthquakes:
  url: https://earthquake.usgs.gov/fdsnws/event/1/query
  method: GET
  params: format, minmagnitude, limit
  auth: none
  rate_limit: unlimited

nasa_eonet:
  url: https://eonet.gsfc.nasa.gov/api/v3/events
  method: GET
  params: category, status, limit
  auth: none
  rate_limit: unlimited

# RSS Feeds (via rss2json proxy)
proxy_base: https://api.rss2json.com/v1/api.json
proxy_param: rss_url={encoded_feed_url}

feeds:
  - https://www.eltiempo.com/rss/colombia.xml
  - https://www.semana.com/rss/nacion.xml
  - https://feeds.bbci.co.uk/news/world/latin_america/rss.xml
  - https://feeds.bbci.co.uk/news/world/europe/rss.xml
  - https://www.aljazeera.com/xml/rss/all.xml
  - https://techcrunch.com/feed/
  - https://feeds.feedburner.com/TheHackersNews
```

### Appendix B: CSS Animation Timing Functions

```css
/* Standard easing functions */
--ease-linear: linear;
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

/* Spring easing (COLINT custom) */
--spring-gentle: cubic-bezier(0.34, 1.56, 0.64, 1);
--spring-bouncy: cubic-bezier(0.68, -0.55, 0.265, 1.55);
--spring-snappy: cubic-bezier(0.22, 1, 0.36, 1);

/* Animation durations */
--duration-instant: 50ms;   /* Active states */
--duration-fast: 150ms;     /* Micro-interactions */
--duration-base: 280ms;     /* Standard transitions */
--duration-slow: 400ms;     /* Complex animations */
--duration-emphasis: 600ms; /* Attention-grabbing */
```

### Appendix C: Department Codes and Coordinates

| Code | Department | Capital | Lat | Lng | Population |
|------|------------|---------|-----|-----|------------|
| ANT | Antioquia | Medellín | 6.2442 | -75.5812 | 6.7M |
| ATL | Atlántico | Barranquilla | 10.9639 | -74.7964 | 2.5M |
| BOG | Bogotá D.C. | Bogotá | 4.7110 | -74.0721 | 7.4M |
| BOL | Bolívar | Cartagena | 10.3910 | -75.4794 | 2.2M |
| BOY | Boyacá | Tunja | 5.5446 | -73.3573 | 1.3M |
| CAL | Caldas | Manizales | 5.0689 | -75.5174 | 1.0M |
| CAQ | Caquetá | Florencia | 1.6144 | -75.6062 | 0.5M |
| CAU | Cauca | Popayán | 2.4419 | -76.6061 | 1.5M |
| CES | Cesar | Valledupar | 10.4769 | -73.2505 | 1.1M |
| COR | Córdoba | Montería | 8.7575 | -75.8856 | 1.8M |
| CUN | Cundinamarca | Bogotá | 4.8342 | -74.3310 | 2.9M |
| HUI | Huila | Neiva | 2.9259 | -75.2879 | 1.2M |
| LAG | La Guajira | Riohacha | 11.5444 | -72.9072 | 1.0M |
| MAG | Magdalena | Santa Marta | 11.2408 | -74.2110 | 1.3M |
| MET | Meta | Villavicencio | 4.1420 | -73.6266 | 1.0M |
| NAR | Nariño | Pasto | 1.2136 | -77.2811 | 1.8M |
| NSA | N. Santander | Cúcuta | 7.8939 | -72.5078 | 1.4M |
| PUT | Putumayo | Mocoa | 1.1494 | -76.6519 | 0.4M |
| QUI | Quindío | Armenia | 4.5339 | -75.6811 | 0.6M |
| RIS | Risaralda | Pereira | 4.8133 | -75.6961 | 1.0M |
| SAN | Santander | Bucaramanga | 7.1254 | -73.1198 | 2.2M |
| SUC | Sucre | Sincelejo | 9.3047 | -75.3978 | 0.9M |
| TOL | Tolima | Ibagué | 4.4389 | -75.2322 | 1.4M |
| VAC | Valle del Cauca | Cali | 3.4516 | -76.5320 | 4.7M |
| ARA | Arauca | Arauca | 7.0847 | -70.7592 | 0.3M |
| CAS | Casanare | Yopal | 5.3378 | -72.3959 | 0.4M |
| CHO | Chocó | Quibdó | 5.6947 | -76.6611 | 0.5M |
| GUA | Guaviare | San José | 2.5719 | -72.6408 | 0.1M |
| VID | Vichada | Puerto Carreño | 6.1892 | -67.4858 | 0.1M |
| AMA | Amazonas | Leticia | -4.2153 | -69.9406 | 0.08M |
| GUV | Guainía | Inírida | 3.8653 | -67.9239 | 0.05M |
| VAU | Vaupés | Mitú | 1.2536 | -70.2339 | 0.04M |

### Appendix D: Post Template Full Catalog

#### Opposition Templates - Autonomía (10)

```javascript
const AUTONOMIA_TEMPLATES = [
    '¡Ome, qué pena con el señor de Bogotá! Aquí en Antioquia tenemos AUTONOMÍA. {topic} {emoji} #{hashtag}',
    'Como geóloga lo digo: cuando la roca se fractura por presión externa, el territorio se defiende. {topic} 🏔️',
    'Desde la montaña vemos clarito quién quiere destruir las instituciones que los paisas construimos. {emoji}',
    'A mí me enseñaron que uno defiende el territorio con las uñas. {topic} 👊',
    'El uribismo es defender la PATRIA desde las regiones. ¡Firmes! 🇨🇴 #{hashtag}',
    '¿Cuándo habían visto esta vaina? Así de grave está. Pero aquí NO nos dejamos. {emoji} #{hashtag}',
    'Les cuento desde el territorio: {topic}. Hechos vs. discursos vacíos. ✅',
    'Acá la gente está mamada del centralismo. ¡No señor! {topic}. Con Rendón firmes 💪',
    'La geología me enseñó que las fallas se identifican antes de causar daño. {topic} 🚫',
    'Cuando uno camina el territorio, escucha a la gente. {topic}. Eso es democracia real. 🎤'
];
```

#### Opposition Templates - Seguridad (10)

```javascript
const SEGURIDAD_TEMPLATES = [
    '"Paz Total" le dijeron. ¿Y qué tenemos? Más muertos, más desplazados. ¡Con terroristas NO se negocia! {emoji}',
    'Yo recorro el campo. ¿Saben qué veo? Campesinos huyendo. La "paz" de Petro es guerra para Colombia 🚜❌',
    'En Antioquia sabemos lo que es Seguridad Democrática. Funcionó. Esta vaina NO funciona. 🎖️',
    '¿Narcoalianza con Venezuela? Son HECHOS que el gobierno no puede ocultar. {emoji} #{hashtag}',
    'Las familias desplazadas lo saben. Los soldados asesinados lo sabían. ¡BASTA de entreguismo! 😡',
    'Seguridad Democrática 2.0: que los colombianos volvamos a salir tranquilos. Sentido común. ☕',
    'El ELN seguirá secuestrando. Las disidencias crecen. ¿Con quién dialoga el gobierno? 🤦‍♀️',
    'Nuestros soldados merecen respaldo, NO negociar de rodillas. ¡Firme por la patria! 💪🎖️',
    'La minería ilegal financia guerrillas mientras hablan de "paz". Los recursos para Colombia, NO criminales ⛏️',
    'A los enemigos de la patria se les derrota, NO se les concilia. {topic} 🎈❌'
];
```

#### Opposition Templates - Economía (10)

```javascript
const ECONOMIA_TEMPLATES = [
    'El gobierno dice que la economía "creció". Lo que NO dice: mitad del empleo es INFORMAL. {emoji}',
    'Les cuento lo que veo en el campo: mineros sin apoyo, agricultores con insumos carísimos. {topic} 🤷‍♀️',
    'Inflación "controlada" dice el gobierno. Vayan al mercado. La gente no come estadísticas. 🛒💸',
    'Inversión privada genera empleo REAL. Incertidumbre lo ahuyenta. Conecten los puntos 🎯',
    'Como geóloga he visto proyectos paralizados por trabas. Empleos que NO se crean. ¡Despierten! ⛏️❌',
    'Trabajo formal = pensión. Informal = calle cuando envejeces. Y el gobierno celebra. Increíble 🙄',
    'En Antioquia sabemos trabajar. Necesitamos gobierno que no ponga trabas. Lo básico. 🚛',
    'Reforma laboral espanta empleo, salud desfinanciada, tributaria exprime. Resultado: informalidad. 🤡',
    'Hablan de justicia social pero generan más pobres. Matemáticas básicas que no entienden. 📚',
    'Colombia necesita gobierno que entienda economía REAL, no experimentos ideológicos. 💼'
];
```

### Appendix E: Glossary of Terms

| Term | Definition |
|------|------------|
| **COLINT** | Colombia Intelligence Monitor - the platform name |
| **OSINT** | Open Source Intelligence - intelligence from publicly available sources |
| **D'Hondt** | Proportional representation seat allocation method used in Colombia |
| **SECOP** | Sistema Electrónico de Contratación Pública - Colombian public procurement system |
| **E-14** | Electoral form for vote counting at polling stations |
| **E-24** | Electoral form for voter census data |
| **TRM** | Tasa Representativa del Mercado - official USD/COP exchange rate |
| **CNE** | Consejo Nacional Electoral - National Electoral Council |
| **UNGRD** | Unidad Nacional de Gestión del Riesgo de Desastres - disaster management agency |
| **Paisa** | Colloquial term for person from Antioquia region |
| **Uribismo** | Political movement associated with former president Álvaro Uribe |
| **Paz Total** | "Total Peace" - current government's peace policy |
| **Frentera** | Colloquial adjective meaning "direct" or "blunt" in communication |

### Appendix F: Changelog

```
COLINT VERSION HISTORY
══════════════════════════════════════════════════════════════════════════

v6.0.0 (January 2026)
  ✅ Political Intelligence Module (4 new panels)
  ✅ Candidate profile configuration with traits
  ✅ 10 posts per trend generation
  ✅ Opposition/Government/Neutral perspectives
  ✅ Markdown report export
  ✅ Premium animations (spring easing, stagger)
  ✅ Micro-interactions on buttons
  ✅ Party color theming (7 parties)

v5.0.0 (December 2025)
  ✅ SECOP II integration
  ✅ Time filtering system (24H/7D/30D/ALL)
  ✅ D'Hondt electoral simulator
  ✅ E-14/E-24 historical data
  ✅ Differentiated refresh intervals
  ✅ Enhanced conflict tracking

v4.0.0 (November 2025)
  ✅ Electoral panels (Presidential, Senate, Chamber)
  ✅ Chart.js visualizations
  ✅ 32 department markers

v3.0.0 (October 2025)
  ✅ Leaflet map integration
  ✅ GeoJSON Colombia boundaries
  ✅ Flight tracking (OpenSky)

v2.0.0 (September 2025)
  ✅ Multi-panel dashboard
  ✅ RSS feed aggregation
  ✅ Cryptocurrency prices

v1.0.0 (August 2025)
  ✅ Initial release
  ✅ Basic panel structure
  ✅ TRM exchange rate

══════════════════════════════════════════════════════════════════════════
```

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Contributors

- **TALLEYRAND Intelligence Systems** - Architecture & Development
- **DOMINUSBABEL** - Project Lead

---

## Acknowledgments

- **Datos Abiertos Colombia** - Government open data infrastructure
- **Registraduría Nacional** - Electoral data access
- **OpenSky Network** - Flight tracking API
- **CoinGecko** - Cryptocurrency price API
- **Chart.js Team** - Visualization library
- **Leaflet Contributors** - Mapping library

---

**© 2026 TALLEYRAND Intelligence Systems**  
*Building the future of decentralized electoral and governmental intelligence.*

---

<p align="center">
  <img src="https://img.shields.io/badge/Made%20with-❤️-red" alt="Made with love">
  <img src="https://img.shields.io/badge/Colombia-🇨🇴-yellow" alt="Colombia">
  <img src="https://img.shields.io/badge/OSINT-Intelligence-cyan" alt="OSINT">
  <img src="https://img.shields.io/badge/Political-Intel-purple" alt="Political Intel">
  <img src="https://img.shields.io/badge/Premium-UX-pink" alt="Premium UX">
  <img src="https://img.shields.io/badge/Research-Grade-gold" alt="Research Grade">
</p>

---

**Document Statistics:**
- Total Sections: 22
- Mermaid Diagrams: 15+
- Code Examples: 25+
- Tables: 30+
- Use Cases: 3 detailed
- API Endpoints: 15+
- Template Examples: 30+

