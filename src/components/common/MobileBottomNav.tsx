import React from 'react';
import { UserRole } from '../../types';
import { 
  LayoutDashboard, 
  BookOpen, 
  Clock, 
  Award, 
  Menu,
  GraduationCap,
  CreditCard,
  UserCheck,
  Server,
  ShieldCheck,
  School,
  FileText
} from 'lucide-react';

interface MobileBottomNavProps {
  currentRole: UserRole;
  activeTab: string;
  onTabChange: (tabId: string) => void;
  onOpenMenu: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentRole,
  activeTab,
  onTabChange,
  onOpenMenu
}) => {
  if (currentRole === 'public') return null;

  const getNavItems = () => {
    if (currentRole === 'vc') {
      return [
        { id: 'overview', label: 'Radar', icon: <LayoutDashboard className="w-5 h-5" /> },
        { id: 'faculties', label: 'Faculties', icon: <School className="w-5 h-5" /> },
        { id: 'examinations', label: 'Exams', icon: <Award className="w-5 h-5" /> },
        { id: 'governance', label: 'Directives', icon: <FileText className="w-5 h-5" /> }
      ];
    }
    if (currentRole === 'dean') {
      return [
        { id: 'overview', label: 'Faculty', icon: <LayoutDashboard className="w-5 h-5" /> },
        { id: 'departments', label: 'Depts', icon: <School className="w-5 h-5" /> },
        { id: 'faculty', label: 'Teachers', icon: <UserCheck className="w-5 h-5" /> },
        { id: 'accreditation', label: 'OBE', icon: <ShieldCheck className="w-5 h-5" /> }
      ];
    }
    if (currentRole === 'faculty') {
      return [
        { id: 'attendance', label: 'Attendance', icon: <Clock className="w-5 h-5" /> },
        { id: 'grading', label: 'Grading', icon: <FileText className="w-5 h-5" /> },
        { id: 'materials', label: 'Courseware', icon: <BookOpen className="w-5 h-5" /> },
        { id: 'risk', label: 'At-Risk', icon: <ShieldCheck className="w-5 h-5" />, hasAlert: true }
      ];
    }
    if (currentRole === 'chairman' || currentRole === 'hod') {
      return [
        { id: 'overview', label: currentRole === 'chairman' ? 'Chair' : 'HOD', icon: <School className="w-5 h-5" /> },
        { id: 'cohorts', label: 'Batches', icon: <GraduationCap className="w-5 h-5" /> },
        { id: 'accreditation', label: 'OBE', icon: <ShieldCheck className="w-5 h-5" /> },
        { id: 'broadcast', label: 'Notices', icon: <FileText className="w-5 h-5" /> }
      ];
    }
    if (currentRole === 'admin') {
      return [
        { id: 'telemetry', label: 'Telemetry', icon: <Server className="w-5 h-5" /> },
        { id: 'results', label: 'Results', icon: <Award className="w-5 h-5" /> },
        { id: 'users', label: 'Users', icon: <UserCheck className="w-5 h-5" /> },
        { id: 'audit', label: 'Audit', icon: <ShieldCheck className="w-5 h-5" /> }
      ];
    }
    if (currentRole === 'parent') {
      return [
        { id: 'overview', label: 'Ward', icon: <LayoutDashboard className="w-5 h-5" /> },
        { id: 'attendance', label: '75% Rule', icon: <Clock className="w-5 h-5" />, hasAlert: true },
        { id: 'results', label: 'Grades', icon: <GraduationCap className="w-5 h-5" /> },
        { id: 'fees', label: '1Link Fees', icon: <CreditCard className="w-5 h-5" /> }
      ];
    }
    // Default: student
    return [
      { id: 'overview', label: 'Today', icon: <LayoutDashboard className="w-5 h-5" /> },
      { id: 'courses', label: 'Courses', icon: <BookOpen className="w-5 h-5" /> },
      { id: 'attendance', label: 'Attendance', icon: <Clock className="w-5 h-5" />, hasAlert: true },
      { id: 'exams', label: 'Exams', icon: <Award className="w-5 h-5" /> }
    ];
  };

  const navItems = getNavItems();

  return (
    <nav 
      aria-label="Mobile Bottom Navigation"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg px-2 py-1 flex items-center justify-around no-print"
    >
      {navItems.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg text-[10px] font-semibold transition-all relative cursor-pointer ${
              isActive
                ? 'text-[#0b2545] font-black'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <div className="relative">
              {item.icon}
              {item.hasAlert && (
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-rose-600 rounded-full" />
              )}
            </div>
            <span className="mt-0.5">{item.label}</span>
            {isActive && (
              <span className="w-4 h-0.5 bg-[#0b2545] rounded-full mt-0.5" />
            )}
          </button>
        );
      })}

      {/* Menu / Drawer button */}
      <button
        onClick={onOpenMenu}
        className="flex flex-col items-center justify-center py-1 px-3 rounded-lg text-[10px] font-semibold text-slate-500 hover:text-slate-800 transition-all cursor-pointer"
        aria-label="Open full portal menu"
      >
        <Menu className="w-5 h-5" />
        <span className="mt-0.5">More</span>
      </button>
    </nav>
  );
};
