import type { Vessel } from '../types';

export const vesselsData: Vessel[] = [
  {
    id: 'kt-tornado',
    name: 'KT TORNADO',
    type: 'Anchor Handling Tug Supply (AHTS)',
    specs: {
      lengthOverall: '65.00 m',
      breadth: '16.00 m',
      draft: '5.20 m',
      mainEngines: '2 x Wärtsilä 9L26 (Total 8,000 BHP)',
      bhp: '8,000 BHP',
      bollardPull: '105 Metric Tons',
      deckSpace: '450 m²',
      flag: 'Nigerian (NIMASA Registered)'
    },
    capacity: {
      fuelOil: '650 m³',
      freshWater: '400 m³',
      deckCargo: '1,200 Metric Tons'
    },
    safetyCertifications: [
      'NIMASA Certified Sea-worthiness',
      'American Bureau of Shipping (ABS) Class +A1 (Towing, Offshore Support)',
      'SOLAS Safety Construction & Equipment',
      'ISM (International Safety Management) Code Compliant',
      'ISPS Security Certificate'
    ],
    status: 'Available',
    image: '/1.jpeg',
    gallery: [
      '/1.jpeg',
      '/2.jpeg',
      '/3.jpeg'
    ]
  },
  {
    id: 'kt-express',
    name: 'KT EXPRESS',
    type: 'Fast Crew Supplier / Utility Tug',
    specs: {
      lengthOverall: '36.00 m',
      breadth: '7.50 m',
      draft: '2.10 m',
      mainEngines: '3 x Caterpillar C32 (Total 3,000 BHP)',
      bhp: '3,000 BHP',
      bollardPull: '35 Metric Tons',
      deckSpace: '90 m²',
      flag: 'Nigerian (NIMASA Registered)'
    },
    capacity: {
      fuelOil: '45 m³',
      freshWater: '25 m³',
      deckCargo: '50 Metric Tons'
    },
    safetyCertifications: [
      'NIMASA Certified Sea-worthiness',
      'Bureau Veritas Class I ✠ HULL ✠ MACH (Crew Boat / Utility Vessel)',
      'SOLAS Safe Manning Certification',
      'DPR Permit for Offshore Logistics Support'
    ],
    status: 'On Charter',
    image: '/4.jpeg',
    gallery: [
      '/4.jpeg',
      '/5.jpeg'
    ]
  },
  {
    id: 'kt-navigator',
    name: 'KT NAVIGATOR',
    type: 'Flat-top Ballast Cargo Barge',
    specs: {
      lengthOverall: '76.20 m (250 ft)',
      breadth: '24.40 m',
      draft: '4.80 m',
      mainEngines: 'Non-propelled (Auxiliary generators onboard)',
      bhp: 'N/A',
      bollardPull: 'N/A',
      deckSpace: '1,800 m²',
      flag: 'Nigerian (NIMASA Registered)'
    },
    capacity: {
      fuelOil: 'N/A (Balling Tank Capacity: 3,500 m³)',
      freshWater: 'N/A',
      deckCargo: '5,000 Metric Tons'
    },
    safetyCertifications: [
      'NIMASA Loadline Certificate',
      'Lloyd\'s Register Class ✠ 100A1 Pontoon',
      'DPR Cargo Handling Clearance',
      'Marine Safety Equipment Certificate'
    ],
    status: 'Available',
    image: '/6.jpeg',
    gallery: [
      '/6.jpeg',
      '/7.jpeg'
    ]
  },
  {
    id: 'kt-defender',
    name: 'KT DEFENDER',
    type: 'Ballistic Security Patrol Vessel',
    specs: {
      lengthOverall: '24.50 m',
      breadth: '5.80 m',
      draft: '1.45 m',
      mainEngines: '2 x MAN V12 Marine Engines (Total 2,400 BHP)',
      bhp: '2,400 BHP',
      bollardPull: 'N/A',
      deckSpace: '25 m²',
      flag: 'Nigerian (NIMASA Registered / Navy Approved)'
    },
    capacity: {
      fuelOil: '15 m³',
      freshWater: '5 m³',
      deckCargo: '5 Metric Tons'
    },
    safetyCertifications: [
      'Nigerian Navy Memoradum of Understanding (MoU) Clearance',
      'NIMASA Security Escort Certification',
      'Bureau Veritas Security Patrol Craft Certificate',
      'Ballistic Protection Level NIJ III+ Certification'
    ],
    status: 'Available',
    image: '/8.jpeg',
    gallery: [
      '/8.jpeg',
      '/9.jpeg'
    ]
  }
];
