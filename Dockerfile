FROM node as build
WORKDIR /app

RUN corepack enable

COPY package.json .
COPY pnpm-lock.yaml .

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

FROM nginx:alpine as runtime

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
