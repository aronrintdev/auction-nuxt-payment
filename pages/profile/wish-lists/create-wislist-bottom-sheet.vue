<template>
  <MobileBottomSheet
          :height="'90%'"
          :open="mobileFiltersOpen"
          :title="$t('common.filter_by').toString()"
          @closed="mobileFiltersOpen = false"
          @opened="mobileFiltersOpen = true"
      >
        <template #default>
          <div
              class="d-flex flex-column align-items-center justify-content-between h-88 w-100 filters"
          >
            <div class="d-flex flex-column w-100">
              <FilterAccordion
                  :open="true"
                  :title="$t('orders.sort').toString()"
              >
                <b-form-radio-group
                    v-model="sortbySelected"
                    :options="sortOptions"
                    class="d-flex flex-column mt-2 sort-filters"
                >
                </b-form-radio-group>
              </FilterAccordion>
              <ItemDivider/>

              <FilterAccordion
                  :title="$t('purchases.purchase_type').toString()"
              >
                <ButtonSelector
                    :options="typeOptions"
                    :values="activeTypeFilters"
                    @change="typeChange"
                />
              </FilterAccordion>
              <ItemDivider/>

              <FilterAccordion :title="statusTitle">
                <div class="d-flex flex-column">
                  <div class="filter-divider">
                    {{ $t('purchases.products') }}
                  </div>
                  <ButtonSelector
                      :options="
                      productsOptions.filter(
                        (a) => a.type === 'products' && a.value
                      )
                    "
                      :values="typeFilter"
                      @change="productFilterChange"
                  />
                  <div class="filter-divider">
                    {{ $t('purchases.gift_cards') }}
                  </div>
                  <ButtonSelector
                      :options="
                      productsOptions.filter(
                        (a) => a.type === 'giftcard' && a.value
                      )
                    "
                      :values="typeFilter"
                      @change="productFilterChange"
                  />
                </div>
              </FilterAccordion>
              <ItemDivider/>

              <FilterAccordion :title="$t('orders.date_ordered').toString()">
                <div
                    class="mt-2 d-flex align-items-center justify-content-between"
                >
                  <input
                      v-model="startdate"
                      :placeholder="$t('notifications.start_date')"
                      class="date-input"
                      onblur="(this.type='text')"
                      onfocus="(this.type='date')"
                      type="text"
                  />
                  <input
                      v-model="enddate"
                      :placeholder="$t('notifications.end_date')"
                      class="date-input"
                      onblur="(this.type='text')"
                      onfocus="(this.type='date')"
                      type="text"
                  />
                </div>
              </FilterAccordion>
            </div>
            <div class="w-100 d-flex justify-content-between buttons">
              <Button
                  :disabled="loading"
                  class="filter-button"
                  pill
                  variant="outline-dark"
                  @click="clearFilters"
              >
                {{ $t('notifications.reset') }}
              </Button>

              <Button
                  :disabled="loading"
                  class="filter-button apply-filters"
                  pill
                  variant="dark-blue"
                  @click="handleFilter"
              >
                {{
                  $t('notifications.apply_filters') +
                  (filterChangeCount ? ` (${filterChangeCount})` : '')
                }}
              </Button>
            </div>
          </div>
        </template>
      </MobileBottomSheet>
</template>
<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  setup() {
    
  },
})
</script>

