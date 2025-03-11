[![Test](https://img.shields.io/github/actions/workflow/status/smashedr/test-action/test.yaml?logo=github&logoColor=white&label=test)](https://github.com/smashedr/test-action/actions/workflows/test.yaml)
[![GitHub Last Commit](https://img.shields.io/github/last-commit/smashedr/test-action?logo=github&logoColor=white&label=updated)](https://github.com/smashedr/test-action/graphs/commit-activity)
[![GitHub Top Language](https://img.shields.io/github/languages/top/smashedr/test-action?logo=htmx&logoColor=white)](https://github.com/smashedr/test-action)
[![GitHub Org Stars](https://img.shields.io/github/stars/cssnr?style=flat&logo=github&logoColor=white)](https://cssnr.github.io/)
[![Discord](https://img.shields.io/discord/899171661457293343?logo=discord&logoColor=white&label=discord&color=7289da)](https://discord.gg/wXy6m2X8wY)

# Test Action 1

> [!CAUTION]
> THIS IS FOR TESTING ONLY!

For action templates, see:

- https://github.com/smashedr/js-test-action
- https://github.com/smashedr/ts-test-action
- https://github.com/smashedr/py-test-action

# Development

1. Install `act`: https://nektosact.com/installation/index.html
2. Run `npm run build:watch`
3. In another terminal, run `act -j test`

Alternatively, to run from source, change `main` in [action.yml](action.yml) to `src/index.js` and
run: `act -j test --use-gitignore=false`

For advanced using with things like secrets, variables and context see: https://nektosact.com/usage/index.html  
You should also review the options from `act --help`

Note, the `.env`, `.secrets` and `.vars` files are automatically sourced with no extra options.  
To source `event.json` you need to run act with `act -e event.json`
