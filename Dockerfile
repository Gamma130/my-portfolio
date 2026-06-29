
# Install Dependencies
From node:22-alpine AS deps
WORKDIR /app

RUN apk add --no-cache libc6-compat python3 make g++
COPY package.json package-lock.json* ./
RUN npm ci

# Build Container
FROM node:22-alpine AS builder
WORKDIR /app

RUN apk add --no-cache libc6-compat python3 make g++
COPY --from=deps /app/node_modules ./node_modules
COPY . .
