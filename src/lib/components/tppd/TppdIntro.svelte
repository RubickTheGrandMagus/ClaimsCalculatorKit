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
                dontShowAgainCookie:'introtppd',
                dontShowAgainCookieDays:7
            }).start();
        },1000);
    });
</script>
<h2 class="card-title">Permanent Physical Disability</h2>
<blockquote class="border-l-4 border-gray-500 pl-4 italic text-gray-700 text-justify w-80">
"any impairment of 
the body which renders the BFP uniformed personnel incapable of performing 
substantially the functions of his/her duties or occupation which is expected of 
him during the course of his/her duties or occupation which is expected of him 
during the course of his/her employment..."
<b>-RESOLUTION NO. 2001-01 Section 1</b> 
</blockquote>
<p>Please refer to this link for <a href="/docs/tppd" class="link link-info">documentary requirements</a>.</p>