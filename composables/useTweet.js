

// const token=useAuthToken()
import { ref } from "vue"
import useAuth from '../composables/Auth/useAuth'
export default () => {
    const { useAuthToken } = useAuth()
    const useTweets = () => useState('tweets')
    const scheduleTweetTime = () => useState('scheduleTweetTime')
    const showScheduleModal = ref(false)
    const showPollModal = ref(false)
    // const tweets=ref(null)

    const toggleScheduleModal = () => {
        console.log("toggleScheduleModal")
        showScheduleModal.value = !showScheduleModal.value
    }
    const togglePollTweet = () => {
        console.log("toggleScheduleModal")
        showPollModal.value = !showPollModal.value
    }
    const setTweets = (tweetsList) => {
        console.log("tweetsList", tweetsList);
        // const tweets = useTweets()
        // tweets.value = tweetsList
    }
    const postTweet = (content, user, author) => {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await $fetch('http://localhost:8000/api/v1/tweet/post-tweet', {
                    method: 'POST',
                    body: {
                        content, user, author
                    },
                    headers: {
                        Authorization: `Bearer ${useAuthToken().value}`
                    }
                })


                resolve(true)
            } catch (error) {
                reject(error)
            }
        })
    }
    const postQuoteTweet = ({ content, user, author, quoteTweetId }) => {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await $fetch('http://localhost:8000/api/v1/tweet/post-quote-tweet', {
                    method: 'POST',
                    body: {
                        content, user, author, quoteTweetId
                    },
                    headers: {
                        Authorization: `Bearer ${useAuthToken().value}`
                    }
                })


                resolve(true)
            } catch (error) {
                reject(error)
            }
        })
    }
    const getTweets = (content, user, author) => {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await $fetch('http://localhost:8000/api/v1/tweet/get-tweet', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${useAuthToken().value}`
                    }
                })
                const tweet = useTweets()
                console.log(" data.data", data.data)
                tweet.value = data.data
                //   setTweets(data.data)
                //   console.log("data.tweets",data.tweets)
                resolve(true)
            } catch (error) {
                reject(error)
            }
        })
    }
    const getTweet = (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await $fetch(`http://localhost:8000/api/v1/tweet/tweet/${id}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${useAuthToken().value}`
                    }
                })
                resolve(data)
            } catch (error) {
                reject(error)
            }
        })
    }
    const updateTweetLike = (tweetId, userId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await $fetch('http://localhost:8000/api/v1/tweet/update-tweet', {
                    method: 'POSt',
                    body: {
                        userId, tweetId
                    },
                    headers: {
                        Authorization: `Bearer ${useAuthToken().value}`
                    },
                })
                console.log("data", data)
                //   setTweets(data.data)
                //   console.log("data.tweets",data.tweets)
                resolve(true)
            } catch (error) {
                reject(error)
            }
        })
    }
    const replyTweet = ({ replay, tweetId }) => {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await $fetch('http://localhost:8000/api/v1/tweet/reply-tweet', {
                    method: 'POSt',
                    body: {
                        content: replay,
                        parentTweetId: tweetId,
                    },
                    headers: {
                        Authorization: `Bearer ${useAuthToken().value}`
                    },
                })
                // const tweet = useTweets()
                // tweet.value = data.data
                // //   setTweets(data.data)
                console.log("data.tweets", data)
                resolve(true)
            } catch (error) {
                reject(error)
            }
        })
    }
    const getBookmark = async (content, userId) => {
        try {
            const data = await $fetch(`http://localhost:8000/api/v1/tweet/get-bookmark`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${useAuthToken().value}`
                }
            })
            console.log("get Bookmark", data)
        } catch (error) {
            console.log("get bookmark error", error);
        }
    }
    const postBookmark = async ({ tweetId, userId }) => {

        try {
            const data = await $fetch('http://localhost:8000/api/v1/tweet/add-bookmark', {
                method: 'POST',
                body: {
                    tweetId, userId
                },
                headers: {
                    Authorization: `Bearer ${useAuthToken().value}`
                }
            })


        } catch (error) {
            console.log("add bookmark", error)
        }
    }
    const repostTweet = async ({ content, author, user }) => {
        try {
            const data = await $fetch('http://localhost:8000/api/v1/tweet/re-post', {
                method: 'POST',
                body: {
                    content, author, user
                },
                headers: {
                    Authorization: `Bearer ${useAuthToken().value}`
                }
            })


        } catch (error) {
            console.log("add bookmark", error)

        }
    }

    const scheduleTweet = async ({ minute, hour, day, month, content, author, user }) => {

        try {
            const data = await $fetch('http://localhost:8000/api/v1/tweet/post-schedule-tweet', {
                method: 'POST',
                body: {
                    minute, hour, day, month, content, author, user
                },
                headers: {
                    Authorization: `Bearer ${useAuthToken().value}`
                }
            })
            console.log("data", data)

        } catch (error) {
            console.log("add bookmark", error)
        }
    }
    const postsPollTweet = async ({question, choices, user}) => {
        console.log("question, choices, user",question, choices, user)
        try {
            const data = await $fetch('http://localhost:8000/api/v1/tweet/post-poll-tweet', {
                method: 'POST',
                body: {
                    question, choices, user
                },
                headers: {
                    Authorization: `Bearer ${useAuthToken().value}`
                }
            })
            console.log("data", data)

        } catch (error) {
            console.log("add bookmark", error)
        }
    }
    return {
        postTweet, getTweets, useTweets, updateTweetLike, replyTweet, getTweet, postBookmark, getBookmark, repostTweet, postQuoteTweet, scheduleTweet,
        scheduleTweetTime, showScheduleModal, toggleScheduleModal, showPollModal, togglePollTweet,postsPollTweet

    }
}