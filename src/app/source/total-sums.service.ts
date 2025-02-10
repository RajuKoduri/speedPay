import { Injectable } from '@angular/core';
import { NumberFormatPipe } from '../pipe/number-format.pipe';

@Injectable({
  providedIn: 'root'
})
export class TotalSumsService {

  walletFormatslist: any;

  constructor(private numberPipe: NumberFormatPipe) { }

  ngOnInit() {
    // this.walletFormats()
  }

  walletFormats() {
    const walletFormats = localStorage.getItem('walletFormats')
    if (walletFormats) {
      this.walletFormatslist = JSON.parse(walletFormats)
    }
  }

  walletSymbol(wallet: any) {
    this.walletFormats()
    let symbol;
    this.walletFormatslist.forEach((list: any) => {
      if (wallet?.lowLong == list.guid?.lowLong) {
        if (list.currencyCode) {
          symbol = list.symbol
        }
      }
    })
    return symbol
  }

  calculateSum(data: any, amountType: any) {
    this.walletFormats()
    const totalAmount: any = {};

    data.forEach((currencyList: any) => {

      if (currencyList[amountType]) {

        const wallet = currencyList[amountType]?.wallet?.lowLong;
        const amount = Number(currencyList[amountType]?.value);
        // console.log(totalAmount)
        // console.log(wallet)
        if (totalAmount[wallet]) {
          totalAmount[wallet] += amount;
        } else {
          totalAmount[wallet] = amount;
        }
      }

    });
    console.log(totalAmount)
    this.walletFormatslist.forEach((list: any) => {
      const walletId = list.guid.lowLong;
      
      if (totalAmount[walletId]) {
        const amount = this.numberPipe.transform(totalAmount[walletId]);
        const symbol = list.symbol || '';
        totalAmount[walletId] = symbol ? `${symbol} ${amount}` : `${amount}`;
      } else {
      }
    });

    return totalAmount;
  }

  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  day - hour - min - convertion %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

  TimeFormat(value: any) {
    // return (Math.floor(myDuration / (1000 * 60 * 60 * 24)) + ": " + Math.floor(myDuration / (1000 * 60 * 60)) + ":" + Math.floor(myDuration / (1000 * 60)) % 60 + ":" + Math.floor(myDuration / 1000) % 60);

    let totalSeconds = Math.floor(value / 1000);

    const days = Math.floor(totalSeconds / 86400);
    totalSeconds %= 86400;
    const hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const formattedDays = days.toString().padStart(3, '0');
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    return `${formattedDays}d : ${formattedHours}h : ${formattedMinutes}m : ${formattedSeconds}s`;
  }



}
