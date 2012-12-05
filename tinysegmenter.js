// TinySegmenter 0.1 -- Super compact Japanese tokenizer in Javascript
// (c) 2008 Taku Kudo <taku@chasen.org>
// TinySegmenter is freely distributable under the terms of a new BSD licence.
// For details, see http://chasen.org/~taku/software/TinySegmenter/LICENCE.txt

(function(global) {
    global.myTinySegmenter = TinySegmenter;
    var default_model = {BC1:{II:169,OA:-1041,OO:350},BC2:{AA:-1983,AI:516,AK:286,AN:-974,HI:-537,II:-1141,IK:1448,KH:142,KK:-1455,NA:-465,NI:993},BC3:{HH:53,IH:-984,II:253,OO:34},BIAS:-6209,BP1:{BB:926,BO:87,OB:-1535},BP2:{BB:454,BO:-203,OO:100,UU:-1237},BQ1:{BOO:968,OAA:249,OAO:-533,OHI:133,OIH:-84,OII:1710,UHH:104},BQ2:{BHH:1151,BKK:-427,OAH:1214,OAI:1218,OHH:-1771,OIH:-2798,ONN:-332,OOO:-23},BQ3:{BAA:185,BIH:-925,BII:-23,BIK:-1022,BKK:2513,BOI:207,OAI:26,OAO:-1219,OHH:49,OHI:-1563,OIA:705,OIH:29,OII:-408,OIK:70,OKK:-491},BQ4:{BHI:600,BII:249,BIK:-942,BOA:1185,OAA:-1482,OAH:2567,OAK:235,OAN:-1177,OHH:1764,OHI:-73,OIA:549,OIH:5351,OII:-357,OIK:425,OIN:588,OKH:199,ONA:-283,OOA:-806},BW1:{'いい':-268,'いま':946,'かき':461,'さい':1831,'した':428,'すあ':-1326,'すか':7727,'せん':405,'って':409,'です':4033,'ので':2690,'びか':1090,'ます':24,'をす':-1710,'んい':-3650,'今あ':25},BW2:{'えす':25,'えま':-215,'かフ':-672,'か？':-38,'す)':133,'すか':-9851,'する':-581,'たが':198,'てい':-1106,'です':-1325,'ので':511,'のみ':2553,'の脳':-1932,'びか':907,'まか':2074,'をし':1151,'んい':7235,'場合':-354,'接呼':4017},BW3:{'いい':3739,'いで':-666,'いま':669,'かE1':202,'きこ':623,'この':465,'すか':-2229,'たは':-4139,'てい':-639,'でも':295,'わた':1223,'んい':-3348,'今あ':1177},TC1:{AAA:82,AII:-399,HHI:35,HII:217,IHI:890,OHH:345,OOI:51,OOO:230},TC2:{HHI:-703,III:1139,IIK:-670,IIO:-438,IOA:2320},TC3:{AII:1097,AOA:-585,AOO:616,HHI:-486,HIH:228,IHH:-559,IHI:-1414,III:267,IIO:-381,IOA:1116},TC4:{AAA:522,HHH:105,HII:68,IHI:359,IIH:-291,III:235,IKK:-202,KII:-704,KKK:1006,OOO:486},TQ1:{BHHH:4775,BHHI:192,BHIH:1332,BHII:31,BIHH:-583,BIHI:-23,BIKK:-2118,BKKK:513,OAAI:50,OHHH:-979,OIAA:747,OIHH:191,OIII:21,OIKK:1676,OIOA:709},TQ2:{BHHH:124,BHHI:-919,BHIH:603,BHII:-2142,BIIH:-4051,BIII:906,OHHH:-1768,OHHI:146,OHIH:-934,OHII:368,OIHH:287,OIIH:347,OIII:-2182,OIIO:-1445,OIOA:800,OKII:-105,OKKI:-140,OKKK:559},TQ3:{BHHH:-259,BHII:1741,BIIH:-369,BIII:-818,BIIK:-1292,BKIH:50,OHHH:477,OHHI:58,OHII:-57,OIHH:-130,OIIH:238,OIII:439,OIIK:935,OIIO:25,OOAA:-1976},TQ4:{BIHH:-2112,BIII:304,BIKK:-2120,OAAA:-469,OHII:-78,OIAA:1468,OIHH:368,OIIH:-754,OIII:-1547,OIKK:1733},TW1:{'いいで':-473,'いです':-2516,'います':1236,'えます':-717,'かみな':1648,'きこえ':-777,'してい':-3309,'すあな':-271,'すかき':146,'すか今':414,'するの':-3267,'す今あ':-1608,'ている':1011,'ですか':1256,'です今':4901,'ではあ':-1208,'なさん':377,'なたは':8061,'に直接':2165,'のです':-512,'の心に':1836,'はあり':-1751,'ました':1393,'ますあ':-1026,'ません':664,'りませ':927,'るので':-1413,'る場合':-404,'をする':-5034,'んいい':-6325,'ん今あ':3766,'合では':5439,'場合で':-2364},TW2:{'いる場':5755,'えます':-4774,'かきこ':5486,'かみな':1298,'きこえ':-2110,'けてい':-649,'こえま':-2399,'してい':-2931,'すあな':-489,'すかき':-3494,'すか？':-1639,'す今あ':3241,'せんあ':-421,'せんい':262,'たの心':2813,'ていま':929,'です)':203,'なたが':701,'なたは':-5624,'ますあ':5901,'る場合':-49,'をする':-3039,'ん今あ':-999,'合では':-1673,'呼びか':904},TW3:{'いいで':-347,'えます':-2717,'かきこ':-1918,'きこえ':-2926,'こえま':-2828,'してい':-3000,'すあな':1492,'すきこ':-1949,'するの':-1876,'す今あ':412,'せんあ':528,'せんい':-6852,'ている':-868,'ですE1':-220,'なたは':-182,'のです':775,'のみな':1711,'ますあ':-5125,'をして':845,'をする':-4397},TW4:{'いいで':3003,'いる場':-568,'きこえ':9379,'こえま':-2473,'してい':-2628,'すあな':-3709,'すかき':74,'す今あ':-1849,'せんあ':446,'せんい':-7100,'ている':-71,'です今':-300,'なたは':-1085,'ますあ':-6146,'をする':-3100,'今あな':63,'呼びか':2967,'心に直':3687,'直接呼':3505,htt:1846},UC1:{I:368,M:76,N:526,O:-1038},UC2:{H:588,I:-138,K:-934,O:-1159},UC3:{A:508,H:34,I:456},UC4:{A:-378,H:853,I:322,M:422,N:-49,O:-172},UC5:{H:205,K:24,N:-141,O:-369},UC6:{H:-14,O:-134},UP1:{B:-1883,U:-1562},UP2:{},UP3:{B:752},UQ1:{BA:368,BH:-112,BI:551,BO:678,OH:1527,OI:-309,OK:86},UQ2:{BO:38,OI:-206,OK:507,ON:82,UO:-24},UQ3:{BA:349,BH:-2063,BO:1567,OH:159,OI:57,OO:-152},UW1:{'/':-978,'い':-420,'か':-546,'く':26,'け':459,'さ':2563,'す':-541,'た':-1006,'だ':85,'っ':57,'て':1045,'で':655,'な':1011,'の':-460,'は':-972,'び':182,'ま':647,'よ':464,'る':-42,'を':-136,'ん':280,'場':-667,'私':443,t:-1063},UW2:{'/':-512,'あ':-1342,'い':-227,'か':1247,'き':-458,'さ':2549,'し':-180,'す':-167,'せ':587,'た':977,'で':628,'に':-297,'の':-383,'は':-644,'ま':1230,'よ':25,'を':-552,'ん':672,'今':2034,'愛':-587,'直':1021,t:-628},UW3:{'(':821,')':2945,'/':-1731,'、':-2068,'あ':-1228,'う':562,'お':-369,'か':1758,'が':1368,'く':399,'さ':-502,'し':-649,'す':3012,'て':203,'で':-324,'と':410,'な':-200,'に':1411,'ね':2255,'の':-296,'は':2565,'ま':-308,'も':594,'よ':3718,'り':-699,'を':2102,'ん':1795,'今':4462,'合':-785,'日':259,'私':635,'？':969},UW4:{'(':2177,')':2157,'/':-2387,'、':-1446,'あ':3958,'お':3993,'か':-795,'き':444,'け':-74,'こ':323,'ご':400,'し':-54,'す':-860,'そ':2681,'た':-392,'っ':-225,'て':-606,'で':-787,'と':107,'ど':390,'の':-267,'は':-468,'ふ':1207,'ま':107,'み':1333,'も':719,'や':546,'ら':-507,'り':-1705,'る':-2019,'わ':1195,'を':-107,'ん':-317,'フ':-366,'ー':-528,'人':-609,'今':551,'私':714,'聞':513,'（':588},UW5:{'/':-1704,'ぁ':960,'い':-384,'う':840,'え':-280,'か':-36,'き':-1569,'こ':2110,'し':-794,'す':-1216,'だ':233,'っ':913,'て':-480,'な':630,'は':-1023,'び':1184,'ま':-357,'や':106,'る':-460,'れ':379,'を':-593,'ん':190,'今':-163,'心':52,h:615},UW6:{'/':-101,'あ':-1427,'い':-1290,'え':2889,'き':-1026,'く':53,'こ':-752,'し':-165,'す':-1617,'っ':54,'て':-805,'で':284,'は':-918,'ま':-311,'り':-386,'る':-898,'を':192,'ん':-150,'今':-1663,'呼':612,'心':215,'私':454,t:2892}};
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

