import React, { useState } from "react";
import { useSortable } from "@dnd-kit/react/sortable";
import { Pencil, Plus, MoreVertical } from "lucide-react";

function KanbanCard({ id, index, list, title, onCardClick }) {
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
        <div
          className="
          p-4 rounded-lg
          border-2 border-dashed
          border-slate-300   dark:border-[#404750]
          invisible
        "
        >
          {title}
        </div>
      ) : (
        <div
          className="
            group relative
            flex items-center gap-2
            p-4 rounded-lg
            cursor-pointer
            transition-colors duration-150

            bg-white
            hover:bg-slate-100
            border border-transparent
            hover:border-slate-300/[.15]

            dark:bg-[#1e2023]
            dark:hover:bg-[#282a2d]
            dark:border-[#404750]/20
          "
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => onCardClick(id)}
        >
          <button
            className="
              flex items-center justify-center
              w-5 h-5 rounded-full border-2 shrink-0 text-xs
              transition-colors duration-150
              opacity-0 group-hover:opacity-100

              border-slate-200
              text-transparent
              bg-transparent
              group-hover:border-slate-400
              group-hover:text-slate-400/50

              dark:border-[#404750]
              dark:group-hover:border-green-400/60 dark:group-hover:text-green-400/40

              aria-pressed:border-green-400 aria-pressed:bg-green-400 aria-pressed:text-white

              dark:aria-pressed:border-green-400 dark:aria-pressed:bg-green-400 dark:aria-pressed:text-white
            "
            aria-pressed={checked}
            onClick={(e) => {
              e.stopPropagation();
              setChecked((c) => !c);
            }}
          >
            ✓
          </button>
          <span
            className={`
              flex-1 font-sans text-sm leading-relaxed
              transition-all duration-150
              ${
                checked
                  ? "line-through text-slate-400 dark:text-[#404750]"
                  : "text-slate-900 dark:text-slate-200"
              }
            `}
          >
            {title}
          </span>
          <Pencil
            size={12}
            className="
              opacity-0 group-hover:opacity-100
              text-slate-400         dark:text-[#b4cad6]
              hover:text-slate-700   dark:hover:text-[#81cfff]
            "
            onClick={(e) => {
              e.stopPropagation();
              onCardClick(id);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default KanbanCard;
