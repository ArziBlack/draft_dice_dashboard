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

const Index = (): React.JSX.Element => {
  return (
    <ViewCard className="pl-8">
      <main className="flex w-full items-center justify-center min-h-screen p-2 pb-20">
        <section className="flex-1 space-y-4 px-1">
          <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="hover:bg-sky-400">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  TOTAL HOME POSTS
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">341</div>
                <p className="text-xs text-muted-foreground">
                  6% vs last 30 days
                </p>
              </CardContent>
            </Card>
            <Card className="hover:bg-sky-400">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  ACTIVE USERS
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">325</div>
                <p className="text-xs text-muted-foreground">
                  2% vs last 30 days
                </p>
              </CardContent>
            </Card>
            <Card className="hover:bg-sky-400">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  INACTIVE USERS
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <path d="M2 10h20" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">16</div>
                <p className="text-xs text-muted-foreground">
                  1% vs last 30 days
                </p>
              </CardContent>
            </Card>
            <Card className="hover:bg-sky-400">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">NEW USERS</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">27</div>
                <p className="text-xs text-muted-foreground">
                  6% vs last 30 days
                </p>
              </CardContent>
            </Card>
          </section>

          <CardContent className="flex flex-col lg:flex-row flex-1 w-full gap-5 p-0">
            <section className="flex flex-col lg:flex-row flex-1 w-full gap-5">
              <section className="flex flex-[0.7] flex-col gap-4">
                <Overview />
                <Overview />
              </section>

              <section className="flex flex-[0.3] flex-col gap-4">
                <UploadedPosts />
                <Card className="flex-1">
                  <CardHeader>
                    <CardTitle>Recent Post</CardTitle>
                    <CardDescription>
                      You made 265 post this month.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentPosts />
                  </CardContent>
                </Card>
              </section>
            </section>
          </CardContent>
        </section>
      </main>
    </ViewCard>
  );
};

export default Index;
