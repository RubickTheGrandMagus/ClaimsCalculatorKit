<script lang="ts">
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();
</script>

<div class="collapse collapse-plus bg-base-200 collapse-open">
    <input type="radio" name="my-accordion-3" />
    <div class="collapse-title text-xl font-medium">Retirement Gratuity Claim (3 yr Lumpsum / Outright Pension)</div>
    <div class="collapse-content">
        <p>1 Folder containing 2 copies of the following:</p>
        <span class="font-bold text-xl">CLAIMANT'S REQUIREMENTS</span>
        <details class="collapse bg-base-200 hover:collapse-open">
            <summary class="collapse-title text-xl font-medium">A. Letter of Intent addressed to the Regional Director</summary>
            <div class="collapse-content">
              <ul>
                <li class="hover:font-bold">Watch Video Tutorial</li>
                <li>Download File</li>
              </ul>
            </div>
        </details>
    </div>
  </div>
<div class="collapse collapse-plus bg-base-200">
    <input type="radio" name="my-accordion-3" />
    <div class="collapse-title text-xl font-medium">Terminal Leave Claim</div>
    <div class="collapse-content">
      <p>hello</p>
    </div>
</div>