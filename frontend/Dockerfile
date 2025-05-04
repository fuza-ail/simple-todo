# client/Dockerfile
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app source code
COPY . .

# Build for production
RUN npm run build

# Install serve to run the application
RUN npm install -g serve

# Expose port
EXPOSE 3000

# Start the app
CMD ["serve", "dist", "-p", "3000"]