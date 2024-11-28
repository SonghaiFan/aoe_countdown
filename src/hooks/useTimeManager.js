import { useState, useEffect, useRef } from "react";

export function useTimeManager(deadline) {
  const [localTime, setLocalTime] = useState(null);
  const [aoeTime, setAoeTime] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const timerRef = useRef(null);

  useEffect(() => {
    const updateTimes = () => {
      // 1. Get current local time
      const now = new Date();
      setLocalTime(now);

      // 2. Convert current time to AoE (UTC-12)
      const aoeDate = new Date(
        now.toLocaleString("en-US", { timeZone: "Etc/GMT+12" })
      );
      setAoeTime(aoeDate);

      if (deadline) {
        // 3. The deadline is already in AoE timezone
        const aoeDeadline = new Date(deadline);
        // Set to end of day in AoE
        aoeDeadline.setHours(23, 59, 59, 999);

        // 4. Calculate remaining time between current AoE time and deadline
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
