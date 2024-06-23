# snake-leaderboard 🐍🏆

## Description
Backend service for a snake game leaderboard. Built with NestJS. \
Save your high score and compete with others!

```bash
npx @mkluszczynski/snake
```

## Installation

```bash
$ pnpm install
```

## How to run locally

```bash
cp .env.example .env
pnpm install
pnpm start:dev:docker
```

## Create and run migrations

```bash
pnpm migration:generate 
pnpm migration:run
```

## How to run with Docker

```bash
docker run --network=host mkluszczynski/snake-leaderboard
```
