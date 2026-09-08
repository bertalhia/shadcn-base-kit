"use client";

import * as React from "react";

import { Section } from "@/components/shared/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/date";
import { notify } from "@/lib/notify";

const slots = [
  { time: "09:00", room: "Studio A", seats: 8, taken: 8 },
  { time: "10:30", room: "Studio A", seats: 8, taken: 3 },
  { time: "12:00", room: "Studio B", seats: 12, taken: 0 },
  { time: "14:00", room: "Studio A", seats: 8, taken: 6 },
  { time: "15:30", room: "Studio B", seats: 12, taken: 11 },
];

/** Days already fully booked, so the calendar can grey them out. */
const booked = [
  new Date(2026, 8, 12),
  new Date(2026, 8, 13),
  new Date(2026, 8, 19),
];

const PAGES = 8;

/**
 * A booking panel.
 *
 * The calendar is inline rather than in a popover — when picking the date is
 * the whole task, hiding it behind a button adds a click for nothing. `booked`
 * marks the days that are full, which is the difference between a date picker
 * and an availability calendar.
 *
 * Pagination here is the link-based component, not the data table's: these are
 * separate pages of results, each with its own URL.
 */
export function BookingPanel() {
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(2026, 8, 16),
  );
  const [page, setPage] = React.useState(1);

  return (
    <Section
      title="Studio availability"
      description="Grey days are fully booked."
    >
      <div className="grid gap-6 lg:grid-cols-[auto_minmax(0,1fr)]">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          defaultMonth={new Date(2026, 8, 1)}
          disabled={booked}
          modifiers={{ booked }}
          modifiersClassNames={{ booked: "line-through opacity-40" }}
          className="rounded-xl border"
        />

        <div className="flex flex-col gap-4">
          <Table>
            <TableCaption>
              Slots for {date ? formatDate(date, "long") : "no date selected"}
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Seats left</TableHead>
                <TableHead className="text-right">Book</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {slots.map((slot) => {
                const left = slot.seats - slot.taken;
                return (
                  <TableRow key={`${slot.time}-${slot.room}`}>
                    <TableCell className="font-medium">{slot.time}</TableCell>
                    <TableCell>{slot.room}</TableCell>
                    <TableCell>
                      <Badge variant={left === 0 ? "destructive" : "secondary"}>
                        {left === 0 ? "Full" : `${left} left`}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={left === 0}
                        onClick={() =>
                          notify.success(
                            `Held ${slot.time} in ${slot.room} for 10 minutes.`,
                          )
                        }
                      >
                        Hold
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                />
              </PaginationItem>
              {[1, 2, 3].map((number) => (
                <PaginationItem key={number}>
                  <PaginationLink
                    href="#"
                    aria-current={page === number ? "page" : undefined}
                    onClick={() => setPage(number)}
                  >
                    {number}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  href="#"
                  aria-current={page === PAGES ? "page" : undefined}
                  onClick={() => setPage(PAGES)}
                >
                  {PAGES}
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() => setPage((p) => Math.min(PAGES, p + 1))}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </Section>
  );
}
