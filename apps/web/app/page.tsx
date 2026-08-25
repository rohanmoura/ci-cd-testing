"use client";

import { FormEvent, useEffect, useState } from "react";

type User = { id: string; email: string; name: string | null };

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
const wsUrl = process.env.NEXT_PUBLIC_WS_URL ?? "ws://localhost:5000";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [apiStatus, setApiStatus] = useState("checking");
  const [wsStatus, setWsStatus] = useState("connecting");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  async function loadUsers() {
    try {
      const response = await fetch(`${apiUrl}/users`);
      if (!response.ok) throw new Error("API request failed");
      setUsers(await response.json());
      setApiStatus("connected");
    } catch {
      setApiStatus("offline");
    }
  }

  useEffect(() => {
    void loadUsers();
    const socket = new WebSocket(wsUrl);
    socket.onopen = () => setWsStatus("connected");
    socket.onerror = () => setWsStatus("offline");
    socket.onclose = () => setWsStatus("offline");
    return () => socket.close();
  }, []);

  async function createUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await fetch(`${apiUrl}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name })
    });
    if (!response.ok) return;
    setEmail("");
    setName("");
    await loadUsers();
  }

  return (
    <main>
      <p className="eyebrow">CI/CD LEARNING LABS</p>
      <h1>Three services. One pipeline.</h1>
      <div className="services">
        <span>Web · connected</span>
        <span>API · {apiStatus}</span>
        <span>WebSocket · {wsStatus}</span>
      </div>

      <section>
        <h2>Neon users</h2>
        <form onSubmit={createUser}>
          <input aria-label="Name" placeholder="Name" value={name} onChange={(event) => setName(event.target.value)} />
          <input aria-label="Email" type="email" required placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
          <button type="submit">Create user</button>
        </form>
        {users.length === 0 ? <p>No users yet.</p> : (
          <ul>{users.map((user) => <li key={user.id}>{user.name ?? "Unnamed"} · {user.email}</li>)}</ul>
        )}
      </section>
    </main>
  );
}
