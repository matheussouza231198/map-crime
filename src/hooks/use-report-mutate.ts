import { useMutation } from "@tanstack/react-query";
import type { CreateReportDTO } from "@/interfaces/report";

async function submitReport(_: CreateReportDTO): Promise<{ trackingCode: string }> {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return { trackingCode: "ABC123DEF4" };
}

export function useReportMutate() {
  return useMutation({
    mutationFn: submitReport,
  });
}