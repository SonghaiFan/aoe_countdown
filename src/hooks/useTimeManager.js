import { useState, useEffect, useRef } from "react";

export function useTimeManager(deadline) {
  const [localTime, setLocalTime] = useState(null);
  const [aoeTime, setAoeTime] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const timerRef = useRef(null);

  // Create formatters once
  const aoeFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Etc/GMT+12",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();

      // Set local time
      setLocalTime(now);

      // Get AoE time
      const aoeDate = new Date(
        now.toLocaleString("en-US", { timeZone: "Etc/GMT+12" })
      );
      setAoeTime(aoeDate);

      if (deadline) {
        // Since deadline is already in AoE, create end of day deadline
        const aoeDeadline = new Date(deadline);
        aoeDeadline.setUTCHours(23, 59, 59, 999);

        // Calculate time remaining
        const diff = Math.floor((aoeDeadline - aoeDate) / 1000);
        setTimeRemaining(diff > 0 ? diff : 0);
      }
    };

    updateTimes();
    timerRef.current = setInterval(updateTimes, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [deadline]);

  return { localTime, aoeTime, timeRemaining };
}
