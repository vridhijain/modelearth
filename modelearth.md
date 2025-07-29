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

Next, in Claude CLI run:

	yarn setup
	cp server/.env.example server/.env

Copy the #4 below and after here, then omit the following blue-boxed BARE_METAL.md load in index.html

For Claude: We've forked the anything-llm repo created by Mintplex Labs and renamed it [earthscape](https://github.com/modelearth/earthscape). 
Here's their documentation: [docs.anythingllm.com](https://docs.anythingllm.com/)