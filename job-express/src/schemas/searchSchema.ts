const searchSchema = {
  type: 'object',
  properties: {
    country: { type: 'array', items: { type: 'string' } },
    job_title: { type: 'array', items: { type: 'string' } },
    preference: { type: 'array', items: { type: 'string' } },
    work_type: { type: 'array', items: { type: 'string' } },
    location: { type: 'array', items: { type: 'string' } },
    exp: {
      type: 'array',
      items: { type: 'integer' },
      minItems: 2,
      maxItems: 2,
    },
    salary: {
      type: 'array',
      items: { type: 'integer' },
      minItems: 2,
      maxItems: 2,
    },
    debug: {
      type: 'boolean',
    },
    size: {
      type: 'number',
    },
    from: {
      type: 'number',
    },
  },
  additionalProperties: false,
};

export default searchSchema;
