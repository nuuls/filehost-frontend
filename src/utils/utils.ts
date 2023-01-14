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

export function humanDuration(seconds: number): string {
  if (seconds < 60) {
    return `${seconds} Seconds`;
  } else if (seconds / 60 < 60) {
    return `${seconds / 60} Minutes`;
  } else if (seconds / 60 / 60 < 24) {
    return `${seconds / 60 / 60} Hours`;
  } else if (seconds / 60 / 60 / 24 < 365) {
    return `${seconds / 60 / 60 / 24} Days`;
  } else {
    return `${seconds / 60 / 60 / 24 / 365} Years`;
  }
}
