import React from "react";

function ActionButton({ icon: Icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg w-full
        text-sm font-medium text-left
        transition-colors duration-150
        text-slate-600        dark:text-[#b4cad6]
        hover:bg-slate-100    dark:hover:bg-[#282a2d]
        hover:text-slate-900  dark:hover:text-slate-200"
    >
      <Icon size={14} />
      {label}
    </button>
  );
}

export default ActionButton;
