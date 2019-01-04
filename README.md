# okcoin-api

Basic Javascript wrapper for OKCoin & OKEx's WebSocket API.

## Example

See [index.html]() for a working example.

```javascript
function handleIndex(message) {
    // ...
}

function handleDepth(message) {
    // ...
}

new OKCoin('wss://real.okex.com:10441/websocket')
.setChannelHandlers({
    // channel_name: callback_function
    ok_sub_futureusd_btc_index: handleIndex,
    ok_sub_futureusd_btc_depth_quarter_60: handleDepth
})
.start()
```

## Use

[jsDelivr](https://www.jsdelivr.com) can be used to serve a specific version (see [tags](https://github.com/nyg/okcoin-api/tags) for version numbers):

```html
<script src="https://cdn.jsdelivr.net/gh/nyg/okcoin-api@x.y.z/okcoin-api.js"></script>
```

## Dependency

Requires [pako](http://nodeca.github.io/pako/).

## Note

Doesn't support API v3.