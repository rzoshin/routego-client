"use client";

import { useEffect, useState } from "react";

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

  useEffect(() => {
    const dateValue = departureDate || "";
    const timeValue = departureTime || "00:00";
    const targetDate = new Date(`${dateValue} ${timeValue}`);

    if (Number.isNaN(targetDate.getTime())) {
      setTimeLeft(null);
      return;
    }

    const update = () => setTimeLeft(getTimeLeft(targetDate));
    update();

    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [departureDate, departureTime]);

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
          className="flex min-w-[4.5rem] flex-col items-center rounded-xl border border-slate-200 bg-slate-50 px-3 py-2"
        >
          <span className="text-xl font-bold text-slate-900">
            {String(value).padStart(2, "0")}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
