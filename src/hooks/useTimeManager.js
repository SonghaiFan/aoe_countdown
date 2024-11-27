import { useState, useEffect, useRef } from "react";

export function useTimeManager(deadline) {
  const [localTime, setLocalTime] = useState(null);
  const [aoeTime, setAoeTime] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const timerRef = useRef(null);

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();

      // Local time
      setLocalTime(now);

      // AoE time (UTC-12)
      const aoeOptions = { timeZone: "Etc/GMT+12" };
      const aoeDate = new Date(now.toLocaleString("en-US", aoeOptions));
      setAoeTime(aoeDate);

      if (deadline) {
        const targetDate = new Date(deadline);
        // Convert deadline to AoE
        const aoeDeadline = new Date(
          targetDate.toLocaleString("en-US", aoeOptions)
        );
        aoeDeadline.setHours(23, 59, 59, 999);

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
