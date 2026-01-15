import { ReactNode } from "react";
import type { FC } from "react";
import { Sidebars } from "@/scaffold/Sidebar";
import Navbar from "@/components/Navbar";

interface layoutProps {
  children: ReactNode;
}

const layout: FC<layoutProps> = ({ children }) => {
  return (
    <>
      <div className="flex flex-col ">
        <div className="lg:flex relative  ">
          {/* Curved corner */}

          <Sidebars>
            <div className="flex-grow bg-white relative  overflow-auto bg-gray-200 min-h-screen pt-10">
              <Navbar />

              <main className=" w-full relative   h-screen ">{children}</main>
            </div>
          </Sidebars>
        </div>
      </div>
    </>
  );
};
export default layout;
