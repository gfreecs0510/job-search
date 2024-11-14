export function ranges(
  filters: object[],
  fromProperty: string,
  toProperty: string,
  values: any
) {
  if (values) {
    filters.push({
      bool: {
        must: [
          {
            range: {
              [fromProperty]: {
                gte: values.from,
              },
            },
          },
          {
            range: {
              [toProperty]: {
                lte: values.to,
              },
            },
          },
        ],
      },
    });
  }
}
