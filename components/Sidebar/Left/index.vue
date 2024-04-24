<template>
  <div class="h-screen flex flex-col">
    <div
      class="p-2 my-2 rounded-full border-gray-300 hover:rounded-full hover:bg-blue-500 dark:hover:bg-white/20"
      :class="defaultTransition"
    >
      <nuxt-link to="/">
        <div class="w-8 h-8">
          <LogoTwitter   />
        </div>
      </nuxt-link>
    </div>
    <SidebarLeftTab v-for="(tab, index) in tabs" :key="index" class="text-white">
      <template v-slot:icon>
        <component :is="tab.icon" class="text-gray-500" />
      </template>
      <template v-slot:name><span  class="text-gray-500" >{{ tab.name }}</span></template>
    </SidebarLeftTab>
  </div>
</template>
<script setup>
import {
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  DocumentTextIcon,
  UserIcon,
  // DotsCircleHorizontalIcon,
  PencilIcon,
  ChevronDownIcon,
  HomeIcon,
} from "@heroicons/vue/24/solid";

import useTailwindConfig from "../../../composables/useTailwindConfig.js";
const { defaultTransition } = useTailwindConfig()


const transition = "transition ease-in-out duration-500";
const  tabs=ref( [
        { icon: HomeIcon, name: "Home" },
        { icon: HomeIcon, name: "Explore" },
        { icon: BellIcon, name: "Notifications" },
        { icon: InboxIcon, name: "Message" },
        { icon: BookmarkIcon, name: "Bookmark" },
        { icon: DocumentTextIcon, name: "Lists" },
        { icon: UserIcon, name: "Profile" },
        // { icon: DotsCircleHorizontalIcon, name: "More" },
        // { icon: PencilIcon, name: "User" },
      ])
</script>
