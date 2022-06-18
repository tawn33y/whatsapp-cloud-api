# CHANGELOG

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
