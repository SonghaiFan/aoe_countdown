import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatTime, formatDate } from "@/lib/utils";

export function TimeDisplay({ title, time, showLocation, location }) {
  // Calculate time difference for AoE
  const getTimeDifference = () => {
    if (!time || title !== "AoE Time (UTC-12)") return null;

    const now = new Date();
    const localOffset = -now.getTimezoneOffset();
    const aoeOffset = -12 * 60; // AoE is UTC-12
    const diffMinutes = localOffset - aoeOffset;
    const diffHours = Math.abs(diffMinutes / 60);
    const diffDirection = diffMinutes > 0 ? "ahead of" : "behind";

    return `${diffHours} hours ${diffDirection} your local time`;
  };

  const timeDiff = getTimeDifference();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{title}</span>
          {showLocation && location && (
            <span className="text-sm font-normal text-muted-foreground">
              {location}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-mono">
          {time ? formatTime(new Date(time)) : "--:--:--"}
        </p>
        <p className="text-lg mt-2 text-gray-600 dark:text-gray-300">
          {time ? formatDate(new Date(time)) : "--"}
        </p>
        {timeDiff && (
          <p className="text-sm mt-2 text-muted-foreground">{timeDiff}</p>
        )}
      </CardContent>
    </Card>
  );
}
