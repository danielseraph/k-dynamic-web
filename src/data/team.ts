import type { TeamMember } from '../types';

export const teamData: TeamMember[] = [
  {
    id: 'chief-kingsley',
    name: 'Mike Ayibakuro, Boukoru',
    role: 'CEO / Managing Director',
    category: 'executive',
    bio: 'Kingsley holds over 22 years of extensive experience in marine engineering, offshore logistics, and energy trading. He oversees K-TECH\'s strategic growth and international partnerships.',
    experience: '22+ Years in Marine Logistics & Engineering',
    responsibilities: [
      'Leading corporate strategy and board-level relations.',
      'Structuring international joint ventures and chartering agreements.',
      'Ensuring overall operational compliance with NIMASA and global maritime codes.'
    ],
    image: 'public/IMG_3191.PNG'
  },
  {
    id: 'capt-bassey',
    name: 'Ofem Nneoyi Ebri',
    role: 'Operations Manager / Master Mariner',
    category: 'management',
    bio: 'A certified Master Mariner with 15 years at sea commanding various offshore vessels. Capt. Bassey manages fleet scheduling, crew compliance, and marine logistics.',
    experience: '18 Years Maritime Experience (15 Years Commanding)',
    responsibilities: [
      'Managing daily vessel dispatch and fleet coordination.',
      'Supervising cargo security and safety protocols during offshore transfers.',
      'Directing emergency response and maritime salvage coordination.'
    ],
    image: 'public/IMG_3190.PNG'
  },
  {
    id: 'mrs-chioma',
    name: 'Michael Ekeocha',
    role: 'Head of Human Resources & Crewing',
    category: 'management',
    bio: 'Chioma holds an MBA in Human Resource Management and specializes in MLC 2006 compliance, crew welfare, union relations, and professional development programs.',
    experience: '12 Years in Marine HR & Crewing Systems',
    responsibilities: [
      'Overseeing crew recruitment, vetting, and rotation schedules.',
      'Ensuring compliance with ILO, MLC 2006, and local cabotage labor laws.',
      'Managing staff training, health benefits, and onshore/offshore welfare.'
    ],
    image: 'public/IMG_3189.PNG'
  },
  {
    id: 'engr-kayode',
    name: 'John Ibene Franklin',
    role: 'Offshore Technical Supervisor',
    category: 'supervisory',
    bio: 'Kayode is a marine mechanic and electrical supervisor with extensive field experience on offshore platforms. He leads K-TECH\'s mobile vessel repair teams.',
    experience: '10 Years Marine Maintenance & Afloat Repairs',
    responsibilities: [
      'Supervising on-site vessel repairs, drydocking, and hull inspections.',
      'Coordinating rapid response technical teams for anchorage breakdowns.',
      'Implementing preventative maintenance programs for the fleet.'
    ],
    image: 'public/IMG_3188.PNG'
  }
];
