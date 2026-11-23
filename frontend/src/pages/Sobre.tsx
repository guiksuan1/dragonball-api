import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Activity, CheckCircle2, RefreshCw, Server, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { API_BASE_URL, verificarSaudeApi } from "@/services/api";
import type { HealthResponse } from "@/types/personagem";

interface EndpointInfo {
  metodo: "GET" | "POST" | "PUT" | "DELETE";
  rota: string;
  descricao: string;
}

const ENDPOINTS: EndpointInfo[] = [
  { metodo: "GET", rota: "/api/health", descricao: "Verifica saúde e uptime da API" },
  { metodo: "GET", rota: "/api/personagens", descricao: "Lista todos os guerreiros" },
  { metodo: "POST", rota: "/api/personagens", descricao: "Cadastra um novo guerreiro" },
  { metodo: "PUT", rota: "/api/personagens/:id", descricao: "Atualiza um guerreiro existente" },
  { metodo: "DELETE", rota: "/api/personagens/:id", descricao: "Remove um guerreiro pelo ID" },
];

export function Sobre() {
  const [saude, setSaude] = useState<HealthResponse | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [testando, setTestando] = useState<boolean>(false);

  const testarConexao = useCallback(async (notificar = false) => {
    try {
      setTestando(true);
      setErro(null);
      const resposta = await verificarSaudeApi();
      setSaude(resposta);
      if (notificar) {
        toast.success("Conexão com a API validada com sucesso!");
      }
    } catch (error: unknown) {
      const mensagem =
        error instanceof Error ? error.message : "Erro ao conectar à API.";
      setSaude(null);
      setErro(mensagem);
      if (notificar) {
        toast.error(`API indisponível: ${mensagem}`);
      }
    } finally {
      setTestando(false);
    }
  }, []);

  useEffect(() => {
    testarConexao();
  }, [testarConexao]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
          Sobre a Aplicação & API
        </h1>
        <p className="text-sm text-muted-foreground">
          Detalhes da arquitetura SPA em React + TypeScript consumindo a Dragon
          Ball API REST.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Activity className="size-4 text-primary" />
                Status do Backend (/api/health)
              </CardTitle>
              <CardDescription>URL configurada: {API_BASE_URL}</CardDescription>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => testarConexao(true)}
              disabled={testando}
            >
              <RefreshCw
                className={`size-3.5 ${testando ? "animate-spin" : ""}`}
              />
              Testar
            </Button>
          </CardHeader>

          <CardContent className="space-y-3">
            {saude ? (
              <div className="space-y-2 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3 text-sm">
                <div className="flex items-center gap-2 font-medium text-emerald-700">
                  <CheckCircle2 className="size-4" />
                  API Respondendo ({saude.status})
                </div>
                <p className="text-muted-foreground">{saude.mensagem}</p>
                {saude.uptime !== undefined && (
                  <p className="font-mono text-xs text-muted-foreground">
                    Uptime: {saude.uptime}s
                  </p>
                )}
              </div>
            ) : erro ? (
              <div className="space-y-1 rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-sm">
                <div className="flex items-center gap-2 font-medium text-destructive">
                  <XCircle className="size-4" />
                  Falha na comunicação
                </div>
                <p className="text-xs text-muted-foreground">{erro}</p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Verificando status da API...
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="size-4 text-primary" />
              Stack Utilizada
            </CardTitle>
            <CardDescription>
              Tecnologias aplicadas nas disciplinas LDW & IEC
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Badge>React 19</Badge>
            <Badge>TypeScript Estrito</Badge>
            <Badge>Vite</Badge>
            <Badge variant="secondary">Tailwind CSS v4</Badge>
            <Badge variant="secondary">shadcn/ui</Badge>
            <Badge variant="secondary">React Router DOM</Badge>
            <Badge variant="secondary">Sonner Toasts</Badge>
            <Badge variant="outline">Express + Sequelize</Badge>
            <Badge variant="outline">PostgreSQL (Supabase)</Badge>
            <Badge variant="outline">Docker + GitHub Actions</Badge>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Endpoints Consumidos pelo Frontend</CardTitle>
          <CardDescription>
            Mapeamento completo das operações CRUD realizadas via Fetch API
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-28">Método</TableHead>
                <TableHead>Rota</TableHead>
                <TableHead>Descrição</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ENDPOINTS.map((ep) => (
                <TableRow key={`${ep.metodo}-${ep.rota}`}>
                  <TableCell>
                    <Badge
                      variant={
                        ep.metodo === "DELETE"
                          ? "destructive"
                          : ep.metodo === "POST"
                            ? "default"
                            : "secondary"
                      }
                    >
                      {ep.metodo}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-xs">{ep.rota}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {ep.descricao}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
