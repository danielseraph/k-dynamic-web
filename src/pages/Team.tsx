import { useState, useEffect } from 'react';
import { Award, ShieldCheck, UserCheck } from 'lucide-react';
import SEO from '../components/shared/SEO';
import { teamData as staticTeamData } from '../data/team';
import { api, getImageUrl } from '../services/api';
import type { TeamMember } from '../types';

export default function Team() {
  const [teamList, setTeamList] = useState<TeamMember[]>([]);

  useEffect(() => {
    api.team.getAll()
      .then((data) => {
        if (data && data.length > 0) {
          setTeamList(data);
        } else {
          setTeamList(staticTeamData);
        }
      })
      .catch(() => {
        setTeamList(staticTeamData);
      });
  }, []);

  const parseResponsibilities = (resp: any): string[] => {
    if (!resp) return [];
    if (Array.isArray(resp)) return resp;
    try {
      return JSON.parse(resp);
    } catch {
      return [];
    }
  };

  const executives = teamList.filter((t) => t.category === 'executive');
  const managers = teamList.filter((t) => t.category === 'management');
  const supervisors = teamList.filter((t) => t.category === 'supervisory');

  return (
    <>
      <SEO
        title="Management Team - Corporate Maritime Leadership"
        description="Meet K-TECH DYNAMIC LTD's leadership team: Engr. Kingsley Alamu (CEO), Captain Bassey Henshaw (Ops), and Mrs. Chioma Nwachukwu (HR)."
      />

      {/* Hero Banner */}
      <section className="relative pt-36 pb-20 bg-primary-navy text-white text-center">
        <div className="absolute inset-0 bg-[url('/11.jpeg')] bg-cover bg-center mix-blend-multiply opacity-25" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="px-3 py-1 bg-teal-accent/15 text-teal-accent text-xs font-semibold uppercase rounded-full tracking-wider">
            Leadership
          </span>
          <h1 className="text-4xl sm:text-5xl font-headings font-extrabold mt-3 tracking-tight">
            Our Maritime Professionals
          </h1>
          <p className="text-slate-300 mt-4 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Led by seasoned marine engineers, master mariners, and crewing experts with extensive experience in the West African Gulf of Guinea.
          </p>
        </div>
      </section>

      {/* Executive Board */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-headings font-extrabold text-primary-navy">
              Executive Leadership
            </h2>
            <p className="text-slate-500 mt-2 text-sm leading-relaxed">
              Directing K-TECH DYNAMIC LTD's long-term commercial growth and strategic partnerships.
            </p>
          </div>

          <div className="flex justify-center">
            {executives.map((member) => (
              <div
                key={member.id}
                className="bg-slate-50 border border-slate-200/60 rounded-2xl p-8 max-w-3xl w-full shadow-sm hover:shadow-md transition-shadow grid grid-cols-1 md:grid-cols-12 gap-8 text-left items-center"
              >
                {/* Image */}
                <div className="md:col-span-4 relative group">
                  <img
                    src={getImageUrl(member.image)}
                    alt={member.name}
                    className="w-full h-72 object-cover rounded-xl shadow border border-slate-200"
                  />
                  <div className="absolute top-3 right-3 bg-ocean-blue text-white p-2 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow">
                    <Award className="w-4 h-4 text-teal-accent" />
                    <span>Executive</span>
                  </div>
                </div>

                {/* Content */}
                <div className="md:col-span-8 flex flex-col gap-4">
                  <div>
                    <h3 className="text-2xl font-headings font-bold text-primary-navy">
                      {member.name}
                    </h3>
                    <p className="text-sm text-ocean-blue font-semibold mt-0.5">{member.role}</p>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide block mt-2">
                      Experience: {member.experience}
                    </span>
                  </div>

                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-sans">
                    {member.bio}
                  </p>

                  <div className="border-t border-slate-200/60 pt-4">
                    <h4 className="font-headings font-bold text-xs uppercase tracking-wide text-primary-navy mb-2 flex items-center gap-1">
                      <UserCheck className="w-4 h-4 text-teal-accent" />
                      <span>Key Responsibilities</span>
                    </h4>
                    <ul className="flex flex-col gap-1.5 text-xs text-slate-500">
                      {parseResponsibilities(member.responsibilities).map((resp, i) => (
                        <li key={i} className="flex gap-2 items-start leading-tight">
                          <span className="text-teal-accent font-bold">✔</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-2.5 mt-2">
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:text-ocean-blue transition-colors"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                      <span>LinkedIn Profile</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Operational Management */}
      <section className="py-20 bg-slate-50 border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-headings font-bold text-primary-navy">
              Operational Management
            </h2>
            <p className="text-slate-500 mt-2 text-sm leading-relaxed">
              Directing crewing compliance, vessel dispatch schedules, and technical logistics.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {managers.map((member) => (
              <div
                key={member.id}
                className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow grid grid-cols-1 md:grid-cols-12 gap-6 text-left items-start"
              >
                {/* Image */}
                <div className="md:col-span-4 relative">
                  <img
                    src={getImageUrl(member.image)}
                    alt={member.name}
                    className="w-full h-48 object-cover rounded-xl border border-slate-100"
                  />
                  <div className="absolute top-2 right-2 bg-primary-navy/90 text-white px-2 py-1 rounded text-[9px] font-bold uppercase tracking-wider">
                    Manager
                  </div>
                </div>

                {/* Content */}
                <div className="md:col-span-8 flex flex-col gap-3">
                  <div>
                    <h3 className="text-lg font-headings font-bold text-primary-navy leading-none">
                      {member.name}
                    </h3>
                    <p className="text-xs text-ocean-blue font-semibold mt-1">{member.role}</p>
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block mt-1">
                      {member.experience}
                    </span>
                  </div>

                  <p className="text-slate-500 text-xs leading-relaxed font-sans line-clamp-3">
                    {member.bio}
                  </p>

                  <div className="border-t border-slate-100 pt-3">
                    <h4 className="font-headings font-semibold text-[10px] uppercase tracking-wide text-primary-navy mb-1.5 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-teal-accent" />
                      <span>Operational Focus</span>
                    </h4>
                    <ul className="flex flex-col gap-1 text-[11px] text-slate-500">
                      {parseResponsibilities(member.responsibilities).slice(0, 2).map((resp, i) => (
                        <li key={i} className="flex gap-1.5 items-start">
                          <span className="text-teal-accent font-bold">✔</span>
                          <span className="truncate">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Field Supervisors */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-headings font-bold text-primary-navy">
              Field & Technical Supervisors
            </h2>
            <p className="text-slate-500 mt-2 text-sm leading-relaxed">
              Our engineering supervisors directing afloat repairs, drydocking, and rig supply teams on site.
            </p>
          </div>

          <div className="flex justify-center">
            {supervisors.map((member) => (
              <div
                key={member.id}
                className="bg-slate-50 border border-slate-200/60 rounded-2xl p-6 max-w-2xl w-full shadow-sm hover:shadow-md transition-shadow grid grid-cols-1 md:grid-cols-12 gap-6 text-left items-center"
              >
                {/* Image */}
                <div className="md:col-span-4">
                  <img
                    src={getImageUrl(member.image)}
                    alt={member.name}
                    className="w-full h-44 object-cover rounded-xl border border-slate-100"
                  />
                </div>

                {/* Content */}
                <div className="md:col-span-8 flex flex-col gap-3">
                  <div>
                    <h3 className="text-lg font-headings font-bold text-primary-navy leading-none">
                      {member.name}
                    </h3>
                    <p className="text-xs text-ocean-blue font-semibold mt-1">{member.role}</p>
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block mt-1">
                      {member.experience}
                    </span>
                  </div>

                  <p className="text-slate-500 text-xs leading-relaxed font-sans">
                    {member.bio}
                  </p>

                  <div className="border-t border-slate-200/60 pt-3 flex gap-2">
                    <span className="px-2.5 py-1 bg-white border border-slate-200 rounded text-[10px] text-slate-500 font-semibold uppercase">
                      HSE Officer Certified
                    </span>
                    <span className="px-2.5 py-1 bg-white border border-slate-200 rounded text-[10px] text-slate-500 font-semibold uppercase">
                      Class Vetted
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
