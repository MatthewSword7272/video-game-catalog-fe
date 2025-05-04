import { useUsers } from '~/composables/stores/userStore';

export default defineNuxtRouteMiddleware((to, from) => {

  // const userStore = useUsers();

  if (import.meta.server) return

  const {currentUser} = useUsers();
  // const user = getUser();

  console.log('currentUser', currentUser);

  if (currentUser === null && (to.path === '/')) {
    return navigateTo('/login')
  }

  if (currentUser && to.path === '/login') {
    return navigateTo('/');
  }

})