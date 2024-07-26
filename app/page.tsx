import { Suspense } from "react";

import Dashboard from "@/app/_components/Dashboard";

import type { NextPage } from "next";
const Home: NextPage = () => {
  return (
    <Suspense fallback={<>Loading...</>}>
      <Dashboard />
    </Suspense>
  );
};

export default Home;
