import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import type { ChartConfig } from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { date: "2024-04-01", open: 222, resolved: 150 },
  { date: "2024-04-02", open: 97, resolved: 180 },
  { date: "2024-04-03", open: 167, resolved: 120 },
  { date: "2024-04-04", open: 242, resolved: 260 },
  { date: "2024-04-05", open: 373, resolved: 290 },
  { date: "2024-04-06", open: 301, resolved: 340 },
  { date: "2024-04-07", open: 245, resolved: 180 },
  { date: "2024-04-08", open: 409, resolved: 320 },
  { date: "2024-04-09", open: 59, resolved: 110 },
  { date: "2024-04-10", open: 261, resolved: 190 },
  { date: "2024-04-11", open: 327, resolved: 350 },
  { date: "2024-04-12", open: 292, resolved: 210 },
  { date: "2024-04-13", open: 342, resolved: 380 },
  { date: "2024-04-14", open: 137, resolved: 220 },
  { date: "2024-04-15", open: 120, resolved: 170 },
  { date: "2024-04-16", open: 138, resolved: 190 },
  { date: "2024-04-17", open: 446, resolved: 360 },
  { date: "2024-04-18", open: 364, resolved: 410 },
  { date: "2024-04-19", open: 243, resolved: 180 },
  { date: "2024-04-20", open: 89, resolved: 150 },
  { date: "2024-04-21", open: 137, resolved: 200 },
  { date: "2024-04-22", open: 224, resolved: 170 },
  { date: "2024-04-23", open: 138, resolved: 230 },
  { date: "2024-04-24", open: 387, resolved: 290 },
  { date: "2024-04-25", open: 215, resolved: 250 },
  { date: "2024-04-26", open: 75, resolved: 130 },
  { date: "2024-04-27", open: 383, resolved: 420 },
  { date: "2024-04-28", open: 122, resolved: 180 },
  { date: "2024-04-29", open: 315, resolved: 240 },
  { date: "2024-04-30", open: 454, resolved: 380 },
];

const chartConfig = {
  open: {
    label: "Abertos",
    color: "var(--chart-2)",
  },
  resolved: {
    label: "Resolvidos",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function DashboardChartBar() {
  return (
    <Card className="py-0">
      <CardHeader className="border-b pt-6">
        <CardTitle>
          Denúncias nos últimos 60 dias
        </CardTitle>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("pt-BR", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("pt-BR", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar dataKey="open" fill={"var(--color-chart-2)"} />
            <Bar dataKey="resolved" fill={"var(--color-chart-3)"} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
