import { defineStore, acceptHMRUpdate } from "pinia";
import { useState } from "#app";

export const useUsers = defineStore('usersStore', () => {

    const currentUser = useState('currentUser', () => null);

    const storeUser = (user) => {
        currentUser.value = user;
    }

    const deleteUser = () => {
        currentUser.value = null;
    }

    return {
        currentUser,
        storeUser,
        deleteUser
    }

})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUsers, import.meta.hot));
}