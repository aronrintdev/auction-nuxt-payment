export default function ({ $auth ,$axios, store }) {
    /* eslint-disable */
    // If remember me cookie exist
    const rememberExpires = $auth.$storage.getCookie('rememberExpires');
    if (!isNaN(rememberExpires)) {
        // Set auth expire time
        $auth.options.cookie.options.expires = rememberExpires
        const rememberToken = $auth.$storage.getCookie('rememberToken');
        // IF token exists
        if (rememberToken !== null) {
            // Do a validation, which goes on each route
            $axios.get('/validate-user', {
                headers: {
                    Authorization: 'Bearer ' + rememberToken
                }
            }).then((res) => {
                // If success
                $auth.setUser(res.data)
                $auth.strategy.token.set(rememberToken)
            }).catch((err) => {
                // Set auth false and remove all cookies
                store.state.auth.user = false
                store.state.auth.loggedIn = false
                $auth.$storage.removeCookie('rememberExpires');
                $auth.$storage.removeCookie('rememberToken');
            })
        }
    } else {
        // remove cookie
        $auth.options.cookie.options.expires = null // reset to "session"
        $auth.$storage.removeCookie('rememberExpires');
        $auth.$storage.removeCookie('rememberToken');
    }
}
