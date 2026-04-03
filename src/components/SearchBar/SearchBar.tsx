// src/components/SearchBar/SearchBar.tsx

// "use client";

import { useState, useEffect, useCallback, useRef, ChangeEvent, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "./SearchBar.module.css";
import { Input } from "../ui/input";
import Image from "next/image";
import { CardListItem } from "@/types/cards";

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  debounceMs?: number;
}

const SearchBar = ({ className, placeholder = "Search...", debounceMs = 300 }: SearchBarProps) => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState<CardListItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // ID карты для показа картинки сбоку
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  
  // Индекс для навигации с клавиатуры
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  // Ссылка для отслеживания клика вне окна
  const wrapperRef = useRef<HTMLDivElement>(null);

  const fetchSuggestions = useCallback(async (query: string) => {
    if (query.trim().length < 3) {
      setSuggestions([]);
      setIsOpen(false);
      setHoveredId(null);
      return;
    }
    
    try {
      const res = await fetch(`/api/cards/search?q=${encodeURIComponent(query.trim())}`);
      const data: CardListItem[] = await res.json();
      setSuggestions(data);
      setIsOpen(data.length > 0);
      setSelectedIndex(-1); // Сбрасываем клавиатурный фокус при новом поиске
    } catch (err: unknown) {
      console.error("Ошибка поиска:", err);
    }
  }, []);
  
  useEffect(() => {
    const timer = setTimeout(() => fetchSuggestions(value), debounceMs);
    return () => clearTimeout(timer);
  }, [value, fetchSuggestions, debounceMs]);

  // Закрытие при клике ВНЕ компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Синхронизация клавиатуры и всплывающей картинки
  useEffect(() => {
    if (selectedIndex >= 0 && suggestions[selectedIndex]) {
      setHoveredId(suggestions[selectedIndex]._id);
    } else {
      setHoveredId(null);
    }
  }, [selectedIndex, suggestions]);

  const clearInput = () => {
    setValue("");
    setSuggestions([]);
    setIsOpen(false);
    setSelectedIndex(-1);
    setHoveredId(null);
  };
  
  const handleSelect = (scryfallId: string) => {
    setIsOpen(false);
    setSuggestions([]);
    setValue("");
    router.push(`/singles/${scryfallId}`);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // 1. Если меню закрыто, но мы нажали Enter (переход в каталог)
    if (!isOpen && value.trim().length >= 3 && e.key === "Enter") {
      router.push(`/singles?q=${encodeURIComponent(value.trim())}`);
      clearInput(); // 🔹 Добавили очистку поля
      return;
    }

    if (!isOpen) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        // Если выбрали конкретную карту (в handleSelect уже встроена очистка)
        handleSelect(suggestions[selectedIndex].scryfall_id);
      } else {
        // 2. Если меню открыто, ничего не выбрано стрелками и нажат Enter (переход в каталог)
        router.push(`/singles?q=${encodeURIComponent(value.trim())}`);
        clearInput(); // 🔹 Добавили очистку поля
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      setIsOpen(false);
    }
  };

  // const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
  //   if (!isOpen && value.trim().length >= 3 && e.key === "Enter") {
  //     router.push(`/singles?q=${encodeURIComponent(value.trim())}`);
  //     setIsOpen(false);
  //     return;
  //   }

  //   if (!isOpen) return;

  //   if (e.key === "ArrowDown") {
  //     e.preventDefault();
  //     setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
  //   } else if (e.key === "ArrowUp") {
  //     e.preventDefault();
  //     setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
  //   } else if (e.key === "Enter") {
  //     e.preventDefault();
  //     if (selectedIndex >= 0 && suggestions[selectedIndex]) {
  //       handleSelect(suggestions[selectedIndex].scryfall_id);
  //     } else {
  //       setIsOpen(false);
  //       router.push(`/singles?q=${encodeURIComponent(value.trim())}`);
  //     }
  //   } else if (e.key === "Escape") {
  //     e.preventDefault();
  //     setIsOpen(false);
  //   }
  // };
  
  const hoveredCard = suggestions.find((card) => card._id === hoveredId);

  return (
    <div className={styles.container} ref={wrapperRef}>
      <Input
        type="text"
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => {
          if (suggestions.length > 0) setIsOpen(true);
        }}
        placeholder={placeholder}
        className={cn(styles.input, className)}
      />

      {value && (
        <button type="button" onClick={clearInput} className={styles.clearButton}>
          <X size={16} className="text-gray-400 hover:text-black" />
        </button>
      )}

      {isOpen && suggestions.length > 0 && (
        <div className={styles.dropdown}>
          {suggestions.map((card, index) => (
            <button
              key={`${card.scryfall_id}-${card.set_name}-${card.collector_number}`}
              type="button"
              onMouseEnter={() => {
                setHoveredId(card._id);
                setSelectedIndex(index);
              }}
              onMouseLeave={() => {
                setHoveredId(null);
                setSelectedIndex(-1);
              }}
              onClick={() => handleSelect(card.scryfall_id)}
              className={cn(
                styles.dropdownItem,
                selectedIndex === index && styles.active // Применяем класс active при фокусе с клавиатуры
              )}
            >
              <div className={styles.textContent}>
                <div className={styles.cardName}>{card.name}</div>
                <div className={styles.cardMeta}>
                  {card.set_name} • {card.collector_number}
                </div>
              </div>
            </button>
          ))}
          
          {hoveredCard?.image && (
            <Image
              src={hoveredCard.image}
              alt={hoveredCard.name}
              width={180}
              height={260}
              className={styles.inlineImage}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;