/**
 * Common UI Components
 * Loading spinners, error messages, and other reusable UI elements
 */

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  message?: string;
}

export function LoadingSpinner({ size = "md", message }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div
        className={`animate-spin rounded-full border-4 border-blue-200 border-t-blue-700 ${sizeClasses[size]}`}
      />
      {message && <p className="mt-4 text-sm text-blue-900/70">{message}</p>}
    </div>
  );
}

interface ErrorMessageProps {
  error: Error;
  onRetry?: () => void;
}

export function ErrorMessage({ error, onRetry }: ErrorMessageProps) {
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
      <div className="inline-flex rounded-xl bg-red-100 p-3 mb-4">
        <svg
          className="h-6 w-6 text-red-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-bold text-red-900 mb-2">
        Oops! Something went wrong
      </h3>
      <p className="text-sm text-red-900/70 mb-4">
        {error.message || "An unexpected error occurred"}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center justify-center rounded-xl bg-red-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-red-800"
        >
          Try Again
        </button>
      )}
    </div>
  );
}

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({
  title,
  description,
  icon,
  action,
}: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-blue-100 bg-blue-50 p-12 text-center">
      {icon && (
        <div className="inline-flex rounded-xl bg-blue-100 p-4 mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-bold text-blue-900 mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-blue-900/70 mb-6 max-w-md mx-auto">
          {description}
        </p>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className="inline-flex items-center justify-center rounded-xl bg-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
