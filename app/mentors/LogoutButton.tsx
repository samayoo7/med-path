"use client";

import { logout } from "@/app/auth/actions";

export function LogoutButton() {
  return (
    <form action={logout}>
      <button
        type="submit"
        className="text-sm font-medium text-slate-600 hover:text-red-600 active:text-red-600 touch-manipulation"
      >
        Logout
      </button>
    </form>
  );
}
