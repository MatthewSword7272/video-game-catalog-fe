import { OhVueIcon, addIcons } from "oh-vue-icons";
import { FaChevronDown, FaChevronUp, HiMenu, IoClose } from "oh-vue-icons/icons";

addIcons(FaChevronUp, FaChevronDown, HiMenu, IoClose);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("v-icon", OhVueIcon);
});