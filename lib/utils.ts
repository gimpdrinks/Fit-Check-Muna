/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFriendlyErrorMessage(error: unknown, context: string): string {
    let rawMessage = 'An unknown error occurred.';
    if (error instanceof Error) {
        rawMessage = error.message;
    } else if (typeof error === 'string') {
        rawMessage = error;
    } else if (error) {
        rawMessage = String(error);
    }
    
    if (rawMessage === LIMIT_EXCEEDED_ERROR_MESSAGE) {
        return "You've reached the daily generation limit for this demo. Please come back tomorrow!";
    }

    // Check for specific unsupported MIME type error from Gemini API
    if (rawMessage.includes("Unsupported MIME type")) {
        try {
            // It might be a JSON string like '{"error":{"message":"..."}}'
            const errorJson = JSON.parse(rawMessage);
            const nestedMessage = errorJson?.error?.message;
            if (nestedMessage && nestedMessage.includes("Unsupported MIME type")) {
                const mimeType = nestedMessage.split(': ')[1] || 'unsupported';
                return `File type '${mimeType}' is not supported. Please use a format like PNG, JPEG, or WEBP.`;
            }
        } catch (e) {
            // Not a JSON string, but contains the text. Fallthrough to generic message.
        }
        // Generic fallback for any "Unsupported MIME type" error
        return `Unsupported file format. Please upload an image format like PNG, JPEG, or WEBP.`;
    }
    
    return `${context}. ${rawMessage}`;
}

// --- Rate Limiter ---
const USAGE_LIMIT = 15;
const STORAGE_KEY = 'gemini-vto-usage';
export const LIMIT_EXCEEDED_ERROR_MESSAGE = 'Daily generation limit reached.';

interface UsageData {
  count: number;
  resetDate: string; // ISO date string YYYY-MM-DD
}

function getTodayDateString(): string {
  return new Date().toISOString().split('T')[0];
}

function getUsageData(): UsageData {
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (!storedData) {
      return { count: 0, resetDate: getTodayDateString() };
    }
    const data: UsageData = JSON.parse(storedData);
    const today = getTodayDateString();

    // If the stored date is not today, reset the counter.
    if (data.resetDate !== today) {
      return { count: 0, resetDate: today };
    }
    return data;
  } catch (error) {
    console.error("Failed to read from local storage:", error);
    return { count: 0, resetDate: getTodayDateString() };
  }
}

function saveUsageData(data: UsageData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Failed to write to local storage:", error);
  }
}

export function checkLimit(): { remaining: number; limit: number; isExceeded: boolean } {
  const data = getUsageData();
  const isExceeded = data.count >= USAGE_LIMIT;
  const remaining = Math.max(0, USAGE_LIMIT - data.count);
  return { remaining, limit: USAGE_LIMIT, isExceeded };
}

export function incrementUsage(): void {
  const data = getUsageData();
  if (data.count < USAGE_LIMIT) {
    data.count += 1;
    saveUsageData(data);
  }
}
