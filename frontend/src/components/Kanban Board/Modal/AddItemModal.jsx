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
        className="
      w-full p-3 rounded-lg
      text-sm resize-none outline-none
      transition-colors duration-150

      bg-white              dark:bg-[#1e2023]
      text-slate-900        dark:text-slate-200
      placeholder:text-slate-400 dark:placeholder:text-[#404750]

      ring-1
      ring-slate-200        dark:ring-[#404750]/40
      focus:ring-slate-400  dark:focus:ring-[#81cfff]/40
    "
      />

      <div className="flex gap-2 mt-2">
        <button
          onClick={() => {
            if (!value.trim()) return;
            onAdd(value);
            setValue("");
          }}
          className="
        px-3 py-1.5 rounded-lg text-sm font-semibold
        transition-colors duration-150

bg-slate-900 text-white
        hover:bg-slate-700

        dark:bg-[#282a2d] dark:text-white
        dark:border dark:border-[#404750]/40
        dark:hover:bg-[#303336] dark:hover:border-[#81cfff]/30
      "
        >
          Add
        </button>

        <button
          onClick={onClose}
          className="
        px-3 py-1.5 rounded-lg text-sm
        transition-colors duration-150

        text-slate-500        dark:text-[#b4cad6]
        hover:text-slate-700  dark:hover:text-slate-200
      "
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default AddItemModal;
