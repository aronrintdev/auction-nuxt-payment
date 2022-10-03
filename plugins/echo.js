import Echo from 'laravel-echo';

window.Pusher = require('pusher-js');
export default function ({app, $auth}) {
    window.Echo = new Echo({
        broadcaster: 'pusher',
        key: process.env.MIX_PUSHER_APP_KEY,
        encrypted: true,
        forceTLS: false,
        cluster: process.env.MIX_PUSHER_APP_CLUSTER,
        wsHost: process.env.WS_HOST,
        authEndpoint: process.env.AUTH_ENDPOINT + '/broadcasting/auth',
        wsPort: 6001,
        disableStats: true,
        auth: {
            headers: {
                Authorization: 'Bearer ' + $auth.strategy.token.get(),
            },
        },
    });

}

