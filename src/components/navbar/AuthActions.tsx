"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "../shared/Button";
import userImage from "../../../public/profile.svg";
import { User, FileText, Settings, LogOut } from "lucide-react";

interface AuthActionsProps {
  isLogin: boolean;
  onActionClick?: () => void;
}

const AuthActions: React.FC<AuthActionsProps> = ({
  isLogin,
  onActionClick,
}) => {
  const [open, setOpen] = useState(false);

  /* ================= NOT LOGGED IN ================= */
  if (!isLogin) {
    return (
      <div className="flex gap-3">
        <Link href="/login" onClick={onActionClick}>
          <Button variant="outline">Login</Button>
        </Link>
        <Link href="/register" onClick={onActionClick}>
          <Button variant="primary">Sign Up</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* ================= DESKTOP ================= */}
      <div className="relative hidden lg:block">
        <button onClick={() => setOpen(!open)}>
          <Image
            src={userImage}
            width={36}
            height={36}
            alt="profile"
            className="cursor-pointer rounded-full border"
          />
        </button>

        {open && (
          <div className="absolute right-0 mt-3 w-64 rounded-xl bg-white shadow-xl p-3 z-50">
            {/* User Info */}
            <div className="flex items-center gap-3 p-3 border-b border-[#DBEAFE]">
              <Image
                src={userImage}
                width={40}
                height={40}
                alt="user"
                className="rounded-md"
              />
              <div>
                <p className="font-medium text-sm">Omar</p>
                <p className="text-xs text-gray-500">omar@gmail.com</p>
              </div>
            </div>

            {/* Menu */}
            <div className="mt-3 flex flex-col gap-[3px]">
              <MenuItem
                href="/my_claims"
                icon={<FileText size={18} />}
                label="My Claims"
              />
              <MenuItem
                href="/dashboard/profile"
                icon={<User size={18} />}
                label="My Profile"
              />
              <MenuItem
                href="/dashboard/settings"
                icon={<Settings size={18} />}
                label="Account Settings"
              />
            </div>

            {/* Logout */}
            <Link
              href="/logout"
              className="mt-2 flex items-center gap-3 px-3 py-2 rounded-md text-[#64748B] hover:bg-red-50"
            >
              <LogOut size={18} />
              <span className="text-sm">Sign Out</span>
            </Link>
          </div>
        )}
      </div>

      {/* ================= MOBILE ================= */}
      <div className="lg:hidden">
        <button onClick={() => setOpen(true)}>
          <Image
            src={userImage}
            width={36}
            height={36}
            alt="profile"
            className="rounded-full border"
          />
        </button>

        {/* Overlay */}
        {open && (
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setOpen(false)}
          />
        )}

        {/* Bottom Sheet */}
        <div
          className={`fixed bottom-0 left-0 right-0 bg-white z-50 rounded-t-2xl p-5 transition-transform duration-300 ${
            open ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="flex justify-center mb-3">
            <div className="w-10 h-1 bg-gray-300 rounded-full" />
          </div>

          {/* User Info */}
          <div className="flex items-center gap-3 pb-4 border-b">
            <Image
              src={userImage}
              width={44}
              height={44}
              alt="user"
              className="rounded-md"
            />
            <div>
              <p className="font-medium">Omar</p>
              <p className="text-sm text-gray-500">omar@gmail.com</p>
            </div>
          </div>

          {/* Menu */}
          <div className="mt-4 flex flex-col gap-[3px] text-[#64748B]">
            <MobileItem
              href="/my_claims"
              icon={<FileText />}
              label="My Claims"
            />
            <MobileItem
              href="/dashboard/profile"
              icon={<User />}
              label="My Profile"
            />
            <MobileItem
              href="/dashboard/settings"
              icon={<Settings />}
              label="Account Settings"
            />
            <MobileItem
              href="/logout"
              icon={<LogOut />}
              label="Sign Out"
              danger
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthActions;

/* ================= Reusable Items ================= */

const MenuItem = ({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) => (
  <Link
    href={href}
    className="flex items-center gap-3 px-3 py-3 rounded-md text-[#64748B] bg-[#2563EB05] hover:bg-gray-100"
  >
    {icon}
    <span className="text-sm">{label}</span>
  </Link>
);

const MobileItem = ({
  href,
  icon,
  label,
  danger,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  danger?: boolean;
}) => (
  <Link
    href={href}
    className={`flex items-center gap-3 w-full px-3 py-3 rounded-md ${
      danger
        ? "text-[#64748B] hover:bg-red-50"
        : "hover:bg-gray-100"
    }`}
  >
    {icon}
    <span>{label}</span>
  </Link>
);
