<script setup>
import { reactive, ref, onMounted } from 'vue';

const emit = defineEmits(["cidadeSelecionada"]);

const city = reactive({
  search: ''
});

const error = ref(null);

/**
 * com a localização (digitada ou atual do usuário) é feito um fetch,
 * pela API do Open Weather Map, com as informações do clima local da região.
 * Em caso de erro o error.value é atualizado e, em caso de acerto, os dados
 * são enviados para App.vue
 * @param {GeolocationPosition object} location           
 *. objeto retornado do método geolocation que contêm a latitude e longitude
 *  da cidade atual do usuário, se chamado como null será utilizado "city"
 *  para a busca na API.
 */
async function fetchData(location = null) {
  let apiUrl;
  //caso location não seja null ela será utilizada, do contrário é feito a busca pela cidade
  if (location) {
    apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${location.latitude}&lon=${location.longitude}&appid=${import.meta.env.VITE_API_APIKEY}`;
  } else {
    apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city.search}&appid=${import.meta.env.VITE_API_APIKEY}`;
  }

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    //verificação do código de erro se a cidade não é encontrada 
    if (data.cod == 404) {
      error.value = "Cidade não encontrada. Por favor, insira um nome de cidade válido.";
    } else {
      error.value = null;
      emit('cidadeSelecionada', data);
    }
  } catch (err) {
    console.error('Erro ao obter dados do clima:', err);
    error.value = 'Erro ao obter dados do clima. Tente novamente mais tarde.';
  }
}

// fetch da posição geográfica do usuário
async function getCurrentLocation() {
  try {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    fetchData({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  } catch (err) {
    console.error('Erro ao obter a localização atual:', err);
    error.value = 'Erro ao obter a localização atual. Certifique-se de permitir o acesso à geolocalização.';
  }
}

const handleSubmit = () => {
  fetchData();
};
//função rodada ao inicializar a página (para pegar a localização do usuário)
onMounted(() => {
  getCurrentLocation();
});

</script>


<template>
    <form class="searchBar" @submit.prevent>
        <input type="text" class="searchTerm" placeholder="Insira o nome da cidade" v-model="city.search" @input="handleSubmit">
        <button type="button" class="searchButton" @click="handleSubmit">
            <fa icon="magnifying-glass-location" />
        </button>
    </form>
    <p class="error" v-if="error">{{ error }}</p>
</template>

<style scoped>
.searchBar {
  margin: auto;
  width: 400px;
  padding: 10px;
  position: relative;
  display: flex;
}

.error {
  color: red;
  text-align: center;
}
.searchTerm {
  width: 100%;
  border: 3px solid gray;
  border-right: none;
  padding: 5px;
  height: 20px;
  border-radius: 5px 0 0 5px;
  outline: none;
  color: #9DBFAF;
}

.searchTerm:focus{
  color: gray;
}

.searchButton {
  width: 40px;
  height: 35px;
  border: 1px solid gray;
  background: gray;
  text-align: center;
  color: #fff;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  font-size: 20px;
}

</style>
