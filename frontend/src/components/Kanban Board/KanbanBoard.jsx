import React, { useState } from "react";
import { DragDropProvider, DragOverlay } from "@dnd-kit/react";
import KanbanList from "./KanbanList";
import KanbanCard from "./KanbanCard";
import AddItemModal from "./Modal/AddItemModal";
import CardDetailsModal from "./Modal/CardDetailsModal";

// Temporary data, will be replaced by API calls in the future.
const data = [
  {
    id: "1L",
    title: "to-do",
    cards: [
      {
        id: "11C",
        title: "Task 1",
      },
      {
        id: "12C",
        title: "Task 2",
      },
      {
        id: "13C",
        title: "Task 3",
      },
      {
        id: "14C",
        title: "Task 4",
      },
    ],
  },
  {
    id: "2L",
    title: "in-progress",
    cards: [
      {
        id: "21C",
        title: "Task 1",
      },
      {
        id: "22C",
        title: "Task 2",
      },
      {
        id: "23C",
        title: "Task 3",
      },
      {
        id: "24C",
        title: "Task 4",
      },
    ],
  },
  {
    id: "3L",
    title: "done",
    cards: [
      {
        id: "31C",
        title: "Task 1",
      },
      {
        id: "32C",
        title: "Task 2",
      },
      {
        id: "33C",
        title: "Task 3",
      },
      {
        id: "34C",
        title: "Task 4",
      },
    ],
  },
];

// This is temporary component, will be replaced by a page in the future.
function KanbanBoard() {
  const [lists, setLists] = useState(data);
  const [showAddListModal, setShowAddListModal] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);

  function handleCardClick(cardId) {
    const card = lists.flatMap((l) => l.cards).find((c) => c.id === cardId);
    setSelectedCard(card);
  }

  function handleAddCardToList(listId, newCard) {
    setLists((prev) =>
      prev.map((list) => {
        if (list.id === listId) {
          return {
            ...list,
            cards: [...list.cards, newCard],
          };
        }
        return list;
      }),
    );
  }

  function handleAddList(title) {
    const newList = {
      id: `${Date.now()}L`,
      title,
      cards: [],
    };
    setLists((prev) => [...prev, newList]);
    setShowAddListModal(false);
  }

  function handleDragOver(event) {
    const { source, target } = event.operation;
    if (!source || !target) return;
    if (source.id === target.id) return;

    setLists((prev) => {
      const sourceListIndex = prev.findIndex((l) =>
        l.cards.some((c) => c.id === source.id),
      );
      const targetListIndex = prev.findIndex(
        (l) => l.id === target.id || l.cards.some((c) => c.id === target.id),
      );

      if (sourceListIndex === -1 || targetListIndex === -1) return prev;

      const newLists = prev.map((l) => ({ ...l, cards: [...l.cards] }));
      const sourceList = newLists[sourceListIndex];
      const targetList = newLists[targetListIndex];

      const cardIndex = sourceList.cards.findIndex((c) => c.id === source.id);
      const targetCardIndex = targetList.cards.findIndex(
        (c) => c.id === target.id,
      );

      if (
        sourceListIndex === targetListIndex &&
        cardIndex === targetCardIndex - 1
      )
        return prev;

      const [card] = sourceList.cards.splice(cardIndex, 1);

      if (targetCardIndex === -1) {
        targetList.cards.push(card);
      } else {
        targetList.cards.splice(targetCardIndex, 0, card);
      }

      return newLists;
    });
  }

  return (
    <>
      <DragDropProvider
        onDragStart={(event) => {
          const { source } = event.operation;
          const draggedList = lists.find((l) => l.id === source.id);
          const draggedCard = lists
            .flatMap((l) => l.cards)
            .find((c) => c.id === source.id);
          setDraggedItem(draggedList || draggedCard || null);
        }}
        onDragEnd={() => setDraggedItem(null)}
        onDragOver={(event) => handleDragOver(event)}
      >
        <div className="h-screen overflow-x-auto">
          <div className="flex flex-row justify-even w-max">
            {lists.map((list, index) => (
              <KanbanList
                key={list.id}
                id={list.id}
                title={list.title}
                index={index}
                handleAddCardToList={handleAddCardToList}
                isDragging={draggedItem === list.id}
              >
                {list.cards.map((card, index) => (
                  <KanbanCard
                    key={card.id}
                    id={card.id}
                    index={index}
                    list={list.id}
                    title={card.title}
                    isDragging={draggedItem === card.id}
                    onCardClick={handleCardClick}
                  />
                ))}
              </KanbanList>
            ))}
            <div className="p-4">
              {showAddListModal ? (
                <AddItemModal
                  onAdd={handleAddList}
                  onClose={() => setShowAddListModal(false)}
                  type={"List"}
                />
              ) : (
                <button
                  onClick={() => setShowAddListModal(true)}
                  className="w-64 px-4 py-2 rounded-lg bg-zinc-700 text-slate-200 opacity-80 hover:bg-zinc-600 hover:opacity-50 transition-colors"
                >
                  + Add List
                </button>
              )}
            </div>
          </div>
        </div>

        <DragOverlay>
          {draggedItem &&
            (draggedItem.cards ? (
              <div
                className="
                  flex flex-col p-4 w-64 rounded-xl
                  opacity-90 rotate-2
                  transition-colors duration-150

                  bg-slate-200        dark:bg-[#1a1c1f]
                  shadow-lifted       dark:shadow-lifted-dark
                "
              >
                <h2
                  className="
                    text-base font-semibold mb-2
                    text-primary        dark:text-slate-200
                  "
                >
                  {draggedItem.title}
                </h2>
                <div className="mt-2 space-y-2">
                  {draggedItem.cards.map((card) => (
                    <div
                      key={card.id}
                      className="
                        p-4 rounded-lg text-sm

                        bg-white            dark:bg-[#1e2023]
                        text-slate-900      dark:text-slate-200
                      "
                    >
                      {card.title}
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setShowAddCardModal(true)}
                  className="
                    mt-2 w-full text-left text-sm
                    transition-colors duration-150

                    text-slate-400      dark:text-[#b4cad6]
                  "
                >
                  + Add a card
                </button>
              </div>
            ) : (
              <div
                className="
                  flex items-center gap-2
                  p-4 rounded-lg text-sm
                  opacity-90 rotate-2 cursor-grabbing
                  transition-colors duration-150

                  bg-white            dark:bg-[#1e2023]
                  text-slate-900      dark:text-slate-200
                  shadow-lifted       dark:shadow-lifted-dark
                "
              >
                {draggedItem.title}
              </div>
            ))}
        </DragOverlay>
      </DragDropProvider>
      {selectedCard && (
        <CardDetailsModal
          card={selectedCard}
          onClose={() => setSelectedCard(null)}
        />
      )}
    </>
  );
}

export default KanbanBoard;
