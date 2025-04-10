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
                dontShowAgainCookie:'introMone',
                dontShowAgainCookieDays:7
            }).start();
        },1000);
    });
</script>
<h2 class="card-title">MONETIZATION OF LEAVE CREDITS</h2>
<blockquote class="border-l-4 border-gray-500 pl-4 italic text-gray-700 text-justify w-80">
"Officials and employees in the career and non-career service whether permanent, temporary, casual, or coterminous, who have accumulated fifteen (15) days of vacation leave credits shall be allowed to monetize a minimum of ten (10) days; Provided, that at least five (5) days is retained after monetization and provided further that a maximum of thirty (30) days may be monetized in a given year."
<b>-Provided for under CSC MC No. 41, s. 1998</b> 
</blockquote>
<p>Please refer to this link for <a href="/docs/mone" class="link link-info">documentary requirements</a>.</p>