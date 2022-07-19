export function checkRequiredProperties<DTO, View>(dto: DTO, view: View) {
  // This allows us to use the normal JS string index
  const d: {[index:string]: any} = dto;
  const v: {[index:string]: any} = view;

  const dtoProps = Object.keys(d);
  for (const key in dtoProps) {
      if (Object.prototype.hasOwnProperty.call(dtoProps, key)) {
          const prop = dtoProps[key];
          if (d[prop] !== undefined && v[prop] === undefined) {
            throw new Error(`Property ${prop} is required on ${d["constructor"].name}`);
          }
      }
  }
}