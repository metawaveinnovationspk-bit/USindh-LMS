import React, { useState } from 'react';
import { UserRole, NotificationItem, AuditLogItem } from './types';
import { SYSTEM_NOTIFICATIONS, AUDIT_LOGS_STREAM, MULTI_DEPARTMENT_STUDENTS, CURRENT_STUDENT } from './data/mockAcademicData';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { UniversitySeal } from './components/common/UniversitySeal';
import { AppSidebar } from './components/common/AppSidebar';
import { MobileBottomNav } from './components/common/MobileBottomNav';
import { NotificationDrawer } from './components/common/NotificationDrawer';
import { SearchModal } from './components/common/SearchModal';
import { PublicPortal } from './components/public/PublicPortal';
import { VcPortal } from './components/vc/VcPortal';
import { DeanPortal } from './components/dean/DeanPortal';
import { StudentPortal } from './components/student/StudentPortal';
import { FacultyPortal } from './components/faculty/FacultyPortal';
import { HodPortal } from './components/hod/HodPortal';
import { AdminPortal } from './components/admin/AdminPortal';
import { ParentPortal } from './components/parent/ParentPortal';
import { ArchitecturePortal } from './components/architecture/ArchitecturePortal';
import { X, Layers } from 'lucide-react';

export default function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>('public');
  
  // Student cohort persona state
  const [activeStudentId, setActiveStudentId] = useState<string>('std_2k23_swe_104');
  const activeStudent = MULTI_DEPARTMENT_STUDENTS.find(s => s.id === activeStudentId) || CURRENT_STUDENT;
  
  // Tab states per persona
  const [vcTab, setVcTab] = useState<string>('overview');
  const [deanTab, setDeanTab] = useState<string>('overview');
  const [studentTab, setStudentTab] = useState<string>('overview');
  const [selectedCourseCode, setSelectedCourseCode] = useState<string>('SWE-401');
  const [facultyTab, setFacultyTab] = useState<string>('attendance');
  const [hodTab, setHodTab] = useState<string>('overview');
  const [adminTab, setAdminTab] = useState<string>('telemetry');
  const [parentTab, setParentTab] = useState<string>('overview');

  // Sidebar & Layout states
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Notifications & Audit Stream
  const [notifications, setNotifications] = useState<NotificationItem[]>(SYSTEM_NOTIFICATIONS);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(AUDIT_LOGS_STREAM);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleAddAuditLog = (newLog: AuditLogItem) => {
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const handleSelectCourse = (code: string) => {
    setCurrentRole('student');
    setSelectedCourseCode(code);
    setStudentTab('courses');
  };

  const handleNavigate = (role: UserRole, targetTab?: string) => {
    setCurrentRole(role);
    if (role === 'vc' && targetTab) {
      setVcTab(targetTab);
    } else if (role === 'dean' && targetTab) {
      setDeanTab(targetTab);
    } else if (role === 'student' && targetTab) {
      setStudentTab(targetTab);
    } else if (role === 'faculty' && targetTab) {
      setFacultyTab(targetTab);
    } else if ((role === 'chairman' || role === 'hod') && targetTab) {
      setHodTab(targetTab);
    } else if (role === 'admin' && targetTab) {
      setAdminTab(targetTab);
    } else if (role === 'parent' && targetTab) {
      setParentTab(targetTab);
    }
  };

  const getCurrentTab = () => {
    if (currentRole === 'vc') return vcTab;
    if (currentRole === 'dean') return deanTab;
    if (currentRole === 'student') return studentTab;
    if (currentRole === 'faculty') return facultyTab;
    if (currentRole === 'chairman' || currentRole === 'hod') return hodTab;
    if (currentRole === 'admin') return adminTab;
    if (currentRole === 'parent') return parentTab;
    return 'overview';
  };

  const handleTabChange = (tabId: string) => {
    if (currentRole === 'vc') setVcTab(tabId);
    else if (currentRole === 'dean') setDeanTab(tabId);
    else if (currentRole === 'student') setStudentTab(tabId);
    else if (currentRole === 'faculty') setFacultyTab(tabId);
    else if (currentRole === 'chairman' || currentRole === 'hod') setHodTab(tabId);
    else if (currentRole === 'admin') setAdminTab(tabId);
    else if (currentRole === 'parent') setParentTab(tabId);
    setIsMobileDrawerOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Universal Institutional Header with Prototype Disclaimer */}
      <Header
        currentRole={currentRole}
        onRoleChange={(role) => {
          setCurrentRole(role);
          setIsMobileDrawerOpen(false);
        }}
        unreadCount={unreadCount}
        onOpenNotifications={() => setIsNotificationOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onToggleSidebar={() => setIsMobileDrawerOpen(prev => !prev)}
        activeCourseCode={selectedCourseCode}
        onSelectCourse={handleSelectCourse}
        studentTab={studentTab}
        onSelectStudentTab={(tab) => {
          setCurrentRole('student');
          setStudentTab(tab);
        }}
        activeDepartmentName={activeStudent.department.replace('Department of ', '').replace('Institute of ', '')}
        activeBatchName={activeStudent.batch.split(' ')[0]}
      />

      {/* Main Body Area: Dynamic Enterprise App Shell */}
      {currentRole === 'public' ? (
        <main className="flex-1">
          <PublicPortal
            onSelectRole={(role) => {
              setCurrentRole(role);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenAudit={() => setCurrentRole('architecture')}
          />
        </main>
      ) : currentRole === 'architecture' ? (
        <main className="flex-1">
          <ArchitecturePortal />
        </main>
      ) : (
        <div className="flex-1 flex overflow-hidden">
          {/* Collapsible Desktop Enterprise Sidebar */}
          <AppSidebar
            currentRole={currentRole}
            activeTab={getCurrentTab()}
            onTabChange={handleTabChange}
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={() => setIsSidebarCollapsed(prev => !prev)}
            onSelectRole={(role) => setCurrentRole(role)}
          />

          {/* Persona Main Viewport */}
          <main className="flex-1 overflow-y-auto pb-16 lg:pb-0">
            {currentRole === 'vc' && (
              <VcPortal
                activeTab={vcTab}
                onTabChange={setVcTab}
                onAddAuditLog={handleAddAuditLog}
                onNavigateToFaculty={(facId) => {
                  setCurrentRole('dean');
                }}
              />
            )}

            {currentRole === 'dean' && (
              <DeanPortal
                activeTab={deanTab}
                onTabChange={setDeanTab}
                onAddAuditLog={handleAddAuditLog}
                onNavigateToDepartment={(deptId) => {
                  setCurrentRole('hod');
                }}
              />
            )}

            {currentRole === 'student' && (
              <StudentPortal
                activeTab={studentTab}
                onTabChange={setStudentTab}
                selectedCourseCode={selectedCourseCode}
                onSelectCourseCode={setSelectedCourseCode}
                selectedStudentId={activeStudentId}
                onSelectStudentId={setActiveStudentId}
                onAuditClick={() => setCurrentRole('architecture')}
                onAddAuditLog={handleAddAuditLog}
              />
            )}

            {currentRole === 'faculty' && (
              <FacultyPortal
                activeTab={facultyTab}
                onTabChange={setFacultyTab}
                onAddAuditLog={handleAddAuditLog}
              />
            )}

            {(currentRole === 'chairman' || currentRole === 'hod') && (
              <HodPortal
                activeTab={hodTab}
                onTabChange={setHodTab}
                isChairman={currentRole === 'chairman'}
                initialDeptId={currentRole === 'hod' ? 'dept_iba' : 'dept_swe'}
                onAddAuditLog={handleAddAuditLog}
              />
            )}

            {currentRole === 'admin' && (
              <AdminPortal
                activeTab={adminTab}
                onTabChange={setAdminTab}
                auditLogs={auditLogs}
                onAddAuditLog={handleAddAuditLog}
              />
            )}

            {currentRole === 'parent' && (
              <ParentPortal
                activeTab={parentTab}
                onTabChange={setParentTab}
                onAddAuditLog={handleAddAuditLog}
              />
            )}
          </main>
        </div>
      )}

      {/* Universal Institutional Footer */}
      <Footer onSelectRole={(role) => {
        setCurrentRole(role);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />

      {/* High-frequency Mobile Bottom Navigation */}
      <MobileBottomNav
        currentRole={currentRole}
        activeTab={getCurrentTab()}
        onTabChange={handleTabChange}
        onOpenMenu={() => setIsMobileDrawerOpen(true)}
      />

      {/* Slide-out Mobile Navigation Drawer */}
      {isMobileDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-start bg-slate-900/50 backdrop-blur-xs lg:hidden animate-in fade-in">
          <div className="w-4/5 max-w-xs bg-white h-full shadow-2xl flex flex-col border-r border-slate-200 animate-in slide-in-from-left">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-[#004b87] text-white">
              <div className="flex items-center gap-2.5">
                <div className="p-1 bg-white rounded-xl border border-[#d8dadb] shrink-0">
                  <UniversitySeal size="sm" />
                </div>
                <div className="text-xs font-bold leading-tight">
                  University of Sindh LMS
                  <div className="text-[10px] font-normal text-[#c8e27b]">Allama II Qazi Campus</div>
                </div>
              </div>
              <button 
                onClick={() => setIsMobileDrawerOpen(false)}
                className="p-1 rounded text-slate-300 hover:text-white"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Switch Portal Role
                </div>
                {(['vc', 'dean', 'chairman', 'hod', 'faculty', 'student', 'parent', 'public', 'admin', 'architecture'] as UserRole[]).map(role => (
                  <button
                    key={role}
                    onClick={() => {
                      setCurrentRole(role);
                      setIsMobileDrawerOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold capitalize flex items-center justify-between ${
                      currentRole === role ? 'bg-blue-50 text-blue-900 font-bold' : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{role} Portal</span>
                    {currentRole === role && <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                  </button>
                ))}
              </div>

              {currentRole === 'student' && (
                <div className="space-y-1 pt-2 border-t border-slate-100">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Student Workspace Modules
                  </div>
                  {[
                    { id: 'overview', label: 'Dashboard Overview' },
                    { id: 'courses', label: 'Courses & Modules' },
                    { id: 'attendance', label: 'Attendance Monitor (75%)' },
                    { id: 'assignments', label: 'Assignments & Quizzes' },
                    { id: 'exams', label: 'Examination Slip' },
                    { id: 'results', label: 'Results & Transcript' },
                    { id: 'fees', label: '1Link Fee Challans' }
                  ].map(item => (
                    <button
                      key={item.id}
                      onClick={() => handleTabChange(item.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold ${
                        studentTab === item.id ? 'bg-[#0b2545] text-white font-bold' : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}

              {currentRole === 'parent' && (
                <div className="space-y-1 pt-2 border-t border-slate-100">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Parent & Guardian Modules
                  </div>
                  {[
                    { id: 'overview', label: 'Ward Dashboard' },
                    { id: 'attendance', label: 'Attendance (75% Rule)' },
                    { id: 'academics', label: 'Term Grades & CGPA' },
                    { id: 'fees', label: '1Link Fee Challans' },
                    { id: 'advisory', label: 'Advisor Consultation' }
                  ].map(item => (
                    <button
                      key={item.id}
                      onClick={() => handleTabChange(item.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold ${
                        parentTab === item.id ? 'bg-[#0b2545] text-white font-bold' : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="p-3 border-t border-slate-100 bg-slate-50 text-[11px] text-slate-500 text-center">
              MetaWave Innovations Ltd. • Smart Systems
            </div>
          </div>
        </div>
      )}

      {/* Slide-over Notification Center */}
      <NotificationDrawer
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={handleMarkAllNotificationsRead}
        onSelectNotification={(item) => {
          if (item.actionUrl?.startsWith('/student')) {
            setCurrentRole('student');
            const tab = item.actionUrl.split('/')[2];
            if (tab) setStudentTab(tab);
          }
          setIsNotificationOpen(false);
        }}
      />

      {/* Global Spotlight Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
