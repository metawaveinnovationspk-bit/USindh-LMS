import React, { useState } from 'react';
import { 
  UNIVERSITY_FACULTIES, 
  UNIVERSITY_DEPARTMENTS, 
  UNIVERSITY_TEACHERS 
} from '../../data/mockAcademicData';
import { UniversitySeal } from '../common/UniversitySeal';
import { 
  Building2, 
  GraduationCap, 
  Users, 
  Clock, 
  Award, 
  FileText, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight,
  Layers,
  School,
  ExternalLink,
  Filter
} from 'lucide-react';

interface DeanPortalProps {
  onAddAuditLog: (log: any) => void;
  onNavigateToDepartment?: (deptId: string) => void;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export const DeanPortal: React.FC<DeanPortalProps> = ({ 
  onAddAuditLog,
  onNavigateToDepartment,
  activeTab: controlledTab,
  onTabChange: setControlledTab
}) => {
  const [selectedFacultyId, setSelectedFacultyId] = useState<string>('fac_eng');
  const [internalTab, setInternalTab] = useState<'overview' | 'departments' | 'faculty' | 'bof' | 'accreditation' | 'profile'>('overview');
  const activeTab = (controlledTab as any) || internalTab;
  const setActiveTab = (tab: any) => {
    if (setControlledTab) {
      setControlledTab(tab);
    } else {
      setInternalTab(tab);
    }
  };
  const [approvalNotice, setApprovalNotice] = useState<string | null>(null);

  const selectedFaculty = UNIVERSITY_FACULTIES.find(f => f.id === selectedFacultyId) || UNIVERSITY_FACULTIES[0];
  const constituentDepts = UNIVERSITY_DEPARTMENTS.filter(d => d.facultyId === selectedFaculty.id);
  const facultyTeachers = UNIVERSITY_TEACHERS.filter(t => constituentDepts.some(d => d.id === t.departmentId));

  const handleApproveCurriculum = (deptName: string) => {
    onAddAuditLog({
      id: 'log_' + Date.now().toString().slice(-4),
      who: `${selectedFaculty.deanName} (Dean)`,
      role: 'Dean',
      what: `Board of Faculty (BoF) Curriculum & Timetable Ratified for ${deptName}`,
      category: 'Academic Administration',
      when: new Date().toLocaleString() + ' PKT',
      whereIp: '10.14.0.1 (Dean Secretariat Terminal)',
      objectTarget: `Faculty: ${selectedFaculty.name} · Dept: ${deptName}`,
      beforeState: 'Under Dean Committee Review',
      afterState: 'Formally Approved & Synced with Controller',
      reason: 'Statutory Board of Faculty Concurrence',
      referenceId: 'DEAN-BOF-' + Date.now().toString().slice(-6)
    });

    setApprovalNotice(`Curriculum for ${deptName} successfully approved by Dean of ${selectedFaculty.name}.`);
    setTimeout(() => setApprovalNotice(null), 3500);
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3.5 sm:py-6 space-y-4 sm:space-y-6">
      {/* Dean Faculty Executive Lockup */}
      <div className="bg-white border border-[#d8dadb] rounded-2xl shadow-2xs overflow-hidden">
        <div className="bg-[#004b87] text-white px-4 sm:px-6 py-3.5 sm:py-4 flex flex-wrap items-center justify-between gap-3 border-b border-[#003865]">
          <div className="flex items-center gap-3">
            <div className="p-1 bg-white rounded-xl border border-[#d8dadb] shrink-0">
              <UniversitySeal size="sm" monochrome={false} />
            </div>
            <div>
              <div className="text-[10px] sm:text-[11px] font-semibold tracking-wider text-[#c8e27b] uppercase font-mono">
                Office of the Dean • Board of Faculty
              </div>
              <h1 className="text-sm sm:text-lg font-bold text-white tracking-tight">
                {selectedFaculty.name}
              </h1>
            </div>
          </div>

          {/* Faculty Switcher */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs text-[#c8e27b] hidden sm:inline">Faculty:</span>
            <select
              value={selectedFacultyId}
              onChange={(e) => setSelectedFacultyId(e.target.value)}
              className="w-full sm:w-auto min-h-[36px] px-3 py-1.5 rounded-xl border border-white/25 bg-white/10 text-white text-xs font-semibold backdrop-blur-xs cursor-pointer focus:outline-hidden"
            >
              {UNIVERSITY_FACULTIES.map(fac => (
                <option key={fac.id} value={fac.id} className="text-slate-900 bg-white">
                  {fac.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Dean Persona Lockup & Core Numbers */}
        <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-center bg-gradient-to-b from-slate-50/50 to-white">
          <div className="lg:col-span-5 flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#133e87] text-amber-300 flex items-center justify-center font-serif text-lg font-bold border border-slate-300/60 shadow-xs shrink-0">
              DEAN
            </div>
            <div className="space-y-1">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">
                Dean of the Faculty
              </div>
              <h2 className="text-lg font-bold text-slate-900 leading-snug">
                {selectedFaculty.deanName}
              </h2>
              <div className="text-xs text-slate-600 font-mono">
                {selectedFaculty.deanEmail} • {selectedFaculty.accreditationStatus}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Departments</div>
              <div className="text-xl font-black text-slate-900 mt-1">{constituentDepts.length}</div>
              <div className="text-[11px] text-slate-600 mt-0.5">Active Academic Units</div>
            </div>

            <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Total Enrolled</div>
              <div className="text-xl font-black text-slate-900 mt-1">{selectedFaculty.studentsCount.toLocaleString()}</div>
              <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">Undergraduate & MS</div>
            </div>

            <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Academic Faculty</div>
              <div className="text-xl font-black text-slate-900 mt-1">{selectedFaculty.teachersCount}</div>
              <div className="text-[11px] text-slate-600 mt-0.5">Permanent & Adjunct</div>
            </div>

            <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Faculty Attendance</div>
              <div className="text-xl font-black text-emerald-700 mt-1">{selectedFaculty.attendanceAvg}%</div>
              <div className="text-[11px] text-emerald-600 mt-0.5">75% Policy Met</div>
            </div>
          </div>
        </div>

        {/* Dean Academic Context Header (Zero Secondary Navbar Clutter) */}
        <div className="px-6 py-3.5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
              {activeTab === 'overview' && <Layers className="w-4 h-4 text-indigo-900" />}
              {activeTab === 'departments' && <School className="w-4 h-4 text-blue-900" />}
              {activeTab === 'faculty' && <Users className="w-4 h-4 text-emerald-800" />}
              {activeTab === 'bof' && <FileText className="w-4 h-4 text-indigo-800" />}
              {activeTab === 'accreditation' && <ShieldCheck className="w-4 h-4 text-purple-900" />}
              {activeTab === 'profile' && <Building2 className="w-4 h-4 text-amber-800" />}
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                {activeTab === 'overview' && 'Faculty Executive Radar & Departmental Metrics'}
                {activeTab === 'departments' && 'Constituent Engineering & Technology Departments'}
                {activeTab === 'faculty' && 'Professors, Associate Professors & Teaching Staff'}
                {activeTab === 'bof' && 'Board of Faculty (BoF) Curricula & Timetable Resolutions'}
                {activeTab === 'accreditation' && 'National Accreditation Status & OBE Governance'}
                {activeTab === 'profile' && 'Dean Office Credentials & Statutory Jurisdiction'}
              </h2>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Faculty of Engineering & Technology · University of Sindh, Jamshoro
              </p>
            </div>
          </div>

          <div className="text-xs text-slate-500 font-mono">
            Dean Office: FET Complex
          </div>
        </div>
      </div>

      {approvalNotice && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{approvalNotice}</span>
        </div>
      )}

      {/* =========================================================
          TAB 1: CONSTITUENT DEPARTMENTS
         ========================================================= */}
      {activeTab === 'overview' || activeTab === 'departments' ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {constituentDepts.map((dept) => (
              <div
                key={dept.id}
                className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-mono font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      Code: {dept.code}
                    </span>
                    <span className="text-emerald-700 font-bold flex items-center gap-1 font-mono">
                      <span>Attendance: {dept.attendanceRate}%</span>
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {dept.name}
                    </h3>
                    <div className="text-xs text-slate-500 mt-1">
                      Chairman: <strong className="text-slate-800">{dept.chairmanName}</strong> ({dept.chairmanEmail})
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 space-y-2">
                    <div className="text-[10px] font-bold uppercase text-slate-400">Offered Degree Programs:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {dept.programs.map((p, idx) => (
                        <span key={idx} className="text-[11px] px-2 py-0.5 bg-white border border-slate-200 rounded text-slate-700 font-medium">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center pt-1">
                    <div className="p-2 rounded-lg bg-slate-50">
                      <div className="text-base font-black text-slate-900">{dept.studentsCount}</div>
                      <div className="text-[10px] text-slate-500 uppercase">Enrolled</div>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50">
                      <div className="text-base font-black text-slate-900">{dept.teachersCount}</div>
                      <div className="text-[10px] text-slate-500 uppercase">Teachers</div>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50">
                      <div className="text-base font-black text-blue-900">{dept.coursesOfferedCount}</div>
                      <div className="text-[10px] text-slate-500 uppercase">Courses</div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => handleApproveCurriculum(dept.name)}
                    className="py-1.5 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Approve Syllabus & Roster
                  </button>

                  <button
                    onClick={() => {
                      if (onNavigateToDepartment) onNavigateToDepartment(dept.id);
                    }}
                    className="text-xs font-bold text-blue-900 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Department Workspace</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {/* =========================================================
          TAB 2: TEACHING STAFF ROSTER
         ========================================================= */}
      {activeTab === 'faculty' && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                Faculty Academic Teaching Roster
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Instructional workload and course assignment across {selectedFaculty.name}.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
              {facultyTeachers.length} Registered Instructors
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {facultyTeachers.map((tch) => (
              <div key={tch.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{tch.name}</h4>
                    <div className="text-xs text-slate-500">{tch.designation} • {tch.departmentName}</div>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {tch.officeRoom}
                  </span>
                </div>

                <div className="text-xs text-slate-600">
                  <span className="text-slate-400">Email:</span> {tch.email} | <span className="text-slate-400">Phone:</span> {tch.phone}
                </div>

                <div className="pt-2 border-t border-slate-200/70 flex flex-wrap gap-1">
                  {tch.activeCourses.map((c, idx) => (
                    <span key={idx} className="text-[10px] font-mono px-2 py-0.5 bg-blue-50 text-blue-900 border border-blue-200 rounded font-semibold">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 3: ACCREDITATION & OBE
         ========================================================= */}
      {activeTab === 'accreditation' && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-4">
          <div className="border-b border-slate-200 pb-4">
            <h3 className="text-base font-bold text-slate-900">
              National Accreditation Status & OBE Governance
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Outcome-Based Education (OBE) criteria compliance across HEC, PEC, and NCEAC councils.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs font-bold text-slate-800">Accreditation Level</div>
              <div className="text-lg font-black text-emerald-700">{selectedFaculty.accreditationStatus}</div>
              <p className="text-xs text-slate-600">
                Highest national accreditation level ratified by the Higher Education Commission of Pakistan.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs font-bold text-slate-800">Faculty-Wide Pass Rate</div>
              <div className="text-lg font-black text-blue-900">{selectedFaculty.passingRate}%</div>
              <p className="text-xs text-slate-600">
                Aggregated terminal exam clearance rate across all constituent departments.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs font-bold text-slate-800">Continuous Quality Improvement</div>
              <div className="text-lg font-black text-amber-700">100% CQI Met</div>
              <p className="text-xs text-slate-600">
                Course Learning Outcomes (CLOs) mapped to Program Learning Outcomes (PLOs).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB: BOARD OF FACULTY (BOF) CURRICULA & RATIFICATIONS
         ========================================================= */}
      {activeTab === 'bof' && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-6 animate-in fade-in">
          <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Statutory Board of Faculty (BoF) Curricula & Timetable Resolutions
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Dean's statutory oversight of departmental Boards of Studies (BoS) recommendations and semester schedules.
              </p>
            </div>
            <div className="text-xs font-mono font-bold text-blue-900 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200">
              BoF Session: Fall 2026 Quorum Met
            </div>
          </div>

          <div className="space-y-3">
            {constituentDepts.map(dept => (
              <div key={dept.id} className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-900">{dept.name}</h4>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded">
                      Curriculum v2026.2
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    Chairman: {dept.chairmanName} · Students: {dept.studentsCount} · Courses: {dept.coursesOfferedCount}
                  </p>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Course Learning Outcomes (CLOs) verified by Quality Enhancement Cell (QEC).
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleApproveCurriculum(dept.name)}
                    className="px-3 py-1.5 bg-[#0b2545] hover:bg-blue-900 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                  >
                    Ratify Syllabus & Timetable
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================
          TAB: DEAN OFFICE CREDENTIALS & JURISDICTION
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
                  <h3 className="text-xl font-bold text-slate-900">{selectedFaculty.deanName}</h3>
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-50 text-indigo-900 border border-indigo-200">
                    Dean of Faculty
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5">
                  Dean, {selectedFaculty.name} · University of Sindh, Jamshoro
                </p>
                <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1">
                  <span>Secretariat: FET Complex, Allama II Qazi Campus</span>
                  <span>·</span>
                  <span className="text-emerald-700 font-medium">Statutory Term: 2024–2027</span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-400 font-mono uppercase block">Dean Office Code</span>
              <span className="text-xs font-mono font-bold text-[#0b2545] bg-slate-100 px-2.5 py-1 rounded">
                DEAN-{selectedFaculty.id.toUpperCase()}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Constituent Departments</h4>
              <ul className="text-xs space-y-1.5 text-slate-600">
                {constituentDepts.map(d => (
                  <li key={d.id} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                    <span className="truncate">{d.name}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Statutory Bodies & Committees</h4>
              <ul className="text-xs space-y-1.5 text-slate-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0" />
                  <span>Chairman, Board of Faculty (BoF)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0" />
                  <span>Member, University Academic Council</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0" />
                  <span>Member, Statutory Selection Board</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0" />
                  <span>Convener, Quality Enhancement Cell (QEC) Audits</span>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Dean Secretariat Contact</h4>
              <div className="space-y-2 text-xs text-slate-600">
                <div>
                  <span className="text-[10px] text-slate-400 block">Official Dean Email</span>
                  <span className="font-mono text-slate-800 font-semibold">dean.fet@usindh.edu.pk</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Direct Secretariat Extension</span>
                  <span className="font-mono text-slate-800 font-semibold">+92-22-9213181 Ext 204</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Office Hours</span>
                  <span className="text-slate-800">Monday–Thursday: 09:00 AM – 03:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
