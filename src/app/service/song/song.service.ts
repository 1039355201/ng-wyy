import {Inject, Injectable} from '@angular/core';
import {ServiceModule} from "../service.module";
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {SongSheet, SongUrl} from "../data.models";
import {from, Observable, of} from "rxjs/index";
import {catchError, concatMap, map, mergeMap} from "rxjs/internal/operators";
import {API_CONFIG} from "../../core/inject-tokens";


export interface SongSheetList extends SongSheet {
  url: string;
}

@Injectable({
  providedIn: ServiceModule
})
export class SongService {
  constructor(private http: HttpClient, @Inject(API_CONFIG) private config: string) { }
  getSongList(id: number): Observable<SongSheetList[]> {
    return Observable.create((observer) => {
      this.concatSongList(id).subscribe(res => {
        this.generateSongList(res, (list: SongSheetList[]) => observer.next(list));
      })
    });
  }
  
  
  private generateSongList({ sheet, urls }, cb: (res: SongSheetList[]) => void) {
    const result = [];
    from(<SongSheet[]>sheet).pipe(mergeMap(item => {
      const url = <string>urls.find(url => url.id === item.id).url;
      return of({
        id: item.id,
        name: item.name,
        ar: item.ar,
        url
      });
    })).subscribe(
      res => {
        if (res.url) {
          result.push(res);
        }
      },
      error => console.error(error),
      () => cb(result)
    );
  }
  
  private concatSongList(id: number): Observable<{ sheet: SongSheet[]; urls: SongUrl[] }> {
    const detail$ =  this.getSongSheetDetail(id);
    return detail$.pipe(concatMap(sheet => {
      const ids = sheet.map(item => item.id).join(',');
      return this.getSongUrl(ids).pipe(map(urls => {
        return { sheet, urls: urls };
      }));
    }))
  }
  
  
  // 歌单详情
  private getSongSheetDetail(id: number): Observable<SongSheet[]> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.get(this.config + 'playlist/detail', { params })
      .pipe(
        map((res: {playlist: {tracks: SongSheet[]}}) => res.playlist.tracks),
        catchError(this.handleError)
      );
  }
  
  // 歌曲url列表
  private getSongUrl(id: string): Observable<SongUrl[]> {
    const params = new HttpParams().set('id', id);
    return this.http.get(this.config + 'song/url', { params })
      .pipe(
        map((res: {data: SongUrl[]}) => res.data),
        catchError(this.handleError)
      );
  }
  
  private handleError(error: HttpErrorResponse): never {
    throw new Error(error.error);
  };
}
