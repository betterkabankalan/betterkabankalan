/**
 * Common UI Components
 * Error messages and empty states — reusable across all pages.
 * Note: LoadingSpinner removed. Use Tailwind's animate-spin inline if needed.
 */

// ─── ErrorMessage ─────────────────────────────────────────────────────────────

interface ErrorMessageProps {
  error: Error;
  onRetry?: () => void;
}

export function ErrorMessage({ error, onRetry }: ErrorMessageProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center">
      <div className="inline-flex rounded-xl bg-gray-100 p-3 mb-4">
        <svg
          className="h-6 w-6 text-gray-500"
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
      <h3 className="text-lg font-bold text-gray-900 mb-2">
        Something went wrong
      </h3>
      <p className="text-sm text-gray-500 mb-4">
        {error.message || "An unexpected error occurred"}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center justify-center rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-700"
        >
          Try Again
        </button>
      )}
    </div>
  );
}

// ─── EmptyState ───────────────────────────────────────────────────────────────

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ title, description, icon, action }: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center">
      {icon && (
        <div className="inline-flex rounded-xl bg-gray-100 p-4 mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto leading-relaxed">
          {description}
        </p>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className="inline-flex items-center justify-center rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-700"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}