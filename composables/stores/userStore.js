export const useUsers = defineStore('usersStore', () => {
    
    const currentUser = useState('currentUser', () => null);

    const getUser = () => {
        if (import.meta.client) {
            const userJson = localStorage.getItem('currentUser');
            currentUser.value = JSON.parse(userJson);
            return currentUser.value;
        }
        return null;
    }

    const storeUser = (user) => {
        currentUser.value = user;
        if (import.meta.client) {
            localStorage.setItem('currentUser', JSON.stringify(user));
        }
        console.log(currentUser.value);
    }

    const deleteUser = () => {
        currentUser.value = null;
        if (import.meta.client) {
            localStorage.removeItem('currentUser');
        }
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