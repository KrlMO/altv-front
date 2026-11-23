import { Suspense } from "react";
import { EmailVerifiedPage } from "@/modules/auth/views/EmailVerifiedPage";

export default function Page() {
    return (
        <Suspense>
            <EmailVerifiedPage />
        </Suspense>
    );
}
