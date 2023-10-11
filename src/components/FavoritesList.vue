<template>
  <table v-if="entities.length > 0">
    <thead>
      <tr>
        <th>name</th>
        <th>height</th>
        <th>mass</th>
        <th>hair_color</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(entity, index) in entities" :key="`favorites-list-item-${entity.id}-${index}`">
        <td>{{ entity.name }}</td>
        <td>{{ entity.height }}</td>
        <td>{{ entity.mass }}</td>
        <td>{{ entity.hair_color }}</td>
        <td>
          <button type="button" @click.stop="handleRemoveFavorite(entity.id)">
            Удалить из избранного
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <div v-else>Список "Избранное" пуст</div>
</template>

<script lang="ts">
import { mapState, mapActions } from "pinia";
import { useFavorites } from "@/stores/favorites";

export default {
  computed: {
    ...mapState(useFavorites, {
      entities: "list"
    })
  },
  methods: {
    ...mapActions(useFavorites, ["removeFavorite"]),
    handleRemoveFavorite(id: any) {
      this.removeFavorite(id);
    }
  }
};
</script>
