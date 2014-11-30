function! ToSRUJson() 
    %g/^[NJ\*\-\+]$/d
    %g/^Får ej förekomma.*$/d
    %s/^\([NSD].*_[ADXBG3].*$\)/\"typ": \"\1\"},/
    %s/^\(\d\{4\}.*$\)/\"id": \"\1\",/
    %s/^\"\@!\(.*\)/{\"namn": \"\1\",/
    %j
    %s/}, {/},\r{/g
    %s/^/\t\t/
endfunction
