/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseFeedbackResponse } from '../../models/page-response-feedback-response';

export interface FindAllFeedbackByBook$Params {
  'book-id': number;
  page?: number;
}

export function findAllFeedbackByBook(http: HttpClient, rootUrl: string, params: FindAllFeedbackByBook$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseFeedbackResponse>> {
  const rb = new RequestBuilder(rootUrl, findAllFeedbackByBook.PATH, 'get');
  if (params) {
    rb.path('book-id', params['book-id'], {});
    rb.query('page', params.page, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseFeedbackResponse>;
    })
  );
}

findAllFeedbackByBook.PATH = '/feedbaack/book/{book-id}';
