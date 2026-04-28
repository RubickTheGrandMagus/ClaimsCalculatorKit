<div class="flex min-h-[85vh] flex-col items-center justify-center relative overflow-hidden bg-base-200 rounded-3xl shadow-inner mx-4 my-8">
	
	<!-- Animated Background Elements -->
	<div class="absolute top-10 left-10 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
	<div class="absolute top-0 right-10 w-72 h-72 bg-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
	<div class="absolute -bottom-8 left-1/2 -ml-36 w-72 h-72 bg-accent rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

	<!-- Glass Content Card -->
	<div class="card glass shadow-2xl z-10 w-full max-w-lg p-10 text-center transform transition-all duration-500 hover:scale-[1.02] border border-white/10">
		<div class="flex justify-center mb-6">
			<!-- Animated Rocket Icon -->
			<div class="relative">
				<div class="absolute inset-0 bg-primary opacity-30 rounded-full blur-xl animate-pulse"></div>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-28 w-28 text-primary animate-bounce relative" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.438 4.438 0 002.946 2.946 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
				</svg>
			</div>
		</div>
		
		<h1 class="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary drop-shadow-sm">
			Coming Soon
		</h1>
		<p class="text-lg text-base-content/80 mb-10 font-medium">
			We're crafting something extraordinary. Stay tuned for the next big feature!
		</p>
		
		<div class="flex justify-center">
			<a href="/" class="btn btn-primary btn-lg rounded-full px-8 shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all hover:scale-105 group">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
				</svg>
				Return to Homepage
			</a>
		</div>
	</div>
</div>

<style>
	@keyframes blob {
		0% { transform: translate(0px, 0px) scale(1); }
		33% { transform: translate(30px, -50px) scale(1.1); }
		66% { transform: translate(-20px, 20px) scale(0.9); }
		100% { transform: translate(0px, 0px) scale(1); }
	}
	.animate-blob {
		animation: blob 8s infinite;
	}
	.animation-delay-2000 {
		animation-delay: 2s;
	}
	.animation-delay-4000 {
		animation-delay: 4s;
	}
</style>