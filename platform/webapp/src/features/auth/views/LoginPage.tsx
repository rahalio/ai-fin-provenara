import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAccessToken } from "@/services/shared/infrastructure";

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("registrar@provenara.local");
  const [password, setPassword] = useState("sandbox");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function enterConsole(e?: FormEvent) {
    e?.preventDefault();
    setLoading(true);
    setError(null);
    try {
      setAccessToken(`sandbox.${btoa(email)}.${Date.now()}`);
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen grid place-items-center px-4">
      <div className="w-full max-w-md panel p-8">
        <div className="brand-mark text-4xl mb-2">Provenara</div>
        <h1 className="text-2xl mb-1">Governed trust files for art finance</h1>
        <p className="text-sm text-[rgba(26,18,16,0.62)] mb-6">
          Open the operator console to assemble lendable dossiers and share
          registers.
        </p>
        <form className="flex flex-col gap-3" onSubmit={enterConsole}>
          <label className="text-xs uppercase tracking-wide text-[var(--color-steel)]">
            Operator email
            <input
              className="field mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
            />
          </label>
          <label className="text-xs uppercase tracking-wide text-[var(--color-steel)]">
            Passphrase
            <input
              className="field mt-1"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </label>
          {error ? (
            <p className="text-sm text-[var(--color-seal-red)]">{error}</p>
          ) : null}
          <button className="btn mt-2" type="submit" disabled={loading}>
            {loading ? "Opening…" : "Enter console"}
          </button>
        </form>
      </div>
    </div>
  );
}
