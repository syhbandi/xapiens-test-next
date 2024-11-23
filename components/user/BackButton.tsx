"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();
  return (
    <Button variant={"outline"} className="mt-3" onClick={() => router.back()}>
      <ArrowLeft />
      Back
    </Button>
  );
};

export default BackButton;
