import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  AdminReport,
  AdminReportStatus,
  GenerateReportDTO,
} from "@/interfaces/admin-report";

async function fetchAdminReports(): Promise<Array<AdminReport>> {
  // TODO: Replace with real API call
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Mock data based on the image
  const mockReports: Array<AdminReport> = [
    {
      id: "1",
      title: "Relatório de Denúncias - Janeiro 2024",
      periodStart: new Date("2024-01-01"),
      periodEnd: new Date("2024-01-30"),
      periodType: "mensal",
      status: "processando",
      generatedBy: "Admin Sistema",
      generatedAt: new Date("2025-10-26"),
    },
    {
      id: "2",
      title: "Relatório de Denúncias - Fevereiro 2024",
      periodStart: new Date("2024-02-01"),
      periodEnd: new Date("2024-02-30"),
      periodType: "mensal",
      status: "concluido",
      fileUrl: "/downloads/relatorio-fevereiro-2024.pdf",
      fileSize: 2458624, // ~2.4MB
      generatedBy: "Admin Sistema",
      generatedAt: new Date("2025-10-13"),
    },
    {
      id: "3",
      title: "Relatório de Denúncias - Março 2024",
      periodStart: new Date("2024-03-01"),
      periodEnd: new Date("2024-03-30"),
      periodType: "mensal",
      status: "concluido",
      fileUrl: "/downloads/relatorio-marco-2024.pdf",
      fileSize: 3145728, // ~3MB
      generatedBy: "Admin Sistema",
      generatedAt: new Date("2025-10-20"),
    },
    {
      id: "4",
      title: "Relatório de Denúncias - Abril 2024",
      periodStart: new Date("2024-04-01"),
      periodEnd: new Date("2024-04-30"),
      periodType: "mensal",
      status: "erro",
      generatedBy: "Admin Sistema",
      generatedAt: new Date("2025-10-10"),
      errorMessage: "Erro ao processar dados do período",
    },
    {
      id: "5",
      title: "Relatório de Denúncias - Maio 2024",
      periodStart: new Date("2024-05-01"),
      periodEnd: new Date("2024-05-30"),
      periodType: "trimestral",
      status: "erro",
      generatedBy: "Admin Sistema",
      generatedAt: new Date("2025-10-23"),
      errorMessage: "Timeout ao gerar relatório",
    },
    {
      id: "6",
      title: "Relatório de Denúncias - Janeiro 2024",
      periodStart: new Date("2024-06-01"),
      periodEnd: new Date("2024-06-30"),
      periodType: "trimestral",
      status: "concluido",
      fileUrl: "/downloads/relatorio-janeiro-2024.pdf",
      fileSize: 1835008, // ~1.75MB
      generatedBy: "Admin Sistema",
      generatedAt: new Date("2025-11-06"),
    },
  ];

  return mockReports;
}

async function generateReport(data: GenerateReportDTO): Promise<AdminReport> {
  // TODO: Replace with real API call
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const month = monthNames[data.periodStart.getMonth()];
  const year = data.periodStart.getFullYear();

  return {
    id: Date.now().toString(),
    title: `Relatório de Denúncias - ${month} ${year}`,
    periodStart: data.periodStart,
    periodEnd: data.periodEnd,
    periodType: data.periodType,
    status: "processando",
    generatedBy: "Admin Sistema",
    generatedAt: new Date(),
  };
}

async function downloadReport(reportId: string): Promise<void> {
  // TODO: Replace with real download logic
  await new Promise((resolve) => setTimeout(resolve, 500));
  console.log("Downloading report:", reportId);
  // Simulate download
  alert("Download iniciado! (Funcionalidade de exemplo)");
}

export function useAdminReports() {
  return useQuery({
    queryKey: ["admin-reports"],
    queryFn: fetchAdminReports,
  });
}

export function useGenerateReport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: generateReport,
    onSuccess: () => {
      // Invalidate and refetch reports
      queryClient.invalidateQueries({ queryKey: ["admin-reports"] });
    },
  });
}

export function useDownloadReport() {
  return useMutation({
    mutationFn: downloadReport,
  });
}

export function getStatusColor(status: AdminReportStatus): string {
  switch (status) {
    case "processando":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    case "concluido":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "erro":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
  }
}

export function getStatusLabel(status: AdminReportStatus): string {
  switch (status) {
    case "processando":
      return "Processando";
    case "concluido":
      return "Concluído";
    case "erro":
      return "Erro";
    default:
      return status;
  }
}

export function getPeriodTypeLabel(type: string): string {
  switch (type) {
    case "mensal":
      return "Mensal";
    case "trimestral":
      return "Trimestral";
    case "anual":
      return "Anual";
    default:
      return type;
  }
}
