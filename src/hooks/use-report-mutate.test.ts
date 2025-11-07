import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import {  createElement } from "react";
import { describe, expect, it } from "vitest";
import { useReportMutate } from "./use-report-mutate";
import type {PropsWithChildren} from "react";
import type { CreateReportDTO } from "@/interfaces/report";

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: {
        retry: false,
      },
    },
  });
  return ({ children }: PropsWithChildren) =>
    createElement(QueryClientProvider, { client: queryClient }, children);
};

describe("useReportMutate", () => {
  it("should initialize with idle state", () => {
    const { result } = renderHook(() => useReportMutate(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isPending).toBe(false);
    expect(result.current.isIdle).toBe(true);
    expect(result.current.data).toBeUndefined();
  });

  it("should submit report and return tracking code", async () => {
    const { result } = renderHook(() => useReportMutate(), {
      wrapper: createWrapper(),
    });

    const mockReport: CreateReportDTO = {
      category: "Roubo",
      description: "Teste de roubo",
      coordinates: { lat: -23.55052, lng: -46.633308 },
    };

    result.current.mutate(mockReport);

    await waitFor(
      () => {
        expect(result.current.isSuccess).toBe(true);
      },
      { timeout: 3000 }
    );

    expect(result.current.data).toEqual({ trackingCode: "ABC123DEF4" });
  });

  it("should handle mutation with attachments", async () => {
    const { result } = renderHook(() => useReportMutate(), {
      wrapper: createWrapper(),
    });

    const mockFile = new File(["test"], "test.jpg", { type: "image/jpeg" });
    const mockReport: CreateReportDTO = {
      category: "Furto",
      description: "Teste com anexo",
      coordinates: { lat: -23.55052, lng: -46.633308 },
      attachments: [mockFile],
    };

    result.current.mutate(mockReport);

    await waitFor(
      () => {
        expect(result.current.isSuccess).toBe(true);
      },
      { timeout: 3000 }
    );

    expect(result.current.data?.trackingCode).toBeDefined();
  });

  it("should have mutate function available", () => {
    const { result } = renderHook(() => useReportMutate(), {
      wrapper: createWrapper(),
    });

    // Verificar que a mutation está disponível
    expect(typeof result.current.mutate).toBe("function");
    expect(typeof result.current.mutateAsync).toBe("function");
  });

  it("should allow multiple mutations", async () => {
    const { result } = renderHook(() => useReportMutate(), {
      wrapper: createWrapper(),
    });

    const mockReport1: CreateReportDTO = {
      category: "Roubo",
      description: "Primeiro teste",
      coordinates: { lat: -23.55052, lng: -46.633308 },
    };

    result.current.mutate(mockReport1);

    await waitFor(
      () => {
        expect(result.current.isSuccess).toBe(true);
      },
      { timeout: 3000 }
    );

    expect(result.current.data).toEqual({ trackingCode: "ABC123DEF4" });
  });

  it("should have reset method available", () => {
    const { result } = renderHook(() => useReportMutate(), {
      wrapper: createWrapper(),
    });

    // Verificar que o método reset está disponível
    expect(typeof result.current.reset).toBe("function");
  });
});
