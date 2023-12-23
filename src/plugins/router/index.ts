import { createRouter, createWebHistory } from 'vue-router';
import TutorDtpView from '@/views/tutor-dtp-view.vue';
import StudentDtpView from '@/views/student-dtp-view.vue';
import Dashboard from '@/components/dashboard.vue';

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

export default router;
