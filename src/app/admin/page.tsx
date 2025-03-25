"use client";
import type { User } from "@supabase/auth-helpers-nextjs";
import access from "../../../public/Access.svg";
import { createClient } from "@/lib/client";
import { useState, useEffect } from "react";
import CrudForm from "@/components/admin-component/crudform";
import Image from "next/image";
import { AuroraText } from "@/components/magicui/aurora-text";

export default function Admin() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function getUser() {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        console.log("No user found");
      } else {
        setUser(data.user);
      }
    }
    getUser();
  }, [])

  if (!user) {
    return (
      <>
        <section className="flex flex-col justify-center text-center w-full h-auto max-md:pb-[10vw] items-center">
          <Image src={access} alt="wedding" width={500} height={500} />
          <h1
            className="font-medium p-3 md:p-3"
            style={{ fontSize: "clamp(20px, 4vw, 60px)" }}
          >
            <AuroraText>Admin access required...!</AuroraText>
          </h1>
        </section>
      </>
    )
  }

  return(
    <CrudForm />
);
}
