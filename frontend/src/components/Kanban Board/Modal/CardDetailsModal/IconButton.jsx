import React from "react";

function IconButton({ icon: Icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center w-7 h-7 rounded-lg
        transition-colors duration-150
        text-slate-400        dark:text-[#b4cad6]
        hover:bg-slate-100    dark:hover:bg-[#282a2d]
        hover:text-slate-700  dark:hover:text-slate-200"
    >
      <Icon size={15} />
    </button>
  );
}

export default IconButton;
