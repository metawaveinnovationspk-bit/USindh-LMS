import React, { useState } from 'react';
import { UserRole } from '../../types';
import { 
  LayoutDashboard, 
  BookOpen, 
  Calendar, 
  Clock, 
  FileText, 
  Award, 
  GraduationCap, 
  CreditCard, 
  ShieldCheck, 
  ChevronLeft, 
  ChevronRight,
  UserCheck, 
  School, 
  Server, 
  CheckSquare,
  FileCheck2,
  HeartHandshake,
  User,
  ChevronDown,
  Building2,
  FolderGit2,
  Sparkles,
  HelpCircle,
  Home
} from 'lucide-react';

export interface NavSubLink {
  id: string;
  label: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: string;
  subLinks?: NavSubLink[];
}

export interface NavSection {
  heading: string;
  items: NavItem[];
}

interface AppSidebarProps {
  currentRole: UserRole;
  activeTab: string;
  onTabChange: (tabId: string, subLinkId?: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onSelectRole: (role: UserRole) => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({
  currentRole,
  activeTab,
  onTabChange,
  isCollapsed,
  onToggleCollapse,
  onSelectRole
}) => {
  // Navigation structure tailored to each persona with direct sub-links where beneficial
  const getNavSections = (): NavSection[] => {
    if (currentRole === 'vc') {
      return [
        {
          heading: 'Executive Command',
          items: [
            { id: 'overview', label: 'University Radar', icon: <LayoutDashboard className="w-4 h-4" /> },
            { id: 'faculties', label: '14 Faculties Oversight', icon: <School className="w-4 h-4" /> },
            { 
              id: 'examinations', 
              label: 'Examination Council', 
              icon: <Award className="w-4 h-4" />, 
              badge: 'Stage-Gate',
              subLinks: [
                { id: 'council', label: 'Controller Tabulation' },
                { id: 'convocation', label: 'Degree Conferment' }
              ]
            },
            { 
              id: 'governance', 
              label: 'Senate & Syndicate', 
              icon: <FileText className="w-4 h-4" />,
              subLinks: [
                { id: 'resolutions', label: 'Statutory Directives' },
                { id: 'minutes', label: 'Syndicate Minutes' }
              ]
            },
            { 
              id: 'finance', 
              label: '1Link Digital Treasury', 
              icon: <CreditCard className="w-4 h-4" />,
              subLinks: [
                { id: 'revenue', label: 'Online Fee Settlement' },
                { id: 'grants', label: 'HEC Recurring Budget' }
              ]
            }
          ]
        },
        {
          heading: 'Executive Identity',
          items: [
            { id: 'profile', label: 'VC Secretariat Profile', icon: <User className="w-4 h-4" /> }
          ]
        }
      ];
    } else if (currentRole === 'dean') {
      return [
        {
          heading: 'Faculty Governance',
          items: [
            { id: 'overview', label: 'Faculty Radar', icon: <LayoutDashboard className="w-4 h-4" /> },
            { 
              id: 'departments', 
              label: 'Constituent Departments', 
              icon: <School className="w-4 h-4" />,
              subLinks: [
                { id: 'depts', label: 'FET Academic Units' },
                { id: 'chairpersons', label: 'Chairpersons Roster' }
              ]
            },
            { id: 'faculty', label: 'Teaching Staff Roster', icon: <UserCheck className="w-4 h-4" /> },
            { 
              id: 'bof', 
              label: 'Board of Faculty (BoF)', 
              icon: <FileCheck2 className="w-4 h-4" />,
              subLinks: [
                { id: 'curricula', label: 'Curricula Approvals' },
                { id: 'minutes', label: 'BoF Resolutions' }
              ]
            },
            { id: 'accreditation', label: 'Accreditation & OBE', icon: <ShieldCheck className="w-4 h-4" /> }
          ]
        },
        {
          heading: 'Dean Office',
          items: [
            { id: 'profile', label: 'Dean Credentials', icon: <User className="w-4 h-4" /> }
          ]
        }
      ];
    } else if (currentRole === 'student') {
      return [
        {
          heading: 'Academic Workspace',
          items: [
            { id: 'overview', label: 'Dashboard & Feed', icon: <LayoutDashboard className="w-4 h-4" /> },
            { 
              id: 'courses', 
              label: 'Courses & Modules', 
              icon: <BookOpen className="w-4 h-4" />,
              subLinks: [
                { id: 'enrolled', label: 'Enrolled Courses' },
                { id: 'weekly', label: 'Weekly Learning Materials' }
              ]
            },
            { id: 'selection', label: 'Subject Selection', icon: <CheckSquare className="w-4 h-4" />, badge: 'Fall 2026' },
            { id: 'attendance', label: 'Attendance (75% Rule)', icon: <Clock className="w-4 h-4" />, badge: 'Biometric' },
            { 
              id: 'assignments', 
              label: 'Assignments & Labs', 
              icon: <FileText className="w-4 h-4" />,
              badge: '2 Due',
              subLinks: [
                { id: 'pending', label: 'Pending Deadlines' },
                { id: 'submissions', label: 'Submitted & Graded' }
              ]
            }
          ]
        },
        {
          heading: 'Assessments & Dues',
          items: [
            { 
              id: 'exams', 
              label: 'Exams & Admit Slip', 
              icon: <Award className="w-4 h-4" />,
              subLinks: [
                { id: 'slip', label: 'Admit Card with QR' },
                { id: 'datesheet', label: 'Midterm Datesheet' }
              ]
            },
            { 
              id: 'results', 
              label: 'Results & Transcript', 
              icon: <GraduationCap className="w-4 h-4" />,
              subLinks: [
                { id: 'grades', label: 'Semester Transcript' },
                { id: 'calculator', label: 'GPA Simulator' }
              ]
            },
            { 
              id: 'fees', 
              label: '1Link Fee Challans', 
              icon: <CreditCard className="w-4 h-4" />, 
              badge: 'Payable',
              subLinks: [
                { id: 'challans', label: 'Kuickpay Challans' },
                { id: 'receipts', label: 'Payment Ledger' }
              ]
            },
            { id: 'proforma', label: 'HEC QEC Proforma', icon: <FileCheck2 className="w-4 h-4" /> }
          ]
        },
        {
          heading: 'Identity & Records',
          items: [
            { id: 'profile', label: 'Student Smart ID & Profile', icon: <User className="w-4 h-4" /> }
          ]
        }
      ];
    } else if (currentRole === 'faculty') {
      return [
        {
          heading: 'Teaching Workspace',
          items: [
            { id: 'overview', label: 'Faculty Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
            { 
              id: 'attendance', 
              label: 'Lecture Attendance', 
              icon: <Clock className="w-4 h-4" />,
              subLinks: [
                { id: 'roster', label: 'Mark Daily Roster' },
                { id: 'register', label: 'Course Attendance Book' }
              ]
            },
            { 
              id: 'grading', 
              label: 'Assessments & Grading', 
              icon: <FileText className="w-4 h-4" />,
              subLinks: [
                { id: 'quizzes', label: 'Quizzes & Assignments' },
                { id: 'midfinals', label: 'Midterm / Final Entry' }
              ]
            },
            { id: 'materials', label: 'Courseware Uploader', icon: <BookOpen className="w-4 h-4" /> },
            { id: 'risk', label: 'At-Risk Students', icon: <ShieldCheck className="w-4 h-4" />, badge: 'Active' }
          ]
        },
        {
          heading: 'Faculty Identity',
          items: [
            { id: 'profile', label: 'Academic Profile & Office', icon: <User className="w-4 h-4" /> }
          ]
        }
      ];
    } else if (currentRole === 'chairman' || currentRole === 'hod') {
      const isChair = currentRole === 'chairman';
      return [
        {
          heading: isChair ? 'Department Administration' : 'Institute Directorate',
          items: [
            { id: 'overview', label: isChair ? 'Department Radar' : 'Institute Radar', icon: <School className="w-4 h-4" /> },
            { 
              id: 'cohorts', 
              label: 'Undergraduate Batches', 
              icon: <GraduationCap className="w-4 h-4" />,
              subLinks: [
                { id: 'batches', label: '2K21 to 2K24 Cohorts' },
                { id: 'representatives', label: 'Class Reps Directory' }
              ]
            },
            { id: 'appeals', label: 'Attendance & Medical Appeals', icon: <Clock className="w-4 h-4" />, badge: '3 Pending' },
            { id: 'accreditation', label: 'NCEAC / OBE Criteria', icon: <ShieldCheck className="w-4 h-4" /> },
            { id: 'broadcast', label: 'Department Circulars', icon: <FileText className="w-4 h-4" /> }
          ]
        },
        {
          heading: 'Executive Desk',
          items: [
            { id: 'profile', label: isChair ? 'Chairperson Secretariat' : 'Director Credentials', icon: <User className="w-4 h-4" /> }
          ]
        }
      ];
    } else if (currentRole === 'admin') {
      return [
        {
          heading: 'ITSC Operations',
          items: [
            { id: 'telemetry', label: 'Cluster Telemetry', icon: <Server className="w-4 h-4" /> },
            { id: 'results', label: 'Result Stage-Gate', icon: <Award className="w-4 h-4" />, badge: 'Locked' },
            { 
              id: 'users', 
              label: 'Unified Directory', 
              icon: <UserCheck className="w-4 h-4" />,
              subLinks: [
                { id: 'students', label: 'Student Accounts' },
                { id: 'faculty', label: 'Faculty Credentials' }
              ]
            },
            { id: 'audit', label: 'Immutable Audit Log', icon: <ShieldCheck className="w-4 h-4" /> }
          ]
        },
        {
          heading: 'Security & Access',
          items: [
            { id: 'profile', label: 'ITSC Officer Identity', icon: <User className="w-4 h-4" /> }
          ]
        }
      ];
    } else if (currentRole === 'parent') {
      return [
        {
          heading: 'Ward Academic Oversight',
          items: [
            { id: 'overview', label: 'Ward Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
            { 
              id: 'attendance', 
              label: 'Attendance (75% Rule)', 
              icon: <Clock className="w-4 h-4" />, 
              badge: '73% Risk',
              subLinks: [
                { id: 'register', label: 'Course Breakdown' },
                { id: 'leaves', label: 'Medical Justifications' }
              ]
            },
            { id: 'results', label: 'Term Grades & CGPA', icon: <GraduationCap className="w-4 h-4" /> },
            { 
              id: 'fees', 
              label: '1Link Fee Challans', 
              icon: <CreditCard className="w-4 h-4" />, 
              badge: 'Payable',
              subLinks: [
                { id: 'due', label: 'Pending Vouchers' },
                { id: 'history', label: 'Settled Ledger' }
              ]
            },
            { id: 'advisor', label: 'Advisor Consultation', icon: <UserCheck className="w-4 h-4" /> }
          ]
        },
        {
          heading: 'Guardian Profile',
          items: [
            { id: 'profile', label: 'Guardian CNIC Record', icon: <User className="w-4 h-4" /> }
          ]
        }
      ];
    }
    return [];
  };

  const sections = getNavSections();

  return (
    <aside 
      className={`hidden lg:flex flex-col bg-white border-r border-slate-200 transition-all duration-200 z-30 shrink-0 select-none ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Top Sidebar Header with Role Status & Collapse button */}
      <div className="h-14 flex items-center justify-between px-3 border-b border-slate-100 bg-slate-50/50">
        {!isCollapsed && (
          <div className="flex items-center gap-2 overflow-hidden min-w-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <div className="truncate">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-800 leading-tight">
                {currentRole === 'chairman' ? 'CHAIRMAN DESK' : `${currentRole.toUpperCase()} WORKSPACE`}
              </div>
              <div className="text-[9px] text-slate-500 font-mono">UOS Allama II Qazi</div>
            </div>
          </div>
        )}
        <button
          onClick={onToggleCollapse}
          className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors mx-auto cursor-pointer"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Main Navigation Sections */}
      <div className="flex-1 overflow-y-auto py-3 px-2 space-y-4">
        {sections.map((sec, secIdx) => (
          <div key={secIdx} className="space-y-1">
            {!isCollapsed && (
              <div className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {sec.heading}
              </div>
            )}
            <div className="space-y-0.5">
              {sec.items.map((item) => {
                const isActive = activeTab === item.id;
                const hasSubLinks = item.subLinks && item.subLinks.length > 0;

                return (
                  <div key={item.id} className="space-y-0.5">
                    <button
                      onClick={() => onTabChange(item.id)}
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer group ${
                        isActive
                          ? 'bg-[#0b2545] text-white font-semibold shadow-2xs'
                          : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/90'
                      }`}
                      title={isCollapsed ? item.label : undefined}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className={`shrink-0 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-800'}`}>
                          {item.icon}
                        </span>
                        {!isCollapsed && <span className="truncate">{item.label}</span>}
                      </div>

                      {!isCollapsed && (
                        <div className="flex items-center gap-1.5 shrink-0">
                          {item.badge && (
                            <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold font-mono ${
                              item.badge.includes('Risk')
                                ? 'bg-rose-100 text-rose-800'
                                : isActive 
                                  ? 'bg-white/20 text-white' 
                                  : 'bg-amber-100 text-amber-900'
                            }`}>
                              {item.badge}
                            </span>
                          )}
                          {hasSubLinks && (
                            <ChevronDown className={`w-3 h-3 transition-transform ${
                              isActive ? 'rotate-180 text-white/70' : 'text-slate-400 group-hover:text-slate-600'
                            }`} />
                          )}
                        </div>
                      )}
                    </button>

                    {/* Direct Sub-links for active item */}
                    {!isCollapsed && hasSubLinks && isActive && (
                      <div className="pl-6 pr-1 py-1 space-y-0.5 border-l-2 border-slate-200 ml-4 animate-in fade-in duration-150">
                        {item.subLinks!.map(sub => (
                          <button
                            key={sub.id}
                            onClick={() => onTabChange(item.id, sub.id)}
                            className="w-full text-left px-2 py-1 rounded text-[11px] text-slate-600 hover:text-blue-900 hover:bg-blue-50 transition-colors flex items-center gap-1.5 group cursor-pointer"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-blue-600 transition-colors shrink-0" />
                            <span className="truncate">{sub.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Actions: Public Portal Return & Technical Blueprint */}
      <div className="p-2 border-t border-slate-200 bg-slate-50/80 space-y-1">
        <button
          onClick={() => onSelectRole('public')}
          className={`w-full flex items-center gap-2 p-2 rounded-lg text-xs font-semibold text-slate-700 hover:text-[#0b2545] hover:bg-white border border-slate-200 transition-colors cursor-pointer ${
            isCollapsed ? 'justify-center' : 'justify-start'
          }`}
          title="Return to Public E-Portal & Admissions Gateway"
        >
          <Home className="w-4 h-4 text-slate-600 shrink-0" />
          {!isCollapsed && <span className="truncate">Public LMS Gateway</span>}
        </button>

        <button
          onClick={() => onSelectRole('architecture')}
          className={`w-full flex items-center gap-2 p-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-white border border-slate-200 transition-colors cursor-pointer ${
            isCollapsed ? 'justify-center' : 'justify-between'
          }`}
          title="Audit & Technical Architecture"
        >
          <div className="flex items-center gap-2 overflow-hidden">
            <FolderGit2 className="w-4 h-4 text-amber-700 shrink-0" />
            {!isCollapsed && <span className="truncate">System Architecture</span>}
          </div>
          {!isCollapsed && (
            <span className="text-[10px] bg-slate-200 text-slate-800 px-1.5 py-0.2 rounded font-mono font-bold shrink-0">
              UOS-20
            </span>
          )}
        </button>
      </div>
    </aside>
  );
};
