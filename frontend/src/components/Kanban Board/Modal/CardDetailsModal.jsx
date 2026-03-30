import React from "react";

function CardDetailsModal({ card, onClose }) {
  return (
    <div
      className="fixed inset-0 bg-slate-900/50  flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 w-96"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">{card.title}</h2>
        <p className="text-gray-700 mb-4">{card.description}</p>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default CardDetailsModal;
