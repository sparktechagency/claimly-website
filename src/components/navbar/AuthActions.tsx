"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "../shared/Button";
import { User, FileText, Settings, LogOut } from "lucide-react";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useGetMyProfileQuery } from "@/store/feature/myProfileApi/myProfileApi";


interface AuthActionsProps {
  isLogin: boolean;
  onActionClick?: () => void;
}

const AuthActions: React.FC<AuthActionsProps> = ({
  isLogin,
  onActionClick,
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data: profileData } = useGetMyProfileQuery(undefined, { skip: !isLogin });
  const userData = profileData?.data;

  const profileImage = userData?.normalUser?.[0]?.profile_image

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const handleClose = () => {
    setOpen(false);
    onActionClick?.();
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("email");
    toast.success("Logged out successfully");
    setOpen(false);
    onActionClick?.();
    router.push("/login");
  };

  /* ================= AVATAR COMPONENT ================= */
  const UserAvatar = ({ size = 36, fontSize = "text-sm" }: { size?: number, fontSize?: string }) => {
    const firstLetter = userData?.fullName?.charAt(0).toUpperCase() || "U";

    // Check if profile image exists
    const profileImg = userData?.normalUser?.[0]?.profile_image || userData?.profile_image;

    return (
      <div
        style={{ width: size, height: size }}
        className="relative flex items-center justify-center rounded-full overflow-hidden bg-[#2563EB] text-white shrink-0 border border-gray-100"
      >
        {profileImage ? (
          <Image
            src={profileImage}
            fill
            alt="profile"
            className="object-cover"
          />
        ) : (
          <span className={`font-bold ${fontSize} select-none`}>{firstLetter}</span>
        )}
      </div>
    );
  };

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
      <div className="relative hidden lg:block" ref={dropdownRef}>
        <button onClick={() => setOpen(!open)} className="focus:outline-none">
          <UserAvatar size={36} />
        </button>

        {open && (
          <div className="absolute right-0 mt-3 w-64 rounded-xl bg-white shadow-xl p-3 z-50 border border-gray-100">
            {/* User Info */}
            <div className="flex items-center gap-3 p-3 border-b border-[#DBEAFE]">
              <UserAvatar size={40} fontSize="text-base" />
              <div className="overflow-hidden">
                <p className="font-medium text-sm truncate">{userData?.fullName || "User"}</p>
                <p className="text-xs text-gray-500 truncate">{userData?.email}</p>
              </div>
            </div>

            {/* Menu */}
            <div className="mt-3 flex flex-col gap-[3px]">
              <MenuItem href="/my_claims" icon={<FileText size={18} />} label="My Claims" onClick={handleClose} />
              <MenuItem href="/my_profile" icon={<User size={18} />} label="My Profile" onClick={handleClose} />
              <MenuItem href="/settings" icon={<Settings size={18} />} label="Account Settings" onClick={handleClose} />
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="mt-2 w-full flex items-center gap-3 px-3 py-2 rounded-md text-[#64748B] hover:bg-red-50 transition-colors"
            >
              <LogOut size={18} />
              <span className="text-sm font-medium">Sign Out</span>
            </button>
          </div>
        )}
      </div>

      {/* ================= MOBILE ================= */}
      <div className="lg:hidden">
        <button onClick={() => setOpen(true)}>
          <UserAvatar size={36} />
        </button>

        {open && (
          <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setOpen(false)} />
        )}

        <div className={`fixed bottom-0 left-0 right-0 bg-white z-50 rounded-t-2xl p-5 transition-transform duration-300 ${open ? "translate-y-0" : "translate-y-full"}`}>
          <div className="flex justify-center mb-3">
            <div className="w-10 h-1 bg-gray-300 rounded-full" />
          </div>

          <div className="flex items-center gap-3 pb-4 border-b">
            <UserAvatar size={48} fontSize="text-lg" />
            <div>
              <p className="font-semibold text-gray-900">{userData?.fullName || "User"}</p>
              <p className="text-sm text-gray-500">{userData?.email}</p>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-[3px] text-[#64748B]">
            <MobileItem href="/my_claims" icon={<FileText />} label="My Claims" onClick={handleClose} />
            <MobileItem href="/my_profile" icon={<User />} label="My Profile" onClick={handleClose} />
            <MobileItem href="/settings" icon={<Settings />} label="Account Settings" onClick={handleClose} />

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-3 py-3 rounded-md transition-colors text-red-500 hover:bg-red-50"
            >
              <LogOut />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

/* Reusable Components remained as defined in your original file */
const MenuItem = ({ href, icon, label, onClick }: { href: string; icon: React.ReactNode; label: string; onClick?: () => void }) => (
  <Link href={href} onClick={onClick} className="flex items-center gap-3 px-3 py-3 rounded-md text-[#64748B] bg-[#2563EB05] hover:bg-gray-100 transition-colors">
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </Link>
);

const MobileItem = ({ href, icon, label, danger, onClick }: { href: string; icon: React.ReactNode; label: string; danger?: boolean; onClick?: () => void }) => (
  <Link href={href} onClick={onClick} className={`flex items-center gap-3 w-full px-3 py-3 rounded-md transition-colors ${danger ? "text-red-500 hover:bg-red-50" : "hover:bg-gray-100"}`}>
    {icon}
    <span className="font-medium">{label}</span>
  </Link>
);

export default AuthActions;
