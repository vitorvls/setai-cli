import { describe, it, expect, vi, beforeEach } from 'vitest';
import { retryWithBackoff } from '../utils/retry.js';

/**
 * Testes para Retry Utility
 * Testa retry com backoff exponencial
 */

describe('Retry Utility', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should succeed on first attempt', async () => {
    const fn = vi.fn().mockResolvedValue('success');
    
    const result = await retryWithBackoff(fn);
    
    expect(result).toBe('success');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should retry on retryable error', async () => {
    const fn = vi.fn()
      .mockRejectedValueOnce(new Error('rate limit'))
      .mockResolvedValueOnce('success');
    
    const promise = retryWithBackoff(fn, {
      maxRetries: 3,
      initialDelay: 100,
    });
    
    // Avança o timer para o primeiro retry
    await vi.advanceTimersByTimeAsync(100);
    
    const result = await promise;
    
    expect(result).toBe('success');
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('should use exponential backoff', async () => {
    const fn = vi.fn()
      .mockRejectedValueOnce(new Error('rate limit'))
      .mockRejectedValueOnce(new Error('rate limit'))
      .mockResolvedValueOnce('success');
    
    const promise = retryWithBackoff(fn, {
      maxRetries: 3,
      initialDelay: 100,
      backoffMultiplier: 2,
    });
    
    // Primeiro retry após 100ms
    await vi.advanceTimersByTimeAsync(100);
    // Segundo retry após 200ms (100 * 2)
    await vi.advanceTimersByTimeAsync(200);
    
    const result = await promise;
    
    expect(result).toBe('success');
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it('should respect maxDelay', async () => {
    const fn = vi.fn()
      .mockRejectedValueOnce(new Error('rate limit'))
      .mockResolvedValueOnce('success');
    
    const promise = retryWithBackoff(fn, {
      maxRetries: 3,
      initialDelay: 1000,
      maxDelay: 2000,
      backoffMultiplier: 10, // 1000 * 10 = 10000, mas maxDelay = 2000
    });
    
    // Deve usar maxDelay (2000ms) ao invés de 10000ms
    await vi.advanceTimersByTimeAsync(2000);
    
    const result = await promise;
    
    expect(result).toBe('success');
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('should throw non-retryable error immediately', async () => {
    const fn = vi.fn().mockRejectedValue(new Error('permission denied'));
    
    const promise = retryWithBackoff(fn, {
      maxRetries: 3,
      retryableErrors: (error) => error.message.includes('rate limit'),
    });
    
    await expect(promise).rejects.toThrow('permission denied');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should throw after max retries', async () => {
    const fn = vi.fn().mockRejectedValue(new Error('rate limit'));
    
    const promise = retryWithBackoff(fn, {
      maxRetries: 2,
      initialDelay: 100,
    });
    
    // Primeira tentativa falha imediatamente
    // Avança para o primeiro retry (100ms)
    await vi.advanceTimersByTimeAsync(100);
    // Avança para o segundo retry (200ms)
    await vi.advanceTimersByTimeAsync(200);
    
    // Aguarda a promise ser rejeitada e captura o erro
    // Usa Promise.allSettled para garantir que a promise seja aguardada
    const result = await Promise.allSettled([promise]);
    
    expect(result[0].status).toBe('rejected');
    if (result[0].status === 'rejected') {
      expect(result[0].reason).toBeInstanceOf(Error);
      expect((result[0].reason as Error).message).toBe('rate limit');
    }
    
    expect(fn).toHaveBeenCalledTimes(3); // 1 inicial + 2 retries
  });

  it('should retry on timeout errors', async () => {
    const fn = vi.fn()
      .mockRejectedValueOnce(new Error('ETIMEDOUT'))
      .mockResolvedValueOnce('success');
    
    const promise = retryWithBackoff(fn, {
      initialDelay: 100,
    });
    
    await vi.advanceTimersByTimeAsync(100);
    
    const result = await promise;
    
    expect(result).toBe('success');
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('should retry on 429 errors', async () => {
    const fn = vi.fn()
      .mockRejectedValueOnce(new Error('429 Too Many Requests'))
      .mockResolvedValueOnce('success');
    
    const promise = retryWithBackoff(fn, {
      initialDelay: 100,
    });
    
    await vi.advanceTimersByTimeAsync(100);
    
    const result = await promise;
    
    expect(result).toBe('success');
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('should use custom retryableErrors function', async () => {
    const fn = vi.fn()
      .mockRejectedValueOnce(new Error('custom error'))
      .mockResolvedValueOnce('success');
    
    const promise = retryWithBackoff(fn, {
      initialDelay: 100,
      retryableErrors: (error) => error.message.includes('custom'),
    });
    
    await vi.advanceTimersByTimeAsync(100);
    
    const result = await promise;
    
    expect(result).toBe('success');
    expect(fn).toHaveBeenCalledTimes(2);
  });
});
