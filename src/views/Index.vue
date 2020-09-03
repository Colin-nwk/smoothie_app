<template>
  <div class="index">
    <main class="container">
      <div class="row">
        <div class="card" v-for="smoothie in smoothies" :key="smoothie.id">
          <a class="delete" @click.prevent="deleteSmoothie(smoothie.id)">x</a>
          <div class="card-title">{{smoothie.title}}</div>

          <div class="card-body" >
            <span class="chips" v-for="(ing ,index) in smoothie.ingredients" :key="index">{{ing}}</span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import db from '@/firebase/init'
export default {
  name: 'Index',
  data () {
    return {
      smoothies: []
    }
  },
  methods: {
    deleteSmoothie (id) {
      this.smoothies = this.smoothies.filter(smoothie => {
        return smoothie.id !== id
      })
    }
  },
  created () {
    // fetch data from the firestore
    db.collection('smoothies').get().then(snapshot => {
      snapshot.forEach(doc => {
        const smoothie = doc.data()
        smoothie.id = doc.id
        this.smoothies.push(smoothie)
      })
    })
  },
  components: {}
}
</script>

<style lang="scss">
.index {
  padding-top: 20px;
  margin-top: 5rem;
  color: #1269cc;
  .row {
    display: grid;
    grid-gap: 2rem;
    grid-template-columns: repeat(3, 1fr);
  }
  .card {
    position: relative;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 2px 5px 10px #857d7d;
    transition: box-shadow 250ms ease;
    &:hover {
      box-shadow: 1px 2px 5px #857d7d;
    }
    &-title {
      padding: 20px 10px;
      text-transform: uppercase;
      font-size: 1.4rem;
    }
    &-body {
      padding: 40px 10px 10px 10px;
      display: flex;
      flex-wrap: wrap;
    }
    .chips {
      background: #dddddd;
      padding: 8px;
      border-radius: 50px;
      margin: 2px;
    }
    .delete {
      color: red;
      font-weight: bold;
      position: absolute;
      left: 250px;
      font-size: 1.4rem;
      top: 10px;
      transition: all 250ms ease;
      &:hover {
        color: #857d7d;
        transform: scale(1.2);
      }
    }
  }
}
hr {
  color: #857d7d;
  background: none;
  outline: none;
  height: 1px;
}
</style>
