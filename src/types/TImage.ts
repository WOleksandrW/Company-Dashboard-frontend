export type TImage = {
  id: number;
  data: {
    data: Uint8Array;
    type: string;
  };
  mimeType: string;
};
