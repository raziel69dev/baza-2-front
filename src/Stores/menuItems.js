import {reactive} from "vue";

import iconCatalog from '@/assets/icons/lock-icon.svg'
import iconGuarantee from '@/assets/icons/icon-guarantee.svg'
import iconAdv from '@/assets/icons/icon-advertisement.svg'
import iconContacts from '@/assets/icons/icon-contacts.svg'
import iconFavorite from '@/assets/icons/icon-favorite.svg'
import iconPlus from '@/assets/icons/icon-plus.svg'

export const menuItems = reactive([
{
        name: 'Гарант',
        href: '/guarantee',
        icon: iconGuarantee,
        color: 'default'
    },{
        name: 'Реклама',
        href: '/advertisement',
        icon: iconAdv,
        color: 'default'
    },{
        name: 'Избранное',
        href: '/favorite',
        icon: iconFavorite,
        color: 'pink'
    },{
        name: 'Разместить',
        href: '/add-project',
        icon: iconPlus,
        color: 'default'
    },
])