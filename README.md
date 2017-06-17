# okcoin-api
Basic OKCoin API Javascript wrapper.

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
.isFutures()
.start()
```
