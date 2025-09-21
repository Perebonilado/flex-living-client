import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

export const AppLogo: FC = () => {
  return (
    <Link href={"/"}>
      <div className="relative h-14 w-40">
        {" "}
        <Image
          layout="fill"
          objectFit="contain"
          objectPosition="0% 50%"
          style={{
            cursor: "pointer",
          }}
          src={"https://lsmvmmgkpbyqhthzdexc.supabase.co/storage/v1/object/public/website/Uploads/Green_V3%20Symbol%20%26%20Wordmark%20(1).png"}
          alt="ogo"
        />
      </div>
    </Link>
  );
};
