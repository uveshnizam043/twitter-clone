<script setup>
import { object, string } from 'yup'
import useAuth from '../composables/Auth/useAuth'
import { onMounted } from "vue";
const { login,useAuthUser,initAuth,userAuthenticated } = useAuth()

const schema = object({
  username: string().required('Required'),
  email: string().email('Invalid email').required('Required'),
  password: string()
    .min(8, 'Must be at least 8 characters')
    .required('Required')
})

const state = reactive({
  username: null,
  email: null,
  password: null,
  loading: false

})
definePageMeta({
  middleware: ["auth"]
 
})
onMounted(async()=>{
  const ssdd=await initAuth()
  if(ssdd)
  {
    return navigateTo('/index1')
  }
})

const sd=useAuthUser()
async function onSubmit1(event) {
    const {username,email,password}=event.data

 
    try {
        await login({
          username,
          email,
          password
        })
        await navigateTo('/index1')

    } catch (error) {
        console.log(error)
    } finally {
      state.loading = false
    }

}


</script>

<template>
{{ userAuthenticated() }}
Login111
  <UForm :schema="schema" :state="state" style="border: 1px solid red;" class="space-y-4 w-[50%] h-[100vh] mx-auto flex flex-col items" @submit="onSubmit1">
    <UFormGroup label="Email" name="email">
      <UInput v-model="state.email" />
    </UFormGroup>
    <UFormGroup label="Username" name="username">
      <UInput v-model="state.username" />
    </UFormGroup>

    <UFormGroup label="Password" name="password">
      <UInput v-model="state.password" type="text" />
    </UFormGroup>

    <UButton type="submit">
      Submit
    </UButton>
  </UForm>
</template>

