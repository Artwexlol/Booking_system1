// src/pages/RegisterPage.tsx
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await register(name, email, password);
      navigate("/");
    } catch (err: any) {
      if (err?.response?.status === 409) {
        setError("Ezzel az email címmel már létezik felhasználó.");
      } else {
        setError("Sikertelen regisztráció. Próbáld újra később.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Regisztráció</h1>

        {error && (
          <div className="mb-4 rounded-md bg-red-50 px-4 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Név
            </label>
            <input
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-slate-200"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-slate-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Jelszó
            </label>
            <input
              type="password"
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-slate-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-slate-900 text-white py-2 rounded-md text-sm font-medium hover:bg-slate-800"
          >
            Fiók létrehozása
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-slate-600">
          Már van fiókod?{" "}
          <Link
            to="/login"
            className="text-sky-600 hover:text-sky-700 hover:underline"
          >
            Bejelentkezés
          </Link>
        </p>
      </div>
    </div>
  );
}
