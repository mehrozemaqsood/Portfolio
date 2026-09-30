import data from '../../assets/images.json';
// resolve an image key for a Figma node id (number after "289-") – exported under either prefix
export const k = (n: number | string) =>
  ['COMPZapier_289-', 'ZapierCase_289-'].map((p) => p + n).find((x) => (data as any)[x]) ?? 'MISSING_' + n;
