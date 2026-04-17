import React from "react";
import { useState, useEffect, useRef } from "react";
import {
  MoreHorizontal,
  X,
  Tag,
  Calendar,
  SquareCheck,
  UserPlus,
  Paperclip,
} from "lucide-react";
import IconButton from "./CardDetailsModal/IconButton";
import SectionLabel from "./CardDetailsModal/SectionLabel";
import ActionButton from "./CardDetailsModal/ActionButton";
import DescriptionSection from "./CardDetailsModal/DescriptionSection";
import CommentsSection from "./CardDetailsModal/CommentsSection";

const CARD_ACTIONS = [
  { icon: Tag, label: "Labels" },
  { icon: Calendar, label: "Dates" },
  { icon: SquareCheck, label: "Checklist" },
  { icon: UserPlus, label: "Members" },
  { icon: Paperclip, label: "Attachments" },
];

function CardDetailsModal({ card, onClose, onUpdate }) {
  const [editingTitle, setEditingTitle] = useState(false);
  const [cardTitle, setCardTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description || "");
  const [comments, setComments] = useState(card.comments || []);
  const inputRef = useRef();

  useEffect(() => {
    if (editingTitle) inputRef.current?.focus();
  }, [editingTitle]);

  useEffect(() => {
    if (editingTitle && inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = inputRef.current.scrollHeight + "px";
    }
  }, [cardTitle, editingTitle]);

  function handleSaveDescription(value) {
    setDescription(value);
    onUpdate?.({ ...card, description: value });
  }

  function handleAddComment(text) {
    const newComment = { id: Date.now(), author: "You", text };
    const updated = [...comments, newComment];
    setComments(updated);
    onUpdate?.({ ...card, comments: updated });
  }

  function handleSaveTitle() {
    setEditingTitle(false);
    onUpdate?.({ ...card, title: cardTitle });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center
        bg-slate-900/50 dark:bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-3/4 min-w-96 max-h-[80vh] rounded-xl overflow-hidden
          transition-colors duration-150
          bg-white          dark:bg-[#1e2023]
          border border-transparent dark:border-[#404750]/20
          shadow-lifted     dark:shadow-lifted-dark"
        onClick={(e) => {
          e.stopPropagation();
          editingTitle && handleSaveTitle();
        }}
      >
        <div
          className="flex justify-end items-center gap-1 px-3 h-12
          border-b border-slate-100 dark:border-[#404750]/20"
        >
          <IconButton icon={MoreHorizontal} />
          <IconButton icon={X} onClick={onClose} />
        </div>

        <div
          className="flex flex-row overflow-hidden"
          style={{ maxHeight: "calc(80vh - 48px)" }}
        >
          <div className="flex flex-col flex-1 gap-6 p-4 overflow-y-auto">
            {editingTitle ? (
              <textarea
                ref={inputRef}
                className="w-full px-2 py-1 rounded-lg text-xl font-semibold
                  resize-none overflow-hidden break-words outline-none
                  transition-colors duration-150
                  bg-slate-100   dark:bg-[#282a2d]
                  text-slate-900 dark:text-slate-200
                  placeholder:text-slate-400 dark:placeholder:text-[#404750]
                  ring-1 ring-slate-200 dark:ring-[#404750]/40
                  focus:ring-slate-400 dark:focus:ring-[#81cfff]/40"
                value={cardTitle}
                onChange={(e) => setCardTitle(e.target.value)}
                onBlur={handleSaveTitle}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSaveTitle();
                  }
                }}
              />
            ) : (
              <h2
                className="px-2 py-1 rounded-lg text-xl font-semibold cursor-pointer
                  transition-colors duration-150
                  text-slate-900     dark:text-slate-200
                  hover:bg-slate-100 dark:hover:bg-[#282a2d]"
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingTitle(true);
                }}
              >
                {cardTitle}
              </h2>
            )}

            <DescriptionSection
              description={description}
              onSave={handleSaveDescription}
            />

            <CommentsSection comments={comments} onAdd={handleAddComment} />
          </div>

          <div
            className="flex flex-col gap-1 w-48 shrink-0 p-3
            border-l border-slate-100 dark:border-[#404750]/20"
          >
            <SectionLabel>Actions</SectionLabel>
            {CARD_ACTIONS.map((action) => (
              <ActionButton key={action.label} {...action} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardDetailsModal;
