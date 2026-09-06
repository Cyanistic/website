// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

import type {
  TransitionAnimationPair,
  TransitionDirectionalAnimations,
} from "astro";

export const SITE_TITLE = "Cyanistic's Home";
export const SITE_DESCRIPTION = "Mostly Linux. Too many side projects. Occasionally coherent writing.";

const easingSlide: TransitionAnimationPair = {
  old: {
    name: "slide",
    duration: "0.3s",
    easing: "linear",
    fillMode: "forwards",
  },
  new: {
    name: "slide",
    duration: "0.3s",
    easing: "linear",
    fillMode: "backwards",
  },
};

export const customSlide: TransitionDirectionalAnimations = {
  forwards: easingSlide,
  backwards: easingSlide,
};
