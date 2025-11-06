import type { Coordinates, Location } from "./location";

export type ReportStatus = "pendente" | "em_andamento" | "resolvido" | "rejeitado";

export interface Report {
  id: string;
  code: string;
  category: string;
  description: string;
  status: ReportStatus;
  location: Location;
  responsibleEntity: string | null;
  observations: Array<{
    content: string;
    createdAt: Date;
  }>;
  attachments: Array<{
    url: string;
    type: "image" | "video" | "document";
    sizeInBytes: number;
    name: string;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateReportDTO {
  category: string;
  description: string;
  coordinates: Coordinates;
  attachments?: Array<File>;
}