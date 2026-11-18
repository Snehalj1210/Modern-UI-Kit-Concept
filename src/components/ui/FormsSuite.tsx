import React, { useState } from 'react';
import { AlertCircle, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Button, InputField } from './Primitives';

export const FormsSuite: React.FC = () => {
  const [activeForm, setActiveForm] = useState<'login' | 'register' | 'contact'>('login');

  // Login State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginErrors, setLoginErrors] = useState<{ email?: string; password?: string }>({});
  const [loginSubmitted, setLoginSubmitted] = useState(false);

  // Registration State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regOrgCode] = useState('ATELIER-2026-LOCKED');
  const [regErrors, setRegErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});
  const [regSubmitted, setRegSubmitted] = useState(false);

  // Contact State
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactTopic, setContactTopic] = useState('UI Kit Feedback');
  const [contactMessage, setContactMessage] = useState('');
  const [contactErrors, setContactErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const isEmailValid = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: { email?: string; password?: string } = {};
    if (!isEmailValid(loginEmail)) {
      errs.email = 'Enter a valid studio email address (e.g., designer@atelier.org).';
    }
    if (loginPassword.length < 6) {
      errs.password = 'Password must be at least 6 characters.';
    }
    setLoginErrors(errs);
    setLoginSubmitted(Object.keys(errs).length === 0);
  };

  const getPasswordStrength = (pw: string) => {
    if (!pw) return { label: 'Empty', score: 0 };
    let score = 0;
    if (pw.length >= 8) score += 1;
    if (/[A-Z]/.test(pw) && /[0-9]/.test(pw)) score += 1;
    if (/[^A-Za-z0-9]/.test(pw)) score += 1;
    if (score === 0) return { label: 'Weak — add uppercase, numbers, or symbols', score: 1 };
    if (score === 1) return { label: 'Moderate — add a symbol for stronger security', score: 2 };
    if (score === 2) return { label: 'Strong — meets studio security guidelines', score: 3 };
    return { label: 'Very Strong — verified', score: 4 };
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: { name?: string; email?: string; password?: string } = {};
    if (regName.trim().length < 2) {
      errs.name = 'Full name must contain at least 2 characters.';
    }
    if (!isEmailValid(regEmail)) {
      errs.email = 'Enter a valid email address.';
    }
    if (regPassword.length < 8) {
      errs.password = 'Password must contain at least 8 characters.';
    }
    setRegErrors(errs);
    setRegSubmitted(Object.keys(errs).length === 0);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: { name?: string; email?: string; message?: string } = {};
    if (contactName.trim().length < 2) {
      errs.name = 'Please enter your name.';
    }
    if (!isEmailValid(contactEmail)) {
      errs.email = 'Please provide a valid return email address.';
    }
    if (contactMessage.trim().length < 20) {
      errs.message = 'Feedback message must be at least 20 characters for actionable review.';
    }
    setContactErrors(errs);
    setContactSubmitted(Object.keys(errs).length === 0);
  };

  const pwStrength = getPasswordStrength(regPassword);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DEDAD2] dark:border-[#2D3139] pb-4">
        <div className="flex items-center gap-1 p-1 bg-[#EFECE6] dark:bg-[#22252C] rounded-[2px]">
          {[
            { id: 'login' as const, label: '01. Login Form' },
            { id: 'register' as const, label: '02. Registration Form' },
            { id: 'contact' as const, label: '03. Contact & Feedback' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveForm(tab.id)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-[2px] whitespace-nowrap cursor-pointer transition-colors ${
                activeForm === tab.id
                  ? 'bg-white text-[#141413] dark:bg-[#1A1C21] dark:text-[#F4F3EF]'
                  : 'text-[#575550] hover:text-[#141413] dark:text-[#A1A1AA] dark:hover:text-[#F4F3EF]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <p className="text-xs font-mono text-[#575550] dark:text-[#A1A1AA]">
          ARIA Live Validation · Icon + Text Semantics · Keyboard Accessible
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 bg-white dark:bg-[#1A1C21] border border-[#DEDAD2] dark:border-[#2D3139] rounded-[2px] p-6 sm:p-8">
          {activeForm === 'login' && (
            <form onSubmit={handleLoginSubmit} noValidate className="space-y-5">
              <div>
                <h4 className="font-display text-xl font-bold text-[#141413] dark:text-[#F4F3EF]">
                  Studio Sign In
                </h4>
                <p className="text-sm text-[#575550] dark:text-[#A1A1AA] mt-1">
                  Test live error recovery by submitting empty fields, or enter valid credentials to trigger success state.
                </p>
              </div>

              {loginSubmitted && (
                <div
                  role="status"
                  className="p-3.5 bg-[#EFECE6] dark:bg-[#22252C] border border-[#15803D] dark:border-[#22C55E] rounded-[2px] flex items-start gap-2.5 text-sm text-[#15803D] dark:text-[#22C55E]"
                >
                  <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>Credentials validated successfully. Ready to open workspace session.</span>
                </div>
              )}

              <InputField
                id="login-email"
                label="Studio Email"
                type="email"
                required
                placeholder="clara.vogel@atelier.org"
                value={loginEmail}
                onChange={(e) => {
                  setLoginEmail(e.target.value);
                  setLoginSubmitted(false);
                }}
                errorMessage={loginErrors.email}
                successMessage={
                  !loginErrors.email && isEmailValid(loginEmail)
                    ? 'Valid studio email format.'
                    : undefined
                }
                helperText="Use your institutional or studio domain email."
              />

              <InputField
                id="login-password"
                label="Password"
                type="password"
                required
                placeholder="Enter at least 6 characters"
                value={loginPassword}
                onChange={(e) => {
                  setLoginPassword(e.target.value);
                  setLoginSubmitted(false);
                }}
                errorMessage={loginErrors.password}
                helperText="Click the eye icon to toggle password visibility."
              />

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <label className="inline-flex items-center gap-2 text-sm text-[#575550] dark:text-[#A1A1AA] cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 accent-[#1E40AF] rounded-[2px]"
                  />
                  <span>Keep session active for 14 days</span>
                </label>

                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="md"
                    onClick={() => {
                      setLoginEmail('invalid-email');
                      setLoginPassword('123');
                      setLoginErrors({
                        email: 'Enter a valid studio email address (e.g., designer@atelier.org).',
                        password: 'Password must be at least 6 characters.',
                      });
                      setLoginSubmitted(false);
                    }}
                  >
                    Demo Errors
                  </Button>
                  <Button type="submit" variant="primary" size="md">
                    Sign In
                  </Button>
                </div>
              </div>
            </form>
          )}

          {activeForm === 'register' && (
            <form onSubmit={handleRegisterSubmit} noValidate className="space-y-5">
              <div>
                <h4 className="font-display text-xl font-bold text-[#141413] dark:text-[#F4F3EF]">
                  Create Designer Account
                </h4>
                <p className="text-sm text-[#575550] dark:text-[#A1A1AA] mt-1">
                  Demonstrates required fields, real-time warning state for moderate passwords, and a disabled organization token field.
                </p>
              </div>

              {regSubmitted && (
                <div
                  role="status"
                  className="p-3.5 bg-[#EFECE6] dark:bg-[#22252C] border border-[#15803D] dark:border-[#22C55E] rounded-[2px] flex items-start gap-2.5 text-sm text-[#15803D] dark:text-[#22C55E]"
                >
                  <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>Account registration validated for {regName}.</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField
                  id="reg-name"
                  label="Full Name"
                  type="text"
                  required
                  placeholder="Josef Albers"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  errorMessage={regErrors.name}
                  successMessage={
                    !regErrors.name && regName.trim().length >= 2 ? 'Name accepted.' : undefined
                  }
                />
                <InputField
                  id="reg-org"
                  label="Cohort Invitation Code"
                  type="text"
                  state="disabled"
                  value={regOrgCode}
                  helperText="Locked by academic cohort administrator."
                />
              </div>

              <InputField
                id="reg-email"
                label="Work or Academic Email"
                type="email"
                required
                placeholder="j.albers@bauhaus-dessau.edu"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                errorMessage={regErrors.email}
                successMessage={
                  !regErrors.email && isEmailValid(regEmail) ? 'Email verified.' : undefined
                }
              />

              <InputField
                id="reg-password"
                label="Create Password"
                type="password"
                required
                placeholder="Minimum 8 characters"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                errorMessage={regErrors.password}
                warningMessage={
                  !regErrors.password && regPassword.length >= 8 && pwStrength.score < 3
                    ? pwStrength.label
                    : undefined
                }
                successMessage={
                  !regErrors.password && pwStrength.score >= 3 ? pwStrength.label : undefined
                }
                helperText="Use 8+ characters combining uppercase, digits, and a symbol."
              />

              <div className="flex items-center justify-end gap-3 pt-2">
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => {
                    setRegName('');
                    setRegEmail('');
                    setRegPassword('');
                    setRegErrors({});
                    setRegSubmitted(false);
                  }}
                >
                  Reset
                </Button>
                <Button type="submit" variant="primary" size="md">
                  Register Account
                </Button>
              </div>
            </form>
          )}

          {activeForm === 'contact' && (
            <form onSubmit={handleContactSubmit} noValidate className="space-y-5">
              <div>
                <h4 className="font-display text-xl font-bold text-[#141413] dark:text-[#F4F3EF]">
                  Design Critique & Feedback
                </h4>
                <p className="text-sm text-[#575550] dark:text-[#A1A1AA] mt-1">
                  Submit structured UI kit feedback with category tagging and character-length validation.
                </p>
              </div>

              {contactSubmitted && (
                <div
                  role="status"
                  className="p-3.5 bg-[#EFECE6] dark:bg-[#22252C] border border-[#15803D] dark:border-[#22C55E] rounded-[2px] flex items-start gap-2.5 text-sm text-[#15803D] dark:text-[#22C55E]"
                >
                  <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>Feedback submitted under “{contactTopic}”. Thank you for reviewing the kit.</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField
                  id="contact-name"
                  label="Reviewer Name"
                  type="text"
                  required
                  placeholder="Marta Stam"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  errorMessage={contactErrors.name}
                />
                <InputField
                  id="contact-email"
                  label="Return Email"
                  type="email"
                  required
                  placeholder="m.stam@studio.ch"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  errorMessage={contactErrors.email}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="contact-topic"
                  className="text-sm font-semibold text-[#141413] dark:text-[#F4F3EF]"
                >
                  Feedback Category
                </label>
                <select
                  id="contact-topic"
                  value={contactTopic}
                  onChange={(e) => setContactTopic(e.target.value)}
                  className="min-h-[42px] px-3 bg-white dark:bg-[#1A1C21] text-sm text-[#141413] dark:text-[#F4F3EF] border border-[#DEDAD2] dark:border-[#2D3139] rounded-[2px] focus:outline-none focus:border-[#1E40AF] focus:ring-2 focus:ring-[#1E40AF]/20"
                >
                  <option>UI Kit Feedback</option>
                  <option>Accessibility & Contrast Audit</option>
                  <option>Typography & Grid Spacing</option>
                  <option>Prototype Usability Note</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="contact-message"
                    className="text-sm font-semibold text-[#141413] dark:text-[#F4F3EF]"
                  >
                    Observations <span className="text-[#D9381E]">*</span>
                  </label>
                  <span className="text-xs font-mono tabular-nums text-[#575550] dark:text-[#A1A1AA]">
                    {contactMessage.length} / 20 min chars
                  </span>
                </div>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  placeholder="Describe layout clarity, button states, or contrast observations..."
                  aria-invalid={Boolean(contactErrors.message)}
                  className={`w-full p-3 bg-white dark:bg-[#1A1C21] text-sm text-[#141413] dark:text-[#F4F3EF] border rounded-[2px] outline-none transition-all ${
                    contactErrors.message
                      ? 'border-[#D9381E] ring-1 ring-[#D9381E]/25'
                      : 'border-[#DEDAD2] dark:border-[#2D3139] focus:border-[#1E40AF] focus:ring-2 focus:ring-[#1E40AF]/20'
                  }`}
                />
                {contactErrors.message && (
                  <p
                    role="alert"
                    className="flex items-center gap-1.5 text-xs font-medium text-[#D9381E] dark:text-[#EF4444]"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{contactErrors.message}</span>
                  </p>
                )}
              </div>

              <div className="flex justify-end">
                <Button type="submit" variant="primary" size="md">
                  Submit Feedback
                </Button>
              </div>
            </form>
          )}
        </div>

        <aside className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-[#1A1C21] border border-[#DEDAD2] dark:border-[#2D3139] rounded-[2px] p-6 space-y-4">
            <h4 className="font-display text-base font-bold text-[#141413] dark:text-[#F4F3EF]">
              Validation & Accessibility Contract
            </h4>
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-[#EFECE6]/70 dark:bg-[#22252C] rounded-[2px] flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#15803D] dark:text-[#22C55E] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#141413] dark:text-[#F4F3EF]">Success State</p>
                  <p className="text-[#575550] dark:text-[#A1A1AA] mt-0.5">
                    Paired emerald border + check icon + explicit confirmation text.
                  </p>
                </div>
              </div>
              <div className="p-3 bg-[#EFECE6]/70 dark:bg-[#22252C] rounded-[2px] flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-[#B45309] dark:text-[#F59E0B] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#141413] dark:text-[#F4F3EF]">Warning State</p>
                  <p className="text-[#575550] dark:text-[#A1A1AA] mt-0.5">
                    Bauhaus Ochre border + triangle glyph for non-blocking guidance (e.g., moderate passwords).
                  </p>
                </div>
              </div>
              <div className="p-3 bg-[#EFECE6]/70 dark:bg-[#22252C] rounded-[2px] flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-[#D9381E] dark:text-[#EF4444] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#141413] dark:text-[#F4F3EF]">Error State</p>
                  <p className="text-[#575550] dark:text-[#A1A1AA] mt-0.5">
                    Vermilion ring + alert icon + <code className="font-mono">aria-invalid="true"</code> and <code className="font-mono">role="alert"</code>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
