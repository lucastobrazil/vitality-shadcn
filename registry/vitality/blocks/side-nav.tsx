"use client";

import * as React from "react";
import {
  Sun,
  Calendar,
  Users,
  Mail,
  BookUser,
  BarChart3,
  Settings,
  Store,
  ChevronLeft,
  ChevronRight,
  LucideIcon,
  CalendarIcon,
  IdCard,
  Inbox,
  BookMarked,
  BarChart,
  Blocks,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/registry/vitality/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/vitality/ui/tooltip";

interface SideNavItem {
  label: string;
  icon: LucideIcon;
  href?: string;
  onClick?: () => void;
  isActive?: boolean;
}

interface SideNavProps extends React.HTMLAttributes<HTMLElement> {
  items?: SideNavItem[];
  defaultExpanded?: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  onExpandedChange?: (expanded: boolean) => void;
}

const defaultNavItems: SideNavItem[] = [
  {
    label: "My Day",
    icon: Sun,
    href: "/my-day",
    isActive: true,
  },
  {
    label: "Appointments",
    icon: CalendarIcon,
    href: "/appointments",
  },
  { label: "Patients", icon: IdCard, href: "/patients" },
  {
    label: "Results/Letters",
    icon: Inbox,
    href: "/results-letters",
  },
  {
    label: "Address Book",
    icon: BookMarked,
    href: "/address-book",
  },
  { label: "Reports", icon: BarChart, href: "/reports" },
  { label: "Settings", icon: Settings, href: "/settings" },
  { label: "Marketplace", icon: Blocks, href: "/marketplace" },
];

function SideNavItemComponent({
  item,
  isExpanded,
}: {
  item: SideNavItem;
  isExpanded: boolean;
}) {
  const Icon = item.icon;

  const content = (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start gap-3 h-10 font-normal hover:bg-primary/5 hover:text-primary border-l-2 border-transparent",
        item.isActive &&
          "bg-primary/10 text-primary font-medium border-l-primary",
      )}
      asChild={!!item.href}
      onClick={item.onClick}
    >
      {item.href ? (
        <a href={item.href}>
          <Icon className="size-5 shrink-0" />
          <span className="truncate">{item.label}</span>
        </a>
      ) : (
        <>
          <Icon className="size-5 shrink-0" />
          <span className="truncate">{item.label}</span>
        </>
      )}
    </Button>
  );

  if (!isExpanded) {
    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent side="right" sideOffset={8}>
          {item.label}
        </TooltipContent>
      </Tooltip>
    );
  }

  return content;
}

function SideNav({
  className,
  items = defaultNavItems,
  defaultExpanded = true,
  header,
  footer,
  onExpandedChange,
  ...props
}: SideNavProps) {
  const [isExpanded, setIsExpanded] = React.useState(defaultExpanded);

  const toggleExpanded = () => {
    const newExpanded = !isExpanded;
    setIsExpanded(newExpanded);
    onExpandedChange?.(newExpanded);
  };

  return (
    <TooltipProvider>
      <aside
        className={cn(
          "relative flex flex-col p-1 h-full border-r bg-background transition-all duration-300 ease-in-out",
          isExpanded ? "w-[200px]" : "w-[56px]",
          className,
        )}
        {...props}
      >
        {/* Header */}
        {header && (
          <div className={cn("flex items-center border-b h-12 shrink-0")}>
            {header}
          </div>
        )}

        {/* Navigation items */}
        <nav className={cn("flex-1 overflow-y-auto")}>
          <ul className="space-y-1">
            {items.map((item, index) => (
              <li key={index}>
                <SideNavItemComponent item={item} isExpanded={isExpanded} />
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        {footer && <div className={cn("border-t py-2 shrink-0")}>{footer}</div>}

        {/* Expand/Collapse toggle */}
        <div className={cn("border-t py-2 shrink-0 flex justify-end")}>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "h-10",
                  isExpanded ? "justify-start " : "justify-center px-0",
                )}
                onClick={toggleExpanded}
              >
                {isExpanded ? (
                  <ChevronLeft className="size-5 shrink-0" />
                ) : (
                  <ChevronRight className="size-5 shrink-0" />
                )}
              </Button>
            </TooltipTrigger>
            {!isExpanded && (
              <TooltipContent side="right" sideOffset={8}>
                Expand
              </TooltipContent>
            )}
          </Tooltip>
        </div>
      </aside>
    </TooltipProvider>
  );
}

export { SideNav, type SideNavProps, type SideNavItem };
