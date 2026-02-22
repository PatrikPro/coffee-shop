import { openingHoursToRows } from "@/lib/sanity/opening-hours";
import type { OpeningHoursDay } from "@/lib/sanity/types";

interface OpeningHoursListProps {
  days: OpeningHoursDay[];
  className?: string;
}

export function OpeningHoursList({ days, className }: OpeningHoursListProps) {
  const rows = openingHoursToRows(days);

  return (
    <ul className={className}>
      {rows.map((row) => (
        <li key={row.key}>
          {row.label}: {row.value}
        </li>
      ))}
    </ul>
  );
}
