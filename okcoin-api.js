function OKCoin() {
    this.wsUrl = 'wss://real.okex.com:10440/websocket/okcoinapi'
    this.channels = null
    this.apiKey = null
    this.secretKey = null
}

OKCoin.prototype.setChannels = function (channels) {
    this.channels = channels
    return this
}

OKCoin.prototype.setPrivateKeys = function (apiKey, secretKey) {
    this.apiKey = apiKey
    this.secretKey = secretKey
    return this
}

OKCoin.prototype.isFutures = function () {
    this.wsUrl = this.wsUrl.replace('okcoin', 'okex')
    return this
}

OKCoin.prototype.isCny = function () {
    this.wsUrl = this.wsUrl.replace('com', 'cn')
    return this
}

OKCoin.prototype.start = function () {

    var _this = this

    _this.initWs = function () {

        _this.ws = new WebSocket(_this.wsUrl)

        _this.ws.onopen = function (event) {

            console.log('Connection opened')

            var channels = []
            for (channelName in _this.channels) {
                channels.push({ 'event': 'addChannel', 'channel': channelName })
            }

            _this.ws.send(JSON.stringify(channels))
        }

        _this.ws.onmessage = function (event) {
            JSON.parse(event.data).forEach(function (message) {
                if (message.channel == 'addChannel') {
                    console.log(message);
                }
                else {
                    _this.channels[message.channel](message)
                }
            })
        }

        _this.ws.onerror = function (event) {

            console.log('Error received:')
            console.log(event)

            var status = _this.ws.readyState
            if (status != 1) {
                console.log('Connection status was: ' + status + ', restarting connection')
                _this.initWs()
            }
        }

        _this.ws.onclose = function (event) {
            console.log('Connection closed, restarting connection')
            _this.initWs()
        }
    }

    _this.initWs()
}

OKCoin.prototype.test = function () {

    var message = 'api_key=' + this.apiKey + '&secret_key=' + this.secretKey
    var args = {
        event: 'addChannel',
        channel: 'ok_sub_futureusd_userinfo',
        parameters: {
            api_key: this.apiKey,
            sign: SparkMD5.hash(message).toUpperCase()
        }
    }

    this.channels['ok_sub_futureusd_userinfo'] = handleUserInfo
    var send = JSON.stringify(args)
    console.log(send);
    this.ws.send(send)
}
