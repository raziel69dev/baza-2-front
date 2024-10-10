<template>
  <div class="exchanger-box">

    <div class="exchanger-box_input">
      <div class="exchanger-box_currency">
        <div class="currency-from" data-dropdown="exchangerFrom" @click="changeDropdownState(dropdownTo)">
          <svg class="arrow" data-dropdown="exchangerFrom" :class="{up: this.dropdownTo.show}" xmlns="http://www.w3.org/2000/svg" width="13" height="7" viewBox="0 0 13 7" fill="none">
            <path data-dropdown="exchangerFrom" d="M0.922355 0.00366649C1.04299 0.00296887 1.16259 0.0260921 1.27427 0.0717097C1.38595 0.117327 1.48753 0.184542 1.57319 0.2695L5.77152 4.477C5.85674 4.56292 5.95812 4.63111 6.06983 4.67765C6.18153 4.72419 6.30134 4.74815 6.42236 4.74815C6.54337 4.74815 6.66318 4.72419 6.77488 4.67765C6.88659 4.63111 6.98797 4.56292 7.07319 4.477L11.2715 0.269499C11.4441 0.0968868 11.6782 -8.47752e-05 11.9224 -8.47965e-05C12.1665 -8.48179e-05 12.4006 0.0968867 12.5732 0.269499C12.7458 0.442111 12.8428 0.676222 12.8428 0.920332C12.8428 1.0412 12.819 1.16089 12.7727 1.27256C12.7265 1.38423 12.6587 1.4857 12.5732 1.57117L8.36569 5.7695C7.84324 6.27144 7.14685 6.55176 6.42236 6.55176C5.69786 6.55176 5.00147 6.27144 4.47902 5.7695L0.271522 1.57117C0.185605 1.48595 0.117408 1.38457 0.0708709 1.27286C0.0243325 1.16116 0.000373359 1.04134 0.000373348 0.920333C0.000373337 0.799322 0.0243325 0.679509 0.0708708 0.567804C0.117408 0.4561 0.185605 0.354716 0.271522 0.2695C0.357175 0.184542 0.458756 0.117327 0.57044 0.0717098C0.682125 0.0260922 0.801715 0.00296889 0.922355 0.00366649Z" fill="#B3B4C9"/>
          </svg>

          <p class="rates" data-dropdown="exchangerFrom">
            <span data-dropdown="exchangerFrom" class="text">Отдаете <b>{{ currentSelectedCurrencyFrom.name }}</b> </span>
            <br />
            <span data-dropdown="exchangerFrom" class="value"> {{ currentSelectedCurrencyFrom.rate || 'Введите количество' }} </span>
          </p>
          <div class="icon" v-if="icons.find(item => item.name === currentSelectedCurrencyFrom.name.toLowerCase())">
            <img :src="setIcon(currentSelectedCurrencyFrom.name)" alt="">
          </div>

          <dropdown-box v-if="dropdownTo.show === true"
                        :selector="'exchangerFrom'"
                        @closeDropdown="changeDropdownState(dropdownTo)">

            <div class="search" @click="changeDropdownState(dropdownTo, dropdownTo.show)">
              <input placeholder="Количество" class="search-coin" type="number" ref="coinSearch" v-model="currentSelectedCurrencyFrom.rate">
              <svg v-if="coinName.length > 0"
                   @click="coinName = ''"
                   width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 1L1 11M1 1L11 11" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>

            </div>
            <div class="coins-rates"
                 :class="{selected: currentSelectedCurrencyFrom.name === name}"
                 @click="() => {
                   changeSelectedCurrencyFrom(name)
                   changeDropdownState(dropdownTo)
                 }"
                 v-for="(name) of currencyRates.coinsFrom"
                 :key="name"
            >
              <span>{{ name }}</span>

              <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg" v-show="currentSelectedCurrencyFrom.name === name">
                <path d="M17 1L6 12L1 7" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>

          </dropdown-box>
        </div>


        <svg class="swapIcon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M20 17H4M4 17L8 13M4 17L8 21M4 7H20M20 7L16 3M20 7L16 11" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

        <div class="currency-to" @click="changeDropdownState(dropdownFrom, dropdownTo.show)" data-dropdown="exchangerTo">
          <svg class="arrow" data-dropdown="exchangerTo" :class="{up: this.dropdownFrom.show}" xmlns="http://www.w3.org/2000/svg" width="13" height="7" viewBox="0 0 13 7" fill="none">
            <path data-dropdown="exchangerTo" d="M0.922355 0.00366649C1.04299 0.00296887 1.16259 0.0260921 1.27427 0.0717097C1.38595 0.117327 1.48753 0.184542 1.57319 0.2695L5.77152 4.477C5.85674 4.56292 5.95812 4.63111 6.06983 4.67765C6.18153 4.72419 6.30134 4.74815 6.42236 4.74815C6.54337 4.74815 6.66318 4.72419 6.77488 4.67765C6.88659 4.63111 6.98797 4.56292 7.07319 4.477L11.2715 0.269499C11.4441 0.0968868 11.6782 -8.47752e-05 11.9224 -8.47965e-05C12.1665 -8.48179e-05 12.4006 0.0968867 12.5732 0.269499C12.7458 0.442111 12.8428 0.676222 12.8428 0.920332C12.8428 1.0412 12.819 1.16089 12.7727 1.27256C12.7265 1.38423 12.6587 1.4857 12.5732 1.57117L8.36569 5.7695C7.84324 6.27144 7.14685 6.55176 6.42236 6.55176C5.69786 6.55176 5.00147 6.27144 4.47902 5.7695L0.271522 1.57117C0.185605 1.48595 0.117408 1.38457 0.0708709 1.27286C0.0243325 1.16116 0.000373359 1.04134 0.000373348 0.920333C0.000373337 0.799322 0.0243325 0.679509 0.0708708 0.567804C0.117408 0.4561 0.185605 0.354716 0.271522 0.2695C0.357175 0.184542 0.458756 0.117327 0.57044 0.0717098C0.682125 0.0260922 0.801715 0.00296889 0.922355 0.00366649Z" fill="#B3B4C9"/>
          </svg>
          <div class="loading" v-if="loading">
             <TheLoader />
          </div>


          <p v-else-if="currentSelectedCurrencyFrom.name && !loading" class="rates" data-dropdown="exchangerTo">
            <span data-dropdown="exchangerTo" class="text">Получаете <b>{{ currentSelectedCurrency.name }}</b></span>
            <br />
            <span data-dropdown="exchangerTo" class="value">{{ calculateInputRate(currentSelectedCurrencyFrom.rate, currentSelectedCurrency.rate) }}</span>


          </p>

          <div class="icon" v-if="currentSelectedCurrency.name">
            <img :src="setIcon(currentSelectedCurrency.name)" alt="">
          </div>

          <dropdown-box v-if="dropdownFrom.show === true && !loading"
                        :selector="'exchangerTo'"
                        @closeDropdown="changeDropdownState(dropdownFrom)">

            <div class="search" @click="changeDropdownState(dropdownFrom, dropdownFrom.show)">
              <input class="search-coin" placeholder="поиск валюты" type="text" data-dropdown="coinName" ref="coinSearch" v-model="coinName">
              <svg v-if="coinName.length > 0"
                   @click="coinName = ''"
                   width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 1L1 11M1 1L11 11" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>

            </div>
            <div class="coins-rates"
                 :class="{selected: currentSelectedCurrency.name === name}"
                 @click="() => {
                  changeSelectedCurrencyTo(rate, name)
                  changeDropdownState(dropdownFrom, dropdownFrom.show)
                }"
                 v-for="(rate, name) of currencyRates.rates[0]"
                 :key="name"
                 v-show="name.toLowerCase().includes(coinName.toLowerCase())"
            >
              <span>{{ name }}</span>

              <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg" v-show="currentSelectedCurrency.name === name">
                <path d="M17 1L6 12L1 7" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>

          </dropdown-box>
        </div>




      </div>

      <button-black
          @buttonPressed="callModal({
            show: !popup.show,
            component: 'ExternalLink',
          })"
      >
        <div class="button-text">Обменять</div>
      </button-black>

    </div>

  </div>
</template>
<script>
import {getCoinRate} from "@/API/exchangerController.js";
import {addNotice} from "@/js/notifications.js";
import dropdownBox from "@/components/ReUsable/DropdownBox.vue";
import TheLoader from "@/components/ReUsable/TheLoader.vue";
import buttonBlack from "@/components/Buttons/ButtonBlack.vue";
import {popup} from "@/js/controllers/popupController.js";
import {currencyRates} from "@/Stores/currencyRates.js";

import rub from '@/assets/currencies-icons/rub.svg'
import btc from '@/assets/currencies-icons/btc.svg'
import usd from '@/assets/currencies-icons/usd.svg'
import usdt from '@/assets/currencies-icons/usdt.svg'
import ltc from '@/assets/currencies-icons/ltc.svg'
import eth from '@/assets/currencies-icons/eth.svg'
import trx from '@/assets/currencies-icons/trx.svg'
import bnb from '@/assets/currencies-icons/bnb.svg'
import eur from '@/assets/currencies-icons/eur.svg'
import jpy from '@/assets/currencies-icons/jpy.svg'
import gbp from '@/assets/currencies-icons/gbp.svg'
import aud from '@/assets/currencies-icons/usd.svg'
import cad from '@/assets/currencies-icons/usd.svg'
import cny from '@/assets/currencies-icons/cny.svg'
import doge from '@/assets/currencies-icons/doge.svg'

export default {
  name: 'TheExchanger',
  data() {
    return {
      icons: [
        {name: 'rub', icon: rub},
        {name: 'btc', icon: btc},
        {name: 'usd', icon: usd},
        {name: 'usdt', icon: usdt},
        {name: 'ltc', icon: ltc},
        {name: 'eth', icon: eth},
        {name: 'trx', icon: trx},
        {name: 'bnb', icon: bnb},
        {name: 'eur', icon: eur},
        {name: 'jpy', icon: jpy},
        {name: 'gbp', icon: gbp},
        {name: 'aud', icon: aud},
        {name: 'cad', icon: cad},
        {name: 'cny', icon: cny},
        {name: 'doge', icon: doge},

      ],
      coinValue: 1,
      dropdownFrom: {
        show: false
      },
      dropdownTo: {
        show: false
      },
      popup: {
        show: false
      },
      loading: false,
      currentSelectedCurrency: {},
      currentSelectedCurrencyFrom: {
        name: 'RUB',
        rate: 5000
      },
      currencyRates,
      coinName: ''
    }
  },
  components: {
    dropdownBox,
    TheLoader,
    buttonBlack
  },
  methods: {
    changeDropdownState(dropdown, focus) {
      dropdown.show = !dropdown.show

      if (focus) {
        setTimeout(() => {
          this.$refs.coinSearch.focus()
        }, 0)
      }

    },
    calculateInputRate(fromValue, toValue) {
      return (toValue * fromValue)
    },
    changeSelectedCurrencyTo(rate, name) {
      this.currentSelectedCurrency.name = name
      this.currentSelectedCurrency.rate = rate
    },

    changeSelectedCurrencyFrom(name) {
      this.currentSelectedCurrencyFrom.name = name
      this.getRate()
    },

    callModal(settings) {
      for (const option in settings) {
        popup[option] = settings[option]
      }
    },
    setIcon(name){

      if (this.icons.find(item => item.name === name.toLowerCase())) {
        return this.icons.find(item => item.name === name.toLowerCase()).icon
      } else {
        return usdt
      }

    },
    getRate() {
      this.loading = true
      currencyRates.rates.splice(0, currencyRates.rates.length)

      getCoinRate(this.currentSelectedCurrencyFrom.name)
          .then(result => {
            currencyRates.rates.push(result.data.rates.data.rates)
            const currency = this.currentSelectedCurrency.name || 'BTC'

            this.changeSelectedCurrencyTo(currencyRates.rates[0][currency], currency)
            this.loading = false
          })
          .catch(() => {
            addNotice({name: 'Нет!', type: 'warning'})
            this.loading = false
          })


    }
  },
  mounted() {
    this.getRate()

  }
}
</script>
<style lang="scss" scoped>

.button-text {
  padding-left: 25px;
  padding-right: 25px;
}
.search {
  display: flex;
  position: relative;

  input {
    width: 100%;
    box-sizing: border-box;
    height: 31px;
    border-radius: 378.5px;
    background: #F5F4FA;
    padding: 10px;
    margin-bottom: 10px;
    color: #5D599F;
    transition: .3s ease;
    border: 1px solid #ececec;

    &:focus {
      outline: #5D599F;

    }
  }
  svg {
    position: absolute;
    right: 10px;
    top: 9px;
    cursor: pointer;
    path {
      transition: .3s ease;
      stroke: #7c7c7c;
    }

    &:hover {
      path {
        stroke: #5D599F;
      }
    }
  }
}

.coins-rates {
  color: #B3B4C9;
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  transition: .3s ease;
  border-radius: 20px;
  justify-content: space-between;
  align-items: center;
  display: flex;
  padding: 5px 10px;
  width: 100%;
  box-sizing: border-box;


  &:hover {
    color: #817bc7;
  }

  &.selected {
    color: #5D599F;
    background-color: #f1f1f1;

    svg {
      path {
        stroke:  #5D599F;
      }
    }
  }
}

.exchanger-box {
  display: flex;
  gap: 15px;


  .arrow {

  }
  .exchanger-box_icon {

  }
  .loading {
    position: relative;
    width: 30px;
    height: 30px;
  }
  .exchanger-box_input {
    display: flex;
    gap: 20px;
    background-color: #FFFFFF;
    border-radius: 30px;
    padding: 5px;
    box-sizing: border-box;

    .exchanger-box_currency {
      position: relative;
      display: flex;
      gap: 10px;
      align-items: center;


      svg.swapIcon {
        path {
          stroke: #B3B4C9;
        }
      }

      .currency-from, .currency-to {
        border-radius: 30px;
        border: 2px dashed #B3B4C9;
        padding: 5px 5px 5px 20px;
        box-sizing: border-box;
        white-space: nowrap;
        cursor: pointer;
        position: relative;
        display: flex;
        width: 200px;
        height: 42px;
        align-items: center;
        gap: 5px;
        justify-content: start;


        .icon {
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: end;
          position: relative;
          box-sizing: content-box;
          border-radius: 20px;
          background-color: #7AAD7F;

          img {
            filter: invert(100%);
            height: 55%;
            top: 50%;
            left: 50%;
            position: absolute;
            translate: -50% -50%;


          }
        }

        svg {
          transform: rotate(0deg);
          transition: .2s ease;

          &.up {
            transform: rotate(180deg);
          }
        }

        .value {
          width: 80px;
          padding: 0;
          font-size: 15px;
          overflow: hidden;
          display: inline-block;
          text-decoration: none;
          text-overflow: ellipsis;
          white-space: nowrap;
        }


        &:hover {
          background: #ecebf3;
        }
      }
      .arrow {
        width: 15px;
      }

      .rates {
        width: 66%;
        color: #B3B4C9;
        font-size: 13px;
        font-style: normal;
        font-weight: 600;
        line-height: 1;
        cursor: pointer;
        transition: .3s ease;
        border-radius: 20px;
        justify-content: space-between;
        align-items: center;


        &.selected {
          color: #433269;
        }

        &:hover {
          background: #ecebf3;
        }
      }

    }
  }
}
@media screen and (max-width: 500px){
  .button-text {
    width: 100%;
  }
  .exchanger-box {
    margin-bottom: 10px;

    .exchanger-box_input {
      width: 100%;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 5px;


      .exchanger-box_currency {
        width: 100%;
        .rates {
          font-size: 11px;
        }

        .currency-from, .currency-to {
          width: 50%;
          padding: 2px 5px;
        }
      }
    }
  }
}
</style>
