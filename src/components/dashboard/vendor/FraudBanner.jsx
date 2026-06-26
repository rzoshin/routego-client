import { AlertTriangle } from "lucide-react";

export default function FraudBanner() {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 p-4">
      <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
      <div>
        <p className="font-semibold text-red-300">Account flagged as fraud</p>
        <p className="mt-1 text-sm text-red-200/80">
          Your tickets are hidden from the platform and you cannot add new tickets
          until an admin removes the fraud flag.
        </p>
      </div>
    </div>
  );
}
