import {
  AgentsView,
  AgentsViewLoading,
  AgentsViewError,
} from "@/modules/agents/ui/views/agents-view";
import { getQueryClient, trpc } from "@/trpc/server";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { AgentsListHearder } from "../../../modules/agents/ui/components/agents-list-header";

const Page = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());

  return (
    <>
      <AgentsListHearder />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<AgentsViewLoading />}>
          <ErrorBoundary fallback={<AgentsViewError />}>
            <AgentsView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
};

export default Page;
