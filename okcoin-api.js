function OKCoin(domain, channels) {
    console.log('OKCoin object created (' + domain + ')')
    this.wsUrl = 'wss://real.okcoin.' + domain + ':10440/websocket/okcoinapi'
    this.channels = channels
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
                _this.channels[message.channel](message)
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
