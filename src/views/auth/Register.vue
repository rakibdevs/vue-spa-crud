<template>
    <div class="row">
        <div class="col-sm-7 background-auth">
            
        </div>
        <div class="col-sm-5">
            <div class="auth_card">
                <h4>Register</h4>
                <div class="alert alert-danger" v-if="error && !success">
                    <p>There was an error, unable to complete registration.</p>
                </div>
                <div class="alert alert-success" v-if="success">
                    <p>Registration completed. You can now <router-link :to="{name:'login'}">sign in.</router-link></p>
                </div>
                <form autocomplete="off" @submit.prevent="register" v-if="!success" method="post">
                    <div class="form-group" v-bind:class="{ 'has-error': error && errors.name }">
                        <label for="name">Name</label>
                        <input type="text" id="name" class="form-control" v-model="name" required>
                        <span class="help-block" v-if="error && errors.name">{{ errors.name }}</span>
                    </div>
                    <div class="form-group" v-bind:class="{ 'has-error': error && errors.email }">
                        <label for="email">E-mail</label>
                        <input type="email" id="email" class="form-control" placeholder="user@example.com" v-model="email" required>
                        <span class="help-block" v-if="error && errors.email">{{ errors.email }}</span>
                    </div>
                    <div class="form-group" v-bind:class="{ 'has-error': error && errors.password }">
                        <label for="password">Password</label>
                        <input type="password" id="password" class="form-control" v-model="password" required>
                        <span class="help-block" v-if="error && errors.password">{{ errors.password }}</span>
                    </div>
                    <button type="submit" class="btn btn-default">Submit</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    data(){
      return {
        name : "",
        email : "",
        password : "",
        password_confirmation : ""
      }
    },
    methods: {
      register: function () {
        let data = {
          name: this.name,
          email: this.email,
          password: this.password,
          is_admin: this.is_admin
        }
        this.$store.dispatch('register', data)
       .then(() => this.$router.push('/'))
       .catch(err => console.log(err))
    }
  }
}
</script>