"use client";

import { Card } from "@heroui/react";

function BarChart({ title, data, valueKey, colorClass }) {
  const maxValue = Math.max(...data.map((item) => item[valueKey] || 0), 1);

  return (
    <Card className="border border-border/5 bg-background/40 backdrop-blur-xl p-6 rounded-2xl">
      <h3 className="mb-6 text-lg font-bold text-foreground">{title}</h3>
      <div className="flex h-56 items-end justify-between gap-3">
        {data.map((item) => {
          const value = item[valueKey] || 0;
          const height = `${Math.max((value / maxValue) * 100, value > 0 ? 8 : 0)}%`;

          return (
            <div
              key={item.month}
              className="flex flex-1 flex-col items-center gap-2"
            >
              <p className="text-xs font-semibold text-muted-foreground">
                {valueKey === "revenue"
                  ? `BDT ${value.toLocaleString()}`
                  : value}
              </p>
              <div className="flex h-40 w-full items-end justify-center">
                <div
                  className={`w-full max-w-12 rounded-t-lg ${colorClass}`}
                  style={{ height }}
                />
              </div>
              <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                {item.month}
              </p>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export default function VendorRevenueChart({ stats }) {
  if (!stats) {
    return null;
  }

  const monthlyData = stats.monthlyRevenue || [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="border border-border/5 bg-background/40 backdrop-blur-xl p-5 rounded-2xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Tickets Added
          </p>
          <p className="mt-2 text-3xl font-bold text-foreground">
            {stats.ticketsAdded || 0}
          </p>
        </Card>
        <Card className="border border-border/5 bg-background/40 backdrop-blur-xl p-5 rounded-2xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Tickets Sold
          </p>
          <p className="mt-2 text-3xl font-bold text-foreground">
            {stats.ticketsSold || 0}
          </p>
        </Card>
        <Card className="border border-border/5 bg-background/40 backdrop-blur-xl p-5 rounded-2xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Total Revenue
          </p>
          <p className="mt-2 text-3xl font-bold text-green-600">
            BDT {(stats.totalRevenue || 0).toLocaleString()}
          </p>
        </Card>
      </div>

      <BarChart
        title="Monthly Revenue"
        data={monthlyData}
        valueKey="revenue"
        colorClass="bg-gradient-to-t from-green-600 to-green-400"
      />

      <BarChart
        title="Monthly Tickets Sold"
        data={monthlyData}
        valueKey="ticketsSold"
        colorClass="bg-gradient-to-t from-indigo-600 to-indigo-400"
      />
    </div>
  );
}
