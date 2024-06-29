<template>
    <div class="container-fluid my-3">
        <div class="row allCards">
            <MainMenu v-for="item in parent" :key="item.id" @click="showDetails(item.id,item.enName)"
            :class="{ 'selected-menu': selectedMenuId === item.id }">
                <template #menuImage>
                  <img :src="item.img" srcset="">
                </template>
                <template #menuName>
                    {{ item.enName }}
                </template>
            </MainMenu>
        </div>
    </div>

    <div class="row" v-if="selectedChildParent && selectedChildParent.length > 0" style="--bs-gutter-x: 0px">
      <SubParentDetails :selected_children="selectedChildParent" :sub_menu_name="selectedMenu"></SubParentDetails>
    </div>

    

    <div class="row" v-else style="--bs-gutter-x: 0px">
      <div class="container text-center">
        <MenuTitle>
          <template #title_menu_name>{{selectedMenu}}</template>
        </MenuTitle>
      </div>
      <SubMenuDetails :children="selectedChild" :menu_name="selectedMenu"></SubMenuDetails>
    </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue';
import MainMenu from './MainMenu.vue';
import SubMenuDetails from './submenu/SubMenuDetails.vue';
import SubParentDetails from '../components/subParent/SubParentDetails.vue'
import MenuTitle from './submenu/MenuTitle.vue';

const data = ref(null);
const loading = ref(true);
const error = ref<string | null>(null);
const parent = ref<any[]>([]);
const selectedChild = ref<any[]>([]);
const selectedChildParent = ref<any[]>([]);
const selectedMenu = ref<string | null>(null);
const fetchData = async () => {
  try {
    const response = await fetch('https://us-central1-faya-resturent.cloudfunctions.net/rest/departments/abajour');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const responseData = await response.json();
    data.value = responseData;
    responseData.map(par => {
        
        if (par.parentID == ""){
            parent.value.push(par)
        }
    })
    parent.value.sort((a, b) => a.sortNum - b.sortNum)
    console.log("INIT ",parent.value[0])
    await showDetails(parent.value[0].id,parent.value[0].enName)
    selectedMenu.value = parent.value[0].enName
  } catch (err: any) {
    console.error('Fetch error:', err);
    error.value = err.message;
  } finally {
    loading.value = false;
    
  }
};

onMounted(fetchData);

async function getSubParent(dept_id: string){
  try {
    selectedChildParent.value = []
    const response = await fetch('https://us-central1-faya-resturent.cloudfunctions.net/rest/departments/abajour');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const responseData = await response.json();
    responseData.map(par => {
        
        if (par.parentID == dept_id){
          console.log("From subParent : ",par)
          selectedChildParent.value.push(par)
        }
    })
  } catch (err: any) {
    console.error('Fetch error:', err);
    error.value = err.message;
  }
}



async function getOffer(dept_id: string){
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
const selectedMenuId = ref<number | null>(null);
async function showDetails(menuId: string, name: string){
  getSubParent(menuId)
  selectedChild.value = await getOffer(menuId);
  selectedMenu.value = name
  selectedMenuId.value = menuId;
}

async function showDetailsForParent(menuId: string, name: string){
  // selectedChild.value = await getOffer(menuId);
  // selectedMenu.value = name
  console.log("selectedChild : ",selectedChild)
}



</script>



<style scoped>
.selected-menu {
  font-weight: 900;
  font-size: 20px;
  transition: transform 0.5s ease-in-out, font-size 0.5s ease-in-out, font-weight 0.5s ease-in-out;
  color: #BF28AC;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}
img{
    padding: 0px;
    width: 150px;
    height: 150px; 
    max-height: 150px;
    object-fit: cover;
    overflow: hidden;
}
.allCards{
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    overflow-x: scroll;
    overflow-y: hidden;
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none;
    align-items: baseline;
    width: 100%;
    font-size: 16px;
}
.allCards::-webkit-scrollbar {
    display: none;
  }
  @media screen and (max-width: 1031px) {
    img{
      padding: 0px;
      width: 100px;
      height: 80px !important; 
      max-height: 80px;
      object-fit: cover;
      overflow: hidden;
  }
  .allCards{
    font-size: 12px;
  }
  .selected-menu {
    font-weight: 900;
    font-size: 12px;
    transition: transform 0.5s ease-in-out, font-size 0.5s ease-in-out, font-weight 0.5s ease-in-out;
    color: #BF28AC;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  }
  }
</style>
