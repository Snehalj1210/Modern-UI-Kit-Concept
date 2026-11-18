import React, { useState } from 'react';
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Eye,
  EyeOff,
  Minus,
  Plus,
  Search,
  X,
} from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'icon';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonState = 'default' | 'hover' | 'active' | 'focus' | 'disabled';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  simulatedState?: ButtonState;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  simulatedState,
  leftIcon,
  rightIcon,
  children,
  className = '',
  disabled,
  type = 'button',
  ...props
}) => {
  const isDisabled = disabled || simulatedState === 'disabled';

  const sizeClasses: Record<ButtonSize, string> = {
    sm: variant === 'icon' ? 'h-9 w-9 p-0' : 'min-h-[36px] px-3 py-1.5 text-xs',
    md: variant === 'icon' ? 'h-10 w-10 p-0' : 'min-h-[40px] px-4 py-2 text-sm',
    lg: variant === 'icon' ? 'h-12 w-12 p-0' : 'min-h-[44px] px-6 py-2.5 text-sm',
  };

  const baseClasses =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-[2px] whitespace-nowrap shrink-0 transition-all duration-150 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E40AF] dark:focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F8F7F4] dark:focus-visible:ring-offset-[#121316] disabled:opacity-45 disabled:cursor-not-allowed disabled:pointer-events-none';

  const variantClasses: Record<ButtonVariant, string> = {
    primary:
      'bg-[#1E40AF] text-white border border-[#1E40AF] hover:bg-[#1E3A8A] active:bg-[#172554] active:translate-y-[1px] dark:bg-[#3B82F6] dark:border-[#3B82F6] dark:text-[#0B0F19] dark:hover:bg-[#60A5FA] dark:active:bg-[#2563EB]',
    secondary:
      'bg-[#141413] text-[#F8F7F4] border border-[#141413] hover:bg-[#2C2C2A] active:bg-[#000000] active:translate-y-[1px] dark:bg-[#F4F3EF] dark:text-[#121316] dark:border-[#F4F3EF] dark:hover:bg-[#E4E2DC]',
    outline:
      'bg-transparent text-[#141413] border border-[#141413] hover:bg-[#EFECE6] active:bg-[#DEDAD2] active:translate-y-[1px] dark:text-[#F4F3EF] dark:border-[#52525B] dark:hover:bg-[#22252C] dark:active:bg-[#2D3139]',
    ghost:
      'bg-transparent text-[#141413] border border-transparent hover:bg-[#EFECE6] active:bg-[#DEDAD2] dark:text-[#F4F3EF] dark:hover:bg-[#22252C] dark:active:bg-[#2D3139]',
    icon:
      'bg-white text-[#141413] border border-[#DEDAD2] hover:border-[#141413] hover:bg-[#EFECE6] active:translate-y-[1px] dark:bg-[#1A1C21] dark:text-[#F4F3EF] dark:border-[#2D3139] dark:hover:border-[#A1A1AA] dark:hover:bg-[#22252C]',
  };

  const forcedStateClasses: Record<ButtonState, string> = {
    default: '',
    hover:
      variant === 'primary'
        ? 'bg-[#1E3A8A] dark:bg-[#60A5FA]'
        : variant === 'secondary'
          ? 'bg-[#2C2C2A] dark:bg-[#E4E2DC]'
          : variant === 'outline' || variant === 'ghost'
            ? 'bg-[#EFECE6] dark:bg-[#22252C]'
            : 'bg-[#EFECE6] border-[#141413] dark:bg-[#22252C] dark:border-[#A1A1AA]',
    active: 'translate-y-[1px] ring-1 ring-inset ring-black/20 dark:ring-white/20',
    focus:
      'ring-2 ring-[#1E40AF] dark:ring-[#3B82F6] ring-offset-2 ring-offset-[#F8F7F4] dark:ring-offset-[#121316]',
    disabled: 'opacity-45 cursor-not-allowed',
  };

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${
        simulatedState ? forcedStateClasses[simulatedState] : ''
      } ${className}`}
      {...props}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
};

export type InputFieldType = 'text' | 'email' | 'password' | 'search' | 'number';
export type InputState = 'default' | 'focus' | 'error' | 'success' | 'warning' | 'disabled';

export interface InputFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  id: string;
  label: string;
  type?: InputFieldType;
  state?: InputState;
  helperText?: string;
  errorMessage?: string;
  successMessage?: string;
  warningMessage?: string;
  onClearSearch?: () => void;
  onNumberStep?: (nextValue: number) => void;
}

export const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type = 'text',
  state = 'default',
  helperText,
  errorMessage,
  successMessage,
  warningMessage,
  required,
  disabled,
  value,
  onChange,
  onClearSearch,
  onNumberStep,
  className = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isDisabled = disabled || state === 'disabled';
  const effectiveState: InputState = isDisabled
    ? 'disabled'
    : errorMessage
      ? 'error'
      : warningMessage
        ? 'warning'
        : successMessage
          ? 'success'
          : state;

  const resolvedHtmlType =
    type === 'password' ? (showPassword ? 'text' : 'password') : type === 'search' ? 'text' : type;

  const borderStateClasses: Record<InputState, string> = {
    default:
      'border-[#DEDAD2] dark:border-[#2D3139] hover:border-[#A8A29E] dark:hover:border-[#52525B] focus:border-[#1E40AF] dark:focus:border-[#3B82F6] focus:ring-2 focus:ring-[#1E40AF]/20 dark:focus:ring-[#3B82F6]/25',
    focus:
      'border-[#1E40AF] dark:border-[#3B82F6] ring-2 ring-[#1E40AF]/25 dark:ring-[#3B82F6]/30',
    error:
      'border-[#D9381E] dark:border-[#EF4444] ring-1 ring-[#D9381E]/25 focus:border-[#D9381E] focus:ring-2 focus:ring-[#D9381E]/25',
    warning:
      'border-[#B45309] dark:border-[#F59E0B] ring-1 ring-[#B45309]/25 focus:border-[#B45309] focus:ring-2 focus:ring-[#B45309]/25',
    success:
      'border-[#15803D] dark:border-[#22C55E] ring-1 ring-[#15803D]/20 focus:border-[#15803D] focus:ring-2 focus:ring-[#15803D]/25',
    disabled:
      'border-[#DEDAD2] dark:border-[#2D3139] bg-[#EFECE6] dark:bg-[#16181D] text-[#78716C] dark:text-[#71717A] cursor-not-allowed opacity-75',
  };

  const handleStep = (delta: number) => {
    if (isDisabled) return;
    const currentNum = Number(value ?? 0) || 0;
    const nextVal = currentNum + delta;
    if (onNumberStep) {
      onNumberStep(nextVal);
    } else if (onChange) {
      const syntheticEvent = {
        target: { value: String(nextVal) },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    }
  };

  const describedById = `${id}-feedback`;

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <div className="flex items-center justify-between gap-2">
        <label
          htmlFor={id}
          className="text-sm font-semibold text-[#141413] dark:text-[#F4F3EF] flex items-center gap-1"
        >
          <span>{label}</span>
          {required && (
            <span className="text-[#D9381E] dark:text-[#EF4444]" aria-hidden="true">
              *
            </span>
          )}
        </label>
        {required && (
          <span className="text-[11px] font-mono text-[#575550] dark:text-[#A1A1AA]">
            Required
          </span>
        )}
      </div>

      <div className="relative flex items-center">
        {type === 'search' && (
          <Search
            className="w-4 h-4 text-[#575550] dark:text-[#A1A1AA] absolute left-3 pointer-events-none"
            aria-hidden="true"
          />
        )}

        <input
          id={id}
          type={resolvedHtmlType}
          value={value}
          onChange={onChange}
          disabled={isDisabled}
          required={required}
          aria-invalid={effectiveState === 'error'}
          aria-describedby={describedById}
          className={`w-full min-h-[42px] bg-white dark:bg-[#1A1C21] text-sm text-[#141413] dark:text-[#F4F3EF] placeholder:text-[#78716C] dark:placeholder:text-[#71717A] border rounded-[2px] outline-none transition-all duration-150 ${
            type === 'search' ? 'pl-9' : 'pl-3'
          } ${
            type === 'password' || type === 'number' || (type === 'search' && value)
              ? 'pr-20'
              : 'pr-3'
          } ${type === 'number' ? 'font-mono tabular-nums' : ''} ${
            borderStateClasses[effectiveState]
          }`}
          {...props}
        />

        {type === 'password' && (
          <button
            type="button"
            disabled={isDisabled}
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="absolute right-2 h-8 w-8 inline-flex items-center justify-center text-[#575550] hover:text-[#141413] dark:text-[#A1A1AA] dark:hover:text-[#F4F3EF] rounded-[2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E40AF] cursor-pointer disabled:pointer-events-none"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}

        {type === 'search' && Boolean(value) && onClearSearch && !isDisabled && (
          <button
            type="button"
            onClick={onClearSearch}
            aria-label="Clear search query"
            className="absolute right-2 h-7 w-7 inline-flex items-center justify-center text-[#575550] hover:text-[#141413] dark:text-[#A1A1AA] dark:hover:text-[#F4F3EF] rounded-[2px] cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}

        {type === 'number' && (
          <div className="absolute right-1.5 flex items-center gap-0.5">
            <button
              type="button"
              disabled={isDisabled}
              onClick={() => handleStep(-1)}
              aria-label={`Decrease ${label}`}
              className="h-7 w-7 inline-flex items-center justify-center border border-[#DEDAD2] dark:border-[#2D3139] bg-[#F8F7F4] dark:bg-[#22252C] text-[#141413] dark:text-[#F4F3EF] hover:bg-[#EFECE6] dark:hover:bg-[#2D3139] rounded-[2px] cursor-pointer disabled:opacity-40"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              disabled={isDisabled}
              onClick={() => handleStep(1)}
              aria-label={`Increase ${label}`}
              className="h-7 w-7 inline-flex items-center justify-center border border-[#DEDAD2] dark:border-[#2D3139] bg-[#F8F7F4] dark:bg-[#22252C] text-[#141413] dark:text-[#F4F3EF] hover:bg-[#EFECE6] dark:hover:bg-[#2D3139] rounded-[2px] cursor-pointer disabled:opacity-40"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      <div id={describedById} className="min-h-[18px] text-xs leading-snug">
        {effectiveState === 'error' && (
          <p
            role="alert"
            className="flex items-start gap-1.5 font-medium text-[#D9381E] dark:text-[#EF4444]"
          >
            <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" aria-hidden="true" />
            <span>{errorMessage || 'Please enter a valid value.'}</span>
          </p>
        )}
        {effectiveState === 'warning' && (
          <p className="flex items-start gap-1.5 font-medium text-[#B45309] dark:text-[#F59E0B]">
            <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" aria-hidden="true" />
            <span>{warningMessage}</span>
          </p>
        )}
        {effectiveState === 'success' && (
          <p className="flex items-start gap-1.5 font-medium text-[#15803D] dark:text-[#22C55E]">
            <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0" aria-hidden="true" />
            <span>{successMessage || 'Verified and formatted correctly.'}</span>
          </p>
        )}
        {(effectiveState === 'default' ||
          effectiveState === 'focus' ||
          effectiveState === 'disabled') &&
          helperText && (
            <p className="text-[#575550] dark:text-[#A1A1AA]">{helperText}</p>
          )}
      </div>
    </div>
  );
};
