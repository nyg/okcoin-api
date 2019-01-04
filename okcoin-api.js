// wss://real.okex.com:10440/websocket/okcoinapi – works
// wss://real.okex.com:10441/websocket – works
// wss://real.okex.com:10442/ws/v3 – not supported yet

function OKCoin(apiUrl) {

    this.wsUrl = apiUrl
    this.channelHandlers = {}

    // not supported
    this.apiKey = null
    this.secretKey = null
}

OKCoin.prototype.addChannelHandler = function (channel, handler) {
    this.channelHandlers[channel] = handler
    return this
}

OKCoin.prototype.setPrivateKeys = function (apiKey, secretKey) {
    this.apiKey = apiKey
    this.secretKey = secretKey
    return this
}

OKCoin.prototype.start = function () {

    var _this = this

    _this.init = function () {

        _this.ws = new WebSocket(_this.wsUrl)
        _this.ws.binaryType = 'arraybuffer'

        /* WebSocket opened */
        _this.ws.onopen = function (event) {

            console.log('Connection opened')

            var channels = []
            for (channelName in _this.channelHandlers) {
                channels.push({ 'event': 'addChannel', 'channel': channelName })
            }

            _this.ws.send(JSON.stringify(channels))
        }

        /* Message received */
        _this.ws.onmessage = function (event) {

            try {
                var data = pako.inflateRaw(event.data, { to: 'string' })
                JSON.parse(data).forEach(message => {

                    if (message.channel == 'addChannel') {
                        console.log(message)
                    }
                    else {
                        // execute channel handler
                        _this.channelHandlers[message.channel](message)
                    }
                })
            }
            catch (error) {
                console.log(error)
            }
        }

        /* Error received */
        _this.ws.onerror = function (event) {

            console.log('Error received:')
            console.log(event)

            var status = _this.ws.readyState
            if (status != 1) {
                console.log('Connection status was: ' + status + ', restarting connection.')
                _this.init()
            }
        }

        /* WebSocket closed */
        _this.ws.onclose = function (event) {
            console.log('Connection closed, restarting connection.')
            _this.init()
        }
    }

    _this.init()
}
