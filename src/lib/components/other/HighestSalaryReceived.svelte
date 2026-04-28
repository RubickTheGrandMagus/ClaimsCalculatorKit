<script lang="ts">
    import {YearsInSvc, HighestSalaryReceived, moneyFormat} from './shared.svelte.js';

    interface SalaryMatrix{
        rank:string,
        basepay:number
    }

    interface LongPayMatrix{
        pagi:number,
        rate:number
    }

    interface CalculateHSR{
        rank:string,
        bp:number,
        pagi:number,
        lp:number,
        hsr:number
    }

    interface SalaryTable{
        coverage:{
            startDate:string,
            endDate:string
        },
        salaryMatrix:SalaryMatrix[]
    }

    const salaryDatabase:SalaryTable[]=[
        {
            coverage:{startDate:"2028-01-01",endDate:"present"},
            salaryMatrix:[
                        {rank:"FO1 (SG 10)",basepay:34118},
                        {rank:"FO2 (SG 12)",basepay:35497},
                        {rank:"FO3 (SG 14)",basepay:36931},
                        {rank:"SFO1 (SG 16)",basepay:38423},
                        {rank:"SFO2 (SG 17)",basepay:39191},
                        {rank:"SFO3 (SG 18)",basepay:39975},
                        {rank:"SFO4 (SG 19)",basepay:44121},
                        {rank:"FINSP (SG 22)",basepay:56957},
                        {rank:"FSINSP (SG 23)",basepay:65069},
                        {rank:"FCINSP (SG 24)",basepay:71938},
                        {rank:"FSUPT (SG 25)",basepay:82010},
                        {rank:"FSSUPT (SG 26)",basepay:92670},
                        {rank:"FCSUPT (SG 27)",basepay:104717},
                        {rank:"FDIR (SG 28)",basepay:118330}
            ]   
        },
        {
            coverage:{startDate:"2027-01-01",endDate:"2027-12-31"},
            salaryMatrix:[
                        {rank:"FO1 (SG 10)",basepay:32412},
                        {rank:"FO2 (SG 12)",basepay:33722},
                        {rank:"FO3 (SG 14)",basepay:35085},
                        {rank:"SFO1 (SG 16)",basepay:36502},
                        {rank:"SFO2 (SG 17)",basepay:37231},
                        {rank:"SFO3 (SG 18)",basepay:37976},
                        {rank:"SFO4 (SG 19)",basepay:41915},
                        {rank:"FINSP (SG 22)",basepay:54109},
                        {rank:"FSINSP (SG 23)",basepay:61816},
                        {rank:"FCINSP (SG 24)",basepay:68341},
                        {rank:"FSUPT (SG 25)",basepay:77909},
                        {rank:"FSSUPT (SG 26)",basepay:88037},
                        {rank:"FCSUPT (SG 27)",basepay:99481},
                        {rank:"FDIR (SG 28)",basepay:112414}
            ]   
        },
        {
            coverage:{startDate:"2026-01-01",endDate:"2026-12-31"},
            salaryMatrix:[
                        {rank:"FO1 (SG 10)",basepay:31151},
                        {rank:"FO2 (SG 12)",basepay:32410},
                        {rank:"FO3 (SG 14)",basepay:33720},
                        {rank:"SFO1 (SG 16)",basepay:35082},
                        {rank:"SFO2 (SG 17)",basepay:35783},
                        {rank:"SFO3 (SG 18)",basepay:36499},
                        {rank:"SFO4 (SG 19)",basepay:40284},
                        {rank:"FINSP (SG 22)",basepay:52004},
                        {rank:"FSINSP (SG 23)",basepay:59411},
                        {rank:"FCINSP (SG 24)",basepay:65683},
                        {rank:"FSUPT (SG 25)",basepay:74879},
                        {rank:"FSSUPT (SG 26)",basepay:84612},
                        {rank:"FCSUPT (SG 27)",basepay:95611},
                        {rank:"FDIR (SG 28)",basepay:108041}
            ]   
        },
        {
            coverage:{startDate:"2019-01-01",endDate:"2025-12-31"},
            salaryMatrix:[
                        {rank:"FO1 (SG 10)",basepay:29668},
                        {rank:"FO2 (SG 12)",basepay:30867},
                        {rank:"FO3 (SG 14)",basepay:32114},
                        {rank:"SFO1 (SG 16)",basepay:33411},
                        {rank:"SFO2 (SG 17)",basepay:34079},
                        {rank:"SFO3 (SG 18)",basepay:34761},
                        {rank:"SFO4 (SG 19)",basepay:38366},
                        {rank:"FINSP (SG 22)",basepay:49528},
                        {rank:"FSINSP (SG 23)",basepay:56582},
                        {rank:"FCINSP (SG 24)",basepay:62555},
                        {rank:"FSUPT (SG 25)",basepay:71313},
                        {rank:"FSSUPT (SG 26)",basepay:80583},
                        {rank:"FCSUPT (SG 27)",basepay:91058},
                        {rank:"FDIR (SG 28)",basepay:102896}
            ]   
        },
        {
            coverage:{startDate:"2018-01-01",endDate:"2018-12-31"},
            salaryMatrix:[
                        {rank:"FO1 (SG 10)",basepay:29668},
                        {rank:"FO2 (SG 12)",basepay:30867},
                        {rank:"FO3 (SG 14)",basepay:32114},
                        {rank:"SFO1 (SG 16)",basepay:33411},
                        {rank:"SFO2 (SG 17)",basepay:34079},
                        {rank:"SFO3 (SG 18)",basepay:34761},
                        {rank:"SFO4 (SG 19)",basepay:35456},
                        {rank:"FINSP (SG 22)",basepay:43685},
                        {rank:"FSINSP (SG 23)",basepay:49801},
                        {rank:"FCINSP (SG 24)",basepay:54799},
                        {rank:"FSUPT (SG 25)",basepay:61375},
                        {rank:"FSSUPT (SG 26)",basepay:68740},
                        {rank:"FCSUPT (SG 27)",basepay:76989},
                        {rank:"FDIR (SG 28)",basepay:86228}
            ]  
        },
        {
            coverage:{startDate:"2012-06-01",endDate:"2017-12-31"},
            salaryMatrix:[
                        {rank:"FO1 (SG 10)",basepay:14834},
                        {rank:"FO2 (SG 12)",basepay:16934},
                        {rank:"FO3 (SG 14)",basepay:18665},
                        {rank:"SFO1 (SG 16)",basepay:21771},
                        {rank:"SFO2 (SG 17)",basepay:23513},
                        {rank:"SFO3 (SG 18)",basepay:25394},
                        {rank:"SFO4 (SG 19)",basepay:27425},
                        {rank:"FINSP (SG 22)",basepay:32341},
                        {rank:"FSINSP (SG 23)",basepay:35312},
                        {rank:"FCINSP (SG 24)",basepay:37313},
                        {rank:"FSUPT (SG 25)",basepay:40298},
                        {rank:"FSSUPT (SG 26)",basepay:43521},
                        {rank:"FCSUPT (SG 27)",basepay:47002},
                        {rank:"FDIR (SG 28)",basepay:50763}
            ]  
        },
        {
            coverage:{startDate:"2011-06-01",endDate:"2012-05-31"},
            salaryMatrix:[
                        {rank:"FO1 (SG 10)",basepay:13492},
                        {rank:"FO2 (SG 12)",basepay:15359},
                        {rank:"FO3 (SG 14)",basepay:16986},
                        {rank:"SFO1 (SG 16)",basepay:19685},
                        {rank:"SFO2 (SG 17)",basepay:21193},
                        {rank:"SFO3 (SG 18)",basepay:22817},
                        {rank:"SFO4 (SG 19)",basepay:24567},
                        {rank:"FINSP (SG 22)",basepay:28839},
                        {rank:"FSINSP (SG 23)",basepay:31251},
                        {rank:"FCINSP (SG 24)",basepay:32942},
                        {rank:"FSUPT (SG 25)",basepay:35380},
                        {rank:"FSSUPT (SG 26)",basepay:38003},
                        {rank:"FCSUPT (SG 27)",basepay:40828},
                        {rank:"FDIR (SG 28)",basepay:43872}
            ]  
        },
        {
            coverage:{startDate:"2010-06-24",endDate:"2011-05-31"},
            salaryMatrix:[
                        {rank:"FO1 (SG 10)",basepay:12150},
                        {rank:"FO2 (SG 12)",basepay:13785},
                        {rank:"FO3 (SG 14)",basepay:15307},
                        {rank:"SFO1 (SG 16)",basepay:17599},
                        {rank:"SFO2 (SG 17)",basepay:18873},
                        {rank:"SFO3 (SG 18)",basepay:20241},
                        {rank:"SFO4 (SG 19)",basepay:21709},
                        {rank:"FINSP (SG 22)",basepay:25338},
                        {rank:"FSINSP (SG 23)",basepay:27190},
                        {rank:"FCINSP (SG 24)",basepay:28572},
                        {rank:"FSUPT (SG 25)",basepay:30461},
                        {rank:"FSSUPT (SG 26)",basepay:32485},
                        {rank:"FCSUPT (SG 27)",basepay:34655},
                        {rank:"FDIR (SG 28)",basepay:36981}
            ]  
        },
        {
            coverage:{startDate:"2009-07-01",endDate:"2010-06-23"},
            salaryMatrix:[
                        {rank:"FO1 (SG 10)",basepay:10808},
                        {rank:"FO2 (SG 12)",basepay:12210},
                        {rank:"FO3 (SG 14)",basepay:13628},
                        {rank:"SFO1 (SG 16)",basepay:15513},
                        {rank:"SFO2 (SG 17)",basepay:16552},
                        {rank:"SFO3 (SG 18)",basepay:17664},
                        {rank:"SFO4 (SG 19)",basepay:18850},
                        {rank:"FINSP (SG 22)",basepay:21836},
                        {rank:"FSINSP (SG 23)",basepay:23128},
                        {rank:"FCINSP (SG 24)",basepay:24202},
                        {rank:"FSUPT (SG 25)",basepay:25543},
                        {rank:"FSSUPT (SG 26)",basepay:26967},
                        {rank:"FCSUPT (SG 27)",basepay:28481},
                        {rank:"FDIR (SG 28)",basepay:30090}
            ]  
        },
        {
            coverage:{startDate:"2008-07-01",endDate:"2009-06-30"},
            salaryMatrix:[
                        {rank:"FO1 (SG 10)",basepay:9466},
                        {rank:"FO2 (SG 12)",basepay:10635},
                        {rank:"FO3 (SG 14)",basepay:11949},
                        {rank:"SFO1 (SG 16)",basepay:13427},
                        {rank:"SFO2 (SG 17)",basepay:14232},
                        {rank:"SFO3 (SG 18)",basepay:15087},
                        {rank:"SFO4 (SG 19)",basepay:15992},
                        {rank:"FINSP (SG 22)",basepay:18334},
                        {rank:"FSINSP (SG 23)",basepay:19067},
                        {rank:"FCINSP (SG 24)",basepay:19831},
                        {rank:"FSUPT (SG 25)",basepay:20624},
                        {rank:"FSSUPT (SG 26)",basepay:21449},
                        {rank:"FCSUPT (SG 27)",basepay:22307},
                        {rank:"FDIR (SG 28)",basepay:23199}
            ]  
        },
        {
            coverage:{startDate:"2007-01-01",endDate:"2008-06-30"},
            salaryMatrix:[
                        {rank:"FO1 (SG 10)",basepay:8605},
                        {rank:"FO2 (SG 12)",basepay:9668},
                        {rank:"FO3 (SG 14)",basepay:10863},
                        {rank:"SFO1 (SG 16)",basepay:12206},
                        {rank:"SFO2 (SG 17)",basepay:12938},
                        {rank:"SFO3 (SG 18)",basepay:13715},
                        {rank:"SFO4 (SG 19)",basepay:14538},
                        {rank:"FINSP (SG 22)",basepay:16667},
                        {rank:"FSINSP (SG 23)",basepay:17334},
                        {rank:"FCINSP (SG 24)",basepay:18028},
                        {rank:"FSUPT (SG 25)",basepay:18749},
                        {rank:"FSSUPT (SG 26)",basepay:19499},
                        {rank:"FCSUPT (SG 27)",basepay:20279},
                        {rank:"FDIR (SG 28)",basepay:21090}
            ]  
        },
        {
            coverage:{startDate:"2006-01-01",endDate:"2006-12-31"},
            salaryMatrix:[
                        {rank:"FO1 (SG 10)",basepay:7897},
                        {rank:"FO2 (SG 12)",basepay:8781},
                        {rank:"FO3 (SG 14)",basepay:9764},
                        {rank:"SFO1 (SG 16)",basepay:11003},
                        {rank:"SFO2 (SG 17)",basepay:11667},
                        {rank:"SFO3 (SG 18)",basepay:12509},
                        {rank:"SFO4 (SG 19)",basepay:13358},
                        {rank:"FINSP (SG 22)",basepay:15965},
                        {rank:"FSINSP (SG 23)",basepay:16581},
                        {rank:"FCINSP (SG 24)",basepay:17246},
                        {rank:"FSUPT (SG 25)",basepay:17931},
                        {rank:"FSSUPT (SG 26)",basepay:18667},
                        {rank:"FCSUPT (SG 27)",basepay:19483},
                        {rank:"FDIR (SG 28)",basepay:20235}
            ]  
        },
        {
            coverage:{startDate:"2005-01-01",endDate:"2005-12-31"},
            salaryMatrix:[
                        {rank:"FO1 (SG 10)",basepay:6695},
                        {rank:"FO2 (SG 12)",basepay:7274},
                        {rank:"FO3 (SG 14)",basepay:7896},
                        {rank:"SFO1 (SG 16)",basepay:8957},
                        {rank:"SFO2 (SG 17)",basepay:9507},
                        {rank:"SFO3 (SG 18)",basepay:10460},
                        {rank:"SFO4 (SG 19)",basepay:11352},
                        {rank:"FINSP (SG 22)",basepay:14772},
                        {rank:"FSINSP (SG 23)",basepay:15301},
                        {rank:"FCINSP (SG 24)",basepay:15916},
                        {rank:"FSUPT (SG 25)",basepay:16541},
                        {rank:"FSSUPT (SG 26)",basepay:17252},
                        {rank:"FCSUPT (SG 27)",basepay:18129},
                        {rank:"FDIR (SG 28)",basepay:18782}
            ]  
        },
        {
            coverage:{startDate:"2004-01-01",endDate:"2004-12-31"},
            salaryMatrix:[
                        {rank:"FO1 (SG 10)",basepay:6200},
                        {rank:"FO2 (SG 12)",basepay:6653},
                        {rank:"FO3 (SG 14)",basepay:7127},
                        {rank:"SFO1 (SG 16)",basepay:8115},
                        {rank:"SFO2 (SG 17)",basepay:8617},
                        {rank:"SFO3 (SG 18)",basepay:9616},
                        {rank:"SFO4 (SG 19)",basepay:10526},
                        {rank:"FINSP (SG 22)",basepay:14281},
                        {rank:"FSINSP (SG 23)",basepay:14774},
                        {rank:"FCINSP (SG 24)",basepay:15369},
                        {rank:"FSUPT (SG 25)",basepay:15968},
                        {rank:"FSSUPT (SG 26)",basepay:16669},
                        {rank:"FCSUPT (SG 27)",basepay:17572},
                        {rank:"FDIR (SG 28)",basepay:18184}
            ]  
        },
        {
            coverage:{startDate:"2001-07-01",endDate:"2003-12-31"},
            salaryMatrix:[
                        {rank:"FO1 (SG 10)",basepay:5775},
                        {rank:"FO2 (SG 12)",basepay:6121},
                        {rank:"FO3 (SG 14)",basepay:6468},
                        {rank:"SFO1 (SG 16)",basepay:7393},
                        {rank:"SFO2 (SG 17)",basepay:7854},
                        {rank:"SFO3 (SG 18)",basepay:8893},
                        {rank:"SFO4 (SG 19)",basepay:9818},
                        {rank:"FINSP (SG 22)",basepay:13860},
                        {rank:"FSINSP (SG 23)",basepay:14322},
                        {rank:"FCINSP (SG 24)",basepay:14900},
                        {rank:"FSUPT (SG 25)",basepay:15477},
                        {rank:"FSSUPT (SG 26)",basepay:16170},
                        {rank:"FCSUPT (SG 27)",basepay:17094},
                        {rank:"FDIR (SG 28)",basepay:17671}
            ]  
        },
        {
            coverage:{startDate:"2000-01-01",endDate:"2001-06-30"},
            salaryMatrix:[
                        {rank:"FO1 (SG 10)",basepay:5500},
                        {rank:"FO2 (SG 12)",basepay:5830},
                        {rank:"FO3 (SG 14)",basepay:6160},
                        {rank:"SFO1 (SG 16)",basepay:7040},
                        {rank:"SFO2 (SG 17)",basepay:7480},
                        {rank:"SFO3 (SG 18)",basepay:8470},
                        {rank:"SFO4 (SG 19)",basepay:9350},
                        {rank:"FINSP (SG 22)",basepay:13200},
                        {rank:"FSINSP (SG 23)",basepay:13640},
                        {rank:"FCINSP (SG 24)",basepay:14190},
                        {rank:"FSUPT (SG 25)",basepay:14740},
                        {rank:"FSSUPT (SG 26)",basepay:15400},
                        {rank:"FCSUPT (SG 27)",basepay:18280},
                        {rank:"FDIR (SG 28)",basepay:18830}
            ]  
        },
        {
            coverage:{startDate:"1997-11-01",endDate:"1999-12-31"},
            salaryMatrix:[
                        {rank:"FO1 (SG 10)",basepay:5000},
                        {rank:"FO2 (SG 12)",basepay:5300},
                        {rank:"FO3 (SG 14)",basepay:5600},
                        {rank:"SFO1 (SG 16)",basepay:6400},
                        {rank:"SFO2 (SG 17)",basepay:6800},
                        {rank:"SFO3 (SG 18)",basepay:7700},
                        {rank:"SFO4 (SG 19)",basepay:8500},
                        {rank:"FINSP (SG 22)",basepay:12000},
                        {rank:"FSINSP (SG 23)",basepay:12400},
                        {rank:"FCINSP (SG 24)",basepay:12900},
                        {rank:"FSUPT (SG 25)",basepay:13400},
                        {rank:"FSSUPT (SG 26)",basepay:14000},
                        {rank:"FCSUPT (SG 27)",basepay:14800},
                        {rank:"FDIR (SG 28)",basepay:15300}
            ]  
        },
        {
            coverage:{startDate:"1997-01-01",endDate:"1997-10-31"},
            salaryMatrix:[
                        {rank:"FO1 (SG 10)",basepay:4600},
                        {rank:"FO2 (SG 12)",basepay:4700},
                        {rank:"FO3 (SG 14)",basepay:4900},
                        {rank:"SFO1 (SG 16)",basepay:5400},
                        {rank:"SFO2 (SG 17)",basepay:5700},
                        {rank:"SFO3 (SG 18)",basepay:6335},
                        {rank:"SFO4 (SG 19)",basepay:6995},
                        {rank:"FINSP (SG 22)",basepay:9620},
                        {rank:"FSINSP (SG 23)",basepay:10055},
                        {rank:"FCINSP (SG 24)",basepay:10730},
                        {rank:"FSUPT (SG 25)",basepay:11230},
                        {rank:"FSSUPT (SG 26)",basepay:11795},
                        {rank:"FCSUPT (SG 27)",basepay:12840},
                        {rank:"FDIR (SG 28)",basepay:13340}
            ]  
        },
        {
            coverage:{startDate:"1996-01-01",endDate:"1996-12-31"},
            salaryMatrix:[
                        {rank:"FO1 (SG 10)",basepay:3800},
                        {rank:"FO2 (SG 12)",basepay:3900},
                        {rank:"FO3 (SG 14)",basepay:4100},
                        {rank:"SFO1 (SG 16)",basepay:4400},
                        {rank:"SFO2 (SG 17)",basepay:4600},
                        {rank:"SFO3 (SG 18)",basepay:4970},
                        {rank:"SFO4 (SG 19)",basepay:5490},
                        {rank:"FINSP (SG 22)",basepay:7240},
                        {rank:"FSINSP (SG 23)",basepay:7710},
                        {rank:"FCINSP (SG 24)",basepay:8560},
                        {rank:"FSUPT (SG 25)",basepay:9060},
                        {rank:"FSSUPT (SG 26)",basepay:9590},
                        {rank:"FCSUPT (SG 27)",basepay:10880},
                        {rank:"FDIR (SG 28)",basepay:11380}
            ]  
        },
        {
            coverage:{startDate:"1995-01-01",endDate:"1995-12-31"},
            salaryMatrix:[
                        {rank:"FO1 (SG 10)",basepay:2800},
                        {rank:"FO2 (SG 12)",basepay:2900},
                        {rank:"FO3 (SG 14)",basepay:3100},
                        {rank:"SFO1 (SG 16)",basepay:3400},
                        {rank:"SFO2 (SG 17)",basepay:3600},
                        {rank:"SFO3 (SG 18)",basepay:3800},
                        {rank:"SFO4 (SG 19)",basepay:4200},
                        {rank:"FINSP (SG 22)",basepay:5200},
                        {rank:"FSINSP (SG 23)",basepay:5700},
                        {rank:"FCINSP (SG 24)",basepay:6700},
                        {rank:"FSUPT (SG 25)",basepay:7200},
                        {rank:"FSSUPT (SG 26)",basepay:7700},
                        {rank:"FCSUPT (SG 27)",basepay:9200},
                        {rank:"FDIR (SG 28)",basepay:9700}
            ]  
        },
        {
            coverage:{startDate:"1994-01-01",endDate:"1994-12-31"},
            salaryMatrix:[
                        {rank:"FO1 (SG 10)",basepay:1800},
                        {rank:"FO2 (SG 12)",basepay:1900},
                        {rank:"FO3 (SG 14)",basepay:2100},
                        {rank:"SFO1 (SG 16)",basepay:2400},
                        {rank:"SFO2 (SG 17)",basepay:2600},
                        {rank:"SFO3 (SG 18)",basepay:2800},
                        {rank:"SFO4 (SG 19)",basepay:3200},
                        {rank:"FINSP (SG 22)",basepay:4200},
                        {rank:"FSINSP (SG 23)",basepay:4700},
                        {rank:"FCINSP (SG 24)",basepay:5700},
                        {rank:"FSUPT (SG 25)",basepay:6200},
                        {rank:"FSSUPT (SG 26)",basepay:6700},
                        {rank:"FCSUPT (SG 27)",basepay:8200},
                        {rank:"FDIR (SG 28)",basepay:8700}
            ]  
        },
        {
            coverage:{startDate:"1991-01-29",endDate:"1993-12-31"},
            salaryMatrix:[
                        {rank:"FO1 (SG 10)",basepay:1000},
                        {rank:"FO2 (SG 12)",basepay:1100},
                        {rank:"FO3 (SG 14)",basepay:1300},
                        {rank:"SFO1 (SG 16)",basepay:1600},
                        {rank:"SFO2 (SG 17)",basepay:1800},
                        {rank:"SFO3 (SG 18)",basepay:2000},
                        {rank:"SFO4 (SG 19)",basepay:2400},
                        {rank:"FINSP (SG 22)",basepay:3500},
                        {rank:"FSINSP (SG 23)",basepay:4000},
                        {rank:"FCINSP (SG 24)",basepay:5000},
                        {rank:"FSUPT (SG 25)",basepay:5500},
                        {rank:"FSSUPT (SG 26)",basepay:6000},
                        {rank:"FCSUPT (SG 27)",basepay:7500},
                        {rank:"FDIR (SG 28)",basepay:8000}
            ]  
        }
    ];

    let salaryGrade:SalaryMatrix[]=$state(findSalaryMatrix());

    let longevityPay:LongPayMatrix[]=[
        {pagi:5,rate:0.5},
        {pagi:4,rate:0.4641},
        {pagi:3,rate:0.331},
        {pagi:2,rate:0.21},
        {pagi:1,rate:0.1},
        {pagi:0,rate:0}
    ];

    let disabled:boolean = YearsInSvc.isNUP;
    let personnel:CalculateHSR = $state({
        rank:(HighestSalaryReceived.rank!="")? HighestSalaryReceived.rank:"",
        bp:(HighestSalaryReceived.bp!=0)? HighestSalaryReceived.bp:0,
        pagi:Math.floor(YearsInSvc.allService.bfp.years/5),
        lp:(HighestSalaryReceived.lp!=0)? HighestSalaryReceived.lp:0,
        hsr:(HighestSalaryReceived.hsr!=0)? HighestSalaryReceived.hsr:0
    });
    personnel.pagi = personnel.pagi>5 ? 5:personnel.pagi;
    personnel.rank = YearsInSvc.isNUP ? "NUP": HighestSalaryReceived.rank;

    function getPagi(){
        personnel.pagi = Math.floor(YearsInSvc.allService.bfp.years/5);
        personnel.pagi = personnel.pagi>5 ? 5:personnel.pagi;
    }
    function findSalaryMatrix(){
        let sepdate = new Date(YearsInSvc.dos);

        if(YearsInSvc.dos=="" || sepdate>=(new Date("2028-01-01"))){
            return salaryDatabase[0].salaryMatrix;
        }

        let index = salaryDatabase.findIndex(t=>sepdate>(new Date(t.coverage.startDate)) && sepdate<(new Date(t.coverage.endDate)));
        return salaryDatabase[index].salaryMatrix;
    }

    function computeHSR(){
        if(personnel.rank=="NUP"){
            personnel.hsr = personnel.bp;
            personnel.pagi = 0;
            personnel.lp = 0;            
        }else{
            getPagi();
            let index = salaryGrade.findIndex(t=>t.rank == personnel.rank);
            let index2 = longevityPay.findIndex(t=>t.pagi == personnel.pagi);
    
            personnel.bp = salaryGrade[index].basepay;
            personnel.lp = salaryGrade[index].basepay * longevityPay[index2].rate;
            personnel.hsr = personnel.bp + parseFloat(personnel.lp.toFixed(2));
        }

        HighestSalaryReceived.rank = personnel.rank;
        HighestSalaryReceived.bp = personnel.bp;
        HighestSalaryReceived.pagi = personnel.pagi;
        HighestSalaryReceived.lp = parseFloat(personnel.lp.toFixed(2)); 
        HighestSalaryReceived.hsr = parseFloat(personnel.hsr.toFixed(2));
    }
    //reload when date of retirement changes
    if(YearsInSvc.dos!="" && HighestSalaryReceived.rank!=""){
        salaryGrade = findSalaryMatrix();
        computeHSR();
    }

    //intro guide for ease of use
    import { onMount } from "svelte";
    import introJs from "intro.js";
    import 'intro.js/introjs.css';

    onMount(() => {
        setTimeout(() => {
            introJs().setOptions({
                steps: [
                    {
                        element: 'label[for="rank"]',
                        intro: 'Please enter your Rank'
                    }
                    
                ],
                dontShowAgain: true,
                showBullets:false,
                showButtons:false,
                dontShowAgainCookie:'introHSREtc',
                dontShowAgainCookieDays:7
            }).start();
        }, 1000);
    });
</script>
<div class="flex items-center justify-between mb-8 pb-4 border-b border-base-200">
    <div>
        <h2 class="text-2xl font-extrabold text-primary flex items-center gap-3 drop-shadow-sm uppercase tracking-wider">
            Highest Salary Received
        </h2>
        <p class="text-base-content/60 text-sm mt-1">Determine your terminal pay bracket based on rank and longevity.</p>
    </div>
</div>

<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
    <div class="bg-base-200 p-6 sm:p-8 rounded-2xl shadow-inner border border-base-300 flex flex-col gap-6">
        <h3 class="text-sm font-bold uppercase tracking-wider text-base-content/70 border-b border-base-300 pb-2">Salary Information</h3>
        
        <div class="form-control w-full">
            <label for="rank" class="label pb-1">
                <span class="label-text font-bold text-sm">Rank</span>
            </label>
            <select id="rank" class="select select-bordered select-lg w-full font-bold bg-base-100 transition-all focus:select-primary focus:shadow-md {personnel.rank == 'NUP' ? 'select-success' : ''}" bind:value={personnel.rank} onchange={()=>computeHSR()} {disabled}>
                <option disabled selected>Select Current Rank</option>
                <option value="NUP" class="font-bold text-success">Non-Uniformed Personnel (NUP)</option>
                <optgroup label="Uniformed Personnel">
                    {#each salaryGrade as salary}
                        {#if salary.rank != "FDIR (SG 28)"}
                            <option value={salary.rank}>{salary.rank}</option>
                        {/if}
                    {/each}
                </optgroup>
            </select>
        </div>

        {#if personnel.rank == "NUP"}
            <div class="form-control w-full animate-in slide-in-from-top-2">
                <label for="basepay" class="label pb-1">
                    <span class="label-text font-bold text-sm text-success">Custom Base Pay</span>
                </label>
                <div class="join">
                    <span class="join-item bg-success/20 text-success font-bold flex items-center px-4 border border-success/30 rounded-l-lg">₱</span>
                    <input id="basepay" type="number" step="0.01" min="0" class="input input-bordered input-success text-right w-full join-item font-mono text-lg bg-base-100 transition-all focus:shadow-md" bind:value={personnel.bp} onchange={()=>computeHSR()} onkeyup={()=>computeHSR()} placeholder="0.00"/>
                </div>
            </div>
        {/if}

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            <div class="bg-base-100 p-4 rounded-xl border border-base-200 flex flex-col items-center justify-center text-center shadow-sm">
                <span class="text-xs uppercase font-bold text-base-content/60 mb-1">Base Pay</span>
                <span class="font-mono text-xl font-bold {personnel.rank == 'NUP' ? 'text-success' : 'text-primary'}">₱ {moneyFormat(personnel.bp.toFixed(2))}</span>
            </div>
            <div class="bg-base-100 p-4 rounded-xl border border-base-200 flex flex-col items-center justify-center text-center shadow-sm {personnel.rank == 'NUP' ? 'opacity-50 grayscale' : ''}">
                <span class="text-xs uppercase font-bold text-base-content/60 mb-1">Longevity Pay <span class="badge badge-sm badge-neutral ml-1">PI: {personnel.pagi}</span></span>
                <span class="font-mono text-xl font-bold text-secondary">₱ {moneyFormat(personnel.lp.toFixed(2))}</span>
            </div>
        </div>
    </div>

    <div class="flex flex-col gap-6 lg:sticky lg:top-8">
        <div class="relative bg-primary p-6 sm:p-8 rounded-3xl text-primary-content shadow-xl overflow-hidden min-h-[300px] flex flex-col items-center justify-center text-center">
            <div class="absolute -right-16 -bottom-16 opacity-10 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-64 h-64"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            
            <h3 class="text-sm font-bold uppercase tracking-widest opacity-80 mb-6 drop-shadow-sm relative z-10 w-full">Highest Salary Received</h3>
            
            <div class="bg-base-100/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-base-100/20 shadow-inner w-full flex flex-col items-center group hover:bg-base-100/20 transition-all relative z-10">
                <span class="text-xl sm:text-2xl font-black opacity-80 mb-2">₱</span>
                <span class="font-mono text-4xl sm:text-5xl lg:text-6xl font-black drop-shadow-md tracking-tight">{moneyFormat(personnel.hsr.toFixed(2))}</span>
            </div>
            
            {#if personnel.hsr > 0}
                <div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-success/0 via-success to-success/0"></div>
            {/if}
        </div>
    </div>
</div>