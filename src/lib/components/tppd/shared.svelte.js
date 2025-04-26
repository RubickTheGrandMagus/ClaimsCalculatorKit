export const YearsInSvc = $state({
    dob:"",des:"",dor:"",total:{y:0,m:0,d:0},allService:{gov:{state:false,years:0,months:0,days:0},suspension:{state:false,years:0,months:0,days:0},bfp:{years:0,months:0,days:0}},error:{state:false,text:""}
});
export const HighestSalaryReceived = $state({
    rank:"",retrank:"",bp:0,pagi:0,lp:0,hsr:0
});
export const LeaveCreditsData = $state({
    enjoyedSLVL:0
});
/**
 * Function to format a number string with commas
 * @param {string} a - a number string
 * @returns {string} a string with commas
 */
export function moneyFormat(a){
    return a.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}