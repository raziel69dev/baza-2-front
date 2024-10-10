import {reactive} from "vue";
import iconCategory from '@/assets/icons/icon-category-manager.svg'
import iconCheck from '@/assets/icons/icon-check.svg'
import iconCheckMessage from '@/assets/icons/icon-check-message.svg'
import iconDollar from '@/assets/icons/icon-dollar.svg'
import iconHearth from '@/assets/icons/menu-icons/icon-hearth.svg'



export const adminMenu = reactive([
    {
        name: 'Редактор категорий',
        icon: iconCategory,
        link: '/categories-editor',
        color: 'black',
        access: 'admin'
    },{
        name: 'Проверить проекты',
        icon: iconCheck,
        link: '/projects-checker',
        color: 'black',
        access: 'admin'
    },{
        name: 'Проверить отзывы',
        icon: iconCheckMessage,
        link: '/reviews-checker',
        color: 'black',
        access: 'admin'
    },{
        name: 'Редактор платных мест',
        icon: iconDollar,
        link: '/payed-editor',
        color: 'black',
        access: 'admin'
    },
])