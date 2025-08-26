import { db } from "@/db"
import { agents } from "@/db/schema"
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { agentInsertSchema } from "../schemas";
import { z } from "zod";
import { eq, getTableColumns, sql } from "drizzle-orm";

export const agentsRouter = createTRPCRouter({
    getOne: protectedProcedure.input(z.object({ id: z.string() })).query(async ({ input }) => {
        const [exisitingAgent] = await db
        .select({
            // TODO: Change to actual count
            meetingCount: sql<number>`5`,
            ...getTableColumns(agents),
        }) 
        .from(agents)
        .where(eq(agents.id, input.id))

        await new Promise((resolve) => setTimeout(resolve, 5000))
        return exisitingAgent;
    }),

    getMany: protectedProcedure.query(async () => {
        const data = await db.select({
             meetingCount: sql<number>`6`,
            ...getTableColumns(agents),
        }).from(agents)

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