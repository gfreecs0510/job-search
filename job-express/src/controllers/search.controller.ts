import { Request, Response } from 'express';
import { ElasticClient, JOBS_INDEX } from '../clients/elasticsearch.client';
import { ranges } from '../query/range';
import { terms } from '../query/terms';
import {
  searchRequest,
  searchResponse,
  esResults,
} from '../types/search.types';
import { estypes } from '@elastic/elasticsearch';

async function search(req: Request, resp: Response): Promise<void> {
  try {
    const {
      country = [],
      job_title = [],
      preference = [],
      work_type = [],
      location = [],
      salary = {},
      experience = {},
      debug = false,
      size = 20,
      from = 0,
    }: searchRequest = req.body;

    let filter: estypes.QueryDslQueryContainer[] = [];
    let query: estypes.QueryDslQueryContainer = {};

    terms(filter, 'country', country);
    terms(filter, 'job_title', job_title);
    terms(filter, 'preference', preference);
    terms(filter, 'work_type', work_type);
    terms(filter, 'location', location);
    ranges(filter, 'min_exp', 'max_exp', experience);
    ranges(filter, 'min_salary', 'max_salary', salary);

    if (filter.length > 0) {
      query = {
        bool: {
          filter,
        },
      };
    } else {
      query = {
        match_all: {},
      };
    }

    const aggs = {
      country: { terms: { field: 'country', size: 300 } },
      job_title: { terms: { field: 'job_title', size: 300 } },
      preference: { terms: { field: 'preference' } },
      work_type: { terms: { field: 'work_type' } },
      location: { terms: { field: 'location', size: 500 } },
      experience: {
        range: {
          field: 'avg_exp',
          ranges: [
            {
              to: 2,
            },
            {
              from: 2,
              to: 5,
            },
            {
              from: 5,
              to: 10,
            },
            {
              from: 10,
              to: 20,
            },
            {
              from: 20,
            },
          ],
        },
      },
      salary: {
        range: {
          field: 'avg_salary',
          ranges: [
            { to: 1000 },
            { from: 1000, to: 3000 },
            { from: 3000, to: 5000 },
            { from: 5000, to: 10000 },
            { from: 10000 },
          ],
        },
      },
    };

    const result: estypes.SearchResponse =
      await ElasticClient.getClient().search({
        index: JOBS_INDEX,
        body: {
          query,
          size,
          from,
          aggs,
        },
      });

    const cleanHits: esResults = result.hits.hits.map((h) => {
      return {
        score: h._score as number,
        ...(h._source as object),
      };
    });

    let cleanAggregates;
    const aggregations = result.aggregations as Record<
      string,
      estypes.AggregationsAggregate
    >;
    cleanAggregates = Object.keys(aggregations).map((a) => {
      return {
        [a]: (aggregations[a] as any)?.buckets,
      };
    });

    const response: searchResponse = {
      total: (result.hits.total as any)?.value,
      size,
      from,
      result: cleanHits,
      aggs: cleanAggregates,
      ...(debug ? { query } : {}),
    };

    resp.status(200).json(response);

    return;
  } catch (error: unknown) {
    console.error('Caught an error:', error);
    resp.status(500).json('Server error');
  }
}

export { search };
