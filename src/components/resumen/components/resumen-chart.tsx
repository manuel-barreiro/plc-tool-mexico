"use client"

import { TrendingUp } from "lucide-react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { productData } from "@/components/resumen/data/data"

// Chart configuration for product lifecycle stages
const chartConfig = {
  inProgress: {
    label: "In Progress",
    color: "hsl(var(--chart-1))", // Use a color for "In Progress"
  },
  completed: {
    label: "Completed",
    color: "hsl(var(--chart-2))", // Use a color for "Completed"
  },
} satisfies ChartConfig

export function ResumenChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Lifecycle Progress</CardTitle>
        <CardDescription>
          Showing the number of products in progress and completed over the last
          6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        {" "}
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              accessibilityLayer
              data={productData.lifecycleProgress}
              margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)} // Shorten month names
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <defs>
                {/* Gradient for "In Progress" */}
                <linearGradient id="fillInProgress" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-inProgress)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-inProgress)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                {/* Gradient for "Completed" */}
                <linearGradient id="fillCompleted" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-completed)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-completed)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              {/* Area for "In Progress" */}
              <Area
                dataKey="inProgress"
                type="natural"
                fill="url(#fillInProgress)"
                fillOpacity={0.4}
                stroke="var(--color-inProgress)"
                stackId="a"
              />
              {/* Area for "Completed" */}
              <Area
                dataKey="completed"
                type="natural"
                fill="url(#fillCompleted)"
                fillOpacity={0.4}
                stroke="var(--color-completed)"
                stackId="a"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 8.5% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
