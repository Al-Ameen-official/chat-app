import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { IUserDocument } from '../../../modules/user/user.model';
import { IChatDocument } from '../../../modules/chat/chat.model';
import { IMessageDocument } from '../../../modules/message/message.model';
import { IReactionDocument } from '../../../modules/message/reaction.model';
import { IGroupDocument } from '../../../modules/group/group.model';
import { IMemberDocument } from '../../../modules/group/member.model';
import { ChatAppContext } from '../index';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: Date; output: Date; }
  EmailAddress: { input: string; output: string; }
  JSON: { input: any; output: any; }
  Password: { input: any; output: any; }
};

export type AddMember = {
  isAdmin: Scalars['Boolean']['input'];
  isDeleted?: InputMaybe<Scalars['Boolean']['input']>;
  totalUnreadMessages?: InputMaybe<Scalars['Int']['input']>;
  userId: Scalars['ID']['input'];
  userName: Scalars['ID']['input'];
};

export type CachePurgeInput = {
  identifier?: InputMaybe<Scalars['String']['input']>;
  types: Array<Scalars['String']['input']>;
};

export type Chat = {
  __typename?: 'Chat';
  Messages?: Maybe<Array<Maybe<Message>>>;
  _id: Scalars['ID']['output'];
  chatWith: Scalars['ID']['output'];
  chatWithUser?: Maybe<User>;
  isMute?: Maybe<Scalars['Boolean']['output']>;
  isblocked?: Maybe<Scalars['Boolean']['output']>;
  totalMessages?: Maybe<Scalars['Int']['output']>;
  totalUnreadMessages?: Maybe<Scalars['Int']['output']>;
  user?: Maybe<User>;
  userId: Scalars['ID']['output'];
};


export type ChatMessagesArgs = {
  filter?: InputMaybe<Scalars['JSON']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['JSON']['input']>;
};

export type CreateChatInput = {
  chatWith: Scalars['ID']['input'];
  isMute?: InputMaybe<Scalars['Boolean']['input']>;
  isblocked?: InputMaybe<Scalars['Boolean']['input']>;
  totalMessages?: InputMaybe<Scalars['Int']['input']>;
  totalUnreadMessages?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateGroupInput = {
  createdBy: Scalars['ID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  totalMessages?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateMessageInput = {
  chatId: Scalars['ID']['input'];
  isDeleted?: InputMaybe<Scalars['Boolean']['input']>;
  isGroupMessage: Scalars['Boolean']['input'];
  message: Scalars['String']['input'];
  messageType: MessageType;
  read?: InputMaybe<Scalars['Boolean']['input']>;
  receiverId: Scalars['ID']['input'];
  senderId?: InputMaybe<Scalars['ID']['input']>;
};

export type CreateReactionInput = {
  isDeleted: Scalars['Boolean']['input'];
  messageId: Scalars['ID']['input'];
  reaction: Scalars['String']['input'];
  read: Scalars['Boolean']['input'];
  senderId: Scalars['ID']['input'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
};

export type Group = {
  __typename?: 'Group';
  _id: Scalars['ID']['output'];
  createdBy: Scalars['ID']['output'];
  description?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  totalMessages?: Maybe<Scalars['Int']['output']>;
};

export type Member = {
  __typename?: 'Member';
  isAdmin: Scalars['Boolean']['output'];
  isDeleted?: Maybe<Scalars['Boolean']['output']>;
  totalUnreadMessages?: Maybe<Scalars['Int']['output']>;
  userId: Scalars['ID']['output'];
  userName: Scalars['ID']['output'];
};

export type Message = {
  __typename?: 'Message';
  _id: Scalars['ID']['output'];
  chat?: Maybe<Chat>;
  chatId: Scalars['ID']['output'];
  isDeleted?: Maybe<Scalars['Boolean']['output']>;
  isGroupMessage: Scalars['Boolean']['output'];
  message: Scalars['String']['output'];
  messageType: MessageType;
  reactions?: Maybe<Array<Maybe<Reaction>>>;
  read?: Maybe<Scalars['Boolean']['output']>;
  receiver?: Maybe<User>;
  receiverId: Scalars['ID']['output'];
  sender?: Maybe<User>;
  senderId?: Maybe<Scalars['ID']['output']>;
};


export type MessageReactionsArgs = {
  filter?: InputMaybe<Scalars['JSON']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['JSON']['input']>;
};

export enum MessageType {
  Audio = 'AUDIO',
  Doc = 'DOC',
  Text = 'TEXT',
  Video = 'VIDEO'
}

export type Mutation = {
  __typename?: 'Mutation';
  addMember: Member;
  createChat: Chat;
  createGroup: Group;
  createManyChat: Array<Chat>;
  createManyGroup: Array<Group>;
  createManyMessage: Array<Message>;
  createManyUser: Array<User>;
  createMessage: Message;
  createReaction: Reaction;
  createUser: User;
  deleteChat: Chat;
  deleteGroup: Group;
  deleteManyChat: Array<Chat>;
  deleteManyGroup: Array<Group>;
  deleteManyMessage: Array<Message>;
  deleteManyUser: Array<User>;
  deleteMessage: Message;
  deleteReaction: Scalars['Boolean']['output'];
  deleteUser: User;
  genToken: Scalars['String']['output'];
  logIn: LogIn;
  logout: LogOut;
  updateChat: Chat;
  updateGroup: Group;
  updateManyChat: Array<Chat>;
  updateManyGroup: Array<Group>;
  updateManyMessage: Array<Message>;
  updateManyUser: Array<User>;
  updateMember: Member;
  updateMessage: Message;
  updateReaction: Reaction;
  updateUser: User;
};


export type MutationAddMemberArgs = {
  data: AddMember;
};


export type MutationCreateChatArgs = {
  data: CreateChatInput;
};


export type MutationCreateGroupArgs = {
  data: CreateGroupInput;
};


export type MutationCreateManyChatArgs = {
  datas: Array<CreateChatInput>;
};


export type MutationCreateManyGroupArgs = {
  datas: Array<CreateGroupInput>;
};


export type MutationCreateManyMessageArgs = {
  datas: Array<CreateMessageInput>;
};


export type MutationCreateManyUserArgs = {
  datas: Array<CreateUserInput>;
};


export type MutationCreateMessageArgs = {
  data: CreateMessageInput;
};


export type MutationCreateReactionArgs = {
  data: CreateReactionInput;
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
};


export type MutationDeleteChatArgs = {
  _id: Scalars['ID']['input'];
};


export type MutationDeleteGroupArgs = {
  _id: Scalars['ID']['input'];
};


export type MutationDeleteManyChatArgs = {
  filter: Scalars['JSON']['input'];
};


export type MutationDeleteManyGroupArgs = {
  filter: Scalars['JSON']['input'];
};


export type MutationDeleteManyMessageArgs = {
  filter: Scalars['JSON']['input'];
};


export type MutationDeleteManyUserArgs = {
  filter: Scalars['JSON']['input'];
};


export type MutationDeleteMessageArgs = {
  _id: Scalars['ID']['input'];
};


export type MutationDeleteReactionArgs = {
  _id: Scalars['ID']['input'];
};


export type MutationDeleteUserArgs = {
  _id: Scalars['ID']['input'];
};


export type MutationGenTokenArgs = {
  refreshToken: Scalars['String']['input'];
};


export type MutationLogInArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationLogoutArgs = {
  userId: Scalars['String']['input'];
};


export type MutationUpdateChatArgs = {
  data: UpdateChatInput;
};


export type MutationUpdateGroupArgs = {
  data: UpdateGroupInput;
};


export type MutationUpdateManyChatArgs = {
  datas: Array<UpdateChatInput>;
};


export type MutationUpdateManyGroupArgs = {
  datas: Array<UpdateGroupInput>;
};


export type MutationUpdateManyMessageArgs = {
  datas: Array<UpdateMessageInput>;
};


export type MutationUpdateManyUserArgs = {
  datas: Array<UpdateUserInput>;
};


export type MutationUpdateMemberArgs = {
  data: UpdateMember;
};


export type MutationUpdateMessageArgs = {
  data: UpdateMessageInput;
};


export type MutationUpdateReactionArgs = {
  data: UpdateReactionInput;
};


export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  chatAppHello: Scalars['String']['output'];
  currentUser?: Maybe<User>;
  getAllChat: Array<Maybe<Chat>>;
  getAllChatCount: Scalars['Int']['output'];
  getAllGroup: Array<Maybe<Group>>;
  getAllGroupCount: Scalars['Int']['output'];
  getAllMessage: Array<Maybe<Message>>;
  getAllMessageCount: Scalars['Int']['output'];
  getAllReaction: Array<Maybe<Reaction>>;
  getAllReactionCount: Scalars['Int']['output'];
  getAllUser: Array<Maybe<User>>;
  getAllUserCount: Scalars['Int']['output'];
  getChatById?: Maybe<Chat>;
  getGroupById?: Maybe<Group>;
  getMessageById?: Maybe<Message>;
  getOneChat?: Maybe<Chat>;
  getOneGroup?: Maybe<Group>;
  getOneMessage?: Maybe<Message>;
  getOneUser?: Maybe<User>;
  getUserById?: Maybe<User>;
};


export type QueryGetAllChatArgs = {
  filter?: InputMaybe<Scalars['JSON']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryGetAllChatCountArgs = {
  filter?: InputMaybe<Scalars['JSON']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetAllGroupArgs = {
  filter?: InputMaybe<Scalars['JSON']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryGetAllGroupCountArgs = {
  filter?: InputMaybe<Scalars['JSON']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetAllMessageArgs = {
  filter?: InputMaybe<Scalars['JSON']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryGetAllMessageCountArgs = {
  filter?: InputMaybe<Scalars['JSON']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetAllReactionArgs = {
  filter?: InputMaybe<Scalars['JSON']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryGetAllReactionCountArgs = {
  filter?: InputMaybe<Scalars['JSON']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetAllUserArgs = {
  filter?: InputMaybe<Scalars['JSON']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryGetAllUserCountArgs = {
  filter?: InputMaybe<Scalars['JSON']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetChatByIdArgs = {
  _id: Scalars['ID']['input'];
};


export type QueryGetGroupByIdArgs = {
  _id: Scalars['ID']['input'];
};


export type QueryGetMessageByIdArgs = {
  _id: Scalars['ID']['input'];
};


export type QueryGetOneChatArgs = {
  filter?: InputMaybe<Scalars['JSON']['input']>;
  sort?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryGetOneGroupArgs = {
  filter?: InputMaybe<Scalars['JSON']['input']>;
  sort?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryGetOneMessageArgs = {
  filter?: InputMaybe<Scalars['JSON']['input']>;
  sort?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryGetOneUserArgs = {
  filter?: InputMaybe<Scalars['JSON']['input']>;
  sort?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryGetUserByIdArgs = {
  _id: Scalars['ID']['input'];
};

export type Reaction = {
  __typename?: 'Reaction';
  isDeleted?: Maybe<Scalars['Boolean']['output']>;
  messageId: Scalars['ID']['output'];
  reaction?: Maybe<Scalars['String']['output']>;
  read?: Maybe<Scalars['Boolean']['output']>;
  senderId: Scalars['ID']['output'];
};

export type UpdateChatInput = {
  _id: Scalars['ID']['input'];
  chatWith: Scalars['ID']['input'];
  isMute?: InputMaybe<Scalars['Boolean']['input']>;
  isblocked?: InputMaybe<Scalars['Boolean']['input']>;
  totalMessages?: InputMaybe<Scalars['Int']['input']>;
  totalUnreadMessages?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateGroupInput = {
  _id: Scalars['ID']['input'];
  createdBy: Scalars['ID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  totalMessages?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateMember = {
  isAdmin: Scalars['Boolean']['input'];
  isDeleted?: InputMaybe<Scalars['Boolean']['input']>;
  totalUnreadMessages?: InputMaybe<Scalars['Int']['input']>;
  userId: Scalars['ID']['input'];
  userName: Scalars['ID']['input'];
};

export type UpdateMessageInput = {
  _id: Scalars['ID']['input'];
  chatId: Scalars['ID']['input'];
  isDeleted?: InputMaybe<Scalars['Boolean']['input']>;
  isGroupMessage: Scalars['Boolean']['input'];
  messageType: Scalars['String']['input'];
  read?: InputMaybe<Scalars['Boolean']['input']>;
  receiverId: Scalars['ID']['input'];
  senderId?: InputMaybe<Scalars['ID']['input']>;
  type: MessageType;
};

export type UpdateReactionInput = {
  _id: Scalars['ID']['input'];
  isDeleted: Scalars['Boolean']['input'];
  messageId: Scalars['ID']['input'];
  reaction: Scalars['String']['input'];
  read: Scalars['Boolean']['input'];
  senderId: Scalars['ID']['input'];
};

export type UpdateUserInput = {
  _id: Scalars['ID']['input'];
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  password: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type LogIn = {
  __typename?: 'logIn';
  refreshToken: Scalars['String']['output'];
  token: Scalars['String']['output'];
};

export type LogOut = {
  __typename?: 'logOut';
  message: Scalars['String']['output'];
  status: Scalars['Boolean']['output'];
};

export type RateLimitInput = {
  max: Scalars['Int']['input'];
  window: Scalars['String']['input'];
};

export type RemoveMember = {
  __typename?: 'removeMember';
  isAdmin: Scalars['Boolean']['output'];
  isDeleted?: Maybe<Scalars['Boolean']['output']>;
  totalUnreadMessages?: Maybe<Scalars['Int']['output']>;
  userId: Scalars['ID']['output'];
  userName: Scalars['ID']['output'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  AddMember: AddMember;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CachePurgeInput: CachePurgeInput;
  Chat: ResolverTypeWrapper<IChatDocument>;
  CreateChatInput: CreateChatInput;
  CreateGroupInput: CreateGroupInput;
  CreateMessageInput: CreateMessageInput;
  CreateReactionInput: CreateReactionInput;
  CreateUserInput: CreateUserInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  EmailAddress: ResolverTypeWrapper<Scalars['EmailAddress']['output']>;
  Group: ResolverTypeWrapper<IGroupDocument>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  Member: ResolverTypeWrapper<IMemberDocument>;
  Message: ResolverTypeWrapper<IMessageDocument>;
  MessageType: MessageType;
  Mutation: ResolverTypeWrapper<{}>;
  Password: ResolverTypeWrapper<Scalars['Password']['output']>;
  Query: ResolverTypeWrapper<{}>;
  Reaction: ResolverTypeWrapper<IReactionDocument>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  UpdateChatInput: UpdateChatInput;
  UpdateGroupInput: UpdateGroupInput;
  UpdateMember: UpdateMember;
  UpdateMessageInput: UpdateMessageInput;
  UpdateReactionInput: UpdateReactionInput;
  UpdateUserInput: UpdateUserInput;
  User: ResolverTypeWrapper<IUserDocument>;
  logIn: ResolverTypeWrapper<LogIn>;
  logOut: ResolverTypeWrapper<LogOut>;
  rateLimitInput: RateLimitInput;
  removeMember: ResolverTypeWrapper<RemoveMember>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AddMember: AddMember;
  Boolean: Scalars['Boolean']['output'];
  CachePurgeInput: CachePurgeInput;
  Chat: IChatDocument;
  CreateChatInput: CreateChatInput;
  CreateGroupInput: CreateGroupInput;
  CreateMessageInput: CreateMessageInput;
  CreateReactionInput: CreateReactionInput;
  CreateUserInput: CreateUserInput;
  DateTime: Scalars['DateTime']['output'];
  EmailAddress: Scalars['EmailAddress']['output'];
  Group: IGroupDocument;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  JSON: Scalars['JSON']['output'];
  Member: IMemberDocument;
  Message: IMessageDocument;
  Mutation: {};
  Password: Scalars['Password']['output'];
  Query: {};
  Reaction: IReactionDocument;
  String: Scalars['String']['output'];
  UpdateChatInput: UpdateChatInput;
  UpdateGroupInput: UpdateGroupInput;
  UpdateMember: UpdateMember;
  UpdateMessageInput: UpdateMessageInput;
  UpdateReactionInput: UpdateReactionInput;
  UpdateUserInput: UpdateUserInput;
  User: IUserDocument;
  logIn: LogIn;
  logOut: LogOut;
  rateLimitInput: RateLimitInput;
  removeMember: RemoveMember;
}>;

export type AuthDirectiveArgs = { };

export type AuthDirectiveResolver<Result, Parent, ContextType = ChatAppContext, Args = AuthDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type CachePurgeDirectiveArgs = {
  payloads: Array<CachePurgeInput>;
};

export type CachePurgeDirectiveResolver<Result, Parent, ContextType = ChatAppContext, Args = CachePurgeDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type CacheSetDirectiveArgs = {
  identifier: Scalars['String']['input'];
  maxAge?: Maybe<Scalars['Int']['input']>;
  type: Scalars['String']['input'];
};

export type CacheSetDirectiveResolver<Result, Parent, ContextType = ChatAppContext, Args = CacheSetDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type RateLimitDirectiveArgs = {
  identityArgs?: Maybe<Array<Maybe<Scalars['String']['input']>>>;
  limits: Array<RateLimitInput>;
  message?: Maybe<Scalars['String']['input']>;
  uncountRejected?: Maybe<Scalars['Boolean']['input']>;
};

export type RateLimitDirectiveResolver<Result, Parent, ContextType = ChatAppContext, Args = RateLimitDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ChatResolvers<ContextType = ChatAppContext, ParentType extends ResolversParentTypes['Chat'] = ResolversParentTypes['Chat']> = ResolversObject<{
  Messages?: Resolver<Maybe<Array<Maybe<ResolversTypes['Message']>>>, ParentType, ContextType, Partial<ChatMessagesArgs>>;
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  chatWith?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  chatWithUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  isMute?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isblocked?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  totalMessages?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalUnreadMessages?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export interface EmailAddressScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['EmailAddress'], any> {
  name: 'EmailAddress';
}

export type GroupResolvers<ContextType = ChatAppContext, ParentType extends ResolversParentTypes['Group'] = ResolversParentTypes['Group']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  totalMessages?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type MemberResolvers<ContextType = ChatAppContext, ParentType extends ResolversParentTypes['Member'] = ResolversParentTypes['Member']> = ResolversObject<{
  isAdmin?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isDeleted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  totalUnreadMessages?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  userName?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MessageResolvers<ContextType = ChatAppContext, ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  chat?: Resolver<Maybe<ResolversTypes['Chat']>, ParentType, ContextType>;
  chatId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isDeleted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isGroupMessage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  messageType?: Resolver<ResolversTypes['MessageType'], ParentType, ContextType>;
  reactions?: Resolver<Maybe<Array<Maybe<ResolversTypes['Reaction']>>>, ParentType, ContextType, Partial<MessageReactionsArgs>>;
  read?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  receiver?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  receiverId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  sender?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  senderId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = ChatAppContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  addMember?: Resolver<ResolversTypes['Member'], ParentType, ContextType, RequireFields<MutationAddMemberArgs, 'data'>>;
  createChat?: Resolver<ResolversTypes['Chat'], ParentType, ContextType, RequireFields<MutationCreateChatArgs, 'data'>>;
  createGroup?: Resolver<ResolversTypes['Group'], ParentType, ContextType, RequireFields<MutationCreateGroupArgs, 'data'>>;
  createManyChat?: Resolver<Array<ResolversTypes['Chat']>, ParentType, ContextType, RequireFields<MutationCreateManyChatArgs, 'datas'>>;
  createManyGroup?: Resolver<Array<ResolversTypes['Group']>, ParentType, ContextType, RequireFields<MutationCreateManyGroupArgs, 'datas'>>;
  createManyMessage?: Resolver<Array<ResolversTypes['Message']>, ParentType, ContextType, RequireFields<MutationCreateManyMessageArgs, 'datas'>>;
  createManyUser?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationCreateManyUserArgs, 'datas'>>;
  createMessage?: Resolver<ResolversTypes['Message'], ParentType, ContextType, RequireFields<MutationCreateMessageArgs, 'data'>>;
  createReaction?: Resolver<ResolversTypes['Reaction'], ParentType, ContextType, RequireFields<MutationCreateReactionArgs, 'data'>>;
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'data'>>;
  deleteChat?: Resolver<ResolversTypes['Chat'], ParentType, ContextType, RequireFields<MutationDeleteChatArgs, '_id'>>;
  deleteGroup?: Resolver<ResolversTypes['Group'], ParentType, ContextType, RequireFields<MutationDeleteGroupArgs, '_id'>>;
  deleteManyChat?: Resolver<Array<ResolversTypes['Chat']>, ParentType, ContextType, RequireFields<MutationDeleteManyChatArgs, 'filter'>>;
  deleteManyGroup?: Resolver<Array<ResolversTypes['Group']>, ParentType, ContextType, RequireFields<MutationDeleteManyGroupArgs, 'filter'>>;
  deleteManyMessage?: Resolver<Array<ResolversTypes['Message']>, ParentType, ContextType, RequireFields<MutationDeleteManyMessageArgs, 'filter'>>;
  deleteManyUser?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationDeleteManyUserArgs, 'filter'>>;
  deleteMessage?: Resolver<ResolversTypes['Message'], ParentType, ContextType, RequireFields<MutationDeleteMessageArgs, '_id'>>;
  deleteReaction?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteReactionArgs, '_id'>>;
  deleteUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationDeleteUserArgs, '_id'>>;
  genToken?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationGenTokenArgs, 'refreshToken'>>;
  logIn?: Resolver<ResolversTypes['logIn'], ParentType, ContextType, RequireFields<MutationLogInArgs, 'email' | 'password'>>;
  logout?: Resolver<ResolversTypes['logOut'], ParentType, ContextType, RequireFields<MutationLogoutArgs, 'userId'>>;
  updateChat?: Resolver<ResolversTypes['Chat'], ParentType, ContextType, RequireFields<MutationUpdateChatArgs, 'data'>>;
  updateGroup?: Resolver<ResolversTypes['Group'], ParentType, ContextType, RequireFields<MutationUpdateGroupArgs, 'data'>>;
  updateManyChat?: Resolver<Array<ResolversTypes['Chat']>, ParentType, ContextType, RequireFields<MutationUpdateManyChatArgs, 'datas'>>;
  updateManyGroup?: Resolver<Array<ResolversTypes['Group']>, ParentType, ContextType, RequireFields<MutationUpdateManyGroupArgs, 'datas'>>;
  updateManyMessage?: Resolver<Array<ResolversTypes['Message']>, ParentType, ContextType, RequireFields<MutationUpdateManyMessageArgs, 'datas'>>;
  updateManyUser?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUpdateManyUserArgs, 'datas'>>;
  updateMember?: Resolver<ResolversTypes['Member'], ParentType, ContextType, RequireFields<MutationUpdateMemberArgs, 'data'>>;
  updateMessage?: Resolver<ResolversTypes['Message'], ParentType, ContextType, RequireFields<MutationUpdateMessageArgs, 'data'>>;
  updateReaction?: Resolver<ResolversTypes['Reaction'], ParentType, ContextType, RequireFields<MutationUpdateReactionArgs, 'data'>>;
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'data'>>;
}>;

export interface PasswordScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Password'], any> {
  name: 'Password';
}

export type QueryResolvers<ContextType = ChatAppContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  chatAppHello?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  currentUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  getAllChat?: Resolver<Array<Maybe<ResolversTypes['Chat']>>, ParentType, ContextType, Partial<QueryGetAllChatArgs>>;
  getAllChatCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType, Partial<QueryGetAllChatCountArgs>>;
  getAllGroup?: Resolver<Array<Maybe<ResolversTypes['Group']>>, ParentType, ContextType, Partial<QueryGetAllGroupArgs>>;
  getAllGroupCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType, Partial<QueryGetAllGroupCountArgs>>;
  getAllMessage?: Resolver<Array<Maybe<ResolversTypes['Message']>>, ParentType, ContextType, Partial<QueryGetAllMessageArgs>>;
  getAllMessageCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType, Partial<QueryGetAllMessageCountArgs>>;
  getAllReaction?: Resolver<Array<Maybe<ResolversTypes['Reaction']>>, ParentType, ContextType, Partial<QueryGetAllReactionArgs>>;
  getAllReactionCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType, Partial<QueryGetAllReactionCountArgs>>;
  getAllUser?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType, Partial<QueryGetAllUserArgs>>;
  getAllUserCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType, Partial<QueryGetAllUserCountArgs>>;
  getChatById?: Resolver<Maybe<ResolversTypes['Chat']>, ParentType, ContextType, RequireFields<QueryGetChatByIdArgs, '_id'>>;
  getGroupById?: Resolver<Maybe<ResolversTypes['Group']>, ParentType, ContextType, RequireFields<QueryGetGroupByIdArgs, '_id'>>;
  getMessageById?: Resolver<Maybe<ResolversTypes['Message']>, ParentType, ContextType, RequireFields<QueryGetMessageByIdArgs, '_id'>>;
  getOneChat?: Resolver<Maybe<ResolversTypes['Chat']>, ParentType, ContextType, Partial<QueryGetOneChatArgs>>;
  getOneGroup?: Resolver<Maybe<ResolversTypes['Group']>, ParentType, ContextType, Partial<QueryGetOneGroupArgs>>;
  getOneMessage?: Resolver<Maybe<ResolversTypes['Message']>, ParentType, ContextType, Partial<QueryGetOneMessageArgs>>;
  getOneUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, Partial<QueryGetOneUserArgs>>;
  getUserById?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetUserByIdArgs, '_id'>>;
}>;

export type ReactionResolvers<ContextType = ChatAppContext, ParentType extends ResolversParentTypes['Reaction'] = ResolversParentTypes['Reaction']> = ResolversObject<{
  isDeleted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  messageId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  reaction?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  read?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  senderId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = ChatAppContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LogInResolvers<ContextType = ChatAppContext, ParentType extends ResolversParentTypes['logIn'] = ResolversParentTypes['logIn']> = ResolversObject<{
  refreshToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LogOutResolvers<ContextType = ChatAppContext, ParentType extends ResolversParentTypes['logOut'] = ResolversParentTypes['logOut']> = ResolversObject<{
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RemoveMemberResolvers<ContextType = ChatAppContext, ParentType extends ResolversParentTypes['removeMember'] = ResolversParentTypes['removeMember']> = ResolversObject<{
  isAdmin?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isDeleted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  totalUnreadMessages?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  userName?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = ChatAppContext> = ResolversObject<{
  Chat?: ChatResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  EmailAddress?: GraphQLScalarType;
  Group?: GroupResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  Member?: MemberResolvers<ContextType>;
  Message?: MessageResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Password?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  Reaction?: ReactionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  logIn?: LogInResolvers<ContextType>;
  logOut?: LogOutResolvers<ContextType>;
  removeMember?: RemoveMemberResolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = ChatAppContext> = ResolversObject<{
  auth?: AuthDirectiveResolver<any, any, ContextType>;
  cachePurge?: CachePurgeDirectiveResolver<any, any, ContextType>;
  cacheSet?: CacheSetDirectiveResolver<any, any, ContextType>;
  rateLimit?: RateLimitDirectiveResolver<any, any, ContextType>;
}>;
