"use client";

import { Input } from "@/components/ui/input/Input";
import { InputDate } from "@/components/ui/input/InputDate";
import { SelectCountry } from "@/modules/shared/country/components/SelectCountry";
import { useRegister } from "../hooks/useRegister";
import React from "react";
import { MainButton } from "@/components/ui/buttom/MainButtom";
import { ImageButton } from "@/components/ui/buttom/ImageButtom";
import steamImage from "../../../../public/steam-logo.png"
import Link from "next/link";
import Image from "next/image";
import altv_logo from "../../../../public/altv-logo.svg"
import { AltvButton } from "@/components/ui/buttom/AltvButtom";

export function RegisterForm() {
    const { register, loading, error } = useRegister();
    const [form, setForm] = React.useState({
        first_name: "",
        last_name: "",
        nickname: "",
        email: "",
        password: "",
        confirmPassword: "",
        birth_date: "",
        country_id: undefined as number | undefined,
    });

    const [formError, setFormError] = React.useState<string | null>(null);

    const validateForm = () => {
        //
        console.log("Validating form:", form);
        if (
            !form.first_name ||
            !form.last_name ||
            !form.nickname ||
            !form.email ||
            !form.password ||
            !form.confirmPassword ||
            !form.birth_date ||
            form.country_id === undefined
        ) {
            setFormError("Completa todos los campos obligatorios.");
            return false;
        }

        if (form.password !== form.confirmPassword) {
            setFormError("Las contraseñas no coinciden.");
            return false;
        }

        setFormError(null);
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        await register(form);
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
                    px-8
                    py-12
                    sm:px-12
                    min-h-[520px]
                    rounded-2xl
                    bg-white dark:bg-altv-maindark
                "
            >
                <div className="items-center justify-center flex">
                    <AltvButton height={100}></AltvButton>
                </div>
                <h2
                    className="
                    text-2xl
                    font-semibold
                    mb-8
                    text-center
                    text-zinc-800 dark:text-zinc-200
                    "
                >
                    Registro
                </h2>

                <form
                    className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    gap-5
                    w-full
                "
                >

                    <Input
                        label="Nombres"
                        type="text"
                        placeholder="Nombres"
                        required
                        onChange={(e) =>
                            setForm({ ...form, first_name: e.target.value })
                        }
                    />
                    <Input
                        label="Apellidos"
                        type="text"
                        placeholder="Apellidos"
                        required
                        onChange={(e) =>
                            setForm({ ...form, last_name: e.target.value })
                        }
                    />
                    <InputDate
                        label="Fecha de Nacimiento"
                        name="birth_date"
                        required
                        min="1900-01-01"
                        max={new Date().toISOString().split("T")[0]}
                        onChange={(e) =>
                            setForm({ ...form, birth_date: e.target.value })
                        }
                    />
                    <SelectCountry
                        label="País"
                        value={form.country_id}
                        onChange={(id) => setForm({ ...form, country_id: id })}
                    />
                    <Input
                        label="Correo Electrónico"
                        type="email"
                        placeholder="Correo Electrónico"
                        required
                        onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                        }
                    />
                    <Input
                        label="Nickname"
                        type="text"
                        placeholder="Nickname"
                        required
                        onChange={(e) =>
                            setForm({ ...form, nickname: e.target.value })
                        }
                    />
                    <Input
                        label="Contraseña"
                        type="password"
                        placeholder="Contraseña"
                        required
                        onChange={(e) =>
                            setForm({ ...form, password: e.target.value })
                        }
                    />
                    <Input
                        label="Confirmar contraseña"
                        type="password"
                        placeholder="Confirmar contraseña"
                        required
                        onChange={(e) =>
                            setForm({ ...form, confirmPassword: e.target.value })
                        }
                    />
                    {formError && (
                        <p className="sm:col-span-2 text-center text-sm text-red-500">
                            {formError}
                        </p>
                    )}

                    <MainButton
                        type="submit"
                        className="
                            mt-6
                            px-8
                            sm:col-span-2
                            justify-self-center
                        "
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? "Registrando..." : "Registrarse"}
                    </MainButton>

                </form>
                <p className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">O tambien puedes registrarte con</p>

                <ImageButton src={steamImage.src} className="mt-4 mx-auto w-max" imgClassName="h-10 w-auto" onClick={() => console.log("Iniciar sesión con Steam")} >

                </ImageButton>
                <p className="mt-4 text-center text-sm text-zinc-600 dark:text-zinc-400">¿Ya tienes una cuenta? <a href="/auth/login" className="text-blue-500 hover:underline">Inicia sesión</a></p>
            </div>
        </>
    );
}