function terms(property, values) {
  let query = {};
  if (values) {
    return {
      terms: {
        property,
        values,
      },
    };
  }
  return query;
}
