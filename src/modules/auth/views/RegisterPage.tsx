import { RegisterForm } from "../components/RegisterForm";

export function RegisterPage() {
    return (
        <div className="px-4
                sm:px-6
                flex
                items-start
                relative
                w-full
                max-w-2xl
                lg:max-w-3xl
                mx-auto">
            <RegisterForm />
        </div>
    );
}