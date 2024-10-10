import {reactive} from "vue";

export const currencyRates = reactive({
    rates: [],
    coinsFrom: ['USD', 'EUR', 'JPY', 'GBP', 'AUD', 'CAD', 'CHF', 'CNY', 'HKD', 'NZD', 'RUB']
})