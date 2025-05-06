import { useUsers } from '~/composables/stores/userStore';

export default defineNuxtRouteMiddleware((to, from) => {

  // const userStore = useUsers();

  // if (import.meta.server) return

  const {currentUser} = useUsers();
  // const user = getUser();

  if (!currentUser && (to.path === '/')) {
    return navigateTo('/login')
  }
  else if (currentUser && to.path === '/login') {
    return navigateTo('/');
  }

})