import { Suspense } from "react";
import { VerifyEmailPage } from "@/modules/auth/views/VerifyEmailPage";

export default function Page() {
    return (
        <Suspense>
            <VerifyEmailPage />
        </Suspense>
    );
}
