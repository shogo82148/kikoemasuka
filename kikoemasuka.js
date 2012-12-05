(function() {
    var text = document.getElementById('text');
    var result = document.getElementById('result');
    var convert = document.getElementById('convert');
    var tell = document.getElementById('tell');
    var splitword = document.getElementById('word');
    var segmenter = new TinySegmenter();
    var mysegmenter = new myTinySegmenter();

    convert.addEventListener('click', function() {
        var s = text.value;
        s = s.replace(/\s/g, '');
        var words;
        var out = "(…";
        var i;
        if(splitword.checked) {
            words = segmenter.segment(s);
            for(i = 0; i < words.length; i++) {
                out += words[i];
                if(Math.random() < 0.5) out += '…';
            }
        } else {
            words = mysegmenter.segment(s);
            for(i = 0; i < words.length; i++) {
                out += words[i] + '…';
                if(Math.random() < 0.1) out += '…';
            }
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
