<template>
    <div>
        <div style="display: flex;margin-top: 2rem;">
            <div class="menu">
                <Icon name="logo" class="text-4xl" />
            <div class="menu_icon">
                <Icon name="home" class="text-2xl" />
            </div>
            <div class="menu_icon">
                <Icon name="bell" class="text-2xl" />
            </div>

            <div class="menu_icon">
                <icon name="message" class="text-2xl" />
            </div>
            <div class="menu_icon">
                <Icon name="search" class="text-2xl" />
            </div>
            <NuxtLink  to="/bookmark" class="menu_icon">
                <Icon name="bookmark" class="text-2xl" />
                Bookmark

            </NuxtLink>
            <UButton @click="showModal = !showModal"  class="menu_post" size="xl" color="blue"
                variant="solid">Post</UButton>

               
        </div>
            <Home/>
        </div>
        
        <modal v-model="showModal">
            <div class="modal">
                <Icon name="close" class="modal_icon text-2xl cursor-pointer" @click="showModal = false" />
                <div class="modal_input">
                    <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" alt="Avatar" />
                    <UTextarea style="border: 1px solid red;" v-model="value" color="primary" variant="none"
                        placeholder="What is happening?!3" />
                </div>
                <div class="grey-line"></div>
                <div class="modal_postBtn">
                    <UButton padded="false" class="" size="lg" color="blue" variant="solid">Post</UButton>
                </div>


              
            </div>
        </modal>

    </div>
</template>

<script setup>

const showModal = ref(false)

</script>
<style lang="scss" scoped>
.menu {
    
width: 180px;
    &_icon {
        margin-bottom: 1rem;
        display: flex
    }

    &_post {
        margin-top: 2rem;
    }
}

.modal {
    padding: 1rem;
border-radius: 1rem;
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