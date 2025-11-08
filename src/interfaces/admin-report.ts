export type ReportPeriodType = "mensal" | "trimestral" | "anual";

export type AdminReportStatus = "processando" | "concluido" | "erro";

export interface AdminReport {
  id: string;
  title: string;
  periodStart: Date;
  periodEnd: Date;
  periodType: ReportPeriodType;
  status: AdminReportStatus;
  fileUrl?: string;
  fileSize?: number;
  generatedBy: string;
  generatedAt: Date;
  errorMessage?: string;
}

export interface GenerateReportDTO {
  periodStart: Date;
  periodEnd: Date;
  periodType: ReportPeriodType;
}
