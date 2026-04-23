import { Link } from "react-router";
import { CheckCircle2, Calendar } from "lucide-react";
import { defaultAuthor } from "../data/editorial";

interface PageBylineProps {
  dateModified?: string;
  datePublished?: string;
  author?: { name: string; url: string };
  variant?: "dark" | "light";
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export function PageByline({
  dateModified,
  datePublished,
  author = { name: defaultAuthor.name, url: defaultAuthor.url },
  variant = "dark",
}: PageBylineProps) {
  const modified = dateModified ?? new Date().toISOString().slice(0, 10);
  const textColor = variant === "dark" ? "#94a3b8" : "#475569";
  const accent = variant === "dark" ? "#fb923c" : "#c2410c";

  return (
    <div
      className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs"
      style={{ color: textColor }}
    >
      <span className="inline-flex items-center gap-1.5">
        <CheckCircle2 className="w-3.5 h-3.5" style={{ color: accent }} />
        <span>
          Reviewed by{" "}
          <Link to={author.url.replace("https://bestconstructionapps.com", "")} className="font-medium hover:underline" style={{ color: accent }}>
            {author.name}
          </Link>
        </span>
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Calendar className="w-3.5 h-3.5" />
        <span>
          Updated{" "}
          <time dateTime={modified}>{formatDate(modified)}</time>
          {datePublished && datePublished !== modified && (
            <>
              {" · Published "}
              <time dateTime={datePublished}>{formatDate(datePublished)}</time>
            </>
          )}
        </span>
      </span>
    </div>
  );
}
