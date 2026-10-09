import React, { useState } from 'react';
import { 
  VC_EXECUTIVE_SUMMARY, 
  UNIVERSITY_FACULTIES, 
  UNIVERSITY_DEPARTMENTS, 
  SYSTEM_HEALTH_METRICS 
} from '../../data/mockAcademicData';
import { UniversitySeal } from '../common/UniversitySeal';
import { 
  Building2, 
  GraduationCap, 
  Users, 
  Award, 
  Clock, 
  CreditCard, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  ShieldCheck, 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  ExternalLink, 
  Printer, 
  Send,
  Filter,
  Search,
  School,
  ArrowRight
} from 'lucide-react';

interface VcPortalProps {
  onAddAuditLog: (log: any) => void;
  onNavigateToFaculty?: (facultyId: string) => void;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export const VcPortal: React.FC<VcPortalProps> = ({ 
  onAddAuditLog,
  onNavigateToFaculty,
  activeTab: controlledTab,
  onTabChange: setControlledTab
}) => {
  const [internalTab, setInternalTab] = useState<'overview' | 'faculties' | 'governance' | 'examinations' | 'finance' | 'profile'>('overview');
  const activeTab = (controlledTab as any) || internalTab;
  const setActiveTab = (tab: any) => {
    if (setControlledTab) {
      setControlledTab(tab);
    } else {
      setInternalTab(tab);
    }
  };
  const [selectedFacultyFilter, setSelectedFacultyFilter] = useState<string>('all');
  const [syndicateActionNotice, setSyndicateActionNotice] = useState<string | null>(null);

  const handleDispatchDirective = (title: string) => {
    onAddAuditLog({
      id: 'log_' + Date.now().toString().slice(-4),
      who: VC_EXECUTIVE_SUMMARY.viceChancellorName,
      role: 'Vice Chancellor',
      what: `Executive Vice-Chancellor Directive Dispatched: ${title}`,
      category: 'Executive Governance',
      when: new Date().toLocaleString() + ' PKT',
      whereIp: '10.10.0.1 (VC Secretariat Core Terminal)',
      objectTarget: 'All 14 Faculties & 68 Academic Departments',
      beforeState: 'Executive Review',
      afterState: 'Dispatched & Enforced',
      reason: 'Syndicate Resolution Implementation',
      referenceId: 'VC-DIR-' + Date.now().toString().slice(-6)
    });

    setSyndicateActionNotice(`Directive "${title}" officially transmitted to all Deans and Directors.`);
    setTimeout(() => setSyndicateActionNotice(null), 4000);
  };

  const filteredFaculties = selectedFacultyFilter === 'all' 
    ? UNIVERSITY_FACULTIES 
    : UNIVERSITY_FACULTIES.filter(f => f.id === selectedFacultyFilter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Executive University Leadership Banner */}
      <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
        <div className="bg-[#0f2942] text-white px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-[#0a1f33]">
          <div className="flex items-center gap-3.5">
            <UniversitySeal size="sm" monochrome={false} />
            <div>
              <div className="text-[11px] font-semibold tracking-wider text-amber-300 uppercase font-mono">
                Vice-Chancellor Executive Secretariat
              </div>
              <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
                University of Sindh, Jamshoro — Central Academic Command
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2.5 text-xs text-slate-300 font-mono">
            <span className="hidden sm:inline">Session: <strong>Fall 2026</strong></span>
            <span className="text-slate-500 hidden sm:inline" aria-hidden="true">·</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              14 Faculties Synced
            </span>
          </div>
        </div>

        {/* VC Profile Context & University KPI Strip */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-gradient-to-b from-slate-50/50 to-white">
          <div className="lg:col-span-5 flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#0f2942] text-amber-300 flex items-center justify-center font-serif text-xl font-bold border border-slate-300/60 shadow-xs shrink-0">
              VC
            </div>
            <div className="space-y-1">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">
                Principal Academic & Administrative Officer
              </div>
              <h2 className="text-lg font-bold text-slate-900 leading-snug">
                {VC_EXECUTIVE_SUMMARY.viceChancellorName}
              </h2>
              <div className="text-xs text-slate-600">
                {VC_EXECUTIVE_SUMMARY.title} • {VC_EXECUTIVE_SUMMARY.tenureStatus}
              </div>
            </div>
          </div>

          {/* Core Institutional Numbers */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Enrolled Students</div>
              <div className="text-xl font-black text-slate-900 mt-1">42,850</div>
              <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">Across 14 Faculties</div>
            </div>

            <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Academic Faculty</div>
              <div className="text-xl font-black text-slate-900 mt-1">1,240</div>
              <div className="text-[11px] text-slate-600 mt-0.5">68 Departments</div>
            </div>

            <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Daily Attendance</div>
              <div className="text-xl font-black text-emerald-700 mt-1">88.4%</div>
              <div className="text-[11px] text-emerald-600 mt-0.5">Biometric & LMS Sync</div>
            </div>

            <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">1Link Fee Recovery</div>
              <div className="text-xl font-black text-blue-900 mt-1">94.2%</div>
              <div className="text-[11px] text-blue-700 mt-0.5">PKR 1.39B Reconciled</div>
            </div>
          </div>
        </div>

        {/* Executive Context Header (Zero Secondary Navbar Clutter) */}
        <div className="px-6 py-3.5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
              {activeTab === 'overview' && <BarChart3 className="w-4 h-4 text-purple-900" />}
              {activeTab === 'faculties' && <School className="w-4 h-4 text-blue-900" />}
              {activeTab === 'examinations' && <Award className="w-4 h-4 text-emerald-800" />}
              {activeTab === 'governance' && <FileText className="w-4 h-4 text-amber-800" />}
              {activeTab === 'finance' && <CreditCard className="w-4 h-4 text-teal-800" />}
              {activeTab === 'profile' && <ShieldCheck className="w-4 h-4 text-purple-900" />}
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                {activeTab === 'overview' && 'Executive University Command Radar & KPIs'}
                {activeTab === 'faculties' && '14 Faculties & Academic Deans Governance'}
                {activeTab === 'examinations' && 'Controller of Examinations & Tabulation Council'}
                {activeTab === 'governance' && 'Statutory Senate & Syndicate Directives'}
                {activeTab === 'finance' && '1Link Digital Treasury & Revenue Reconciliation'}
                {activeTab === 'profile' && 'Vice-Chancellor Secretariat Identity & Credentials'}
              </h2>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Central University Administration · Allama II Qazi Campus, Jamshoro
              </p>
            </div>
          </div>

          <div className="text-xs text-slate-500 font-mono">
            Session: Fall 2026
          </div>
        </div>
      </div>

      {syndicateActionNotice && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{syndicateActionNotice}</span>
        </div>
      )}

      {/* =========================================================
          TAB 1: UNIVERSITY RADAR & KPIS
         ========================================================= */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Campus Compliance Radar */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-800" />
                  <span>75% HEC Minimum Policy Status</span>
                </h3>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200">
                  Campus-Wide
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-600 font-medium">Eligible for Final Examinations (&ge; 75%)</span>
                    <span className="font-bold text-slate-900">38,136 (89.0%)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-emerald-600 rounded-full" style={{ width: '89%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-600 font-medium">At-Risk Probation Zone (65% &ndash; 74%)</span>
                    <span className="font-bold text-amber-700">3,428 (8.0%)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: '8%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-600 font-medium">Debarred Without Appeal (&lt; 65%)</span>
                    <span className="font-bold text-rose-700">1,286 (3.0%)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-rose-600 rounded-full" style={{ width: '3%' }} />
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-[11px] text-slate-600">
                Automatic biometric lock enforced at Elsa Kazi, Jamshoro, and regional campuses. Admit cards withheld if below 75% without Medical Board waiver.
              </div>
            </div>

            {/* Examination Council Readiness */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-700" />
                  <span>Fall 2026 Examination Audit</span>
                </h3>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Ready
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200/60">
                  <span className="text-slate-600">Official Exam Centers Inspected</span>
                  <strong className="text-slate-900">48 Centers</strong>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200/60">
                  <span className="text-slate-600">Digital Admit Cards Issued</span>
                  <strong className="text-emerald-700">41,200 Generated</strong>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200/60">
                  <span className="text-slate-600">QR Code Verification Terminals</span>
                  <strong className="text-slate-900">100% Operational</strong>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200/60">
                  <span className="text-slate-600">CCTV & Invigilation Vigilance</span>
                  <strong className="text-blue-800">14 Teams Deployed</strong>
                </div>
              </div>

              <button
                onClick={() => handleDispatchDirective('Affirm Fall 2026 Examination Conduct Readiness across all Campuses')}
                className="w-full py-2 px-3 rounded-xl bg-[#0f2942] hover:bg-[#163e63] text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Issue Vice-Chancellor Concurrence</span>
              </button>
            </div>

            {/* Treasury & 1Link Live Reconciliation */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-emerald-700" />
                  <span>1Link Digital Treasury Status</span>
                </h3>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Live Webhook
                </span>
              </div>

              <div className="space-y-2">
                <div className="text-[11px] text-slate-500 uppercase tracking-wider font-mono">Current Semester Recovery</div>
                <div className="text-2xl font-black text-slate-900">PKR 1,392,400,000</div>
                <div className="text-xs text-slate-600">
                  Target: PKR 1,480,000,000 (94.2% collected)
                </div>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Habib Bank Limited (HBL)</span>
                  <span className="font-semibold text-slate-900">PKR 812M</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Sindh Bank Core Branches</span>
                  <span className="font-semibold text-slate-900">PKR 468M</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Digital 1Link / OTC Wallets</span>
                  <span className="font-semibold text-slate-900">PKR 112M</span>
                </div>
              </div>

              <div className="text-[11px] text-emerald-700 font-medium flex items-center gap-1.5 pt-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Zero manual bank receipts — automated instant ledgering.</span>
              </div>
            </div>
          </div>

          {/* All 14 Faculties Overview Table */}
          <div className="bg-white border border-slate-200/90 rounded-2xl shadow-2xs overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  Academic Faculties & Constituent Departments
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Real-time operational sync across Deans, Chairpersons, and Faculty Boards.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-medium">Filter Faculty:</span>
                <select
                  value={selectedFacultyFilter}
                  onChange={(e) => setSelectedFacultyFilter(e.target.value)}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-800"
                >
                  <option value="all">All 14 Faculties (Full View)</option>
                  {UNIVERSITY_FACULTIES.map(f => (
                    <option key={f.id} value={f.id}>{f.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 font-mono text-[11px] text-slate-600 uppercase">
                  <tr>
                    <th className="py-3 px-4">Faculty Name</th>
                    <th className="py-3 px-4">Dean & Head</th>
                    <th className="py-3 px-4">Departments</th>
                    <th className="py-3 px-4">Students</th>
                    <th className="py-3 px-4">Faculty</th>
                    <th className="py-3 px-4">Avg Attendance</th>
                    <th className="py-3 px-4">Pass Rate</th>
                    <th className="py-3 px-4">Accreditation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredFaculties.map((fac) => (
                    <tr key={fac.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900">
                        {fac.name}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-900">{fac.deanName}</div>
                        <div className="text-[11px] text-slate-500 font-mono">{fac.deanEmail}</div>
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-800">
                        {fac.departmentsCount} Departments
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-slate-900">
                        {fac.studentsCount.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-700">
                        {fac.teachersCount}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`font-mono font-bold ${
                          fac.attendanceAvg >= 88 ? 'text-emerald-700' : 'text-blue-800'
                        }`}>
                          {fac.attendanceAvg}%
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono font-semibold text-slate-900">
                        {fac.passingRate}%
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-medium border border-slate-200">
                          {fac.accreditationStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 2: FACULTIES & DEANS
         ========================================================= */}
      {activeTab === 'faculties' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {UNIVERSITY_FACULTIES.map((fac) => (
              <div 
                key={fac.id} 
                className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-mono text-slate-500 font-semibold uppercase">{fac.id}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 text-[10px]">
                      {fac.accreditationStatus}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {fac.name}
                  </h3>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 space-y-1">
                    <div className="text-[10px] uppercase font-bold text-slate-500 font-mono">Appointed Dean</div>
                    <div className="text-xs font-bold text-slate-900">{fac.deanName}</div>
                    <div className="text-[11px] text-slate-500 font-mono">{fac.deanEmail}</div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center pt-1">
                    <div className="p-2 rounded-lg bg-slate-50">
                      <div className="text-base font-black text-slate-900">{fac.departmentsCount}</div>
                      <div className="text-[10px] text-slate-500 uppercase">Depts</div>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50">
                      <div className="text-base font-black text-slate-900">{fac.studentsCount}</div>
                      <div className="text-[10px] text-slate-500 uppercase">Scholars</div>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50">
                      <div className="text-base font-black text-emerald-700">{fac.attendanceAvg}%</div>
                      <div className="text-[10px] text-slate-500 uppercase">Attendance</div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500">{fac.teachersCount} Academic Teachers</span>
                  <button
                    onClick={() => {
                      if (onNavigateToFaculty) onNavigateToFaculty(fac.id);
                    }}
                    className="text-xs font-bold text-[#0f2942] hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Faculty Portal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 3: EXAMINATIONS & RESULTS
         ========================================================= */}
      {activeTab === 'examinations' && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-amber-700 font-mono">
                Office of the Controller of Examinations
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                Central Examination Oversight & Result Gatekeeper
              </h3>
            </div>
            <button
              onClick={() => handleDispatchDirective('Sanction and Ratify Fall 2026 University-wide Semester Result Publication')}
              className="py-2.5 px-4 rounded-xl bg-[#0f2942] hover:bg-[#163e63] text-white text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Authorize Syndicate Result Gazette</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs font-bold text-slate-800">1. Verification Checksum</div>
              <p className="text-xs text-slate-600">
                All 68 departments tabulated on unified grading curve with sha256 checksums before printing.
              </p>
              <span className="inline-block text-[11px] font-bold text-emerald-700">● 100% Audit Verified</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs font-bold text-slate-800">2. Debarred Student Enforcement</div>
              <p className="text-xs text-slate-600">
                1,286 students below 75% attendance locked automatically; cannot sit without Medical Board sign-off.
              </p>
              <span className="inline-block text-[11px] font-bold text-blue-800">● Policy Enforced</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs font-bold text-slate-800">3. Live Hall QR Verification</div>
              <p className="text-xs text-slate-600">
                Invigilators scanning student admit slip barcodes at Allama I.I. Kazi center in real-time.
              </p>
              <span className="inline-block text-[11px] font-bold text-emerald-700">● Terminals Active</span>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 4: GOVERNANCE & SYNDICATE
         ========================================================= */}
      {activeTab === 'governance' && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono">
                Statutory Governance Desk
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                Senate & Syndicate Enacted Resolutions (2026)
              </h3>
            </div>
          </div>

          <div className="space-y-3">
            {VC_EXECUTIVE_SUMMARY.syndicateResolutions.map((res) => (
              <div key={res.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {res.id}
                    </span>
                    <span className="text-xs text-slate-500">{res.date}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{res.title}</h4>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                    {res.status}
                  </span>
                  <button
                    onClick={() => handleDispatchDirective(`Re-affirm Syndicate Directive ${res.id}`)}
                    className="py-1.5 px-3 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-xs font-semibold text-slate-800 transition-colors cursor-pointer"
                  >
                    Transmit Circular
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 5: FINANCE & 1LINK
         ========================================================= */}
      {activeTab === 'finance' && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 font-mono">
                Directorate of Finance & Accounts
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                Central University Revenue & 1Link Digital Reconciliation
              </h3>
            </div>
            <div className="text-xs text-slate-600 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 font-mono font-bold text-emerald-800">
              Total Recovered: PKR 1.392B
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-xl border border-slate-200 space-y-3">
              <h4 className="text-xs font-bold uppercase text-slate-700">Bank Gateway Distributions</h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-600">Habib Bank Limited (HBL) Branch Code 0077</span>
                  <span className="font-mono font-bold text-slate-900">PKR 812,400,000</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-600">Sindh Bank University Campus Branch</span>
                  <span className="font-mono font-bold text-slate-900">PKR 468,000,000</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-600">1Link OTC Bill Payment (EasyPaisa/JazzCash)</span>
                  <span className="font-mono font-bold text-slate-900">PKR 112,000,000</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 space-y-3">
              <h4 className="text-xs font-bold uppercase text-slate-700">Reconciliation Governance</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Prior to modernization, students waited in physical queues for 3 days at Habib Bank Sindh University branch. Under the new centralized 1Link integration, fee challans update within 60 seconds of online payment, automatically granting exam clearance.
              </p>
              <div className="text-xs font-semibold text-emerald-700 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Auditor General of Pakistan (AGP) Compliance Standard Met</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 6: VC SECRETARIAT EXECUTIVE PROFILE & IDENTITY
         ========================================================= */}
      {activeTab === 'profile' && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#0b2545] p-2 flex items-center justify-center shadow-md">
                <UniversitySeal size="lg" showText={false} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-slate-900">
                    {VC_EXECUTIVE_SUMMARY.viceChancellorName}
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                    Statutory Executive Head
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5">
                  Vice-Chancellor & Chief Executive Officer · University of Sindh, Jamshoro
                </p>
                <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1">
                  <span>Secretariat: Allama I.I. Kazi Central Building</span>
                  <span>·</span>
                  <span className="text-emerald-700 font-medium">Digital Signature Token: Active (PKI Verified)</span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-400 font-mono uppercase block">Authority Code</span>
              <span className="text-xs font-mono font-bold text-[#0b2545] bg-slate-100 px-2.5 py-1 rounded">
                UOS-EXEC-VC-001
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Statutory Bodies Presided</h4>
              <ul className="text-xs space-y-2 text-slate-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  <span>Chairman, University Senate</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  <span>Chairman, Syndicate (Executive Council)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  <span>Chairman, Academic Council</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  <span>Chairman, Statutory Selection Board</span>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Executive Jurisdiction</h4>
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span>Faculties Under Oversight</span>
                  <span className="font-bold text-slate-900">14 Faculties</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span>Academic Departments</span>
                  <span className="font-bold text-slate-900">68 Depts & Institutes</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span>Constituent Campuses</span>
                  <span className="font-bold text-slate-900">Jamshoro, Elsa Kazi, Dadu, Mirpurkhas, Thatta, Badin</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Total Student Population</span>
                  <span className="font-bold text-slate-900">42,500+ Scholars</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Secretariat Communications</h4>
              <div className="space-y-2 text-xs text-slate-600">
                <div>
                  <span className="text-[10px] text-slate-400 block">Official Secretariat Email</span>
                  <span className="font-mono text-slate-800 font-semibold">vc@usindh.edu.pk</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Confidential Secretariat Line</span>
                  <span className="font-mono text-slate-800 font-semibold">+92-22-9213121 / 9213122</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Personal Staff Officer (PSO)</span>
                  <span className="text-slate-800">Mr. Ghulam Rasool, PSO to VC</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
