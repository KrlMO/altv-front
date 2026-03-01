export interface VerifyEmailResponseDTO {
    resend_cooldown: number;
    status: "VERIFIED" | "PENDING" | "EXPIRED" | "NOT_FOUND";
}