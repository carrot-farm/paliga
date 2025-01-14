"use client";
import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { useState } from "react";
import { MENU_ITEMS } from "../../shared/constants/menu";
import { Menu } from "../Menu";

/** ===== Components ===== */
function Header({}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      {/* left */}
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="block lg:hidden"
        />
        <NavbarBrand>
          <Link href="/" color="foreground">
            Paliga
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* menu */}
      <NavbarMenu className="block">
        <Menu data={MENU_ITEMS} onClick={() => setIsMenuOpen(false)} />
      </NavbarMenu>
    </Navbar>
  );
}

/** ===== Others ===== */

/** ===== Types ===== */
export type HeaderProps = {};

export default Header;
