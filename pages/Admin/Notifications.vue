<template>
    <div>
        <button @click="addGlobalNotification">Add Global Notification</button>
        <button @click="addNotification">Add User Specific Notification</button>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                notifications: [],
            }
        },
        mounted() {
        },
        methods: {
            addNotification() {
                this.$axios.post('/notifications/create', {
                    global: false
                })
                    .then((response) => {})
                    .catch(() => { });
            },

            addGlobalNotification() {
                this.$axios.post('/notifications/create', {
                    global: true
                })
                    .then((response) => {})
                    .catch(() => { });
            }
        }
    }
</script>
