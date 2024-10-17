"use client";
import { authClient } from "~/auth/client";

export default function Home() {
  const session = authClient.useSession();
  return (
    <div>
      <h1>Home</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
