# CHANGELOG

## 0.3.0

- Add option to unsubscribe from a bot listener

## 0.2.6

- Adds sender `name`. Change added by [@guskuma](https://github.com/guskuma).
  - PR [#28](https://github.com/tawn33y/whatsapp-cloud-api/pull/28)
  - PR [#25](https://github.com/tawn33y/whatsapp-cloud-api/pull/25)
- Capture message context always. Change added by [@guskuma](https://github.com/guskuma).
  - PR [#24](https://github.com/tawn33y/whatsapp-cloud-api/pull/24)

## 0.2.5

- Reduced bundle size by removing unnecessary files/folders from build.
- Repaired broken packages by fixing failing husky issues.
- Unpublished v0.2.2...v0.2.4 (broken packages).
- Add steps to do local package build & test it.

## 0.2.1

- Fix bugs; see [full list here](https://github.com/tawn33y/whatsapp-cloud-api/issues/14)
- Add new function:
  - sendText(to, text, [options])
- Export `Bot` and `Message` interfaces
- Add `Tutorial` & update documentation

## 0.2.0

Added functionality to receive messages:

- on(event, cb: (message) => void)
- startExpressServer([options])

## 0.1.0

Stable release. No changes.

## 0.1.0-beta

Beta release. No changes.

## 0.1.0-alpha.2

Utilizes a more cleaner API:

- createBot(fromPhoneNumberId, accessToken, version)
  - sendMessage(to, text, [options])
  - sendImage(to, urlOrObjectId, [options])
  - sendDocument(to, urlOrObjectId, [options])
  - sendAudio(to, urlOrObjectId)
  - sendVideo(to, urlOrObjectId, [options])
  - sendSticker(to, urlOrObjectId)
  - sendLocation(to, latitude, longitude, [options])
  - sendTemplate(to, name, languageCode, [components])
  - sendContacts(to, contacts)
  - sendReplyButtons(to, bodyText, buttons, [options])
  - sendList(to, buttonName, bodyText, sections, [options])


## 0.1.0-alpha

First version.
