import { useState, useEffect, useRef } from "react";

function AddItemModal({ onAdd, onClose, type }) {
  const [value, setValue] = useState("");
  const modalRef = useRef();

  useEffect(() => {
    function handleClickOutside(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div className="mt-2" ref={modalRef}>
      <textarea
        autoFocus
        rows={2}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={`Enter ${type} title...`}
        className="w-full p-2 rounded bg-zinc-700 text-slate-200 outline-none resize-none"
      />

      <div className="flex gap-2 mt-2">
        <button
          onClick={() => {
            if (!value.trim()) return;
            onAdd(value);
            setValue("");
          }}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          Add
        </button>

        <button
          onClick={onClose}
          className="px-3 py-1 text-slate-300 hover:text-white"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default AddItemModal;
