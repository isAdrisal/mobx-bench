import {
  applySnapshot,
  getSnapshot,
  Model,
  model,
  modelAction,
  tProp,
  types,
} from "mobx-keystone";

@model("Shape")
class Shape extends Model({
  x: tProp(0),
  y: tProp(0),
  width: tProp(100),
  height: tProp(100),
  rotation: tProp(90),
  fill: tProp("red"),
  stroke: tProp("black"),
  name: tProp(""),
}) {
  @modelAction
  set(attrs: unknown) {
    Object.assign(this, attrs);
  }
}

@model("Group")
class Group extends Model({
  shapes: tProp(types.array(Shape)),
}) {}

// generate a large amount of data
const group = new Group({
  shapes: new Array(10000)
    .fill(undefined)
    .map(() => new Shape({})),
});

const snapshot = getSnapshot(group);

group.shapes[1].set({ x: 20, y: 30 });

performance.mark("snapshot-start");
applySnapshot(group, snapshot);
performance.mark("snapshot-end");

const duration = performance.measure(
  "snapshot-duration",
  "snapshot-start",
  "snapshot-end",
);

console.log("mobx-keystone", `${Math.round(duration.duration)}ms`);
