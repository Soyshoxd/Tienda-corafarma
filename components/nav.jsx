'use client';

import { useState } from "react";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <nav className="max-w-6xl mx-auto flex items-center justify-between p-4">

        {/* LOGO */}
        <h1 className="text-2xl font-bold">Droguería</h1>

        {/* ---- MENÚ NORMAL (PC y TABLET) ---- */}
        <ul className="hidden md:flex gap-8 items-center text-lg font-medium">
          <li className="cursor-pointer hover:text-red-600">Inicio</li>
          <li className="cursor-pointer hover:text-red-600">Vitaminas</li>
          <li className="cursor-pointer hover:text-red-600">Dermo</li>
          <li className="cursor-pointer hover:text-red-600">Bebés</li>
          <li className="cursor-pointer hover:text-red-600">Ofertas</li>
        </ul>

        {/* ---- BOTÓN HAMBURGUESA (MOBILE) ---- */}
        <button
          className="md:hidden flex flex-col gap-1 z-50"
          onClick={() => setOpen(!open)}
        >
          <span
            className={`block w-7 h-1 bg-black rounded transition-all duration-300 ${
              open ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-7 h-1 bg-black rounded transition-all duration-300 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-7 h-1 bg-black rounded transition-all duration-300 ${
              open ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>

        {/* ---- SIDEBAR DEL MENÚ (SOLO EN MOBILE) ---- */}
        <div
          className={`fixed top-0 right-0 w-84 h-full bg-white shadow-xl p-6 pt-24 flex flex-col gap-6 text-lg font-medium transition-transform duration-300 md:hidden ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <p className="hover:text-red-600 cursor-pointer">Inicio</p>
          <p className="hover:text-red-600 cursor-pointer">Vitaminas</p>
          <p className="hover:text-red-600 cursor-pointer">Dermo</p>
          <p className="hover:text-red-600 cursor-pointer">Bebés</p>
          <p className="hover:text-red-600 cursor-pointer">Ofertas</p>
        </div>

      </nav>
    </header>
  );
}
