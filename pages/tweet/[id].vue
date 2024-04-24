<script setup>
import useTweet from '../composables/useTweet.js'
const {  getTweet} = useTweet()

const route = useRoute()
onMounted(async () => {
    try {
     const data=   await getTweet(route.params.id)

           console.log("getTweet",data);

    } catch (error) {
        console.log(error)
    } finally {
        //   state.loading = false
    }
})

</script>

<template>
{{ route.params.id }}

</template>