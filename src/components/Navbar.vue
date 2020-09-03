<template>
  <nav class="navbar">
    <div class="container">
      <div class="row">
        <a href class="navbar-brand">ninja smoothie</a>
        <a href class="add">
          <router-link to>+</router-link>
        </a>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  name: 'Navbar',
  data () {
    return {}
  },
  components: {}
}
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.container {
  width: 900px;
  margin: 0 auto;
  text-align: center;
  font-size: 1rem;
  font-family: 'Noto Sans JP', sans-serif;
}
a{
  color: #fff;
  text-decoration: none;
}
.navbar {
  padding: 10px 0;
  color: #fff;
  background: #1269cc;
  text-transform: uppercase;
  // height: 70px;
  &-brand{
    font-size: 2.2rem;
  }
  .row{
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;

    .add{
      position: absolute;
      top: 41px;
      right: 20px;
      display: inline-block;
      font-weight: 900;
      padding: 10px 15px;
      background: #d60707;
      border-radius: 50%;
      border: none;
      cursor: pointer;
      transition: background 250ms ease;
      outline: none;
      box-shadow: 1px 1px 3px #8f1212;
      &:hover{
        background: #c40808;

      }
    }
  }
}
</style>
