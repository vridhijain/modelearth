<!-- Create a "storage" folder is #4 in BARE_METAL.md -->

	yarn setup with 10 minute timeout
	cp server/.env.example server/.env

	Create a "storage" folder and set the STORAGE_DIR path in server/.env to
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