"use client";
import { useCallback, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TimeDisplay } from "@/components/TimeDisplay";
import { useTimeManager } from "@/hooks/useTimeManager";
import { conferences } from "@/data/conferences";
import { ConferenceList } from "@/components/ConferenceList";
import { CountdownCard } from "@/components/CountdownCard";
import { AddConference } from "@/components/AddConference";
import {
  getLocalTimezoneInfo,
  saveUserConferences,
  saveSelectedDeadlines,
  getDeadlineStatus,
  getDeadlineGradient,
} from "@/lib/utils";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Home() {
  const {
    isLoading,
    userConferences,
    selectedConferences,
    setUserConferences,
    setSelectedConferences,
  } = useLocalStorage();

  const { localTime, aoeTime } = useTimeManager();
  const { location: userLocation } = getLocalTimezoneInfo();

  const handleSelectConference = useCallback(
    (conference, deadline) => {
      const newConference = {
        ...conference,
        deadline,
        originalDeadline: conference.deadline,
      };
      setSelectedConferences((prev) => {
        const exists = prev.find(
          (c) => c.id === conference.id && c.deadline === deadline
        );
        const updated = exists
          ? prev.filter((c) => c !== exists)
          : [...prev, newConference];
        saveSelectedDeadlines(updated);
        return updated;
      });
    },
    [setSelectedConferences]
  );

  const handleAddConference = useCallback(
    (conference) => {
      setUserConferences((prev) => {
        const updated = [...prev, conference];
        saveUserConferences(updated);
        return updated;
      });
    },
    [setUserConferences]
  );

  const handleRemoveConference = useCallback(
    (conferenceToRemove) => {
      setSelectedConferences((prev) => {
        const updated = prev.filter((c) => c !== conferenceToRemove);
        saveSelectedDeadlines(updated);
        return updated;
      });
    },
    [setSelectedConferences]
  );

  const allConferences = useMemo(
    () => [...conferences, ...userConferences],
    [userConferences]
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 py-8 px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-4">
              <Image
                src="/images/deadline.png"
                alt="Deadline Icon"
                width={48}
                height={48}
                priority
                className="w-12 h-12 object-contain"
              />
              <h1 className="text-4xl font-bold tracking-tight">
                Paper Deadline Countdown
              </h1>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Never miss a deadline again! This countdown shows the time
              remaining until your paper submission is due. Using "Anywhere on
              Earth" (UTC-12) timezone ensures your paper is on time, regardless
              of your location.
            </p>
          </div>

          {/* Time Display Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TimeDisplay
              title="Local Time"
              time={localTime}
              showLocation={true}
              location={userLocation}
            />
            <TimeDisplay
              title="AoE Time (UTC-12)"
              time={aoeTime}
              showLocation={true}
              location="Baker Island"
            />
          </div>

          {/* Selected Deadlines Grid */}
          {selectedConferences.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {selectedConferences
                .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
                .map((conference) => {
                  const status = getDeadlineStatus(conference.deadline);
                  const gradient = getDeadlineGradient(status);

                  return (
                    <Card
                      key={`${conference.id}-${conference.deadline}`}
                      className={cn(
                        "bg-gradient-to-br shadow-lg transition-all duration-300",
                        gradient,
                        status === "expired" && "opacity-75"
                      )}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <CardTitle>{conference.name}</CardTitle>
                            <p className="text-sm text-muted-foreground">
                              {conference.location}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveConference(conference)}
                            className="h-8 w-8 -mt-1"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CountdownCard
                          conference={conference}
                          status={status}
                        />
                      </CardContent>
                    </Card>
                  );
                })}
            </div>
          ) : (
            <Card className="border-dashed">
              <CardContent className="py-8">
                <div className="text-center text-muted-foreground">
                  <p className="text-lg font-medium mb-2">
                    No deadlines selected
                  </p>
                  <p>Select conference deadlines below to show countdowns</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Conference List */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle>Conference Deadlines</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    All deadlines are in AoE (UTC-12) timezone
                  </p>
                </div>
                <AddConference onAdd={handleAddConference} />
              </div>
            </CardHeader>
            <CardContent>
              <ConferenceList
                conferences={allConferences}
                onSelectConference={handleSelectConference}
                selectedConferences={selectedConferences}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t py-6">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-muted-foreground text-center">
            Pro tip: Academic conferences use AoE (Anywhere on Earth) time to
            ensure fairness across all timezones. Your deadline is not passed
            until it's passed everywhere on Earth.
          </p>
        </div>
      </footer>
    </div>
  );
}
