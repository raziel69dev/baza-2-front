<template>
  <div class="search">
    <div class="searchIcon" @click="onSearch()" v-if="!showSearch">
      <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
        <g clip-path="url(#clip0_1321_2485)">
          <path d="M20.7434 18.5774L14.7716 12.8899C15.9283 11.5291 16.6248 9.79996 16.6248 7.91666C16.6248 3.55171 12.8956 6.10352e-05 8.31239 6.10352e-05C3.72919 6.10352e-05 0 3.55167 0 7.91662C0 12.2816 3.72923 15.8332 8.31243 15.8332C10.2899 15.8332 12.1055 15.1699 13.5344 14.0682L19.5062 19.7557C19.6768 19.9182 19.9008 19.9999 20.1248 19.9999C20.3488 19.9999 20.5728 19.9182 20.7434 19.7557C21.0856 19.4299 21.0856 18.9032 20.7434 18.5774ZM8.31243 14.1666C4.69345 14.1666 1.75 11.3633 1.75 7.91662C1.75 4.46998 4.69345 1.66669 8.31243 1.66669C11.9314 1.66669 14.8749 4.46998 14.8749 7.91662C14.8749 11.3633 11.9314 14.1666 8.31243 14.1666Z" fill="#191B2A"/>
        </g>
        <defs>
          <clipPath id="clip0_1321_2485">
            <rect width="21" height="20" fill="white"/>
          </clipPath>
        </defs>
      </svg>
    </div>
    <div class="search" v-if="showSearch">
      <input-search />
    </div>
  </div>
</template>

<script>
import inputSearch from "@/components/Inputs/InputSearch.vue";


export default {
  name: "TheSearch.vue",
  data() {
    return {
      showSearch: false
    }
  },

  components: {
    inputSearch
  },

  methods: {
    onSearch() {
      this.$emit('searchOpen')
      this.showSearch = true
      window.addEventListener('mousedown', this.closeByOutsideClick)
      window.addEventListener('keydown', this.closeByEsc)
    },
    closeByOutsideClick (event) {
      if (event.target.dataset.dropdown !== 'dropdownSearch') {
        this.closeSearch()
        this.showLiveResults  = false
        window.removeEventListener('mousedown', this.closeByOutsideClick)
        window.removeEventListener('keydown', this.closeByEsc)
      }

    },
    closeByEsc (event) {
      if (event.key === 'Escape') {
        this.closeSearch()
        window.removeEventListener('mousedown', this.closeByOutsideClick)
        window.removeEventListener('keydown', this.closeByEsc)
      }

    },
    closeSearch() {
      this.$emit('searchOpen')
      this.showSearch = false
    },
  },

  mounted() {

  }

}
</script>

<style scoped lang="scss">
.search {
  display: flex;
  width: 100%;
  align-items: center;
}
</style>