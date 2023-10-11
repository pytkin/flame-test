import { defineStore } from "pinia";

export type Entity = {
  id: number | null;
  name: string | null;
  height: string | null;
  mass: string | null;
  hair_color: string | null;
  skin_color: string | null;
  eye_color: string | null;
  birth_year: string | null;
  gender: string | null;
  homeworld: string | null;
  films: string[] | [];
  species: string[] | [];
  vehicles: string[] | [];
  starships: string[] | [];
  created: string | null;
  edited: string | null;
  url: string | null;
};

export const getEntityId = (entity: any, index: any) => {
  const matchedIds = entity.url.match("\\d+");

  if (Array.isArray(matchedIds) && matchedIds.length > 1) {
    // @ts-ignore
    return +matchedIds.at(-1);
  } else if (Array.isArray(matchedIds) && matchedIds.length > 0) {
    return +matchedIds[0];
  } else {
    return index;
  }
};

export const usePeoples = defineStore("peoples", {
  state: () => ({
    list: [] as Entity[],
    record: {
      id: null,
      name: null,
      height: null,
      mass: null,
      hair_color: null,
      skin_color: null,
      eye_color: null,
      birth_year: null,
      gender: null,
      homeworld: null,
      films: [],
      species: [],
      vehicles: [],
      starships: [],
      created: null,
      edited: null,
      url: null
    } as Entity
  }),
  getters: {},
  actions: {
    async fetchList() {
      try {
        this.list = await fetch("https://swapi.dev/api/people")
          .then((response) => response.json())
          .then((response) =>
            response.results.map((item: Entity, index: number) => ({
              ...item,
              id: getEntityId(item, index + 1)
            }))
          );
      } catch (error) {
        console.error("При получении списка people, произошла ошибка", error);
      }
    },
    async fetchRecord(id: number) {
      try {
        this.record = await fetch(`https://swapi.dev/api/people/${id}`)
          .then((response) => response.json())
          .then((data) => ({ ...data, id: +id }));
      } catch (error) {
        console.error("При получении информации о записи people, произошла ошибка", error);
      }
    },
    setRecord(payload: Entity) {
      this.record = payload;
    }
  }
});
