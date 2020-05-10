import { MutationResolvers } from '../../generated/graphqlgen';
import { checkAuth } from '../../util/check-auth';

const createPost: MutationResolvers.CreatePostResolver = async (
  parent,
  { body },
  ctx
) => {
  const userId = checkAuth(ctx);

  const post = await ctx.prisma.createPost({
    body,
    author: {
      connect: {
        id: userId,
      },
    },
  });
  return post;
};

const deletePost: MutationResolvers.DeletePostResolver = async (
  parent,
  { postId },
  ctx
) => {
  const userId = await checkAuth(ctx);

  const exists = await ctx.prisma.$exists.post({
    id: postId,
    author: { id: userId },
  });

  if (!exists) {
    return {
      action: 'Delete post',
      success: false,
      message: 'Action not allowed',
    };
  }

  const post = await ctx.prisma.deletePost({
    id: postId,
  });

  if (post) {
    return {
      action: 'Delete post',
      success: true,
      message: 'The post has been deleted',
    };
  }

  return {
    action: 'Delete post',
    success: false,
    message: 'Error occured',
  };
};

export const post = {
  createPost,
  deletePost,
};
