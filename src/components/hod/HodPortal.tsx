import React, { useState } from 'react';
import { 
  UNIVERSITY_DEPARTMENTS, 
  UNIVERSITY_TEACHERS, 
  VC_EXECUTIVE_SUMMARY 
} from '../../data/mockAcademicData';
import { UniversitySeal } from '../common/UniversitySeal';
import { 
  Building2, 
  Users, 
  BookOpen, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  Award, 
  Send, 
  FileSpreadsheet, 
  ShieldCheck,
  Clock,
  School,
  ArrowRight,
  Filter
} from 'lucide-react';

interface HodPortalProps {
  onAddAuditLog: (log: any) => void;
  initialDeptId?: string;
  isChairman?: boolean;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export const HodPortal: React.FC<HodPortalProps> = ({ 
  onAddAuditLog,
  initialDeptId = 'dept_swe',
  isChairman = true,
  activeTab: controlledTab,
  onTabChange: setControlledTab
}) => {
  const [selectedDeptId, setSelectedDeptId] = useState<string>(initialDeptId);
  const [internalTab, setInternalTab] = useState<'overview' | 'cohorts' | 'accreditation' | 'broadcast' | 'appeals' | 'profile'>('overview');
  const activeTab = (controlledTab as any) || internalTab;
  const setActiveTab = (tab: any) => {
    if (setControlledTab) {
      setControlledTab(tab);
    } else {
      setInternalTab(tab);
    }
  };
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [broadcastSent, setBroadcastSent] = useState(false);
  const [resolvedAppeals, setResolvedAppeals] = useState<string[]>([]);

  const department = UNIVERSITY_DEPARTMENTS.find(d => d.id === selectedDeptId) || UNIVERSITY_DEPARTMENTS[0];
  const deptTeachers = UNIVERSITY_TEACHERS.filter(t => t.departmentId === department.id);

  const sampleBatches = [
    { batch: '2K21 Final Year', students: 185, avgCgpa: 3.42, attendance: 91.2, status: 'FYP & Capstone Defense Phase' },
    { batch: '2K22 Third Year', students: 210, avgCgpa: 3.28, attendance: 87.5, status: 'Internship & Core Courses' },
    { batch: '2K23 Second Year', students: 235, avgCgpa: 3.35, attendance: 88.5, status: 'Midterm Examination Scheduled' },
    { batch: '2K24 Freshman', students: 210, avgCgpa: 3.15, attendance: 86.8, status: 'Foundation Semester in Progress' }
  ];

  const pendingMedicalAppeals = [
    { id: 'APP-01', rollNo: '2K23/SWE/104', student: 'Zainab Ali', course: 'CS-411 Cyber Law', currentAtt: '72%', reason: 'Dengue fever hospital admission (Civil Hospital Hyderabad)', certVerified: true },
    { id: 'APP-02', rollNo: '2K23/SWE/072', student: 'Ahmed Raza', course: 'SWE-401 Arch', currentAtt: '71%', reason: 'Inter-University National Debate Competition representation', certVerified: true },
    { id: 'APP-03', rollNo: '2K23/SWE/091', student: 'Sanaullah Jamali', course: 'SWE-403 SQA', currentAtt: '68%', reason: 'Family medical emergency documentation submitted', certVerified: false }
  ];

  const handleResolveAppeal = (appealId: string, approved: boolean) => {
    setResolvedAppeals(prev => [...prev, appealId]);
    onAddAuditLog({
      id: 'log_' + Date.now().toString().slice(-4),
      who: `${department.chairmanName} (Chairperson)`,
      role: 'Chairman / HOD',
      what: `Attendance Medical Appeal ${appealId} ${approved ? 'Endorsed' : 'Rejected'}`,
      category: 'Student Welfare',
      when: new Date().toLocaleString() + ' PKT',
      whereIp: '10.14.0.5 (Chairperson Office)',
      objectTarget: `Appeal: ${appealId} · Dept: ${department.name}`,
      beforeState: 'Pending Chairman Review',
      afterState: approved ? 'Endorsed to Dean & Controller' : 'Rejected for Inadequate Hospital Documentation',
      reason: '75% Attendance Statutory Review',
      referenceId: 'HOD-APP-' + Date.now().toString().slice(-6)
    });
  };

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    onAddAuditLog({
      id: 'log_' + Date.now().toString().slice(-4),
      who: `${department.chairmanName} (Chairperson)`,
      role: 'Chairman / HOD',
      what: `Departmental Circular Dispatched: ${broadcastTitle}`,
      category: 'Announcement',
      when: new Date().toLocaleString() + ' PKT',
      whereIp: '10.14.0.5 (Chairperson Terminal)',
      objectTarget: `All Enrolled Batches of ${department.name}`,
      beforeState: 'Draft Circular',
      afterState: 'Dispatched to LMS Noticeboards & Student Portals',
      reason: broadcastTitle,
      referenceId: 'NOTIF-HOD-' + Date.now().toString().slice(-6)
    });

    setBroadcastSent(true);
    setTimeout(() => {
      setBroadcastSent(false);
      setBroadcastTitle('');
      setBroadcastMessage('');
    }, 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Department Leadership Lockup */}
      <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
        <div className="bg-[#0b2545] text-white px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-[#081b33]">
          <div className="flex items-center gap-3.5">
            <UniversitySeal size="sm" monochrome={false} />
            <div>
              <div className="text-[11px] font-semibold tracking-wider text-amber-300 uppercase font-mono">
                {isChairman ? 'Teaching Department · Office of the Chairperson' : 'Institute / Academic Unit · Office of the Director / HOD'}
              </div>
              <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
                {department.name}
              </h1>
              <div className="text-xs text-slate-300 font-sans mt-0.5">
                {isChairman ? 'Chairperson' : 'Director / HOD'}: <strong className="text-white">{department.chairmanName}</strong>
              </div>
            </div>
          </div>

          {/* Department Switcher */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-300 hidden sm:inline">Active Department:</span>
            <select
              value={selectedDeptId}
              onChange={(e) => setSelectedDeptId(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-white/20 bg-white/10 text-white text-xs font-semibold backdrop-blur-xs cursor-pointer focus:outline-hidden"
            >
              {UNIVERSITY_DEPARTMENTS.map(d => (
                <option key={d.id} value={d.id} className="text-slate-900 bg-white">
                  {d.name} ({d.code})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Chairperson Context & Metric Strip */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-gradient-to-b from-slate-50/50 to-white">
          <div className="lg:col-span-5 flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#0b2545] text-amber-300 flex items-center justify-center font-serif text-lg font-bold border border-slate-300/60 shadow-xs shrink-0">
              HOD
            </div>
            <div className="space-y-1">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">
                Chairperson / Head of Department
              </div>
              <h2 className="text-lg font-bold text-slate-900 leading-snug">
                {department.chairmanName}
              </h2>
              <div className="text-xs text-slate-600 font-mono">
                {department.chairmanEmail} • {department.facultyName}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Students</div>
              <div className="text-xl font-black text-slate-900 mt-1">{department.studentsCount}</div>
              <div className="text-[11px] text-slate-600 mt-0.5">4 Cohort Batches</div>
            </div>

            <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Faculty Members</div>
              <div className="text-xl font-black text-slate-900 mt-1">{department.teachersCount}</div>
              <div className="text-[11px] text-slate-600 mt-0.5">Assigned Roster</div>
            </div>

            <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Attendance Rate</div>
              <div className="text-xl font-black text-emerald-700 mt-1">{department.attendanceRate}%</div>
              <div className="text-[11px] text-emerald-600 mt-0.5">75% Policy Enforced</div>
            </div>

            <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Offered Courses</div>
              <div className="text-xl font-black text-blue-900 mt-1">{department.coursesOfferedCount}</div>
              <div className="text-[11px] text-blue-700 mt-0.5">Active Sections</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 border-t border-slate-200/80 flex items-center gap-1 overflow-x-auto text-xs font-semibold">
          {[
            { id: 'overview', label: 'Department Radar', icon: <School className="w-4 h-4" /> },
            { id: 'cohorts', label: 'Undergraduate Batches (2K21-2K24)', icon: <Users className="w-4 h-4" /> },
            { id: 'appeals', label: 'Attendance Medical Appeals', icon: <Clock className="w-4 h-4" /> },
            { id: 'accreditation', label: 'NCEAC / OBE Criteria', icon: <ShieldCheck className="w-4 h-4" /> },
            { id: 'broadcast', label: 'Department Circulars', icon: <Send className="w-4 h-4" /> },
            { id: 'profile', label: isChairman ? 'Chairperson Secretariat' : 'Director Office', icon: <Building2 className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 px-3.5 border-b-2 flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-[#0b2545] text-[#0b2545] font-bold'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* =========================================================
          TAB 1: DEPARTMENT RADAR
         ========================================================= */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">Department Programs</h3>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-800">
                  {department.programs.length} Active
                </span>
              </div>
              <div className="space-y-2">
                {department.programs.map((prog, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs font-semibold text-slate-800 flex items-center justify-between">
                    <span>{prog}</span>
                    <span className="text-[10px] text-slate-400 font-mono">Accredited</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">Attendance Compliance</h3>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800">
                  {department.attendanceRate}% Overall
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Lectures marked synchronously by department instructors. Students with &lt; 75% receive automated warnings and are placed on debarred lists pending medical scrutiny.
              </p>
              <div className="text-xs font-semibold text-blue-900 flex items-center gap-1.5 pt-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>3 Medical appeals currently under Chairman review.</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">OBE & Continuous Quality</h3>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-800">
                  CQI Cycle
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                CLO-PLO attainment matrix mapped for all 36 offered semester modules. Course folders and rubrics submitted to Quality Enhancement Cell (QEC).
              </p>
              <div className="text-xs font-semibold text-emerald-700 flex items-center gap-1.5 pt-1">
                <ShieldCheck className="w-4 h-4" />
                <span>NCEAC Level-W4 Accreditation Sustained</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 2: COHORT BATCHES
         ========================================================= */}
      {activeTab === 'cohorts' && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-4">
          <div className="border-b border-slate-200 pb-4">
            <h3 className="text-base font-bold text-slate-900">
              Department Cohorts & Batch Progression
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Live progression tracking across all 4 undergraduate batches of {department.name}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sampleBatches.map((b, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900">{b.batch}</h4>
                  <span className="text-xs font-mono font-bold text-blue-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {b.students} Scholars
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded-lg bg-white border border-slate-200/70">
                    <span className="text-slate-500">Average CGPA:</span> <strong className="text-slate-900">{b.avgCgpa}</strong>
                  </div>
                  <div className="p-2 rounded-lg bg-white border border-slate-200/70">
                    <span className="text-slate-500">Attendance:</span> <strong className="text-emerald-700">{b.attendance}%</strong>
                  </div>
                </div>

                <div className="text-xs text-slate-600 bg-white p-2 rounded-lg border border-slate-200/70">
                  Status: <strong>{b.status}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 3: ATTENDANCE APPEALS
         ========================================================= */}
      {activeTab === 'appeals' && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-4">
          <div className="border-b border-slate-200 pb-4">
            <h3 className="text-base font-bold text-slate-900">
              Statutory 75% Minimum Attendance Appeals & Grievances
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Medical certificates and official representations reviewed before examination admit card lockdown.
            </p>
          </div>

          <div className="space-y-3">
            {pendingMedicalAppeals.map((app) => {
              const isResolved = resolvedAppeals.includes(app.id);
              return (
                <div key={app.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                        {app.rollNo}
                      </span>
                      <strong className="text-sm text-slate-900">{app.student}</strong>
                      <span className="text-xs font-mono font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                        {app.currentAtt} ({app.course})
                      </span>
                    </div>
                    <div className="text-xs text-slate-600">{app.reason}</div>
                    <div className="text-[11px] text-slate-400">
                      Medical Certificate: {app.certVerified ? 'Verified by Liaquat University Hospital Jamshoro' : 'Pending verification'}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {isResolved ? (
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                        Action Recorded & Synced
                      </span>
                    ) : (
                      <>
                        <button
                          onClick={() => handleResolveAppeal(app.id, true)}
                          className="py-1.5 px-3 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold transition-colors cursor-pointer"
                        >
                          Approve Medical Waiver
                        </button>
                        <button
                          onClick={() => handleResolveAppeal(app.id, false)}
                          className="py-1.5 px-3 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-semibold transition-colors cursor-pointer"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 4: ACCREDITATION
         ========================================================= */}
      {activeTab === 'accreditation' && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-4">
          <div className="border-b border-slate-200 pb-4">
            <h3 className="text-base font-bold text-slate-900">
              Accreditation & Quality Assurance Desk
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Program accreditation metrics for {department.name}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs font-bold text-slate-800">Faculty Student Ratio</div>
              <div className="text-lg font-black text-slate-900">1 : 30</div>
              <p className="text-xs text-slate-600">Compliant with National Computing Education Accreditation Council norms.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs font-bold text-slate-800">PhD Faculty Proportion</div>
              <div className="text-lg font-black text-blue-900">42%</div>
              <p className="text-xs text-slate-600">Foreign and indigenous doctoral degree holders heading course modules.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs font-bold text-slate-800">Laboratory Readiness</div>
              <div className="text-lg font-black text-emerald-700">100% Calibrated</div>
              <p className="text-xs text-slate-600">Modern computing labs with gigabit fiber backbone on Jamshoro campus.</p>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 5: DEPARTMENT BROADCAST
         ========================================================= */}
      {activeTab === 'broadcast' && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-4">
          <div className="border-b border-slate-200 pb-4">
            <h3 className="text-base font-bold text-slate-900">
              Department Circular Dispatch
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Transmitted instantly to all enrolled student mobile devices and faculty portals.
            </p>
          </div>

          {broadcastSent && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Official Department Circular published and verified.</span>
            </div>
          )}

          <form onSubmit={handleBroadcast} className="space-y-4 max-w-xl">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Notice Headline</label>
              <input
                type="text"
                required
                value={broadcastTitle}
                onChange={(e) => setBroadcastTitle(e.target.value)}
                placeholder="e.g. Mandatory Lab Examination Timetable for Batch 2K23"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-blue-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Circular Content</label>
              <textarea
                required
                rows={4}
                value={broadcastMessage}
                onChange={(e) => setBroadcastMessage(e.target.value)}
                placeholder="Specify instructions, venues, dates, and regulatory notices for scholars..."
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-blue-800"
              />
            </div>

            <button
              type="submit"
              className="py-2.5 px-5 rounded-xl bg-[#0b2545] hover:bg-[#123b6b] text-white text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Dispatch Circular to Department</span>
            </button>
          </form>
        </div>
      )}

      {/* =========================================================
          TAB: CHAIRPERSON / DIRECTOR DESK & CREDENTIALS
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
                  <h3 className="text-xl font-bold text-slate-900">{department.chairmanName}</h3>
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-900 border border-amber-200">
                    {isChairman ? 'Chairperson' : 'Director'}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5">
                  Head of {department.name} · University of Sindh, Jamshoro
                </p>
                <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1">
                  <span>Office: Dept Building, Ground Floor, Allama II Qazi Campus</span>
                  <span>·</span>
                  <span className="text-emerald-700 font-medium">Board of Studies Chairman</span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-400 font-mono uppercase block">Office Code</span>
              <span className="text-xs font-mono font-bold text-[#0b2545] bg-slate-100 px-2.5 py-1 rounded">
                DEPT-{department.code}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Department Programs</h4>
              <ul className="text-xs space-y-1.5 text-slate-600">
                {department.programs.map((prog, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                    <span>{prog}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Academic Administration</h4>
              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span>Total Enrolled Scholars</span>
                  <span className="font-bold text-slate-900">{department.studentsCount} Students</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span>Teaching Faculty Roster</span>
                  <span className="font-bold text-slate-900">{deptTeachers.length} Professors & Lecturers</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>National Accreditation</span>
                  <span className="font-bold text-emerald-800">NCEAC W-Category / HEC Level-1</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Official Contact & Office Hours</h4>
              <div className="space-y-2 text-xs text-slate-600">
                <div>
                  <span className="text-[10px] text-slate-400 block">Department Email</span>
                  <span className="font-mono text-slate-800 font-semibold">{department.code.toLowerCase()}@usindh.edu.pk</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Department Office Extension</span>
                  <span className="font-mono text-slate-800 font-semibold">+92-22-9213181 Ext 240</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Student Consultation Hours</span>
                  <span className="text-slate-800">Tuesday & Thursday: 11:00 AM – 01:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
