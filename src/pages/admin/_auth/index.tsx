import { createFileRoute } from "@tanstack/react-router";
import { DashboardStats } from "./-components/dashboard-stats";
import { DashboardChartBar } from "./-components/dashboard-chart-bar";
import { DashboardHeatmap } from "./-components/dashboard-heatmap";

export const Route = createFileRoute("/admin/_auth/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Visão geral do sistema de denúncias
        </p>
      </div>

      <DashboardStats />

      <DashboardChartBar />

      <DashboardHeatmap />
    </div>
  );
}
