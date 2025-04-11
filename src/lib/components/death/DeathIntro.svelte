<script lang="ts">
    //intro guide for ease of use
    import { onMount } from "svelte";
    import introJs from "intro.js";
    import 'intro.js/introjs.css';
    import './custom.css';

    onMount(() => {
        setTimeout(() => {
            introJs().setOptions({
                steps: [
                    {
                        element: ".next",
                        intro: 'Please click to proceed',
                        position: 'left'
                    }
                ],
                tooltipClass:"customTooltip",
                dontShowAgain: true,
                showBullets:false,
                showButtons:false,
                dontShowAgainCookie:'introDeath',
                dontShowAgainCookieDays:7
            }).start();
        },1000);
    });
</script>
<h2 class="card-title mb-2">DEATH BENEFITS</h2>
<blockquote class="border-l-4 border-gray-500 pl-4 italic text-gray-700 text-justify w-80 mb-2">
"An officer or non-officer of the Bureau of Fire 
Protection who died in the performance of his duty or by reason of 
his office/position, upon resolution of the Line of Duty Board or 
Adjudication officer shall receive: (1) a gratuity equivalent to one 
(1) year salary; (2) Burial expenses equivalent to three (3) months 
salary; (3) Monthly pension equivalent to eighty percent (80%) of 
his/her salary for a period of five (5) years from the date of death. 
In case the BFP uniformed personnel was hospitalized before his 
death, the legal beneficiaries shall be reimbursed of any reasonable 
expenses for medicines, medical attendance, hospital fees, necessary 
transportation and subsistence expenses. Any deducted leave credits 
for absences for incapacity incurred in line of duty shall be restored. 
The salary in this sub section shall mean the base and longevity pay."
<b>-RESOLUTION NO. 2001-01 Section 18.1</b> 
</blockquote>
<p>Please refer to this link for <a href="/docs/compulsory" class="link link-info mb-2">documentary requirements</a>.</p>