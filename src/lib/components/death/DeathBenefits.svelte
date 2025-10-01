<script lang="ts">
    import {HighestSalaryReceived, moneyFormat} from './shared.svelte.js';

    //intro guide for ease of use
    import { onMount } from "svelte";
    import introJs from "intro.js";
    import 'intro.js/introjs.css';

    onMount(() => {
        setTimeout(() => {
            introJs().setOptions({
                steps: [
                    {
                        element: ".next",
                        intro: 'Please click Next to proceed',
                        position: 'left'
                    }
                ],
                tooltipClass:"customTooltip",
                dontShowAgain: true,
                showBullets:false,
                showButtons:false,
                dontShowAgainCookie:'introLSCom',
                dontShowAgainCookieDays:7
            }).start();
        },1000);
    });
</script>
<h2 class="card-title">Calculate Death Benefits</h2>
    <div class="grid grid-cols-[auto,auto,2fr]">
        <div class="p-1 ">
            <span>Basepay (BP) <br> {HighestSalaryReceived.rank}</span>
        </div>
        <div class="p-1 "> = </div>
        <div class="p-1 text-right ">
            <span>₱ {moneyFormat(HighestSalaryReceived.retbp.toFixed(2))}</span>
        </div>
        <div class="p-1 font-bold">
            <span>GRATUITY <br>(BP X 12 mos)</span>
        </div>
        <div class="p-1 font-bold"> = </div>
        <div class="p-1 text-right font-bold">
            <span>₱ {moneyFormat((HighestSalaryReceived.retbp*12).toFixed(2))}</span>
        </div>
        <div class="p-1 font-bold">
            <span>BURIAL EXPENSES <br>(BP X 3 mos)</span>
        </div>
        <div class="p-1 font-bold"> = </div>
        <div class="p-1 text-right font-bold">
            <span>₱ {moneyFormat((HighestSalaryReceived.retbp*3).toFixed(2))}</span>
        </div>
        <div class="p-1 font-bold">
            <span>5 YEAR MONTHLY PENSION <br>(BP X 80%)</span>
        </div>
        <div class="p-1 font-bold"> = </div>
        <div class="p-1 text-right font-bold">
            <span>₱ {moneyFormat((HighestSalaryReceived.retbp*0.8).toFixed(2))}</span>
        </div>
    </div>

  
  