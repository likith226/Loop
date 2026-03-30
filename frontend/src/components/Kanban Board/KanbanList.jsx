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
        className="mx-3 p-4 w-64 self-start shrink-0 rounded-lg border-2 border-zinc-600 bg-zinc-800 opacity-30"
      >
        <div className="opacity-0">
          <h2 className="text-lg font-bold">{title}</h2>
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
      className="flex flex-col mx-3 p-4 w-64 bg-zinc-900 rounded-lg self-start shrink-0"
    >
      <div className="relative">
        <div className="p-1">
          {editingTitle ? (
            <textarea
              ref={inputRef}
              rows={1}
              className="w-full pr-8 text-lg font-bold text-slate-200 bg-transparent resize-none overflow-hidden break-words outline-none"
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
              className="pr-8 text-lg font-bold text-slate-200 break-words cursor-pointer"
              onClick={() => {
                setEditingTitle(true);
              }}
            >
              {listTitle}
            </h2>
          )}
        </div>

        <button className="absolute top-0 right-0 h-6 w-6 text-slate-200 hover:bg-zinc-700 rounded-md">
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
            className="w-full text-left text-sm text-slate-400 hover:text-slate-200"
          >
            + Add a card
          </button>
        )}
      </div>
    </div>
  );
}

export default KanbanList;
