"use client";
import { cn } from "@nextui-org/react";
import { Outlet } from "react-router-dom";
import { MENU_ITEMS } from "../../shared/constants/menu";
import { Header } from "../Header";
import { Menu } from "../Menu";

/** ===== Components ===== */
function MainLayout({}: MainLayoutProps) {
  return (
    <>
      {/* header */}
      <Header />

      {/* contents */}
      <main
        className={cn(
          "bg-background text-foreground dark",
          "max-w-8xl container relative mx-auto mb-12 min-h-[calc(100vh-64px-108px)] flex-grow px-6",
        )}
      >
        <div className="grid grid-cols-12">
          {/* left menu */}
          <div className="hidden pr-4 lg:col-span-2 lg:block">
            <div className="fixed max-h-[calc(100vh-64px)] overflow-y-auto">
              <Menu data={MENU_ITEMS} />
            </div>
          </div>

          <div className="col-span-12 mt-10 lg:col-span-10 lg:px-16 xl:col-span-8">
            <Outlet />
          </div>

          {/* contents nav */}
          <div className="mt-8 hidden pl-0 xl:col-span-2 xl:flex"></div>
        </div>
      </main>
    </>
  );
}

/** ===== Others ===== */

/** ===== Types ===== */
export type MainLayoutProps = {};

export default MainLayout;
