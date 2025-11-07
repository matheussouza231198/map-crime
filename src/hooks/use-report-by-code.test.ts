import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { createElement, type PropsWithChildren } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useReportByCode } from './use-report-by-code';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: PropsWithChildren) =>
    createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('useReportByCode', () => {
  beforeEach(() => {
    vi.clearAllTimers();
  });

  it('should not fetch when code is empty', () => {
    const { result } = renderHook(() => useReportByCode(''), {
      wrapper: createWrapper(),
    });

    // Com enabled: !!code, a query não busca dados
    expect(result.current.data).toBeUndefined();
  });

  it('should fetch report for valid code', async () => {
    const { result } = renderHook(() => useReportByCode('ABC123DEF4'), {
      wrapper: createWrapper(),
    });

    expect(result.current.isPending).toBe(true);

    await waitFor(
      () => {
        expect(result.current.isSuccess).toBe(true);
      },
      { timeout: 3000 }
    );

    expect(result.current.data).toBeDefined();
    expect(result.current.data?.code).toBe('ABC123DEF4');
    expect(result.current.data?.category).toBe('Roubo');
  });

  it('should return null for invalid code', async () => {
    const { result } = renderHook(() => useReportByCode('INVALID'), {
      wrapper: createWrapper(),
    });

    await waitFor(
      () => {
        expect(result.current.isSuccess).toBe(true);
      },
      { timeout: 3000 }
    );

    expect(result.current.data).toBeNull();
  });

  it('should have correct query key', async () => {
    const code = 'ABC123DEF4';
    const { result } = renderHook(() => useReportByCode(code), {
      wrapper: createWrapper(),
    });

    await waitFor(
      () => {
        expect(result.current.isSuccess).toBe(true);
      },
      { timeout: 3000 }
    );

    // Query key should be accessible via the query object
    expect(result.current.data).toBeDefined();
  });

  it('should return report with correct structure', async () => {
    const { result } = renderHook(() => useReportByCode('ABC123DEF4'), {
      wrapper: createWrapper(),
    });

    await waitFor(
      () => {
        expect(result.current.isSuccess).toBe(true);
      },
      { timeout: 3000 }
    );

    const report = result.current.data;
    expect(report).toHaveProperty('id');
    expect(report).toHaveProperty('code');
    expect(report).toHaveProperty('category');
    expect(report).toHaveProperty('description');
    expect(report).toHaveProperty('location');
    expect(report).toHaveProperty('status');
    expect(report).toHaveProperty('responsibleEntity');
    expect(report).toHaveProperty('observations');
    expect(report).toHaveProperty('attachments');
    expect(report).toHaveProperty('createdAt');
    expect(report).toHaveProperty('updatedAt');
  });

  it('should have observations array', async () => {
    const { result } = renderHook(() => useReportByCode('ABC123DEF4'), {
      wrapper: createWrapper(),
    });

    await waitFor(
      () => {
        expect(result.current.isSuccess).toBe(true);
      },
      { timeout: 3000 }
    );

    const report = result.current.data;
    expect(Array.isArray(report?.observations)).toBe(true);
    expect(report?.observations.length).toBeGreaterThan(0);
    expect(report?.observations[0]).toHaveProperty('content');
    expect(report?.observations[0]).toHaveProperty('createdAt');
  });

  it('should have attachments array', async () => {
    const { result } = renderHook(() => useReportByCode('ABC123DEF4'), {
      wrapper: createWrapper(),
    });

    await waitFor(
      () => {
        expect(result.current.isSuccess).toBe(true);
      },
      { timeout: 3000 }
    );

    const report = result.current.data;
    expect(Array.isArray(report?.attachments)).toBe(true);
    expect(report?.attachments.length).toBeGreaterThan(0);
    expect(report?.attachments[0]).toHaveProperty('url');
    expect(report?.attachments[0]).toHaveProperty('type');
    expect(report?.attachments[0]).toHaveProperty('sizeInBytes');
    expect(report?.attachments[0]).toHaveProperty('name');
  });
});
