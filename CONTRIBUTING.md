# Contributing

## Requirements

-   Node LTS
-   NPM

> Tip: This repo supports `corepack`. Just enable it `corepack enable` and this repo will warn you if you try to use another package manager.

## Scope

The `@coveo/platform-client` is an open source project. Therefore by nature its scope is limited to Coveo's endpoints that are **public**, **documented**, and **stable**. Any change to an endpoint that doesn't comply to all of the criteria enumerated above will likely be rejected / heavily challenged by the maintainers of the project at the pull request stage.

-   _public_: available in production.
-   _documented_: available on [Swagger](https://platform.cloud.coveo.com/docs).
-   _stable_: the change is not deemed to be temporary, or part of a rapid iteration process.

In case your changes don't fall within the scope **yet**, but you still want to be able to use them, we recommend [extending the client](https://github.com/coveo/platform-client#extending-the-client) in your own project.

## Guidelines

-   Make sure your changes are fully tested (when applicable).
-   We tend to avoid comments in our code base, we strongly prefer good naming and code structure.
-   Avoid pushing similar changes in different commits if it's within the same feature, because we want the changelogs to be clear and simple. To avoid that, there are at least 2 options:
    1. Squash the commits into one when merging (you need to edit the final commit message though)
    2. amend the previous commit when making related changes (`git commit --amend --no-edit`)

## Commit messages

**Every commit message must comply with the [Angular Commit Message Conventions](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-format) specification. We use the commit messages to automatically bump the package version according to the semantic versioning notation. Moreover, we generate changelogs for each version using those commit messages.**

-   You can either manually write a commit message that follows the convention using your favorite method.
-   Or you can run `npm run commit-cli`. It will prompt you some questions about the nature of your changes, then it will commit your staged changes along with a generated message that follows our convention.
-   Commits containing breaking changes need to be marked as such in the commit footer. See [BREAKING CHANGE convention](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit-message-footer).
