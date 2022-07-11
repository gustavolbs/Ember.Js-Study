import Controller from "@ember/controller";
import { action, computed } from "@ember/object";
import { empty, sort } from "@ember/object/computed";
import { capitalize } from "rarwe/helpers/capitalize";

export default Controller.extend({
  isAddingSong: false,
  newSongTitle: "",
  isAddButtonDisabled: empty("newSongTitle"),
  sortBy: "ratingDesc",
  searchTerm: "",
  queryParams: {
    sortBy: "s",
    searchTerm: "q",
  },

  newSongPlaceholder: computed("model.name", function () {
    let bandName = this.model.name;
    return `New ${capitalize(bandName)} song`;
  }),

  matchingSongs: computed("model.songs.@each.title", "searchTerm", function () {
    let searchTerm = this.searchTerm.toLowerCase();
    return this.model.get("songs").filter((song) => {
      return song.title.toLowerCase().includes(searchTerm);
    });
  }),

  sortProperties: computed("sortBy", function () {
    let options = {
      ratingDesc: ["rating:desc", "title:asc"],
      ratingAsc: ["rating:asc", "title:asc"],
      titleDesc: ["title:desc"],
      titleAsc: ["title:asc"],
    };
    return options[this.sortBy];
  }),

  sortedSongs: sort("matchingSongs", "sortProperties"),

  addSong: action(function () {
    this.set("isAddingSong", true);
  }),

  cancelAddSong: action(function () {
    this.set("isAddingSong", false);
  }),

  saveSong: action(async function (event) {
    event.preventDefault();
    let newSong = this.store.createRecord("song", {
      title: this.get("newSongTitle"),
      band: this.model,
    });
    await newSong.save();
    this.set("newSongTitle", "");
  }),

  updateRating: action(function (song, rating) {
    song.set("rating", song.rating === rating ? 0 : rating);
    song.save();
  }),
});
