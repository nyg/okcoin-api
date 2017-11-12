# okcoin-api
## Description

Javascript wrapper for OKCoin's WebSocket API.

```javascript
function handleIndex(message) {
    // ...
}

function handleDepth(message) {
    // ...
}

new OKCoin()
.setChannels({
    // channel_name: callback_function
    ok_sub_futureusd_btc_index: handleIndex,
    ok_sub_futureusd_btc_depth_quarter_60: handleDepth
})
.isFutures() // will use okex.com
.start()
```

## Use

RawGit can be used to serve a specific version (see [tags](https://github.com/nyg/okcoin-api/tags)):

```html
<script src="https://cdn.rawgit.com/nyg/okcoin-api/x.y.z/okcoin-api.js"></script>
```