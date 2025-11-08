import { useState } from "react";
import { CalendarIcon, Loader2Icon } from "lucide-react";

import type { ReportPeriodType } from "@/interfaces/admin-report";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useGenerateReport } from "@/hooks/use-admin-reports";

interface GenerateReportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GenerateReportModal({
  open,
  onOpenChange,
}: GenerateReportModalProps) {
  const [periodType, setPeriodType] = useState<ReportPeriodType>("mensal");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");

  const { mutate, isPending } = useGenerateReport();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!startDate || !endDate) {
      setError("Por favor, preencha todas as datas");
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
      setError("A data inicial deve ser anterior à data final");
      return;
    }

    mutate(
      {
        periodStart: start,
        periodEnd: end,
        periodType,
      },
      {
        onSuccess: () => {
          onOpenChange(false);
          // Reset form
          setStartDate("");
          setEndDate("");
          setPeriodType("mensal");
        },
        onError: () => {
          setError("Erro ao gerar relatório. Tente novamente.");
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Gerar Novo Relatório</DialogTitle>
          <DialogDescription>
            Defina o período e o tipo de relatório que deseja gerar
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Field>
            <FieldLabel>Tipo de Relatório</FieldLabel>
            <Select
              value={periodType}
              onValueChange={(value) =>
                setPeriodType(value as ReportPeriodType)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mensal">Mensal</SelectItem>
                <SelectItem value="trimestral">Trimestral</SelectItem>
                <SelectItem value="anual">Anual</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel>Data Inicial</FieldLabel>
            <div className="relative">
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="pr-10"
                required
              />
              <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
          </Field>

          <Field>
            <FieldLabel>Data Final</FieldLabel>
            <div className="relative">
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="pr-10"
                required
              />
              <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
          </Field>

          {error && (
            <Field>
              <FieldError errors={[{ message: error }]} />
            </Field>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2Icon className="h-4 w-4 mr-2 animate-spin" />
                  Gerando...
                </>
              ) : (
                "Gerar Relatório"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
