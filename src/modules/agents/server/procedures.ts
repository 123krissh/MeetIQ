import { db } from "@/db"
import { agents } from "@/db/schema"
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { agentInsertSchema } from "../schemas";
import { z } from "zod";
import { and, eq, getTableColumns, sql } from "drizzle-orm";
import { user } from '../../../db/schema';
import { TRPCError } from "@trpc/server";

export const agentsRouter = createTRPCRouter({
    getOne: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ input, ctx }) => {
            const [exisitingAgent] = await db
                .select({
                    // TODO: Change to actual count
                    meetingCount: sql<number>`5`,
                    ...getTableColumns(agents),
                })
                .from(agents)
                .where(
                    and(
                        eq(agents.id, input.id),
                        eq(agents.userId, ctx.auth.user.id)
                    ))

            if (!exisitingAgent) {
                throw new TRPCError({ code: 'NOT_FOUND', message: "Agent not found" })
            }

            await new Promise((resolve) => setTimeout(resolve, 5000))
            return exisitingAgent;
        }),

    getMany: protectedProcedure.query(async () => {
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