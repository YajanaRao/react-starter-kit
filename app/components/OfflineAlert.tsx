import React from "react";

export function OfflineAlert() {
  return (
    <div
      className="fixed bottom-4 right-4 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded"
      role="alert"
    >
      <span className="block sm:inline">
        You are currently offline. Changes will be synced when you're back
        online.
      </span>
    </div>
  );
}
