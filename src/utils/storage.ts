import { GenerationSession, GeneratedPrompt } from '../types';

const STORAGE_KEY_HISTORY = 'stockprompt_studio_history_v1';
const STORAGE_KEY_FAVORITES = 'stockprompt_studio_favorites_v1';

export function loadHistoryFromStorage(): GenerationSession[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_HISTORY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [];
  } catch (error) {
    console.error('Failed to load history from localStorage:', error);
    return [];
  }
}

export function saveSessionToStorage(session: GenerationSession): GenerationSession[] {
  try {
    const current = loadHistoryFromStorage();
    // Keep top 30 sessions to avoid localStorage quota limits
    const updated = [session, ...current.filter((s) => s.id !== session.id)].slice(0, 30);
    localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error('Failed to save history to localStorage:', error);
    return [];
  }
}

export function clearHistoryFromStorage(): void {
  try {
    localStorage.removeItem(STORAGE_KEY_HISTORY);
  } catch (error) {
    console.error('Failed to clear history:', error);
  }
}

export function deleteSessionFromStorage(sessionId: string): GenerationSession[] {
  try {
    const current = loadHistoryFromStorage();
    const updated = current.filter((s) => s.id !== sessionId);
    localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error('Failed to delete session:', error);
    return [];
  }
}

export function loadFavoritesFromStorage(): GeneratedPrompt[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_FAVORITES);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [];
  } catch (error) {
    console.error('Failed to load favorites:', error);
    return [];
  }
}

export function toggleFavoriteInStorage(prompt: GeneratedPrompt): { favorites: GeneratedPrompt[]; isFavorited: boolean } {
  try {
    const current = loadFavoritesFromStorage();
    const exists = current.some((p) => p.id === prompt.id);
    let updated: GeneratedPrompt[];
    let isFavorited: boolean;

    if (exists) {
      updated = current.filter((p) => p.id !== prompt.id);
      isFavorited = false;
    } else {
      updated = [prompt, ...current].slice(0, 50);
      isFavorited = true;
    }

    localStorage.setItem(STORAGE_KEY_FAVORITES, JSON.stringify(updated));
    return { favorites: updated, isFavorited };
  } catch (error) {
    console.error('Failed to toggle favorite:', error);
    return { favorites: [], isFavorited: false };
  }
}
