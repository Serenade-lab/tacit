import { User, Project, KnowledgeArticle, WorkspaceSource, SimilarityCheckResult } from '../types';

export const CURRENT_EMPLOYEE_USER: User = {
  id: 'usr-fenti-01',
  name: 'Fenti Irnawati',
  email: 'fenti@serenadedata.com',
  role: 'employee',
  avatar: '/src/assets/images/avatar_fenti_1792393460797.jpg',
  title: 'Lead Software Engineer',
  department: 'Core Logistics & Systems'
};

export const CURRENT_ADMIN_USER: User = {
  id: 'usr-admin-01',
  name: 'Marcus Vance',
  email: 'admin@serenadedata.com',
  role: 'admin',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus&backgroundColor=b6e3f4',
  title: 'VP of Engineering & Knowledge Systems',
  department: 'Infrastructure & Architecture'
};

export const INITIAL_WORKSPACE_SOURCES: WorkspaceSource[] = [
  {
    id: 'src-projects',
    name: 'Projects',
    type: 'projects',
    count: 12,
    unit: 'items',
    status: 'completed',
    details: '12 active production & internal services indexed',
    iconType: 'folder',
    lastSync: '10m ago'
  },
  {
    id: 'src-repos',
    name: 'Repositories',
    type: 'repositories',
    count: 8,
    unit: 'connected',
    status: 'completed',
    details: 'GitHub enterprise repos with AST code parsing',
    iconType: 'github',
    lastSync: '4m ago'
  },
  {
    id: 'src-docs',
    name: 'Documents',
    type: 'documents',
    count: 124,
    unit: 'items',
    status: 'completed',
    details: 'Notion specs, Confluence ADRs & design docs',
    iconType: 'file-text',
    lastSync: 'Just now'
  },
  {
    id: 'src-workspaces',
    name: 'Team Workspaces',
    type: 'workspaces',
    count: 3,
    unit: 'devices',
    status: 'completed',
    details: "Abel's Laptop, Dev Team PC, Logistics Station",
    iconType: 'laptop',
    lastSync: '1m ago'
  },
  {
    id: 'src-other',
    name: 'Other Sources',
    type: 'other',
    count: 5,
    unit: 'sources',
    status: 'syncing',
    details: 'Slack discussions, Jira tickets, CI test logs',
    iconType: 'cloud',
    lastSync: 'Scanning...'
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-inventory-ai',
    title: 'InventoryAI',
    description: 'Inventory management with AI forecasting and real-time tracking.',
    similarityScore: 86,
    techStack: ['Python', 'FastAPI', 'ML', 'PostgreSQL'],
    domain: 'Warehouse & Fulfillment',
    lastUpdated: 'Updated 2 days ago',
    repositoryUrl: 'internal-git.serenade.net/logistics/inventory-ai',
    documentsCount: 42,
    image: '/src/assets/images/project_inventory_ai_1792393443205.jpg',
    status: 'production',
    team: 'Logistics ML Platform',
    leadEngineer: 'Ahmad Faisal',
    matchReasons: [
      'Identical core domain: Warehouse inventory reconciliation',
      'Production-tested Prophet forecasting pipeline (94.2% accuracy)',
      'High-throughput FastAPI SKU binning endpoints'
    ],
    reusableModules: [
      {
        id: 'mod-prophet-forecaster',
        name: 'prophet-demand-forecaster',
        description: 'Timeseries forecasting pipeline for SKU demand spikes and replenishment windows.',
        language: 'Python',
        installCommand: 'pip install @serenade/prophet-forecaster',
        codeSnippet: `from serenade_logistics.forecasting import DemandForecaster

model = DemandForecaster(seasonality='weekly', lead_time_days=4)
forecast = model.predict_sku_demand(sku_id="SKU-89201", horizon=30)
print(forecast.recommended_reorder_point)`,
        dependencies: ['prophet>=1.1.5', 'pandas>=2.1.0', 'scikit-learn'],
        reusabilityRating: 95
      },
      {
        id: 'mod-realtime-stock',
        name: 'realtime-stock-websocket',
        description: 'WebSocket pub/sub stream engine for warehouse stock level changes across multi-bay stations.',
        language: 'Python / Redis',
        installCommand: 'pip install @serenade/realtime-stock-stream',
        codeSnippet: `from serenade_logistics.stream import StockStreamClient

client = StockStreamClient(redis_url="redis://internal-mesh:6379")
await client.subscribe_bay_updates("BAY-A4-EAST", on_stock_delta=handle_delta)`,
        dependencies: ['redis>=5.0.0', 'websockets>=12.0'],
        reusabilityRating: 90
      },
      {
        id: 'mod-warehouse-sku-binning',
        name: 'warehouse-sku-binning',
        description: 'Algorithmic 3D bin packing and pallet slotting optimization algorithm.',
        language: 'Python / C++ bindings',
        installCommand: 'pip install @serenade/bin-packer-core',
        codeSnippet: `from serenade_logistics.binning import optimize_pallet_placement

layout = optimize_pallet_placement(items=incoming_manifest, bay_capacity=warehouse_bay_specs)
print(f"Optimal packing density: {layout.density_score}%")`,
        dependencies: ['numpy>=1.24.0', 'scipy>=1.11.0'],
        reusabilityRating: 88
      }
    ],
    pastDecisions: [
      {
        id: 'dec-fastapi-eval',
        title: 'ADR-042: Migration from Flask to FastAPI for 10x throughput',
        summary: 'Benchmarked Flask vs FastAPI with Pydantic v2 serialization under 4,000 req/sec.',
        reason: 'Async async/await in FastAPI allowed non-blocking calls to the Redis inventory lock manager without worker starvation.',
        date: 'Oct 2025',
        author: 'Ahmad Faisal',
        category: 'architecture'
      },
      {
        id: 'dec-postgres-partitioning',
        title: 'ADR-038: PostgreSQL Declarative Partitioning for SKU Movement History',
        summary: 'Decided against DynamoDB due to complex multi-table SQL queries required for audit reconciliations.',
        reason: 'Monthly range partitioning on movement_timestamp reduced index sizes by 74% and sped up balance sheet generation.',
        date: 'Aug 2025',
        author: 'Sarah Chen',
        category: 'database'
      }
    ]
  },
  {
    id: 'proj-smart-stock',
    title: 'SmartStock',
    description: 'Stock management for retail and warehouse.',
    similarityScore: 78,
    techStack: ['React', 'Node.js', 'MySQL'],
    domain: 'Retail & Storefront Operations',
    lastUpdated: 'Updated 5 days ago',
    repositoryUrl: 'internal-git.serenade.net/retail/smart-stock',
    documentsCount: 28,
    image: '/src/assets/images/project_smart_stock_1792393443144.jpg',
    status: 'production',
    team: 'Retail Experience Team',
    leadEngineer: 'Elena Rostova',
    matchReasons: [
      'Modern React inventory dashboard with virtualized SKU datatable',
      'Barcode & handheld scanner event bus integration',
      'Production-tested purchase order approval workflow'
    ],
    reusableModules: [
      {
        id: 'mod-barcode-scanner',
        name: 'use-barcode-scanner-hook',
        description: 'React hook for USB & Bluetooth hardware barcode scanners with automatic debouncing and checksum verification.',
        language: 'TypeScript / React',
        installCommand: 'npm install @serenade/ui-scanner-hook',
        codeSnippet: `import { useBarcodeScanner } from '@serenade/ui-scanner-hook';

export function ReceivingDockScanner() {
  useBarcodeScanner({
    onScan: (barcode) => lookupSKU(barcode),
    minChars: 8,
    timeoutMs: 50
  });
  return <div>Ready for scan...</div>;
}`,
        dependencies: ['react>=18.0.0'],
        reusabilityRating: 92
      },
      {
        id: 'mod-sku-virtual-grid',
        name: 'inventory-virtual-grid',
        description: 'Zero-latency virtualized data grid capable of rendering 100,000+ warehouse inventory rows with inline editing.',
        language: 'TypeScript / React',
        installCommand: 'npm install @serenade/sku-grid',
        codeSnippet: `import { SkuVirtualGrid } from '@serenade/sku-grid';

<SkuVirtualGrid
  data={inventoryRecords}
  columns={['SKU', 'Batch #', 'Location', 'Quantity', 'Status']}
  onRowChange={saveCellChange}
/>`,
        dependencies: ['react>=18.0.0', 'tanstack/react-virtual'],
        reusabilityRating: 89
      }
    ],
    pastDecisions: [
      {
        id: 'dec-react-virtualization',
        title: 'ADR-029: Virtual DOM rendering for large retail catalogs',
        summary: 'Eliminated browser freezes when warehouse associates opened 5,000+ item pick-lists.',
        reason: 'Standard tables caused DOM nodes count to surpass 25,000. Virtual rendering kept active DOM nodes under 120.',
        date: 'Jul 2025',
        author: 'Elena Rostova',
        category: 'architecture'
      }
    ]
  },
  {
    id: 'proj-asset-monitor',
    title: 'AssetMonitor',
    description: 'Asset tracking with real-time monitoring.',
    similarityScore: 62,
    techStack: ['Flutter', 'Firebase', 'IoT'],
    domain: 'Facility & Equipment IoT',
    lastUpdated: 'Updated 1 week ago',
    repositoryUrl: 'internal-git.serenade.net/iot/asset-monitor',
    documentsCount: 19,
    image: '/src/assets/images/project_asset_monitor_1792393445041.jpg',
    status: 'internal',
    team: 'Hardware & IoT Engineering',
    leadEngineer: 'Budi Santoso',
    matchReasons: [
      'RFID reader drivers and BLE gateway integrations',
      'Geofencing perimeter alerts for forklifts and high-value crates'
    ],
    reusableModules: [
      {
        id: 'mod-ble-rfid-gateway',
        name: 'ble-rfid-bridge-service',
        description: 'Lightweight daemon for bridging Zebra / Impinj RFID antennas into internal message queues.',
        language: 'Go / C',
        installCommand: 'docker pull registry.serenade.net/iot/rfid-gateway:latest',
        codeSnippet: `package main

import "github.com/serenade/iot/rfid"

func main() {
    reader := rfid.ConnectReader("192.168.10.45:5084")
    reader.StreamTags(func(tag rfid.EPCTag) {
        log.Printf("Pallet Tag Detected: %s at RSSI: %d", tag.EPC, tag.RSSI)
    })
}`,
        dependencies: ['go 1.22+'],
        reusabilityRating: 82
      }
    ],
    pastDecisions: [
      {
        id: 'dec-rfid-debounce',
        title: 'ADR-019: De-duplication of high-frequency RFID tag pings',
        summary: 'Fixed database write flooding from fixed portal antennas firing 80 pings/second per passing pallet.',
        reason: 'Implemented in-memory sliding window bucket filter at the edge gateway level before transmission to cloud.',
        date: 'Apr 2025',
        author: 'Budi Santoso',
        category: 'infrastructure'
      }
    ]
  },
  {
    id: 'proj-supply-chain',
    title: 'SupplyChain Hub',
    description: 'Supply chain and inventory reporting.',
    similarityScore: 54,
    techStack: ['Python', 'Tableau', 'API'],
    domain: 'Global Logistics & Customs',
    lastUpdated: 'Updated 2 weeks ago',
    repositoryUrl: 'internal-git.serenade.net/bi/supply-chain-hub',
    documentsCount: 35,
    image: '/src/assets/images/project_supply_chain_1792393445450.jpg',
    status: 'production',
    team: 'Business Intelligence & Ops',
    leadEngineer: 'Maya Putri',
    matchReasons: [
      'Consolidated inventory balance aggregation across 4 regional hubs',
      'Automated customs Harmonized System (HS) code classification'
    ],
    reusableModules: [
      {
        id: 'mod-customs-hs-classifier',
        name: 'customs-hs-classifier',
        description: 'NLP classification utility for mapping item descriptions to 6-digit international HS tariff codes.',
        language: 'Python',
        installCommand: 'pip install @serenade/customs-classifier',
        codeSnippet: `from serenade_customs import classify_item

result = classify_item("Hydraulic pallet jack 2500kg load capacity")
print(f"HS Code: {result.code} (Confidence: {result.confidence})")`,
        dependencies: ['transformers>=4.38.0', 'torch>=2.2.0'],
        reusabilityRating: 79
      }
    ],
    pastDecisions: [
      {
        id: 'dec-bi-lakehouse',
        title: 'ADR-055: Parquet columnar exports for warehouse analytics',
        summary: 'Decided to dump daily snapshot tables to S3 Parquet instead of running direct heavy SQL on production DB.',
        reason: 'Tableau direct queries were spiking PostgreSQL CPU to 98% during month-end inventory reconciliations.',
        date: 'Nov 2025',
        author: 'Maya Putri',
        category: 'database'
      }
    ]
  }
];

export const INITIAL_KNOWLEDGE_ARTICLES: KnowledgeArticle[] = [
  {
    id: 'art-01',
    title: 'Why We Picked FastAPI Over Flask for High-Throughput Inventory Sync',
    category: 'Architecture Decision',
    summary: 'A deep dive into latency benchmarks, ASGI concurrency, and async Redis drivers when handling 5,000+ warehouse scan transactions per minute.',
    source: 'Logistics Engineering ADR-042',
    author: 'Ahmad Faisal',
    date: 'Oct 14, 2025',
    tags: ['FastAPI', 'Python', 'Redis', 'Concurrency'],
    readTime: '4 min read',
    relatedProjectId: 'proj-inventory-ai',
    keyTakeaways: [
      'Pydantic v2 in FastAPI achieved 4.8x faster JSON payload validation for heavy SKU lists',
      'ASGI workers prevent thread exhaustion when waiting for distributed lock leases in Redis',
      'Memory footprint remained under 380MB per worker container under sustained load'
    ]
  },
  {
    id: 'art-02',
    title: 'PostgreSQL Declarative Partitioning vs DynamoDB for Inventory Audits',
    category: 'Database Strategy',
    summary: 'Why our core warehouse inventory ledger chose relational partitioning over NoSQL for strict GAAP compliance and double-entry reconciliation.',
    source: 'Data Architecture ADR-038',
    author: 'Sarah Chen',
    date: 'Aug 22, 2025',
    tags: ['PostgreSQL', 'DynamoDB', 'Database', 'Auditing'],
    readTime: '6 min read',
    relatedProjectId: 'proj-inventory-ai',
    keyTakeaways: [
      'Inventory ledgers demand ACID transactions across multiple SKU rows simultaneously',
      'Declarative monthly partitions eliminated index bloat without sacrificing multi-table JOINs',
      'Saved an estimated $14,000/month in DynamoDB read/write capacity units'
    ]
  },
  {
    id: 'art-03',
    title: 'Hardware Barcode Scanner Debouncing in Web Browsers',
    category: 'Frontend Engineering',
    summary: 'How physical laser and 2D imagers send HID keyboard keystrokes and how to reliably capture them without losing characters or colliding with user typing.',
    source: 'SmartStock Design Spec #11',
    author: 'Elena Rostova',
    date: 'Jul 9, 2025',
    tags: ['React', 'TypeScript', 'Hardware', 'WebHID'],
    readTime: '3 min read',
    relatedProjectId: 'proj-smart-stock',
    keyTakeaways: [
      'Inter-character timing for laser scanners is consistently under 15ms compared to 80ms human typing',
      'Listening to global window keydown with microsecond timestamp diffing catches scans anywhere on the screen',
      'The open-source hook is packaged and shared internally as `@serenade/ui-scanner-hook`'
    ]
  },
  {
    id: 'art-04',
    title: 'Handling High-Density RFID Antenna Ping Storms at the Edge',
    category: 'IoT & Edge Computing',
    summary: 'Lessons learned from the Cikarang warehouse deployment where portal antennas flooded the message bus with 240 duplicate EPC reads per pallet.',
    source: 'Hardware Post-Mortem #08',
    author: 'Budi Santoso',
    date: 'May 3, 2025',
    tags: ['IoT', 'RFID', 'Edge', 'Go'],
    readTime: '5 min read',
    relatedProjectId: 'proj-asset-monitor',
    keyTakeaways: [
      'Edge gateways now run an LRU cache with a 4-second TTL for duplicate tag IDs',
      'Reduced upstream network traffic from 45 MB/min to 1.8 MB/min per warehouse bay',
      'Fallback offline queue buffers up to 24 hours of scans during WAN interruptions'
    ]
  }
];

export const INITIAL_SIMILARITY_RESULT: SimilarityCheckResult = {
  query: 'AI-powered inventory management for warehouse',
  tags: ['Inventory', 'AI', 'Warehouse', 'Forecasting'],
  similarProjects: INITIAL_PROJECTS,
  aiRecommendation: {
    decision: 'Reuse with Enhancement',
    explanation: 'You can reuse the forecasting module and core inventory components from InventoryAI. Consider enhancing the dashboard and adding warehouse-specific features.',
    reusableComponents: [
      'prophet-demand-forecaster (from InventoryAI)',
      'realtime-stock-websocket (from InventoryAI)',
      'use-barcode-scanner-hook (from SmartStock)',
      'warehouse-sku-binning (from InventoryAI)'
    ],
    suggestedArchitecture: 'Adopt InventoryAI FastAPI backend architecture with PostgreSQL partitioned ledger. Layer the React virtual grid and barcode hook from SmartStock for frontend terminal screens.',
    risksToAvoid: [
      'Avoid building a new database schema from scratch — use the GAAP-compliant audit ledger in InventoryAI',
      'Do not use raw WebSocket polling; reuse the existing Redis pub/sub channel to avoid connection exhaustion'
    ]
  },
  processingStage: 5
};
