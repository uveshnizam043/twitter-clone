export default () => {
    const useAuthToken = () => useState('twitter_auth_token')
    const useAuthUser = () => useState('auth_user')
    const userAuthenticated = () => useState('user_authenticated', () => false)
    const useAuthLoading = () => useState('auth_loading', () => true)
    const counter = useState('auth_user')

    const setToken = (newToken,freshToken) => {
        const userAuthenticated1=userAuthenticated()
        localStorage.setItem("twitter_auth_token",freshToken)
        userAuthenticated1.value=true
        const authToken = useAuthToken()
        authToken.value = newToken
    }

    const setUser = (newUser) => {
        const authUser = useAuthUser()
        authUser.value = newUser
    }

    const setIsAuthLoading = (value) => {
        const authLoading = useAuthLoading()
        authLoading.value = value
    }

    const login = ({ username, password, email }) => {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await $fetch('http://localhost:8000/api/v1/users/login', {
                    method: 'POST',
                    body: {
                        username,
                        email,
                        password
                    }
                })
               
                setToken(data.data.accessToken,data.data.refreshToken)
                setUser(data.data.user)

                resolve(true)
            } catch (error) {
                reject(error)
            }
        })
    }

    const initAuth = () => {
        return new Promise(async (resolve, reject) => {
            const item = localStorage.getItem("twitter_auth_token");
         console.log("localStorage item",item)
            try {
                const {data} = await $fetch('http://localhost:8000/api/v1/users/refresh-access-token', {
                    method: 'POST',
                    body: {
                        refreshToken:item,
                
                    }
                })
                console.log("data",data )
                setToken(data.accessToken,data.refreshToken)
                setUser(data.user)
            

                resolve(true)
            } catch (error) {
                reject(error)
            }
        })
    }
    return {
        login,
        useAuthUser,
        useAuthToken,
        useAuthLoading,
        userAuthenticated,
        counter,
        initAuth

    }
}