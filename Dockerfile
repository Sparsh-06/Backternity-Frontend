# Multi-stage build for optimal Cloud Run deployment
FROM node:18-alpine AS deps
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies (remove --frozen-lockfile for Cloud Run compatibility)
RUN pnpm install --prod

# Build stage
FROM node:18-alpine AS builder
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install all dependencies (including devDependencies) for build
RUN pnpm install

# Copy source code
COPY . .

# Build the application
RUN pnpm build

# Production stage
FROM node:18-alpine AS runner
WORKDIR /app

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Create public directory first
RUN mkdir -p ./public

# Copy built application files
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy public directory (if it exists)
COPY --from=builder --chown=nextjs:nodejs /app/public/ ./public/

USER nextjs

# Expose port (Cloud Run uses PORT environment variable)
EXPOSE 8080
ENV PORT=8080
ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"

# Start the application
CMD ["node", "server.js"]