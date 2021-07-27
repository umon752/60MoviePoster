<template>
  <div
    class="
      d-flex
      flex-column
      justify-content-center
      align-items-center
      vh-100
      vw-100
    "
  >
    <span class="material-icons display-1 text-secondary opacity-30 lh-xs mb-2">
      error_outline
    </span>
    <p class="display-5 text-secondary fw-bold lh-xs mb-5">Page not found</p>
    <p class="text-secondary fs-5 fs-md-4">
      We can't find the page you're looking for.
    </p>
    <p class="text-secondary fs-5 fs-md-4 mb-6">
      Please go back to the homepage.
    </p>
    <router-link class="btn btn-primary" to="/">GO BACK HOME</router-link>
  </div>
</template>
