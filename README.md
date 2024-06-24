# snake-leaderboard 🐍🏆

## Description
Backend service for a snake game leaderboard. Built with NestJS. \
Save your high score and compete with others!

## How to play

```bash
npx @mkluszczynski/snake
```

API swagger documentation is available at `/api` endpoint.

## Local development setup 
```bash
pnpm install
cp .env.example .env
pnpm install
pnpm start:dev:docker
```

## Create and run migrations

```bash
pnpm migration:generate 
pnpm migration:run
```

## Run with Docker

### Copy repository

#### With HTTPS
```bash
git clone https://github.com/mkluszczynski/snake-leaderboard.git
```

or

#### With SSH
```bash
git clone git@github.com:mkluszczynski/snake-leaderboard.git
```

### Create .env file

Remember to fill with your own values.

```bash
cp .env.example .env
```

### Run with Docker Compose

```bash
pnpm start:prod:docker
```

It will fetch the latest image from the Docker Hub and run the container.