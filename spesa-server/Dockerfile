########################
# BUILD FOR PRODUCTION #
########################

FROM node:23.11-alpine AS build

# Create app directory
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY --chown=node:node package*.json ./

# In order to run `npm run build` we need access to the Nest CLI which is a dev dependency. In the previous development stage we ran `npm ci` which installed all dependencies, so we can copy over the node_modules directory from the development image
RUN npm ci

# Bundle app source
COPY --chown=node:node . .

RUN npm run build

# Running `npm ci` removes the existing node_modules directory and passing in --only=production ensures that only the production dependencies are installed. This ensures that the node_modules directory is as optimized as possible
RUN npm ci --only=production && npm cache clean --force

# Use the node user from the image (instead of the root user)
USER node

##############
# PRODUCTION #
##############

FROM node:23.11-alpine AS production

# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

EXPOSE 8080

# Start the server using the production build
CMD [ "node", "dist/src/main.js" ]