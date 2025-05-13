import { CircleAlert, CheckCircle } from "lucide-react";

export default function AlertPopup({ status = "error", message }) {
  const isError = status === "error";

  return (
    <div
      className={`rounded-md border px-4 py-3 ${
        isError
          ? "border-red-500/50 text-red-600 bg-red-200"
          : "border-green-500/50 text-green-600 bg-green-200"
      }`}
    >
      <p className="text-sm">
        {isError ? (
          <CircleAlert
            className="me-3 -mt-0.5 inline-flex opacity-60"
            size={16}
            aria-hidden="true"
          />
        ) : (
          <CheckCircle
            className="me-3 -mt-0.5 inline-flex opacity-60"
            size={16}
            aria-hidden="true"
          />
        )}
        {message}
      </p>
    </div>
  );
}