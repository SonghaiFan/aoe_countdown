import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formatTime = (date) => {
  return date.toLocaleTimeString("en-US", {
    hour12: true,
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  });
};

export const formatDate = (date) => {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatCountdown = (totalSeconds) => {
  const days = Math.floor(totalSeconds / (24 * 3600));
  const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
};

export const getLocalTimezoneInfo = () => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const location = timezone.split("/").pop().replace(/_/g, " ");
  return {
    timezone,
    location,
  };
};

export const STORAGE_KEY = {
  USER_CONFERENCES: "user_conferences",
  SELECTED_DEADLINES: "selected_deadlines",
};

export const loadUserConferences = () => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY.USER_CONFERENCES);
  return stored ? JSON.parse(stored) : [];
};

export const saveUserConferences = (conferences) => {
  localStorage.setItem(
    STORAGE_KEY.USER_CONFERENCES,
    JSON.stringify(conferences)
  );
};

export const loadSelectedDeadlines = () => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY.SELECTED_DEADLINES);
  return stored ? JSON.parse(stored) : [];
};

export const saveSelectedDeadlines = (deadlines) => {
  localStorage.setItem(
    STORAGE_KEY.SELECTED_DEADLINES,
    JSON.stringify(deadlines)
  );
};

export const getDeadlineStatus = (deadline) => {
  const now = new Date();
  const deadlineDate = new Date(deadline);
  const diffDays = Math.ceil((deadlineDate - now) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return "expired";
  if (diffDays <= 3) return "critical";
  if (diffDays <= 7) return "urgent";
  if (diffDays <= 30) return "approaching";
  return "safe";
};

export const getDeadlineGradient = (status) => {
  switch (status) {
    case "expired":
      return "from-red-50 to-red-100 dark:from-red-950 dark:to-red-900";
    case "critical":
      return "from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950";
    case "urgent":
      return "from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950";
    case "approaching":
      return "from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950";
    default:
      return "from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950";
  }
};
