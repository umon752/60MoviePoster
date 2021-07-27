<template>
  <nav>
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: !page.has_pre }">
        <a
          class="page-link d-flex px-1"
          href="#"
          tabindex="-1"
          aria-disabled="true"
          @click.prevent="$emit('getData', page.current_page - 1)"
        >
          <span class="material-icons lh-1"> arrow_left </span>
        </a>
      </li>
      <li
        class="page-item"
        :class="{ active: item === page.current_page }"
        v-for="item in page.total_pages"
        :key="item"
      >
        <a
          class="page-link"
          href="#"
          @click.prevent="$emit('getData', (currentPage = item))"
          >{{ item }}</a
        >
      </li>
      <li class="page-item" :class="{ disabled: !page.has_next }">
        <a
          class="page-link d-flex px-1"
          href="#"
          @click.prevent="$emit('getData', page.current_page + 1)"
        >
          <span class="material-icons lh-1"> arrow_right </span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['page'],
};
</script>
