## “Code Insert” and “Code Remove” - For Syncing with Parent Repo

Loren runs "Code Remove" occasionally in Claude before syncing the modelearth fork with Anything LLM.

Other modelearth contributors won't have to run "Code Remove", unless they are syncing a direct fork of the anything-llm parent.

"Code Insert" adds small changes in the anything-llm parent repo code. The changes reside in claude.md. 

	Code Insert

We then revert briefly to sync with updates in the anything-llm parent repo:

	Code Remove
	git pull origin master
	Code Insert
	# To finish, run "Example update script" from "Bare Metal" tab above.


Long-term plan: Changes should reside in settings, with PRs sent to the parent repo. Using a separate modelearth.settings.json file is one possibility.