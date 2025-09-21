import React, { useState, useMemo, PropsWithChildren } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  MessageCircleIcon,
  ShieldCheckIcon,
  SparklesIcon,
  Star,
  TrendingUp,
  TrendingDown,
  Activity,
} from "lucide-react";
import { Button } from "../ui/button";

export type Review = {
  rating: number; // The main rating for the review
  reviewCategory: { category: string; rating: number }[];
};

function computeEnhancedReviewStats(data: Review[]) {
  if (!data || data.length === 0) {
    return {
      totalReviews: 0,
      overallAverage: 0,
      categoryAverages: [],
      bestCategory: { category: "N/A", value: 0 },
      worstCategory: { category: "N/A", value: 0 },
      ratingDistribution: [],
      distributionByCategory: {},
    };
  }

  let overallRatingSum = 0;
  const overallDistributionCounter: Record<number, number> = {};
  data.forEach((review) => {
    overallRatingSum += review.rating;
    const rating = Math.round(review.rating);
    overallDistributionCounter[rating] =
      (overallDistributionCounter[rating] || 0) + 1;
  });

  const ratingDistribution = Array.from({ length: 10 }, (_, i) => i + 1).map(
    (rating) => ({
      rating: `${rating}`,
      count: overallDistributionCounter[rating] || 0,
    }),
  );

  const categoryStats: Record<
    string,
    { total: number; count: number; distribution: Record<number, number> }
  > = {};
  data.forEach((review) => {
    review.reviewCategory.forEach((cat) => {
      if (!categoryStats[cat.category]) {
        categoryStats[cat.category] = { total: 0, count: 0, distribution: {} };
      }
      categoryStats[cat.category].total += cat.rating;
      categoryStats[cat.category].count += 1;
      const rating = Math.round(cat.rating);
      categoryStats[cat.category].distribution[rating] =
        (categoryStats[cat.category].distribution[rating] || 0) + 1;
    });
  });

  const categoryAverages = Object.entries(categoryStats)
    .map(([cat, stats]) => {
      const avg =
        stats.count === 0 ? 0 : +(stats.total / stats.count).toFixed(2);
      const label = cat
        .replace(/_/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());
      return { category: label, value: avg };
    })
    .sort((a, b) => b.value - a.value);

  const distributionByCategory = Object.entries(categoryStats).reduce(
    (acc, [cat, stats]) => {
      const label = cat
        .replace(/_/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());
      acc[label] = Array.from({ length: 10 }, (_, i) => i + 1).map(
        (rating) => ({
          rating: `${rating}`,
          count: stats.distribution[rating] || 0,
        }),
      );
      return acc;
    },
    {} as Record<string, any>,
  );

  return {
    totalReviews: data.length,
    overallAverage:
      data.length > 0 ? +(overallRatingSum / data.length).toFixed(2) : 0,
    categoryAverages,
    bestCategory: categoryAverages[0] || { category: "N/A", value: 0 },
    worstCategory:
      categoryAverages[categoryAverages.length - 1] || {
        category: "N/A",
        value: 0,
      },
    ratingDistribution,
    distributionByCategory,
  };
}

const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case "cleanliness":
      return <SparklesIcon className="w-5 h-5" />;
    case "communication":
      return <MessageCircleIcon className="w-5 h-5" />;
    case "respect house rules":
      return <ShieldCheckIcon className="w-5 h-5" />;
    default:
      return <Activity className="w-5 h-5" />;
  }
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col">
            <span className="text-[0.70rem] uppercase text-muted-foreground">
              {payload[0].dataKey === "value" ? "Avg. Rating" : "Reviews"}
            </span>
            <span className="font-bold text-emerald-600">
              {payload[0].value}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const StatCard = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: any;
  icon: React.ReactNode;
}) => (
  <div className="flex items-center space-x-4 rounded-lg bg-gray-50 p-4">
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="text-lf font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

type Props = {
  reviewData: Review[];
};

const EnhancedChart: React.FC<PropsWithChildren<Props>> = ({
  reviewData,
  children,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const stats = useMemo(() => computeEnhancedReviewStats(reviewData), [
    reviewData,
  ]);

  const chartTitle = selectedCategory
    ? `${selectedCategory} - Rating Distribution`
    : "Overall Rating Distribution";
  const chartData = selectedCategory
    ? stats.distributionByCategory[selectedCategory]
    : stats.ratingDistribution;

  return (
    <Card className="w-full rounded-2xl shadow-lg shadow-gray-900/5 border-gray-200/50 bg-gradient-to-br from-white to-green-50">
      <CardHeader className="p-6 border-b">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div>
            <CardTitle className="text-2xl font-bold text-gray-800">
              Review Insights
            </CardTitle>
            <CardDescription className="text-sm text-gray-500 mt-1">
              Displaying analytics for {stats.totalReviews} filtered reviews.
            </CardDescription>
          </div>
          <div className="flex gap-4">{children}</div>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Overall Average"
            value={stats.overallAverage}
            icon={<Star className="w-6 h-6" />}
          />
          <StatCard
            title="Best Category"
            value={stats.bestCategory.category}
            icon={<TrendingUp className="w-6 h-6" />}
          />
          <StatCard
            title="Worst Category"
            value={stats.worstCategory.category}
            icon={<TrendingDown className="w-6 h-6" />}
          />
          <StatCard
            title="Total Reviews"
            value={stats.totalReviews}
            icon={<MessageCircleIcon className="w-6 h-6" />}
          />
        </div>
      </CardHeader>

      <CardContent className="p-6 grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <h3 className="text-lg font-semibold text-gray-700">{chartTitle}</h3>
          <div className="w-full h-[300px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="rating"
                  tick={{ fill: "#4b5563", fontSize: 12 }}
                  unit="★"
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fill: "#4b5563", fontSize: 12 }}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: "rgba(16, 185, 129, 0.1)" }}
                />
                <Bar
                  dataKey="count"
                  name="Reviews"
                  fill="#10b981"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-700">
            Category Averages
          </h3>
          <div className="w-full h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart
                cx="50%"
                cy="50%"
                outerRadius="80%"
                data={stats.categoryAverages}
              >
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis
                  dataKey="category"
                  tick={{ fill: "#4b5563", fontSize: 12 }}
                />
                <Radar
                  dataKey="value"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.6}
                />
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4">
            <p className="text-xs text-gray-500 mb-2 font-medium">
              CLICK A CATEGORY TO DRILL DOWN
            </p>
            <div className="space-y-2">
              <Button
                variant={!selectedCategory ? "secondary" : "ghost"}
                size="sm"
                className="w-full justify-start"
                onClick={() => setSelectedCategory(null)}
              >
                Overall Distribution
              </Button>
              {stats.categoryAverages.map((item) => (
                <Button
                  key={item.category}
                  variant={
                    selectedCategory === item.category ? "secondary" : "ghost"
                  }
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => setSelectedCategory(item.category)}
                >
                  <div className="flex items-center gap-3">
                    {getCategoryIcon(item.category)}
                    <span>{item.category}</span>
                    <span className="ml-auto font-bold">{item.value}</span>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedChart;