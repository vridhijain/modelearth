# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

AnythingLLM is a full-stack AI application that enables users to turn documents into chat contexts for LLMs. It's a monorepo with three main components:

- **Frontend**: React/Vite application with chat UI and admin interfaces
- **Server**: Node.js/Express API server handling LLM interactions and document management  
- **Collector**: Node.js service for processing and parsing documents

## Development Commands

### Setup
```bash
yarn setup                    # Install dependencies and copy .env files
yarn setup:envs              # Copy environment file templates
yarn prisma:setup            # Setup database (generate, migrate, seed)
```

### Development (run in separate terminals)
```bash
yarn dev:server              # Start server in development mode
yarn dev:frontend            # Start frontend in development mode  
yarn dev:collector           # Start collector in development mode
yarn dev:all                 # Start all services concurrently
```

### Testing & Linting
```bash
yarn test                    # Run Jest tests
yarn lint                   # Lint all components (server, frontend, collector)
```

### Production
```bash
yarn prod:frontend          # Build frontend for production
yarn prod:server            # Start server in production mode
```

### Database Management
```bash
yarn prisma:generate        # Generate Prisma client
yarn prisma:migrate         # Run database migrations
yarn prisma:seed            # Seed database with initial data
yarn prisma:reset           # Reset database and re-migrate
```

## Architecture

### Server Structure (`/server`)
- **Endpoints**: API routes organized by feature (`/endpoints`)
- **Models**: Database models using Prisma ORM (`/models`)
- **Utils**: Core utilities for AI providers, vector databases, agents (`/utils`)
- **Prisma**: Database schema and migrations (`/prisma`)

### Frontend Structure (`/frontend`)
- **Components**: Reusable UI components (`/src/components`)
- **Pages**: Route-based page components (`/src/pages`)
- **Models**: API interaction layer (`/src/models`)
- **Utils**: Frontend utilities and helpers (`/src/utils`)

### Collector Structure (`/collector`)
- **Document Processing**: Handles various file formats (PDF, DOCX, etc.)
- **Extensions**: Data connectors for external sources (GitHub, Confluence, etc.)
- **Utils**: Processing utilities and converters

## Key Development Notes

### Environment Setup
- Fill out `.env` files in each component before running
- Server requires `server/.env.development` to be properly configured
- Database setup requires running `yarn prisma:setup` after initial install

### Testing
- Use `yarn test` from root to run all tests
- Individual component tests available in each subdirectory

### Code Style
- Uses Prettier for formatting
- ESLint configuration in place for all components
- Run `yarn lint` to format code across all components

### Database
- Uses Prisma ORM with SQLite by default
- Schema located at `server/prisma/schema.prisma`
- Migrations are version-controlled in `server/prisma/migrations`

## Important Directories

- `/server/storage/`: Contains documents, models, and vector cache
- `/server/utils/AiProviders/`: LLM provider integrations
- `/server/utils/vectorDbProviders/`: Vector database integrations
- `/frontend/src/components/LLMSelection/`: UI for LLM provider configuration
- `/collector/utils/extensions/`: Document source connectors