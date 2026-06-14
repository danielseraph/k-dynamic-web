import type { Industry } from '../types';

export const industriesData: Industry[] = [
  {
    id: 'oil-and-gas',
    title: 'Oil & Gas',
    description: 'Critical offshore support, rig mobilization, anchor handling, and secure fuel logistics for upstream exploration and production companies.',
    image: '/10.jpeg',
    keyPoints: [
      'Deepwater and shallow swamp bunkering logistics.',
      'Fast crew boat transfers and safety standby support.',
      'Ballistic protected vessel escorts in security-sensitive fairways.'
    ],
    caseStudies: [
      {
        id: 'cs-oil-1',
        industryId: 'oil-and-gas',
        title: 'Deepwater Bunkering & Security Escort Campaign',
        project: 'Offshore Rig Supply Bunkering Campaign',
        challenge: 'A multinational oil producer needed 1,200,000 liters of quality-assured AGO delivered to an offshore drilling platform in high-risk waters, requiring both high-volume delivery and security protection.',
        solution: 'K-TECH DYNAMIC LTD mobilized the AHTS KT TORNADO carrying the fuel and coordinated with the Nigerian Navy to deploy our patrol craft KT DEFENDER as a dedicated security escort.',
        result: 'The entire bunkering campaign was completed in 72 hours without any security incidents or fuel quality discrepancies, enabling the rig to maintain continuous drilling.',
        image: '/1.jpeg'
      }
    ]
  },
  {
    id: 'marine-construction',
    title: 'Marine Construction',
    description: 'Heavy lift logistics, flat-top barge supply, and positioning services supporting coastal reclamation, bridge building, and pipe laying projects.',
    image: '/11.jpeg',
    keyPoints: [
      'Certified deck barges with up to 5,000-ton capacity.',
      'Anchor positioning and towage for heavy machinery and piles.',
      'Reliable logistics support for coastal civil works.'
    ],
    caseStudies: [
      {
        id: 'cs-construction-1',
        industryId: 'marine-construction',
        title: 'Coastal Reclamation Barge Logistics',
        project: 'Lagos Shoreline Protection Project',
        challenge: 'Transporting over 15,000 metric tons of granite boulders and heavy crawler cranes from quarry terminals to a coastal erosion barrier construction site in Victoria Island.',
        solution: 'We deployed our flat-top ballast cargo barge KT NAVIGATOR alongside a 3,000 BHP towing tug to execute scheduled daily round-trips.',
        result: 'Successfully transported all materials on schedule within 4 weeks. Safe loading and unloading procedures achieved zero equipment damage and met strict project timelines.',
        image: '/6.jpeg'
      }
    ]
  },
  {
    id: 'offshore-infrastructure',
    title: 'Offshore Infrastructure',
    description: 'Logistical support for platform repairs, subsea pipeline installations, and offshore wind/energy projects in West Africa.',
    image: '/12.jpeg',
    keyPoints: [
      'Offshore equipment rental (mooring lines, Yokohama fenders).',
      'Vessel repairs, technical afloat maintenance, and surveys.',
      'Accommodation and supply vessels for maintenance technicians.'
    ],
    caseStudies: [
      {
        id: 'cs-infra-1',
        industryId: 'offshore-infrastructure',
        title: 'SW swamp platform maintenance support',
        project: 'Delta Swamp Flowstation Restoration',
        challenge: 'Mobilizing mechanical technicians, heavy welding units, and spare parts to an isolated swamp flowstation with shallow drafts (under 2 meters).',
        solution: 'Deployed K-TECH shallow-draft utility supply vessels to navigate the narrow creeks and transfer the technical crew and heavy generators safely.',
        result: 'The facility restoration was completed in 10 days, restoring 25,000 bpd production capacity with full compliance with local environmental protection regulations.',
        image: '/12.jpeg'
      }
    ]
  },
  {
    id: 'energy-logistics',
    title: 'Energy Logistics',
    description: 'End-to-end supply chain management for bulk petroleum products, lubricants, and chemicals between coastal refineries and storage terminals.',
    image: '/2.jpeg',
    keyPoints: [
      'Self-propelled product tankers and liquid cargo barges.',
      'Dedicated product handling crew and terminal logistics liaison.',
      'Fully compliant with custody transfer and loading regulation controls.'
    ],
    caseStudies: [
      {
        id: 'cs-logistics-1',
        industryId: 'energy-logistics',
        title: 'Refinery-to-Terminal Bulk Fuel Transfer',
        project: 'Coastal Fuel Distribution Logistics',
        challenge: 'A downstream distributor required continuous, high-volume marine transportation of refined gasoline from an offshore refinery anchorage to coastal storage terminals in Port Harcourt.',
        solution: 'Leveraged a fleet of K-TECH self-propelled product barges and specialized escort tugs to maintain a continuous maritime conveyor system.',
        result: 'Delivered over 12 million liters of refined product over a 3-month period with 100% accountability, helping stabilize local energy supplies.',
        image: '/2.jpeg'
      }
    ]
  },
  {
    id: 'port-operations',
    title: 'Port Operations',
    description: 'Providing harbor assistance, berthing services, ship-to-ship (STS) coordination, and auxiliary marine services at major commercial ports.',
    image: '/3.jpeg',
    keyPoints: [
      'ASD tug assistance for safe vessel berthing and unberthing.',
      'Ship-To-Ship (STS) transfer equipment, fenders, and hoses leasing.',
      'Anchorage safety watch and emergency standby operations.'
    ],
    caseStudies: [
      {
        id: 'cs-port-1',
        industryId: 'port-operations',
        title: 'Emergency Ship-to-Ship (STS) Transfer Assistance',
        project: 'Escravos Anchorage STS Operations',
        challenge: 'A fully-laden VLCC tanker suffered steering gear failure at anchorage, necessitating a rapid transfer of crude oil to a lightering vessel to prevent environmental and structural risks.',
        solution: 'K-TECH mobilized four Yokohama fenders, fluid transfer hoses, and our ASD tug to stabilize the ships and secure the STS arrangement.',
        result: 'Successfully completed the crude transfer operation within 36 hours. Zero oil spills, protecting the local marine environment and stabilizing the damaged vessel.',
        image: '/3.jpeg'
      }
    ]
  },
  {
    id: 'dredging',
    title: 'Dredging Support',
    description: 'Providing positioning tugs, anchor-handling vessels, and pipeline displacement barges to support dredging and sand-mining operations.',
    image: '/5.jpeg',
    keyPoints: [
      'Heavy anchor positioning for cutter suction dredgers.',
      'Displacement of flexible pipeline floating pontoon systems.',
      'Siltation control and monitoring support vessels.'
    ],
    caseStudies: [
      {
        id: 'cs-dredge-1',
        industryId: 'dredging',
        title: 'River Channel Dredging Towage Campaign',
        project: 'River Niger Navigational Channel Dredging',
        challenge: 'Providing constant positioning and anchor-shifting support for a large cutter suction dredger maintaining the shipping fairway in the River Niger.',
        solution: 'Chartered our twin-screw utility tug KT EXPRESS which worked alongside the dredger shift crews, relocating anchors in heavy river currents.',
        result: 'Facilitated dredging operations for 90 days without delays, maintaining a navigable depth of 4.5m for commercial barges and patrol boats.',
        image: '/4.jpeg'
      }
    ]
  }
];
