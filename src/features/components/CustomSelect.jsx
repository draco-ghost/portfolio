import { useState, useRef, useEffect } from "react";

import React from 'react'
import { IoMdArrowDropdown } from "react-icons/io";

export default function CustomSelect({ value, onChange, options, label }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selected = options.find(opt => opt.value === value);

    return (
        <div className="relative w-40" ref={ref}>
            {/* Trigger */}
            <button
                onClick={() => setOpen(prev => !prev)}
                className="w-full px-3 py-2 bg-zinc-800
            text-green-400 rounded-md flex gap-2 justify-between items-center
            hover:bg-zinc-700">
                <span className="w-full">{selected?.label || label}</span>
                <span className="text-xs"><IoMdArrowDropdown /></span>
            </button>
            {/* Dropdown */}
            {open && (
                <div
                    className="absolute left-0 mt-1 bg-zinc-800
                    border border-green-400/40 rounded-md w-40 overflow-hidden shadow-lg z-50">
                    {options.map(opt => (
                        <div
                            key={opt.value}
                            onClick={() => {
                                onChange({ target: { value: opt.value } });
                                setOpen(false);
                            }}
                            className="px-3 py-2 cursor-pointer text-green-400
                        hover:bg-green-500/20 hover:text-green-300 transition w-40">
                            {opt.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}