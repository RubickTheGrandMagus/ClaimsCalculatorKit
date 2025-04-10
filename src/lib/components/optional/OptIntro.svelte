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
                dontShowAgainCookie:'introOpt',
                dontShowAgainCookieDays:7
            }).start();
        },1000);
    });
</script>
<h2 class="card-title">OPTIONAL RETIREMENT</h2>
<blockquote class="border-l-4 border-gray-500 pl-4 italic text-gray-700 text-justify w-80">
"A BFP uniformed personnel who has accumulated at least twenty (20) years satisfactory active service, regardless of age, may optionally retire and be entitled to one (1) rank higher than the permanent grade last held. Provided, that, he/she has served at least one (1) year of active service in permanent grade..."
<b>-RESOLUTION NO. 2001-01 Section 8.3.1</b> 
</blockquote>
<p>Please refer to this link for <a href="/docs/optional" class="link link-info">documentary requirements</a>.</p>