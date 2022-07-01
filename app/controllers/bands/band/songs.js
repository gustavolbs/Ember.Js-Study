import Controller from "@ember/controller";
import { action } from "@ember/object";
import { empty } from "@ember/object/computed";
import Song from "rarwe/models/song";

export default Controller.extend({
  isAddingSong: false,
  newSongName: "",
  isAddButtonDisabled: empty("newSongName"),

  addSong: action(function () {
    this.set("isAddingSong", true);
  }),

  cancelAddSong: action(function () {
    this.set("isAddingSong", false);
  }),

  saveSong: action(function (event) {
    event.preventDefault();
    let newSong = Song.create({
      title: this.newSongName,
      // band: this.model.name,
      // rating: Math.floor(Math.random() * 6),
    });
    this.model.songs.pushObject(newSong);
    this.set("newSongName", "");
  }),
});
