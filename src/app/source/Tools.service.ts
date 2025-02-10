import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor(private http: HttpClient) { }

  getNewsList(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Tools.getNewsList}`, data, this.httpOptions(),)
  }
  getNews(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Tools.getNews}`, data, this.httpOptions(),)
  }
  setNews(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Tools.setNews}`, data, this.httpOptions(),)
  }
  publishNews(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Tools.publishNews}`, data, this.httpOptions(),)
  }
  archiveNews(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Tools.archiveNews}`, data, this.httpOptions(),)
  }
  deleteNews(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Tools.deleteNews}`, data, this.httpOptions(),)
  }
  getActiveQueries(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Tools.getActiveQueries}`, data, this.httpOptions(),)
  }
  getMailTemplatesByType(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Tools.getMailTemplatesByType}`, data, this.httpOptions(),)
  } 
  getWmMailingList(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Tools.getWmMailingList}`, data, this.httpOptions(),)
  } 
  getMailingList(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Tools.getMailingList}`, data, this.httpOptions(),)
  } 
  getBonusMailingList(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Tools.getBonusMailingList}`, data, this.httpOptions(),)
  } 
  sendBonusListMail(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Tools.sendBonusListMail}`, data, this.httpOptions(),)
  } 
  sendWmMail(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Tools.sendWmMail}`, data, this.httpOptions(),)
  } 
  sendMail(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Tools.sendMail}`, data, this.httpOptions(),)
  } 
  changeMailingListRecordState(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Tools.changeMailingListRecordState}`, data, this.httpOptions(),)
  } 
  getCategories(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Tools.getCategories}`, data, this.httpOptions(),)
  } 
  delCategory(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Tools.delCategory}`, data, this.httpOptions(),)
  } 
  getMailTemplates(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Tools.getMailTemplates}`, data, this.httpOptions(),)
  } 
  setMailTemplate(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Tools.setMailTemplate}`, data, this.httpOptions(),)
  } 
  delMailTemplates(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Tools.delMailTemplates}`, data, this.httpOptions(),)
  } 
  getMailTemplateParameters(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Tools.getMailTemplateParameters}`, data, this.httpOptions(),)
  } 
  getMailTemplateText(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Tools.getMailTemplateText}`, data, this.httpOptions(),)
  } 
  getMailingSettings(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Tools.getMailingSettings}`, data, this.httpOptions(),)
  } 
  
  skinReport(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Reports.skinReport}`, data, this.httpOptions(),)
  } 
  getSkinReportBySessions(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Reports.getSkinReportBySessions}`, data, this.httpOptions(),)
  } 
  getSkinsDateAggr(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Reports.getSkinsDateAggr}`, data, this.httpOptions(),)
  } 
  getSkinsMoneyReport(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Reports.getSkinsMoneyReport}`, data, this.httpOptions(),)
  } 
  summaryReport(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Reports.summaryReport}`, data, this.httpOptions(),)
  } 
  rakeRaceReport(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Reports.rakeRaceReport}`, data, this.httpOptions(),)
  } 
  getPlayerRakeReport(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Reports.getPlayerRakeReport}`, data, this.httpOptions(),)
  } 
  getLeaderBoardReport(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Reports.getLeaderBoardReport}`, data, this.httpOptions(),)
  } 
  getPlayerAct(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Reports.getPlayerAct}`, data,this.httpOptions(),)
  } 
  getPokerScoutStatistics(data: any) {
    return this.http.get<any>(`${environment.api.baseUrl}${environment.api.getPokerScoutStatistics}`, data,)
  } 
  getOnlineStats(data: any) {
    return this.http.get<any>(`${environment.api.baseUrl}${environment.api.getOnlineStats}`, data,)
  } 
  getRequestedReports(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.RequestedReports.getRequestedReports}`, data, this.httpOptions(),)
  }
  cancelRequestedReport(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.RequestedReports.cancelRequestedReport}`, data, this.httpOptions(),)
  }
  deleteRequestedReport(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.RequestedReports.deleteRequestedReport}`, data, this.httpOptions(),)
  }
  httpOptions() {
    let ws = JSON.stringify(sessionStorage.getItem('wsession'))
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'wsession': JSON.parse(ws),
      })
    };

    return options;
  }
}
