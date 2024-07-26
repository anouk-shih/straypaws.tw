import Image from "next/image";
import React from "react";

import Logo from "@/app/icon-512x512.png";

interface LayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-dvh">
      {/* Header */}
      <header>
        <div className="max-w-7xl mx-auto py-6 px-5 sm:px-6 lg:px-8 flex content-start items-center gap-5">
          <div className="w-28 h-28">
            <Image src={Logo} alt="Taiwan Stray Animal Data" />
          </div>
          <h1 className="text-3xl font-bold">臺灣流浪動物資料圖表</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto pb-10 px-5">
        {/* Main content */}
        <div className="bg-white rounded-lg py-6 sm:px-6 lg:px-8">{children}</div>
      </main>

      {/* Footer */}
      <footer className="border-t">
        <div className="max-w-7xl mx-auto py-6 px-5 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-neutral">
            {"資料來源："}
            <a className="clickable" href="https://data.moa.gov.tw/open_detail.aspx" target="_blank">
              農業資料開放平臺
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default DashboardLayout;
