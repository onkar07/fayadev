<template>
    
    <div class="container my-2">
        <div class="row allsubParCards" style="--bs-gutter-x: 0px">
            <SubParent v-for="item in selected_children" :key="item.id" @click="showDetails(item.id,item.enName)">
                <template #subMenuImage>
                  <img :src="item.img" srcset="">
                </template>
                <template #subMenuName>
                    {{ item.enName }}
                </template>
            </SubParent>
        </div>
    </div>
    <MenuTitle>
        <template #title_menu_name>{{selectedMenuParent}}</template>
    </MenuTitle>
    <div class="row">
        <SubMenuDetails :children="selectedChildParent" :menu_name="selectedMenuParent"></SubMenuDetails>
    </div>
</template>

<script setup lang="ts">
import { PropType, ref, watchEffect } from 'vue';
import SubParent from './SubParent.vue'
import SubMenuDetails from '../submenu/SubMenuDetails.vue';
import MenuTitle from '../submenu/MenuTitle.vue';

const selectedChildParent = ref<any[]>([]);
const selectedMenuParent = ref<string | null>(null);



const props = defineProps({
    selected_children: {
    type: Array as PropType<any[]>,
    required: true,
  },
  sub_menu_name: {
    type: String,
    required: true,
  }
});
watchEffect(() => {
    console.log("Updated selectedChildParent: ", props.selected_children);
});

async function getOfferPar(dept_id: string){
  const resp_data = ref(null);
  const child_data = ref<any[]>([])
  try {
    const response = await fetch('https://us-central1-faya-resturent.cloudfunctions.net/rest/offers/abajour');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const responseData = await response.json();
    child_data.value = responseData.filter(item => item.departmentID === dept_id);
    console.log("value", child_data);
    child_data.value.sort((a, b) => b.sortNum - a.sortNum);
    return child_data.value
  } catch (err: any) {
    console.error('Fetch error:', err);
  }
}

async function showDetails(menuId: string, name: string){
  selectedChildParent.value = await getOfferPar(menuId)
  console.log("selectedChild : ",selectedChildParent, name)
  selectedMenuParent.value = name
}

</script>

<style scoped>
.allsubParCards{
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    flex-wrap: nowrap;
    overflow-x: scroll;
    overflow-y: hidden;
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none;
}
.allsubParCards::-webkit-scrollbar {
    display: none;
  }
.allsubParCards img{
    padding: 0px;
    width: 100px;
    height: auto; 
    max-height: 100px;
    object-fit: cover;
    overflow: hidden;
}
@media screen and (max-width: 1031px) {
    .allsubParCards{
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        flex-wrap: nowrap;
        overflow-x: scroll;
    }
    .allsubParCards img{
      padding: 0px;
      width: 80px;
      height: 80%;  
      max-height: auto;
      object-fit: cover;
      overflow: hidden;
  }
  }

</style>