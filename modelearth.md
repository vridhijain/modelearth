# ModelEarth

A location-enabled install of [Anything LLM](https://anythingllm.com).

First start a virtual environment with Claude Code CLI in the modelearth folder.

MacOS

	python3 -m venv env
	source env/bin/activate
	npx @anthropic-ai/claude-code

WindowsOS

	python -m venv env
	env\Scripts\activate
	npx @anthropic-ai/claude-code


Have Claude refresh our submodules:

	Update submodules


### Site Install

In Claude CLI run once:

	server setup

View at [localhost:3001](http://localhost:3001)

Restart the server quickly, in a couple seconds:

	restart

We're making minimum changes in the Anything-llm parent repo code.  
If small changes are made, include in the Insert and Remove process within claude.md
