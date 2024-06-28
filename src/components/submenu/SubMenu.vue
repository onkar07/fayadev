<template>
<div class="col-10 my-2">
    <div class="row sub-menu">
        <div class="col-6 sub-details">
            <div>
                <b><slot name="subMenuTitle"></slot></b>
            </div>
            <div>
                <b><slot name="menuPrice"></slot></b>
            </div>
        </div>
        <div class="col-6 sub-img-div">
            <slot name="subMenuImage"></slot>
        </div>
    </div>
</div>
</template>

<style scoped>
.sub-menu{
    display: flex;
    flex-direction: row;
    border: 1px solid #e5e7eb;
    border-radius: 4px;
    padding: .5rem;
    color: rgb(53, 221, 222);
    font-size: 18px;
    font-weight: 700;
}
.sub-details{
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: center;
}
.sub-img-div{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 8rem;

}
</style>