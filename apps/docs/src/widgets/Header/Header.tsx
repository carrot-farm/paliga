"use client";
import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { useState } from "react";
import { IoLogoGithub } from "react-icons/io5";
import { MENU_ITEMS } from "../../shared/constants/menu";
import { Menu } from "../Menu";

/** ===== Components ===== */
function Header({}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      {/* left */}
      <NavbarContent>
        <NavbarBrand>
          <Link href="/" color="foreground">
            <h1 className="text-2xl font-semibold">PALIGA</h1>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* right */}
      <NavbarContent justify="end">
        <Button
          variant="bordered"
          radius="full"
          href="https://github.com/carrot-farm/paliga"
          target="__blank"
          isIconOnly
          as={Link}
        >
          <IoLogoGithub size={20} />
        </Button>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="block lg:hidden"
        />
      </NavbarContent>

      {/* menu */}
      <NavbarMenu className="block">
        <Menu data={MENU_ITEMS} onClick={() => setIsMenuOpen(false)} />
        <div className="h-32">&nbsp;</div>
      </NavbarMenu>
    </Navbar>
  );
}

/** ===== Others ===== */

/** ===== Types ===== */
export type HeaderProps = {};

export default Header;
