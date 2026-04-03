import { useState, useRef, useEffect } from "react";
import AddItemModal from "./Modal/AddItemModal";
import { useSortable } from "@dnd-kit/react/sortable";
import { CollisionPriority } from "@dnd-kit/abstract";

function KanbanList({ id, index, title, children, handleAddCardToList }) {
  const { ref, handleRef, isDragging } = useSortable({
    id,
    index,
    type: "List",
    collisionPriority: CollisionPriority.Low,
    accept: ["Card", "List"],
    activationConstraints: {
      distance: { value: 8 },
    },
  });

  const [listTitle, setListTitle] = useState(title);
  const [editingTitle, setEditingTitle] = useState(false);
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const inputRef = useRef();

  function handleAddCard(title) {
    const newCard = {
      id: Date.now(),
      title,
    };
    handleAddCardToList(id, newCard);

    setShowAddCardModal(false);
  }

  useEffect(() => {
    if (editingTitle) {
      inputRef.current?.focus();
    }
  }, [editingTitle]);

  useEffect(() => {
    if (editingTitle && inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = inputRef.current.scrollHeight + "px";
    }
  }, [listTitle, editingTitle]);

  if (isDragging) {
    return (
      <div
        ref={ref}
        className="
        mx-3 p-4 w-64 self-start shrink-0 rounded-xl
        border-2 border-dashed opacity-40

        border-slate-300  bg-slate-100
        dark:border-[#404750] dark:bg-[#1a1c1f]
      "
      >
        <div className="opacity-0">
          <h2 className="text-lg font-semibold">{title}</h2>
          <div className="-mx-2 mt-2">{children}</div>
          <div className="mt-2 px-4">
            <button className="w-full text-left text-sm">+ Add a card</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="
      flex flex-col mx-3 p-4 w-64 self-start shrink-0 rounded-xl
      transition-colors duration-150

      bg-slate-200
      dark:bg-[#1a1c1f]
    "
    >
      <div className="relative">
        <div className="p-1">
          {editingTitle ? (
            <textarea
              ref={inputRef}
              rows={1}
              className="
              w-full pr-8 text-base font-semibold
              bg-transparent resize-none overflow-hidden
              break-words outline-none

              text-slate-900        dark:text-slate-200
              placeholder:text-slate-400 dark:placeholder:text-[#b4cad6]
            "
              value={listTitle}
              onChange={(e) => setListTitle(e.target.value)}
              onBlur={() => setEditingTitle(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  setEditingTitle(false);
                }
              }}
            />
          ) : (
            <h2
              className="
              pr-8 text-base font-semibold break-words cursor-pointer
              transition-colors duration-150

              text-slate-900        dark:text-slate-200
            "
              onClick={() => {
                setEditingTitle(true);
              }}
            >
              {listTitle}
            </h2>
          )}
        </div>
        <button
          className="
          absolute top-0 right-0 h-6 w-6 rounded-md
          flex items-center justify-center text-sm
          transition-colors duration-150

          text-slate-400        dark:text-[#b4cad6]
          hover:bg-slate-300    dark:hover:bg-[#282a2d]
          hover:text-slate-700  dark:hover:text-slate-200
        "
        >
          ⋮
        </button>
      </div>

      <div className="-mx-2 mt-2">{children}</div>

      <div className="mt-2 px-4">
        {showAddCardModal ? (
          <AddItemModal
            onAdd={handleAddCard}
            onClose={() => setShowAddCardModal(false)}
            type={"Card"}
          />
        ) : (
          <button
            onClick={() => setShowAddCardModal(true)}
            className="
            w-full text-left text-sm
            transition-colors duration-150

            text-slate-400        dark:text-[#b4cad6]
            hover:text-primary    dark:hover:text-[#81cfff]
          "
          >
            + Add a card
          </button>
        )}
      </div>
    </div>
  );
}

export default KanbanList;
