import { applySnapshot, getSnapshot, types } from "mobx-state-tree";

// create simple model
const Shape = types.model("Shape", {
  x: 0,
  y: 0,
  width: 100,
  height: 100,
  rotation: 90,
  fill: "red",
  stroke: "black",
  name: "",
}).actions((self) => ({
  set(attrs) {
    Object.assign(self, attrs);
  },
}));

const Group = types.model("Group", {
  shapes: types.array(Shape),
});

// generate a large amount of data
const group = Group.create({
  shapes: new Array(10000).fill({}),
});

// create initial snapshot
const snapshot = getSnapshot(group);
// change shape
group.shapes[1].set({ x: 20, y: 30 });

performance.mark("snapshot-start");
applySnapshot(group, snapshot);
performance.mark("snapshot-end");

const duration = performance.measure(
  "snapshot-duration",
  "snapshot-start",
  "snapshot-end",
);

console.log("mobx-state-tree", `${Math.round(duration.duration)}ms`);
