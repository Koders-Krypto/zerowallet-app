"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TrendingUp } from "lucide-react";
import Truncate from "@/app/utils/truncate";

export default function PieChartComponent(props: any) {
  const [data, setData] = React.useState<any[]>([]);
  const [config, setConfig] = React.useState<ChartConfig>({});

  React.useEffect(() => {
    if (props.data.length > 0) {
      const newData = props.data.map((item: any, index: number) => ({
        name: item.appName,
        count: Number(parseFloat(item.balanceUSD).toFixed(0)),
        fill: `hsl(var(--chart-${index + 1}))`, // Use dynamic colors
      }));

      setData(newData);

      const newConfig = props.data.reduce(
        (acc: ChartConfig, item: any, index: number) => {
          acc[item.appName.toLowerCase()] = {
            label: item.appName,
            color: `hsl(var(--chart-${index + 1}))`,
          };
          return acc;
        },
        {} as ChartConfig
      );

      setConfig(newConfig);
    }
  }, [props.data]);

  return (
    <Card className="flex flex-col gap-1 focus:outline-0 px-0 rounded-none bg-white text-black mt-2 border border-accent">
      <CardHeader className="items-center pb-0">
        <CardTitle className="flex flex-row gap-2 justify-center items-center font-bold">
          {props.title}
          <TrendingUp className="h-6 w-6" />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={config}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey="count"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="bg-white text-white text-3xl font-bold"
                        >
                          $
                          {Truncate(
                            props.total.toFixed(0).toLocaleString(),
                            6,
                            "..."
                          )}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total Balance
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-1 font-medium text-center leading-none">
          You are holding in {props.data.length} different DeFi porotocols
        </div>
      </CardFooter>
    </Card>
  );
}
