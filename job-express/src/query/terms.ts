export function terms(filters: object[], property: string, values: any[]) {
  if (values.length > 0) {
    filters.push({
      terms: {
        [property]: values,
      },
    });
  }
}
