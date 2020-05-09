import { PostResolvers } from '../generated/graphqlgen';

export const Post: PostResolvers.Type = {
  ...PostResolvers.defaultResolvers,

  author: ({ id }, args, ctx) => {
    return ctx.prisma.post({ id }).author();
  },

  comments: ({ id }, args, ctx) => {
    return ctx.prisma.post({ id }).comments();
  },

  likes: ({ id }, args, ctx) => {
    return ctx.prisma.post({ id }).likes();
  },
};
