import { db } from "@/db"
import { agents } from "@/db/schema"
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { agentInsertSchema, agentsUpdateSchema } from "../schemas";
import { z } from "zod";
import { and, eq, getTableColumns, sql } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const agentsRouter = createTRPCRouter({
    update: protectedProcedure.input(agentsUpdateSchema).mutation(async ({ctx, input}) => {
        const [updatedAgent] = await db.update(agents).set(input).where(
            and(
                eq(agents.id, input.id),
                eq(agents.userId, ctx.auth.user.id),
            )
        ).returning();

        if(!updatedAgent) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: "Agent not found",
            });
        }
        return updatedAgent;
    }),
    remove: protectedProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input }) => {
        const [removedAgent] = await db.delete(agents)
        .where(and(
            eq(agents.id, input.id),
            eq(agents.userId, ctx.auth.user.id),
        )).returning();

        if(!removedAgent){
            throw new TRPCError({
                code: "NOT_FOUND",
                message: "Agent not found",
            });
        }
        return removedAgent;
    }),

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