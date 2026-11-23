import { useCallback, useEffect, useMemo, useState } from "react";
import type * as React from "react";
import { toast } from "sonner";
import {
  AlertCircle,
  Globe,
  LayoutGrid,
  Loader2,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  Shield,
  Sparkles,
  TableProperties,
  Trash2,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PersonagemDialog } from "@/components/PersonagemDialog";
import { DeletePersonagemDialog } from "@/components/DeletePersonagemDialog";
import {
  atualizarPersonagem,
  criarPersonagem,
  excluirPersonagem,
  listarPersonagens,
} from "@/services/api";
import type { Personagem, PersonagemPayload } from "@/types/personagem";

type ModoVisualizacao = "tabela" | "cards";

function formatarPoder(valor: number): string {
  return new Intl.NumberFormat("pt-BR").format(valor);
}

function obterNivelPoder(poder: number): {
  label: string;
  variant: "default" | "secondary" | "outline" | "destructive";
} {
  if (poder >= 100000) return { label: "Lendário", variant: "default" };
  if (poder >= 9000) return { label: "Mais de 8.000!", variant: "destructive" };
  if (poder >= 1000) return { label: "Elite", variant: "secondary" };
  return { label: "Iniciante", variant: "outline" };
}

export function Dashboard() {
  const [personagens, setPersonagens] = useState<Personagem[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [erroConexao, setErroConexao] = useState<string | null>(null);
  const [busca, setBusca] = useState<string>("");
  const [visualizacao, setVisualizacao] = useState<ModoVisualizacao>("tabela");

  const [modalFormAberto, setModalFormAberto] = useState<boolean>(false);
  const [personagemEditando, setPersonagemEditando] =
    useState<Personagem | null>(null);
  const [personagemExcluindo, setPersonagemExcluindo] =
    useState<Personagem | null>(null);

  const carregarPersonagens = useCallback(async (mostrarToast = false) => {
    try {
      setCarregando(true);
      setErroConexao(null);
      const dados = await listarPersonagens();
      setPersonagens(dados);
      if (mostrarToast) {
        toast.success("Lista de guerreiros sincronizada com a API.");
      }
    } catch (error: unknown) {
      const mensagem =
        error instanceof Error
          ? error.message
          : "Não foi possível conectar à API.";
      setErroConexao(mensagem);
      toast.error(`Falha ao carregar personagens: ${mensagem}`);
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    carregarPersonagens();
  }, [carregarPersonagens]);

  const personagensFiltrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    if (!termo) return personagens;
    return personagens.filter(
      (p) =>
        p.nome.toLowerCase().includes(termo) ||
        p.raca.toLowerCase().includes(termo) ||
        (p.planetaOrigem ?? "").toLowerCase().includes(termo)
    );
  }, [personagens, busca]);

  const metricas = useMemo(() => {
    const total = personagens.length;
    if (total === 0) {
      return {
        total: 0,
        maisForte: null as Personagem | null,
        mediaPoder: 0,
        racasUnicas: 0,
      };
    }

    let maisForte = personagens[0];
    let somaPoder = 0;
    const racas = new Set<string>();

    for (const guerreiro of personagens) {
      somaPoder += guerreiro.poderDeLuta;
      racas.add(guerreiro.raca.trim().toLowerCase());
      if (guerreiro.poderDeLuta > maisForte.poderDeLuta) {
        maisForte = guerreiro;
      }
    }

    return {
      total,
      maisForte,
      mediaPoder: Math.round(somaPoder / total),
      racasUnicas: racas.size,
    };
  }, [personagens]);

  function handleBuscaChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setBusca(event.target.value);
  }

  function abrirModalNovo(): void {
    setPersonagemEditando(null);
    setModalFormAberto(true);
  }

  function abrirModalEdicao(personagem: Personagem): void {
    setPersonagemEditando(personagem);
    setModalFormAberto(true);
  }

  async function handleSalvarPersonagem(
    dados: PersonagemPayload,
    id?: number
  ): Promise<void> {
    try {
      if (id !== undefined) {
        const atualizado = await atualizarPersonagem(id, dados);
        setPersonagens((lista) =>
          lista.map((item) => (item.id === id ? atualizado : item))
        );
        toast.success(`Guerreiro "${atualizado.nome}" atualizado com sucesso!`);
      } else {
        const criado = await criarPersonagem(dados);
        setPersonagens((lista) => [...lista, criado]);
        toast.success(`Guerreiro "${criado.nome}" cadastrado com sucesso!`);
      }
    } catch (error: unknown) {
      const mensagem =
        error instanceof Error ? error.message : "Erro ao salvar personagem.";
      toast.error(mensagem);
      throw error;
    }
  }

  async function handleConfirmarExclusao(id: number): Promise<void> {
    try {
      const alvo = personagens.find((item) => item.id === id);
      await excluirPersonagem(id);
      setPersonagens((lista) => lista.filter((item) => item.id !== id));
      toast.success(
        `Guerreiro "${alvo?.nome ?? `#${id}`}" removido com sucesso!`
      );
    } catch (error: unknown) {
      const mensagem =
        error instanceof Error ? error.message : "Erro ao excluir personagem.";
      toast.error(mensagem);
      throw error;
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Cabeçalho da página */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
            Catálogo de Guerreiros Z
          </h1>
          <p className="text-sm text-muted-foreground">
            Gerencie os personagens do universo Dragon Ball conectados à API
            REST em PostgreSQL.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => carregarPersonagens(true)}
            disabled={carregando}
          >
            <RefreshCw
              className={`size-4 ${carregando ? "animate-spin" : ""}`}
            />
            Atualizar
          </Button>
          <Button onClick={abrirModalNovo}>
            <Plus className="size-4" />
            Novo Guerreiro
          </Button>
        </div>
      </div>

      {/* Cards de Métricas */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card size="sm">
          <CardHeader className="flex flex-row items-center justify-between pb-1">
            <CardDescription>Total de Guerreiros</CardDescription>
            <Users className="size-4 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{metricas.total}</p>
            <p className="text-xs text-muted-foreground">
              Registros ativos no banco
            </p>
          </CardContent>
        </Card>

        <Card size="sm">
          <CardHeader className="flex flex-row items-center justify-between pb-1">
            <CardDescription>Maior Poder de Luta</CardDescription>
            <Trophy className="size-4 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {metricas.maisForte
                ? formatarPoder(metricas.maisForte.poderDeLuta)
                : "—"}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {metricas.maisForte
                ? `Líder: ${metricas.maisForte.nome}`
                : "Nenhum guerreiro cadastrado"}
            </p>
          </CardContent>
        </Card>

        <Card size="sm">
          <CardHeader className="flex flex-row items-center justify-between pb-1">
            <CardDescription>Média de Poder</CardDescription>
            <Zap className="size-4 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {formatarPoder(metricas.mediaPoder)}
            </p>
            <p className="text-xs text-muted-foreground">
              Força média do universo
            </p>
          </CardContent>
        </Card>

        <Card size="sm">
          <CardHeader className="flex flex-row items-center justify-between pb-1">
            <CardDescription>Raças Distintas</CardDescription>
            <Shield className="size-4 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{metricas.racasUnicas}</p>
            <p className="text-xs text-muted-foreground">
              Linhagens registradas
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Painel principal de listagem */}
      <Card>
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Personagens Cadastrados</CardTitle>
            <CardDescription>
              Exibindo {personagensFiltrados.length} de {personagens.length}{" "}
              guerreiro(s)
            </CardDescription>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative w-full sm:w-64">
              <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar nome, raça ou planeta..."
                className="pl-8"
                value={busca}
                onChange={handleBuscaChange}
              />
            </div>

            <div className="flex items-center gap-1 rounded-lg border border-border p-0.5">
              <Button
                type="button"
                size="sm"
                variant={visualizacao === "tabela" ? "default" : "ghost"}
                onClick={() => setVisualizacao("tabela")}
              >
                <TableProperties className="size-3.5" />
                Tabela
              </Button>
              <Button
                type="button"
                size="sm"
                variant={visualizacao === "cards" ? "default" : "ghost"}
                onClick={() => setVisualizacao("cards")}
              >
                <LayoutGrid className="size-3.5" />
                Cards
              </Button>
            </div>
          </div>
        </CardHeader>

        <Separator />

        <CardContent className="pt-2">
          {/* Estado de Carregamento (Loading State) */}
          {carregando ? (
            <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
              <Loader2 className="size-8 animate-spin text-primary" />
              <div>
                <p className="font-medium text-foreground">
                  Carregando guerreiros...
                </p>
                <p className="text-xs text-muted-foreground">
                  Consultando o endpoint GET /api/personagens na API
                </p>
              </div>
            </div>
          ) : erroConexao ? (
            /* Estado de Erro de Conexão */
            <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
              <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                <AlertCircle className="size-6" />
              </div>
              <div className="max-w-md space-y-1">
                <p className="font-semibold text-foreground">
                  Não foi possível carregar os personagens
                </p>
                <p className="text-xs text-muted-foreground">{erroConexao}</p>
              </div>
              <Button variant="outline" onClick={() => carregarPersonagens()}>
                <RefreshCw className="size-4" />
                Tentar novamente
              </Button>
            </div>
          ) : personagensFiltrados.length === 0 ? (
            /* Estado Vazio (Empty State) */
            <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
              <div className="flex size-12 items-center justify-center rounded-full bg-accent text-primary">
                <Sparkles className="size-6" />
              </div>
              <div className="max-w-sm space-y-1">
                <p className="font-semibold text-foreground">
                  {busca.trim()
                    ? "Nenhum guerreiro encontrado para esta busca"
                    : "Nenhum guerreiro cadastrado ainda"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {busca.trim()
                    ? "Tente limpar o filtro de pesquisa ou cadastrar um novo personagem."
                    : "Comece cadastrando Goku, Vegeta ou Piccolo clicando no botão abaixo."}
                </p>
              </div>
              {busca.trim() ? (
                <Button variant="outline" onClick={() => setBusca("")}>
                  Limpar busca
                </Button>
              ) : (
                <Button onClick={abrirModalNovo}>
                  <Plus className="size-4" />
                  Cadastrar Primeiro Guerreiro
                </Button>
              )}
            </div>
          ) : visualizacao === "tabela" ? (
            /* Visualização em Tabela (shadcn/ui Table) */
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">ID</TableHead>
                  <TableHead>Guerreiro</TableHead>
                  <TableHead>Raça</TableHead>
                  <TableHead>Planeta de Origem</TableHead>
                  <TableHead>Poder de Luta</TableHead>
                  <TableHead>Classificação</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {personagensFiltrados.map((personagem) => {
                  const nivel = obterNivelPoder(personagem.poderDeLuta);
                  return (
                    <TableRow key={personagem.id}>
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        #{personagem.id}
                      </TableCell>
                      <TableCell className="font-semibold">
                        {personagem.nome}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{personagem.raca}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5">
                          <Globe className="size-3.5 text-muted-foreground/70" />
                          {personagem.planetaOrigem || "Desconhecido"}
                        </span>
                      </TableCell>
                      <TableCell className="font-mono font-medium">
                        {formatarPoder(personagem.poderDeLuta)}
                      </TableCell>
                      <TableCell>
                        <Badge variant={nivel.variant}>{nivel.label}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => abrirModalEdicao(personagem)}
                          >
                            <Pencil className="size-3.5" />
                            Editar
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => setPersonagemExcluindo(personagem)}
                          >
                            <Trash2 className="size-3.5" />
                            Excluir
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            /* Visualização em Cards Responsivos (shadcn/ui Card) */
            <div className="grid grid-cols-1 gap-4 py-2 sm:grid-cols-2 lg:grid-cols-3">
              {personagensFiltrados.map((personagem) => {
                const nivel = obterNivelPoder(personagem.poderDeLuta);
                return (
                  <Card key={personagem.id} size="sm" className="flex flex-col">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <CardTitle>{personagem.nome}</CardTitle>
                          <CardDescription className="mt-0.5 flex items-center gap-1">
                            <Globe className="size-3" />
                            {personagem.planetaOrigem || "Desconhecido"}
                          </CardDescription>
                        </div>
                        <Badge variant="secondary">{personagem.raca}</Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Poder de Luta
                        </p>
                        <p className="font-mono text-lg font-bold text-primary">
                          {formatarPoder(personagem.poderDeLuta)}
                        </p>
                      </div>
                      <Badge variant={nivel.variant}>{nivel.label}</Badge>
                    </CardContent>

                    <CardFooter className="justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => abrirModalEdicao(personagem)}
                      >
                        <Pencil className="size-3.5" />
                        Editar
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => setPersonagemExcluindo(personagem)}
                      >
                        <Trash2 className="size-3.5" />
                        Excluir
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modais de Cadastro/Edição e Confirmação de Exclusão */}
      <PersonagemDialog
        open={modalFormAberto}
        onOpenChange={setModalFormAberto}
        personagemEditando={personagemEditando}
        onSalvar={handleSalvarPersonagem}
      />

      <DeletePersonagemDialog
        personagem={personagemExcluindo}
        onOpenChange={(aberto) => {
          if (!aberto) setPersonagemExcluindo(null);
        }}
        onConfirmar={handleConfirmarExclusao}
      />
    </div>
  );
}
