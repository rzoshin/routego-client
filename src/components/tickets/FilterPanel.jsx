"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, Input, Button, Label } from "@heroui/react";
import { FaSearch, FaSlidersH, FaHistory } from "react-icons/fa";

const LOCATIONS = [
  "Dhaka",
  "Chittagong",
  "Sylhet",
  "Khulna",
  "Rajshahi",
  "Barisal",
  "Rangpur",
  "Mymensingh",
];

const TRANSPORT_TYPES = ["Bus", "Train", "Flight", "Launch"];

export default function FilterPanel() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [from, setFrom] = useState(searchParams.get("from") || "");
  const [to, setTo] = useState(searchParams.get("to") || "");
  const [transportType, setTransportType] = useState(
    searchParams.get("transportType") || ""
  );
  const [sort, setSort] = useState(searchParams.get("sort") || "");

  const handleApplyFilters = () => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (from) params.set("from", from);
    if (to) params.set("to", to);
    if (transportType) params.set("transportType", transportType);
    if (sort) params.set("sort", sort);
    params.set("page", "1");
    router.push(`/tickets?${params.toString()}`);
  };

  const handleReset = () => {
    setSearch("");
    setFrom("");
    setTo("");
    setTransportType("");
    setSort("");
    router.push("/tickets");
  };

  return (
    <Card className="relative overflow-hidden rounded-3xl border border-border bg-card/80 p-8 shadow-2xl backdrop-blur-2xl">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6 items-end">
        <div className="flex flex-col gap-2 lg:col-span-2">
          <Label htmlFor="search-title">Search Title</Label>
          <Input
            id="search-title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search keyword..."
            startContent={<FaSearch className="text-pink-500 text-sm" />}
            className="h-12"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="filter-from">From</Label>
          <select
            id="filter-from"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="h-12 rounded-xl border border-border bg-background px-3 text-sm text-foreground"
          >
            <option value="">All Locations</option>
            {LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="filter-to">To</Label>
          <select
            id="filter-to"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="h-12 rounded-xl border border-border bg-background px-3 text-sm text-foreground"
          >
            <option value="">All Locations</option>
            {LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="filter-transport">Transport</Label>
          <select
            id="filter-transport"
            value={transportType}
            onChange={(e) => setTransportType(e.target.value)}
            className="h-12 rounded-xl border border-border bg-background px-3 text-sm text-foreground"
          >
            <option value="">All Types</option>
            {TRANSPORT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="filter-sort">Sort By Price</Label>
          <select
            id="filter-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="h-12 rounded-xl border border-border bg-background px-3 text-sm text-foreground"
          >
            <option value="">Default</option>
            <option value="price_asc">Low to High</option>
            <option value="price_desc">High to Low</option>
          </select>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={handleApplyFilters}
            className="flex-grow bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 text-white font-bold h-12"
            startContent={<FaSlidersH size={13} />}
          >
            Apply
          </Button>
          <Button
            onClick={handleReset}
            variant="bordered"
            className="h-12 border-border px-4 text-foreground"
            title="Reset Filters"
          >
            <FaHistory size={13} />
          </Button>
        </div>
      </div>
    </Card>
  );
}
