import Component from "@ember/component";
import { action, computed } from "@ember/object";

export default Component.extend({
  // tagName: "div",
  classNames: ["rating-panel"],
  rating: 0,
  maxRating: 5,
  onClick() {},
  stars: computed("rating", "maxRating", function () {
    let stars = [];
    for (let i = 1; i <= this.maxRating; i++) {
      stars.push({ rating: i, isFull: this.rating >= i });
    }
    return stars;
  }),
  setRating: action(function (newRating) {
    return this.onClick(newRating);
  }),
});
