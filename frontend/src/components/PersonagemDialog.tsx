import { useEffect, useState } from "react";
import type * as React from "react";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Personagem, PersonagemPayload } from "@/types/personagem";

interface PersonagemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  personagemEditando: Personagem | null;
  onSalvar: (dados: PersonagemPayload, id?: number) => Promise<void>;
}

interface FormState {
  nome: string;
  raca: string;
  poderDeLuta: string;
  planetaOrigem: string;
}

const ESTADO_INICIAL: FormState = {
  nome: "",
  raca: "",
  poderDeLuta: "0",
  planetaOrigem: "",
};

export function PersonagemDialog({
  open,
  onOpenChange,
  personagemEditando,
  onSalvar,
}: PersonagemDialogProps) {
  const [form, setForm] = useState<FormState>(ESTADO_INICIAL);
  const [erroForm, setErroForm] = useState<string | null>(null);
  const [salvando, setSalvando] = useState<boolean>(false);

  const modoEdicao = personagemEditando !== null;

  useEffect(() => {
    if (open) {
      setErroForm(null);
      if (personagemEditando) {
        setForm({
          nome: personagemEditando.nome,
          raca: personagemEditando.raca,
          poderDeLuta: String(personagemEditando.poderDeLuta),
          planetaOrigem: personagemEditando.planetaOrigem ?? "",
        });
      } else {
        setForm(ESTADO_INICIAL);
      }
    }
  }, [open, personagemEditando]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;
    setForm((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    setErroForm(null);

    const nomeLimpo = form.nome.trim();
    const racaLimpa = form.raca.trim();
    const planetaLimpo = form.planetaOrigem.trim();
    const poderNumerico = Number(form.poderDeLuta);

    if (!nomeLimpo) {
      setErroForm("O campo Nome é obrigatório.");
      return;
    }

    if (!racaLimpa) {
      setErroForm("O campo Raça é obrigatório.");
      return;
    }

    if (Number.isNaN(poderNumerico) || poderNumerico < 0) {
      setErroForm("O Poder de Luta deve ser um número inteiro maior ou igual a 0.");
      return;
    }

    const payload: PersonagemPayload = {
      nome: nomeLimpo,
      raca: racaLimpa,
      poderDeLuta: Math.floor(poderNumerico),
      planetaOrigem: planetaLimpo || "Desconhecido",
    };

    try {
      setSalvando(true);
      await onSalvar(payload, personagemEditando?.id);
      onOpenChange(false);
    } catch {
      // Erro já notificado via toast no componente pai
    } finally {
      setSalvando(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {modoEdicao ? "Editar Guerreiro" : "Cadastrar Novo Guerreiro"}
          </DialogTitle>
          <DialogDescription>
            {modoEdicao
              ? "Atualize os dados do personagem selecionado e salve as alterações na API."
              : "Preencha os atributos do guerreiro para registrá-lo no banco de dados."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 py-2">
          <div className="grid gap-2">
            <Label htmlFor="nome">Nome *</Label>
            <Input
              id="nome"
              name="nome"
              placeholder="Ex.: Son Goku"
              value={form.nome}
              onChange={handleChange}
              disabled={salvando}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="raca">Raça *</Label>
            <Input
              id="raca"
              name="raca"
              placeholder="Ex.: Saiyajin, Namekuseijin, Terráqueo..."
              value={form.raca}
              onChange={handleChange}
              disabled={salvando}
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="poderDeLuta">Poder de Luta</Label>
              <Input
                id="poderDeLuta"
                name="poderDeLuta"
                type="number"
                min={0}
                step={1}
                placeholder="Ex.: 9001"
                value={form.poderDeLuta}
                onChange={handleChange}
                disabled={salvando}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="planetaOrigem">Planeta de Origem</Label>
              <Input
                id="planetaOrigem"
                name="planetaOrigem"
                placeholder="Ex.: Planeta Vegeta"
                value={form.planetaOrigem}
                onChange={handleChange}
                disabled={salvando}
              />
            </div>
          </div>

          {erroForm && (
            <p className="rounded-lg bg-destructive/10 px-3 py-2 text-xs font-medium text-destructive">
              {erroForm}
            </p>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={salvando}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={salvando}>
              {salvando && <Loader2 className="size-4 animate-spin" />}
              {modoEdicao ? "Salvar Alterações" : "Cadastrar Guerreiro"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
