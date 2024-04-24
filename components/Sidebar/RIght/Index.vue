<template>
<input placeholder="Search Twitter">
<div class=" ">
    
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
  