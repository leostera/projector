function! Build()
  call VimuxRunCommand("make build")
endfunction

autocmd! BufWritePost *.js   :call Build()
autocmd! BufWritePost *.sass :call Build()
