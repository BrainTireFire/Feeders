import {Actions, createEffect, ofType} from "@ngrx/effects";
import {inject} from "@angular/core";
import {FeedService} from "../services/feed.service";
import {feedActions} from "./actions";
import {catchError, map, of, switchMap} from "rxjs";
import {GetFeedResponseInterface} from "../types/getFeedResponse.interface";

export const getFeedEffect = createEffect((
  actions$ = inject(Actions),
  feedService = inject(FeedService),
) => {
  return actions$.pipe(
    ofType(feedActions.getFeed),
    switchMap(({url}) => {
      return feedService.getFeed(url).pipe(
        map((feed: GetFeedResponseInterface) => {
          return feedActions.getFeedSuccess({feed});
        }),
        //backend has not correct data
        // map((feed: GetFeedResponseInterface) => {
        //   const updatedArticles = feed.articles.map((article) => ({
        //     ...article,
        //     tagList: ["test1", "test2", "test3"]
        //   }));
        //
        //   return feedActions.getFeedSuccess({ feed: { ...feed, articles: updatedArticles } });
        // }),
        catchError(() => {
          return of(feedActions.getFeedFailure());
        })
      );
    }),
  );
}, {functional: true});
