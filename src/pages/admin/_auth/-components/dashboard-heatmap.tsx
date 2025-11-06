import { useEffect, useMemo, useRef, useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { env } from "@/env";

interface HeatmapPoint {
  lat: number;
  lng: number;
  weight: number;
}

const generateHeatmapData = (): Array<HeatmapPoint> => {
  const points: Array<HeatmapPoint> = [];

  for (let i = 0; i < 10; i++) {
    const lat = -3.1019 + (Math.random() - 0.5) * 0.2;
    const lng = -60.0250 + (Math.random() - 0.5) * 0.2;
    const weight = Math.floor(Math.random() * 10) + 1;
    points.push({ lat, lng, weight });
  }

  return points;
};

const libraries: Array<"visualization"> = ["visualization"];

const mapContainerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: -3.1019,
  lng: -60.0250,
};

export function DashboardHeatmap() {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const heatmapData = useMemo(() => generateHeatmapData(), []);
  const heatmapLayerRef = useRef<google.maps.visualization.HeatmapLayer | null>(null);

  useEffect(() => {
    if (map && isLoaded && heatmapData.length > 0) {
      const googleHeatmapData = heatmapData.map(
        (point) =>
          new google.maps.LatLng(point.lat, point.lng)
      );

      if (heatmapLayerRef.current) {
        heatmapLayerRef.current.setMap(null);
      }

      const heatmap = new google.maps.visualization.HeatmapLayer({
        data: googleHeatmapData,
        map: map,
      });

      heatmap.set("radius", 12);
      heatmap.set("opacity", 0.5);

      const gradient = [
        "rgba(0, 255, 255, 0)",
        "rgba(0, 255, 255, 1)",
        "rgba(0, 191, 255, 1)",
        "rgba(0, 127, 255, 1)",
        "rgba(0, 63, 255, 1)",
        "rgba(0, 0, 255, 1)",
        "rgba(0, 0, 223, 1)",
        "rgba(0, 0, 191, 1)",
        "rgba(0, 0, 159, 1)",
        "rgba(0, 0, 127, 1)",
        "rgba(63, 0, 91, 1)",
        "rgba(127, 0, 63, 1)",
        "rgba(191, 0, 31, 1)",
        "rgba(255, 0, 0, 1)",
      ];

      heatmap.set("gradient", gradient);

      heatmapLayerRef.current = heatmap;
    }
  }, [map, isLoaded, heatmapData]);

  if (loadError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Mapa de Calor por Região</CardTitle>
          <CardDescription>
            Distribuição geográfica nos últimos 6 meses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[500px] text-muted-foreground">
            Erro ao carregar o mapa. Verifique a chave da API do Google Maps.
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!isLoaded) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Mapa de Calor por Região</CardTitle>
          <CardDescription>
            Distribuição geográfica de denúncias
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[500px] text-muted-foreground">
            Carregando mapa...
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mapa de Calor por Região</CardTitle>
        <CardDescription>
          Distribuição geográfica de {heatmapData.length} denúncias
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={12}
          onLoad={setMap}
          options={{
            disableDefaultUI: false,
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: true,
            fullscreenControl: true,
          }}
        >
        </GoogleMap>
      </CardContent>
    </Card>
  );
}
