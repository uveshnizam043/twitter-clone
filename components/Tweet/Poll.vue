<template>
    <div class="flex" v-if="model">
        <div class="mr-6">
            <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" alt="Avatar" />
        </div>
        <div style="width: 100%;">
            <v-icon icon="mdi-checkbox-marked-circle" end color="red"></v-icon>
            <v-textarea style="color: white;border: none;outline: none;background-color: transparent" color="black"
                placeholder="Ask Question" hide-details auto-grow rows="2" v-model="state.tweetContent" />
            <div style="border: 1px solid grey;" class="mt-4 p-4">

                <div v-for="(item, index) of state.choiceList" :key="index">
                    <div class="flex items-center">
                        <div class="relative w-[90%] ">
                            <input type="text" id="floating_outlined" v-model="item.choice"
                                @input="disabledCountWords($event, item.choice)"
                                class="mb-2 border-2 block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray- appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:border-blue-600 peer "
                                placeholder=" " />
                            <label for="floating_outlined"
                                class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:text-blue-600 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Choice
                                {{ index + 1 }}</label>
                            <label for="floating_outlined"
                                class="absolute right-1 top-2 text-sm scale-100  peer-focus:d-block  duration-300 -translate-y-1 ">{{
                                    countWords(item.choice) }}/25</label>
                        </div>
                        <div class="ml-2">

                            <Icon v-if="index + 1 == state.choiceList.length || !state.choiceList.length > 3" name="add"
                                style="fill: white;color: white;" @click="addChoice" />

                        </div>
                    </div>

                </div>

                <div class="py-2"> Poll Length<div>
                        <div class="flex">
                            <v-select v-model="state.day" style="width: 150px;" :hide-details="false" variant="outlined"
                                label="Day" density="compact" :items="days"></v-select>
                            <v-select v-model="state.hour" style="width: 150px;" :hide-details="false"
                                variant="outlined" class="mx-4" label="Hour" density="compact"
                                :items="hours"></v-select>
                            <v-select v-model="state.minute" style="width: 150px;" :hide-details="false"
                                variant="outlined" label="Minute" density="compact" :items="minutes"></v-select>
                        </div>
                    </div>
                    <div class="border-t-2 border-t-red-200">
                        <v-btn variant="outlined" color="#a9888b" class="w-[100%]" @click="removePoll">
                            Remove Poll
                        </v-btn>
                    </div>
                    <div class="flex justify-end mt-2">
                        <v-btn color="primary" variant="outlined" size="small" @click="postPollTweet">
                            Post
                        </v-btn>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import useTweet from '../composables/useTweet.js'
import useAuth from '../composables/Auth/useAuth.js'
const { useAuthUser } = useAuth()
const user = useAuthUser()
const model = defineModel()
const { postsPollTweet ,getTweets} = useTweet()

const removePoll = () => {
    model.value = false
    state.value = {
        tweetContent: "",
        day: 1,
        hour: "01",
        minute: "01",
        choiceList: [{
            choice: null
        },
        {
            choice: null
        }
        ],

    }
}

const postPollTweet = async() => {
    console.log("user",user.value._id)
    const obj = {
        question: state.value.tweetContent,
        user: user.value._id,
        choices: state.value.choiceList,
    }

    await postsPollTweet(obj)
    await getTweets()

}
const state = ref({
    tweetContent: "",
    day: 1,
    hour: "01",
    minute: "01",
    choiceList: [{
        choice: null
    },
    {
        choice: null
    }
    ],

})
const days = ref([{ title: '1', value: 1 },
{ title: '2', value: 2 },
{ title: '3', value: 3 },
{ title: '4', value: 4 },
{ title: '5', value: 5 },
{ title: '6', value: 6 },
{ title: '7', value: 7 }])

const addChoice = () => {

    state.value.choiceList.push({
        choice: null

    })
}
const hours = [
    '01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
    '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
    '21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
    '31', '32', '33', '34', '35', '36', '37', '38', '39', '40',
    '41', '42', '43', '44', '45', '46', '47', '48', '49', '50',
    '51', '52', '53', '54', '55', '56', '57', '58', '59', '60'
]
const minutes = [
    '01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
    '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
    '21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
    '31', '32', '33', '34', '35', '36', '37', '38', '39', '40',
    '41', '42', '43', '44', '45', '46', '47', '48', '49', '50',
    '51', '52', '53', '54', '55', '56', '57', '58', '59', '60'
]

const countWords = (text) => {
    if (text) {

        return text.trim().length;
    } else {
        return 0
    }

}
const disabledCountWords = (event, text) => {
    const maxLength = 25; // Set the maximum length
    const input = event.target.value; // Access input value directly from event target
    const currentLength = input.length;

    if (currentLength >= maxLength) {
        // Prevent further typing when the maximum length is reached
        event.preventDefault();
    }

}


</script>
<style scoped lang="scss">
input:focus {
    // border: 1px solid blue;
}
</style>