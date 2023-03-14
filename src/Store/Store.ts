import { writable } from "svelte/store";
import { ImageStatus } from "../Type/types.d";

export const imageStatus = writable(ImageStatus.READY);
export const originalImage = writable(null);
export const modifiedImage = writable(null);
