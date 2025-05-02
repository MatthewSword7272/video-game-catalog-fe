import { useUsers } from '~/composables/stores/userStore';

export default defineNuxtRouteMiddleware((to, from) => {

  const userStore = useUsers();

  const {getUser} = userStore;

  if (getUser() === null && to.path !== '/login' && to.path !== '/signup') {
    return navigateTo('/login')
  } else {
    return navigateTo('/')
  }

})