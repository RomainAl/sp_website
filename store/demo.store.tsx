import { create } from "zustand";

export const useDemoStore = create(() => ({
  start: false,
}));

export const setStart = (start: boolean) => {
  useDemoStore.setState({ start });
};
