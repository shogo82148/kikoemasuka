// TinySegmenter 0.1 -- Super compact Japanese tokenizer in Javascript
// (c) 2008 Taku Kudo <taku@chasen.org>
// TinySegmenter is freely distributable under the terms of a new BSD licence.
// For details, see http://chasen.org/~taku/software/TinySegmenter/LICENCE.txt

(function(global) {
    global.myTinySegmenter = TinySegmenter;
    var default_model = {BC1:{OO:667},BC2:{AA:-910,AI:405,AN:-134,HI:-333,IK:-170,IO:-1238,KK:-1303,MH:-360},BC3:{HH:413,II:533},BIAS:-5864,BP1:{BB:-152,BO:-1754,OB:-375},BP2:{BO:-874,OO:48,UU:-1383},BQ1:{OAA:417,OII:-186},BQ2:{BHH:776,BIK:-730,BKK:-362,OAI:412,OHH:-1443,OIH:-1545},BQ3:{BIH:-1464,BKK:2271,BOO:54,OAI:85,OAO:-553,OHH:367,OHI:-26,OIA:620,OIH:214,OIK:101,OKK:-667,OOA:-213,OOH:-344},BQ4:{BHH:-1325,BHI:209,BIH:-410,BII:415,BOO:110,OAA:-1696,OAH:1012,OHH:752,OHI:-297,OIH:115,OII:-3867,OIO:-240,OOA:-658},BW1:{'いい':-1244,'いま':935,'かき':208,'さい':2139,'した':666,'すあ':-2189,'すか':7122,'する':-175,'です':3181,'ので':1683,'ます':184,'をす':-2041,'んい':-2163,'今あ':617,'合で':-1291},BW2:{'いい':-566,'えま':-732,'かフ':-91,'こえ':-791,'すか':-8159,'すよ':-801,'する':-1528,'てい':-1147,'です':-685,'のみ':329,'の脳':-3397,'は今':-189,'まか':244,'ます':-271,'んい':6442,'接呼':3500,'直接':-51},BW3:{'いい':2864,'いで':-697,'いま':838,'こえ':-354,'さん':-216,'すか':-1129,'たは':-383,'てい':-680,'わた':481,'んい':-2228,'今あ':431},TC1:{AII:-203,IIO:62,KII:-202,KKK:212,OII:257,OOO:30},TC2:{HHI:-478,HII:-923,HIK:-62,IIH:-2856,IIO:-318,IOA:444},TC3:{AII:347,HHH:90,HHI:-230,HII:-301,IHI:-660,III:27,IIO:-454},TC4:{AAA:526,HIH:-178,HII:171,IHH:-166,III:678,KII:-199,KKK:690,OOO:60},TQ1:{BHHH:3756,BHIH:1027,BHII:620,BIHH:-593,BIHI:-185,BIII:-189,BIKK:-2213,OHHH:-847,OHHI:-368,OHIH:-293,OHII:-59,OIHH:54,OIII:25,OIKK:1018,OIOA:273},TQ2:{BHHH:186,BHHI:-1119,BHIH:453,BHII:-1414,BIII:766,OHHH:-890,OHIH:-465,OHII:1097,OIIH:4737,OIII:-108,OIIK:118,OIOA:3093,OKKI:-317,OKKK:163},TQ3:{BHHH:-93,BHII:1288,BIII:-864,BIIK:-508,OHHH:474,OHIH:313,OHII:-240,OIII:27,OIIK:835,OIIO:113,OKKK:26,OOAA:-901},TQ4:{BIHH:-733,BIII:762,BIKK:-2483,OAAA:-404,OIHH:102,OIIO:-84,OIKK:550,OKKK:-439},TW1:{'いいで':-341,'いです':-1261,'います':1554,'えます':-2151,'かけて':-165,'してい':-1498,'すあな':-679,'すかフ':277,'するの':-1688,'ている':627,'ですか':402,'です今':3847,'ではあ':-691,'なさん':80,'なたは':6704,'に直接':2217,'の心に':1215,'はあり':-782,'びかけ':1899,'ました':1782,'ますあ':-819,'ません':2125,'りませ':1381,'る場合':-527,'をする':-2560,'んいい':-3651,'ん今あ':4613,'合では':4070,'呼びか':1305,'直接呼':601},TW2:{'いいで':-196,'いる場':5123,'えます':-3634,'かきこ':4988,'きこえ':-26,'けてい':-186,'こえま':-3103,'してい':-1307,'すあな':-257,'すかき':-2418,'すかフ':-1399,'すか？':-2793,'す今あ':2268,'せんあ':-1771,'せんい':461,'たの心':1772,'ていま':256,'なたは':-3608,'びかけ':1727,'ますあ':3975,'ん今あ':-645,'合では':-1122,'呼びか':2396,'心に直':303},TW3:{'いいで':-1093,'えます':-1244,'かきこ':-1874,'かフォ':-137,'きこえ':-1453,'こえま':-3580,'してい':-225,'すあな':1186,'すきこ':-266,'するの':-1331,'せんい':-707,'たの心':231,'ている':-900,'なたは':-2464,'のです':196,'のみな':3397,'ますあ':-3012,'ますか':-1620,'をする':-2408,'んいい':108,'呼びか':1362,'心に直':609},TW4:{'いいで':2624,'きこえ':7528,'こえま':-2860,'してい':-212,'すあな':-2888,'す今あ':-617,'せんい':-4758,'ている':-497,'なたは':-1095,'の心に':1160,'ますあ':-3890,'みなさ':422,'をする':-1916,'んいい':-4608,'呼びか':2549,'心に直':3641,'接呼び':1388,'直接呼':3280,htt:726},UC1:{K:-350,N:88,O:-1144},UC2:{H:852,O:-845},UC3:{A:357,I:1257,O:58},UC4:{A:-436,H:574,I:-811,N:-470,O:-253},UC5:{K:66,O:-69},UC6:{H:-74,I:-152,O:-27},UP1:{B:444,U:-832},UP2:{B:-25,O:31},UP3:{},UQ1:{BH:-133,BI:755,BK:-81,BO:402,OH:990,OI:-106},UQ2:{BK:-197,OA:27,OH:-551,OI:-21,OK:440,ON:116},UQ3:{BA:83,BH:-296,BI:-111,BO:898,OH:91,OI:1711},UW1:{'/':-196,'あ':269,'い':-602,'け':350,'さ':1881,'た':-503,'だ':27,'て':504,'で':481,'な':1145,'の':-323,'は':-356,'び':471,'ま':387,'よ':27,'を':-461,'今':85,'内':-26,'場':-750,'語':-294,t:-982},UW2:{'/':-173,'、':-252,'あ':-77,'い':-194,'か':708,'き':-160,'こ':-305,'さ':2498,'し':-296,'す':211,'た':617,'で':680,'に':-577,'の':-506,'は':-515,'ま':1218,'り':-467,'を':-606,'ん':593,'今':886,t:-401},UW3:{'(':436,')':2598,'/':-1140,'、':-3894,'あ':-525,'う':586,'お':-1052,'か':1686,'が':1043,'さ':-1318,'し':-1072,'す':3075,'そ':-83,'ち':-112,'て':55,'で':-99,'な':-600,'に':1054,'ね':1568,'の':-621,'は':2173,'ま':-144,'も':259,'よ':3876,'り':-1214,'を':1854,'ん':1854,'今':3721,'合':-195,'日':574,'脳':-370,'？':1222},UW4:{'(':1131,')':1663,'/':-1754,'、':-2428,'あ':3793,'う':-151,'お':3695,'か':-735,'き':298,'け':-661,'こ':415,'し':-184,'す':-1037,'そ':2916,'た':-327,'っ':-297,'て':-888,'ど':226,'な':-28,'に':-144,'の':-653,'は':-550,'ふ':27,'ま':55,'み':1595,'も':687,'や':443,'よ':-67,'ら':-886,'り':-1701,'る':-1980,'わ':730,'を':-62,'ん':-621,'フ':-280,'ー':-508,'人':-196,'今':845,'私':1241,'聞':402,'貴':406},UW5:{'/':-494,'ぁ':333,'い':-424,'う':577,'え':-455,'き':-574,'こ':1975,'し':-540,'す':-1021,'せ':-117,'だ':27,'っ':508,'て':-700,'な':779,'に':-193,'は':-722,'び':1166,'ま':-582,'り':-28,'れ':225,'を':-262,'今':-426,'呼':196,'語':-226},UW6:{'あ':-967,'い':-1210,'え':2998,'き':-392,'け':-195,'こ':-561,'す':-1224,'て':-570,'で':437,'は':-763,'び':211,'ま':-318,'り':-544,'る':-320,'を':123,'ん':-590,'今':-1124,'呼':244,'心':606,t:1701}};
    function TinySegmenter(model) {
        this.model = model || default_model;
    }

    var patterns = {
        "[一二三四五六七八九十百千万億兆]":"M",
        "[一-龠々〆ヵヶ]":"H",
        "[ぁ-ん]":"I",
        "[ァ-ヴーｱ-ﾝﾞｰ]":"K",
        "[a-zA-Zａ-ｚＡ-Ｚ]":"A",
        "[0-9０-９]":"N"
    };
    var chartype = [];
    for (var i in patterns) {
        var regexp = new RegExp;
        regexp.compile(i);
        chartype.push([regexp, patterns[i]]);
    }

    function getctype(str) {
        for (var i in chartype) {
            if (str.match(chartype[i][0])) {
                return chartype[i][1];
            }
        }
        return "O";
    }

    TinySegmenter.prototype.segment = function(input) {
        if (input == null || input == undefined || input == "") {
            return [];
        }
        var m = this.model;
        var result = [];
        var seg = ["B3","B2","B1"];
        var ctype = ["O","O","O"];
        var o = input.split("");
        for (i = 0; i < o.length; ++i) {
            seg.push(o[i]);
            ctype.push(getctype(o[i]));
        }
        seg.push("E1");
        seg.push("E2");
        seg.push("E3");
        ctype.push("O");
        ctype.push("O");
        ctype.push("O");
        var nodes = {'UUU':{score:0, prev:null, pos:3, p: 'B'}};
        for (var i = 4; i < seg.length - 3; ++i) {
            var next_nodes = {};
            var w1 = seg[i-3];
            var w2 = seg[i-2];
            var w3 = seg[i-1];
            var w4 = seg[i];
            var w5 = seg[i+1];
            var w6 = seg[i+2];
            var c1 = ctype[i-3];
            var c2 = ctype[i-2];
            var c3 = ctype[i-1];
            var c4 = ctype[i];
            var c5 = ctype[i+1];
            var c6 = ctype[i+2];
            var base = m.BIAS;
            base += m.UW1[w1]||0;
            base += m.UW2[w2]||0;
            base += m.UW3[w3]||0;
            base += m.UW4[w4]||0;
            base += m.UW5[w5]||0;
            base += m.UW6[w6]||0;
            base += m.BW1[w2 + w3]||0;
            base += m.BW2[w3 + w4]||0;
            base += m.BW3[w4 + w5]||0;
            base += m.TW1[w1 + w2 + w3]||0;
            base += m.TW2[w2 + w3 + w4]||0;
            base += m.TW3[w3 + w4 + w5]||0;
            base += m.TW4[w4 + w5 + w6]||0;
            base += m.UC1[c1]||0;
            base += m.UC2[c2]||0;
            base += m.UC3[c3]||0;
            base += m.UC4[c4]||0;
            base += m.UC5[c5]||0;
            base += m.UC6[c6]||0;
            base += m.BC1[c2 + c3]||0;
            base += m.BC2[c3 + c4]||0;
            base += m.BC3[c4 + c5]||0;
            base += m.TC1[c1 + c2 + c3]||0;
            base += m.TC2[c2 + c3 + c4]||0;
            base += m.TC3[c3 + c4 + c5]||0;
            base += m.TC4[c4 + c5 + c6]||0;
            for(var key in nodes) {
                var p1 = key.charAt(0);
                var p2 = key.charAt(1);
                var p3 = key.charAt(2);
                var score = base;
                score += m.UP1[p1]||0;
                score += m.UP2[p2]||0;
                score += m.UP3[p3]||0;
                score += m.BP1[p1 + p2]||0;
                score += m.BP2[p2 + p3]||0;
                score += m.UQ1[p1 + c1]||0;
                score += m.UQ2[p2 + c2]||0;
                score += m.UQ3[p3 + c3]||0;
                score += m.BQ1[p2 + c2 + c3]||0;
                score += m.BQ2[p2 + c3 + c4]||0;
                score += m.BQ3[p3 + c2 + c3]||0;
                score += m.BQ4[p3 + c3 + c4]||0;
                score += m.TQ1[p2 + c1 + c2 + c3]||0;
                score += m.TQ2[p2 + c2 + c3 + c4]||0;
                score += m.TQ3[p3 + c1 + c2 + c3]||0;
                score += m.TQ4[p3 + c2 + c3 + c4]||0;

                var next_key, next_score;

                next_key = p2 + p3 + 'O';
                next_score = nodes[key].score - score;
                if(!next_nodes[next_key] || next_nodes[next_key].score < next_score) {
                    next_nodes[next_key] = {score: next_score, prev: nodes[key], pos: i, p: 'O'};
                }

                next_key = p2 + p3 + 'B';
                next_score = nodes[key].score + score;
                if(!next_nodes[next_key] || next_nodes[next_key].score < next_score) {
                    next_nodes[next_key] = {score: next_score, prev: nodes[key], pos: i, p: 'B'};
                }
            }
            nodes = next_nodes;
        }

        var max_score = -1e100;
        var max_key = undefined;
        for(key in nodes) {
            if(nodes[key].score > max_score) {
                max_score = nodes[key].score;
                max_key = key;
            }
        }
        var node = nodes[max_key];
        var word = '';
        while(node) {
            word = seg[node.pos] + word;
            if(node.p=='B') {
                result.push(word);
                word = '';
            }
            node = node.prev;
        }
        result.reverse();
        return result;
    };
})(this);
