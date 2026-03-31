import { useState } from "react";

/**
 * Tabs Component
 * Reusable tab navigation for Loop project.
 *
 * Props:
 * - tabs: Array of { label: string, content: ReactNode }
 * - defaultTab: number (index, default: 0)
 */

export default function Tabs({ tabs = [], defaultTab = 0 }) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  if (tabs.length === 0) return null;

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Tab headers */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`
              px-4 py-2
              text-sm font-medium
              transition
              focus:outline-none
              -mb-px border-b-2
              ${
                activeTab === index
                  ? "border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-300"
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="text-sm text-gray-700 dark:text-gray-300">
        {tabs[activeTab]?.content}
      </div>
    </div>
  );
}
