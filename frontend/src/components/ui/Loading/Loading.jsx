/**
 * Loading Component
 * Reusable loading indicator for Loop project.
 *
 * Props:
 * - type: "spinner" | "skeleton" (default: "spinner")
 * - size: "sm" | "md" | "lg" (default: "md") — applies to spinner only
 * - lines: number (default: 3) — number of skeleton lines to show
 * - text: string (optional) — label shown below spinner
 */

const spinnerSizes = {
  sm: "w-4 h-4 border-2",
  md: "w-8 h-8 border-4",
  lg: "w-12 h-12 border-4",
};

function Spinner({ size = "md", text }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div
        className={`
          ${spinnerSizes[size]}
          rounded-full
          border-gray-200 dark:border-gray-700
          border-t-blue-600
          animate-spin
        `}
      />
      {text && (
        <p className="text-sm text-gray-500 dark:text-gray-400">{text}</p>
      )}
    </div>
  );
}

function Skeleton({ lines = 3 }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`
            h-4 rounded-lg
            bg-gray-200 dark:bg-gray-700
            animate-pulse
            ${i === lines - 1 ? "w-3/4" : "w-full"}
          `}
        />
      ))}
    </div>
  );
}

export default function Loading({
  type = "spinner",
  size = "md",
  lines = 3,
  text,
}) {
  if (type === "skeleton") {
    return <Skeleton lines={lines} />;
  }

  return <Spinner size={size} text={text} />;
}
