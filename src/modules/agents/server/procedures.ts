import { db } from "@/db"
import { agents } from "@/db/schema"
import { baseProcedure, createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { agentInsertSchema } from "../schemas";

export const agentsRouter = createTRPCRouter({
    getMany: baseProcedure.query(async () => {
        const data = await db.select().from(agents)

        await new Promise((resolve) => setTimeout(resolve, 5000))
        return data;
    }),
    create: protectedProcedure
        .input(agentInsertSchema)
        .mutation(async ({ input, ctx }) => {
            const [createdAgent] = await db
                .insert(agents)
                .values({
                    ...input, userId: ctx.auth.user.id,
                })
                .returning()

            return createdAgent;
        })


})