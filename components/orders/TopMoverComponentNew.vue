<template>
    <div class="row">
        <template v-if="multiple">
            <div class="col">Multiple: {{order.order_id}}</div>
        </template>
        <template v-else>
            <div class="col">Single: {{order.order_id}}</div>
        </template>
    </div>
</template>

<script>
export default {
    name: 'TopMoverComponentNew',
    props: {
        order: {
            type: Object,
            default() {
                return {}
            }
        },
        isSelectable: {
            type: Boolean,
            default: true
        },
        value: {
            type: Number,
            default: 0
        }
    },
    computed: {
        multiple() {
            return this.order.items.length > 1;
        }
    }
}
</script>

<style scoped>

</style>
