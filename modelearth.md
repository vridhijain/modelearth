# EarthScape

A location-enabled install of [Anything LLM](https://anythingllm.com).

Start a virtual environment with Claude Code CLI in this earthscape folder.

MacOS

	python3 -m venv env
	source env/bin/activate
	npx @anthropic-ai/claude-code

WindowsOS

	python -m venv env
	env\Scripts\activate
	npx @anthropic-ai/claude-code

For Claude: We've forked the anything-llm repo created by Mintplex Labs and renamed it [earthscape](https://github.com/modelearth/earthscape). Here's their documentation: [docs.anythingllm.com](https://docs.anythingllm.com/)


First have Claude include our static submodules using cmds in claude.md:

	Install or update submodules

Run once to add small changes in the anything-llm parent repo code. These reside in claude.md.

	Code Insert

Avoid checking in changes to the anything-llm parent repo code.

**Skip for now** Revert when you need to sync with updates in the anything-llm parent repo:

	Code Remove
	git pull origin master
	Code Insert
	# To finish, run "Example update script" from "Bare Metal" tab above.

### Site Install

In Claude CLI run:

	yarn setup with 10 minute timeout
	cp server/.env.example server/.env

<!-- #4 in BARE_METAL.md -->

	Create a "storage" folder and set the STORAGE_DIR path in server/.env to
	use it via an absolute filesystem path with no trailing slash.

<!-- #5 in BARE_METAL.md -->

Skip if you are on localhost

	Select one of the VITE_BASE_API options in frontend/.env based on the current hosting URL.

Build and copy dist into server/public

	cd frontend && yarn build
	cd .. && mkdir -p server/public && cp -R frontend/dist/* server/public/

Migrate and prepare database, boot server in production and in another collection

	cd server && npx prisma generate --schema=./prisma/schema.prisma
	cd server && npx prisma migrate deploy --schema=./prisma/schema.prisma
	cd server && NODE_ENV=production node index.js & cd ..
	cd collector && NODE_ENV=production node index.js & cd ..

View at [localhost:3001](http://localhost:3001)

Restart the server quickly in a couple seconds:

	restart