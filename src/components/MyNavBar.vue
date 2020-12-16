<template>
  <nav class="navbar navbar-expand-sm bg-warning navbar-light navbar-toggleable-sm">
    <a class="navbar-brand" href="/">
      <img alt="Menta logo" src="@/assets/menta.png" width="30" height="30" class="d-inline-block align-top">
      SubBusiness
    </a>
    <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item dropdown active">
          <a class="nav-link dropdown-toggle" id="navbarDropdownMenuLink1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
             Kakeibo
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink1">
            <a class="dropdown-item" href="{% url 'kakeibo:mine' %}">
              Dashboard
            </a>
            <a class="dropdown-item" href="{% url 'kakeibo:mine' %}">
              Dashboard
            </a>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import component from '*.vue';

export default class MyNavBar extends Vue {

}
</script>