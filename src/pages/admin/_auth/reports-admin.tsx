import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  DownloadIcon,
  FileTextIcon,
  Loader2Icon,
  PlusIcon,
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { GenerateReportModal } from "./-components/generate-report-modal";
import {
  getPeriodTypeLabel,
  getStatusColor,
  getStatusLabel,
  useAdminReports,
  useDownloadReport,
} from "@/hooks/use-admin-reports";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/admin/_auth/reports-admin")({
  component: ReportsAdminComponent,
});

function ReportsAdminComponent() {
  const [modalOpen, setModalOpen] = useState(false);
  const { data: reports, isLoading } = useAdminReports();
  const { mutate: downloadReport, isPending: isDownloading } =
    useDownloadReport();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Relatórios</h1>
          <p className="text-muted-foreground mt-2">
            Gere e baixe relatórios do sistema
          </p>
        </div>
        <Button onClick={() => setModalOpen(true)}>
          <PlusIcon className="h-4 w-4 mr-2" />
          Gerar Relatório
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Relatórios Gerados</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="flex justify-center items-center py-12">
              <Loader2Icon className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          )}

          {reports && reports.length === 0 && (
            <div className="text-center py-12 space-y-4">
              <FileTextIcon className="h-16 w-16 mx-auto text-muted-foreground" />
              <div>
                <p className="text-muted-foreground">
                  Nenhum relatório foi gerado ainda.
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Clique em "Gerar Relatório" para criar o primeiro.
                </p>
              </div>
            </div>
          )}

          {reports && reports.length > 0 && (
            <div className="space-y-3">
              {reports.map((report) => (
                <div
                  key={report.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                      <FileTextIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="font-medium truncate">{report.title}</h3>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}
                        >
                          {getStatusLabel(report.status)}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-muted">
                          {getPeriodTypeLabel(report.periodType)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Período:{" "}
                        {format(report.periodStart, "dd/MM/yyyy", {
                          locale: ptBR,
                        })}{" "}
                        -{" "}
                        {format(report.periodEnd, "dd/MM/yyyy", {
                          locale: ptBR,
                        })}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Gerado em{" "}
                        {format(report.generatedAt, "dd/MM/yyyy", {
                          locale: ptBR,
                        })}{" "}
                        por {report.generatedBy}
                      </p>
                      {report.status === "erro" && report.errorMessage && (
                        <p className="text-xs text-destructive mt-1">
                          {report.errorMessage}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="shrink-0">
                    {report.status === "concluido" && report.fileUrl && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => downloadReport(report.id)}
                        disabled={isDownloading}
                      >
                        <DownloadIcon className="h-4 w-4" />
                        <span className="sr-only">Baixar relatório</span>
                      </Button>
                    )}
                    {report.status === "processando" && (
                      <div className="p-2">
                        <Loader2Icon className="h-5 w-5 animate-spin text-muted-foreground" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <GenerateReportModal open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  );
}
