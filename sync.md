## Insert and Remove from parent

Loren runs "Code Remove" occasionally before syncing the modelearth fork with Anything LLM.

"Code Insert" adds small changes in the anything-llm parent repo code. The changes reside in claude.md.

	Code Insert

We then revert briefly to sync with updates in the anything-llm parent repo:

	Code Remove
	git pull origin master
	Code Insert
	# To finish, run "Example update script" from "Bare Metal" tab above.