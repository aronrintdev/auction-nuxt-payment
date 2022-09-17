<template>
  <div>
    <div class="col-lg-10 settings-menu">
      <NuxtLink to="/">
        <p>{{ $t('settings.settings_menu.details') }}</p>
      </NuxtLink>
      <NuxtLink to="/">
        <p>{{ $t('settings.settings_menu.payment') }}</p>
      </NuxtLink>
      <NuxtLink to="/settings/addresses">
        <p>{{ $t('settings.settings_menu.addresses') }}</p>
      </NuxtLink>
      <NuxtLink to="/">
        <p>{{ $t('settings.settings_menu.password') }}</p>
      </NuxtLink>
      <NuxtLink to="/">
        <p>{{ $t('settings.settings_menu.wishlist') }}</p>
      </NuxtLink>
    </div>
    <div class="settings-addresses-menu-underline"></div>
  </div>
</template>

<script>
export default {
  name: 'SettingsMenu',
}
</script>
