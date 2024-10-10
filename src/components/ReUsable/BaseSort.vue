<template>
  <div class="sort" data-dropdown="projectssort" @click="onDropdownStateChange()">
    <span class="sort-name" data-dropdown="projectssort">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <g clip-path="url(#clip0_1302_3778)">
          <mask id="mask0_1302_3778" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
            <path d="M0 0H24V24H0V0Z" fill="white"/>
          </mask>
          <g mask="url(#mask0_1302_3778)">
            <path d="M15.5 6H13.5C12.3954 6 11.5 6.89543 11.5 8C11.5 9.10457 12.3954 10 13.5 10H15.5C16.6046 10 17.5 9.10457 17.5 8C17.5 6.89543 16.6046 6 15.5 6Z" stroke="#7773FB" stroke-width="2"/>
            <path d="M9.5 14H11.5C12.6046 14 13.5 14.8954 13.5 16C13.5 17.1046 12.6046 18 11.5 18H9.5C8.39543 18 7.5 17.1046 7.5 16C7.5 14.8954 8.39543 14 9.5 14Z" stroke="#7773FB" stroke-width="2"/>
            <path d="M3 7C2.44772 7 2 7.44772 2 8C2 8.55228 2.44772 9 3 9V7ZM11.5 7H3V9H11.5V7Z" fill="#7773FB"/>
            <path d="M16.5 16H21" stroke="#7773FB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M21 8H20.5" stroke="#7773FB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M3 17C2.44772 17 2 16.5523 2 16C2 15.4477 2.44772 15 3 15V17ZM3 15H7.5V17H3V15Z" fill="#7773FB"/>
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1302_3778">
            <rect width="24" height="24" fill="white"/>
          </clipPath>
        </defs>
      </svg>

      <svg  width="14" height="8" viewBox="0 0 14 8" class=" filter arrow" data-dropdown="projectssort" :class="direction" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L7 7L13 1" stroke="black" data-dropdown="projectssort" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </span>


    <dropdownBox v-if="dropdown.show === true"
                 :selector="'projectssort'"
                 @closeDropdown="onDropdownStateChange()"
    >
      <div class="sort-item"
           :class="{active: activeSort.name === sort.name}"
           v-for="sort of $props.sorts" @click="setNewActiveSort(sort)">
        {{ sort.name }}

        <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg" v-show="activeSort.name === sort.name">
          <path d="M17 1L6 12L1 7" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>


      </div>
    </dropdownBox>

  </div>
</template>

<script>
import dropdownBox from "@/components/ReUsable/DropdownBox.vue";


export default {
  name: "BaseSort.vue",
  props: {
    sorts: Array
  },
  data() {
    return {
      dropdown: {
        show: false
      },
      direction: 'down',
      activeSort: {}
    }
  },

  components: {
    dropdownBox
  },

  methods: {
    onDropdownStateChange() {
      this.dropdown.show = !this.dropdown.show
      this.direction === 'up' ? this.direction = 'down' : this.direction = 'up'
    },
    setNewActiveSort(sort) {
      this.activeSort = sort
      this.$emit('sortChanged', sort)
    }
  },

  mounted() {
    this.setNewActiveSort(this.$props.sorts[0])
  }

}
</script>

<style scoped lang="scss">
.sort {
  position: relative;
  .sort-item {
    color: #6B6B6B;
    transition: .3s ease;
    width: 190px;
    display: flex;
    gap: 10px;
    box-sizing: border-box;
    padding: 5px 10px;
    justify-content: space-between;
    align-items: center;
    border-radius: 20px;
    transition: .3s ease;
    cursor: pointer;


    &:hover {
      color: #1E1E1E;
    }

    &.active {
      color: black;
      background-color: rgba(93, 89, 159, 0.08);
      svg {
        path {
          stroke: black;
        }
      }
      &:hover {
        svg {
          path {
            stroke: black;
          }
        }
      }
    }
  }
  .sort-name {
    position: relative;
    border-radius: 40px;
    background-color: transparent;
    transition: .3s ease;
    padding: 10px 15px;

    box-sizing: border-box;
    cursor: pointer;
    border: 1px solid #d9d8ef;
    display: flex;
    align-items: center;
    gap: 10px;

    &:hover {
      background-color: rgba(93, 89, 159, 0.15);
    }

    svg.filter {
      path {
        transition: .3s ease;
        stroke: #7773FB;
      }
    }

    .arrow {
      transition: .3s ease;

      &.up {
        rotate: 180deg;
      }
      &.down {
        rotate: 0deg;
      }
    }

    &:hover {
      svg {
        path {
          stroke: #5D599F;
        }
      }
    }
  }
}

@media screen and (max-width: 500px) {
  .sort {
    .sort-name {
      padding: 5px 10px;
    }
  }
}
</style>