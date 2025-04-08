<script lang="ts">
    import { onMount } from "svelte";
    import introJs from "intro.js";
    import 'intro.js/introjs.css';

    onMount(() => {
        introJs().setOptions({
            steps: [
                {intro:"Welcome to the web app!"},
                {
                    element: '.menu',
                    intro: 'Select one of the following options',
                    position: 'right'
                },  
                {
                    element: 'label[for="my-drawer"]',
                    intro: 'Click here to open the menu',
                    position: 'right'
                },  
                {
                    element: '#home',
                    intro: 'Click here to return to homepage'
                }  
            ],
            dontShowAgain: true
        }).start();
    });

</script>

<div class="flex flex-col justify-center items-center">
    <p class="text-xl normal-case text-center">PLEASE SELECT MODE OF RETIREMENT AND SEPARATION BENEFITS</p>
    <ul class="menu">
        <li class="p-1"><a href="/claims/compulsory" class="btn btn-outline btn-info hover:btn-primary btn-wide">COMPULSORY</a></li>
        <li class="p-1"><a href="/claims/optional" class="btn btn-outline btn-info hover:btn-secondary btn-wide">OPTIONAL</a></li>
        <li class="p-1"><a href="/claims/other" class="btn btn-outline btn-info hover:btn-info btn-wide text-xs">NUP / RESIGNED / DISMISSED / AWOL <br> (Terminal Leave Claim)</a></li>
        <li class="p-1"><a href="/claims/mone" class="btn btn-outline btn-info hover:btn-accent btn-wide text-xs">MONETIZATION OF LEAVE CREDITS <br> (MLC)</a></li>
        <li class="p-1"><a href="/claims/tppd" class="btn btn-outline btn-info hover:btn-warning btn-wide text-xs">TOTAL PERMANENT PHYSICAL DISABILITY (TPPD)</a></li>
        <li class="p-1"><a href="/claims/death" class="btn btn-outline btn-info hover:btn-error btn-wide">DEATH BENEFITS</a></li>
    </ul>
</div>
