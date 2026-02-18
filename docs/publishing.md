# Publishing Guide

## Prerequisites

- npm account with publish rights.
- Node.js 18+.
- Clean git state for release commits/tags.

## Prepublish Checklist

1. Update `version` in `package.json`.
2. Confirm package name availability if needed:

```bash
npm view motionspring name
```

3. Validate package:

```bash
npm run check
```

This runs:

- `npm test`
- `npm pack --dry-run`

4. Verify tarball contents include expected files only (`src`, `README.md`, `LICENSE`).
5. Confirm `README.md` and docs reflect current API.

## Publish

```bash
npm publish
```

`package.json` already includes:

- `publishConfig.access = public`
- package metadata (`repository`, `bugs`, `homepage`)

## Optional Release Steps

1. Create a git tag: `git tag vX.Y.Z`
2. Push tag: `git push origin vX.Y.Z`
3. Add a GitHub release entry with notable changes.
