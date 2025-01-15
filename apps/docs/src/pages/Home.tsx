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
        <h2 className="text-[35px] font-semibold">Simplifying Animation Development</h2>
        <div className="mt-10">
          <Link to="/guide/installation">
            <Button color="warning">
              <IoArrowForward />
              Getting Started
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}

/** ===== Others ===== */

/** ===== Types ===== */
export type HomePageProps = {};

export default HomePage;
