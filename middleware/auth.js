import useAuth from '../composables/Auth/useAuth'
export default defineNuxtRouteMiddleware((to, from) => {
  const { userAuthenticated } = useAuth()
  const sas=userAuthenticated()
  console.log("userAuthenticated",sas.value)
  if (sas.value) {
    return navigateTo('/index1')
  }
  })
