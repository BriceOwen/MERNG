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
  const userId = checkAuth(ctx);

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

const createComment: MutationResolvers.CreateCommentResolver = async (
  parent,
  { postId, body },
  ctx
) => {
  const userId = checkAuth(ctx);
  const post = await ctx.prisma.post({ id: postId });
  if (!post) {
    throw new Error('Post not found');
  }

  const comment = await ctx.prisma.createComment({
    body,
    post: {
      connect: {
        id: post.id,
      },
    },
    author: {
      connect: {
        id: userId,
      },
    },
  });

  await ctx.prisma.updateUser({
    data: {
      comments: {
        connect: {
          id: comment.id,
        },
      },
    },
    where: {
      id: userId,
    },
  });

  return ctx.prisma.updatePost({
    data: {
      comments: {
        connect: {
          id: comment.id,
        },
      },
    },
    where: {
      id: post.id,
    },
  });
};

const deleteComment: MutationResolvers.DeleteCommentResolver = async (
  parent,
  { postId, commentId },
  ctx
) => {
  const userId = checkAuth(ctx);

  const exists = await ctx.prisma.$exists.comment({
    id: commentId,
    author: { id: userId },
  });

  if (!exists) {
    throw new Error('Action not allowed');
  }

  const comment = await ctx.prisma.deleteComment({
    id: commentId,
  });

  if (!comment) {
    throw new Error('Error occured');
  }

  return ctx.prisma.post({ id: postId });
};

// const likePost: MutationResolvers.LikePostResolver = async (
//   parent,
//   { postId },
//   ctx
// ) => {
//   const userId = checkAuth(ctx);

//   const post = await ctx.prisma.post({ id: postId });

//   if (!post) {
//     throw new Error('Post not found');
//   }
// };

export const post = {
  createPost,
  deletePost,
  createComment,
  deleteComment,
};
