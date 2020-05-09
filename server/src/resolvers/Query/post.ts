// import { getUserId, Context } from '../utils';
import { QueryResolvers } from '../../generated/graphqlgen';

const posts: QueryResolvers.PostsResolver = (parent, args, ctx) => {
  return ctx.prisma.posts();
};

export default { posts };
