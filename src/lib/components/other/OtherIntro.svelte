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
                dontShowAgainCookie:'introEtc',
                dontShowAgainCookieDays:7
            }).start();
        },1000);
    });
</script>
<h2 class="card-title">TERMINAL LEAVE</h2>
<blockquote class="border-l-4 border-gray-500 pl-4 italic text-gray-700 text-justify w-80">
"Terminal leave is applied for by an official or an employee who intends to sever his connection with his employer. Accordingly, the filling of application for terminal leave requires as a condition sine qua non, the employee’s resignation, retirement or separation from the service. It must be shown first that public employment ceased by any of the said modes of severances."
<b>-Provided for under CSC MC No. 41, s. 1998</b> 
</blockquote>
<p>Please refer to this link for <a href="/docs/other" class="link link-info">documentary requirements</a>.</p>