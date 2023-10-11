<template>
  <table v-if="entity && entity.id !== null">
    <thead>
      <tr>
        <th>name</th>
        <th>height</th>
        <th>mass</th>
        <th>hair_color</th>
        <th>Add Favorite</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{{ entity.name }}</td>
        <td>{{ entity.height }}</td>
        <td>{{ entity.mass }}</td>
        <td>{{ entity.hair_color }}</td>
        <td>
          <button v-if="!isFavorite(entity)" type="button" @click.stop="handleAddFavorite(entity)">
            Добавить в избранные
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { mapState, mapActions } from "pinia";
import { useRoute } from "vue-router";
import { usePeoples } from "@/stores/peoples";
import { useFavorites } from "@/stores/favorites";
import { type Entity } from "@/stores/peoples";

const peopleStore = usePeoples();

export default {
  async setup() {
    const favStore = useFavorites();
    const route = useRoute();
    const index = peopleStore.$state.list.findIndex((item) => item.id === +route.params.id);

    if (index > -1) {
      peopleStore.setRecord(peopleStore.list[index]);
    } else {
      await peopleStore.fetchRecord(+route.params.id);
    }

    return { favStore };
  },
  computed: {
    ...mapState(usePeoples, {
      entity: "record"
    })
  },
  methods: {
    ...mapActions(useFavorites, ["addFavorite"]),
    isFavorite(entity: Entity) {
      return this.favStore.isFavorite(entity);
    },
    handleAddFavorite(entity: Entity) {
      this.addFavorite(entity);
    }
  }
};
</script>
