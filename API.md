# API Reference

## List

- [createBot(fromPhoneNumberId, accessToken, version)](#create_bot)
  - [sendMessage(to, text, [options])](#send_message)
  - [sendImage(to, urlOrObjectId, [options])](#send_image)
  - [sendDocument(to, urlOrObjectId, [options])](#send_document)
  - [sendAudio(to, urlOrObjectId)](#send_audio)
  - [sendVideo(to, urlOrObjectId, [options])](#send_video)
  - [sendSticker(to, urlOrObjectId)](#send_sticker)
  - [sendLocation(to, latitude, longitude, [options])](#send_location)
  - [sendTemplate(to, name, languageCode, [components])](#send_template)
  - [sendContacts(to, contacts)](#send_contacts)
  - [sendReplyButtons(to, bodyText, buttons, [options])](#send_reply_buttons)
  - [sendList(to, buttonName, bodyText, sections, [options])](#send_list)
  - [startExpressServer([options])](#start_express_server)
  - [on(event, cb: (message) => void)](#on_event)

## Details

<a name="create_bot"></a>

### createBot(fromPhoneNumberId, accessToken, version)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| fromPhoneNumberId | `String` | | Whatsapp ID of business phone number. |
| accessToken | `String` | | Temporary or Permanent access token. |

<a name="send_message"></a>

### sendMessage(to, text, [options])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| to | `String` | | WhatsApp ID or phone number for the person you want to send a message to. |
| text | `String` | | The text of the text message. |
| [options] | `Object` | | |
| [options.preview_url] | `Boolean` | | By default, WhatsApp recognizes URLs and makes them clickable, but you can also include a preview box with more information about the link. Set this field to true if you want to include a URL preview box. |

<a name="send_image"></a>

### sendImage(to, urlOrObjectId, [options])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| to | `String` | | WhatsApp ID or phone number for the person you want to send a message to. |
| urlOrObjectId | `String` | | Either one of the following: <br /> - **URL Link**: use only with HTTP/HTTPS URLs <br /> - **Media Object ID**. See [Get Media ID](https://developers.facebook.com/docs/whatsapp/cloud-api/reference/media#get-media-id) for information on how to get the ID of your media object. |
| [options] | `Object` | | |
| [options.caption] | `String` | | Describes the image. |

<a name="send_document"></a>

### sendDocument(to, urlOrObjectId, [options])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| to | `String` | | WhatsApp ID or phone number for the person you want to send a message to. |
| urlOrObjectId | `String` | | Either one of the following: <br /> - **URL Link**: use only with HTTP/HTTPS URLs <br /> - **Media Object ID**. See [Get Media ID](https://developers.facebook.com/docs/whatsapp/cloud-api/reference/media#get-media-id) for information on how to get the ID of your media object. |
| [options] | `Object` | | |
| [options.caption] | `String` | | Describes the document. |
| [options.filename] | `String` | | Describes the filename for the specific document. |

<a name="send_audio"></a>

### sendAudio(to, urlOrObjectId)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| to | `String` | | WhatsApp ID or phone number for the person you want to send a message to. |
| urlOrObjectId | `String` | | Either one of the following: <br /> - **URL Link**: use only with HTTP/HTTPS URLs <br /> - **Media Object ID**. See [Get Media ID](https://developers.facebook.com/docs/whatsapp/cloud-api/reference/media#get-media-id) for information on how to get the ID of your media object. |

<a name="send_video"></a>

### sendVideo(to, urlOrObjectId, [options])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| to | `String` | | WhatsApp ID or phone number for the person you want to send a message to. |
| urlOrObjectId | `String` | | Either one of the following: <br /> - **URL Link**: use only with HTTP/HTTPS URLs <br /> - **Media Object ID**. See [Get Media ID](https://developers.facebook.com/docs/whatsapp/cloud-api/reference/media#get-media-id) for information on how to get the ID of your media object. |
| [options] | `Object` | | |
| [options.caption] | `String` | | Describes the video. |

<a name="send_sticker"></a>

### sendSticker(to, urlOrObjectId)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| to | `String` | | WhatsApp ID or phone number for the person you want to send a message to. |
| urlOrObjectId | `String` | | Either one of the following: <br /> - **URL Link**: use only with HTTP/HTTPS URLs <br /> - **Media Object ID**. See [Get Media ID](https://developers.facebook.com/docs/whatsapp/cloud-api/reference/media#get-media-id) for information on how to get the ID of your media object. |

<a name="send_location"></a>

### sendLocation(to, latitude, longitude, [options])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| to | `String` | | WhatsApp ID or phone number for the person you want to send a message to. |
| latitude | `Number` | | Latitude of the location. |
| longitude | `Number` | | Latitude of the location. |
| [options] | `Object` | | |
| [options.name] | `Object` | | Name of location. |
| [options.address] | `Object` | | Address of the location. Only displayed if name is present. |

<a name="send_template"></a>

### sendTemplate(to, name, languageCode, [components])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| to | `String` | | WhatsApp ID or phone number for the person you want to send a message to. |
| name | `String` | | Name of the template. |
| languageCode | `String` | | The code of the language or locale to use. Accepts both language and language_locale formats (e.g., en and en_US). |
| [components] | `Array of Objects` | | See [Official Documentation](https://developers.facebook.com/docs/whatsapp/cloud-api/reference/messages#template-object). |

<a name="send_contacts"></a>

### sendContacts(to, contacts)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| to | `String` | | WhatsApp ID or phone number for the person you want to send a message to. |
| [contacts] | `Array of Objects` | | See [Official Documentation](https://developers.facebook.com/docs/whatsapp/cloud-api/reference/messages#contacts-object). |

<a name="send_reply_buttons"></a>

### sendReplyButtons(to, bodyText, buttons, [options])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| to | `String` | | WhatsApp ID or phone number for the person you want to send a message to. |
| bodyText | `String` | | The content of the message. Emojis and markdown are supported. Maximum length: 1024 characters. |
| buttons | `Object` | | Key-value pair denoting the id and title of the button, i.e. <br /> - **Key**: Unique identifier for your button. This ID is returned in the webhook when the button is clicked by the user. Maximum length: 256 characters. <br /> - **Value**: Button title. It cannot be an empty string and must be unique within the message. Emojis are supported, markdown is not. Maximum length: 20 characters. |
| [options] | `Object` | | |
| [options.footerText] | `Object` | | The footer content. Emojis, markdown, and links are supported. Maximum length: 60 characters. |
| [contacts.header] | `Array of Objects` | | See [Official Documentation](https://developers.facebook.com/docs/whatsapp/cloud-api/reference/messages#header-object). |

<a name="send_list"></a>

### sendList(to, buttonName, bodyText, sections, [options])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| to | `String` | | WhatsApp ID or phone number for the person you want to send a message to. |
| buttonName | `String` | | Button content. It cannot be an empty string and must be unique within the message. Emojis are supported, markdown is not. Maximum length: 20 characters. |
| bodyText | `String` | | The content of the message. Emojis and markdown are supported. Maximum length: 1024 characters. |
| sections | `Object` | | Key-value pair denoting the title of the section and the rows, i.e. <br /> - **Key**: Title of the section. Maximum length: 24 characters. <br /> - **Value**: Contains a list of rows. You can have a total of 10 rows across your sections. Each row must have a title (Maximum length: 24 characters) and an ID (Maximum length: 200 characters). You can add a description (Maximum length: 72 characters), but it is optional. e.g. <br /><br />{<br />"id":"unique-row-identifier-here",<br />"title": "row-title-content-here",<br />"description": "row-description-content-here",<br />} |
| [options] | `Object` | | |
| [options.footerText] | `Object` | | The footer content. Emojis, markdown, and links are supported. Maximum length: 60 characters. |
| [contacts.header] | `Array of Objects` | | See [Official Documentation](https://developers.facebook.com/docs/whatsapp/cloud-api/reference/messages#header-object). |

<a name="start_express_server"></a>

### startExpressServer([options])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | `Object` | | |
| [options.app] | `express.Application` | | Your existing express application. Not required. See [README](./README.md#2-handling-incoming-messages) for more info. |
| [options.useMiddleware] | `function` | | A function that accepts middleware for your server. See [README](./README.md#2-handling-incoming-messages) for more info. |
| [options.port] | `number` | | Port number for the express server, e.g. `3000`. |
| [options.webhookPath] | `string` | | Endpoint for handling all whatsapp-related requests. See [README](./README.md#2-handling-incoming-messages) for more info. |
| [options.webhookVerifyToken] | `string` | | Verification token to use in Facebook Developer app settings.See [README](./README.md#1-verifying-your-callback-url) for more info. |

<a name="on_event"></a>

### on(event, cb: (message) => void)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| event | `string` | | `text` \| `image` \| `document` \| `audio` \| `video` \| `sticker` \| `location` \| `contacts` \| `button_reply` \| `list_reply`  |
| message | `object` | | See below. |

`message` object:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| from | `string` | | Whatsapp ID/phone number of Sender. |
| id | `string` | | ID of created message. |
| timestamp | `string` | | Unix epoch of created message. |
| type | `string` | | `text` \| `image` \| `document` \| `audio` \| `video` \| `sticker` \| `location` \| `contacts` \| `button_reply` \| `list_reply`  |
| data | `object` | | Varies depending on the event. e.g for text, it will be `{ text: string; }` |

## Resources

- [Official WhatsApp Cloud API](https://developers.facebook.com/docs/whatsapp/cloud-api/reference/messages)
- [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api/blob/release/doc/api.md)
