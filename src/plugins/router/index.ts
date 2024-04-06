import { createRouter, createWebHistory } from 'vue-router';
import TutorDtpView from '@/views/tutor-dtp-view.vue';
import TestView from '@/views/test-view.vue';
import Dashboard from '@/components/dashboard.vue';
import { telegramUserAuthentication } from '@/services/telegram-validation'

const router = createRouter({
    history: createWebHistory(),
    routes: [
		{
			path: '/',
			component: Dashboard,
            children: [
                {
                    path: '/private-course/:privateCourseId',
                    name: 'DateTimePickerForTutor',
                    component: TutorDtpView,
                },
				{
					path: 'test',
					name: 'Test',
					component: TestView,
				}
            ],
		},

    ],
});

router.beforeEach(async (to, from, next) => await telegramUserAuthentication(window.Telegram.WebApp.initData, next));

export default router;
