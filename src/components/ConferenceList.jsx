import { memo, useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { getDeadlineStatus } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Trash2, EyeOff } from "lucide-react";

export const ConferenceList = memo(function ConferenceList({
  conferences,
  onSelectConference,
  selectedConferences,
  onDelete,
  onHide,
  hiddenConferences,
}) {
  const formatDeadline = useCallback((deadline) => {
    if (typeof deadline === "string") {
      return format(new Date(deadline), "MMMM do, yyyy");
    }
    return format(new Date(deadline), "MMMM do, yyyy");
  }, []);

  const getDeadlineVariant = useCallback((date) => {
    const status = getDeadlineStatus(date);
    switch (status) {
      case "expired":
        return "destructive";
      case "critical":
        return "destructive";
      case "urgent":
        return "warning";
      case "approaching":
        return "secondary";
      default:
        return "default";
    }
  }, []);

  const getNextDeadline = (deadline) => {
    if (typeof deadline === "string") {
      return new Date(deadline);
    }
    const abstractDate = new Date(deadline.abstract);
    const fullPaperDate = new Date(deadline.fullPaper);
    return abstractDate < fullPaperDate ? abstractDate : fullPaperDate;
  };

  const isSelected = useCallback(
    (conference, deadline) => {
      return selectedConferences.some(
        (c) => c.id === conference.id && c.deadline === deadline
      );
    },
    [selectedConferences]
  );

  const getDeadlineDate = (deadline) => {
    if (typeof deadline === "string") {
      return deadline;
    }
    return deadline.abstract || deadline.fullPaper;
  };

  const DeadlineBadge = ({ deadline, label, onClick, selected }) => {
    const status = getDeadlineStatus(getDeadlineDate(deadline));

    return (
      <div className="relative inline-block group">
        <Badge
          variant={getDeadlineVariant(getDeadlineDate(deadline))}
          className={cn(
            "cursor-pointer transition-all duration-300",
            selected && "ring-2 ring-primary ring-offset-2",
            status === "expired" && "opacity-75"
          )}
          onClick={onClick}
        >
          {label}: {formatDeadline(getDeadlineDate(deadline))}
        </Badge>
        <div className="invisible group-hover:visible absolute left-1/2 -translate-x-1/2 -top-8 w-max">
          <div className="bg-primary text-primary-foreground text-xs rounded px-2 py-1">
            {selected
              ? "Click to remove from countdown"
              : "Click to add to countdown"}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Conference</TableHead>
            <TableHead>Deadlines</TableHead>
            <TableHead>Location</TableHead>
            <TableHead className="w-[100px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {conferences
            .filter((conference) => !hiddenConferences.includes(conference.id))
            .sort(
              (a, b) =>
                getNextDeadline(a.deadline) - getNextDeadline(b.deadline)
            )
            .map((conference) => (
              <TableRow
                key={conference.id}
                className={cn(
                  "hover:bg-muted/50 transition-colors",
                  conference.id > 3 && "bg-muted/30"
                )}
              >
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-medium flex items-center gap-2">
                      {conference.name}
                      {conference.id > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          User Added
                        </Badge>
                      )}
                      <a
                        href={conference.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-muted-foreground hover:text-foreground"
                        onClick={(e) => e.stopPropagation()}
                      >
                        🔗
                      </a>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {conference.fullName}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-2">
                    {typeof conference.deadline === "object" ? (
                      <>
                        <DeadlineBadge
                          deadline={conference.deadline.abstract}
                          label="Abstract"
                          selected={isSelected(
                            conference,
                            conference.deadline.abstract
                          )}
                          onClick={() =>
                            onSelectConference(
                              conference,
                              conference.deadline.abstract
                            )
                          }
                        />
                        <DeadlineBadge
                          deadline={conference.deadline.fullPaper}
                          label="Full Paper"
                          selected={isSelected(
                            conference,
                            conference.deadline.fullPaper
                          )}
                          onClick={() =>
                            onSelectConference(
                              conference,
                              conference.deadline.fullPaper
                            )
                          }
                        />
                      </>
                    ) : (
                      <DeadlineBadge
                        deadline={conference.deadline}
                        label="Deadline"
                        selected={isSelected(conference, conference.deadline)}
                        onClick={() =>
                          onSelectConference(conference, conference.deadline)
                        }
                      />
                    )}
                  </div>
                </TableCell>
                <TableCell>{conference.location}</TableCell>
                <TableCell>
                  <div className="flex gap-2 justify-end">
                    {conference.id <= 3 ? (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          onHide(conference.id);
                        }}
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        title="Hide conference"
                      >
                        <EyeOff className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(conference.id);
                        }}
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
});
