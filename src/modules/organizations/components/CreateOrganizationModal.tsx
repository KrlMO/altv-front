"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal/Modal";
import { Input } from "@/components/ui/input/Input";
import { Textarea } from "@/components/ui/input/Textarea";
import { GeneralButton } from "@/components/ui/buttom/GeneralButton";

interface CreateOrganizationModalProps {
    isOpen: boolean;
    onClose: () => void;
    creating: boolean;
    error: string | null;
    onCreate: (name: string, description?: string) => void;
}

export function CreateOrganizationModal({
    isOpen,
    onClose,
    creating,
    error,
    onCreate,
}: CreateOrganizationModalProps) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!name.trim()) return;
        onCreate(name, description || undefined);
        setName("");
        setDescription("");
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Crear organización"
            size="md"
        >
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input
                    label="Nombre"
                    placeholder="Nombre de la organización"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <Textarea
                    label="Descripción (opcional)"
                    rows={3}
                    placeholder="Contale qué hace tu organización…"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                {error && <p className="text-xs text-red-500">{error}</p>}

                <div className="flex items-center justify-end gap-2">
                    <GeneralButton
                        variant="secondary"
                        type="button"
                        onClick={onClose}
                    >
                        Cancelar
                    </GeneralButton>
                    <GeneralButton type="submit" disabled={creating || !name.trim()}>
                        {creating ? "Creando…" : "Crear"}
                    </GeneralButton>
                </div>
            </form>
        </Modal>
    );
}
