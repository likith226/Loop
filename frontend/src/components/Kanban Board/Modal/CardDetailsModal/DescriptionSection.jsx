import React from "react";
import { useState, useEffect, useRef } from "react";
import { AlignLeft } from "lucide-react";
import SectionLabel from "./SectionLabel";

function DescriptionSection({ description, onSave }) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(description || "");
  const ref = useRef();

  useEffect(() => {
    if (editing) ref.current?.focus();
  }, [editing]);

  function handleSave() {
    onSave(value);
    setEditing(false);
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 px-2">
        <AlignLeft
          size={15}
          className="shrink-0 text-slate-400 dark:text-[#b4cad6]"
        />
        <SectionLabel>Description</SectionLabel>
      </div>

      {editing ? (
        <div className="flex flex-col gap-2">
          <textarea
            ref={ref}
            rows={4}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Add a description..."
            className="w-full px-3 py-2 rounded-lg text-sm resize-none outline-none
              transition-colors duration-150
              bg-slate-100      dark:bg-[#282a2d]
              text-slate-900    dark:text-slate-200
              placeholder:text-slate-400 dark:placeholder:text-[#404750]
              ring-1 ring-slate-200 dark:ring-[#404750]/40
              focus:ring-slate-400 dark:focus:ring-[#81cfff]/40"
          />
          <div className="flex gap-2 px-1">
            <button
              onClick={handleSave}
              className="px-3 py-1.5 rounded-lg text-sm font-semibold
                transition-colors duration-150
                bg-slate-900 text-white hover:bg-slate-700
                dark:bg-[#282a2d] dark:text-[#81cfff]
                dark:border dark:border-[#404750]/40
                dark:hover:bg-[#303336]"
            >
              Save
            </button>
            <button
              onClick={() => {
                setValue(description || "");
                setEditing(false);
              }}
              className="px-3 py-1.5 rounded-lg text-sm
                transition-colors duration-150
                text-slate-500 hover:text-slate-900
                dark:text-[#404750] dark:hover:text-slate-400"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => setEditing(true)}
          className="px-3 py-2 rounded-lg text-sm cursor-pointer min-h-[60px]
            transition-colors duration-150
            bg-slate-100      dark:bg-[#282a2d]
            hover:bg-slate-200 dark:hover:bg-[#303336]
            text-slate-400    dark:text-[#404750]"
        >
          {value || "Add a description..."}
        </div>
      )}
    </div>
  );
}

export default DescriptionSection;
