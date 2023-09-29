import { clerkClient } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/dist/types/server";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const filterUserForClient = (user: User) => {
  return {
    id: user.id,
    userName: user.username,
    imageUrl: user.imageUrl,
    firstName: user.firstName,
    lastName: user.lastName,
  };
};

export const postsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.prisma.post.findMany({
      take: 100,
    });

    const clerkUsers = await clerkClient.users.getUserList({
      userId: posts.map((post) => post.authorId),
      limit: 100,
    });

    console.log("Clerk Users", clerkUsers);

    const users = clerkUsers.map(filterUserForClient);

    const results = posts.map((post) => {
      const author = users.find((user) => user.id === post.authorId);

      if (!author)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Author not found",
        });

      if (!author.userName)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Author username not found",
        });

      return {
        post,
        author: {
          ...author,
          userName: author.userName,
        },
      };
    });

    console.log("Posts with Users", results);

    return results;
  }),
});
