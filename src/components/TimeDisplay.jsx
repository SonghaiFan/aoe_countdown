import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function TimeDisplay({ title, time, showLocation, location }) {
  const timeFormatter = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  if (!time) {
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
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-32 mb-2"></div>
            <div className="h-6 bg-muted rounded w-48"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

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
          {time ? timeFormatter.format(new Date(time)) : "--:--:--"}
        </p>
        <p className="text-lg mt-2 text-gray-600 dark:text-gray-300">
          {time ? dateFormatter.format(new Date(time)) : "--"}
        </p>
      </CardContent>
    </Card>
  );
}
