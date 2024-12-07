import DocumentPictures from "../model/DocumentPictures";

export function GetBase64(ID: number): string {
  let base64: string = "";
  if (ID > 0) {
    DocumentPictures.map((object) => {
      if (object.PictureID === ID) {
        base64 = object.Picture;
      }
    });
  }
  return base64;
}
