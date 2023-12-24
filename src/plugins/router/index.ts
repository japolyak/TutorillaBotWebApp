import { createRouter, createWebHistory } from 'vue-router';
import TutorDtpView from '@/views/tutor-dtp-view.vue';
import StudentDtpView from '@/views/student-dtp-view.vue';
import Dashboard from '@/components/dashboard.vue';
import { telegramValidation } from '@/services/api/telegram-validation'

const router = createRouter({
    history: createWebHistory(),
    routes: [
		{
			path: '/',
			component: Dashboard,
            children: [
                {
                    path: '/tutor/private-course/:privateCourseId',
                    name: 'DateTimePickerForTutor',
                    component: TutorDtpView,
                },
                {
                    path: '/student/private-course/:privateCourseId',
                    name: 'DateTimePickerForStudent',
                    component: StudentDtpView,
                },
            ],
		},
        
    ],
});

router.beforeEach((to, from) => telegramValidation(window.Telegram.WebApp.initData));

export default router;
