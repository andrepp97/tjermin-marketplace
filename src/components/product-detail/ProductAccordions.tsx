'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItem {
  id: string;
  title: string;
  content: string;
}

interface ProductAccordionsProps {
  items: AccordionItem[];
}

export const ProductAccordions: React.FC<ProductAccordionsProps> = ({ items }) => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setOpenSection((prev) => (prev === id ? null : id));
  };

  return (
    <div className="border-t border-slate-200 divide-y divide-slate-100">
      {items.map((item) => {
        const isOpen = openSection === item.id;
        return (
          <div key={item.id}>
            <button
              onClick={() => toggleAccordion(item.id)}
              className="w-full py-4 flex items-center justify-between text-left text-xs font-semibold text-slate-800 hover:text-slate-900"
            >
              <span>{item.title}</span>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''
                  }`}
              />
            </button>
            {isOpen && (
              <div className="pb-4 text-xs text-slate-500 leading-relaxed">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};