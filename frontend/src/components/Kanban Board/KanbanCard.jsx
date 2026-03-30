import React, { useState } from "react";
import { useSortable } from "@dnd-kit/react/sortable";

function KanbanCard({ id, index, list, title }) {
  const [checked, setChecked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { ref, isDragging } = useSortable({
    id,
    index,
    type: "Card",
    accept: "Card",
    group: list,
  });

  return (
    <div ref={ref} className="my-2">
      {isDragging ? (
        <div className="p-2 rounded-lg border-2 border-dashed border-zinc-500 invisible">
          {title}
        </div>
      ) : (
        <div
          className="group relative p-2 rounded-lg bg-zinc-600 cursor-pointer flex items-center gap-2"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <button
            className={`flex items-center justify-center w-5 h-5 rounded-full border-2 shrink-0 text-xs transition-colors
              ${
                hovered || checked
                  ? checked
                    ? "border-blue-500 bg-blue-500 text-white"
                    : "border-zinc-400 text-transparent group-hover:border-blue-400 group-hover:text-blue-400"
                  : "invisible"
              }`}
            onClick={(e) => {
              e.stopPropagation();
              setChecked((c) => !c);
            }}
          >
            ✓
          </button>
          <span
            className={`flex-1 text-slate-200 transition-all ${checked ? "line-through text-zinc-400" : ""}`}
          >
            {title}
          </span>
          <button
            className="hidden group-hover:flex items-center justify-center w-6 h-6 rounded hover:bg-zinc-500 text-slate-400 hover:text-slate-200 shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            ✎
          </button>
        </div>
      )}
    </div>
  );
}

export default KanbanCard;
