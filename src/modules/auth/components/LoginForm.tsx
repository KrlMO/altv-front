"use client";
import { MainButton } from "@/components/ui/buttom/MainButtom";
import { ImageButton } from "@/components/ui/buttom/ImageButtom";
import { Input } from "@/components/ui/input/Input";
import steamImage from "../../../../public/steam-logo.png"
import { useLogin } from "../hooks/useLogin";
import { useState } from "react";

function validateEmail(value: string) {
  if (!value) return undefined;
  if (!value.includes("@")) return "Formato incorrecto";
  return undefined;
}


export function LoginForm() {

  const { login, loading, error } = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState<string | undefined>();
  const [touched, setTouched] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await login({ email, password });
  };

  return (
    <>
      <div
        className="
    absolute
    top-0 bottom-0
    left-2 right-2
    sm:-inset-1
    rounded-xl
    blur-lg
    sm:blur-xl
    opacity-20
    bg-gradient-to-b sm:bg-gradient-to-br
    from-[#15FFEB]
    to-[#D300D8]
    pointer-events-none
  "
      />

      <div
        className="
    relative
    z-10
    w-full
    px-6 py-10
    sm:px-15
    min-h-[420px]
    rounded-xl
    bg-white dark:bg-[#131A2A]
  "
      >


        <h2
          className="
          text-2xl
          font-semibold
          mb-8
          text-center
          text-zinc-800 dark:text-zinc-200
        "
        >
          Iniciar Sesión
        </h2>

        <form className="flex flex-col gap-5 w-full">
          <Input
            label="Correo Electrónico"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => {
              setTouched(true);
              setEmailError(validateEmail(email));
            }}
            error={touched ? emailError : undefined}
            placeholder="correo@ejemplo.com"
          />


          <Input
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="•••••••••••••••"
          />

          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}

          <MainButton
            type="submit"
            className="mt-6 px-8 self-center"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Ingresando..." : "Iniciar Sesión"}
          </MainButton>

        </form>
        <p className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">O tambien puedes iniciar sesión con</p>

        <ImageButton src={steamImage.src} className="mt-4 mx-auto w-max" imgClassName="h-10 w-auto" onClick={() => console.log("Iniciar sesión con Steam")} >

        </ImageButton>
        <p className="mt-4 text-center text-sm text-zinc-600 dark:text-zinc-400">¿Eres nuevo? <a href="/auth/register" className="text-blue-500 hover:underline">Regístrate</a></p>
      </div>
    </>
  );
}
