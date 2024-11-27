import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatTime, formatDate } from "@/lib/utils";

export function TimeDisplay({ title, time, showLocation, location }) {
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
      </CardContent>
    </Card>
  );
}
