import { useState, useEffect } from "react";
import { loadUserConferences, loadSelectedDeadlines } from "@/lib/utils";

export function useLocalStorage() {
  const [isLoading, setIsLoading] = useState(true);
  const [userConferences, setUserConferences] = useState([]);
  const [selectedConferences, setSelectedConferences] = useState([]);

  useEffect(() => {
    // Load data from localStorage on mount
    const loadStoredData = () => {
      try {
        const storedUserConferences = loadUserConferences();
        const storedSelectedDeadlines = loadSelectedDeadlines();

        setUserConferences(storedUserConferences);
        setSelectedConferences(storedSelectedDeadlines);
      } catch (error) {
        console.error("Error loading data from localStorage:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStoredData();
  }, []);

  return {
    isLoading,
    userConferences,
    selectedConferences,
    setUserConferences,
    setSelectedConferences,
  };
}
