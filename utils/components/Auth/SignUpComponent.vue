<template>
  <form id="login-form" method="post" role="form" @submit.prevent="registeruser">
    <!--Social Login-->
    <SocialLogin />
    <!--Social Login-->
    <h2>
      <span>{{ $t('signup.or') }}</span>
    </h2>
    <div class="form-group">
      <input
        id="firstname"
        v-model="register.first_name"
        name="firstname"
        tabindex="2"
        class="form-control signupfeilds"
        :placeholder="$t('signup.first_name')"
      />
    </div>
    <div class="form-group">
      <input
        id="lastname"
        v-model="register.last_name"
        name="lastname"
        tabindex="2"
        class="form-control signupfeilds"
        :placeholder="$t('signup.last_name')"
      />
    </div>
    <div class="form-group">
      <input
        id="username"
        v-model="register.username"
        name="username"
        tabindex="2"
        class="form-control signupfeilds border-red"
        :placeholder="$t('signup.user_name')"
        @change="onChange($event)"
      />
      <p class="feildtxt" >{{ checkingUsername }}</p>
    </div>
    <div class="form-group">
      <input
        id="email"
        v-model="register.email"
        name="email"
        tabindex="2"
        class="form-control signupfeilds"
        :placeholder="$t('signup.email_address')"
      />
    </div>
    <div class="form-group">
      <div id="show_hide_password" class="input-group">
        <input
          v-model="register.password"
          class="form-control signupfeilds"
          :placeholder="$t('signup.password')"
          :type="[showPassword ? 'text' : 'password']"
        />
        <div class="input-group-addon">
          <NuxtLink to="#" class="show-password">
            <span  @click="showPassword = !showPassword"><i class="fa fa-eye-slash" aria-hidden="true"></i></span>
          </NuxtLink>
        </div>
      </div>
      <p class="feildtxt">
        {{ $t('signup.password_validation_text') }}
      </p>
    </div>
    <div class="form-group">
      <div id="show_hide_password" class="input-group">
        <input
          v-model="register.password_confirmation"
          class="form-control signupfeilds"
          :placeholder="$t('signup.confirm_password')"
          :type="[showconfirmPassword ? 'text' : 'password']"
        />
        <div class="input-group-addon">
          <NuxtLink class="showPassword" to="#"
            >
            <span @click="showconfirmPassword = !showconfirmPassword"><i class="fa fa-eye-slash" aria-hidden="true"></i
          ></span>
          </NuxtLink>
        </div>
      </div>
    </div>
    <div class="form-group">
      <div class="row">
        <div class="col-sm-12 col-sm-offset-3">
          <input
            id="login-submit"
            type="submit"
            name="login-submit"
            tabindex="4"
            class="form-control createac"
            :value="processing === true ? $t('signup.creating_cccount') : $t('signup.create_account')"
          />
        </div>
      </div>
    </div>
    <div class="form-group">
      <div class="row">
        <div class="col-lg-12">
          <div class="text-center terms">
            By Logging in, you agree to the <NuxtLink to="#">Terms of Service</NuxtLink> and
            <NuxtLink to="#">{{ $t('signup.private_policy') }}</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>
<script>
import SocialLogin from '~/components/Auth/SocialLogin.vue';
export default {
  name: 'SignUpComponent',
  components: {
    SocialLogin,
  },
  props: {
    isCurrent: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      showPassword: false, // Default password visibility - false
      showconfirmPassword: false, // Default confirm password visibility - false
      errors: [], // Array to keep error messages
      register: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
        username: ''
      },
      processing: false,
      checkingUsername: '',
    };
  },
  methods: {
    // User Registration
    async registeruser() {
      this.errors = []; // errors is empty on register
      this.processing = true;

      // If validation is success do sign up
      if (this.validateSignupForm() === true) {
          // Do the registration process
          try {
            const register = await this.$axios.post('/register', this.register);
            this.$toasted.success(this.$t('signup.success_message.user_successfully_registered')); // Shoow the success message on signup
            this.register.first_name = this.register.last_name = this.register.username = this.register.email = this.register.password = this.register.password_confirmation ='';
            this.processing = false;
            this.$emit('complete', register.data.user);
          } catch (error) {
            // If signup error
            if(error.response.status === 400){
              // Show errors
              if(error.response.data.email) {
                this.$toasted.error(this.$t('signup.error_message.the_email_has_already_been_taken'));
              }
              if(error.response.data.username) {
                this.$toasted.error(this.$t('signup.error_message.username_already_taken'));
              }
            }else{
              this.$toasted.error(this.$t('signup.error_message.something_went_wrong_please_try_later'));
            }
            this.processing = false;
          }
      }
    },
    // To check if username already exist in the database
    async onChange(event) {
      if (!this.isCurrent) return
      try {
        // Show please wait message on checking
        this.checkingUsername = this.$t('signup.please_wait')
        const register = await this.$axios.post('/checkUsername', { user_name: event.target.value });

        if(register.data) {
          // If response contain is_used status = 1, then username is already taken
          if(register.data.is_used === 1) {
            // Show error message, username already taken
            this.$toasted.error(this.$t(register.data.message));
            this.checkingUsername = '';
            return false;
          } else {
            // Show message username is available
            this.checkingUsername = this.$t(register.data.message)
            return true;
          }
        }
      } catch (error) {
        this.$toasted.error(error);
      }
    },
    validateSignupForm() {
      // Validate firstname, check if firstname is null
      if (!this.register.first_name) {
        // Show error message if first name is null
        this.errors.push(this.$t('signup.validation.please_enter_firstname'));
        this.$toasted.error(this.errors);
        this.processing = false;
        return false;
      } else if (this.register.first_name.length < 2) {
        // Validate firstname, Check if length is less than given number, show error message
        this.errors.push(this.$t('signup.validation.firstname_must_contain_more_than_2_characters'));
        this.$toasted.error(this.errors);
        this.processing = false;
        return false;
      } else if (!this.register.last_name) {
        // Validate lastname, Check if lastname is null or not, if null then show error message
        this.errors.push(this.$t('signup.validation.please_enter_lastname'));
        this.$toasted.error(this.errors);
        this.processing = false;
        return false;
      } else if (!this.register.username) {
        // Validate username, Check if username is entered or not, if null show error message
        this.errors.push(this.$t('signup.validation.please_enter_a_username'));
        this.$toasted.error(this.errors);
        this.processing = false;
        return false;
      } else if (!this.register.email) {
        // Check if email entered or not, if not show error meessage
        this.errors.push(this.$t('signup.validation.please_enter_email'));
        this.$toasted.error(this.errors);
        this.processing = false;
        return false;
      } else if (!this.validEmail(this.register.email)) {
        // If email exist validate email. and if error show error message
        this.errors.push(this.$t('signup.validation.please_enter_a_valid_email'));
        this.$toasted.error(this.errors);
        this.processing = false;
        return false;
      } else if (!this.register.password) { // Check if password exist or not.
        this.errors.push(this.$t('signup.validation.password_cannot_be_empty'));
        this.$toasted.error(this.errors);
        this.processing = false;
        return false;
      } else if (!this.validatelowerCase(this.register.password)) { // Check if password has a lowercase letter.
        this.errors.push(this.$t('signup.validation.password_must_contain_one_lowercase_letter'));
        this.$toasted.error(this.errors);
        this.processing = false;
        return false;
      } else if (!this.validateupperCase(this.register.password)) { // Check if password has an uppercase letter.
        this.errors.push(this.$t('signup.validation.password_must_contain_one_uppercase_letter'));
        this.$toasted.error(this.errors);
        this.processing = false;
        return false;
      } else if (!this.validatenumberExist(this.register.password)) { // Check if a number exist in password.
        this.errors.push(this.$t('signup.validation.password_must_contain_one_number'));
        this.$toasted.error(this.errors);
        this.processing = false;
        return false;
      } else if (!this.validateminimumChar(this.register.password)) { // Check if password has minimum of 8 characters.
        this.errors.push(this.$t('signup.validation.password_must_contain_8_characters_minimum'));
        this.$toasted.error(this.errors);
        this.processing = false;
        return false;
      } else if (!this.validatespecialCharacter(this.register.password)) { // Check if password has a special character.
        this.errors.push(this.$t('signup.validation.password_must_contain_one_symbol'));
        this.$toasted.error(this.errors);
        this.processing = false;
        return false;
      } else if (!this.register.password_confirmation) { // Validate confirm password.
        this.errors.push(this.$t('signup.validation.confirm_password_cannot_be_empty'));
        this.$toasted.error(this.errors);
        this.processing = false;
        return false;
      } else if (this.register.password !== this.register.password_confirmation) { // Check if password is same as confirm password.
        this.errors.push(this.$t('signup.validation.confirm_password_must_be_same_as_password'));
        this.$toasted.error(this.errors);
        this.processing = false;
        return false;
      } else {
        return true;
      }
    },
    // Validate the user entered email
    validEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    // Check if lowercase letter exist or not
    validatelowerCase(password) {
      const lower = /[a-z]+/;
      return lower.test(password);
    },
    // Check if uppercase letter exist or not
    validateupperCase(password) {
      const upper = /[A-Z]+/;
      return upper.test(password);
    },
    // Check if number exist or not
    validatenumberExist(password) {
      const number = /[0-9]+/;
      return number.test(password);
    },
    // Check if minimum number of characters exist or not
    validateminimumChar(password) {
      const length = /.{8,}/;
      return length.test(password);
    },
    // Check if special characcters exist or not
    validatespecialCharacter(password) {
      const char = /[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/;
      return char.test(password);
    },
  },
};
</script>
