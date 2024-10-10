import {reactive} from "vue";

export const allSorts =  reactive([{
        name: 'Высокий рейтинг',
        slug: 'highestRating'
    },{
        name: 'Низкий рейтинг',
        slug: 'lowestRating'
    },
    {
        name: 'Больше оценок',
        slug: 'highestRatingCount'
    },{
        name: 'Меньше оценок',
        slug: 'lowestRatingCount'
    },
    {
        name: 'Сначала новые',
        slug: 'newest'
    },{
        name: 'Сначала старые',
        slug: 'oldest'
    }
])

export const projectReviewsSort =  reactive([{
        name: 'Высокий рейтинг',
        slug: 'highestRating'
    },{
        name: 'Низкий рейтинг',
        slug: 'lowestRating'
    },{
        name: 'Сначала новые',
        slug: 'newest'
    },{
        name: 'Сначала старые',
        slug: 'oldest'
    }
])