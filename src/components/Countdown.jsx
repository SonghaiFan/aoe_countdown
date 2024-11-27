import { formatCountdown } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function CountdownDisplay({ timeRemaining, status }) {
  if (!timeRemaining) {
    return (
      <p className="text-center text-muted-foreground">
        Select a submission deadline date to start the countdown
      </p>
    );
  }

  const { days, hours, minutes, seconds } = formatCountdown(timeRemaining);
  const timeUnits = [
    { value: days, label: "DAYS" },
    { value: hours, label: "HOURS" },
    { value: minutes, label: "MINUTES" },
    { value: seconds, label: "SECONDS" },
  ];

  const getNumberColor = (status) => {
    switch (status) {
      case "expired":
        return "text-red-900 dark:text-red-200";
      case "critical":
        return "text-orange-900 dark:text-orange-200";
      case "urgent":
        return "text-yellow-900 dark:text-yellow-200";
      case "approaching":
        return "text-blue-900 dark:text-blue-200";
      default:
        return "text-green-900 dark:text-green-200";
    }
  };

  return (
    <div className="grid grid-cols-4 gap-2 text-center">
      {timeUnits.map(({ value, label }) => (
        <div key={label} className="space-y-1">
          <div
            className={cn(
              "text-2xl sm:text-3xl lg:text-4xl font-mono font-bold tracking-tighter",
              getNumberColor(status)
            )}
          >
            {value.toString().padStart(2, "0")}
          </div>
          <div className="text-[10px] sm:text-xs text-muted-foreground font-medium">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}
