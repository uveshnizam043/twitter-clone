import useAuth from '../composables/Auth/useAuth'
export default defineNuxtRouteMiddleware(async(to, from) => {
  const { userAuthenticated ,initAuth} = useAuth()
  const userAuthenticate=userAuthenticated()
  console.log("userAuthenticate",userAuthenticate.value)
  if (!userAuthenticate.value) {
    if(!await initAuth())
    return navigateTo('/')
  }
  })
