import React, { useState } from 'react';
import { Course } from '../../types';
import { Calculator, X, RefreshCw, Award, Info, CheckCircle2 } from 'lucide-react';

interface GpaCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  courses: Course[];
  currentCgpa: number;
  completedCredits: number;
}

export const GpaCalculatorModal: React.FC<GpaCalculatorModalProps> = ({
  isOpen,
  onClose,
  courses,
  currentCgpa,
  completedCredits
}) => {
  if (!isOpen) return null;

  const GRADE_SCALE: Record<string, number> = {
    'A': 4.0,
    'A-': 3.7,
    'B+': 3.3,
    'B': 3.0,
    'B-': 2.7,
    'C+': 2.3,
    'C': 2.0,
    'D': 1.0,
    'F': 0.0
  };

  // Initial simulated grades for Fall 2026 courses
  const [grades, setGrades] = useState<Record<string, string>>({
    'SWE-401': 'A',
    'SWE-403': 'A-',
    'SWE-405': 'B+',
    'SWE-407': 'A',
    'SWE-499': 'A',
    'CS-411': 'B'
  });

  const handleGradeChange = (courseCode: string, gradeLetter: string) => {
    setGrades(prev => ({ ...prev, [courseCode]: gradeLetter }));
  };

  // Calculate projected Semester 7 GPA
  let totalSemCredits = 0;
  let totalSemPoints = 0;

  courses.forEach(c => {
    const letter = grades[c.code] || 'B';
    const point = GRADE_SCALE[letter] ?? 3.0;
    totalSemCredits += c.creditHours;
    totalSemPoints += c.creditHours * point;
  });

  const projectedSemGpa = totalSemCredits > 0 ? (totalSemPoints / totalSemCredits) : 0;

  // Calculate projected Cumulative CGPA
  const totalCombinedCredits = completedCredits + totalSemCredits;
  const previousTotalPoints = completedCredits * currentCgpa;
  const projectedCgpa = totalCombinedCredits > 0 
    ? ((previousTotalPoints + totalSemPoints) / totalCombinedCredits)
    : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-100 text-blue-900 rounded-lg">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                University of Sindh CGPA Projection Engine
              </h3>
              <p className="text-xs text-slate-500">
                Official 4.0 Semester System Grading Calculation Formula
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Calculation Metric Comparison */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Completed</span>
            <span className="text-base font-bold text-slate-700">{completedCredits} Credits</span>
            <span className="text-[10px] text-slate-500">Semesters 1–6</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Current CGPA</span>
            <span className="text-base font-black text-slate-800">{currentCgpa.toFixed(2)}</span>
            <span className="text-[10px] text-emerald-700 font-semibold">Good Standing</span>
          </div>

          <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
            <span className="text-[10px] font-bold uppercase text-blue-800 block">Projected Sem 7</span>
            <span className="text-lg font-black text-blue-900">{projectedSemGpa.toFixed(2)}</span>
            <span className="text-[10px] text-blue-700">{totalSemCredits} Sem Credits</span>
          </div>

          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
            <span className="text-[10px] font-bold uppercase text-emerald-800 block">Projected CGPA</span>
            <span className="text-lg font-black text-emerald-700">{projectedCgpa.toFixed(2)}</span>
            <span className="text-[10px] text-emerald-600 font-bold">
              {projectedCgpa >= currentCgpa ? `+${(projectedCgpa - currentCgpa).toFixed(2)} Growth` : `${(projectedCgpa - currentCgpa).toFixed(2)} Dip`}
            </span>
          </div>
        </div>

        {/* Grade Tuning Table */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-slate-700 flex items-center justify-between">
            <span>Simulate Grades for Enrolled Courses (Semester 7):</span>
            <button
              onClick={() => setGrades({ 'SWE-401': 'A', 'SWE-403': 'A', 'SWE-405': 'A', 'SWE-407': 'A', 'SWE-499': 'A', 'CS-411': 'A' })}
              className="text-[11px] text-blue-700 hover:underline font-semibold"
            >
              Set All to A (4.0)
            </button>
          </div>

          <div className="max-h-60 overflow-y-auto space-y-1.5 pr-1 divide-y divide-slate-100">
            {courses.map(course => (
              <div key={course.code} className="pt-1.5 flex items-center justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono font-bold text-blue-900">{course.code}</span>
                    <span className="font-semibold text-slate-800">{course.title}</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {course.creditHours} Credit Hours • {course.instructor}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[11px] text-slate-500 font-mono">
                    Pts: {(GRADE_SCALE[grades[course.code] || 'B'] * course.creditHours).toFixed(1)}
                  </span>
                  <select
                    value={grades[course.code] || 'B'}
                    onChange={(e) => handleGradeChange(course.code, e.target.value)}
                    className="p-1 bg-white border border-slate-300 rounded text-xs font-bold text-slate-800 outline-hidden focus:border-blue-500"
                  >
                    {Object.keys(GRADE_SCALE).map(g => (
                      <option key={g} value={g}>{g} ({GRADE_SCALE[g].toFixed(1)})</option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Academic Rules Policy Note */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 space-y-1">
          <div className="font-bold text-slate-800 flex items-center gap-1">
            <Info className="w-3.5 h-3.5 text-blue-600" />
            <span>Sindh University Examination Policy (HEC Semester Guidelines)</span>
          </div>
          <p>
            Undergraduate students must maintain a minimum CGPA of <strong>2.00</strong> to qualify for degree award and avoid academic probation. 
            Courses with grade &lt; 2.0 may be repeated for grade improvement in subsequent regular semesters.
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#0b2545] hover:bg-blue-900 text-white rounded-lg text-xs font-bold"
          >
            Close Calculator
          </button>
        </div>
      </div>
    </div>
  );
};
