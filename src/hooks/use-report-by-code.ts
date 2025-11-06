import { useQuery } from "@tanstack/react-query";

import type { Report } from "@/interfaces/report";

const fetchReport = async (code: string): Promise<Report | null> => {
  // TODO: Replace with real API call

  await new Promise((resolve) => setTimeout(resolve, 2000));

  if (code !== "ABC123DEF4") {
    return null;
  }

  return {
    id: "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6",
    code: "ABC123DEF4",
    category: "Roubo",
    description: "Roubo de bicicleta na rua principal.",
    location: {
      coordinates: { lat: -23.55052, lng: -46.633308 },
      address: "Rua Principal, 123, São Paulo, SP",
    },
    status: "resolvido",
    responsibleEntity: "Delegacia de São Paulo",
    observations: [
      {
        content: "Atualização: Investigação em andamento.",
        createdAt: new Date("2024-01-16T12:45:00Z"),
      },
      {
        content: "Atualização: Suspeito identificado.",
        createdAt: new Date("2024-01-17T14:20:00Z"),
      },
      {
        content: "Relato final: Caso resolvido.",
        createdAt: new Date("2024-01-20T09:15:00Z"),
      }
    ],
    attachments: [
      {
        url: "https://example.com/images/bike-theft.jpg",
        type: "image",
        sizeInBytes: 204800,
        name: "bike-theft.jpg",
      },
      {
        url: "https://example.com/documents/police-report.pdf",
        type: "document",
        sizeInBytes: 102400,
        name: "police-report.pdf",
      }
    ],
    createdAt: new Date("2024-01-15T10:30:00Z"),
    updatedAt: new Date("2024-01-20T09:15:00Z"),
  };
};

export function useReportByCode(code: string) {
  const query = useQuery({
    queryKey: ["report-by-code", code],
    queryFn: () => fetchReport(code),
    enabled: !!code,
    // retry: 0,
  });

  return query;
}