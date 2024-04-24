<template>
  <div class="text-center pa-4">
    <v-dialog v-model="model" width="600" class="p-6">
      <v-card min-width="600" class="bg-black p-14">
        <template v-slot:actions>
          <div class="schedule__modal  flex flex-col p-4">
            <div class="flex justify-end">
              <v-btn v-if="scheduleTweetTime" flat size="small" class="mb-2" variant="outlined" @click="clearScheduleTime">
                Clear
              </v-btn>
              <v-btn flat size="small" class="mb-2" variant="outlined" @click="clickScheduleTweetBtn">
                Confirm
              </v-btn>
            </div>
            <div class="flex mb-1">
              <Icon name="schedule" class="text-xs " />
              Will send on Mon, {{ months[month - 1].title }} {{ day + 1 }}, 2024 at 1:{{ minute }} PM
            </div>
            <div class="flex">
              <v-select v-model="month" style="width: 150px;" :hide-details="false" variant="outlined" density="compact"
                :items="months"></v-select>
              <v-select v-model="day" class="mx-4" style="width: 200px;" :hide-details="false" variant="outlined"
                density="compact" :items="days"></v-select>
            </div>
            <div>
              Time
          
            </div>
            <div class="flex">
              <v-select label="Hour" v-model="hour" style="width: 50px;" :hide-details="false" variant="outlined"
                density="compact" :items="hours"></v-select>
              <v-select label="Minute" v-model="minute" style="width: 50px;" :hide-details="false" variant="outlined"
                density="compact" :items="minutes" class="mx-2"></v-select>
{{ timeFormat }}
              <v-select class="mx-2" label="AM/PM" v-model="timeFormat" style="width: 50px;" :hide-details="false"
                variant="outlined" density="compact" :items="timeFormats"></v-select>

            </div>
          </div>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { date } from 'yup';
import useTweet from '../composables/useTweet.js'

const day = ref(1)
const hour = ref(1)
const minute = ref(1)
const second = ref(1)
const months = [
  { title: "January", value: 1 },
  { title: "February", value: 2 },
  { title: "March", value: 3 },
  { title: "April", value: 4 },
  { title: "May", value: 5 },
  { title: "June", value: 6 },
  { title: "July", value: 7 },
  { title: "August", value: 8 },
  { title: "September", value: 9 },
  { title: "October", value: 10 },
  { title: "November", value: 11 },
  { title: "December", value: 12 }
];
// const  props=defineProps({
//   displayModal:{
//     type:Boolean,
//     default:false
//   }
// })
const model = defineModel()
const { scheduleTweet, scheduleTweetTime } = useTweet()
const scheduleTweetTime1=scheduleTweetTime()
const clickScheduleTweetBtn = async () => {
  let hours24 = parseInt(hour.value);
  if (timeFormat.value === 'PM' && hours24 <= 12) {
    hours24 += 12;
  } else if (timeFormat.value === 'AM' && hours24 >= 12) {
    hours24 -= 12;
  }


  scheduleTweetTime1.value = {
    minute: minute.value,
    hour: hour.value,
    day: day.value,
    month: month.value,
    timeFormat:timeFormat.value
  }
 
  model.value=false
}
const timeFormats = [
  "AM",
  "PM"]
const timeFormat = ref("AM")
const hours = [
  { title: '1', value: 1 },
  { title: '2', value: 2 },
  { title: '3', value: 3 },
  { title: '4', value: 4 },
  { title: '5', value: 5 },
  { title: '6', value: 6 },
  { title: '7', value: 7 },
  { title: '8', value: 8 },
  { title: '9', value: 9 },
  { title: '10', value: 10 },
  { title: '11', value: 11 },
  { title: '12', value: 12 },
];
const minutes = [
  '01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
  '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
  '21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
  '31', '32', '33', '34', '35', '36', '37', '38', '39', '40',
  '41', '42', '43', '44', '45', '46', '47', '48', '49', '50',
  '51', '52', '53', '54', '55', '56', '57', '58', '59', '60'
]
const month = ref(4)
const days = [
  { title: '1', value: 1 },
  { title: '2', value: 2 },
  { title: '3', value: 3 },
  { title: '4', value: 4 },
  { title: '5', value: 5 },
  { title: '6', value: 6 },
  { title: '7', value: 7 },
  { title: '8', value: 8 },
  { title: '9', value: 9 },
  { title: '10', value: 10 },
  { title: '11', value: 11 },
  { title: '12', value: 12 },
  { title: '13', value: 13 },
  { title: '14', value: 14 },
  { title: '15', value: 15 },
  { title: '16', value: 16 },
  { title: '17', value: 17 },
  { title: '18', value: 18 },
  { title: '19', value: 19 },
  { title: '20', value: 20 },
  { title: '21', value: 21 },
  { title: '22', value: 22 },
  { title: '23', value: 23 },
  { title: '24', value: 24 },
  { title: '25', value: 25 },
  { title: '26', value: 26 },
  { title: '27', value: 27 },
  { title: '28', value: 28 },
  { title: '29', value: 29 },
  { title: '30', value: 30 }
]

const clearScheduleTime=()=>{
scheduleTweetTime1.value=null
}

</script>
