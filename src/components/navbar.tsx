"use client";
import Link from "next/link";
import ConnectWalletButton from "@/components/connect-wallet-button";
import { ModeToggle } from "@/components/mode-toggle";
import { routes } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed w-full z-50 flex justify-between items-center py-4 px-4 border-b border-primary/10 bg-secondary/80">
      <Link href={"/"} className="flex items-center group">
        <h1 className="ml-2 text-2xl font-bold text-primary group-hover:text-primary/80 transition-colors">
          Gluon Solidity
        </h1>
      </Link>
      <div className="hidden md:flex items-center gap-2">
        <div className="flex flex-row gap-x-6 mr-8">
          {routes.map((route) => {
            const isActive = pathname === route.href;
            if (route.options.length > 0) {
              return (
                <DropdownMenu key={route.label}>
                  <DropdownMenuTrigger
                    className={cn(
                      "flex items-center space-x-1 py-2 px-3 rounded-md transition-colors",
                      isActive
                        ? "text-primary font-medium"
                        : "text-primary/70 hover:text-primary hover:bg-primary/5",
                    )}
                  >
                    <route.icon className="h-5 w-5" />
                    <h1 className="font-bold text-lg cursor-pointer">
                      {route.label}
                    </h1>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {route.options.map((route) => {
                      return (
                        <DropdownMenuItem className="py-2" key={route.href}>
                          <Link href={route.href} className="flex flex-row">
                            <route.icon className="h-5 w-5 mr-3" />
                            {route.label}
                          </Link>
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            } else {
              return (
                <Link
                  href={route.href}
                  key={route.href}
                  className={cn(
                    "flex items-center space-x-1 py-2 px-3 rounded-md transition-colors",
                    isActive
                      ? "text-primary font-medium"
                      : "text-primary/70 hover:text-primary hover:bg-primary/5",
                  )}
                >
                  <route.icon className="h-5 w-5" />
                  <h1 className="font-bold text-lg cursor-pointer">
                    {route.label}
                  </h1>
                </Link>
              );
            }
          })}
        </div>
        <ConnectWalletButton />
        <ModeToggle />
      </div>
    </nav>
  );
}
