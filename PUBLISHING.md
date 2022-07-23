# Updating npm version & publishing

## Local test

```sh
# Update package.json
# Update changelog

npm i
wca_build=$(npm pack)
mkdir playground
mv $wca_build playground
cd playground
npm init -y
npm i ./$wca_build

# ensure installs OK

mkdir src
touch src/index.js

# update index.js/package.json & run: npm start

cd ..
rm -r ./playground
rm $wca_build
```

## Publish

```sh
# Open PR; delete source branch

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
