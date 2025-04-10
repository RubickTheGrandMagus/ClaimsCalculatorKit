<script lang="ts">
    //intro guide for ease of use
    import { onMount } from "svelte";
    import introJs from "intro.js";
    import 'intro.js/introjs.css';
    import './custom.css';

    onMount(() => {
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
            dontShowAgainCookie:'introCom',
            dontShowAgainCookieDays:7
        }).start();
    });
</script>
<h2 class="card-title mb-2">COMPULSORY RETIREMENT</h2>
<blockquote class="border-l-4 border-gray-500 pl-4 italic text-gray-700 text-justify w-80 mb-2">
"Upon attaining fifty-six (56) years of age with at least ten (10) years of active service, an officer or on-officer shall be compulsorily retired under this Resolution: Provided, that an officer with a rank equivalent to Chief Superintendent or higher may, upon the recommendation of the Chief, BFP be allowed service extension for a non-extendable period of one (1) year by the Secretary, DILG with the approval of the Civil Service Commission."
<b>-RESOLUTION NO. 2001-01 Section 8.2.1</b> 
</blockquote>
<p>Please refer to this link for <a href="/docs/compulsory" class="link link-info mb-2">documentary requirements</a>.</p>