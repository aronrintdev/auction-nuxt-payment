const middleware = {}

middleware['i18n'] = require('../middleware/i18n.js')
middleware['i18n'] = middleware['i18n'].default || middleware['i18n']

middleware['remember'] = require('../middleware/remember.js')
middleware['remember'] = middleware['remember'].default || middleware['remember']

middleware['vendor'] = require('../middleware/vendor.js')
middleware['vendor'] = middleware['vendor'].default || middleware['vendor']

export default middleware
