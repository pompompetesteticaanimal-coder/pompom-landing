// Compare calendar dates in the viewer's local timezone, without DST hour offsets.
export function christmasCountdown(now=new Date()){
 const year=now.getFullYear(),month=now.getMonth(),day=now.getDate();
 const christmasYear=month===11&&day>25?year+1:year;
 const days=Math.round((Date.UTC(christmasYear,11,25)-Date.UTC(year,month,day))/86400000);
 return {days,year:christmasYear};
}
