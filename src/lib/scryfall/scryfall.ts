// src/lib/scryfall/scryfall.ts

/**
 * Получает точный URL SVG-иконки сета из API Scryfall.
 * Использует жесткое кэширование Next.js на 7 дней (604800 секунд).
 */
export async function getScryfallSetIcon(setCode: string): Promise<string | null> {
  if (!setCode) return null;
  
  try {
    const res = await fetch(`https://api.scryfall.com/sets/${setCode.trim().toLowerCase()}`, {
      next: { revalidate: 604800 }, 
    });

    if (!res.ok) return null;

    const setData = await res.json();
    return setData.icon_svg_uri || null;
  } catch (error) {
    console.error(`Failed to fetch set icon for ${setCode}:`, error);
    return null;
  }
}