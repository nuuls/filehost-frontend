export function humanFileSize(bytes: number): string {
  if (bytes < 1000) {
    return `${bytes} Bytes`;
  } else if (bytes < 1000 * 1000) {
    return `${Math.floor(bytes / 1000)} KB`;
  } else if (bytes < 1000 * 1000 * 1000) {
    return `${Math.floor(bytes / 1000 / 1000)} MB`;
  } else {
    return `${Math.floor(bytes / 1000 / 1000 / 1000)} GB`;
  }
}
