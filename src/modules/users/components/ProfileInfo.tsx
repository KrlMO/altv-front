import { useState } from "react";
import { Line } from "@/components/ui/line/line";
import { Input } from "@/components/ui/input/Input";
import { InputDate } from "@/components/ui/input/InputDate";
import { SelectCountry } from "@/modules/shared/country/components/SelectCountry";
import { User } from "@/types/user";
import { SecondaryButton } from "@/components/ui/buttom/SecondaryButton";

type Props = {
    user: User;
};

export function ProfileInfo({ user }: Props) {
    const email = user.auth.find((a) => a.provider === "local")?.provider_uid;

    const [form, setForm] = useState({
        first_name: user.first_name ?? "",
        last_name: user.last_name ?? "",
        birth_date: user.birth_date ?? "",
        country_id: user.country?.id,
    });

    return (
        <div className="px-4 sm:px-6 pb-6">
            <h2 className="text-lg font-semibold dark:text-white">
                Datos personales
            </h2>
            <Line color="#e5e7eb" width={100} />

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                    label="Nombres"
                    value={form.first_name}
                    onChange={(e) =>
                        setForm({ ...form, first_name: e.target.value })
                    }
                />
                <Input
                    label="Apellidos"
                    value={form.last_name}
                    onChange={(e) =>
                        setForm({ ...form, last_name: e.target.value })
                    }
                />
                <InputDate
                    label="Fecha de nacimiento"
                    value={form.birth_date}
                    onChange={(e) =>
                        setForm({ ...form, birth_date: e.target.value })
                    }
                />
                <SelectCountry
                    label="País"
                    value={form.country_id}
                    onChange={(id) =>
                        setForm({ ...form, country_id: id })
                    }
                />
                <div className="md:col-span-2">
                    <Input
                        label="Correo electrónico"
                        value={email || ""}
                        disabled
                    />
                </div>
            </div>

            <SecondaryButton className="mt-6" disabled>
                Cambiar contraseña
            </SecondaryButton>
        </div>
    );
}