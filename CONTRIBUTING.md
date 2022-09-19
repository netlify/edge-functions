# Contributions

🎉 Thanks for considering contributing to this project! 🎉

These guidelines will help you send a pull request.

Please note that this project is not intended to be used outside our own projects so new features are unlikely to be
accepted.

If you're submitting an issue instead, please skip this document.

If your pull request is related to a typo or the documentation being unclear, please click on the relevant page's `Edit`
button (pencil icon) and directly suggest a correction instead.

This project was made with ❤️. The simplest way to give back is by starring and sharing it online.

Everyone is welcome regardless of personal background. We enforce a [Code of conduct](CODE_OF_CONDUCT.md) in order to
promote a positive and inclusive environment.

## Development Process

First fork and clone the repository. If you're not sure how to do this, please watch
[these videos](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github).

Run:

```bash
npm install
```

Make sure everything is correctly setup with:

```bash
npm test
```

After submitting the pull request, please make sure the Continuous Integration checks are passing.

## Deno Standard Library dependancy
* Files in the [src/deno_std_lib](./src/deno_std_lib/) folder are adapted as they are from Deno.
* They'll be manually kept up-to-date until we have [node_deno_shims](https://github.com/denoland/node_deno_shims) add support for the Deno Standard Library's http/cookie module; [@tybys/denostd](https://github.com/toyobayashi/denostd#available-modules) extend support to the http/cookie module or we set up an auto update mechanism that runs when the original Deno Standard Library files are updated.
* Files they are adapted from are in comments at the top of each file. More here: [src/deno_std_lib/readme.md](./src/deno_std_lib/readme.md).

## Releasing

1. Merge the release PR
2. Switch to the default branch `git checkout main`
3. Pull latest changes `git pull`
4. Publish the package `npm publish`
