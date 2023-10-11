import { defineStore } from "pinia";
import { getEntityId } from "./peoples";
import { type Entity } from "./peoples";

export const useFavorites = defineStore("favorites", {
  state: () => ({
    list: [] as Entity[]
  }),
  getters: {
    isFavorite: (state) => (entity: any) => {
      return state.list.some((item) => item.id === +entity.id);
    }
  },
  actions: {
    toggleFavorite(entity: Entity) {
      const index = this.list.findIndex((item) => item.id === entity.id);

      if (index > -1) {
        this.list = [...this.list.slice(0, index), ...this.list.slice(index + 1)];
      } else {
        this.list = [...this.list, entity];
      }
    },
    addFavorite(entity: Entity) {
      const index = this.list.findIndex((item) => item.id === entity.id);

      if (index === -1) {
        this.list = [...this.list, { ...entity, id: +getEntityId(entity, this.list.length + 1) }];
      }
    },
    removeFavorite(id: any) {
      const index = this.list.findIndex((item) => item.id === id);

      if (index > -1) {
        this.list = [...this.list.slice(0, index), ...this.list.slice(index + 1)];
      } else {
        throw new Error("Невозможно удалить запись из избранных, запись отсутствует");
      }
    }
  },
  persist: true
});
