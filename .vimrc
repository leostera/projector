function! Build()
  call VimuxRunCommand("time make build")
endfunction

autocmd! BufWritePost *.js   :call Build()
autocmd! BufWritePost *.sass :call Build()
