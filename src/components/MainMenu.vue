<template>
        <div class="col-2 MainMenuCard mx-1">
            <div class="row cardImg">
                <slot name="menuImage"></slot>
            </div>
            <div class="row mt-2">
                <p>
                    <slot name="menuName"></slot>
                </p>
            </div>
        </div>
</template>

<style scoped>
.MainMenuCard{
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
}
.cardImg{
    border: 1px solid rgb(191, 41, 236);
    border-radius: 4px;
    padding: 5px;
}
.MainMenuCard p{
    text-align: center;
    width: 80%;
    margin: 0 auto;
    line-height: 1rem;
}
@media screen and (max-width: 1031px) {

    .img{
      padding: 0px;
      width: 100px;
      height: 80px !important; 
      max-height: 80px;
      object-fit: cover;
      overflow: hidden;
  }
  }
</style>