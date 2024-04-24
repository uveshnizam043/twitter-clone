<template>
 <div>
   <div class="repost" v-if="tweet.isTweetRepost">
        <Icon name="retweet" class="mr-1 text-xs w-1 h-1" size="20" color="grey"/>
           <template v-if="tweet.user.__id===tweet.author._id"> You repost</template>
           <template v-else>{{tweet.user.username}} repost</template>
        </div>
        <div class="flex" v-if="tweet?.quoteTweetInfo">
                <!-- {{      tweet?.quoteTweetInfo }}     -->
                <div style="display: flex;align-items: start;">
            <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" alt="Avatar" />
        </div>
    
            <div class="tweet__info">
                <span class="tweet__name">{{ tweet?.quoteTweetInfo.author.username }}</span>
                <span class="tweet__username">{{extractUsername(tweet?.quoteTweetInfo.author.email)}}</span>
                <span class="tweet__time">{{ timeAgo(tweetTime) }}</span>
                <div class="tweet__content">
                    {{  tweet?.quoteTweetInfo.content }}
                </div>
            </div>
            </div>
    <div  :class="[tweet?.quoteTweetInfo ? 'pl-16 border-2 w-[500px]' : 'border-gray-300', tweet?.quoteTweetInfo ? 'w-[500px]' : 'w-[600]']" class="tweet" >
        
        <div style="display: flex;align-items: start;">
            <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" alt="Avatar" />
        </div>
        <div>
    
            <div class="tweet__info">
                <span class="tweet__name">{{ tweet.author.username }}</span>
                <span class="tweet__username">{{extractUsername(tweet.author.email)}}</span>
                <span class="tweet__time">{{ timeAgo(tweetTime) }}</span>
                <div class="tweet__content">
                    {{  tweet.content }}
                </div>
            </div>
          
            <div class="tweet_footer">
                <div class="tweet_footer_icon cursor-pointer  ">
                    <div class="flex items-center" @click="showModal = true">
                        <Icon name="chat" />
                        <span class="pl-1"> {{ tweetReplies.length }}</span>
                    </div>
                    <div class="flex items-center" @click="likeTweet(tweet)">
                        <Icon name="favorite" />
                        <span class="pl-1">{{ tweetLikes.length }}</span>
                    </div>
                    <div target="_blank" class="flex items-center">
                        <Icon name="bookmark" class="text-2xl" />
                        {{ bookmarkTweet.length }}
                        <!-- <span class="pl-1">{{ tweet?.bookmark.length }}</span> -->

                    </div>
                    <div class="flex items-center">

                        <v-menu>
                            <template v-slot:activator="{ props }">

                                <div class="flex items-center" v-bind="props">
                                    <Icon name="retweet" />
                                    <span class="pl-1">{{ retweetTweet.length }}</span>
                                </div>
                            </template>
                            <v-list density="compact">
                                <v-list-item @click="clickRepost('repost',tweet)">
                                    <div class="flex items-center">
                                        <Icon name="retweet" class="mr-1" />
                                        <span class="block ">Repost</span>
                                    </div>

                                </v-list-item>
                                <v-list-item @click="clickRepost('quote')">
                                    <div class="flex items-center">
                                        <div class="flex items-center">
                                            <Icon name="pencil" class="text-xl mr-1" />
                                            Quote
                                        </div>
                                    </div>

                                </v-list-item>
                            </v-list>
                        </v-menu>

                    </div>
                </div>
            </div>
        </div>
    </div>
 </div>
    <modal v-model="showModal" style="border-radius: 1rem;">
        <div class="modal bg-black">
            <Icon name="close" class="modal_icon text-2xl cursor-pointer" @click="showModal = false" />
            <div class="flex justify-start align-start">
                <UserAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" alt="Avatar" />
                <div class="my-0 pl-4">
                    <label for="" class="font-bolder pr-1">True Story</label>
                    <label for="" class="font-medium text-gray-400">@{{ tweet.user.username }}</label>
                    <div>
                        {{ tweet.content }}
                    </div>
                    <div class="text-gray-400">
                        Replying to <span class="text-blue-600">
                            @{{ tweet.user.username }}
                        </span>
                        <div />
                    </div>


                </div>
                <!-- {{ tweet }} -->
            </div>
            <div class="modal_input mt-4">
                <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" alt="Avatar" />
                <UTextarea style="border: 1px solid red;" v-model="replay" color="primary" variant="none"
                    placeholder="What is happening?!1" />
            </div>
            <div class="grey-line"></div>
            <div class="modal_postBtn">
                <UButton :disabled="!replay" size="lg" color="blue" variant="solid" @click="replyTweet1(tweet)">
                    Reply</UButton>
            </div>
        </div>
    </modal>
    <modal v-model="showRepostQuoteModal" style="border-radius: 1rem;">
        <div class="modal bg-black">
            <Icon name="close" class="modal_icon text-2xl cursor-pointer" @click="showRepostQuoteModal = false" />
            <div class="modal_input mt-4" style="padding: 0!important;">
                <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" alt="Avatar" />
                <UTextarea style="border: 1px solid red ;" v-model="quoteTweetText" color="primary" variant="none"
                    placeholder="What is happening?!2" />
            </div>
            <div class="border-2 border-gray-300 flex justify-start align-start  ml-16 p-3 rounded-lg">
                <UserAvatar username="Mohd Uvesh" />
                <div class="my-0 pl-4">
                    <label for="" class="font-bolder pr-1">True Story</label>
                    <label for="" class="font-medium text-gray-400">@{{ tweet.user.username }}</label>
                    <div>
                        {{ tweet.content }}
                    </div>
                    <!-- <div class="text-gray-400">
                        Replying to <span class="text-blue-600">
                            @{{ tweet.user.username }}
                        </span>
                        <div /> -->
                    <!-- </div> -->


                </div>
                <!-- {{ tweet }} -->
            </div>
           
            <!-- <div class="grey-line"></div> -->
            <div class="modal_postBtn">
                <UButton :disabled="!quoteTweetText" size="lg" color="blue" variant="solid" @click="quoteTweet(tweet)">
                    Post</UButton>
            </div>
        </div>
    </modal>
</template>
<script setup>

//vendor
import useTweet from '../composables/useTweet.js'
import useAuth from '../composables/Auth/useAuth.js'
const { postTweet, getTweets, useTweets, updateTweetLike, replyTweet, postBookmark,repostTweet,postQuoteTweet } = useTweet()
const { login, useAuthUser, userAuthenticated } = useAuth()
//state
const user = useAuthUser()
const showModal = ref(false)
const showRepostQuoteModal= ref(false)
const quoteTweetText= ref(null)
const replay = ref(null)
//props
const props = defineProps({
    tweet: {
        type: Object,
        default: () => { },
    },
    name: {
        type: String,
        default: null,
    },
    username: {
        type: String,
        default: null,
    },
    tweetTime: {
        type: String,
        default: null,
    },
    tweetContent: {
        type: String,
        default: null,
    },
    tweetReplies: {
        type: Array,
        default: () => [],
    },
    tweetLikes: {
        type: Array,
        default: () => [],
    },
    bookmarkTweet: {
        type: Number,
        default: 0,
    },
    retweetTweet: {
        type: Number,
        default: 0,
    },
    repostTweet: {
        type: Number,
        default: 0,
    },
});


//methods
const clickRepost = async(repostType,tweet) => {
    if(repostType!=="quote")
   {
       await repostTweet({  content:tweet.content, author:tweet.user._id, user:user.value._id })
    } else{
        showRepostQuoteModal.value=true
    }
}

const likeTweet = async (tweet) => {
    await updateTweetLike(
        {
            userId: user.value._id,
            tweetId: tweet._id
        })
    await getTweets()
}
const replyTweet1 = async (tweet) => {
    await replyTweet(
     { replay:  replay.value, tweetId:tweet._id}
    )
    await getTweets()
    showModal.value = false
    replay.value = null
}
const quoteTweet = async (tweet) => {

        await postQuoteTweet(
            {content:quoteTweetText.value, author:user.value._id, user:user.value._id,quoteTweetId:tweet._id}
        )
        await getTweets()
        content.value = null
 
}
function timeAgo(timestamp) {
    const currentDate = new Date();
    const pastDate = new Date(timestamp);
    const timeDifference = currentDate - pastDate;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
        return days + "d";
    } else if (hours > 0) {
        return hours + "h";
    } else if (minutes > 0) {
        return minutes + "min";
    } else {
        return "Just now";
    }
}

function extractUsername(email) {
    // Split the email address at the "@" symbol
    const parts = email.split("@");
    // Return the part before the "@" symbol
    return parts[0];
}
</script>

<style lang="scss" scoped>
.tweet {
    display: flex;
    align-items: start;
    padding-left: 1rem;
 

    &__info {
        padding-left: 0.5rem;
        /* Adjusted padding for separation */

        /* Applied gray color to all info spans */
    }

    &__content {
        margin: 10px 0;
    }

    &_footer {
        display: flex;
        width: 100%;

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

    &__name {
        color: gray;
        font-weight: bold;
        cursor: pointer;
   
        /* Moved cursor pointer to name span */

        &:hover {
            text-decoration: underline;
        }
    }

    &__username {
        color: gray;
        padding-left: 5px;
    padding-right: 5px;
    }

    &__time {
        color: gray;


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
.repost{
    display: flex;
    margin-left: 3.5rem;
        color:gray;
    font-size: 0.8rem;

}
</style>
