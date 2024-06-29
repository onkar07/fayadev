<template>

    <div class="container subMenuDetails">
        <SubMenu v-for="child in children" :key="child.id" @click="goToDetails(child)">
            <template #subMenuTitle>
                {{child.enName}}
            </template>
            <template #menuPrice>
                {{child.price}} IQD
            </template>
            <template #subMenuImage>
                <img :src="child.img" srcset="">
            </template>
        </SubMenu>
    </div>
</template>

<script setup lang="ts">
import { PropType, ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import SubMenu from './SubMenu.vue';
import MenuTitle from './MenuTitle.vue';
const router = useRouter();
const props = defineProps({
  children: {
    type: Array as PropType<any[]>,
    required: true,
  },
  menu_name: {
    type: String,
    required: true,
  },
});
// watchEffect(() => {
//     console.log("Updated children: ", props.children, props.menu_name);
// });

function goToDetails(childData) {
  router.push({ name: 'details',  params: { data: childData.id }  });
}

</script>

<style scoped>
.subMenuDetails{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}
.subMenuDetails img{
    width: auto;
    object-fit: cover;
    width: 100px;
    height: 100px !important;
    height: -webkit-fill-available;
    box-shadow: 2px 2px 10px #0b0b0b27;
    border-radius: 5px;
    overflow: hidden;
    transition: transform 0.5s ease-in-out;
}
img:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* Example shadow */
  }
@media only screen and (max-width: 767px) {
    img{
      padding: 0px;
      width: 100px;
      height: 100px; 
      max-height: 150px;
      object-fit: cover;
      overflow: hidden;
  }
}
</style>

<!-- height: 20%; 
max-height: 20%; -->