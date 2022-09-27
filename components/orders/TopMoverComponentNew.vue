<template>
    <div>
        <div v-if="multiple">
            <order-multiple-component :order="order"></order-multiple-component>
        </div>
        <div v-else>
            <order-single-component :order="order"></order-single-component>
        </div>
    </div>
</template>

<script>
import OrderSingleComponent from '~/components/orders/OrderSingleComponent';
import OrderMultipleComponent from '~/components/orders/OrderMultipleComponent';

export default {
    name: 'TopMoverComponentNew',
    components:{
      OrderMultipleComponent,
      OrderSingleComponent
    },
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
