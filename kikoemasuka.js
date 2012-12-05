(function() {
    var text = document.getElementById('text');
    var result = document.getElementById('result');
    var convert = document.getElementById('convert');
    var tell = document.getElementById('tell');
    var segmenter = new TinySegmenter();

    convert.addEventListener('click', function() {
        var s = text.value;
        s = s.replace(/\s/g, '');
        var words = segmenter.segment(s);
        var out = "(…";
        var i;
        for(i = 0; i < words.length; i++) {
            out += words[i] + '…';
            if(Math.random() < 0.1) out += '…';
        }
        out += '…)';
        result.value = out;

        var shareurl = 'https://twitter.com/share?' +
                'lang=ja' +
                '&url=' + encodeURIComponent('http://shogo82148.github.com/kikoemasuka/') +
                '&text=' + encodeURIComponent(out);
        tell.href = shareurl;
    });
})();
