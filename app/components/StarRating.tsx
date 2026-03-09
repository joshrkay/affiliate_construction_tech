import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
}

export function StarRating({ rating, size = "md", showValue = false }: StarRatingProps) {
  const sizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = rating >= star;
        const partial = !filled && rating >= star - 0.5;
        return (
          <div key={star} className="relative">
            <Star
              className={`${sizes[size]}`}
              style={{ color: "#e2e8f0", fill: "#e2e8f0" }}
            />
            {(filled || partial) && (
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: filled ? "100%" : "50%" }}
              >
                <Star
                  className={`${sizes[size]}`}
                  style={{ color: "#f59e0b", fill: "#f59e0b" }}
                />
              </div>
            )}
          </div>
        );
      })}
      {showValue && (
        <span className="text-sm font-semibold ml-0.5" style={{ color: "#1e293b" }}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
