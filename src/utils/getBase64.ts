import { RcFile } from "antd/es/upload";

/** Функция конвертирования изображения в base64 */
export const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};