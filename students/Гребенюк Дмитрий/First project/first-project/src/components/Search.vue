<template>
    <input class="search" @input="$emit('input', $event.target.value)" placeholder="Search..." id="search">
</template>

<script>
    export default {
        name: 'Search',
        props: ['search'],
    }

</script>
<style scoped>
</style>
