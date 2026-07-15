"use client";

import Link from "next/link";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type User = {
  name: string;
  email: string;
  role: "admin" | "user";
};


export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false); 

  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  // const [open, setOpen] = useState(false);

  useEffect(() => {
    let ignore = false;


    async function loadUser() {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      
      if(!ignore){
        setUser(data.user);
      }
    }

    loadUser();

    return () => {
      ignore = true;
    };
  }, [pathname]);

  useEffect(() => {
      function handleAuthChange(event: Event) {
        const authEvent = event as CustomEvent<{ user: User | null }>;
        setUser(authEvent.detail?.user ?? null);
    }

    window.addEventListener("auth-change", handleAuthChange);

    return () => {
      window.removeEventListener("auth-change", handleAuthChange);
    };
  }, []);

  async function logout() {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    setUser(null);
    window.dispatchEvent(
      new CustomEvent("auth-change", { detail: { user: null } })
    );
    router.push("/login");
    router.refresh();
  }

  return (
    <nav className="navbar">
      <div className="container">
        <Link href="/" className="logo">
          Nechira
        </Link>

        <button
          className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        <ul className={menuOpen ? "nav-links active" : "nav-links"}>
          <li>
            <Link href="/">Menu</Link>
          </li>
          <li>
            <Link href="/about">About us</Link>
          </li>
           {user && (
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
          )}

          {user?.role === "admin" && (
            <>
              <li>
                <Link href="/admin/users">Admin</Link>
              </li>
              <li>
                <Link href="/admin/categories">Categories</Link>
              </li>
              <li>
                <Link href="/admin/producrs">Product</Link>
              </li>
            </>
          )}

          {!user ? (
            <>
              <li>
                <Link href="/login">Login</Link>
              </li>
              <li>
                <Link href="/register" className="btn-register">
                  Register
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="user-info">
                <Link href="/profile">
                  {user.name} ({user.role})
                </Link>
              </li>
              <li>
                <Link href="/profile">Profile</Link>
              </li>
              <li>
                <button onClick={logout} className="btn-logout">
                  Logout
                </button>
              </li>
            </>
          )}

        </ul>
      </div>
    </nav>
  );
}