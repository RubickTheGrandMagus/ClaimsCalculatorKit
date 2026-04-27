<script lang="ts">
    import { onMount } from "svelte";
    import introJs from "intro.js";
    import 'intro.js/introjs.css';

    onMount(() => {
        introJs().setOptions({
            steps: [
                {intro:"Welcome to the web app!"},
                {
                    element: '.claims-menu',
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

<div class="container mx-auto px-4 py-8 mb-16 flex flex-col items-center">
    <div class="text-center mb-10">
        <h1 class="text-3xl md:text-4xl font-extrabold text-primary mb-3">Retirement & Separation Benefits</h1>
        <p class="text-lg text-base-content/70 max-w-2xl mx-auto">Please select the applicable mode of retirement or benefit claim from the options below.</p>
    </div>
    
    <div class="claims-menu grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        
        <!-- Compulsory -->
        <a href="/claims/compulsory" class="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-base-200 group">
            <div class="card-body items-center text-center">
                <div class="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <h2 class="card-title text-xl mb-2">Compulsory</h2>
                <p class="text-sm text-base-content/70">For personnel reaching the mandatory retirement age.</p>
            </div>
        </a>

        <!-- Optional -->
        <a href="/claims/optional" class="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-base-200 group">
            <div class="card-body items-center text-center">
                <div class="h-16 w-16 bg-secondary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h2 class="card-title text-xl mb-2">Optional</h2>
                <p class="text-sm text-base-content/70">For personnel who opt to retire early after fulfilling requirements.</p>
            </div>
        </a>

        <!-- NUP / Terminal Leave Claim -->
        <a href="/claims/other" class="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-base-200 group">
            <div class="card-body items-center text-center">
                <div class="h-16 w-16 bg-info/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-info/20 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-info" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                </div>
                <h2 class="card-title text-lg mb-2">Terminal Leave Claim</h2>
                <p class="text-sm text-base-content/70">For NUP / Resigned / Dismissed / AWOL personnel.</p>
            </div>
        </a>

        <!-- Monetization of Leave Credits -->
        <a href="/claims/mone" class="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-base-200 group">
            <div class="card-body items-center text-center">
                <div class="h-16 w-16 bg-accent/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h2 class="card-title text-lg mb-2">Leave Monetization</h2>
                <p class="text-sm text-base-content/70">Monetization of Leave Credits (MLC).</p>
            </div>
        </a>

        <!-- TPPD -->
        <a href="/claims/tppd" class="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-base-200 group">
            <div class="card-body items-center text-center">
                <div class="h-16 w-16 bg-warning/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-warning/20 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                </div>
                <h2 class="card-title text-base sm:text-lg mb-2">Total Permanent Physical Disability</h2>
                <p class="text-sm text-base-content/70">Benefits (TPPD) for complete physical disability.</p>
            </div>
        </a>

        <!-- Death Benefits -->
        <a href="/claims/death" class="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-base-200 group">
            <div class="card-body items-center text-center">
                <div class="h-16 w-16 bg-error/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-error/20 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                </div>
                <h2 class="card-title text-xl mb-2">Death Benefits</h2>
                <p class="text-sm text-base-content/70">Claims related to death in service.</p>
            </div>
        </a>
        
    </div>
</div>
