# FROM node:20.11.0

# # create & set working directory
# RUN mkdir -p /home/node/chat-app
# WORKDIR /home/node/chat-app

# # copy global package.json files
# COPY --chown=node package*.json ./

# # create & copy dist and package.json file of chat-app
# RUN mkdir -p apps/chat-app/dist
# COPY --chown=node ./apps/chat-app/package.json ./apps/chat-app/
# COPY --chown=node ./apps/chat-app/dist ./apps/chat-app/dist

# # install dependencies
# RUN npm install -w chat-app --include-workspace-root --ignore-scripts --omit=dev 

# ENV HOST=0.0.0.0 PORT=80

# EXPOSE ${PORT}
# CMD [ "npm", "run", "-w", "chat-app", "start" ]



# Build stage
FROM node:20.11.0 AS builder

# Create & set working directory
WORKDIR /home/node/chat-app

# Copy package.json file
COPY package*.json ./

# Install all dependencies (including dev dependencies)
RUN npm install

# Copy source files
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20.11.0

WORKDIR /home/node/chat-app

# Copy package.json file
COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy built files from builder stage
COPY --from=builder /home/node/chat-app/dist ./dist

ENV HOST=0.0.0.0 PORT=80

EXPOSE ${PORT}
CMD [ "npm", "run", "start" ]