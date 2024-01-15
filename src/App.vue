<script setup>
import { ref } from 'vue'
import SearchBar from './components/searchBar.vue'
import climateCard from './components/climeateCard.vue'

const selectedCity = ref('');
/*cuidando do retorno do componente de pesquisa para enviar ao componente
do cartão de clima*/
const handleCidadeSelecionada = (data) => {
  selectedCity.value = data
}

</script>

<template>
  <SearchBar @cidadeSelecionada="handleCidadeSelecionada"/>
  <climateCard :selectedCity="selectedCity"/>
</template>

<style scoped>
</style>
