<script setup>
const { props } = defineProps(['selectedCity']);

/**
 * Conforme o retorno da API de clima, essa função
 * analisa, dentro dos ícones gratuitos do font awesome,
 * qual é o ícone melhor equivalente ao clima do local.
 * @param {string} wheather           
 *. string referente ao campo do clima do open weather API
 * @return {string} fa_icon 
 *  retorna a string com nome do clima equivalente ao ícone do fa
 */
const getWeatherIcon = (weather) => {
  if (weather === 'broken clouds' || weather === 'overcast clouds') {
    return 'cloud';
  } else if (weather === 'thunderstorm' || weather === 'thunderstorm with light rain') {
    return 'thunderstorm';
  } else if (weather === 'light rain' || weather === 'moderate rain') {
    return 'cloud-rain';
  } else if (weather === 'clear sky') {
    return 'sun';
  } else if (weather === 'scattered clouds' || weather === 'few clouds' ) {
    return 'cloud-sun';
  } else if (weather === 'mist') {
    return 'smog';
  } else if (weather === 'light snow' || weather === 'snow') {
    return 'snowflake';
  } else {
    // Adicione mais lógica conforme necessário para outros tipos de clima
    return 'question'; // Ícone padrão para outros casos
  }
};


</script>


<template>
  <div v-if="selectedCity != null && selectedCity.cod == 200" class="climateCard">


    <div class="column1">
      <h2>{{ selectedCity.name}}</h2>
      <div class="stat-climate">
        <fa :icon="getWeatherIcon(selectedCity.weather[0].description)" size="5x"/>
        <b>{{ selectedCity.weather[0].description}}</b>
      </div>
    </div>
    <div class="column3"></div>
    <div class="column2">
      <div class="stat">
        <fa icon="temperature-three-quarters" size="2x"/>
        <p>{{ selectedCity.main.temp}}°C</p>
      </div>
      <div class="stat">
        <fa icon="water" size="2x"/>
        <p>{{selectedCity.main.humidity}}%</p>
      </div>
      <div class="stat">
        <fa icon="wind" size="2x"/>
        <p>{{ selectedCity.wind.speed }}km/h</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .climateCard {
    width: 380px;
    border-radius: 10px;
    background-color: gray;
    margin: auto;
    padding: 0px 10px 10px 10px;
    display: flex;
    flex-wrap: wrap;
    flex: 1;
  }
  .stat {
    display: flex;
    align-items: center;
    padding-left: 30px;
    padding-top: 10px;
  }

  .stat-climate {
    display: flex;
    align-items: center;
    padding-left: 20px;
  }

  .stat-climate b {
    margin-left: auto;
    padding-right: 30px;
    padding-left: 5px;
  }


  .stat p {
    margin-left: auto;
    padding-left: 10px;
  }
  .column1 {
    width: 55%;
  }

  .column3 {
    background-color: black;
    margin-top: 5%;
    width: 2px;
  }
  .column1, .column2 {
    flex-direction: column;
  }
</style>
