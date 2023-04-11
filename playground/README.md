# README

## Test published version

```sh
## 1: let's start at project root

cd ..
cp .env.template .env # update accordingly

## 2: let's now move to playground folder

cd playground
npm i
npm start

## 3: run reverse proxy to receive incoming messages, e.g. ngrok, etc
```

## Test local version

```sh
## 1: let's start at project root

cd ..
npm i
npm run build
wca_build=$(npm pack)
mv $wca_build playground
cp .env.template .env # update accordingly

## 2: let's now move to playground folder

cd playground
npm i
npm i ./$wca_build
npm start

## 3: run reverse proxy to receive incoming messages, e.g. ngrok, etc
```
