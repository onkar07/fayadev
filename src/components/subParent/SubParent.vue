<template>
    <div class="Sub-MainMenuCard mx-1">
        <div class="row sub-cardImg" style="--bs-gutter-x: 0px">
            <slot name="subMenuImage"></slot>
        </div>
        <div class="row mt-2" style="--bs-gutter-x: 0px">
            <p>
                <slot name="subMenuName"></slot>
            </p>
        </div>
    </div>
</template>

<style scoped>
.Sub-MainMenuCard{
display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-start;
width: min-content;
}
.sub-cardImg{
border: 1px solid rgb(191, 41, 236);
border-radius: 4px;
padding: 5px;
width: 100px;
height: 100px; 
max-height: auto;
}
.Sub-MainMenuCard p{
text-align: center;
width: 80%;
margin: 0 auto;
line-height: 1rem;
}
@media screen and (max-width: 1031px) {
    .sub-cardImg{
      padding: 0px;
      width: 80px;
      height: 80%; 
      max-height: auto;
  }

  }
</style>