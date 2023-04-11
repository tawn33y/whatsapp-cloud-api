# Updating npm version & publishing

## Local build test

```sh
# Update package.json
# Update CHANGELOG.md

# Follow instructions in ./playground/README.md to run locally

rm $wca_build
# revert package*.json

cd ..
npm t
```

## Publish

```sh
# Create PR (check: delete source branch)

git checkout staging
git fetch && git pull
git checkout main
git fetch && git pull
git merge staging
git tag -a v1.0 -m "v1.0"

git log

git push origin staging main --tags

# Create a new release
```
