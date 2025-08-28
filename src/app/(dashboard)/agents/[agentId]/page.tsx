import { AgentIdView } from "@/modules/agents/ui/views/agent-id-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
  AgentIdViewLoading,
  AgentIdViewError,
} from "../../../../modules/agents/ui/views/agent-id-view";

interface Props {
  params: Promise<{ agentId: string }>;
}

const Page = async ({ params }: Props) => {
  const { agentId } = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.agents.getOne.queryOptions({ id: agentId })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense
        fallback={
          <p>
            <AgentIdViewLoading />
          </p>
        }
      >
        <ErrorBoundary
          fallback={
            <p>
              <AgentIdViewError />
            </p>
          }
        >
          <AgentIdView agentId={agentId}></AgentIdView>
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};
