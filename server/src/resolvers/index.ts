import { Resolvers } from '../generated/graphqlgen';
import { Query } from './Query';
import { User } from './User';
import { Post } from './Post';
import { Comment } from './Comment';
import { Like } from './Like';

export const resolvers: Resolvers = {
  Query,
  User,
  Post,
  Comment,
  Like,
};
