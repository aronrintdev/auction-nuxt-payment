import Echo from 'laravel-echo';
import {PUSHER} from '~/static/constants/environments';


window.Pusher = require('pusher-js');

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: PUSHER.APP_KEY,
    encrypted: false,
    forceTLS: false,
    wsHost: 'localhost',
    authEndpoint: process.env.AUTH_ENDPOINT + '/broadcasting/auth',
    wsPort: 6001,
    disableStats: true
});
