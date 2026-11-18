import React, { useEffect, useState } from 'react';
import { Download, FileText, Plus, Trash2 } from 'lucide-react';
import { USABILITY_PLAN } from '../../data/designSystemData';
import { Button, InputField } from '../ui/Primitives';

interface RecordedSession {
  id: string;
  participantCode: string;
  role: string;
  taskId: string;
  outcome: 'Pass' | 'Pass with Difficulty' | 'Fail';
  easeScore: number;
  notes: string;
  recordedAt: string;
}

interface RecordedIssue {
  id: string;
  title: string;
  heuristic: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  observation: string;
  proposedImprovement: string;
  status: 'Identified' | 'Planned' | 'Resolved';
}

const SESSIONS_KEY = 'atelier_raster_usability_sessions_v1';
const ISSUES_KEY = 'atelier_raster_usability_issues_v1';

export const UsabilityTestingSection: React.FC = () => {
  const [sessions, setSessions] = useState<RecordedSession[]>(() => {
    try {
      const saved = localStorage.getItem(SESSIONS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [issues, setIssues] = useState<RecordedIssue[]>(() => {
    try {
      const saved = localStorage.getItem(ISSUES_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Session form state
  const [participantCode, setParticipantCode] = useState('');
  const [role, setRole] = useState('');
  const [taskId, setTaskId] = useState('T1');
  const [outcome, setOutcome] = useState<RecordedSession['outcome']>('Pass');
  const [easeScore, setEaseScore] = useState(6);
  const [notes, setNotes] = useState('');
  const [sessionError, setSessionError] = useState('');

  // Issue form state
  const [issueTitle, setIssueTitle] = useState('');
  const [heuristic, setHeuristic] = useState('Visibility of System Status');
  const [severity, setSeverity] = useState<RecordedIssue['severity']>('Medium');
  const [observation, setObservation] = useState('');
  const [proposedImprovement, setProposedImprovement] = useState('');
  const [issueError, setIssueError] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
    } catch {
      // ignore storage quota errors
    }
  }, [sessions]);

  useEffect(() => {
    try {
      localStorage.setItem(ISSUES_KEY, JSON.stringify(issues));
    } catch {
      // ignore storage quota errors
    }
  }, [issues]);

  const handleAddSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!participantCode.trim() || !role.trim() || !notes.trim()) {
      setSessionError('Provide participant ID, role, and actual observed session notes.');
      return;
    }
    setSessionError('');
    const next: RecordedSession = {
      id: `S-${Date.now()}`,
      participantCode: participantCode.trim(),
      role: role.trim(),
      taskId,
      outcome,
      easeScore: Math.max(1, Math.min(7, easeScore)),
      notes: notes.trim(),
      recordedAt: new Date().toLocaleDateString(),
    };
    setSessions((prev) => [next, ...prev]);
    setParticipantCode('');
    setRole('');
    setNotes('');
  };

  const handleAddIssue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issueTitle.trim() || !observation.trim() || !proposedImprovement.trim()) {
      setIssueError('Provide issue title, real observation, and proposed UI improvement.');
      return;
    }
    setIssueError('');
    const next: RecordedIssue = {
      id: `ISS-${Date.now()}`,
      title: issueTitle.trim(),
      heuristic,
      severity,
      observation: observation.trim(),
      proposedImprovement: proposedImprovement.trim(),
      status: 'Identified',
    };
    setIssues((prev) => [next, ...prev]);
    setIssueTitle('');
    setObservation('');
    setProposedImprovement('');
  };

  const handleExportReport = () => {
    const markdown = [
      '# Atelier Raster — Usability Testing Report',
      `Exported: ${new Date().toISOString()}`,
      '',
      `## Recorded Participant Sessions (${sessions.length})`,
      sessions.length === 0
        ? '_No participant sessions recorded yet._'
        : sessions
            .map(
              (s) =>
                `- **${s.participantCode}** (${s.role}) | Task ${s.taskId}: ${s.outcome} | SEQ ${s.easeScore}/7 — ${s.notes}`
            )
            .join('\n'),
      '',
      `## Identified Usability Issues & Improvements (${issues.length})`,
      issues.length === 0
        ? '_No usability issues logged yet._'
        : issues
            .map(
              (i) =>
                `- **[${i.severity}] ${i.title}** (${i.heuristic}) — Observation: ${i.observation} | Proposed Improvement: ${i.proposedImprovement}`
            )
            .join('\n'),
    ].join('\n');

    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'atelier-usability-report.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="testing" className="py-16 border-b border-[#DEDAD2] dark:border-[#2D3139]">
      <div className="space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8 space-y-3">
            <p className="text-xs font-mono text-[#1E40AF] dark:text-[#60A5FA]">
              07B. Usability Testing Plan & Live Research Log
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#141413] dark:text-[#F4F3EF] text-balance">
              Empirical Testing Protocol & Authentic Observation Capture
            </h2>
          </div>
          <div className="lg:col-span-4 flex lg:justify-end">
            <Button
              variant="outline"
              size="md"
              onClick={handleExportReport}
              leftIcon={<Download className="w-4 h-4" />}
            >
              Export Markdown Report
            </Button>
          </div>
        </div>

        {/* Protocol Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 bg-white dark:bg-[#1A1C21] border border-[#DEDAD2] dark:border-[#2D3139] rounded-[2px] p-6 space-y-5">
            <div>
              <h3 className="font-display text-lg font-bold text-[#141413] dark:text-[#F4F3EF]">
                Test Objectives
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-[#575550] dark:text-[#A1A1AA]">
                {USABILITY_PLAN.objectives.map((obj) => (
                  <li key={obj} className="leading-relaxed">
                    · {obj}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-[#DEDAD2] dark:border-[#2D3139] space-y-2">
              <h4 className="text-xs font-mono font-semibold text-[#141413] dark:text-[#F4F3EF]">
                Methodology & Metrics
              </h4>
              <p className="text-sm text-[#575550] dark:text-[#A1A1AA] leading-relaxed">
                {USABILITY_PLAN.methodology}
              </p>
            </div>

            <div className="pt-4 border-t border-[#DEDAD2] dark:border-[#2D3139] space-y-2">
              <h4 className="text-xs font-mono font-semibold text-[#141413] dark:text-[#F4F3EF]">
                Target Participant Profile
              </h4>
              <p className="text-sm text-[#575550] dark:text-[#A1A1AA] leading-relaxed">
                {USABILITY_PLAN.participantCriteria}
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white dark:bg-[#1A1C21] border border-[#DEDAD2] dark:border-[#2D3139] rounded-[2px] p-6 space-y-4">
            <h3 className="font-display text-lg font-bold text-[#141413] dark:text-[#F4F3EF]">
              Moderated Task Scenarios (5 Core Tasks)
            </h3>
            <div className="divide-y divide-[#DEDAD2] dark:divide-[#2D3139]">
              {USABILITY_PLAN.tasks.map((task) => (
                <div key={task.id} className="py-4 first:pt-1 last:pb-1 space-y-1.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-display text-base font-bold text-[#141413] dark:text-[#F4F3EF]">
                      {task.id}. {task.title}
                    </span>
                    <span className="text-xs font-mono text-[#1E40AF] dark:text-[#60A5FA]">
                      {task.heuristicFocus}
                    </span>
                  </div>
                  <p className="text-sm text-[#575550] dark:text-[#A1A1AA]">{task.scenario}</p>
                  <p className="text-xs text-[#141413] dark:text-[#F4F3EF]">
                    <strong>Pass Criteria:</strong> {task.targetOutcome}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Authentic Session & Issue Collectors (ZERO invented results) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Participant Session Logger */}
          <div className="lg:col-span-6 bg-white dark:bg-[#1A1C21] border border-[#DEDAD2] dark:border-[#2D3139] rounded-[2px] p-6 space-y-6">
            <div>
              <h3 className="font-display text-lg font-bold text-[#141413] dark:text-[#F4F3EF]">
                Participant Session Log ({sessions.length} recorded)
              </h3>
              <p className="text-xs text-[#575550] dark:text-[#A1A1AA] mt-1">
                No synthetic test results are pre-filled. Record real observations during user testing sessions below.
              </p>
            </div>

            <form onSubmit={handleAddSession} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <InputField
                  id="ut-participant"
                  label="Participant ID"
                  placeholder="e.g., P-01"
                  value={participantCode}
                  onChange={(e) => setParticipantCode(e.target.value)}
                />
                <InputField
                  id="ut-role"
                  label="Participant Role"
                  placeholder="e.g., Product Designer"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="ut-task" className="text-sm font-semibold">
                    Task
                  </label>
                  <select
                    id="ut-task"
                    value={taskId}
                    onChange={(e) => setTaskId(e.target.value)}
                    className="min-h-[42px] px-3 bg-white dark:bg-[#1A1C21] text-sm border border-[#DEDAD2] dark:border-[#2D3139] rounded-[2px]"
                  >
                    {USABILITY_PLAN.tasks.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.id}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="ut-outcome" className="text-sm font-semibold">
                    Outcome
                  </label>
                  <select
                    id="ut-outcome"
                    value={outcome}
                    onChange={(e) => setOutcome(e.target.value as RecordedSession['outcome'])}
                    className="min-h-[42px] px-3 bg-white dark:bg-[#1A1C21] text-sm border border-[#DEDAD2] dark:border-[#2D3139] rounded-[2px]"
                  >
                    <option>Pass</option>
                    <option>Pass with Difficulty</option>
                    <option>Fail</option>
                  </select>
                </div>

                <InputField
                  id="ut-seq"
                  label="SEQ Ease (1–7)"
                  type="number"
                  value={easeScore}
                  onChange={(e) => setEaseScore(Number(e.target.value) || 1)}
                  onNumberStep={(val) => setEaseScore(Math.max(1, Math.min(7, val)))}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="ut-notes" className="text-sm font-semibold">
                  Observed Behavior & Quotes
                </label>
                <textarea
                  id="ut-notes"
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Record verbatim feedback, hesitation points, or completion time..."
                  className="w-full p-3 bg-white dark:bg-[#1A1C21] text-sm border border-[#DEDAD2] dark:border-[#2D3139] rounded-[2px]"
                />
              </div>

              {sessionError && (
                <p className="text-xs font-medium text-[#D9381E] dark:text-[#EF4444]">
                  {sessionError}
                </p>
              )}

              <Button type="submit" variant="primary" size="md" leftIcon={<Plus className="w-4 h-4" />}>
                Record Session Observation
              </Button>
            </form>

            <div className="pt-4 border-t border-[#DEDAD2] dark:border-[#2D3139]">
              {sessions.length === 0 ? (
                <div className="p-6 bg-[#F8F7F4] dark:bg-[#121316] border border-dashed border-[#DEDAD2] dark:border-[#2D3139] rounded-[2px] text-center space-y-1.5">
                  <FileText className="w-5 h-5 mx-auto text-[#575550]" />
                  <p className="text-sm font-semibold text-[#141413] dark:text-[#F4F3EF]">
                    No participant test sessions recorded yet
                  </p>
                  <p className="text-xs text-[#575550] dark:text-[#A1A1AA]">
                    Use the form above during live moderated testing to collect genuine observations.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {sessions.map((s) => (
                    <div
                      key={s.id}
                      className="p-3.5 bg-[#F8F7F4] dark:bg-[#121316] border border-[#DEDAD2] dark:border-[#2D3139] rounded-[2px] flex items-start justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <p className="text-xs font-mono text-[#1E40AF] dark:text-[#60A5FA]">
                          {s.participantCode} · {s.role} · {s.taskId} · {s.outcome} · SEQ {s.easeScore}/7
                        </p>
                        <p className="text-sm text-[#141413] dark:text-[#F4F3EF]">{s.notes}</p>
                      </div>
                      <button
                        type="button"
                        aria-label="Delete session"
                        onClick={() => setSessions((prev) => prev.filter((item) => item.id !== s.id))}
                        className="text-[#575550] hover:text-[#D9381E] cursor-pointer p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Usability Issue & Proposed Improvement Tracker */}
          <div className="lg:col-span-6 bg-white dark:bg-[#1A1C21] border border-[#DEDAD2] dark:border-[#2D3139] rounded-[2px] p-6 space-y-6">
            <div>
              <h3 className="font-display text-lg font-bold text-[#141413] dark:text-[#F4F3EF]">
                Usability Issues & Proposed Improvements ({issues.length} logged)
              </h3>
              <p className="text-xs text-[#575550] dark:text-[#A1A1AA] mt-1">
                Document real friction points discovered during testing alongside concrete design iterations.
              </p>
            </div>

            <form onSubmit={handleAddIssue} className="space-y-4">
              <InputField
                id="iss-title"
                label="Issue Summary"
                placeholder="e.g., Mobile drawer close icon low contrast on dark theme"
                value={issueTitle}
                onChange={(e) => setIssueTitle(e.target.value)}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="iss-heuristic" className="text-sm font-semibold">
                    Usability Heuristic
                  </label>
                  <select
                    id="iss-heuristic"
                    value={heuristic}
                    onChange={(e) => setHeuristic(e.target.value)}
                    className="min-h-[42px] px-3 bg-white dark:bg-[#1A1C21] text-sm border border-[#DEDAD2] dark:border-[#2D3139] rounded-[2px]"
                  >
                    <option>Visibility of System Status</option>
                    <option>Match Between System and Real World</option>
                    <option>User Control and Freedom</option>
                    <option>Consistency and Standards</option>
                    <option>Error Prevention & Recovery</option>
                    <option>Accessibility & Contrast</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="iss-severity" className="text-sm font-semibold">
                    Severity
                  </label>
                  <select
                    id="iss-severity"
                    value={severity}
                    onChange={(e) => setSeverity(e.target.value as RecordedIssue['severity'])}
                    className="min-h-[42px] px-3 bg-white dark:bg-[#1A1C21] text-sm border border-[#DEDAD2] dark:border-[#2D3139] rounded-[2px]"
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Critical</option>
                  </select>
                </div>
              </div>

              <InputField
                id="iss-obs"
                label="Observed Friction"
                placeholder="What happened during the test task?"
                value={observation}
                onChange={(e) => setObservation(e.target.value)}
              />

              <InputField
                id="iss-fix"
                label="Proposed UI Improvement"
                placeholder="Concrete token, spacing, or interaction change..."
                value={proposedImprovement}
                onChange={(e) => setProposedImprovement(e.target.value)}
              />

              {issueError && (
                <p className="text-xs font-medium text-[#D9381E] dark:text-[#EF4444]">
                  {issueError}
                </p>
              )}

              <Button type="submit" variant="secondary" size="md" leftIcon={<Plus className="w-4 h-4" />}>
                Log Issue & Improvement
              </Button>
            </form>

            <div className="pt-4 border-t border-[#DEDAD2] dark:border-[#2D3139]">
              {issues.length === 0 ? (
                <div className="p-6 bg-[#F8F7F4] dark:bg-[#121316] border border-dashed border-[#DEDAD2] dark:border-[#2D3139] rounded-[2px] text-center space-y-1.5">
                  <p className="text-sm font-semibold text-[#141413] dark:text-[#F4F3EF]">
                    No usability issues logged yet
                  </p>
                  <p className="text-xs text-[#575550] dark:text-[#A1A1AA]">
                    Issues and proposed improvements added from real test sessions will appear here.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {issues.map((iss) => (
                    <div
                      key={iss.id}
                      className="p-3.5 bg-[#F8F7F4] dark:bg-[#121316] border border-[#DEDAD2] dark:border-[#2D3139] rounded-[2px] flex items-start justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <p className="text-xs font-mono text-[#D9381E] dark:text-[#EF4444]">
                          {iss.severity} · {iss.heuristic}
                        </p>
                        <h4 className="text-sm font-bold text-[#141413] dark:text-[#F4F3EF]">
                          {iss.title}
                        </h4>
                        <p className="text-xs text-[#575550] dark:text-[#A1A1AA]">
                          <strong>Observed:</strong> {iss.observation}
                        </p>
                        <p className="text-xs text-[#15803D] dark:text-[#22C55E]">
                          <strong>Proposed Fix:</strong> {iss.proposedImprovement}
                        </p>
                      </div>
                      <button
                        type="button"
                        aria-label="Delete issue"
                        onClick={() => setIssues((prev) => prev.filter((item) => item.id !== iss.id))}
                        className="text-[#575550] hover:text-[#D9381E] cursor-pointer p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
