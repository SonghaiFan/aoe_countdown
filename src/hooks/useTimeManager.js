import { useState, useEffect, useRef } from "react";

export function useTimeManager(deadline) {
  const [localTime, setLocalTime] = useState(null);
  const [aoeTime, setAoeTime] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const timerRef = useRef(null);

  useEffect(() => {
    setLocalTime(new Date());
    setAoeTime(
      new Date().toLocaleString("en-US", { timeZone: "Pacific/Niue" })
    );

    const updateTimes = () => {
      const now = new Date();
      setLocalTime(now);
      setAoeTime(now.toLocaleString("en-US", { timeZone: "Pacific/Niue" }));

      if (deadline) {
        const targetDate = new Date(deadline);
        const comparisonTime = new Date(
          now.toLocaleString("en-US", { timeZone: "Pacific/Niue" })
        );
        targetDate.setUTCHours(23, 59, 59);

        const diff = Math.floor((targetDate - comparisonTime) / 1000);
        setTimeRemaining(diff > 0 ? diff : 0);
      }
    };

    updateTimes(); // Initial update
    timerRef.current = setInterval(updateTimes, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [deadline]);

  return { localTime, aoeTime, timeRemaining };
}
