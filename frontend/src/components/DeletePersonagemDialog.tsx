import { useState } from "react";
import { Loader2, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Personagem } from "@/types/personagem";

interface DeletePersonagemDialogProps {
  personagem: Personagem | null;
  onOpenChange: (open: boolean) => void;
  onConfirmar: (id: number) => Promise<void>;
}

export function DeletePersonagemDialog({
  personagem,
  onOpenChange,
  onConfirmar,
}: DeletePersonagemDialogProps) {
  const [excluindo, setExcluindo] = useState<boolean>(false);

  async function handleConfirmar(): Promise<void> {
    if (!personagem) return;
    try {
      setExcluindo(true);
      await onConfirmar(personagem.id);
      onOpenChange(false);
    } catch {
      // Erro já tratado via toast no componente pai
    } finally {
      setExcluindo(false);
    }
  }

  return (
    <Dialog
      open={personagem !== null}
      onOpenChange={(aberto) => {
        if (!excluindo) onOpenChange(aberto);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Excluir Guerreiro</DialogTitle>
          <DialogDescription>
            Tem certeza de que deseja remover{" "}
            <strong className="text-foreground">{personagem?.nome}</strong>? Essa
            ação envia uma requisição <code className="font-mono">DELETE</code>{" "}
            para a API e não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={excluindo}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleConfirmar}
            disabled={excluindo}
          >
            {excluindo ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Trash2 className="size-4" />
            )}
            Confirmar Exclusão
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
