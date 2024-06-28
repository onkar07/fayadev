<template>
    <Details>
      <template v-for="item in detailed_data" :key="item.id" v-slot:original_image>
        <img :src="item.img" alt="">
      </template>
      <template v-slot:final_menu_name>{{ detailed_data.length ? detailed_data[0].enName : '' }}</template>
      <template v-slot:final_menu_price>{{ detailed_data.length ? detailed_data[0].price : '' }} IQD</template>
    </Details>
  </template>
  
  <script setup lang="ts">
  import Details from './Details.vue';
  import { useRoute } from 'vue-router';
  import { ref, onMounted } from 'vue';
  
  const detailed_data = ref<any[]>([]);
  const route = useRoute();
  
  async function getDetailed(){
    const data = route.params;
    try {
      const response = await fetch('https://us-central1-faya-resturent.cloudfunctions.net/rest/offers/abajour');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      responseData.forEach(par => {
        if (par.id === data.data) {
          console.log("From subParent : ", par);
          detailed_data.value.push(par);
        }
      });
    } catch (err: any) {
      console.error('Fetch error:', err);
    }
  }
  
  onMounted(getDetailed); 
  </script>
  