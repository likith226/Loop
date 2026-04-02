/**
 * CardDisplay Component
 * Reusable card for displaying tasks or projects in Loop.
 *
 * Props:
 * - title: string (required)
 * - description: string (optional)
 * - tag: string (optional, e.g. "Feature", "Bug")
 * - priority: "low" | "medium" | "high" (optional)
 * - assignee: string (optional, initials or name)
 * - onClick: function (optional, makes card clickable)
 */

const priorityStyles = {
  low: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
  high: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
};

const priorityDot = {
  low: "bg-green-500",
  medium: "bg-yellow-500",
  high: "bg-red-500",
};

function Avatar({ name }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center">
      <span className="text-xs text-white font-medium">{initials}</span>
    </div>
  );
}

export default function CardDisplay({
  title,
  description,
  tag,
  priority,
  assignee,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className={`
        bg-white dark:bg-gray-800
        border border-gray-200 dark:border-gray-700
        rounded-lg shadow-sm
        p-4
        flex flex-col gap-2
        ${onClick ? "cursor-pointer hover:shadow-md hover:border-blue-500 transition" : ""}
      `}
    >
      {/* Top row: tag + priority badge */}
      {(tag || priority) && (
        <div className="flex items-center justify-between">
          {tag && (
            <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-lg">
              {tag}
            </span>
          )}
          {priority && (
            <span
              className={`
                flex items-center gap-1
                text-xs font-medium
                px-2 py-1 rounded-lg
                ${priorityStyles[priority]}
              `}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${priorityDot[priority]}`} />
              {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </span>
          )}
        </div>
      )}

      {/* Title */}
      <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 leading-snug">
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
          {description}
        </p>
      )}

      {/* Bottom row: assignee */}
      {assignee && (
        <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
          <span className="text-xs text-gray-500 dark:text-gray-400">Assigned to</span>
          <div className="flex items-center gap-1">
            <Avatar name={assignee} />
            <span className="text-xs text-gray-700 dark:text-gray-300">{assignee}</span>
          </div>
        </div>
      )}
    </div>
  );
}
