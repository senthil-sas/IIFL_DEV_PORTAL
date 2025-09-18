<template>
    <!-- Desktop View -->
    <div class="hidden h-[90px] lg:flex items-center justify-between mx-auto lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl">
        <div class="flex flex-shrink">
            <img class="h-auto cursor-pointer" :src="store.state.clientLogo" alt="IIFL-Logo" @click="goToHome()">
        </div>
        <ul class="flex space-x-8 xl:space-x-16 items-center h-full">
            <li :class="activeTab == record.id && activeTab == 2 ? 'bg-[#FFF5EE] text-[#F37021] font-bold' : 'font-medium text-[#515151]'"
                class="text-[14px]  cursor-not-allowed relative h-full flex select-none" @click="navigateTo(record)"
                v-for="record in tabs" :key="record.id">
                <div class="my-auto">
                    <span class="px-2">{{ record.name }}</span>
                </div>
                <div class="absolute"
                    :class="activeTab == record.id && activeTab == 2 ? 'border-b-2 w-full border-[#F37021] bottom-0 bg-[#FFF5EE] ' : ''">
                </div>
            </li>
            <Menu as="div" class="relative inline-block text-left">
                <div>
                    <MenuButton
                        class="inline-flex w-[150px] h-[40px] justify-center items-center text-white gap-x-1.5 rounded-md bg-[#FAAA38] px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-[#FAAA38] hover:bg-[#FAAA38]">
                        Login / Sign Up
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="7" viewBox="0 0 12 7" fill="none" class="ml-[6px]">
<path d="M11 1L5.9997 6L1 1" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
</svg>
                    </MenuButton>
                </div>
                <transition enter-active-class="transition ease-out duration-100"
                    enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-75"
                    leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                    <MenuItems
                        class="absolute right-0 z-10 mt-[11px] w-[200px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div class="px-5">
                            <MenuItem v-slot="{ active }" v-for="(item, i) of dropDownArray" :key="i">
                            <a @click="handleNavigation(item)"
                                :class="[active ? '' : 'text-[#515151]', 'block py-5 text-sm cursor-pointer', dropDownArray.length - 1 != i ? 'border-b border-[#E9E9E9]' : '']">
                                {{ item.name }}
                            </a>
                            </MenuItem>
                        </div>
                    </MenuItems>
                </transition>
            </Menu>
        </ul>
    </div>
    <!-- Mobile and Tab View -->
    <div>
        <TransitionRoot as="template" :show="sidebarOpen">
            <Dialog class="relative z-50 lg:hidden" @close="sidebarOpen = false">
                <TransitionChild as="template" enter="transition-opacity ease-linear duration-300"
                    enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300"
                    leave-from="opacity-100" leave-to="opacity-0">
                    <div class="fixed inset-0 bg-gray-900/80" />
                </TransitionChild>
                <div class="fixed inset-0 flex">
                    <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
                        enter-from="-translate-x-full" enter-to="translate-x-0"
                        leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0"
                        leave-to="-translate-x-full">
                        <DialogPanel class="relative mr-18 flex w-full max-w-xs flex-1">
                            <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0"
                                enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100"
                                leave-to="opacity-0">
                                <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                                    <!-- <button type="button" class="-m-2.5 p-2.5" @click="sidebarOpen = false">
                                        <span class="sr-only">Close sidebar</span>
                                        <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                                    </button> -->
                                </div>
                            </TransitionChild>
                            <!-- Sidebar component, swap this element with another sidebar if you like -->
                            <div class="flex grow flex-col overflow-y-auto bg-white ">
                                <div class="flex justify-between  shrink-0 items-center px-6 ">
                                    <img class="h-[23px] w-[163px] mt-[30px]" src="../../assets/img/logo-mobile.svg"
                                        alt="Your Company" />
                                    <button type="button" class="" @click="sidebarOpen = false">
                                        <span class="sr-only">Close sidebar</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
<path d="M0.319263 0.320137C0.420471 0.218925 0.540624 0.138639 0.672864 0.0838632C0.805103 0.0290874 0.946838 0.000894218 1.08997 0.000894218C1.23311 0.000894218 1.37485 0.0290874 1.50709 0.0838632C1.63932 0.138639 1.75948 0.218925 1.86069 0.320137L6.99812 5.45724L12.1362 0.320137C12.2374 0.218761 12.3576 0.138312 12.4899 0.0833831C12.6222 0.028454 12.764 0.000120862 12.9073 3.85827e-07C13.0505 -0.00012009 13.1924 0.0279748 13.3248 0.0826813C13.4572 0.137388 13.5775 0.217634 13.6789 0.318839C13.7803 0.420044 13.8608 0.540226 13.9157 0.672521C13.9706 0.804817 13.999 0.946637 13.9991 1.08988C13.9992 1.23313 13.9711 1.375 13.9164 1.50738C13.8617 1.63977 13.7814 1.76009 13.6802 1.86146L8.53955 6.99857L13.6802 12.1363C13.885 12.3411 14 12.6187 14 12.9083C14 13.1978 13.885 13.4755 13.6802 13.6802C13.4755 13.885 13.1978 14 12.9082 14C12.6187 14 12.341 13.885 12.1362 13.6802L6.99812 8.5399L1.86069 13.6802C1.75948 13.7814 1.63932 13.8617 1.50708 13.9165C1.37484 13.9713 1.23311 13.9995 1.08997 13.9995C0.94684 13.9995 0.805108 13.9713 0.672869 13.9165C0.54063 13.8617 0.420474 13.7814 0.319263 13.6802C0.218052 13.579 0.137766 13.4589 0.0829911 13.3267C0.0282159 13.1944 2.37579e-05 13.0527 2.37579e-05 12.9096C2.37579e-05 12.7665 0.0282159 12.6247 0.0829911 12.4925C0.137766 12.3603 0.218052 12.2401 0.319263 12.1389L5.45735 7.00116L0.319263 1.86406C0.218045 1.76286 0.137754 1.64271 0.0829743 1.51048C0.0281949 1.37825 0 1.23652 0 1.09339C0 0.950267 0.0281949 0.808542 0.0829743 0.676311C0.137754 0.544079 0.218045 0.423932 0.319263 0.322731V0.320137Z" fill="#919191"/>
</svg>
                                    </button>
                                </div>
                                <nav class="flex flex-1 flex-col px-5">
                                    <ul role="list" class="flex flex-1 flex-col gap-y-7">
                                        <li>
                                            <ul role="list" class="">
                                                <li @click="navigateTo(item)" :class="[activeTab == item.id  ? 'text-[#F37021] font-bold text-[16px]' : 'font-medium text-[#515151] text-[16px]', 'group flex gap-x-3 rounded-none text-sm leading-6 border-b']" class="py-[30px]" v-for="(item, index) in navigation" :key="index">
                                                        {{ item.name }}
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </nav>
                                <div class=" bg-[#3E3E3E] h-auto">
                                    <ul class="px-5 grid grid-cols-1 divide-y divide-[#4E4E4E]">
                                        <li v-for="item in navbarRedirection" :key="item.name"  class="text-[#FFFFFF] text-[16px] font-medium py-[30px]" >
                                            <a :href="item.href">{{ item.name }}</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </Dialog>
        </TransitionRoot>

        <div class="lg:pl-72 lg:hidden">
            <div class="sticky top-0 z-40 flex h-[50px] shrink-0 items-center justify-between gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                <div class="flex space-x-[15px]">
                    <button type="button" class="-m-2.5 p-2.5 text-gray-700 lg:hidden" @click="sidebarOpen = true">
                        <span class="sr-only">Open sidebar</span>
                        <!-- <Bars3Icon class="h-6 w-6"  /> -->
                        <svg aria-hidden="true" width="16" height="12" viewBox="0 0 16 12" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M0.995925 11.9992C0.719816 11.9476 0.471446 11.8087 0.293 11.6061C0.114553 11.4035 0.0170282 11.1497 0.0170282 10.8878C0.0170282 10.6259 0.114553 10.3722 0.293 10.1696C0.471446 9.96696 0.719816 9.82805 0.995925 9.77645H9.68915C9.96526 9.82805 10.2136 9.96696 10.3921 10.1696C10.5705 10.3722 10.668 10.6259 10.668 10.8878C10.668 11.1497 10.5705 11.4035 10.3921 11.6061C10.2136 11.8087 9.96526 11.9476 9.68915 11.9992H0.995925ZM1.23496 7.11659C1.078 7.12048 0.921765 7.09559 0.775153 7.04333C0.628541 6.99108 0.494437 6.9125 0.380491 6.81205C0.266545 6.7116 0.174994 6.59127 0.111061 6.45792C0.0471289 6.32457 0.0120707 6.18082 0.0078851 6.03487C0.00369954 5.88893 0.0304731 5.74363 0.0866715 5.6073C0.14287 5.47098 0.227381 5.34628 0.335408 5.24033C0.443435 5.13438 0.572849 5.04925 0.716258 4.98981C0.859667 4.93036 1.01427 4.89776 1.17122 4.89387H14.7808C14.9377 4.89046 15.0939 4.91585 15.2403 4.96855C15.3867 5.02126 15.5205 5.10024 15.6341 5.20104C15.7477 5.30183 15.8388 5.42244 15.9022 5.55598C15.9657 5.68951 16.0002 5.83335 16.0039 5.9793C16.0075 6.12524 15.9803 6.27043 15.9236 6.40657C15.8669 6.54271 15.7819 6.66714 15.6735 6.77275C15.5651 6.87836 15.4355 6.96308 15.2918 7.02208C15.1482 7.08108 14.9935 7.11319 14.8366 7.11659H1.23496ZM1.23496 2.23401C0.917967 2.24482 0.609356 2.13809 0.37699 1.93731C0.144624 1.73654 0.00754427 1.45815 -0.00407877 1.1634C-0.0157018 0.868644 0.0990779 0.581685 0.315006 0.365622C0.530935 0.149559 0.83033 0.0220968 1.14732 0.0112892H14.7808C15.0978 0.00441168 15.4047 0.114898 15.6341 0.318456C15.8635 0.522013 15.9965 0.801965 16.0039 1.09672C16.0113 1.39147 15.8925 1.67689 15.6735 1.89017C15.4546 2.10346 15.1536 2.22714 14.8366 2.23401H1.23496Z"
                                fill="#333333" />
                        </svg>
                    </button>
                    <!-- Separator -->
                    <!-- <div class="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" /> -->
                    <div class="flex flex-shrink">
                        <img class="h-auto cursor-pointer" :src="store.state.clientLogo" alt="IIFL-Logo" @click="goToHome()">
                    </div>
                </div>
                <Menu as="div" class="relative inline-block text-left">
                    <div>
                        <MenuButton
                            class="inline-flex w-[110px] h-[30px] text-nowrap justify-center items-center text-white rounded-md bg-[#FAAA38] px-2 py-2 text-[11px] leading-[24px] font-semibold shadow-sm ring-1 ring-inset ring-[#FAAA38] hover:bg-[#FAAA38]">
                            Login / Sign Up
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="6" viewBox="0 0 10 6" fill="none" class="ml-1">
<path d="M9 1L4.99976 5L1 1" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                        </MenuButton>
                    </div>
                    <transition enter-active-class="transition ease-out duration-100"
                        enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                        leave-active-class="transition ease-in duration-75"
                        leave-from-class="transform opacity-100 scale-100"
                        leave-to-class="transform opacity-0 scale-95">
                        <MenuItems
                            class="absolute right-0 z-10 mt-[11px] w-[200px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div class="px-5">
                                <MenuItem v-slot="{ active }" v-for="(item, i) of dropDownArray" :key="i">
                                <a @click="handleNavigation(item)"
                                    :class="[active ? '' : 'text-gray-700', 'block py-5 text-sm cursor-pointer', dropDownArray.length - 1 != i ? 'border-b' : '']">
                                    {{ item.name }}
                                </a>
                                </MenuItem>
                            </div>
                        </MenuItems>
                    </transition>
                </Menu>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import {
    Dialog,
    DialogPanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TransitionChild,
    TransitionRoot,
} from '@headlessui/vue'
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import { useStore } from 'vuex';
const store = useStore()
const navigation = [
    // {id: 0, name: 'API Docs', key: '#api', path: '/' },
    {id: 1, name: 'Community', key: '#community', path: '/' },
    // {id: 2, name: 'Key Partners', key: '', path: '/key_partners' },
];
const sidebarOpen = ref(false);
const router = useRouter()
const activeTab = ref<number | null>(null)
type Ttab = { id: number, name: string, key: string, path: string, disabled?: boolean }
const tabs = ref<Ttab[]>([
    // { id: 0, name: 'API Docs', key: '#api', path: '/' },
    { id: 1, name: 'Community', key: '#community', path: '/', disabled:true },
    // { id: 2, name: 'Key Partners', key: '', path: '/key_partners' },
]);

const devPortalRedirectUrl =  store.state.devPortalRedirectUrl
const webPortalRedirectUrl =  store.state.webPortalRedirectUrl

const dropDownArray = ref([
    { name: 'As Individual Trader', href: webPortalRedirectUrl, target: '_blank' },
    { name: 'As Partner', href: `${devPortalRedirectUrl}`, target: '_blank' }
]);

const navbarRedirection=ref([
{ name: 'Login as Individual Trader', href: webPortalRedirectUrl, target: '_blank' },
{ name: 'Login as Partner', href: `${devPortalRedirectUrl}`, target: '_blank' }
]);

const navigateTo = (data: Ttab) => { 
    // activeTab.value = data.id;
    // router.push({ path: data.path, hash: data.key });
    // sidebarOpen.value=false
}
// const navigateAsPartner = (): void => {
//     window.open("https://iifl.codifi.in/developer/", '_self');
// }

const goToHome = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

const handleNavigation = (data:any) => {
    // if(data.name.includes('Individual Trader')) {
    //     window.open(data.href, data.target)
    // } else if(data.name.includes('Partner')) {
    //     router.push(data.href)
    // }
    window.open(data.href, data.target)
}
</script>
<style></style>