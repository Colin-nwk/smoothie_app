<template>
  <div v-if="smoothie" class="edit-smoothie container">
    <h2>Edit <span>
        {{smoothie.title}}
      </span> Smoothie</h2>
    <form @submit.prevent="editSmoothie">
      <div class="row">
        <div>
          <label for='title' class="label">Smoothie Title:</label>
        </div>
        <div>
          <input type='text' name='title' v-model='smoothie.title' class="input" placeholder="title" />
        </div>

        <div v-for="(ing, index) in  smoothie.ingredients" :key="index">
          <label for="added-ingredient" class="label">
            ingredient:</label>
          <input type="text" name="added-ingredient" v-model="smoothie.ingredients[index]" class="input">
          <i class="delete" @click="deleteIng(ing)">x</i>
        </div>
        <div>
          <label for="add-ingredient" class="label">Smoothie ingredients</label>
        </div>
        <div>
          <input type='text' name="add-ingredient" placeholder="ingredients" class="input" @keydown.tab.prevent="addIng" v-model="another" />
        </div>
        <p v-if="feedback" class="alert">{{feedback}}</p>
        <button class="btn">Update smoothie</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from 'slugify'
export default {
  name: "EditSmoothie",
  data() {
    return {
      smoothie: null,
      another: null,
      feedback: null
    };
  },

  methods: {
    editSmoothie() {
      if (this.smoothie.title) {
        this.feedback = null;
        //create a slug
        this.smoothie.slug = slugify(this.smoothie.title, {
          replacement: "-",
          remove: /[$*_+~.()#'"!\-:@]/g,
          lower: true
        });
        db.collection("smoothies").doc(this.smoothie.id)
          .update({
            title: this.smoothie.title,
            ingredients: this.smoothie.ingredients,
            slug: this.smoothie.slug
          })
          .then(() => {
            this.$router.push({ name: "Index" });
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.feedback = "You must enter a title";
      }
    },
    addIng() {
      if (this.another) {
        this.smoothie.ingredients.push(this.another);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = "You must enter value to add ingredients";
      }
    },
    deleteIng(ing) {
      this.smoothie.ingredients = this.smoothie.ingredients.filter(
        ingredient => {
          return ingredient !== ing;
        }
      );
    }
  },
   created() {
    let ref = db
      .collection("smoothies")
      .where("slug", "==", this.$route.params.smoothie_slug);
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.smoothie = doc.data();
        this.smoothie.id = doc.id;
      });
    });
  }
};
</script>
<style lang="scss">
span {
  color: rgb(96, 96, 233);
  text-transform: uppercase;
}
.edit-smoothie {
  margin-top: 6rem;
  color: #857d7d;
  box-sizing: border-box;
  h2 {
    font-size: 2.8rem;
    // color: #1269cc;
    text-transform: uppercase;
  }
  form {
    margin-top: 1.5rem;
    font-size: 1.4rem;
    width: 500px;
    margin: 1rem auto;
    div {
      margin-top: 1rem;
    }
    .label {
      font-size: 0.8rem;
      align-self: flex-start;
    }
    .row {
      margin-top: 2rem;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
    }
    .input {
      margin-top: 1rem;
      outline: none;
      border: none;
      padding: 1rem 1rem 0 0;
      border-bottom: 1px solid #1269cc;
      width: 480px;
      font-size: 1.4rem;
      transition: border-bottom 250ms linear;
      &:focus,
      &:active {
        border-bottom: 2px solid green;
      }
    }
    .delete {
      color: red;
      cursor: pointer;
      font-size: 1rem;
    }
  }
  .btn {
    align-self: center;
    padding: 1rem;
    font-size: 1.4rem;
    border: none;
    outline: none;
    margin-top: 3rem;
    border-radius: 50px;
    color: #fff;
    background: #1269cc;
    cursor: pointer;
    box-shadow: 2px 3px 5px #857d7d;
    transition: all 250ms ease;
    &:hover {
      background: #3bce3b;
    }
    &:active,
    &:focus {
      background: #065e06;
      box-shadow: 1px 1px 2px #857d7d;
    }
  }
  .alert {
    padding: 0.5rem;
    color: #e65151;
    font-size: 1.4rem;
    margin-top: 10px;
    align-self: center;
  }
}
</style>
