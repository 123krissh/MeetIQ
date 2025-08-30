import { useTRPC } from "@/trpc/client";
import { AgentGetOne } from "../../types";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { trpc } from "@/trpc/server";
import { useForm } from "react-hook-form";
import z from "zod";
import { agentInsertSchema } from "../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { GeneratedAvatar } from "../../../../components/ui/generated-avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface AgentFormProps {
  onSuccess?: () => void;
  onCancle?: () => void;
  initialValues?: AgentGetOne;
}

export const AgentsForm = ({
  onSuccess,
  onCancle,
  initialValues,
}: AgentFormProps) => {
  const trpc = useTRPC();
  const router = useRouter;
  const queryClient = useQueryClient();

  const createAgent = useMutation(
    trpc.agents.create.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.agents.getMany.queryOptions({}));
        if (initialValues?.id) {
          await queryClient.invalidateQueries(
            trpc.agents.getOne.queryOptions({ id: initialValues.id })
          );
        }
        onSuccess?.();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const form = useForm<z.infer<typeof agentInsertSchema>>({
    resolver: zodResolver(agentInsertSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      instructions: initialValues?.instructions ?? "",
    },
  });

  const isEdit = !!initialValues?.id;
  const isPending = createAgent.isPending;

  const onSubmit = (values: z.infer<typeof agentInsertSchema>) => {
    if (isEdit) {
      console.log("TODO");
    } else {
      createAgent.mutate(values);
    }
  };
  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <GeneratedAvatar
          seed={form.watch("name")}
          variant="botttsNeutral"
          className="border size-16"
        />
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g. Math tutor" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="instructions"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instructions</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="You are a helpful math assistant"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between gap-x-2">
          {onCancle && (
            <Button
              variant="ghost"
              disabled={isPending}
              type="button"
              onClick={() => onCancle()}
            >
              Cancel
            </Button>
          )}

          <Button disabled={isPending} type="submit">
            {isEdit ? "update" : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
