import { Request, Response } from 'express';
import { ElasticClient, JOBS_INDEX } from '../clients/elasticsearch.client';

async function search(req: Request, resp: Response): Promise<void> {
  const {
    country = [],
    job_title = [],
    preference = [],
    work_type = [],
    location = [],
    exp = [],
    salary = [],
    debug = false,
    size = 20,
    from = 0,
  } = req.body;

  let filters = [];
  let query = {};

  if (country.length > 0) {
    filters.push({
      terms: {
        country,
      },
    });
  }

  if (job_title.length > 0) {
    filters.push({
      terms: {
        job_title,
      },
    });
  }

  if (preference.length > 0) {
    filters.push({
      terms: {
        preference,
      },
    });
  }

  if (work_type.length > 0) {
    filters.push({
      terms: {
        work_type,
      },
    });
  }

  if (location.length > 0) {
    filters.push({
      terms: {
        location,
      },
    });
  }

  if (exp.length > 0) {
    filters.push({
      bool: {
        must: [
          {
            range: {
              min_exp: {
                gte: exp[0],
              },
            },
          },
          {
            range: {
              max_exp: {
                lte: exp[1],
              },
            },
          },
        ],
      },
    });
  }

  if (salary.length > 0) {
    filters.push({
      bool: {
        must: [
          {
            range: {
              min_salary: {
                gte: salary[0],
              },
            },
          },
          {
            range: {
              max_salary: {
                lte: salary[1],
              },
            },
          },
        ],
      },
    });
  }

  if (filters) {
    query = {
      bool: {
        filter: filters,
      },
    };
  } else {
    query = {
      match_all: {},
    };
  }

  const aggs = {
    countries: { terms: { field: 'country', size: 300 } },
    job_titles: { terms: { field: 'job_title', size: 300 } },
    preferences: { terms: { field: 'preference' } },
    work_types: { terms: { field: 'work_type' } },
    locations: { terms: { field: 'location', size: 500 } },
  };

  const result = await ElasticClient.getClient().search({
    index: JOBS_INDEX,
    body: {
      query,
      size,
      from,
      aggs,
    },
  });

  const cleanHits = result.hits.hits.map((h) => {
    return {
      score: h._score,
      ...(h._source as object),
    };
  });

  const cleanAggregates = Object.keys(result.aggregations).map((a) => {
    return {
      [a]: (result.aggregations[a] as any)?.buckets,
    };
  });

  resp.status(200).json({
    total: (result.hits.total as any)?.value,
    size,
    from,
    result: cleanHits,
    aggs: cleanAggregates,
    ...(debug ? { query } : {}),
  });

  return;
}

export { search };
