<template>
    <div class="">
        <div v-if="scheduleTweetTime1">
            Tweet is Schedule at {{ convertTimeIntoReadableFormat(scheduleTweetTime1) }}
        </div>
        <template v-if="!showPollModal">
            <UTextarea v-model="content" />
            <UButton @click="submitTweet"> Submit
            </UButton>
        </template>

        <TweetSchedule v-model="showScheduleModal" />
        <TweetPoll v-model="showPollModal" />
        <div class="flex">
            <Icon name="schedule" @click="toggleScheduleModal" />
            <Icon name="poll" class="mx-4" @click="togglePollTweet" />
        </div>
        <ul>
            User {{ showScheduleModal }}
            <li v-for="(tweet, index) of tweets1" :key="index" class="tweet__container" @click="goTweet(tweet._id)">
                <Tweet v-if="!tweet?.choices" :tweet="tweet" :name="tweet.user.username"
                    :username="tweet.user.username" :tweetTime="tweet.createdAt" :tweetContent="tweet.content"
                    :tweetReplies="tweet.replies" :tweetLikes="tweet.likes" :retweetTweet="tweet?.retweets"
                    :repostTweet="tweet?.repostTweet" />
                <TweetPollTweet v-else :tweet="tweet" :question="tweet.content" :choices="tweet.choices" />
            </li>
        </ul>
        <!-- <Tweet/> -->
        <modal v-model="showModal" style="border-radius: 1rem;">
            <div class="modal bg-black">
                <Icon name="close" class="modal_icon text-2xl cursor-pointer" @click="showModal = false" />
                <div class="flex justify-start align-start">
                    <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" alt="Avatar" />
                    <div class="my-0 pl-4">
                        <label for="" class="font-bolder pr-1">True Story</label>
                        <label for="" class="font-medium text-gray-400">@{{ currentTweet.user.username }}</label>
                        <div>
                            {{ currentTweet.content }}
                        </div>
                        <div class="text-gray-400">
                            Replying to <span class="text-blue-600">
                                @{{ currentTweet.user.username }}
                            </span>
                            <div />
                        </div>


                    </div>
                    <!-- {{ currentTweet }} -->
                </div>
                <div class="modal_input mt-4">
                    <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" alt="Avatar" />
                    <UTextarea style="border: 1px solid red;" v-model="replay" color="primary" variant="none"
                        placeholder="What is happening?w!" />
                </div>
                <div class="grey-line"></div>
                <div class="modal_postBtn">
                    <UButton :disabled="!replay" size="lg" color="blue" variant="solid"
                        @click="replyTweet1(currentTweet._id)">
                        Reply</UButton>
                </div>
            </div>
        </modal>
    </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import useTweet from '../composables/useTweet.js'
import useAuth from '../composables/Auth/useAuth.js'
// import IconRetweet from '~/assets/icons/retweet.svg'
// import IconFavorite from '~/assets/icons/favorite.svg'
// import IconChat from '~/assets/icons/chat.svg'
// import IconClose from '~/assets/close.svg'
const { login, useAuthUser, userAuthenticated } = useAuth()
const user = useAuthUser()
const userAuthentica = userAuthenticated()
const items = [
    { title: 'Click Me' },
    { title: 'Click Me' },
    { title: 'Click Me' },
    { title: 'Click Me 2' },
]
const model = ref(true)
const state = ref({
    tweetContent: "",
    Choice1: "",
    Choice2: ""

})
const locations = [
    'top',
    'bottom',
    'start',
    'end',
    'center',
]
const location = 'end'
const { postTweet, getTweets, useTweets, updateTweetLike, replyTweet, postBookmark, scheduleTweetTime, showScheduleModal, toggleScheduleModal, scheduleTweet, togglePollTweet, showPollModal } = useTweet()
const scheduleTweetTime1 = scheduleTweetTime()
const tweets1 = useTweets()
const content = ref(null)
const showModal = ref(false)
const value = ref('')
const currentTweet = ref(null)
onMounted(async () => {
    try {
        await getTweets()

    } catch (error) {
        console.log(error)
    } finally {
        //   state.loading = false
    }
})
const submitTweet = async () => {

    try {
        const { minute, hour, day, month } = scheduleTweetTime1.value
        if (minute && hour && day && month) {

            scheduleTweet({ minute: Number(minute), hour, day, month, content: content.value, author: user.value._id, user: user.value._id })
        } else {
            await postTweet(
                content.value, user.value._id, user.value._id
            )
        }

        await getTweets()
        content.value = null
    } catch (error) {
        console.log(error)
    } finally {
        //   state.loading = false
        console.log("sdcdsc");
    }
}
definePageMeta({
    middleware: ["auth"]

})
const convertTimeIntoReadableFormat = (input) => {
    // Convert month number to month name
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthName = months[input.month - 1];

    // Create a Date object with the provided values
    const date = new Date(2024, input.month - 1, input.day, input.hour, input.minute);

    // Get the day of the week
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayOfWeek = daysOfWeek[date.getDay()];

    // Get hours
    const hours = input.hour;

    // Get minutes with leading zero if necessary
    const minutes = String(date.getMinutes()).padStart(2, '0');

    // Construct the formatted string
    const formattedDate = `${dayOfWeek}, ${monthName} ${input.day}, 2024 at ${hours}:${minutes} ${input.timeFormat}`;

    return formattedDate


}
const postLike = async (tweet) => {
    // console.log("tweet",);
    const user12 = JSON.parse(JSON.stringify(user))
    console.log(user.value._id);
    try {
        await updateTweetLike(
            {
                userId: user.value._id,
                tweetId: tweet._id
            })
        await getTweets()
        content.value = null
    } catch (error) {
        console.log(error)
    } finally {
        //   state.loading = false
        console.log("sdcdsc");
    }
}
const addBookmark = async (tweet) => {
    // console.log("tweet",);
    const response = await postBookmark(
        {
            userId: user.value._id,
            tweetId: tweet._id
        })
    await getTweets()
    console.log("response", response)
    // try {
    //     await postBookmark(
    //         {
    //             userId: user.value._id,
    //             tweetId: tweet._id
    //         })
    //   
    //     content.value = null
    // } catch (error) {
    //     console.log(error)
    // } finally {
    //     //   state.loading = false
    //     console.log("sdcdsc");
}
const replyTweet1 = async (tweetId) => {
    try {
        await replyTweet(
            replay.value, tweetId
        )
        await getTweets()
        showModal.value = false
        replay.value = null
    } catch (error) {
        console.log(error)
    } finally {
        //   state.loading = false
        console.log("sdcdsc");
    }
}
const replay = ref(null)
const goTweet = async (id) => {
    return
    console.log("id", id);
    await navigateTo(`/tweet/${id}`)

}

const openCommentModal = async (tweet) => {
    currentTweet.value = tweet
    showModal.value = true
}
const clickRepost = (item) => {
    console.log(item)

}
</script>

<style lang="scss" scoped>
.tweet__container {
    display: flex;
    justify-content: star;
    min-height: 100px;
    width: 520px;
    border: 1px solid grey;
    padding: 1rem;
    margin: auto;

    &__avatar {
        width: 45px;
        display: block;

        img {
            margin: 1rem;

        }
    }

    &_footer {
        display: flex;

        &_icon {
            display: flex;
            justify-content: space-between;
            width: 100%;

            margin-top: 1rem div {
                display: flex;
            }
        }

        label {
            color: white;
        }


    }

    .cursor-pointer {
        cursor: pointer;
    }
}

.modal {
    padding: 1rem;

    &_input {
        display: flex;
        padding: 1rem 0rem;

        min-width:400px input {}

    }

    &_icon {
        width: 25px;
    }

    .grey-line {
        height: 1px;
        background-color: rgb(186, 186, 186);
    }

    &_postBtn {
        margin-top: 0.5rem;
        display: flex;
        justify-content: end;
        text-align: left;
    }
}
</style>