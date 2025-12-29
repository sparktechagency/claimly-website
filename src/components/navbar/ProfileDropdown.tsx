"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FileText,
  User,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";

import userImage from "../../../public/profile.svg";

interface ProfileDropdownProps {
  onItemClick?: () => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ onItemClick }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      {/* Profile Icon */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center rounded-full"
      >
        <Image
          src={userImage}
          alt="profile"
          width={36}
          height={36}
          className="rounded-full border border-blue-200"
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-72 rounded-xl bg-white shadow-xl border border-blue-100 z-50">
          {/* Header */}
          <div className="flex items-center gap-3 p-4 border-b">
            <Image
              src={userImage}
              alt="user"
              width={48}
              height={48}
              className="rounded-lg border"
            />
            <div>
              <p className="font-medium text-[#1E293B]">Omar</p>
              <p className="text-sm text-gray-500">omar@gmail.com</p>
            </div>
          </div>

          {/* Menu */}
          <div className="p-2 space-y-1">
            <DropdownItem
              href="/my_claims"
              icon={<FileText size={18} />}
              label="My Claims"
              onClick={onItemClick}
            />
            <DropdownItem
              href="/dashboard/profile"
              icon={<User size={18} />}
              label="My Profile"
              onClick={onItemClick}
            />
            <DropdownItem
              href="/dashboard/settings"
              icon={<Settings size={18} />}
              label="Account Setting"
              onClick={onItemClick}
            />
          </div>

          {/* Footer */}
          <div className="border-t p-2">
            <button
              className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-red-600 hover:bg-red-50"
              onClick={() => {
                setOpen(false);
                onItemClick?.();
              }}
            >
              <LogOut size={18} />
              <span className="text-sm font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;

/* helper */
interface ItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

const DropdownItem: React.FC<ItemProps> = ({
  href,
  icon,
  label,
  onClick,
}) => (
  <Link
    href={href}
    onClick={onClick}
    className="flex items-center justify-between px-3 py-2
     rounded-lg hover:bg-blue-50 text-[#475569]"
  >
    <div className="flex items-center gap-3">
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>
    <ChevronRight size={16} />
  </Link>
);
