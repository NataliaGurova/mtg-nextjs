
"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "./SearchBar.module.css";
import { Input } from "../ui/input";
import Image from "next/image";

interface CardSuggestion {
  _id: string;
  name: string;
  set_name: string;
  collector_number: string;
  scryfall_id: string;
  imageUrl: string;
}

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  debounceMs?: number;
}

const SearchBar = ({ className, placeholder = "Search...", debounceMs = 300 }: SearchBarProps) => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState<CardSuggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // const [previewCard, setPreviewCard] = useState<CardSuggestion | null>(null);

  const fetchSuggestions = useCallback(async (query: string) => {
    if (query.length < 3) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    try {
      const res = await fetch(`/api/cards/search?q=${encodeURIComponent(query)}`);
      const data: CardSuggestion[] = await res.json();
      setSuggestions(data);
      setIsOpen(data.length > 0);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => fetchSuggestions(value), debounceMs);
    return () => clearTimeout(timer);
  }, [value, fetchSuggestions, debounceMs]);

  const clearInput = () => {
    setValue("");
    setSuggestions([]);
    setIsOpen(false);
  };

  const handleSelect = (scryfallId: string) => {
    setIsOpen(false);
    setSuggestions([]);
    setValue("");
    router.push(`/singles/${scryfallId}`);
  };

  return (
    <div className={styles.container}>
      <Input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className={cn(styles.input, className)}
      />

      {value && (
        <button type="button" onClick={clearInput} className={styles.clearButton}>
          <X size={16} className="text-gray-400 hover:text-black" />
        </button>
      )}


      {isOpen && (
  <div className={styles.dropdownWrapper}>
    
    <div className={styles.dropdown}>
      {suggestions.map((card) => (
        <button
          key={`${card.scryfall_id}-${card.set_name}-${card.collector_number}`}
          type="button"
          onMouseEnter={() => setHoveredId(card._id)}
          onMouseLeave={() => setHoveredId(null)}
          onClick={() => handleSelect(card.scryfall_id)}
          className={styles.dropdownItem}
        >
            <div className={styles.textContent}>
    <div className={styles.cardName}>{card.name}</div>
    <div className={styles.cardMeta}>
      {card.set_name} • {card.collector_number}
    </div>
          </div>
          
          {/* {hoveredId === card._id && (
    <Image
      src={card.imageUrl}
      alt={card.name}
      width={120}
      height={200}
      className={styles.inlineImage}
    />
  )} */}

        </button>
      ))}
            <div className={styles.imageContainer}>
              {hoveredId && (
                <Image
                  src={suggestions.find((card) => card._id === hoveredId)?.imageUrl || ""}
                  alt={suggestions.find((card) => card._id === hoveredId)?.name || ""}
                  className={styles.inlineImage}
                  width={180}
                  height={260}
                />
              )}
            </div>

    </div>

    {/* {previewCard && (
      <div className={styles.preview}>
        <Image
          src={previewCard.imageUrl}
          alt={previewCard.name}
          className={styles.previewImage}
          width={60}
          height={100}
        />
      </div>
    )} */}

  </div>
)}

      





    </div>
  );
};

export default SearchBar;


