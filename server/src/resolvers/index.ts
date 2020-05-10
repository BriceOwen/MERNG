import { Resolvers } from '../generated/graphqlgen';
import { Query } from './Query';
import QueryResolversType from './Type';
import { auth } from './Mutation/auth';
import { post } from './Mutation/post';
import { User } from './User';
import { Post } from './Post';
import { Comment } from './Comment';
import { Like } from './Like';

export const resolvers: Resolvers = {
  Query,
  Mutation: {
    ...auth,
    ...post,
  },
  User,
  Post,
  Comment,
  Like,
  ...QueryResolversType,
};
