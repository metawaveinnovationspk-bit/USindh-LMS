import React, { useState } from 'react';
import { Course } from '../../types';
import { 
  FileText, 
  Download, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  ExternalLink, 
  FileCode, 
  BookOpen, 
  Sparkles,
  Layers
} from 'lucide-react';

interface CourseWeeklyModulesProps {
  course: Course;
}

export const CourseWeeklyModules: React.FC<CourseWeeklyModulesProps> = ({ course }) => {
  const [expandedWeeks, setExpandedWeeks] = useState<number[]>([1, 4]);

  const toggleWeek = (weekNo: number) => {
    setExpandedWeeks(prev => 
      prev.includes(weekNo) ? prev.filter(w => w !== weekNo) : [...prev, weekNo]
    );
  };

  // Structured pedagogical syllabus aligned with Software Engineering Department curriculum
  const weeklyCurriculum = [
    {
      weekNumber: 1,
      title: 'Foundations of Modern Software Architecture & Domain Modeling',
      objective: 'Decompose monolithic architectures into autonomous bounded contexts and domain services.',
      isCompleted: true,
      items: [
        { type: 'slides', name: 'Lecture_01_Architecture_Paradigms.pdf', size: '3.4 MB', date: 'Sep 02, 2026', author: course.instructor },
        { type: 'reading', name: 'IEEE_Recommended_Practice_Architecture_Description.pdf', size: '1.8 MB', date: 'Sep 04, 2026', author: 'IEEE Computer Society' },
        { type: 'lab', name: 'Lab_01_Domain_Storytelling_Excercise.zip', size: '512 KB', date: 'Sep 06, 2026', author: course.instructor }
      ]
    },
    {
      weekNumber: 2,
      title: 'Layered, Clean, and Hexagonal (Ports & Adapters) Patterns',
      objective: 'Implement inversion of control, dependency injection, and decoupling business logic from databases.',
      isCompleted: true,
      items: [
        { type: 'slides', name: 'Lecture_02_Clean_Architecture_Principles.pdf', size: '4.2 MB', date: 'Sep 09, 2026', author: course.instructor },
        { type: 'reading', name: 'Hexagonal_Architecture_Reference_Guide.pdf', size: '2.1 MB', date: 'Sep 11, 2026', author: 'Alistair Cockburn' }
      ]
    },
    {
      weekNumber: 3,
      title: 'Microservices Decomposition & API Contract Engineering',
      objective: 'Define synchronous REST & gRPC contracts, OpenAPI 3.1 definitions, and semantic versioning.',
      isCompleted: true,
      items: [
        { type: 'slides', name: 'Lecture_03_Microservices_API_Contracts.pdf', size: '5.1 MB', date: 'Sep 16, 2026', author: course.instructor },
        { type: 'code', name: 'UoS_LMS_OpenAPI_Contract_Template.yaml', size: '120 KB', date: 'Sep 18, 2026', author: 'ITSC Engineering' }
      ]
    },
    {
      weekNumber: 4,
      title: 'Event-Driven Architectures, CQRS & Saga Distributed Transactions',
      objective: 'Address dual-write anomalies and transactional consistency across asynchronous message brokers.',
      isCurrent: true,
      isCompleted: false,
      items: [
        { type: 'slides', name: 'Lecture_04_EventSourcing_CQRS_Patterns.pdf', size: '6.4 MB', date: 'Oct 02, 2026', author: course.instructor },
        { type: 'reading', name: 'Martin_Fowler_Event_Driven_Patterns.pdf', size: '1.2 MB', date: 'Oct 04, 2026', author: 'Martin Fowler' },
        { type: 'assignment', name: 'Assignment_02_FeeReconciliation_Saga.pdf', size: '890 KB', date: 'Oct 06, 2026', author: course.instructor }
      ]
    },
    {
      weekNumber: 5,
      title: 'Resilience Patterns: Circuit Breakers, Bulkheads & Rate Limiting',
      objective: 'Prevent cascading failures across high-load academic services during result publication events.',
      isCompleted: false,
      items: [
        { type: 'slides', name: 'Lecture_05_Circuit_Breakers_Chaos_Testing.pdf', size: '3.9 MB', date: 'Scheduled Oct 14', author: course.instructor }
      ]
    },
    {
      weekNumber: 6,
      title: 'Cloud Native Deployment: Kubernetes Ingress & Service Meshes',
      objective: 'Deploy stateful clusters, manage ingress routing, and configure Prometheus/Grafana telemetry.',
      isCompleted: false,
      items: [
        { type: 'slides', name: 'Lecture_06_Kubernetes_Pod_Topology.pdf', size: '4.8 MB', date: 'Scheduled Oct 21', author: course.instructor }
      ]
    }
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-700" />
            <span>Modular Courseware & Lecture Progression</span>
          </h3>
          <p className="text-xs text-slate-500">
            Sakai / LUMS benchmarked pedagogical structure (Week-by-week progressive disclosure).
          </p>
        </div>
        <button
          onClick={() => setExpandedWeeks([1, 2, 3, 4, 5, 6])}
          className="text-xs text-blue-700 hover:text-blue-900 font-semibold"
        >
          Expand All Weeks
        </button>
      </div>

      <div className="space-y-3">
        {weeklyCurriculum.map((week) => {
          const isExpanded = expandedWeeks.includes(week.weekNumber);
          return (
            <div 
              key={week.weekNumber} 
              className={`rounded-xl border transition-all ${
                week.isCurrent 
                  ? 'bg-blue-50/40 border-blue-300 ring-1 ring-blue-200' 
                  : 'bg-white border-slate-200'
              }`}
            >
              {/* Week Accordion Header */}
              <div 
                onClick={() => toggleWeek(week.weekNumber)}
                className="p-4 flex items-center justify-between cursor-pointer select-none"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                    week.isCompleted
                      ? 'bg-emerald-100 text-emerald-800'
                      : week.isCurrent
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {week.isCompleted ? <CheckCircle2 className="w-4 h-4" /> : `W${week.weekNumber}`}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                        Week {week.weekNumber}: {week.title}
                      </h4>
                      {week.isCurrent && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-900 uppercase">
                          Active Week
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                      {week.objective}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400 hidden sm:inline">
                    {week.items.length} Resources
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              </div>

              {/* Expanded Week Items */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-1 border-t border-slate-100 space-y-2">
                  <div className="text-[11px] text-slate-500 italic pb-1">
                    Learning Outcome: {week.objective}
                  </div>

                  {week.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-slate-50/80 border border-slate-200/80 flex items-center justify-between gap-3 text-xs hover:bg-slate-100/60 transition-colors"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {item.type === 'slides' && <FileText className="w-4 h-4 text-rose-500 shrink-0" />}
                        {item.type === 'reading' && <BookOpen className="w-4 h-4 text-blue-600 shrink-0" />}
                        {item.type === 'code' && <FileCode className="w-4 h-4 text-purple-600 shrink-0" />}
                        {item.type === 'assignment' && <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />}
                        
                        <div className="truncate">
                          <div className="font-semibold text-slate-900 truncate">{item.name}</div>
                          <div className="text-[10px] text-slate-500">
                            {item.author} • {item.date} • {item.size}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => alert(`Simulated Download: ${item.name} fetched securely from HEC Digital Repository.`)}
                        className="px-2.5 py-1 text-blue-700 hover:text-blue-900 hover:bg-blue-50 font-bold rounded flex items-center gap-1 shrink-0"
                        title="Download or open material"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Open</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
