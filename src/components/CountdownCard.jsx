import { CountdownDisplay } from "@/components/Countdown";
import { useTimeManager } from "@/hooks/useTimeManager";
import { format } from "date-fns";
import { memo } from "react";
import { cn } from "@/lib/utils";

export const CountdownCard = memo(function CountdownCard({
  conference,
  status,
}) {
  const { timeRemaining } = useTimeManager(conference.deadline);

  const getDeadlineType = (conference) => {
    if (typeof conference.originalDeadline === "object") {
      if (conference.deadline === conference.originalDeadline.abstract) {
        return "Abstract";
      }
      if (conference.deadline === conference.originalDeadline.fullPaper) {
        return "Full Paper";
      }
    }
    return "Submission";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "expired":
        return "text-red-700 dark:text-red-400";
      case "critical":
        return "text-orange-700 dark:text-orange-400";
      case "urgent":
        return "text-yellow-700 dark:text-yellow-400";
      case "approaching":
        return "text-blue-700 dark:text-blue-400";
      default:
        return "text-green-700 dark:text-green-400";
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm">
        <span className={cn("font-medium", getStatusColor(status))}>
          {getDeadlineType(conference)} Deadline
        </span>
        <span className="text-muted-foreground">
          {format(new Date(conference.deadline), "MMMM do, yyyy")}
        </span>
      </div>
      <CountdownDisplay timeRemaining={timeRemaining} status={status} />
    </div>
  );
});
