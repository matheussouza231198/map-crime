import { AlertCircleIcon, CheckCircle2Icon, ClockIcon, FileTextIcon, TrendingUpIcon, UsersIcon } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Stat {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
  iconColor: string;
}

const stats: Array<Stat> = [
  {
    title: "Total de Denúncias",
    value: 156,
    icon: FileTextIcon,
    description: "Todas as denúncias registradas",
    iconColor: "text-blue-600",
  },
  {
    title: "Pendentes",
    value: 23,
    icon: AlertCircleIcon,
    description: "Aguardando análise",
    iconColor: "text-orange-600",
  },
  {
    title: "Em Análise",
    value: 35,
    icon: ClockIcon,
    description: "Sendo processadas",
    iconColor: "text-yellow-600",
  },
  {
    title: "Resolvidas",
    value: 98,
    icon: CheckCircle2Icon,
    description: "Concluídas com sucesso",
    iconColor: "text-green-600",
  },
  {
    title: "Usuários Ativos",
    value: 842,
    icon: UsersIcon,
    description: "Cadastrados no sistema",
    iconColor: "text-purple-600",
  },
  {
    title: "Taxa de Resolução",
    value: "72.5%",
    icon: TrendingUpIcon,
    description: "Eficiência do sistema",
    iconColor: "text-cyan-600",
  },
];

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <Icon className={`h- 4 w - 4 ${stat.iconColor}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}