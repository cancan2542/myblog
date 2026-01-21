# Dockerfile for Astro Blog Development and Production
# Multi-stage build for optimized production images

# ===== Development Stage =====
FROM node:20-alpine AS dev

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package files
COPY app/package.json app/pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install

# Copy source code
COPY app .

# Expose development server port
EXPOSE 4321

# Start development server
CMD ["pnpm", "run", "dev", "--", "--host", "0.0.0.0"]

# ===== Build Stage =====
FROM node:20-alpine AS builder

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package files
COPY app/package.json app/pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY app .

# Build static site
RUN pnpm run build

# ===== Production Stage =====
FROM node:20-alpine AS production

WORKDIR /app

# Install a lightweight HTTP server to serve static files
RUN npm install -g http-server

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist

# Expose production server port
EXPOSE 4321

# Serve static files
CMD ["http-server", "dist", "-p", "4321", "-c-1"]
