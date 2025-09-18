<template>
    <div  class="mx-4">
        <div class="spinner-container">
            <div class="spinner"></div>
        </div>
    </div>
</template>
<script setup lang="ts">

</script>
<style>
.spinner-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.spinner {
    border: 2px solid #f3f3f3;
    border-top: 1px solid #F37021;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 0.4s linear infinite;
}

[data-width="12"] {
    border: 1px solid #f3f3f3;
    border-top: 0.5px solid #f3f3f3;
    border-radius: 50%;
    width: 12px;
    height: 12px;
    animation: spin 0.4s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>