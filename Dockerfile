FROM node:18-slim AS base

ARG APP=backend-nest
ARG HOME=/home/node

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable
COPY --chown=node:node . $HOME/$APP
WORKDIR $HOME/$APP

USER node

FROM base AS prod-deps
USER node
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS build
USER node
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

FROM base
USER node
COPY --chown=node:node --from=prod-deps $HOME/$APP/node_modules $HOME/$APP/node_modules
COPY --chown=node:node --from=build $HOME/$APP/dist $HOME/$APP/dist
EXPOSE 3000
CMD [ "pnpm", "start" ]