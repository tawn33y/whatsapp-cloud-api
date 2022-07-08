# Updating NPM Version

- ** Create feature branch from staging (create mileston v1.0)
- Update changelog
- Update package.json
- npm i
- git commit -m ""
- git push origin feature/xx
- ** Open PR to staging & merge (This closes #1, delete source branch)
- git checkout staging
- git fetch && git pull
- git checkout main
- git fetch && git pull
- git merge staging
- git tag -a v1.0 -m "v1.0"
- ** Confirm all OK: git log
- git push origin staging main --tags
