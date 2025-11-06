import { createFileRoute } from "@tanstack/react-router";
import { EyeIcon, SearchIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/admin/_auth/reports")({
  component: ReportsComponent,
});

function ReportsComponent() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Denúncias</h1>
        <p className="text-muted-foreground mt-2">
          Gerencie todas as denúncias do sistema
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar por código ou título..."
                className="pl-9"
              />
            </div>
            <Select>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="em_analise">Em Análise</SelectItem>
                <SelectItem value="resolvida">Resolvida</SelectItem>
                <SelectItem value="arquivada">Arquivada</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Relatórios de Denúncias</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div
              key="DEN-0001"
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-mono text-sm font-medium">
                    DEN-0001
                  </span>
                  <StatusBadge status="pendente" />
                </div>
                <h3 className="font-medium mt-1 truncate">
                  Irregularidade na obra pública
                </h3>
                <p className="text-sm text-muted-foreground">
                  Criada em {new Date("2023-01-01").toLocaleDateString("pt-BR")}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => { }}
              >
                <EyeIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
