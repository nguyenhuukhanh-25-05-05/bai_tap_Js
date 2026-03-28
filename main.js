import './src/style.css'

document.querySelector('#app').innerHTML = `
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="text-center p-12 bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-[3rem] shadow-2xl max-w-md w-full transition-all duration-500 hover:shadow-cyan-500/10">
      <div class="mb-8 relative inline-block">
        <div class="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur opacity-25 animate-pulse"></div>
        <h1 class="text-6xl font-black bg-clip-text text-transparent bg-gradient-to-br from-white via-cyan-200 to-blue-400 leading-tight">
          JS Prep
        </h1>
      </div>
      
      <p class="text-slate-400 text-lg mb-10 font-medium">
        Môi trường học tập JavaScript <br/>
        <span class="text-cyan-400/80 font-bold uppercase tracking-widest text-xs">Chuyên nghiệp • Tốc độ • Đỉnh cao</span>
      </p>

      <div class="flex flex-col gap-6 items-center mb-10">
        <button id="counter" type="button" class="group relative px-8 py-4 bg-white text-slate-950 rounded-2xl font-bold text-xl transition-all active:scale-95 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)]">
          <span class="relative z-10 flex items-center gap-3">
            Count is <span id="count-value" class="tabular-nums">0</span>
          </span>
        </button>
      </div>

      <div class="flex gap-3 justify-center">
        <div class="px-4 py-2 bg-white/5 text-slate-400 rounded-xl text-xs font-bold border border-white/10 backdrop-blur-sm">
          Vite HMR
        </div>
        <div class="px-4 py-2 bg-white/5 text-slate-400 rounded-xl text-xs font-bold border border-white/10 backdrop-blur-sm">
          Tailwind 4.0
        </div>
      </div>
    </div>
  </div>
`

let count = 0
const counterBtn = document.querySelector('#counter')
const countValue = document.querySelector('#count-value')

counterBtn.addEventListener('click', () => {
  count++
  countValue.textContent = count
  
  // Subtle animation on click
  countValue.classList.remove('animate-bounce-short')
  void countValue.offsetWidth // trigger reflow
  countValue.classList.add('animate-bounce-short')
})
