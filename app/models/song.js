import Model, { attr, belongsTo } from "@ember-data/model";

export default Model.extend({
  title: attr(),
  band: belongsTo(),
  rating: attr("number"),
});
