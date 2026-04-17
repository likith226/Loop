import React from "react";
import { useState } from "react";
import { MessageSquare, Send } from "lucide-react";
import SectionLabel from "./SectionLabel";

function CommentsSection({ comments, onAdd }) {
  const [value, setValue] = useState("");

  function handleSubmit() {
    if (!value.trim()) return;
    onAdd(value.trim());
    setValue("");
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 px-2">
        <MessageSquare
          size={15}
          className="shrink-0 text-slate-400 dark:text-[#b4cad6]"
        />
        <SectionLabel>Comments</SectionLabel>
      </div>

      {comments.length === 0 ? (
        <p className="px-3 text-sm text-slate-400 dark:text-[#404750]">
          No comments yet
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {comments.map((c) => (
            <div
              key={c.id}
              className="flex flex-col gap-1 px-3 py-2 rounded-lg
              bg-slate-50 dark:bg-[#282a2d]
              border border-slate-100 dark:border-[#404750]/20"
            >
              <span className="text-xs font-medium text-slate-500 dark:text-[#b4cad6]">
                {c.author}
              </span>
              <p className="text-sm text-slate-900 dark:text-slate-200">
                {c.text}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-2 items-end">
        <textarea
          rows={2}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Write a comment..."
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
          className="flex-1 px-3 py-2 rounded-lg text-sm resize-none outline-none
            transition-colors duration-150
            bg-slate-100      dark:bg-[#282a2d]
            text-slate-900    dark:text-slate-200
            placeholder:text-slate-400 dark:placeholder:text-[#404750]
            ring-1 ring-slate-200 dark:ring-[#404750]/40
            focus:ring-slate-400 dark:focus:ring-[#81cfff]/40"
        />
        <button
          onClick={handleSubmit}
          className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0
            transition-colors duration-150
            bg-slate-900 text-white hover:bg-slate-700
            dark:bg-[#282a2d] dark:text-[#81cfff]
            dark:border dark:border-[#404750]/40
            dark:hover:bg-[#303336]"
        >
          <Send size={14} />
        </button>
      </div>
    </div>
  );
}

export default CommentsSection;
