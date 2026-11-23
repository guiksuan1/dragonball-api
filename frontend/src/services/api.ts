import type {
  ApiErrorResponse,
  HealthResponse,
  Personagem,
  PersonagemPayload,
} from "@/types/personagem";

const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:3000"
).replace(/\/$/, "");

async function parseErrorMessage(response: Response): Promise<string> {
  try {
    const data = (await response.json()) as ApiErrorResponse;
    if (data.erro) {
      return data.detalhe ? `${data.erro} (${data.detalhe})` : data.erro;
    }
  } catch {
    // Resposta sem corpo JSON
  }
  return `Erro HTTP ${response.status} ao comunicar com a API.`;
}

export async function listarPersonagens(): Promise<Personagem[]> {
  const response = await fetch(`${API_BASE_URL}/api/personagens`);
  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }
  return (await response.json()) as Personagem[];
}

export async function buscarPersonagemPorId(id: number): Promise<Personagem> {
  const response = await fetch(`${API_BASE_URL}/api/personagens/${id}`);
  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }
  return (await response.json()) as Personagem;
}

export async function criarPersonagem(
  payload: PersonagemPayload
): Promise<Personagem> {
  const response = await fetch(`${API_BASE_URL}/api/personagens`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }
  return (await response.json()) as Personagem;
}

export async function atualizarPersonagem(
  id: number,
  payload: PersonagemPayload
): Promise<Personagem> {
  const response = await fetch(`${API_BASE_URL}/api/personagens/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }
  return (await response.json()) as Personagem;
}

export async function excluirPersonagem(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/personagens/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }
}

export async function verificarSaudeApi(): Promise<HealthResponse> {
  const response = await fetch(`${API_BASE_URL}/api/health`);
  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }
  return (await response.json()) as HealthResponse;
}

export { API_BASE_URL };
