export default function getImageFromBuffer(buffer: Uint8Array, mimeType: string) {
  const binaryString = Array.from(buffer)
    .map((byte) => String.fromCharCode(byte))
    .join('');
  const base64String = btoa(binaryString);
  const base64ImageUrl = `data:${mimeType};base64,${base64String}`;

  return base64ImageUrl;
}
