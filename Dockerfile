FROM node:24-alpine AS base

ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV CI="true"
RUN corepack enable

COPY . /app
WORKDIR /app
EXPOSE 3000

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build
RUN pnpm deploy --filter . --prod /deployed

FROM base
COPY --from=build /deployed /app

