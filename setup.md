Update browserslist

	npx update-browserslist-db@latest

<!-- Create a "storage" folder is #4 in BARE_METAL.md -->

	yarn setup with 10 minute timeout
	cp -n server/.env.example server/.env (skip if server/.env exists)

	Create a "storage" folder if it doesn't exist and set the STORAGE_DIR path in server/.env to
	use it via an absolute filesystem path with no trailing slash.

<!-- #5 in BARE_METAL.md -->

Skip if you are on localhost

	Select one of the VITE_BASE_API options in frontend/.env based on the current hosting URL.

Build and copy dist into server/public,
Then migrate and prepare database, boot server in production and in another collection.

	cd frontend && yarn build
	cd .. && mkdir -p server/public && cp -R frontend/dist/* server/public/

	cd server && npx prisma generate --schema=./prisma/schema.prisma
	cd server && npx prisma migrate deploy --schema=./prisma/schema.prisma
	cd server && NODE_ENV=production node index.js & cd ..
	cd collector && NODE_ENV=production node index.js & cd ..

Restart the server to avoid MIME type errors:

	cd $(git rev-parse --show-toplevel) && pkill -f "node.*index.js"; (cd server && NODE_ENV=production nohup node index.js > /dev/null 2>&1 &)