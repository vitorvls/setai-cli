/**
 * Retry utility - Implementa retry com backoff exponencial
 */

/**
 * Executa uma função com retry e backoff exponencial
 * 
 * @param fn - Função assíncrona a ser executada
 * @param options - Opções de retry
 * @returns Resultado da função
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  options: {
    maxRetries?: number;
    initialDelay?: number;
    maxDelay?: number;
    backoffMultiplier?: number;
    retryableErrors?: (error: Error) => boolean;
  } = {}
): Promise<T> {
  const {
    maxRetries = 3,
    initialDelay = 1000,
    maxDelay = 10000,
    backoffMultiplier = 2,
    retryableErrors = (error: Error) => {
      // Por padrão, retry em erros de rate limit e timeout
      return (
        error.message.includes('rate limit') ||
        error.message.includes('429') ||
        error.message.includes('timeout') ||
        error.message.includes('ETIMEDOUT')
      );
    },
  } = options;

  let lastError: Error | null = null;
  let delay = initialDelay;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      // Se não for um erro retryable ou se já esgotou as tentativas, lança o erro
      if (!retryableErrors(lastError) || attempt === maxRetries) {
        throw lastError;
      }

      // Aguarda antes de tentar novamente (backoff exponencial)
      await new Promise((resolve) => globalThis.setTimeout(resolve, delay));
      delay = Math.min(delay * backoffMultiplier, maxDelay);
    }
  }

  // Nunca deve chegar aqui, mas TypeScript exige
  throw lastError || new Error('Erro desconhecido no retry');
}

