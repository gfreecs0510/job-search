/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  '/search': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Search for job listings with filters and aggregations */
    post: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody: {
        content: {
          'application/json': {
            /** @description Number of results to return */
            size?: number;
            /** @description Starting point for pagination */
            from?: number;
            /** @description Filter by country */
            country?: string[];
            /** @description Filter by job title */
            job_title?: string[];
            /** @description Filter by preference */
            preference?: string[];
            /** @description Filter by work type */
            work_type?: string[];
            /** @description Filter by location */
            location?: string[];
            /** @description Range filter for experience */
            experience?: {
              /** @description Minimum years of experience */
              from?: number;
              /** @description Maximum years of experience */
              to?: number;
            };
            /** @description Range filter for salary */
            salary?: {
              /** @description Minimum salary */
              from?: number;
              /** @description Maximum salary */
              to?: number;
            };
          };
        };
      };
      responses: {
        /** @description A JSON object with search results and aggregations */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': {
              /** @description Total number of results */
              total?: number;
              /** @description Number of results returned in the response */
              size?: number;
              /** @description Starting index of the results */
              from?: number;
              result?: {
                /** @description Relevance score of the job listing */
                score?: number;
                /** @description Average years of experience required */
                avg_exp?: number;
                country?: string;
                /** @description Job role */
                role?: string;
                /** @description Source of the job listing */
                job_portal?: string;
                /** @description Preferred applicant gender */
                preference?: string;
                /** @description Employment type (e.g., Part-Time, Full-Time) */
                work_type?: string;
                /** @description Required skills for the role */
                skills?: string;
                /** @description Required qualifications */
                qualifications?: string;
                /** @description Maximum salary */
                max_salary?: number;
                /** @description Key responsibilities */
                responsibilities?: string;
                /** @description Description of the job */
                job_description?: string;
                /** @description Maximum years of experience required */
                max_exp?: number;
                /** @description Minimum salary */
                min_salary?: number;
                /** @description Average salary offered */
                avg_salary?: number;
                /** @description Hiring company name */
                company?: string;
                /** @description Job location */
                location?: string;
                /** @description Job title */
                job_title?: string;
                /** @description Minimum years of experience required */
                min_exp?: number;
              }[];
              aggs?: {
                country?: {
                  /** @description Country name */
                  key?: string;
                  /** @description Number of listings for this country */
                  doc_count?: number;
                }[];
                preference?: {
                  /** @description Preferred applicant gender */
                  key?: string;
                  /** @description Count of listings for this preference */
                  doc_count?: number;
                }[];
                work_type?: {
                  /** @description Work type (e.g., Part-Time) */
                  key?: string;
                  /** @description Count of listings for this work type */
                  doc_count?: number;
                }[];
                location?: {
                  /** @description Job location */
                  key?: string;
                  /** @description Count of listings for this location */
                  doc_count?: number;
                }[];
                salary?: {
                  /** @description Salary range */
                  key?: string;
                  /** @description Upper limit of the salary range */
                  to?: number;
                  /** @description Lower limit of the salary range */
                  from?: number;
                  /** @description Count of listings for this salary range */
                  doc_count?: number;
                }[];
                experience?: {
                  /** @description Experience range */
                  key?: string;
                  /** @description Upper limit of the experience range */
                  to?: number;
                  /** @description Lower limit of the experience range */
                  from?: number;
                  /** @description Count of listings for this experience range */
                  doc_count?: number;
                }[];
                job_title?: {
                  /** @description Job title */
                  key?: string;
                  /** @description Count of listings for this job title */
                  doc_count?: number;
                }[];
              }[];
            };
          };
        };
      };
    };
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
}
export type webhooks = Record<string, never>;
export interface components {
  schemas: never;
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;