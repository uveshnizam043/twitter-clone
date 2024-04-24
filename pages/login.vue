<script setup>
import { object, string } from 'yup'
import { ref, onMounted } from "vue";
import useAuth from '../composables/Auth/useAuth'

// import type { FormSubmitEvent } from '#ui/types'
const router = useRouter()
const { userAuthenticated,initAuth} = useAuth()
const schema = object({
  username: string().required('Required'),
  email: string().email('Invalid email').required('Required'),
  password: string()
    .min(8, 'Must be at least 8 characters')
    .required('Required')
})

// type <typeof schema>

const state = reactive({
  username: null,
  email: null,
  password: null
})


async function onSubmit (event) {
  // Do something with event.data
  const {username,email,password}=event.data
//   const { data, pending, error, refresh } = await useAsyncData(
//   'mountains',
//   () => $fetch('https://api.nuxtjs.dev/mountains')
// )
  try {
    const { data, pending, error, refresh } =   await useAsyncData("data",()=>  $fetch('http://localhost:8000/api/v1/users/register',{
      method: 'POST',
    body: {
          username,
          email,
          password
        }
  }))
  router.push({ path: "/" })


  } catch (error) {
    console.log("error",error);
    
  }
}
definePageMeta({
  middleware: ["auth"]
})
</script>

<template>

  Register122w
  <UForm :schema="schema" :state="state" style="border: 1px solid red;" class="space-y-4 w-[50%] h-[100vh] mx-auto flex flex-col items" @submit="onSubmit">
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

