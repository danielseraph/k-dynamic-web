import type { Service } from '../types';

export const servicesData: Service[] = [
  {
    id: 'fuel-supply',
    title: 'Marine Fuel Supply (AGO)',
    shortDescription: 'Reliable, high-quality Automotive Gas Oil (AGO) delivery and bunkering services for offshore vessels, platforms, and marine installations.',
    icon: 'Fuel',
    overview: 'K-TECH DYNAMIC LTD provides top-tier marine fuel supply (AGO) and bunkering services across major Nigerian waters. We ensure compliance with strict industry specifications, guaranteeing clean, water-free fuel to protect your engines and optimize vessel performance.',
    benefits: [
      'Strict quality assurance processes ensuring moisture-free AGO.',
      'Prompt delivery matching vessel operational schedules to minimize downtime.',
      'Strict adherence to DPR (Department of Petroleum Resources) and NIMASA regulations.',
      'Flexible bunkering options (offshore, anchorage, and port-side).'
    ],
    process: [
      'Request & Spec Verification: Receive order specifications and verify quality requirements.',
      'Sourcing & Testing: Load AGO from approved terminals and perform laboratory analysis.',
      'Mobilization: Dispatch fuel barge or supply vessel to the designated bunker point.',
      'Delivery & Verification: Safely transfer fuel using calibrated flow meters and obtain quality sign-offs.'
    ],
    keyFeatures: [
      'High-grade Automotive Gas Oil (AGO)',
      '24/7 offshore bunkering logistics',
      'Quality test certificates provided with every batch',
      'Advanced metering and custody transfer systems'
    ]
  },
  {
    id: 'tugboat-services',
    title: 'Tugboat Services',
    shortDescription: 'Modern, high-BHP tugboats for harbor assistance, offshore towing, rig movement, salvage, and vessel berthing support.',
    icon: 'Anchor',
    overview: 'Our tugboat fleet features highly maneuverable ASD (Azimuth Stern Drive) and conventional twin-screw tugs. We support terminal operations, long-distance ocean towing, anchor handling, and critical offshore maneuver assistance.',
    benefits: [
      'Highly experienced Captains and crew trained for complex salvage and rig towing.',
      'High Bollard Pull capability to handle large cargo barges and VLCCs.',
      'Excellent maneuverability in confined waters and rough offshore conditions.',
      '24/7 availability for emergency response and towing support.'
    ],
    process: [
      'Towing Assessment: Evaluate vessel weight, draft, sea state, and routing requirements.',
      'Vessel Allocation: Assign the appropriate ASD or twin-screw tug based on BHP and Bollard Pull.',
      'Rigging & Connection: Establish secure towlines using certified steel wire and synthetic ropes.',
      'Transit & Operations: Execute tow or berthing assist under constant monitoring and communication.'
    ],
    keyFeatures: [
      'Up to 80-ton Bollard Pull capacity',
      'ASD (Azimuth Stern Drive) and Conventional Tugs',
      'Equipped with heavy-duty towing winches and quick-release hooks',
      'FiFi-1 class fire-fighting capabilities on select vessels'
    ]
  },
  {
    id: 'barge-services',
    title: 'Barge Supply Services',
    shortDescription: 'Flat-top, ramp, and tank barges for transporting heavy equipment, bulk materials, water, and fuel through inland and coastal waterways.',
    icon: 'Ship',
    overview: 'K-TECH DYNAMIC LTD offers a fleet of durable, highly-maintained barges designed to transport heavy loads, pipes, construction materials, and fluids. We support offshore rig drilling and marine civil construction.',
    benefits: [
      'High load capacity deck space suitable for heavy duty dump trucks, excavators, and drilling units.',
      'Shallow draft design allowing access to rivers, creeks, and shallow coastal zones.',
      'Fitted with heavy-duty mooring winches and spuds for stable positioning.',
      'Flexible short-term and long-term charter terms.'
    ],
    process: [
      'Load Estimation: Calculate weight distribution and center of gravity of the cargo.',
      'Draft Optimization: Adjust ballast tanks to ensure appropriate trim and stability.',
      'Loading Operations: Secure cargo using certified lashing gear and dunnage.',
      'Towing & Delivery: Tug-assisted transit to remote coastal or swamp drilling sites.'
    ],
    keyFeatures: [
      'Flat-top, Spud, Ramp, and Liquid Cargo Barges',
      'Deck load capacity up to 15 tons per square meter',
      'Sizes ranging from 150ft to 300ft',
      'Full compliance with class approvals (Bureau Veritas, Lloyd Register, or ABS)'
    ]
  },
  {
    id: 'offshore-logistics',
    title: 'Offshore Logistics Support',
    shortDescription: 'Comprehensive supply chain solutions, including crew transfers, supply runs, warehouse management, and base logistics for offshore assets.',
    icon: 'Truck',
    overview: 'We connect onshore logistics terminals with offshore assets like drilling rigs, FPSOs, and platforms. Our services encompass material handling, provisions delivery, and rapid crew transfers using fast support vessels.',
    benefits: [
      'Minimizes offshore platform downtime with dependable supply schedules.',
      'Integrated logistics handling from port arrival to offshore deck delivery.',
      'Strict HSE policies to ensure zero cargo damage and crew safety.',
      'Fully compliant with Local Content requirements in Nigeria.'
    ],
    process: [
      'Logistics Planning: Review cargo manifests and prioritize critical rig supplies.',
      'Onshore Staging: Receive, verify, and store items at our secure base.',
      'Loading & Lashing: Load supply vessels using certified cranes and deck crew.',
      'Offshore Offloading: Safe sea transfers to platforms, complying with weather limits.'
    ],
    keyFeatures: [
      'Fast Crew Boats (FCBs) and Platform Supply Vessels (PSVs)',
      'Integrated warehouse storage and staging services',
      'Track-and-trace system for supply delivery status',
      'Trained stevedores and offshore loading specialists'
    ]
  },
  {
    id: 'equipment-rental',
    title: 'Marine Equipment Rental',
    shortDescription: 'Provision of certified marine-grade fenders, hoses, anchors, chains, oil spill response kits, and heavy lift gear.',
    icon: 'Cpu',
    overview: 'K-TECH DYNAMIC LTD leases certified marine and offshore equipment to support oil companies, port terminal operators, and contractors. All rental assets undergo rigorous testing and classification audits.',
    benefits: [
      'Reduces capital expenditure for short-term projects and offshore campaigns.',
      'Instant access to pre-certified, ready-to-deploy equipment.',
      'Includes technical support for installation, mobilization, and demobilization.',
      'Fully compliant with international marine standards (OCIMF, ISO).'
    ],
    process: [
      'Requirements Analysis: Determine correct sizing and load capacity for anchors, fenders, or hoses.',
      'Certification Verification: Provide valid Lloyd or BV certificates to the client.',
      'Mobilization: Coordinate heavy transport to the client’s port facility or vessel.',
      'Maintenance Support: Regular inspections by our technicians throughout the rental period.'
    ],
    keyFeatures: [
      'Yokohama pneumatic fenders (all sizes)',
      'Heavy-duty mooring anchors (up to 15 tonnes) and grade-3 chains',
      'Floating marine hoses for fluid transfers',
      'Spill response containment booms and skimmers'
    ]
  },
  {
    id: 'security-escort',
    title: 'Marine Security Escort Services',
    shortDescription: 'Armed escort vessels and secure logistics coordination to safeguard marine assets, crews, and cargo in high-risk offshore waters.',
    icon: 'Shield',
    overview: 'Operating in close collaboration with the Nigerian Navy and security authorities, we provide fully-vetted security patrol vessels (ballistic protected) to escort tankers, drilling rigs, and supply ships transit security zones.',
    benefits: [
      'Protects valuable crew lives, cargo, and multi-million dollar vessels from threats.',
      'Direct coordination with Government Navy commands for rapid response support.',
      'Full compliance with NIMASA, Port Authority, and Navy memorandum of understanding (MoU).',
      'Experienced security crew trained in anti-piracy tactics and vessel defense.'
    ],
    process: [
      'Threat Assessment: Analyze shipping route, cargo profile, and current threat alerts.',
      'Navy Liaison: Embed armed Navy security personnel on K-TECH security vessels.',
      'Escort Execution: Maintain secure perimeter around client vessel during transit.',
      'Reporting: Continuous updates to client operations room and maritime authorities.'
    ],
    keyFeatures: [
      'Ballistic protected Fast Patrol Boats (FPBs)',
      'Radar, thermal imaging, and advanced communications suite',
      'Embedded Nigerian Navy personnel',
      '24/7 security operations control room tracking'
    ]
  },
  {
    id: 'vessel-inspection',
    title: 'Vessel Inspection',
    shortDescription: 'Professional marine surveys, hull integrity assessments, safety audits, and pre-purchase inspections by certified surveyors.',
    icon: 'Compass',
    overview: 'Our independent marine surveyors perform comprehensive condition assessments, on/off-hire surveys, hull thickness gauging, and compliance audits to guarantee structural seaworthiness and regulatory compliance.',
    benefits: [
      'Identifies latent structural defects or equipment failures before they cause accidents.',
      'Assures insurers and charterers of vessel integrity and safety standard compliance.',
      'Provides independent, legally defensible condition reports.',
      'Minimizes risk of port-state control detentions.'
    ],
    process: [
      'Scope Definition: Clarify inspection target (hull, engines, safety, class renewal).',
      'Field Survey: Conduct physical examinations, ultrasonic thickness testing, and records audits.',
      'Analysis: Review surveyor findings against international maritime codes (SOLAS, MARPOL).',
      'Report Issuance: Deliver a detailed, photo-documented survey report with recommendations.'
    ],
    keyFeatures: [
      'Pre-purchase, Pre-charter, and On/Off-hire surveys',
      'Non-Destructive Testing (NDT) and hull thickness measurement',
      'NIMASA and International Classification Society standards compliant',
      'Detailed digital reports with high-resolution photographic evidence'
    ]
  },
  {
    id: 'vessel-repairs',
    title: 'Vessel Repairs & Drydocking',
    shortDescription: 'Ship repair services, drydock coordination, engine overhauls, propulsion repairs, and hull steel replacement.',
    icon: 'Wrench',
    overview: 'K-TECH DYNAMIC LTD provides specialized afloat repairs and drydocking management. Our mobile technical teams deploy rapidly to vessels at anchorage or alongside berths to fix mechanical, electrical, and structural systems.',
    benefits: [
      'Reduces downtime with 24/7 emergency repair response teams.',
      'Access to partner shipyards and drydock facilities in Lagos and Port Harcourt.',
      'Engineers trained on major engine brands (Caterpillar, Wärtsilä, Cummins, MTU).',
      'Welding and hot-work certified by major classification societies.'
    ],
    process: [
      'Damage / Defect Assessment: Inspect failures and prepare a detailed repair plan.',
      'Engineering & Class Approval: Design repairs and obtain approvals from surveyors.',
      'Execution: Perform machining, steel replacement, pipe fitting, or electrical rewinding.',
      'Testing: Commission repaired systems and conduct sea-trials to verify performance.'
    ],
    keyFeatures: [
      'Main and auxiliary engine overhauls',
      'Hull plating replacement and certified structural welding',
      'Propeller, shafting, and rudder repairs',
      'Electrical control panel troubleshooting and rewinding'
    ]
  },
  {
    id: 'vessel-management',
    title: 'Vessel Management',
    shortDescription: 'Full-service technical, crew, and safety management to maximize vessel efficiency, reliability, and regulatory compliance.',
    icon: 'Briefcase',
    overview: 'We take the burden of daily maritime operations off vessel owners. K-TECH handles technical maintenance, ISM/ISPS safety compliance, crew training and rotation, supply provisioning, and insurance management.',
    benefits: [
      'Optimizes operating expenses (OPEX) through established vendor contracts.',
      'Maintains high vessel asset value through rigorous preventative maintenance programs.',
      'Ensures continuous compliance with international safety management (ISM) codes.',
      'Maintains highly qualified, healthy, and certified crew members.'
    ],
    process: [
      'Onboarding: Audit the vessel condition, safety management system, and documents.',
      'System Setup: Implement K-TECH safety, maintenance, and purchasing workflows.',
      'Operations: Manage daily dispatch, crew rotations, drydock budgets, and surveys.',
      'Reporting: Provide transparent monthly technical and financial reports to owner.'
    ],
    keyFeatures: [
      'ISM (International Safety Management) and Document of Compliance (DoC) management',
      'Planned Maintenance System (PMS) integration',
      'Crew recruitment, training, and MLC-compliant payroll management',
      'Fuel consumption and emissions tracking'
    ]
  },
  {
    id: 'sales-purchase',
    title: 'Vessel Sales & Purchase Brokerage',
    shortDescription: 'Professional brokerage services for buying and selling commercial vessels, barges, and specialized offshore assets.',
    icon: 'TrendingUp',
    overview: 'Leveraging our global network of shipowners, brokers, and financial institutions, we assist clients in sourcing the right maritime assets or divesting existing tonnage at optimal market valuations.',
    benefits: [
      'Access to off-market vessel listings globally.',
      'Expert negotiation backed by real-time maritime market intelligence.',
      'End-to-end management of legal documentation, class transfers, and closing procedures.',
      'Rigorous pre-purchase evaluations to protect client investments.'
    ],
    process: [
      'Needs / Listing Assessment: Clarify target specs and budget, or value the asset for sale.',
      'Sourcing & Marketing: Promote the vessel or source options from global databases.',
      'Pre-purchase Surveys: Coordinate surveyor inspection of hull, machinery, and certificates.',
      'Contract & Closing: Draft MOA (Memorandum of Agreement), handle escrow, and transfer title.'
    ],
    keyFeatures: [
      'Bespoke acquisition matching specific oil company contract guidelines',
      'MoA preparation conforming to BIMCO standards (e.g., SALEFORM 2012)',
      'Valuation certificates recognized by major Nigerian banks and international financiers',
      'Coordinate vessel delivery logistics, crew boarding, and re-flagging'
    ]
  }
];
