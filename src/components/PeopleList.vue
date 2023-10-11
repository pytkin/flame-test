<template>
  <model-list-select
    :list="compoboxPeopleList"
    option-value="url"
    :custom-text="optionDisplayText"
    v-model="selectedComboboxOption"
    placeholder="Поиск по персонажам"
    @searchchange="handleSearchAnimation"
  />
  <table>
    <thead>
      <tr>
        <th>name</th>
        <th>height</th>
        <th>mass</th>
        <th>hair_color</th>
        <th>Add Favorite/Remove favorite</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(entity, index) in entities" :key="`people-list-item-${entity.id}-${index}`">
        <td>{{ entity.name }}</td>
        <td>{{ entity.height }}</td>
        <td>{{ entity.mass }}</td>
        <td>{{ entity.hair_color }}</td>
        <td>
          <button type="button" @click.stop="handleToggleFavorite(entity)">
            Добавить/удалить из избранных
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { mapState, mapActions } from "pinia";
import { ModelListSelect } from "vue-search-select";
import { usePeoples, getEntityId } from "@/stores/peoples";
import { useFavorites } from "@/stores/favorites";
import { type Entity } from "@/stores/peoples";

const peopleStore = usePeoples();

export default {
  async setup() {
    if (peopleStore.$state.list.length === 0) {
      await peopleStore.fetchList();
    }
  },
  components: {
    ModelListSelect
  },
  data() {
    return {
      compoboxPeopleList: [],
      selectedComboboxOption: {}
    };
  },
  computed: {
    ...mapState(usePeoples, {
      entities: "list"
    })
  },
  watch: {
    selectedComboboxOption(newValue: Entity) {
      if (newValue?.url) {
        this.$router.push({ name: "single_people", params: { id: getEntityId(newValue, null) } });
      }
    }
  },
  methods: {
    ...mapActions(useFavorites, ["toggleFavorite"]),
    handleToggleFavorite(entity: Entity) {
      this.toggleFavorite(entity);
    },
    handleSearchAnimation(searchText: string) {
      if (this.compoboxPeopleList.length === 0) {
        fetch(`https://swapi.dev/api/people/?search=${searchText}`)
          .then((response) => response.json())
          .then((response) => {
            this.compoboxPeopleList = response.results;
          })
          .catch((error) => {
            console.error("При выполнении поиска персонажей возникла ошибка", error);
          });
      }
    },
    optionDisplayText(option: Entity) {
      return `${option.name}`;
    }
  }
};
</script>

<style scoped>
.dropdown {
  margin-bottom: 1rem;
}
</style>
