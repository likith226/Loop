import { useState, useRef, useEffect } from "react";

/**
 * Dropdown Component
 * Reusable dropdown/select menu for Loop project.
 *
 * Props:
 * - options: Array of { label: string, value: string }
 * - value: currently selected value
 * - onChange: function(value) called on selection
 * - placeholder: string (default: "Select an option")
 * - label: string (optional label above dropdown)
 * - disabled: boolean
 */

export default function Dropdown({
  options = [],
  value,
  onChange,
  placeholder = "Select an option",
  label,
  disabled = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(optionValue) {
    onChange(optionValue);
    setIsOpen(false);
  }

  return (
    <div className="relative flex flex-col gap-2 w-full" ref={dropdownRef}>
      {/* Optional label */}
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}

      {/* Trigger button */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        className={`
          w-full
          border border-gray-300 dark:border-gray-600
          bg-white dark:bg-gray-800
          text-sm text-left
          rounded-lg
          px-3 py-2
          flex items-center justify-between
          transition
          focus:outline-none focus:ring-2 focus:ring-blue-500
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-blue-500"}
        `}
      >
        <span
          className={
            selectedOption
              ? "text-gray-800 dark:text-gray-200"
              : "text-gray-400 dark:text-gray-500"
          }
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>

        {/* Chevron icon */}
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown options list */}
      {isOpen && (
        <ul
          className="
            absolute z-50 mt-1
            w-full
            bg-white dark:bg-gray-800
            border border-gray-200 dark:border-gray-700
            rounded-lg shadow-sm
            overflow-hidden
          "
          style={{ marginTop: "0.25rem" }}
        >
          {options.length === 0 ? (
            <li className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
              No options available
            </li>
          ) : (
            options.map((option) => (
              <li
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`
                  px-3 py-2 text-sm cursor-pointer transition
                  ${
                    option.value === value
                      ? "bg-blue-600 text-white"
                      : "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }
                `}
              >
                {option.label}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
