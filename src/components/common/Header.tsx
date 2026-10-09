import React, { useState } from 'react';
import { UserRole } from '../../types';
import { UniversitySeal } from './UniversitySeal';
import { ENROLLED_COURSES } from '../../data/mockAcademicData';
import { 
  Building2, 
  GraduationCap, 
  UserCheck, 
  ShieldCheck, 
  Server, 
  FileText, 
  Bell, 
  Search, 
  ChevronDown, 
  Menu, 
  X,
  BookOpen, 
  HeartHandshake, 
  School, 
  Building, 
  CheckCircle2, 
  PhoneCall,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface HeaderProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  unreadCount: number;
  onOpenNotifications: () => void;
  onOpenSearch: () => void;
  onToggleSidebar?: () => void;
  activeCourseCode?: string;
  onSelectCourse?: (code: string) => void;
  studentTab?: string;
  onSelectStudentTab?: (tab: string) => void;
  activeDepartmentName?: string;
  activeBatchName?: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onRoleChange,
  unreadCount,
  onOpenNotifications,
  onOpenSearch,
  onToggleSidebar,
  activeCourseCode,
  onSelectCourse,
  activeDepartmentName = 'Software Engineering',
  activeBatchName = '2K23 Batch'
}) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [governanceMenuOpen, setGovernanceMenuOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  // Clean Role Configurations
  const roleConfig: Record<UserRole, { title: string; shortLabel: string; tier: string; icon: React.ReactNode }> = {
    public: {
      title: 'Public Academic Portal',
      shortLabel: 'Portal Home',
      tier: 'Public Gateway',
      icon: <Building2 className="w-4 h-4 text-slate-700" />
    },
    student: {
      title: 'Student LMS Workspace',
      shortLabel: 'Student LMS',
      tier: 'Enrolled Scholar',
      icon: <GraduationCap className="w-4 h-4 text-emerald-600" />
    },
    faculty: {
      title: 'Teacher E-Portal',
      shortLabel: 'Faculty Portal',
      tier: 'Teaching Faculty',
      icon: <UserCheck className="w-4 h-4 text-blue-600" />
    },
    parent: {
      title: 'Parents & Guardians',
      shortLabel: 'Parent Portal',
      tier: 'Guardian View',
      icon: <HeartHandshake className="w-4 h-4 text-teal-600" />
    },
    vc: {
      title: 'Vice-Chancellor Secretariat',
      shortLabel: 'VC Office',
      tier: 'Executive Command',
      icon: <Building2 className="w-4 h-4 text-purple-600" />
    },
    dean: {
      title: 'Office of the Dean',
      shortLabel: 'Dean Office',
      tier: 'Faculty Board',
      icon: <School className="w-4 h-4 text-indigo-600" />
    },
    chairman: {
      title: 'Chairman Secretariat',
      shortLabel: 'Chairman Dept',
      tier: 'Teaching Dept',
      icon: <ShieldCheck className="w-4 h-4 text-amber-600" />
    },
    hod: {
      title: 'Director / HOD Office',
      shortLabel: 'HOD Institute',
      tier: 'Institute Governance',
      icon: <Building className="w-4 h-4 text-orange-600" />
    },
    admin: {
      title: 'ITSC Operations & Systems',
      shortLabel: 'ITSC Admin',
      tier: 'Central Systems',
      icon: <Server className="w-4 h-4 text-sky-600" />
    },
    architecture: {
      title: 'Modernization Architecture',
      shortLabel: 'Audit Blueprint',
      tier: 'Engineering Audit',
      icon: <FileText className="w-4 h-4 text-rose-600" />
    }
  };

  const isGovernanceRole = ['vc', 'dean', 'chairman', 'hod', 'admin'].includes(currentRole);

  const handleNavigate = (role: UserRole) => {
    onRoleChange(role);
    setMobileNavOpen(false);
    setGovernanceMenuOpen(false);
    setRoleMenuOpen(false);
  };

  const handleAdmissionsClick = () => {
    if (currentRole !== 'public') {
      onRoleChange('public');
      setTimeout(() => {
        document.getElementById('degree-programs-admissions')?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      document.getElementById('degree-programs-admissions')?.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileNavOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 no-print shadow-2xs">
      {/* 1. Dignified Institutional Top Utility Ribbon — Official Emblem Blue & Olive Theme */}
      <div className="bg-[#004b87] text-white text-[11px] px-3 sm:px-6 py-1.5 flex items-center justify-between gap-3 border-b border-[#003865]">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="font-serif-academic text-[12px] tracking-wide text-[#c8e27b] font-semibold hidden md:inline">
            اُطْلُبُوا الْعِلْمَ مِنَ الْمَهْدِ إِلَى اللَّحْدِ
          </span>
          <span className="text-white/25 hidden md:inline">·</span>
          <span className="font-semibold text-white flex items-center gap-1.5">
            <span>UNIVERSITY OF SINDH</span>
          </span>
          <span className="text-white/25 hidden sm:inline">·</span>
          <span className="text-slate-200 hidden sm:inline font-mono text-[10px]">
            ALLAMA II QAZI CAMPUS, JAMSHORO · ESTD. 1947
          </span>
        </div>

        <div className="flex items-center gap-3 text-slate-200 text-[11px] font-mono">
          <div className="hidden lg:flex items-center gap-1.5 text-[#c8e27b]">
            <CheckCircle2 className="w-3 h-3 text-[#a3c644]" />
            <span>HEC W4 Ranked · Session Fall 2026</span>
          </div>
          <span className="text-white/25 hidden lg:inline">·</span>
          <div className="flex items-center gap-1 text-slate-100 text-[11px]">
            <PhoneCall className="w-3 h-3 text-[#c8e27b]" />
            <span className="hidden sm:inline">ITSC: </span>
            <span className="text-[#c8e27b] font-semibold">022-9213181</span>
          </div>
        </div>
      </div>

      {/* 2. Master Global Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        {/* Left: Authentic Brand Mark */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Sidebar Toggle for Inner Dashboards */}
          {currentRole !== 'public' && onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors"
              aria-label="Toggle Dashboard Sidebar"
            >
              <Menu className="w-4 h-4" />
            </button>
          )}

          {/* Logo & Campus Identity */}
          <div 
            onClick={() => handleNavigate('public')}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group select-none"
            title="University of Sindh Central Portal"
          >
            <UniversitySeal size="md" />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-[#004b87] group-hover:text-[#0068b5] transition-colors leading-none font-sans">
                  UNIVERSITY OF SINDH
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#eef4e3] text-[#4c6418] border border-[#84a433]/40 font-bold hidden sm:inline">
                  CENTRAL LMS
                </span>
              </div>
              <div className="text-[11px] text-slate-600 font-medium leading-tight mt-1 flex items-center gap-1">
                <span>Allama II Qazi Campus</span>
                <span className="text-slate-300 hidden md:inline">·</span>
                <span className="text-[#0068b5] font-mono hidden md:inline">Jamshoro</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center: Global Master Navigation Tabs (Desktop & Tablet) */}
        <nav aria-label="Global Academic Navigation" className="hidden lg:flex items-center gap-1 bg-[#e8ecef] p-1 rounded-xl border border-[#d8dadb] text-xs font-semibold">
          {/* 1. Portal Home */}
          <button
            onClick={() => handleNavigate('public')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              currentRole === 'public'
                ? 'bg-[#0068b5] text-white shadow-xs font-bold'
                : 'text-slate-700 hover:text-slate-900 hover:bg-white/80'
            }`}
          >
            <Building2 className={`w-3.5 h-3.5 ${currentRole === 'public' ? 'text-[#c8e27b]' : 'text-[#0068b5]'}`} />
            <span>Home</span>
          </button>

          {/* 2. Student LMS */}
          <button
            onClick={() => handleNavigate('student')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              currentRole === 'student'
                ? 'bg-[#0068b5] text-white shadow-xs font-bold'
                : 'text-slate-700 hover:text-slate-900 hover:bg-white/80'
            }`}
          >
            <GraduationCap className={`w-3.5 h-3.5 ${currentRole === 'student' ? 'text-[#c8e27b]' : 'text-[#007a33]'}`} />
            <span>Student LMS</span>
          </button>

          {/* 3. Teacher Portal */}
          <button
            onClick={() => handleNavigate('faculty')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              currentRole === 'faculty'
                ? 'bg-[#0068b5] text-white shadow-xs font-bold'
                : 'text-slate-700 hover:text-slate-900 hover:bg-white/80'
            }`}
          >
            <UserCheck className={`w-3.5 h-3.5 ${currentRole === 'faculty' ? 'text-[#c8e27b]' : 'text-[#0068b5]'}`} />
            <span>Faculty</span>
          </button>

          {/* 4. Admissions 2026 */}
          <button
            onClick={handleAdmissionsClick}
            className="px-3 py-1.5 rounded-lg text-slate-700 hover:text-[#004b87] hover:bg-white/80 transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap font-medium"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-[#007a33]" />
            <span>Admissions</span>
            <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-[#eef4e3] text-[#4c6418] border border-[#84a433]/40 font-bold">2026</span>
          </button>

          {/* 5. Parent Portal */}
          <button
            onClick={() => handleNavigate('parent')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              currentRole === 'parent'
                ? 'bg-[#0068b5] text-white shadow-xs font-bold'
                : 'text-slate-700 hover:text-slate-900 hover:bg-white/80'
            }`}
          >
            <HeartHandshake className={`w-3.5 h-3.5 ${currentRole === 'parent' ? 'text-[#c8e27b]' : 'text-[#007a33]'}`} />
            <span>Parents</span>
          </button>

          {/* 6. Governance Dropdown (VC, Dean, Chairman, HOD, Admin) */}
          <div className="relative">
            <button
              onClick={() => setGovernanceMenuOpen(!governanceMenuOpen)}
              onBlur={() => setTimeout(() => setGovernanceMenuOpen(false), 200)}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                isGovernanceRole
                  ? 'bg-[#0068b5] text-white shadow-xs font-bold'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-white/80'
              }`}
            >
              <School className={`w-3.5 h-3.5 ${isGovernanceRole ? 'text-[#c8e27b]' : 'text-[#9e6338]'}`} />
              <span>Governance</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${governanceMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {governanceMenuOpen && (
              <div className="absolute left-0 mt-1 w-64 bg-white border border-slate-200 rounded-xl shadow-xl p-1.5 z-50 animate-in fade-in duration-100">
                <div className="px-2.5 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1 font-mono">
                  Administrative Tier
                </div>
                {[
                  { role: 'vc' as UserRole, label: 'Vice-Chancellor Secretariat', icon: <Building2 className="w-3.5 h-3.5 text-purple-600" /> },
                  { role: 'dean' as UserRole, label: 'Office of the Dean (14 Faculties)', icon: <School className="w-3.5 h-3.5 text-indigo-600" /> },
                  { role: 'chairman' as UserRole, label: 'Chairman / Department Secretariat', icon: <ShieldCheck className="w-3.5 h-3.5 text-amber-600" /> },
                  { role: 'hod' as UserRole, label: 'Director / HOD (Institutes)', icon: <Building className="w-3.5 h-3.5 text-orange-600" /> },
                  { role: 'admin' as UserRole, label: 'ITSC Operations & Cluster', icon: <Server className="w-3.5 h-3.5 text-sky-600" /> },
                  { role: 'architecture' as UserRole, label: 'Modernization Architecture', icon: <FileText className="w-3.5 h-3.5 text-rose-600" /> }
                ].map(item => (
                  <button
                    key={item.role}
                    onClick={() => handleNavigate(item.role)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors cursor-pointer ${
                      currentRole === item.role ? 'bg-blue-50 text-blue-900 font-bold' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {item.icon}
                      <span className="truncate">{item.label}</span>
                    </div>
                    {currentRole === item.role && <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Right: Quick Utilities (Search, Alerts, Persona Selector & Mobile Hamburger) */}
        <div className="flex items-center gap-2">
          {/* Quick Search */}
          <button
            onClick={onOpenSearch}
            className="px-2.5 py-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors flex items-center gap-1.5 text-xs font-medium cursor-pointer"
            title="Search LMS catalog & circulars (⌘K)"
          >
            <Search className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline text-slate-700">Search</span>
            <kbd className="hidden sm:inline px-1 py-0.2 text-[9px] bg-slate-100 text-slate-500 border border-slate-200 rounded font-mono">⌘K</kbd>
          </button>

          {/* Notifications Bell */}
          <button
            onClick={onOpenNotifications}
            className="p-2 relative text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors cursor-pointer"
            title="Notifications & circulars"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-600 text-white rounded-full text-[9px] font-mono font-bold flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Current Role Switcher Pill (Desktop & Tablet) */}
          <div className="relative">
            <button
              onClick={() => setRoleMenuOpen(!roleMenuOpen)}
              onBlur={() => setTimeout(() => setRoleMenuOpen(false), 200)}
              className="flex items-center gap-2 pl-2.5 pr-2 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 text-xs font-semibold cursor-pointer transition-colors shadow-2xs"
              aria-label="Switch User Persona View"
            >
              <div className="shrink-0">
                {roleConfig[currentRole].icon}
              </div>
              <div className="hidden sm:block text-left max-w-[120px]">
                <div className="text-slate-900 text-xs leading-none font-bold truncate">
                  {roleConfig[currentRole].shortLabel}
                </div>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${roleMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {roleMenuOpen && (
              <div className="absolute right-0 mt-1 w-72 bg-white border border-slate-200 rounded-xl shadow-xl p-1.5 z-50 animate-in fade-in duration-100">
                <div className="px-2.5 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1 flex items-center justify-between font-mono">
                  <span>Switch Portal View</span>
                  <span className="text-[9px] text-blue-900 font-bold">Role Selector</span>
                </div>
                {(['public', 'student', 'faculty', 'parent', 'vc', 'dean', 'chairman', 'hod', 'admin'] as UserRole[]).map((role) => (
                  <button
                    key={role}
                    onClick={() => handleNavigate(role)}
                    className={`w-full text-left px-2.5 py-2 rounded-lg text-xs flex items-center justify-between transition-colors cursor-pointer ${
                      currentRole === role ? 'bg-blue-50 text-blue-900 font-bold' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {roleConfig[role].icon}
                      <div>
                        <div className="leading-tight font-medium">{roleConfig[role].title}</div>
                        <div className="text-[10px] text-slate-400 font-normal">{roleConfig[role].tier}</div>
                      </div>
                    </div>
                    {currentRole === role && <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* 3. Mobile Responsive Navigation Drawer */}
      {mobileNavOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-4 shadow-lg animate-in slide-in-from-top-2 duration-150">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
            Main Navigation Tabs:
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
            <button
              onClick={() => handleNavigate('public')}
              className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
                currentRole === 'public'
                  ? 'bg-[#0a2342] text-white border-[#0a2342] font-bold'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Building2 className="w-4 h-4 text-amber-300" />
              <span>Portal Home</span>
            </button>

            <button
              onClick={() => handleNavigate('student')}
              className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
                currentRole === 'student'
                  ? 'bg-[#0a2342] text-white border-[#0a2342] font-bold'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-emerald-600" />
              <span>Student LMS</span>
            </button>

            <button
              onClick={() => handleNavigate('faculty')}
              className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
                currentRole === 'faculty'
                  ? 'bg-[#0a2342] text-white border-[#0a2342] font-bold'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <UserCheck className="w-4 h-4 text-blue-600" />
              <span>Faculty Portal</span>
            </button>

            <button
              onClick={handleAdmissionsClick}
              className="p-2.5 rounded-xl border bg-amber-50 text-amber-900 border-amber-200 font-bold flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-amber-700" />
              <span>Admissions 2026</span>
            </button>

            <button
              onClick={() => handleNavigate('parent')}
              className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all col-span-2 ${
                currentRole === 'parent'
                  ? 'bg-[#0a2342] text-white border-[#0a2342] font-bold'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <HeartHandshake className="w-4 h-4 text-teal-600" />
              <span>Parents &amp; Guardians Workspace</span>
            </button>
          </div>

          {/* Governance Section on Mobile */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
              University Governance &amp; Administration:
            </div>
            <div className="grid grid-cols-2 gap-1.5 text-[11px]">
              <button
                onClick={() => handleNavigate('vc')}
                className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 text-left hover:bg-slate-100"
              >
                VC Secretariat
              </button>
              <button
                onClick={() => handleNavigate('dean')}
                className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 text-left hover:bg-slate-100"
              >
                Dean Office (BoF)
              </button>
              <button
                onClick={() => handleNavigate('chairman')}
                className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 text-left hover:bg-slate-100"
              >
                Chairman Office
              </button>
              <button
                onClick={() => handleNavigate('hod')}
                className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 text-left hover:bg-slate-100"
              >
                Director / HOD
              </button>
              <button
                onClick={() => handleNavigate('admin')}
                className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 text-left hover:bg-slate-100 col-span-2 flex items-center justify-between"
              >
                <span>ITSC Operations Admin</span>
                <span className="font-mono text-[9px] text-slate-400">Jamshoro Cluster</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. LUMS Sakai Benchmark: Persistent Course Sites Quick-Jump Ribbon (When inside Student) */}
      {currentRole === 'student' && (
        <div className="bg-[#004b87] text-white text-xs border-t border-[#0068b5] select-none no-print overflow-x-auto shadow-inner">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-9 gap-3">
            <div className="flex items-center gap-1.5 overflow-x-auto py-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#c8e27b] font-mono shrink-0 mr-1 flex items-center gap-1">
                <BookOpen className="w-3 h-3 text-[#c8e27b]" />
                <span>My Courses:</span>
              </span>

              {ENROLLED_COURSES.map((course) => {
                const isSelected = activeCourseCode === course.code;
                return (
                  <button
                    key={course.code}
                    onClick={() => {
                      if (onSelectCourse) onSelectCourse(course.code);
                    }}
                    className={`px-2.5 py-1 rounded text-xs font-medium font-mono shrink-0 flex items-center gap-1.5 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white text-[#004b87] font-bold shadow-xs ring-1 ring-white'
                        : 'text-slate-200 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span>{course.code}</span>
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#84a433]" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="hidden md:flex items-center gap-3 shrink-0 text-[11px] text-slate-200 font-mono">
              <span className="text-white">Department: {activeDepartmentName} ({activeBatchName})</span>
              <span className="text-white/30" aria-hidden="true">|</span>
              <span className="text-[#c8e27b] font-semibold">75% HEC Verified</span>
            </div>
          </div>
        </div>
      )}

      {/* Faculty Persistent Course Sites Quick-Jump Ribbon (When inside Faculty) */}
      {currentRole === 'faculty' && (
        <div className="bg-[#004b87] text-white text-xs border-t border-[#0068b5] select-none no-print overflow-x-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-9 gap-3">
            <div className="flex items-center gap-1.5 overflow-x-auto py-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#c8e27b] font-mono shrink-0 mr-1 flex items-center gap-1">
                <UserCheck className="w-3 h-3 text-[#c8e27b]" />
                <span>Teaching Roster:</span>
              </span>

              {['SWE-401 (Architecture)', 'SWE-405 (Cloud Systems)', 'SWE-403 (Software QA)'].map((crs, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded text-xs font-medium font-mono shrink-0 bg-white/10 text-slate-200 border border-white/10"
                >
                  {crs}
                </span>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3 shrink-0 text-[11px] text-slate-300 font-mono">
              <span>Teacher E-Portal Sync: <strong className="text-emerald-300">Live</strong></span>
              <span className="text-slate-600" aria-hidden="true">|</span>
              <span>Grading Lock Date: Oct 30, 2026</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
