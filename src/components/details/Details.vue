<template>
    <div class="container detailPage my-3">
        <div class="row">
            <slot name="original_image"></slot>
        </div>
        <div class="row">
            <div class="text-center">
                <b><slot name="final_menu_name"></slot></b>
            </div>
            <div class="text-center">
                <b><slot name="final_menu_price"></slot></b>
            </div>
        </div>
    </div>
</template>

<style scoped>
.detailPage{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: rgb(191, 41, 236);
    font-size: 18px;
    font-weight: 400;
}
</style>