# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

AnythingLLM (with ModelEarth submodules) is a full-stack AI application that enables users to turn documents into chat contexts for LLMs. It's a monorepo with three main components:

- **Frontend**: React/Vite application with chat UI and admin interfaces
- **Server**: Node.js/Express API server handling LLM interactions and document management  
- **Collector**: Node.js service for processing and parsing documents

## Server setup shortcut

Run "server setup" to invoke the steps in the setup.md file.

## Development Commands

### Setup
```bash
yarn setup                   # Install dependencies and copy .env files
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
yarn lint                    # Lint all components (server, frontend, collector)
```

### Production
```bash
yarn prod:frontend           # Build frontend for production
yarn prod:server             # Start server in production mode
```

### Database Management
```bash
yarn prisma:generate         # Generate Prisma client
yarn prisma:migrate          # Run database migrations
yarn prisma:seed             # Seed database with initial data
yarn prisma:reset            # Reset database and re-migrate
```

### Submodule Repositories

| Name | Repository | Description |
|------|------------|-------------|
| localsite | https://github.com/ModelEarth/localsite | Core CSS / JS utilities |
| realitystream | https://github.com/modelearth/realitystream | ML Models |
| feed | https://github.com/modelearth/feed | FeedPlayer video/gallery |
| swiper | https://github.com/modelearth/swiper | UI swiper components |
| comparison | https://github.com/modelearth/comparison | Trade Flow tools |
| codechat | https://github.com/ModelEarth/codechat | Code chat interface |
| home | https://github.com/ModelEarth/home | Home page content |
| cloud | https://github.com/ModelEarth/cloud | Cloud platform tools |
| projects | https://github.com/ModelEarth/projects | Project showcases |

<br>

**Static Serving**: When present, submodules are automatically served as static directories at `http://localhost:3001/[submodule-name]/` via `submodules.cjs` configuration.

### Add all submodules (one-time setup):
```bash
git submodule add https://github.com/ModelEarth/localsite localsite && \
git submodule add https://github.com/modelearth/realitystream realitystream && \
git submodule add https://github.com/modelearth/feed feed && \
git submodule add https://github.com/modelearth/swiper swiper && \
git submodule add https://github.com/modelearth/comparison comparison && \
git submodule add https://github.com/ModelEarth/codechat codechat && \
git submodule add https://github.com/ModelEarth/home home && \
git submodule add https://github.com/ModelEarth/cloud cloud && \
git submodule add https://github.com/ModelEarth/projects projects && \
git submodule update --init --recursive && \
git commit -m "Add submodules"
```

### Update all submodules:
```bash
git submodule foreach 'git pull origin main || git pull origin master'
```

### Deploy all submodules:
```bash
git submodule foreach 'git add . && git commit -m "Deploy updates" && (git push origin main || git push origin master)'
```


### Quick Commands

When you type "restart", run this single command to restart the server in seconds:
```bash
cd $(git rev-parse --show-toplevel) && pkill -f "node.*index.js"; (cd server && NODE_ENV=production nohup node index.js > /dev/null 2>&1 &)
```

When you type "quick", add the following permissions block to setting.local.json under allow. "
When you type "confirm" or less quick", remove it:
```json
[
  "Bash(yarn setup)",
  "Bash(npx update-browserslist-db:*)",
  "Bash(mkdir:*)",
  "Bash(yarn build)",
  "Bash(cp:*)",
  "Bash(npx prisma generate:*)",
  "Bash(npx prisma migrate:*)",
  "Bash(pkill:*)",
  "Bash(curl:*)",
  "Bash(git submodule:*)"
]
```

### Code Insert / Code Remove

Use "Code Insert" to add development code snippets, or "Code Remove" to remove them. This helps avoid merge conflicts with the parent repo. Include adding and removing from .gitignore.

#### frontend/src/locales/en/common.js, frontend/src/locales/de/common.js and frontend/src/locales/pl/common.js

Replace "Whitelabeling" with "Custom Labels"
Replace "White-label" with "Custom-label"

#### server/index.js
Insert between the express.static middleware and the root route handler:

```javascript
  // Serve submodule directories (optional - see ../submodules.js)
  try {
    const { addSubmoduleStatic } = require('../submodules.js');
    addSubmoduleStatic(app);
  } catch (e) {
    console.log('Submodules not configured - continue normally. Error:', e.message);
  }
```

**Target location**: After `});` that closes `express.static()` and before `app.use("/", function (_, response) {`

#### .gitignore
Add to the end of the file (avoiding duplicates):

```
# Local settings and storage
settings.local.json
storage
server
.gitignore
```

**Target location**: Append to the end of `.gitignore` file

#### server/utils/boot/MetaGenerator.js
Add before `</head>` closing tag in the HTML template:

```html
<link type="text/css" rel="stylesheet" href="/localsite/css/base.css" id="/localsite/css/base.css" />
<script type="text/javascript" src="/localsite/js/localsite.js?showheader=true&showsearch=true"></script>
```

**Target location**: Insert before `</head>` in the HTML template around line 225

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