import { Link } from "react-router";
import { HardHat, ArrowLeft } from "lucide-react";

export function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
        style={{ backgroundColor: "#fff7ed" }}
      >
        <HardHat className="w-8 h-8" style={{ color: "#f97316" }} />
      </div>
      <h1 className="text-3xl font-bold" style={{ color: "#0f172a" }}>
        Page Not Found
      </h1>
      <p className="mt-2 max-w-md" style={{ color: "#64748b" }}>
        The tool or trade you're looking for doesn't exist in our directory yet.
      </p>
      <Link
        to="/"
        className="mt-6 flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-white"
        style={{ backgroundColor: "#f97316" }}
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Directory
      </Link>
    </div>
  );
}
