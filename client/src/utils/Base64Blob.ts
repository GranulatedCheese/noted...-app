export const base64ToBlob = (str: string, mimeType = "", sliceSize = 512) => {
  const byteArrays = [];

  for (let offset = 0; offset < str.length; offset += sliceSize) {
    const slice = str.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: mimeType });
};
