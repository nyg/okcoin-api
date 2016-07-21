function OKCoin(domain, channels) {
    this.wsUrl = 'wss://real.okcoin.' + domain + ':10440/websocket/okcoinapi'
    this.channels = channels
}

OKCoin.prototype.start = function () {

    var _this = this
    this.ws = new WebSocket(this.wsUrl)

    this.ws.onopen = function () {

        console.log('Connection opened')

        var channels = []
        for (channelName in _this.channels) {
            channels.push({ 'event': 'addChannel', 'channel': channelName })
        }

        this.send(JSON.stringify(channels))
    }

    this.ws.onmessage = function (event) {
        JSON.parse(event.data).forEach(function (message) {
            _this.channels[message.channel](message)
        })
    }
}
