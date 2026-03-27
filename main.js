import './src/style.css'

document.querySelector('#app').innerHTML = `
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-center p-8 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl">
      <h1 class="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
        Vite + Tailwind
      </h1>
      <p class="text-slate-400 text-lg mb-8">
        Đây là môi trường chuyên nghiệp chuẩn "đi làm thật"!
      </p>
      <div class="flex gap-4 justify-center">
        <div class="px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded-full text-sm font-bold border border-cyan-500/20">
          Vite HMR Ready
        </div>
        <div class="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-full text-sm font-bold border border-blue-500/20">
          Tailwind JIT
        </div>
      </div>
    </div>
  </div>
`
