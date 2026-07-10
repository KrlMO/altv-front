import { useSearchParams } from "next/navigation";

export function EmailVerifiedPage() {
    const searchParams = useSearchParams();
    const verified = Boolean(searchParams.get("success"));

    if (!verified) {
        return <div className="text-center mt-20">Ocorreu um erro ao verificar seu email. Tente novamente.</div>;
    }

    return (
        <div className="text-center mt-20">
            <h1 className="text-2xl font-bold mb-4">Email verificado com sucesso!</h1>
            <p className="mb-4">Agora você pode fazer login usando suas credenciais.</p>
            <a href="/auth/login" className="text-blue-500 hover:underline">Ir para Login</a>
        </div>
    );
}