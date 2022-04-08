import { atom } from "recoil";

export const isDarkAtom = atom({
  key: "isDark",
  default: false,
});

export const isCandleAtom = atom({
  key: "isCandle",
  default: false,
});
