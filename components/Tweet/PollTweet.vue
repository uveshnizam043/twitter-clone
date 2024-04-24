<template>

    <div v-if="false">

        <div style="display: flex;align-items: start;">
            <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" alt="Avatar" />
        </div>
        <div>
            {{ question }}
        </div>
        <div v-for="(item, index) of  choices" :key="index" class="flex  items-center justify-between  mb-2 ">
            <!-- <span></span> -->
            <div class="bg-gray-400 h-8 rounded-md flex justify-start items-center mr-2" style="width: 400px;">
                <div class="bg-blue-400 h-8 flex items-center p-1" :style="{ width: `${calculate[index]}%` }">{{
                    item.choice }}</div>
            </div>
            <div>
                {{ calculate[index] }}%
                <!-- {{ calculate }} -->
            </div>

        </div>

    </div>
    <div>
        <div class="flex mb-2">
            <div style="display: flex;align-items: start;">
                <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" alt="Avatar" />
            </div>
            <div class="ml-2 ">
                {{ question }}
            </div>
        </div>
        <div v-for="(item, index) of  choices" :key="index" style="width: 400px"
            class="flex w-[100%]  items-center justify-between  mb-2 ">
            <div class="poll border-2 p-1 rounded-lg  transition-all duration-150 ease-in-out text-center cursor-pointer w-auto border-blue-400"
                style="width: 100% !important">
                {{ item.choice }}

            </div>

        </div>

    </div>

</template>
<script setup>

//props
const props = defineProps({
    tweet: {
        type: Object,
        default: () => { },
    },
    choices: {
        type: Array,
        default: () => [],
    },
    question: {
        type: String,
        default: null,
    },

});
const calculate = computed(() => {

    let totalPercentage = 0;
    props.choices.forEach(choice => {
        totalPercentage += choice.choicePercentage;
    });
    const choiceSelected = []
    props.choices.forEach(element => {
        const percentage = (element.choicePercentage / totalPercentage) * 100
        choiceSelected.push(Math.round(percentage))
    });
    return choiceSelected
})

</script>
<style scoped lang="scss">
/* For WebKit browsers like Chrome and Safari */
::-webkit-progress-bar {
    background-color: transparent;
    /* Set your desired background color here */
}

/* For Firefox */
::-moz-progress-bar {
    background-color: #ccc;
    /* Set your desired background color here */
}

.poll:hover{
    // background: rgba(219 234 254.0.5);
}
</style>