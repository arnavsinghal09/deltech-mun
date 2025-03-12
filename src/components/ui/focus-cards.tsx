"use client";
import Image from "next/image";
import React, { useState } from "react";
import { cn } from "../../lib/utils";
import { LinkPreview } from "./link-preview";
import { Linkedin } from "lucide-react";

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
  }: {
    card: Card;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  }) => (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-60 md:h-96 w-full transition-all duration-300 ease-out",
        hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
      )}
    >
      <Image
        src={card.src}
        alt={card.role}
        fill
        className="object-cover absolute inset-0"
      />
      <div
        className={cn(
          "absolute inset-0 bg-black/50 flex flex-col items-end py-8 px-4 transition-opacity duration-300",
          hovered === index ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="text-xl md:text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200">
          {card.name}
        </div>
        <div className="text-sm md:text-md font-light  bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200">
          {card.role}
        </div>
        {card.linkedin && (
          <div className="mt-4  max-w-xs">
            <LinkPreview url={card.linkedin} className="font-bold text-white">
              <div className="flex items-end gap-2 max-w-sm ">
                <Linkedin size={24} className="text-blue-600 align-middle" />
                <span className="leading-none">{card.name}</span>
              </div>
            </LinkPreview>
          </div>
        )}
      </div>
    </div>
  )
);

Card.displayName = "Card";

type Card = {
  name: string;
  role: string;
  description?: string;
  src: string;
  linkedin?: string;
};

export function FocusCards({ cards }: { cards: Card[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-10 max-w-5xl mx-auto md:px-8 w-full">
      {cards.map((card, index) => (
        <Card
          key={card.name}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </div>
  );
}
