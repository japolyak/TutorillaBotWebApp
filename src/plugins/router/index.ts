import { createRouter, createWebHistory } from 'vue-router';
import DatePicker from '@/components/date-picker.vue';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/private-course/:privateCourseId',
            name: 'DateTimePicker',
            component: DatePicker,
        },
    ],
});

export default router;