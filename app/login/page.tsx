"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";



export default function Login() {
     const router = useRouter();

     const [form, setForm] = useState({
         email: "",
         password: "",
     });

     async function handleSubmit(e: React.FormEvent) {
         e.preventDefault();

         const res = await fetch("/api/auth/login", {
             method: "POST",
             body: JSON.stringify(form),
         });

         if (res.ok) {
             router.push("/dashboard");
             router.refresh();
         } else {
             alert("Login failed");
         }
     }
   
    return (
        <div className="auth-page">

           <form className="auth-card">
             <h1> LOGIN </h1>
             <input placeholder="Email"/>
             <input placeholder="Password" type="password"/>
             <button> Login </button>
           
           </form>
        </div>

    );
}