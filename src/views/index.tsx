import { Overview } from "@/components/analytics/overview";
import { UploadedPosts } from "@/components/analytics/posts";
import { RecentPosts } from "@/components/analytics/recent-post";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ViewCard from "@/components/ViewCard";
import React from "react";
import { ArrowUpRight, Users, FileText, TrendingUp } from "lucide-react";

const StatCard = ({ title, value, change, icon }: { title: string; value: string; change: string; icon: React.ReactNode }) => (
  <Card className="hover:shadow-md transition-all duration-200">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <div className="rounded-full p-2 bg-muted">{icon}</div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <div className="flex items-center text-xs text-muted-foreground">
        <span className={change.startsWith('+') ? "text-green-500" : "text-red-500"}>
          {change}
        </span>
        <span className="ml-1">vs last 30 days</span>
      </div>
    </CardContent>
  </Card>
);

const Index = (): React.JSX.Element => {
  const stats = [
    {
      title: "TOTAL HOME POSTS",
      value: "341",
      change: "+6%",
      icon: <FileText className="h-4 w-4" />
    },
    {
      title: "ACTIVE USERS",
      value: "325",
      change: "+2%",
      icon: <Users className="h-4 w-4" />
    },
    {
      title: "INACTIVE USERS",
      value: "16",
      change: "-1%",
      icon: <Users className="h-4 w-4" />
    },
    {
      title: "NEW USERS",
      value: "27",
      change: "+6%",
      icon: <TrendingUp className="h-4 w-4" />
    }
  ];

  return (
    <ViewCard className="px-4 flex-col pt-[800px]">
      <main className="flex w-full flex-col space-y-6 p-2">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center gap-2">
            <Card className="bg-primary text-primary-foreground p-2 flex items-center gap-2">
              <span>View Analytics</span>
              <ArrowUpRight className="h-4 w-4" />
            </Card>
          </div>
        </div>

        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard 
              key={index}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              icon={stat.icon}
            />
          ))}
        </section>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Analytics Overview</CardTitle>
              <CardDescription>
                View your analytics data across all platforms.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Overview />
            </CardContent>
          </Card>
          
          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Uploads</CardTitle>
                <CardDescription>
                  Your most recent content uploads.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UploadedPosts />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Posts</CardTitle>
                <CardDescription>
                  You made 265 posts this month.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentPosts />
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Content Performance</CardTitle>
              <CardDescription>
                How your content is performing over time.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Overview />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>User Engagement</CardTitle>
              <CardDescription>
                Track user interaction with your content.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Overview />
            </CardContent>
          </Card>
        </div>
      </main>
    </ViewCard>
  );
};

export default Index;
