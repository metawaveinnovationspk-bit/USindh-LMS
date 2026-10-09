import React, { useState } from 'react';
import { UserRole } from '../../types';
import { UniversitySeal } from '../common/UniversitySeal';
import { 
  UNIVERSITY_FACULTIES 
} from '../../data/mockAcademicData';
import { 
  ACADEMIC_PROGRAMS, 
  AcademicProgram, 
  ADMISSION_STEPS, 
  ADMISSION_QUOTAS, 
  ADMISSION_SCHEDULE 
} from '../../data/programsAndAdmissionsData';
import { 
  GraduationCap, 
  Users, 
  BookOpen, 
  Award, 
  Calendar, 
  FileCheck2, 
  CreditCard, 
  HelpCircle, 
  ExternalLink, 
  ArrowRight, 
  Building2, 
  ShieldCheck, 
  CheckCircle2, 
  Search,
  BellRing,
  School,
  Building,
  Clock,
  ArrowUpRight,
  FileText,
  HeartHandshake,
  Compass,
  CheckSquare,
  Sparkles,
  ChevronRight,
  UserCheck,
  TrendingUp,
  Filter,
  PhoneCall,
  Mail,
  MapPin,
  Calculator,
  X,
  BadgeCheck,
  Layers,
  Briefcase
} from 'lucide-react';

interface PublicPortalProps {
  onSelectRole: (role: UserRole) => void;
  onOpenAudit: () => void;
}

export const PublicPortal: React.FC<PublicPortalProps> = ({
  onSelectRole,
  onOpenAudit
}) => {
  // Degree Programs & Admissions Section State
  const [programsActiveTab, setProgramsActiveTab] = useState<'undergraduate' | 'postgraduate' | 'admissions'>('undergraduate');
  const [selectedFacultyFilter, setSelectedFacultyFilter] = useState<string>('All');
  const [programSearchQuery, setProgramSearchQuery] = useState<string>('');
  const [selectedProgramDetail, setSelectedProgramDetail] = useState<AcademicProgram | null>(null);

  // Admissions Merit Calculator State (Formula: 10% SSC + 30% HSC + 60% SUTC Entry Test)
  const [calcSscPercent, setCalcSscPercent] = useState<number>(75);
  const [calcHscPercent, setCalcHscPercent] = useState<number>(72);
  const [calcTestScore, setCalcTestScore] = useState<number>(68);
  const [showAppliedToast, setShowAppliedToast] = useState<string | null>(null);

  // Circulars Category Filter
  const [circularCategory, setCircularCategory] = useState<'All' | 'Examinations' | 'Admissions' | 'Faculty' | 'Syndicate'>('All');

  // Image assets
  const campusHeroImg = '/src/assets/images/hero_sindh_university_campus_1791409760731.jpg';
  const labShowcaseImg = '/src/assets/images/software_engineering_lab_showcase_1791409773868.jpg';

  // Derived filtered programs
  const undergraduatePrograms = ACADEMIC_PROGRAMS.filter(p => p.level === 'undergraduate');
  const postgraduatePrograms = ACADEMIC_PROGRAMS.filter(p => p.level === 'postgraduate');

  const currentLevelPrograms = programsActiveTab === 'postgraduate' ? postgraduatePrograms : undergraduatePrograms;
  const filteredPrograms = currentLevelPrograms.filter(prog => {
    const matchesFaculty = selectedFacultyFilter === 'All' || prog.faculty === selectedFacultyFilter;
    const matchesQuery = !programSearchQuery.trim() || 
      prog.title.toLowerCase().includes(programSearchQuery.toLowerCase()) ||
      prog.department.toLowerCase().includes(programSearchQuery.toLowerCase()) ||
      prog.specializations.some(s => s.toLowerCase().includes(programSearchQuery.toLowerCase()));
    return matchesFaculty && matchesQuery;
  });

  // Calculate live aggregate merit score
  const calculatedAggregate = ((calcSscPercent * 0.10) + (calcHscPercent * 0.30) + (calcTestScore * 0.60)).toFixed(2);

  // 8 Core Academic & Student Hub Cards
  const coreAcademicHubs = [
    {
      id: 'student-portal',
      title: 'Student LMS Portal',
      subtitle: 'Daily Academic Workspace',
      desc: 'Active course materials, weekly lecture plans, lab submissions, and real-time 75% attendance rule compliance.',
      icon: <GraduationCap className="w-5 h-5 text-emerald-600" />,
      badge: '42,850+ Enrolled',
      badgeColor: 'text-emerald-800 bg-emerald-50 border-emerald-200',
      actionLabel: 'Open Student LMS',
      role: 'student' as UserRole,
      highlights: ['Enrolled Courses', '75% Attendance Radar', 'Assignment Uploads', 'Results & CGPA']
    },
    {
      id: 'admissions-portal',
      title: 'Admissions 2026–27',
      subtitle: 'Directorate of Admissions',
      desc: 'Online application entry, merit calculation, eligibility criteria, and 1Link voucher generation for BS, MS & PhD.',
      icon: <CheckCircle2 className="w-5 h-5 text-blue-600" />,
      badge: 'Admissions Open',
      badgeColor: 'text-blue-800 bg-blue-50 border-blue-200',
      actionLabel: 'Admissions Portal',
      role: 'public' as UserRole,
      highlights: ['Online Registration', 'Merit Lists', '1Link Fee Voucher', 'Prospectus 2026']
    },
    {
      id: 'courses-catalog',
      title: 'Courses & Syllabi',
      subtitle: 'HEC OBE Curriculum',
      desc: 'Curriculum outlines, credit hours breakdown, lecture schedules, and Outcome-Based Education (OBE) course matrices.',
      icon: <BookOpen className="w-5 h-5 text-indigo-600" />,
      badge: '68 Depts Syllabus',
      badgeColor: 'text-indigo-800 bg-indigo-50 border-indigo-200',
      actionLabel: 'View Course Catalog',
      role: 'student' as UserRole,
      highlights: ['Fall 2026 Course Packs', 'Credit Breakdown', 'CLO / PLO Mapping', 'Subject Selection']
    },
    {
      id: 'announcements-gazette',
      title: 'Announcements & Gazettes',
      subtitle: 'Registrar & Exam Office',
      desc: 'Official statutory notices, examination date sheets, public holidays, Syndicate decrees, and semester schedules.',
      icon: <BellRing className="w-5 h-5 text-amber-600" />,
      badge: 'Official Gazette',
      badgeColor: 'text-amber-800 bg-amber-50 border-amber-200',
      actionLabel: 'Read Circulars',
      role: 'public' as UserRole,
      highlights: ['Fall 2026 Date Sheet', 'Admit Card Deadlines', 'Syndicate Notices', 'Scholarship Alerts']
    },
    {
      id: 'parents-portal',
      title: 'Parents & Guardians',
      subtitle: 'Ward Oversight & Support',
      desc: 'Direct parental view to verify attendance, academic GPA progress, semester dues, and consult department advisors.',
      icon: <HeartHandshake className="w-5 h-5 text-teal-600" />,
      badge: 'Verified Kinship',
      badgeColor: 'text-teal-800 bg-teal-50 border-teal-200',
      actionLabel: 'Open Parent Portal',
      role: 'parent' as UserRole,
      highlights: ['Live Attendance Alert', 'Term CGPA Reports', '1Link Fee Clearance', 'Direct Advisor Contact']
    },
    {
      id: 'degree-programs',
      title: 'Degree Programs & Faculties',
      subtitle: '14 Faculties · 68 Departments',
      desc: 'Accredited undergraduate (BS/BBA 4-Year), postgraduate (MS/MPhil 2-Year), and doctoral (PhD) academic programs.',
      icon: <School className="w-5 h-5 text-purple-600" />,
      badge: '14 Faculties',
      badgeColor: 'text-purple-800 bg-purple-50 border-purple-200',
      actionLabel: 'Explore Programs',
      role: 'public' as UserRole,
      highlights: ['BS / BBA 4-Year', 'MS / MPhil Programs', 'PhD Research Tracks', 'Faculty Directory']
    },
    {
      id: 'examinations-controller',
      title: 'Examinations & QR Slips',
      subtitle: 'Controller of Examinations',
      desc: 'Cryptographically verified digital hall passes with QR codes, examination seating allotments, and official transcripts.',
      icon: <FileCheck2 className="w-5 h-5 text-rose-600" />,
      badge: 'QR Hall Slips',
      badgeColor: 'text-rose-800 bg-rose-50 border-rose-200',
      actionLabel: 'Exam Slip & Results',
      role: 'student' as UserRole,
      highlights: ['QR Admit Pass', 'Hall Seating Plan', 'Exam Duty Roster', 'Official Transcripts']
    },
    {
      id: 'itsc-support',
      title: 'ITSC & Student Support',
      subtitle: 'Central IT Helpdesk',
      desc: 'Prompt assistance for student credentials, 1Link banking challans, institutional email (@usindh), and LMS guidance.',
      icon: <HelpCircle className="w-5 h-5 text-sky-600" />,
      badge: 'UAN: 022-9213181',
      badgeColor: 'text-sky-800 bg-sky-50 border-sky-200',
      actionLabel: 'Get ITSC Help',
      role: 'admin' as UserRole,
      highlights: ['Password Reset', '1Link Fee Support', 'University Email', 'Helpdesk Tickets']
    }
  ];

  // Official Circulars
  const officialCirculars = [
    {
      refNo: 'UOS/EXM/2026/FINAL-104',
      title: 'Issuance of Digital Examination Admit Slips & Hall Seating for Fall 2026',
      office: 'Office of the Controller of Examinations',
      date: 'Oct 06, 2026',
      category: 'Examinations',
      urgency: 'Action Required',
      excerpt: 'Undergraduate students of 2K23, 2K22, and 2K21 batches must clear Semester dues and maintain 75% attendance to unlock verified QR hall passes.'
    },
    {
      refNo: 'UOS/REG/2026/ADM-2627',
      title: 'Undergraduate & Postgraduate Admissions Session 2026–2027 Portal Opened',
      office: 'Directorate of Admissions',
      date: 'Oct 04, 2026',
      category: 'Admissions',
      urgency: 'Official Circular',
      excerpt: 'Online registration for BS, MS, and PhD programs across Faculty of Engineering & Technology, Natural Sciences, and Arts is now live.'
    },
    {
      refNo: 'UOS/SWE/2026/OBE-09',
      title: 'Department of Software Engineering Annual Tech Showcase & OBE Review',
      office: 'Department Chairperson Prof. Dr. Arifa Bhutto',
      date: 'Sep 29, 2026',
      category: 'Faculty',
      urgency: 'Departmental',
      excerpt: 'All FYDP-I supervisor endorsements and midterm OBE rubrics must be finalized by Friday. Project showcase exhibition scheduled at Jamshoro Campus.'
    },
    {
      refNo: 'UOS/SYN/2026/RES-44',
      title: 'Syndicate Resolution on Unified Central LMS Modernization Initiative',
      office: 'Registrar & Vice Chancellor Secretariat',
      date: 'Sep 20, 2026',
      category: 'Syndicate',
      urgency: 'Policy Decree',
      excerpt: 'Statutory mandate adopting centralized digital learning management across all 14 faculties with 75% attendance enforcement.'
    }
  ];

  const filteredCirculars = officialCirculars.filter(c => 
    circularCategory === 'All' || c.category === circularCategory
  );

  const sampleBatches = [
    { batch: '2K21 Final Year', students: 185, avgCgpa: 3.42, attendance: 91.2, focus: 'FYP & Capstone Defense Phase', semester: 'Semester 7–8' },
    { batch: '2K22 Third Year', students: 210, avgCgpa: 3.28, attendance: 87.5, focus: 'Core Systems, Networks & Internships', semester: 'Semester 5–6' },
    { batch: '2K23 Sophomore-Junior', students: 235, avgCgpa: 3.35, attendance: 88.5, focus: 'Advanced Architecture, SQA & Mobile Labs', semester: 'Semester 3–4' },
    { batch: '2K24 Freshman', students: 210, avgCgpa: 3.15, attendance: 86.8, focus: 'Foundational Programming, Ethics & Calculus', semester: 'Semester 1–2' }
  ];

  return (
    <div className="space-y-12 sm:space-y-16 pb-20">
      {/* =========================================================
          1. HERO SECTION: ACADEMIC INSTITUTION & CENTRAL LMS
             Dignified University of Sindh Allama II Qazi Campus layout
             Maintained by FET, UOS · Featuring Statue of Wisdom Landmark
         ========================================================= */}
      <section className="relative bg-gradient-to-b from-[#031326] via-[#071d36] to-[#0a274c] text-white pt-6 pb-14 sm:pb-16 px-4 sm:px-6 lg:px-8 border-b border-[#081e38] overflow-hidden">
        {/* Subtle Ambient Academic Grid Background */}
        <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.035] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8 relative z-10">
          {/* Institutional Top Motto Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3 text-xs">
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <span className="font-serif-academic text-amber-300 font-bold tracking-wider text-sm">
                اُطْلُبُوا الْعِلْمَ مِنَ الْمَهْدِ إِلَى اللَّحْدِ
              </span>
              <span className="text-white/20">|</span>
              <span className="font-mono text-amber-400 font-semibold tracking-wider uppercase text-[11px]">
                Founded 1947 · Allama II Qazi Campus, Jamshoro
              </span>
              <span className="text-white/20 hidden sm:inline">|</span>
              <span className="text-slate-300 hidden sm:inline font-mono text-[11px]">
                HEC W4 Highest Category
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-mono font-semibold flex items-center gap-1.5 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Academic Session Fall 2026 Active</span>
              </span>
            </div>
          </div>

          {/* Hero Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left 7 Columns: University Overview & Key Action Gateways */}
            <div className="lg:col-span-7 space-y-5">
              {/* Brand Header */}
              <div className="flex items-start gap-4 sm:gap-5">
                <div className="shrink-0 p-1 bg-white/10 rounded-2xl border border-amber-400/30 shadow-md">
                  <UniversitySeal size="xl" />
                </div>
                <div className="space-y-1">
                  <div className="text-[11px] uppercase font-mono font-bold tracking-widest text-amber-400">
                    GOVERNMENT OF SINDH · ESTABLISHED 1947
                  </div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-none font-sans">
                    University of Sindh
                  </h1>
                  <h2 className="text-lg sm:text-xl font-bold text-amber-300 tracking-normal mt-1">
                    Allama II Qazi Campus
                  </h2>
                  <p className="text-xs sm:text-sm font-semibold text-slate-200 mt-0.5">
                    Central Learning Management System (LMS) &amp; Academic E-Portal
                  </p>
                  
                  {/* FET, UOS Maintenance Pill */}
                  <div className="pt-1">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-950/80 border border-blue-400/30 text-[10px] text-blue-200 font-mono shadow-xs">
                      <ShieldCheck className="w-3 h-3 text-amber-400" />
                      <span>Maintained by FET, UOS (Faculty of Engineering &amp; Technology) · Central ITSC</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Dignified Narrative */}
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-2xl font-normal">
                Serving over <strong>42,850 enrolled scholars</strong> and <strong>1,240 faculty members</strong> across <strong>14 Faculties and 68 Teaching Departments</strong>. This central academic platform coordinates digital course materials, biometric attendance compliance (75% rule), encrypted examination QR admit slips, and student life services.
              </p>

              {/* Leadership & Institutional Attributes */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 py-2.5 border-y border-white/10 text-xs">
                <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-slate-400 block text-[10px] uppercase font-mono">Chancellor</span>
                  <strong className="text-white text-xs truncate block">Kamran Khan Tessori</strong>
                  <span className="text-[10px] text-slate-400">Governor of Sindh</span>
                </div>
                <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-slate-400 block text-[10px] uppercase font-mono">Vice-Chancellor</span>
                  <strong className="text-amber-300 text-xs truncate block">Prof. Dr. M. Siddique Kalhoro</strong>
                  <span className="text-[10px] text-slate-400">Senior Academician</span>
                </div>
                <div className="p-2 rounded-xl bg-white/5 border border-white/10 col-span-2 sm:col-span-1">
                  <span className="text-slate-400 block text-[10px] uppercase font-mono">HEC Category</span>
                  <strong className="text-emerald-300 text-xs font-mono block">Highest W4 Category</strong>
                  <span className="text-[10px] text-slate-400">NCEAC W4 Accredited</span>
                </div>
              </div>

              {/* The 3 Core Required Action Buttons (LMS Login, Student Login, & Admissions) */}
              <div className="pt-2 space-y-3">
                <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400 font-mono">
                  Primary Academic Gateways:
                </div>
                
                <div className="flex flex-wrap items-center gap-3">
                  {/* 1. Student Login (High-Contrast Primary CTA) */}
                  <button
                    onClick={() => onSelectRole('student')}
                    className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold text-xs sm:text-sm transition-all shadow-md hover:shadow-lg flex items-center gap-2.5 cursor-pointer ring-2 ring-amber-300/40"
                  >
                    <GraduationCap className="w-5 h-5 text-slate-950 shrink-0" />
                    <div className="text-left">
                      <div className="leading-tight">Student Login</div>
                      <div className="text-[9px] font-mono text-slate-800 font-semibold opacity-90">Daily LMS Workspace</div>
                    </div>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>

                  {/* 2. LMS Login (Central Staff / Faculty Gateway) */}
                  <button
                    onClick={() => onSelectRole('faculty')}
                    className="px-5 py-3 rounded-xl bg-white hover:bg-slate-100 text-[#071d36] font-bold text-xs sm:text-sm transition-all shadow-md flex items-center gap-2.5 cursor-pointer border border-slate-200"
                  >
                    <Building2 className="w-5 h-5 text-blue-900 shrink-0" />
                    <div className="text-left">
                      <div className="leading-tight">LMS Login</div>
                      <div className="text-[9px] font-mono text-slate-600 font-semibold">Faculty &amp; Staff E-Portal</div>
                    </div>
                  </button>

                  {/* 3. Admissions Portal */}
                  <button
                    onClick={() => {
                      setProgramsActiveTab('admissions');
                      document.getElementById('degree-programs-admissions')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-5 py-3 rounded-xl bg-gradient-to-r from-blue-900 to-[#0e3b6e] hover:from-blue-800 hover:to-blue-900 text-white font-bold text-xs sm:text-sm transition-all shadow-md border border-blue-400/40 flex items-center gap-2.5 cursor-pointer"
                  >
                    <CheckCircle2 className="w-5 h-5 text-amber-300 shrink-0" />
                    <div className="text-left">
                      <div className="leading-tight">Admissions 2026–27</div>
                      <div className="text-[9px] font-mono text-blue-200 font-semibold">SUTC Pre-Entry Test</div>
                    </div>
                  </button>

                  {/* Secondary Quick Access: Parents Portal */}
                  <button
                    onClick={() => onSelectRole('parent')}
                    className="px-3.5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs transition-all border border-white/20 backdrop-blur-xs flex items-center gap-2 cursor-pointer"
                    title="Guardian access for student attendance and GPA verification"
                  >
                    <HeartHandshake className="w-4 h-4 text-teal-300" />
                    <span>Parent Portal</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Landmark Statue of Wisdom Showcase */}
            <div className="lg:col-span-5 space-y-3">
              <div className="relative rounded-3xl overflow-hidden border-2 border-amber-400/30 shadow-2xl group bg-[#041427]">
                <img
                  src="/src/assets/images/usindh_statue_hero_1791544134127.jpg"
                  alt="University of Sindh iconic Statue of Wisdom in front of Allama I.I. Kazi Library"
                  className="w-full h-72 sm:h-80 object-cover group-hover:scale-103 transition-transform duration-700"
                />
                
                {/* Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#031326] via-black/30 to-transparent pointer-events-none" />

                {/* Top Corner Plaque */}
                <div className="absolute top-3 left-3 bg-[#071d36]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-amber-400/30 text-white flex items-center gap-2 shadow-md">
                  <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <span className="text-[11px] font-mono font-bold text-amber-300 uppercase tracking-wider">
                    Statue of Wisdom
                  </span>
                </div>

                {/* Overlaid Active Gazette Notice */}
                <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-2xl bg-[#071d36]/95 backdrop-blur-md border border-white/20 text-white space-y-1.5 shadow-xl">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                      <BellRing className="w-3.5 h-3.5 text-amber-400" />
                      <span>Gazette Notification · Fall 2026</span>
                    </span>
                    <span className="font-mono text-slate-300 text-[10px]">Reference: UOS/EXM-104</span>
                  </div>
                  
                  <h3 className="text-xs sm:text-sm font-bold text-white leading-snug">
                    Fall 2026 Examination Schedule &amp; QR Hall Passes Active
                  </h3>
                  
                  <div className="flex items-center justify-between text-[11px] text-slate-300 pt-1.5 border-t border-white/10">
                    <span className="text-[10px] text-slate-300 font-mono">Allama II Qazi Central Campus</span>
                    <button
                      onClick={() => onSelectRole('student')}
                      className="text-amber-300 hover:text-white font-bold flex items-center gap-1 cursor-pointer text-xs"
                    >
                      <span>Access Student Slip</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

              {/* 3 Quick Metric Counters */}
              <div className="grid grid-cols-3 gap-2.5 text-center">
                <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/30 transition-colors">
                  <div className="font-mono text-base sm:text-lg font-black text-amber-300">42,850+</div>
                  <div className="text-[10px] text-slate-300 font-medium">Scholars Enrolled</div>
                </div>
                <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/30 transition-colors">
                  <div className="font-mono text-base sm:text-lg font-black text-amber-300">1,240+</div>
                  <div className="text-[10px] text-slate-300 font-medium">Teaching Faculty</div>
                </div>
                <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/30 transition-colors">
                  <div className="font-mono text-base sm:text-lg font-black text-amber-300">68</div>
                  <div className="text-[10px] text-slate-300 font-medium">Departments</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          2. CORE ACADEMIC HUBS (8 ESSENTIAL TOPICS)
             Clean, responsive 8-card grid: Students, Admissions,
             Courses, Announcements, Parents, Programs, Exams, Support
         ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-200 pb-3">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-blue-900 font-mono flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-blue-900" />
              <span>Core Academic Services</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">
              Main Academic &amp; Student Portals
            </h2>
          </div>
          <div className="text-xs text-slate-500 font-mono">
            8 Key University Hubs · Fall 2026
          </div>
        </div>

        {/* 8 Clear, Clean Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {coreAcademicHubs.map((card) => (
            <div
              key={card.id}
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 group-hover:bg-blue-50 transition-colors">
                    {card.icon}
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border font-mono ${card.badgeColor}`}>
                    {card.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-950 transition-colors leading-snug">
                    {card.title}
                  </h3>
                  <div className="text-[11px] text-slate-400 font-medium mt-0.5">
                    {card.subtitle}
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {card.desc}
                </p>

                {/* Clean Key Highlights */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {card.highlights.slice(0, 2).map((hl, hIdx) => (
                    <span key={hIdx} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 border border-slate-100">
                      {hl}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 mt-2 border-t border-slate-100">
                <button
                  onClick={() => {
                    if (card.id === 'admissions-portal') {
                      setProgramsActiveTab('admissions');
                      document.getElementById('degree-programs-admissions')?.scrollIntoView({ behavior: 'smooth' });
                    } else if (card.id === 'degree-programs') {
                      setProgramsActiveTab('undergraduate');
                      document.getElementById('degree-programs-admissions')?.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      onSelectRole(card.role);
                    }
                  }}
                  className="w-full py-2 rounded-lg bg-slate-50 hover:bg-[#0a2342] text-slate-800 hover:text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-slate-200 hover:border-[#0a2342]"
                >
                  <span>{card.actionLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================
          3. UNDERGRADUATE & POSTGRADUATE PROGRAMS & ADMISSIONS
             Comprehensive accredited programs catalog with SUTC
             pre-entry test admissions guide & live merit calculator
         ========================================================= */}
      <section id="degree-programs-admissions" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-200 pb-3">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-blue-900 font-mono flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-blue-900" />
              <span>Academic Catalog &amp; Admissions Session 2026–27</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">
              Undergraduate &amp; Postgraduate Degree Programs
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Accredited 4-year BS and professional degrees, MS / M.Phil, and PhD research tracks across the University of Sindh, Jamshoro.
            </p>
          </div>

          <div className="text-xs text-blue-900 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200 shrink-0 font-medium flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Admissions Open · SUTC Pre-Entry Test</span>
          </div>
        </div>

        {/* Admissions Announcement & Highlights Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-[#0a2342] via-[#0d2f57] to-[#123e6d] text-white p-5 sm:p-6 shadow-sm border border-blue-900 relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div className="space-y-2 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider font-mono px-2 py-0.5 rounded bg-amber-400 text-slate-950">
                  Directorate of Admissions
                </span>
                <span className="text-[11px] text-blue-200 font-mono">
                  Academic Session 2026–2027 · SUTC Testing Center
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                Admissions Underway for All Undergraduate &amp; Postgraduate Programs
              </h3>

              <p className="text-xs text-slate-200 leading-relaxed">
                Online registration is open for 68 teaching departments. Pre-Entry Test will be conducted simultaneously at the <strong className="text-white">Main Campus Jamshoro</strong> and <strong className="text-white">5 Divisional Centers</strong> (Hyderabad, Sukkur, Mirpurkhas, Larkana, Badin).
              </p>

              {/* Formula & Policy Snapshot */}
              <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] font-mono text-blue-100">
                <div className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-lg border border-white/10">
                  <Calculator className="w-3.5 h-3.5 text-amber-300" />
                  <span>Merit Formula: 60% SUTC Test + 30% HSC + 10% SSC</span>
                </div>
                <div className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-lg border border-white/10">
                  <CreditCard className="w-3.5 h-3.5 text-amber-300" />
                  <span>1Link Online Fee Challan Verification</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
              <button
                onClick={() => setProgramsActiveTab('admissions')}
                className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <CheckCircle2 className="w-4 h-4 text-slate-950" />
                <span>Admissions Guide &amp; Calculator</span>
              </button>

              <button
                onClick={() => {
                  setShowAppliedToast('Prospectus 2026–27 syllabus outline downloaded successfully.');
                  setTimeout(() => setShowAppliedToast(null), 4000);
                }}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors border border-white/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-amber-300" />
                <span>Download Prospectus 2026</span>
              </button>
            </div>
          </div>
        </div>

        {/* Primary Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-200">
          <button
            onClick={() => setProgramsActiveTab('undergraduate')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
              programsActiveTab === 'undergraduate'
                ? 'bg-[#0a2342] text-white shadow-xs ring-1 ring-[#0a2342]'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            <School className={`w-4 h-4 ${programsActiveTab === 'undergraduate' ? 'text-amber-300' : 'text-slate-500'}`} />
            <span>Undergraduate Programs (BS / BBA / Pharm-D / LLB)</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
              programsActiveTab === 'undergraduate' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
            }`}>
              {undergraduatePrograms.length} Offerings
            </span>
          </button>

          <button
            onClick={() => setProgramsActiveTab('postgraduate')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
              programsActiveTab === 'postgraduate'
                ? 'bg-[#0a2342] text-white shadow-xs ring-1 ring-[#0a2342]'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            <Award className={`w-4 h-4 ${programsActiveTab === 'postgraduate' ? 'text-amber-300' : 'text-slate-500'}`} />
            <span>Postgraduate Programs (MS / M.Phil / PhD / MBA)</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
              programsActiveTab === 'postgraduate' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
            }`}>
              {postgraduatePrograms.length} Research Tracks
            </span>
          </button>

          <button
            onClick={() => setProgramsActiveTab('admissions')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
              programsActiveTab === 'admissions'
                ? 'bg-[#0a2342] text-white shadow-xs ring-1 ring-[#0a2342]'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            <Calculator className={`w-4 h-4 ${programsActiveTab === 'admissions' ? 'text-amber-300' : 'text-slate-500'}`} />
            <span>Admissions 2026–27 Guide &amp; Merit Calculator</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
              programsActiveTab === 'admissions' ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-blue-50 text-blue-900 border border-blue-200'
            }`}>
              SUTC Testing Portal
            </span>
          </button>
        </div>

        {/* Content Area Based on Active Tab */}
        {programsActiveTab !== 'admissions' ? (
          <div className="space-y-4">
            {/* Filter and Search Bar */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              {/* Search input */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={programSearchQuery}
                  onChange={(e) => setProgramSearchQuery(e.target.value)}
                  placeholder="Search programs by degree title, department, or specialization (e.g., Software, AI, BBA, Law, Pharmacy)..."
                  className="w-full pl-9 pr-8 py-2 rounded-lg bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-900 focus:border-blue-900"
                />
                {programSearchQuery && (
                  <button
                    onClick={() => setProgramSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Faculty Filter Dropdown */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[11px] text-slate-500 font-mono font-medium hidden sm:inline">
                  Filter Faculty:
                </span>
                <select
                  value={selectedFacultyFilter}
                  onChange={(e) => setSelectedFacultyFilter(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-blue-900 focus:border-blue-900 cursor-pointer"
                >
                  <option value="All">All Disciplines &amp; Faculties</option>
                  <option value="Faculty of Engineering & Technology">Engineering &amp; Technology</option>
                  <option value="Faculty of Natural Sciences">Natural Sciences</option>
                  <option value="Faculty of Commerce & Business Administration">Commerce &amp; Business (IBA)</option>
                  <option value="Faculty of Pharmacy">Pharmacy</option>
                  <option value="Faculty of Law">Law</option>
                  <option value="Faculty of Arts & Humanities">Arts &amp; Humanities</option>
                  <option value="Faculty of Social Sciences">Social Sciences</option>
                </select>
              </div>
            </div>

            {/* Results Counter */}
            <div className="flex items-center justify-between text-xs text-slate-500 px-1 font-mono">
              <div>
                Showing <strong className="text-slate-900">{filteredPrograms.length}</strong> {programsActiveTab} degree programs
                {selectedFacultyFilter !== 'All' && ` in ${selectedFacultyFilter}`}
              </div>
              <div className="text-[11px] text-blue-900">
                HEC Recognized · SUTC Entry Test Required
              </div>
            </div>

            {/* Programs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPrograms.map((prog) => (
                <div
                  key={prog.id}
                  className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    {/* Top badges */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-900 border border-blue-200">
                        {prog.degreeType} Program
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold truncate max-w-[170px]" title={prog.accreditation}>
                        {prog.accreditation}
                      </span>
                    </div>

                    {/* Title & Department */}
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-950 transition-colors leading-snug">
                        {prog.title}
                      </h3>
                      <div className="text-[11px] text-slate-500 font-medium mt-0.5 flex items-center gap-1 truncate">
                        <Building2 className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate">{prog.department}</span>
                      </div>
                    </div>

                    {/* Short Description */}
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      {prog.description}
                    </p>

                    {/* Clean Key Specifications */}
                    <div className="flex items-center justify-between text-[11px] py-2 px-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-600 font-mono">
                      <span>{prog.duration.split(' ')[0]} {prog.duration.split(' ')[1]}</span>
                      <span className="text-slate-300">•</span>
                      <span>{prog.creditHours.split(' ')[0]} Cr. Hrs</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-emerald-700 font-semibold">{prog.merit2025.split(' ')[0]}</span>
                    </div>
                  </div>

                  {/* Single Clean Action Button */}
                  <div className="pt-3 mt-2 border-t border-slate-100">
                    <button
                      onClick={() => setSelectedProgramDetail(prog)}
                      className="w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-[#0a2342] text-slate-800 hover:text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 border border-slate-200 hover:border-[#0a2342] cursor-pointer group/btn"
                    >
                      <span>Explore Program &amp; Criteria</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredPrograms.length === 0 && (
              <div className="p-8 rounded-2xl bg-white border border-slate-200 text-center space-y-2">
                <Search className="w-8 h-8 text-slate-300 mx-auto" />
                <h4 className="text-sm font-bold text-slate-800">No matching degree programs found</h4>
                <p className="text-xs text-slate-500">
                  Try adjusting your search query or select "All Disciplines" in the faculty filter.
                </p>
                <button
                  onClick={() => {
                    setProgramSearchQuery('');
                    setSelectedFacultyFilter('All');
                  }}
                  className="mt-2 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs text-slate-700 font-semibold cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        ) : (
          /* =========================================================
             ADMISSIONS 2026-27 COMPREHENSIVE GUIDE & CALCULATOR
             ========================================================= */
          <div className="space-y-6">
            {/* 4-Step Application Procedure */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <div className="text-[11px] font-bold uppercase tracking-wider text-blue-900 font-mono">
                  Standardized Admissions Flow
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                  4-Step Online Admission Procedure (Fall 2026)
                </h3>
                <p className="text-xs text-slate-500">
                  Follow the official sequence to register, pay via 1Link, sit for SUTC Pre-Entry test, and secure merit allocation.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                {ADMISSION_STEPS.map((step) => (
                  <div
                    key={step.step}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 flex flex-col justify-between"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="w-6 h-6 rounded-full bg-[#0a2342] text-white text-xs font-bold font-mono flex items-center justify-center">
                          {step.step}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                          {step.tag}
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                        {step.title}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-200 text-[10px] text-slate-500 font-mono">
                      {step.actionNote}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Merit Calculator */}
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-[#0a2342] to-slate-900 text-white border border-slate-800 shadow-md space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold font-mono text-amber-400 uppercase tracking-wider">
                    <Calculator className="w-4 h-4" />
                    <span>Official University of Sindh Formula</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
                    Interactive Merit Aggregate Calculator
                  </h3>
                  <p className="text-xs text-slate-300">
                    Formula: (10% SSC Matric) + (30% HSC Intermediate) + (60% SUTC Pre-Entry Test Score)
                  </p>
                </div>

                <div className="px-3 py-1 rounded-lg bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-mono font-bold shrink-0">
                  Approved by Academic Council
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Inputs Column */}
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* SSC Input */}
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                    <label className="text-xs font-bold text-slate-200 block">
                      Matric / SSC Percentage (10%)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="40"
                        max="100"
                        value={calcSscPercent}
                        onChange={(e) => setCalcSscPercent(Number(e.target.value) || 0)}
                        className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white font-mono text-base font-bold focus:outline-none focus:ring-1 focus:ring-amber-400"
                      />
                      <span className="font-mono text-slate-300 font-bold">%</span>
                    </div>
                    <span className="text-[10px] text-slate-400 block font-mono">
                      Weight: {(calcSscPercent * 0.10).toFixed(2)} pts
                    </span>
                  </div>

                  {/* HSC Input */}
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                    <label className="text-xs font-bold text-slate-200 block">
                      Inter / HSC Percentage (30%)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="40"
                        max="100"
                        value={calcHscPercent}
                        onChange={(e) => setCalcHscPercent(Number(e.target.value) || 0)}
                        className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white font-mono text-base font-bold focus:outline-none focus:ring-1 focus:ring-amber-400"
                      />
                      <span className="font-mono text-slate-300 font-bold">%</span>
                    </div>
                    <span className="text-[10px] text-slate-400 block font-mono">
                      Weight: {(calcHscPercent * 0.30).toFixed(2)} pts
                    </span>
                  </div>

                  {/* SUTC Test Input */}
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                    <label className="text-xs font-bold text-slate-200 block">
                      SUTC Entry Test Score (60%)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={calcTestScore}
                        onChange={(e) => setCalcTestScore(Number(e.target.value) || 0)}
                        className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white font-mono text-base font-bold focus:outline-none focus:ring-1 focus:ring-amber-400"
                      />
                      <span className="font-mono text-slate-300 font-bold">/100</span>
                    </div>
                    <span className="text-[10px] text-slate-400 block font-mono">
                      Weight: {(calcTestScore * 0.60).toFixed(2)} pts
                    </span>
                  </div>
                </div>

                {/* Score Summary Box */}
                <div className="p-5 rounded-xl bg-amber-400 text-slate-950 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[10px] font-bold font-mono uppercase tracking-wider block text-slate-900 opacity-80">
                      Calculated Aggregate Score
                    </span>
                    <div className="text-3xl sm:text-4xl font-extrabold font-mono text-slate-950 tracking-tight mt-1">
                      {calculatedAggregate}%
                    </div>
                    <div className="text-xs text-slate-800 font-medium mt-1 leading-snug">
                      {Number(calculatedAggregate) >= 70 ? (
                        <span>Qualifies for high-demand competitive disciplines including BS Software Engineering, Computer Science, and BBA.</span>
                      ) : Number(calculatedAggregate) >= 55 ? (
                        <span>Eligible for general Natural Sciences, Social Sciences, Arts, and Commerce degree programs.</span>
                      ) : (
                        <span>Score is below minimum competitive threshold for general morning merit. Evening / Self-Finance recommended.</span>
                      )}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-950/20 flex items-center justify-between text-xs font-mono font-bold">
                    <span>SUTC Passing Min: 50%</span>
                    <span>Status: {calcTestScore >= 50 ? 'Qualified' : 'Not Qualified'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pre-Entry Test Centers & Quotas Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* SUTC Testing Centers & Syllabus */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
                <div className="border-b border-slate-100 pb-2.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-blue-900 font-mono">
                    Sindh University Testing Center (SUTC)
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">
                    Pre-Entry Test Centers &amp; Question Paper Format
                  </h4>
                </div>

                {/* Centers list */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-slate-500 font-mono uppercase">
                    Assigned Regional Examination Centers:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                      <strong className="text-slate-900 block">1. Jamshoro Main Campus</strong>
                      <span className="text-slate-500 text-[11px]">Sindh University Examination Grounds &amp; AC-II</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                      <strong className="text-slate-900 block">2. Hyderabad Regional Center</strong>
                      <span className="text-slate-500 text-[11px]">Public School Hyderabad Center</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                      <strong className="text-slate-900 block">3. Sukkur Divisional Center</strong>
                      <span className="text-slate-500 text-[11px]">Govt Comprehensive School Sukkur</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                      <strong className="text-slate-900 block">4. Mirpurkhas Regional Center</strong>
                      <span className="text-slate-500 text-[11px]">Sindh University Laar / Mirpurkhas Campus</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                      <strong className="text-slate-900 block">5. Larkana Divisional Center</strong>
                      <span className="text-slate-500 text-[11px]">Govt Degree College Larkana</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                      <strong className="text-slate-900 block">6. Badin Laar Campus</strong>
                      <span className="text-slate-500 text-[11px]">Sindh University Badin Campus Hall</span>
                    </div>
                  </div>
                </div>

                {/* Syllabus breakdown */}
                <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 space-y-1.5 text-xs">
                  <span className="text-[10px] font-mono uppercase font-bold text-blue-900 block">
                    MCQ Test Pattern (100 Marks · 90 Minutes)
                  </span>
                  <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                    <div className="p-1.5 bg-white rounded border border-blue-200">
                      <div className="font-bold text-slate-900">30 Marks</div>
                      <div className="text-slate-500 text-[10px]">English Grammar &amp; Vocab</div>
                    </div>
                    <div className="p-1.5 bg-white rounded border border-blue-200">
                      <div className="font-bold text-slate-900">30 Marks</div>
                      <div className="text-slate-500 text-[10px]">General Math &amp; Logic</div>
                    </div>
                    <div className="p-1.5 bg-white rounded border border-blue-200">
                      <div className="font-bold text-slate-900">40 Marks</div>
                      <div className="text-slate-500 text-[10px]">Subject Electives / GK</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Admission Quotas & Categories */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3.5">
                <div className="border-b border-slate-100 pb-2.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-blue-900 font-mono">
                    Statutory Seat Allocations
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">
                    Quotas &amp; Reserved Categories Policy
                  </h4>
                </div>

                <div className="space-y-2">
                  {ADMISSION_QUOTAS.map((quota, qIdx) => (
                    <div key={qIdx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between gap-3">
                      <div className="space-y-0.5 truncate">
                        <strong className="text-slate-900 block truncate">{quota.name}</strong>
                        <span className="text-[11px] text-slate-500 truncate block">{quota.description}</span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 shrink-0">
                        {quota.percentage}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Important Schedule & Deadlines Timeline */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
              <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-blue-900 font-mono">
                    Directorate Schedule Calendar
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">
                    Admissions Session 2026–2027 Key Deadlines
                  </h4>
                </div>
                <div className="text-xs text-slate-500 font-mono">
                  Current Session: Fall 2026 Intake
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-[11px] font-mono text-slate-500 uppercase">
                      <th className="py-2.5 px-3">Milestone / Event</th>
                      <th className="py-2.5 px-3">Date</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3">Directives</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {ADMISSION_SCHEDULE.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-2.5 px-3 font-semibold text-slate-900">
                          {item.event}
                        </td>
                        <td className="py-2.5 px-3 font-mono text-slate-700 whitespace-nowrap">
                          {item.date}
                        </td>
                        <td className="py-2.5 px-3">
                          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                            item.status === 'Completed'
                              ? 'bg-slate-100 text-slate-600 border-slate-200'
                              : item.status === 'Active'
                              ? 'bg-amber-100 text-amber-900 border-amber-300 animate-pulse'
                              : 'bg-blue-50 text-blue-800 border-blue-200'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-slate-500 text-[11px]">
                          {item.note}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Directorate of Admissions Official Contact Details */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-[11px] font-bold font-mono uppercase text-blue-900 tracking-wider">
                  Official Admission Secretariat
                </div>
                <h4 className="text-sm sm:text-base font-bold text-slate-900">
                  Directorate of Admissions, AC-II Building, Jamshoro Campus
                </h4>
                <p className="text-xs text-slate-600">
                  For corrections in application bio-data, 1Link challan queries, test slip issues, or quota inquiries.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 shrink-0 text-xs">
                <a
                  href="mailto:admissions@usindh.edu.pk"
                  className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-800 font-semibold hover:border-blue-900 transition-colors flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-blue-900" />
                  <span>admissions@usindh.edu.pk</span>
                </a>
                <div className="px-3.5 py-2 rounded-xl bg-[#0a2342] text-white font-bold flex items-center gap-1.5">
                  <PhoneCall className="w-3.5 h-3.5 text-amber-300" />
                  <span>022-9213166 / 9213181</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* =========================================================
          PROGRAM DETAIL MODAL (WHEN USER CLICKS FULL DETAILS)
         ========================================================= */}
      {selectedProgramDetail && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 space-y-5 p-6 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-900 border border-blue-200">
                    {selectedProgramDetail.degreeType} Program
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                    {selectedProgramDetail.accreditation}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  {selectedProgramDetail.title}
                </h3>
                <div className="text-xs text-slate-500 font-medium">
                  {selectedProgramDetail.department} · {selectedProgramDetail.faculty}
                </div>
              </div>

              <button
                onClick={() => setSelectedProgramDetail(null)}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-4 text-xs">
              <p className="text-slate-600 leading-relaxed">
                {selectedProgramDetail.description}
              </p>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">Duration:</span>
                  <strong className="text-slate-900">{selectedProgramDetail.duration}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">Credit Hours:</span>
                  <strong className="text-slate-900 font-mono">{selectedProgramDetail.creditHours}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">Intake Seats:</span>
                  <strong className="text-slate-900">{selectedProgramDetail.seats}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">Last Merit Score:</span>
                  <strong className="text-emerald-700 font-mono">{selectedProgramDetail.merit2025}</strong>
                </div>
              </div>

              {/* Eligibility & SUTC Test Requirements */}
              <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200 space-y-2">
                <div className="font-bold text-blue-950 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-900" />
                  <span>Admission Eligibility &amp; Test Requirements</span>
                </div>
                <div className="space-y-1.5 text-slate-700 pl-5">
                  <div>
                    <strong className="text-slate-900">Academic Prerequisite:</strong> {selectedProgramDetail.eligibility}
                  </div>
                  <div>
                    <strong className="text-slate-900">Testing Requirement:</strong> {selectedProgramDetail.testRequirement}
                  </div>
                  <div>
                    <strong className="text-slate-900">Estimated Semester Fee:</strong> {selectedProgramDetail.feeEstimate}
                  </div>
                </div>
              </div>

              {/* Specialization Tracks */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-slate-800 uppercase font-mono block">
                  Elective Specialization Tracks:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProgramDetail.specializations.map((spec, sIdx) => (
                    <span key={sIdx} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-[11px] font-medium border border-slate-200">
                      • {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Career Opportunities */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-slate-800 uppercase font-mono block">
                  Graduate Career Pathways:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProgramDetail.careerProspects.map((car, cIdx) => (
                    <span key={cIdx} className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-900 text-[11px] font-medium border border-emerald-200">
                      ✓ {car}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-[11px] text-slate-500 font-mono">
                Directorate of Admissions · University of Sindh
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setSelectedProgramDetail(null)}
                  className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setSelectedProgramDetail(null);
                    setProgramsActiveTab('admissions');
                  }}
                  className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-[#0a2342] hover:bg-blue-900 text-white font-bold text-xs cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Apply via Admissions</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showAppliedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0a2342] text-white px-4 py-3 rounded-2xl shadow-xl border border-blue-800 flex items-center gap-3 animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
          <span className="text-xs font-semibold">{showAppliedToast}</span>
          <button
            onClick={() => setShowAppliedToast(null)}
            className="p-1 hover:bg-white/10 rounded-lg text-slate-300 hover:text-white cursor-pointer ml-2"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* =========================================================
          4. OFFICIAL ANNOUNCEMENTS & CIRCULARS REGISTRY
         ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#091f38] text-white rounded-3xl p-5 sm:p-8 space-y-5 border border-slate-800 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold font-mono text-amber-400 uppercase tracking-wider">
                <FileText className="w-4 h-4" />
                <span>Campus Circulars &amp; Gazettes</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-0.5">
                Official University Notices
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl text-xs font-medium overflow-x-auto">
              {(['All', 'Examinations', 'Admissions', 'Faculty', 'Syndicate'] as const).map(cat => (
                <button
                  key={cat}
                  onClick={() => setCircularCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                    circularCategory === cat
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Circulars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCirculars.map((circ) => (
              <div
                key={circ.refNo}
                className="p-4 sm:p-5 rounded-2xl bg-slate-800/80 border border-slate-700 hover:border-amber-400/50 transition-all space-y-2.5 flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-amber-400 font-bold text-[11px]">
                      Ref: {circ.refNo}
                    </span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-700 text-slate-200">
                      {circ.urgency}
                    </span>
                  </div>

                  <h3 className="text-xs sm:text-sm font-bold text-white leading-snug">
                    {circ.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {circ.excerpt}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-slate-700 flex items-center justify-between text-xs text-slate-400">
                  <span className="truncate">{circ.office} · {circ.date}</span>
                  <button
                    onClick={() => onSelectRole('student')}
                    className="text-amber-400 hover:text-amber-300 font-bold shrink-0 ml-2 cursor-pointer flex items-center gap-1"
                  >
                    <span>View</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          5. ITSC DIGITAL HELPDESK & EMERGENCY ASSISTANCE
         ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <div className="text-[11px] font-bold font-mono uppercase text-blue-900 tracking-wider">
              Information Technology Services Centre (ITSC)
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Need assistance with your LMS account or fee challan?
            </h3>
            <p className="text-xs text-slate-500">
              Our central IT helpdesk in Jamshoro is ready to support students, parents, and faculty members.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href="mailto:itsc@usindh.edu.pk"
              className="px-4 py-2 bg-white text-slate-800 font-semibold text-xs rounded-xl border border-slate-200 hover:border-slate-300 transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5 text-blue-700" />
              <span>itsc@usindh.edu.pk</span>
            </a>
            <div className="px-4 py-2 bg-blue-900 text-white font-bold text-xs rounded-xl flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-amber-300" />
              <span>UAN: 022-9213181</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
