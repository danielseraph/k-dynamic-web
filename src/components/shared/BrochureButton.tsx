import { Download } from 'lucide-react';

export default function BrochureButton({ className = '' }: { className?: string }) {
  const downloadBrochure = () => {
    const brochureText = `
=========================================
K-TECH DYNAMIC LTD - COMPANY PROFILE
=========================================
Powering Operations. Delivering Reliability.

K-TECH DYNAMIC LTD is a leading fully indigenous Nigerian maritime, offshore logistics, and marine services company. We specialize in vessel chartering, offshore supply operations, marine fuel supply (AGO), tugboat services, barge supply, equipment rentals, and vessel maintenance.

CORE CAPABILITIES:
1. Marine Fuel Supply (AGO Bunkering)
2. Tugboat Services & Towage
3. Barge Supply Services
4. Offshore Logistics Support (Crew/Supply runs)
5. Marine Equipment Rental (Fenders, Anchors, Hoses)
6. Security Escort Services (Navy Partnered)
7. Vessel Inspections & Surveys
8. Afloat Repairs & Drydocking Services
9. Commercial Vessel Management
10. Vessel Sales & Purchase Brokerage

CERTIFICATIONS & COMPLIANCE:
* NIMASA (Nigerian Maritime Administration and Safety Agency) Licensed
* DPR (Department of Petroleum Resources) Permitted
* ISO 9001:2015 & OHSAS 18001 Compliant Operations
* Full compliance with Local Content Development Act (100% Indigenous)

LAGOS OFFICE:
12 Marine View Close, Apapa, Lagos, Nigeria.
Email: lagos@ktechdynamic.com | Tel: +234 (1) 454-9080

PORT HARCOURT OFFICE:
Plot 88 Trans-Amadi Industrial Layout, Port Harcourt, Rivers State, Nigeria.
Email: ph@ktechdynamic.com | Tel: +234 (84) 330-1200

Website: www.ktechdynamic.com
=========================================
Copyright 2026 K-TECH DYNAMIC LTD. All Rights Reserved.
`;

    const blob = new Blob([brochureText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'K-TECH_DYNAMIC_LTD_Company_Profile.txt');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={downloadBrochure}
      className={`inline-flex items-center gap-2 px-6 py-3 bg-ocean-blue hover:bg-[#004b7c] text-white rounded-lg font-medium transition-colors shadow-md ${className}`}
      aria-label="Download Company Brochure"
    >
      <Download className="w-5 h-5" />
      <span>Download Brochure</span>
    </button>
  );
}
