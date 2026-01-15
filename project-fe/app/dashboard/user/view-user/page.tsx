"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import Logo from "@/public/globe.svg";
import { useGetOneUsersQuery } from "@/hooks/admin.hook";
import { useSearchParams } from "next/navigation";

export default function AddUserPage() {
  const [restaurantImage, setRestaurantImage] = useState(null);
  const [ownerNIDFile, setOwnerNIDFile] = useState({ name: "yournid.pdf" });
  const [businessLicenseFile, setBusinessLicenseFile] = useState(null);
  const searcParams = useSearchParams();
  const userId = searcParams.get("userId");
  const {
    data: singleUser,
    isLoading,
    error,
  } = useGetOneUsersQuery(userId as string);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Failed to fetch</p>;
  }

  return (
    <div className={"py-20 container mx-auto px-4"}>
      <div className="  p-6 bg-white rounded-lg">
        <div className="mb-8">
          <h1 className="text-2xl  flex items-center text-gray-500 font-bold">
            <div className="w-1 h-8 bg-green-500 mr-3"></div>
            Users Details
          </h1>
        </div>

        <div className={"flex flex-col gap-4 justify-center"}>
          <Image
            src={Logo}
            alt={"P"}
            width={200}
            height={200}
            objectFit={"cover"}
            className={"self-center"}
          />

          <div className={"text-center "}>
            <h2 className={"font-bold text-2xl"}>
              {singleUser?.firstname} {singleUser?.lastname}
            </h2>
            <h3>{singleUser?.email}</h3>
          </div>

          {/* <Button title={'Edit'} className={'bg-green-500 py-2 px-10 text-white mx-auto'}>
Edit user
                  </Button> */}

          <div>
            <div className={"text-start  mb-4 "}>
              <p className={"text-gray-400 text-md"}>Gender</p>
              <p className={"text-lg font-bold "}>{singleUser?.gender}</p>
            </div>

            <hr />

            <div className={"text-start  mb-4 "}>
              <p className={"text-gray-400 text-md"}>User Type</p>
              <p className={"text-lg font-bold "}>{singleUser?.userType}</p>
            </div>

            <hr />

            <div className={"text-start  mb-4 "}>
              <p className={"text-gray-400 text-md"}>Verified</p>
              <p className={"text-lg font-bold "}>
                {singleUser?.isActive ? "Verified" : "Not Verified"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
