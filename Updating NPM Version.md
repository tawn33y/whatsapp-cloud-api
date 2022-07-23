# Updating NPM Version

```bash
# Update package.json
# Update changelog

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
