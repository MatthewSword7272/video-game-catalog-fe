export const useUsers = defineStore('usersStore', () => {

    const currentUser = useCookie('currentUser', null);

    const getUser = () => {
       return currentUser.value;
    }

    const storeUser = (user) => {
        currentUser.value = user;
    }

    const deleteUser = () => {
        currentUser.value = null;
    }

    return {
        currentUser,
        storeUser,
        deleteUser,
        getUser
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUsers, import.meta.hot));
}