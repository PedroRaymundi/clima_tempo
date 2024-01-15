import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

//import de todos os ícones do fontawesome que serão usados na aplição
import { library } from '@fortawesome/fontawesome-svg-core'
import { 
    faMagnifyingGlassLocation, faWind, faTemperatureThreeQuarters, 
    faWater, faCloudRain, faSun, faQuestion, faCloud, faCloudSun, faSmog,
    faSnowflake, faThunderstorm
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faMagnifyingGlassLocation, faWind, faTemperatureThreeQuarters, 
    faWater, faCloudRain, faSun, faQuestion, faCloud, faCloudSun, faSmog, 
    faSnowflake, faThunderstorm);

createApp(App).component('fa', FontAwesomeIcon).mount('#app')
