import { ScatterPlotSvgProps } from "@nivo/scatterplot";
const ResponsiveScatterPlot = dynamic(() => import("@nivo/scatterplot").then((mod) => mod.ResponsiveScatterPlot), {
  ssr: false,
});
import dynamic from "next/dynamic";
// types
import { CHARTS_THEME, DEFAULT_MARGIN } from "@/constants/graph";
import { TGraph } from "./types";
// constants

export const ScatterPlotGraph: React.FC<TGraph & Omit<ScatterPlotSvgProps<any>, "height" | "width">> = ({
  height = "400px",
  width = "100%",
  margin,
  theme,
  ...rest
}) => (
  <div style={{ height, width }}>
    <ResponsiveScatterPlot
      margin={{ ...DEFAULT_MARGIN, ...(margin ?? {}) }}
      animate
      theme={{ ...CHARTS_THEME, ...(theme ?? {}) }}
      {...rest}
    />
  </div>
);
