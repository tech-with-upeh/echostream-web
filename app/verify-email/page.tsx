"use client";

import { Suspense } from "react";
import VerifyEmailComponent from "./VerifyEmail";

export default function VerifyEmailPage() {

  return (
    <Suspense>
        <VerifyEmailComponent/>
    </Suspense>
  );
}
