"use client";

import { useEffect, useState } from "react";
import { parseDepartureDateTime } from "@/lib/parseDepartureDateTime";

function getTimeLeft(targetDate) {
  const difference = targetDate.getTime() - Date.now();

  if (difference <= 0) {
    return null;
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

export default function Countdown({ departureDate, departureTime, className = "" }) {
  const [timeLeft, setTimeLeft] = useState(null);
  const [isInvalid, setIsInvalid] = useState(false);

  useEffect(() => {
    const targetDate = parseDepartureDateTime(departureDate, departureTime);

    if (!targetDate) {
      setIsInvalid(true);
      setTimeLeft(null);
      return;
    }

    setIsInvalid(false);

    const update = () => setTimeLeft(getTimeLeft(targetDate));
    update();

    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [departureDate, departureTime]);

  if (isInvalid) {
    return (
      <p className={`text-sm font-medium text-muted-foreground ${className}`}>
        Departure schedule unavailable
      </p>
    );
  }

  if (!timeLeft) {
    return (
      <p className={`text-sm font-medium text-red-600 ${className}`}>
        Departure time has passed
      </p>
    );
  }

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {[
        { label: "Days", value: timeLeft.days },
        { label: "Hours", value: timeLeft.hours },
        { label: "Mins", value: timeLeft.minutes },
        { label: "Secs", value: timeLeft.seconds },
      ].map(({ label, value }) => (
        <div
          key={label}
          className="flex min-w-[4.5rem] flex-col items-center rounded-xl border border-border bg-secondary px-3 py-2"
        >
          <span className="text-xl font-bold text-foreground">
            {String(value).padStart(2, "0")}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
