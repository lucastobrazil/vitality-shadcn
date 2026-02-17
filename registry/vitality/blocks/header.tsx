"use client";

import * as React from "react";
import { Search, User, Settings, LogOut, Bell } from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/registry/vitality/ui/input";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/vitality/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/registry/vitality/ui/dropdown-menu";
import { Button } from "@/registry/vitality/ui/button";

interface HeaderUserMenuItem {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

interface HeaderUserProps {
  name: string;
  email?: string;
  avatarSrc?: string;
  avatarFallback?: string;
  menuItems?: HeaderUserMenuItem[];
}

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  searchPlaceholder?: string;
  onSearch?: (value: string) => void;
  actions?: React.ReactNode;
  user?: HeaderUserProps;
}

export function GentuLogo() {
  return (
    <div className="relative h-6 w-[112.8px]">
      {/* Logo icon */}
      <div className="absolute inset-[0_79.38%_3.11%_0]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 23.2547 23.2547"
        >
          <path
            d="M1.86044 2.23601V5.5811H17.6736V16.9759H21.3944V2.23601C21.3944 2.03924 21.2334 1.86036 21.0187 1.86036H2.23609C2.02144 1.86036 1.86044 2.02135 1.86044 2.23601Z"
            fill="#440047"
          />
          <path
            d="M15.8311 17.6735C10.1785 17.6735 5.58119 13.0941 5.58119 7.42359V6.27874H1.86044V7.42359C1.86044 15.1334 8.12131 21.3943 15.8311 21.3943H21.0366C21.2334 21.3943 21.4122 21.2333 21.4122 21.0186V17.6735H15.8311Z"
            fill="#FF3D77"
          />
        </svg>
      </div>

      {/* Logo text */}
      <div className="absolute inset-[1.42%_0.11%_3.85%_28.45%]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 80.5863 22.7359"
        >
          <path
            d="M0 11.359C0 4.65093 4.95503 0 10.9476 0C16.4929 0 19.6591 3.23776 20.7682 6.54708L17.5841 7.83503C16.5287 4.97292 14.561 2.89789 10.876 2.89789C7.03006 2.89789 3.32721 5.76 3.32721 11.3232C3.32721 16.7434 6.38609 19.8738 10.7508 19.8738C14.9545 19.8738 17.2979 17.0117 17.4947 14.3821H9.94584V11.52H20.7145V22.2887H17.6914V18.4785C16.9043 20.0348 14.9188 22.718 10.3215 22.718C4.06062 22.718 0 18.3533 0 11.359Z"
            fill="#440047"
          />
          <path
            d="M23.3619 14.6146C23.3619 9.55229 26.3492 6.38608 30.3741 6.38608C34.9892 6.38608 37.744 10.2499 37.1716 15.3123H26.2777C26.4029 19.033 28.4601 20.2673 30.5887 20.2673C33.0931 20.2673 34.1843 18.3891 34.6136 17.2979L37.2968 18.2638C36.1699 21.2333 33.7013 22.718 30.4993 22.718C26.2061 22.718 23.3619 19.8201 23.3619 14.6146ZM34.2201 12.951C34.1843 10.1784 32.4491 8.71154 30.3741 8.71154C28.3706 8.71154 26.5997 10.2678 26.3492 12.951H34.2201Z"
            fill="#440047"
          />
          <path
            d="M39.9443 22.2887V6.8154H42.7886V9.40919C43.0927 8.65789 44.5953 6.38609 47.8509 6.38609C51.6611 6.38609 53.2174 8.72944 53.2174 12.164V22.3066H50.2837V12.8258C50.2837 10.0532 48.9958 8.92621 47.0102 8.92621C42.9496 8.92621 42.8959 13.4161 42.8959 15.5985V22.2708H39.9443V22.2887Z"
            fill="#440047"
          />
          <path
            d="M62.0721 22.2887C59.514 22.2887 58.1724 21.0365 58.1724 18.4785V9.2482H54.6484V6.8154H58.1724V1.98559H61.1061V6.8154H65.2919V9.2482H61.1061V18.2281C61.1061 19.2835 61.5712 19.7486 62.6266 19.7486H65.8643V22.2708H62.0721V22.2887Z"
            fill="#440047"
          />
          <path
            d="M67.4743 16.9401V6.8154H70.408V16.2604C70.408 19.033 71.6601 20.16 73.5921 20.16C77.4559 20.16 77.6527 15.9563 77.6527 13.5414V6.8154H80.5863V22.2887H77.7242V19.6412C77.2234 20.5535 75.7565 22.7359 72.5724 22.7359C69.0306 22.718 67.4743 20.3747 67.4743 16.9401Z"
            fill="#440047"
          />
        </svg>
      </div>
    </div>
  );
}

const defaultUser = {
  name: "Andrew Demo",
  email: "john@example.com",
  avatarFallback: "AD",
};

function Header({
  className,
  logo = <GentuLogo />,
  searchPlaceholder = "Search",
  onSearch,
  actions,
  user = defaultUser,
  ...props
}: HeaderProps) {
  const defaultUserMenuItems: HeaderUserMenuItem[] = [
    { label: "Account Settings", icon: <Settings className="h-4 w-4" /> },
    { label: "Log out", icon: <LogOut className="h-4 w-4" /> },
  ];

  const userMenuItems: HeaderUserMenuItem[] =
    user?.menuItems || defaultUserMenuItems;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className,
      )}
      {...props}
    >
      <div className="container flex items-center gap-4 h-[48px] px-3">
        {logo && <div className="flex items-center shrink-0">{logo}</div>}
        {/* Search - centered */}
        <div className="relative flex-1 flex justify-center">
          <div className="relative w-full max-w-[380px]">
            <div className="bg-muted focus-visible:bg-background focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px] border rounded-xl text-center gap-sm flex justify-center items-center px-1 h-[38px]">
              <Search className="text-muted-foreground pointer-events-none" />
              <Input
                type="search"
                placeholder={searchPlaceholder}
                size={8}
                className="border-none focus-visible:ring-0 max-w-fit px-1 focus:max-w-[380px] bg-transparent"
                onChange={(e) => onSearch?.(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {actions}
          {/* User info */}
          <div className="flex flex-col items-end gap-0.5">
            <p className="text-sm font-semibold leading-tight">
              Dr Andrew Demo
            </p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span>Brisbane Medical Centres</span>
              <span>·</span>
              <span>GTU99999</span>
            </div>
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="rounded-full p-2">
            <Bell className="size-5 text-muted-foreground" />
            <span className="sr-only">Notifications</span>
          </Button>

          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="rounded-full focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                  <Avatar size="lg">
                    {user.avatarSrc && (
                      <AvatarImage src={user.avatarSrc} alt={user.name} />
                    )}
                    <AvatarFallback variant="primary">
                      {user.avatarFallback || user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {userMenuItems.map((item, index) => (
                  <DropdownMenuItem
                    key={index}
                    onClick={item.onClick}
                    asChild={!!item.href}
                  >
                    {item.href ? (
                      <a href={item.href}>
                        {item.icon}
                        {item.label}
                      </a>
                    ) : (
                      <>
                        {item.icon}
                        {item.label}
                      </>
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}

export { Header, type HeaderProps, type HeaderUserProps };
