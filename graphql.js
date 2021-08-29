import { buildSchema } from 'graphql';
import JsBarcode, * as jsbarcode from 'jsbarcode';
import { Canvas } from 'canvas';

export const schema = buildSchema(`
  type Query {
      mood: String
  }
`);

export const root = {
    mood: () => {
        const canvas = new Canvas();
        console.log(JsBarcode(canvas, "Hello"))
        return "Barcode";
    }
};

export default {
    schema,
    root
}