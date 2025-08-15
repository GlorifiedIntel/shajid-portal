"use client";

import ServerErrorPage from "../components/ServerError";

export default function GlobalError({ error, reset }) {
  console.error("Global error:", error);
  return <ServerErrorPage reset={reset} />;
}