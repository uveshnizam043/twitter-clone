<script setup>

const showModal = defineModel()

</script>

<template>
    <div>
        <UModal :preventClose="true" v-model="showModal" :ui="{ padding: 'p-4', background: 'bg-white dark:bg-gray-900' }
            ">
      <slot></slot>

        </UModal>
    </div>
</template>

<style lang="scss" scoped>
.modal {
    display: flex;
    padding: 1rem;
    &_icon{
        width: 25px;
    }
}
</style>