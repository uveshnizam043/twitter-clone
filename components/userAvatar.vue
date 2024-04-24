<template>

<v-avatar color="surface-variant">{{ extractInitials(username) }}</v-avatar>
</template>

<script setup>
 
 const props = defineProps({
    username: {
      type: String,
      default: "cog",
    },
  });


  function extractInitials(fullName) {
    // Split the full name into words
    const words = fullName.split(" ");
    
    // Initialize an empty string to store initials
    let initials = "";
    
    // Iterate through each word
    for (let i = 0; i < words.length; i++) {
        // Add the first letter of each word to the initials string
        initials += words[i][0];
    }
    
    // Return the initials converted to uppercase
    return initials.toUpperCase();
}

</script>