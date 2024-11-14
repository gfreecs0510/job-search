const searchSchema = {
  type: 'object',
  properties: {
    country: { type: 'array', items: { type: 'string' } },
    job_title: { type: 'array', items: { type: 'string' } },
    preference: { type: 'array', items: { type: 'string' } },
    work_type: { type: 'array', items: { type: 'string' } },
    location: { type: 'array', items: { type: 'string' } },
    experience: {
      type: 'object',
      properties: {
        from: {
          type: 'integer',
          default: 0,
        },
        to: {
          type: 'integer',
          default: 100,
        },
      },
    },
    salary: {
      type: 'object',
      properties: {
        from: {
          type: 'integer',
          default: 0,
        },
        to: {
          type: 'integer',
          default: 100,
        },
      },
    },
    debug: {
      type: 'boolean',
    },
    size: {
      type: 'number',
      default: 20,
    },
    from: {
      type: 'number',
    },
  },
  additionalProperties: false,
};

export default searchSchema;
