# Smart Power Backup Contributing Guide

Hello!, I am very excited that you are interested in contributing. However, before submitting your contribution, be sure to take a moment and read the following guidelines.

## Commit Conventions

Before you create a Pull Request, please check whether your commits comply with the commit conventions used in this repository.

### Commit Message Format

`#<issueNumber>/<message>`

Issue number must be prefixed with `#` and separated from the message with a `/` (forward slash).

> [!IMPORTANT]
> Issue number is **NOT** optional. If your commit does not resolve an issue, please create one first.

* Commit messages must have a subject line and may have body copy. These must be separated by a blank line.
* The subject line must be written in imperative mood (Fix, not Fixed / Fixes etc.)
* The body copy must only contain explanations as to what and why, never how. The latter belongs in documentation and implementation.

First word of the subject line must be one of the following:

First Word | Meaning
--- | --
Add | Create a capability e.g. feature, test, dependency.
Cut | Remove a capability e.g. feature, test, dependency.
Fix | Fix an issue e.g. bug, typo, accident, misstatement.
Bump | Increase the version of something e.g. dependency.
Make | Change the build process, or tooling, or infra.
Start | Begin doing something; e.g. create a feature flag.
Stop | End doing something; e.g. remove a feature flag.
Refactor | A code change that MUST be just a refactoring.
Reformat | Refactor of formatting, e.g. omit whitespace.
Optimize | Refactor of performance, e.g. speed up code.
Document | Refactor of documentation, e.g. help files.

**Example:**

* `#1/Add README.md`.
* `#1/Update README.md`.
* `#1/Fix typo in README.md`.
* `#1/Cut README.md`.

## Pull Request Guidelines

* The main branch is basically a snapshot of the latest stable version. All development **MUST** be done in dedicated branches.
* Pull requests must be made against the `main` branch.
* It is good to have multiple small commits while working on the PR. We'll let GitHub squash it automatically before the merge.

## Code Style

* We use slightly modified  [Google TypeScript Style](https://github.com/google/gts) for this project.

## Development Setup

This project uses monorepo structure. So, first steps depend on what you want to do.

### If you want to work on the API

1. Clone the repository.

### If you want to work on the frontend part

1. Clone the repository.
2. Create a branch for your changes.
    * Name your branch according to the following convention: `<issueNumber>/<branchName>`.
3. Run `npm install` in the `web-gui` directory.
4. Run `npm run dev` in the `web-gui` directory.
5. Open `http://localhost:3000` in your browser.
6. Make changes to the code and see them being reflected in the browser.
7. Make sure that your changes are in accordance with the [Code Style](#code-style).
8. Commit your changes.
9. Push your changes to the remote repository.
10. Create a Pull Request.
    * Send the PR to the `main` branch.
    * Your pull request will be reviewed by the maintainers and the maintainers will decide if it is accepted or not
    * Once the pull request is accepted, the maintainers will merge it to the main branch

## Visual Changes

When making a visual change, please provide screenshots and/or screenshots of the proposed change. This will help us to understand the desired change easier.

## Documentation

When making a change that affects the documentation, please update the documentation accordingly. This will help us to keep the documentation up to date.

## Becoming a maintainer

If you are interested in becoming a maintainer, start by reviewing issues. Answer questions for those in need of troubleshooting. Once we see you helping, either we will reach out and ask you if you want to join or you can ask one of the current maintainers to add you. We will try our best to be proactive in reaching out to those that are already helping out.

Being a maintainer is not an obligation. You can help when you have time and be less active when you don't. If you get a new job and get busy, that's alright.

---

This contributing guide is based on [Next UI Contributing Guide](https://github.com/nextui-org/nextui/blob/main/CONTRIBUTING.md).
