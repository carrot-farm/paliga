"use client";
import { Button } from "@nextui-org/react";
import { IoArrowForward } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Header } from "../widgets/Header";

/** ===== Components ===== */
function HomePage({}: HomePageProps) {
  return (
    <>
      <Header />

      <div className="pt-[200px] text-center">
        <h2 className="px-5 text-[28px] font-semibold">Simplifying Animation Development</h2>
        <div className="mt-10">
          <Button color="warning" variant="shadow" to="/guide/installation" as={Link}>
            <IoArrowForward />
            Getting Started
          </Button>
        </div>
      </div>
    </>
  );
}

/** ===== Others ===== */

/** ===== Types ===== */
export type HomePageProps = {};

export default HomePage;
