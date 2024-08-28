# chat-app
Real-Time Chat Application
This is a real-time chat application built using GraphQL, Socket.IO, Redis, and MongoDB. The app supports real-time communication and caching, with extensive use of queries and mutations to manage chats, messages, groups, reactions, and users.

****Features**** :
Real-time Messaging: Instant communication between users through WebSocket with Socket.IO.
GraphQL API: Robust API with queries and mutations to manage all chat functionalities.
Caching: Efficient caching with Redis for improved performance.
MongoDB: Document-based database for storing chat data.
Authentication: Secure login, logout, and token generation.
Technologies Used
GraphQL: Query language for your API, giving clients the power to ask for exactly what they need.
Socket.IO: Enables real-time bidirectional event-based communication.
Redis: In-memory data structure store, used for caching.
MongoDB: NoSQL database used to store chat, message, group, and user data.
Directives: Custom GraphQL directives for cache management and authentication, reducing code complexity.

Installation
Clone the repository:



git clone https://github.com/yourusername/realtime-chat-app.git
cd realtime-chat-app
Install dependencies:



npm install
Set up environment variables: Create a .env file in the root directory and add the necessary environment variables:
NODE_ENV
APOLLO_INTROSPECTION
PORT
SERVICE_TOKEN
DB_URL
REDIS_HOST
REDIS_PORT
JWT_LOGIN_SECRET
NOTE:Refer package.json for commands
________________

<h1>GraphQL Schema</h1>




<h2>Mutations</h2>
<h3>User Authentication</h3>
logIn(email: String!, password: String!): logIn!
Authenticates a user and returns a login token.

logout(userId: String!): logOut!
Logs out a user.

genToken(refreshToken: String!): String!
Generates a new token using a refresh token.

<h3>Chat Management :</h3>
createChat(data: CreateChatInput!): Chat!
Creates a new chat.

createManyChat(datas: [CreateChatInput!]!): [Chat!]!
Creates multiple chats.

updateChat(data: UpdateChatInput!): Chat!
Updates an existing chat.

updateManyChat(datas: [UpdateChatInput!]!): [Chat!]!
Updates multiple chats.

deleteChat(_id: ID!): Chat!
Deletes a chat by ID.

deleteManyChat(filter: JSON!): [Chat!]!
Deletes multiple chats based on a filter.

<h3>Group Management :</h3>

addMember(data: AddMember!): Member!
Adds a member to a group.

updateMember(data: UpdateMember!): Member!
Updates a group member's details.

createGroup(data: CreateGroupInput!): Group!
Creates a new group.

createManyGroup(datas: [CreateGroupInput!]!): [Group!]!
Creates multiple groups.

updateGroup(data: UpdateGroupInput!): Group!
Updates an existing group.

updateManyGroup(datas: [UpdateGroupInput!]!): [Group!]!
Updates multiple groups.

deleteGroup(_id: ID!): Group!
Deletes a group by ID.

deleteManyGroup(filter: JSON!): [Group!]!
Deletes multiple groups based on a filter.

Message and Reaction Management :
createMessage(data: CreateMessageInput!): Message!
Creates a new message.

createManyMessage(datas: [CreateMessageInput!]!): [Message!]!
Creates multiple messages.

updateMessage(data: UpdateMessageInput!): Message!
Updates an existing message.

updateManyMessage(datas: [UpdateMessageInput!]!): [Message!]!
Updates multiple messages.

deleteMessage(_id: ID!): Message!
Deletes a message by ID.

deleteManyMessage(filter: JSON!): [Message!]!
Deletes multiple messages based on a filter.

createReaction(data: CreateReactionInput!): Reaction!
Adds a reaction to a message.

updateReaction(data: UpdateReactionInput!): Reaction!
Updates an existing reaction.

deleteReaction(_id: ID!): Boolean!
Deletes a reaction by ID.

<h3>User Management : </h3>

createUser(data: CreateUserInput!): User!
Creates a new user.

createManyUser(datas: [CreateUserInput!]!): [User!]!
Creates multiple users.

updateUser(data: UpdateUserInput!): User!
Updates an existing user.

updateManyUser(datas: [UpdateUserInput!]!): [User!]!
Updates multiple users.

deleteUser(_id: ID!): User!
Deletes a user by ID.

deleteManyUser(filter: JSON!): [User!]!
Deletes multiple users based on a filter.

<h1>Queries</h1>
<h3>Chat Queries : </h3>

getChatById(_id: ID!): Chat
Retrieves a chat by its ID.

getAllChat(search: String, filter: JSON, sort: JSON, limit: Int, offset: Int): [Chat]!
Retrieves all chats with optional search, filter, and sort.

getOneChat(filter: JSON, sort: JSON): Chat
Retrieves one chat based on a filter and sort.

getAllChatCount(search: String, filter: JSON): Int!
Retrieves the count of all chats.

<h3>Group Queries : </h3>

getGroupById(_id: ID!): Group
Retrieves a group by its ID.

getAllGroup(search: String, filter: JSON, sort: JSON, limit: Int, offset: Int): [Group]!
Retrieves all groups with optional search, filter, and sort.

getOneGroup(filter: JSON, sort: JSON): Group
Retrieves one group based on a filter and sort.

getAllGroupCount(search: String, filter: JSON): Int!
Retrieves the count of all groups.

Message and Reaction Queries
getMessageById(_id: ID!): Message
Retrieves a message by its ID.

getAllMessage(search: String, filter: JSON, sort: JSON, limit: Int, offset: Int): [Message]!
Retrieves all messages with optional search, filter, and sort.

getOneMessage(filter: JSON, sort: JSON): Message
Retrieves one message based on a filter and sort.

getAllMessageCount(search: String, filter: JSON): Int!
Retrieves the count of all messages.

getAllReactionCount(search: String, filter: JSON): Int!
Retrieves the count of all reactions.

getAllReaction(search: String, filter: JSON, sort: JSON, limit: Int, offset: Int): [Reaction]!
Retrieves all reactions with optional search, filter, and sort.

<h3>User Queries:  </h3>

getUserById(_id: ID!): User
Retrieves a user by its ID.

getAllUser(search: String, filter: JSON, sort: JSON, limit: Int, offset: Int): [User]!
Retrieves all users with optional search, filter, and sort.

getOneUser(filter: JSON, sort: JSON): User
Retrieves one user based on a filter and sort.

getAllUserCount(search: String, filter: JSON): Int!
Retrieves the count of all users.

Caching and Performance
The app uses Redis for caching to improve performance and reduce load on the MongoDB database.
Queries and mutations are decorated with @cacheSet and @cachePurge directives to manage cache effectively.
