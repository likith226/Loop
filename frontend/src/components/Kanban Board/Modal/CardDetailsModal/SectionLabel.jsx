import React from "react";

function SectionLabel({ children }) {
  return (
    <p
      className="px-2 pb-1 text-xs font-medium uppercase tracking-widest
      text-slate-400 dark:text-[#404750]"
    >
      {children}
    </p>
  );
}

export default SectionLabel;
