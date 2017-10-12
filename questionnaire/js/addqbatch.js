var MatrixType = "[矩阵题]";
var LikertMatrixType = "[矩阵量表题]";
var RevLikertMatrixType = "[矩阵反向量表题]";
var TableType = "[表格题]";
var SumType = "[比重题]";
var SortType = "[排序题]";
var LikertType = "[量表题]";
var ReverseLikertType = "[反向量表题]";
var LabelItem = "[标签]";
var DesignLabelItem = "【标签】";
var CutType = "[段落说明]";
var PageType = "[分页栏]";
var AllQType = "[题目]";
var CheckQType = "[多选]";
var RadioQType = "[单选题]";
var GapFillType = "[问答题]";
var GapFillTest = "[测试填空题]";
var CeShiQType = "[测试题]";
var CeShiQCheckType = "[测试多选]";
var label = "";
var qType = "";
var isCompact = false;
var GenerateType = 1;
var qIndex = 1;
var itemValue = 0;
var needExcute = false;
var prevDigit = -1;
var prevMatrixDigit = -1;
var numPerNow = 1;
var isNotClick = false;
var total_page = 0;
var tempDataNode = null;
var curPos = 0;
var lineCharCount = 2;
var lineIndex = 0;
var lines = null;
var cutStartIndex = 0;
var cutEndIndex = 0;
var pageStartIndex = 0;
var pageEndIndex = 0;
var isEnglish = false;
var prevChoiceD = 0;
var choiceStartWithNumber = false;
var GapFillStr = "___";
var GapWidth = 21;
var GapFillReplace = "<input style='width:" + GapWidth + "px;' />";
var curChar = 0;
var titleProcessed = false;
var isDigitBig = false;
var firstQuestion = null;

function generateQs() {
    if (!txtContent.value) {
        alert("请复制问卷文本到文本框里面！");
        return;
    }
    window.parent.batAddQTimes++;
    var z = txtContent.value;
    z = replace_specialChar(z);
    lines = z.split("\n");
    var ar = lines.length;
    var y;
    var U = false;
    var d = "";
    var J = "";
    var i = "";
    for (lineIndex = 0; lineIndex < ar; lineIndex++) {
        y = lines[lineIndex];
        var k = lines[lineIndex + 1];
        var H = /^\s*([A-Za-z])[^A-Za-z0-9]/;
        var V = true;
        if (IsBlank(y) && IsBlank(k)) {
            continue;
        }
        if (IsBlank(y) && k) {
            var Z = "";
            var ah = k.match(H);
            if (ah) {
                Z = ah[1];
            }
            if (ah && i) {
                ah = i.match(H);
                if (ah) {
                    d = ah[1];
                }
            }
            if ((Z == "A" || Z == "a") && d == "") {
                V = false;
                d = Z;
                U = true;
            } else {
                if (d && Z && Z.charCodeAt(0) == d.charCodeAt(0) + 1) {
                    V = false;
                    d = Z;
                    U = true;
                }
            }
        }
        if (!IsBlank(y)) {
            i = y;
        }
        if (V) {
            J += y + "\n";
        }
    }
    if (U) {
        txtContent.value = z = J;
        lines = z.split("\n");
        ar = lines.length;
    }
    var n = "";
    var g = "";
    var aa = "";
    var L = false;
    var l = true;
    var ag = false;
    var C = false;
    qType = "question";
    isDigitBig = false;
    var t = /^\s*([一二三四五六七八九十][\.。、\x20\t．:：]|[（(][一二三四五六七八九十][)）]|第[一二三四五六七八九十])/g;
    var p = 0;
    titleProcessed = false;
    firstQuestion = null;
    lineIndex = 0;
    curChar = 0;
    for (lineIndex = 0; lineIndex < ar; lineIndex++) {
        y = lines[lineIndex];
        if (t.exec(y)) {
            p++;
        }
        if (p > 5) {
            isDigitBig = true;
            break;
        }
    }
    choiceStartWithNumber = false;
    prevChoiceD = 0;
    isCompact = false;
    var G = false;
    var W = false;
    var X = false;
    for (lineIndex = 0; lineIndex < ar; lineIndex++) {
        y = lines[lineIndex];
        if (IsBlank(y)) {
            continue;
        }
        if (StartWithDigit(y)) {
            isCompact = true;
            X = true;
        }
        break;
    }
    try {
        while (true) {
            if (lineIndex >= ar) {
                break;
            }
            y = trim(lines[lineIndex]);
            if (!titleProcessed) {
                if (!IsBlank(y)) {
                    aa = y;
                    qType = "question";
                    L = false;
                    C = false;
                    if (aa.contains(MatrixType) || aa.contains(LikertMatrixType) || aa.contains(RevLikertMatrixType) || aa.contains("[矩阵单选题]")) {
                        l = true;
                        qType = "matrix";
                    } else {
                        if (aa.contains(TableType)) {
                            l = true;
                            ag = true;
                            qType = "matrix";
                        } else {
                            if (aa.contains(SumType)) {
                                qType = "sum";
                            } else {
                                if (aa.contains(SortType)) {
                                    qType = "sort";
                                } else {
                                    if (aa.contains(LikertType) || aa.contains(ReverseLikertType)) {
                                        qType = "likert";
                                    } else {
                                        if (aa.contains(CheckQType) || aa.contains(CeShiQCheckType)) {
                                            qType = "check";
                                        } else {
                                            if (aa.contains(RadioQType) || aa.contains(CeShiQType)) {
                                                qType = "radio";
                                            } else {
                                                if (aa.contains(PageType)) {
                                                    qType = "page";
                                                    pageStartIndex = lineIndex + 1;
                                                } else {
                                                    if (aa.contains(GapFillType) || aa.contains(GapFillTest)) {
                                                        qType = "question";
                                                    } else {
                                                        if (aa.contains(CutType) || (isCompact && IsCut(aa))) {
                                                            qType = "cut";
                                                            cutStartIndex = lineIndex + 1;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    titleProcessed = true;
                }
                lineIndex++;
            }
            if (titleProcessed) {
                var w = lineIndex;
                var x = 0;
                var I = false;
                var Y = true;
                var c = false;
                n = "";
                var r = aa.contains(GapFillType) || aa.contains(GapFillTest);
                if (!r) {
                    for (; w < ar; w++) {
                        var ap = lines[w];
                        if (isCompact) {
                            prevIsNewQ = false;
                            if (IsBlank(ap)) {
                                choiceStartWithNumber = false;
                                break;
                            } else {
                                if (isKaoShi && StartWithDigit(ap)) {
                                    choiceStartWithNumber = false;
                                    break;
                                }
                            }
                            x++;
                        } else {
                            if (IsBlank(ap)) {
                                break;
                            }
                            x++;
                        }
                    }
                }
                for (; lineIndex < w; lineIndex++) {
                    var ap = trim(lines[lineIndex]);
                    if (qType == "cut" || qType == "page") {
                        n += lines[lineIndex];
                        if (lineIndex < w - 1) {
                            n += "<br/>";
                        }
                        cutEndIndex = lineIndex + 1;
                        pageEndIndex = lineIndex + 1;
                    } else {
                        if (!IsBlank(ap)) {
                            I = true;
                            if (qType == "matrix") {
                                if (l) {
                                    var u = "103";
                                    if (ag) {
                                        u = "303";
                                        itemValue = 0;
                                    }
                                    tempDataNode = AddMatrixTitle(aa, qIndex, u);
                                    qIndex++;
                                    var O = ap.split(/(\x20|\t)+/ig);
                                    for (var ai = 0; ai < O.length; ai++) {
                                        if (!isEmpty(trim(O[ai]))) {
                                            itemValue++;
                                        }
                                        AddSelectItem(tempDataNode, O[ai]);
                                    }
                                    if (ag) {
                                        for (var s = 1; s < tempDataNode._select.length; s++) {
                                            tempDataNode._select[s]._item_value = s;
                                        }
                                    }
                                    l = false;
                                } else {
                                    if (ag) {
                                        var O = ap.split(/(\x20|\t)+/ig);
                                        for (var ai = 0; ai < O.length; ai++) {
                                            AddColumn(tempDataNode, O[ai]);
                                        }
                                        ag = false;
                                    } else {
                                        if (ap.startWith(LabelItem)) {
                                            label = ap.substr(4);
                                        } else {
                                            AddMatrixLine(tempDataNode, ap);
                                        }
                                    }
                                }
                            } else {
                                if (qType == "sum") {
                                    if (!C) {
                                        tempDataNode = AddSumTitle(aa, qIndex);
                                        qIndex++;
                                        C = true;
                                    }
                                    if (C) {
                                        if (ap.startWith(LabelItem)) {
                                            label = ap.substr(4);
                                        } else {
                                            AddMatrixLine(tempDataNode, ap);
                                        }
                                    }
                                } else {
                                    if (qType != "sort" && qType != "likert" && qType != "check" && qType != "radio") {
                                        qType = "radio";
                                        if (isCheck(aa)) {
                                            qType = "check";
                                        }
                                    }
                                    var D = false;
                                    if (!L) {
                                        D = false;
                                        if (!D) {
                                            var c = ContainsAB(ap, lines, lineIndex, w);
                                            if (c) {
                                                var N = ap.toUpperCase();
                                                for (curChar = 65; curChar < 90; curChar++) {
                                                    var aq = String.fromCharCode(curChar);
                                                    var h = String.fromCharCode(curChar + 1);
                                                    var af = N.indexOf(aq);
                                                    var F = N.indexOf(h);
                                                    if (af > -1 && F > -1) {
                                                        numPerNow++;
                                                    } else {
                                                        break;
                                                    }
                                                }
                                            } else {
                                                if (x == 1 && isCompact && !isEnglish) {
                                                    var al = /□|○|①|②|③|④|⑤|⑥|⑦|⑧/ig;
                                                    var O = ap.split(al);
                                                    if (O.length >= 3) {
                                                        numPerNow = O.length - 1;
                                                    } else {
                                                        var O = ap.split(/(\d\d?\.|\d\d?、|\(\d\d?\)|（\d\d?）)/ig);
                                                        if (O.length < 4) {
                                                            O = ap.split(/(\x20|\t)+/ig);
                                                        }
                                                        if (O.length < 3) {
                                                            if (aa.contains(RadioQType) || aa.contains(CeShiQType) || aa.contains(CeShiQCheckType)) {
                                                                numPerNow = 6;
                                                            } else {
                                                                qType = "question";
                                                                I = false;
                                                                break;
                                                            }
                                                        } else {
                                                            numPerNow = (O.length + 1) / 2;
                                                        }
                                                    }
                                                }
                                            }
                                            tempDataNode = AddSelectTitle(aa, qIndex, qType);
                                        }
                                        itemValue = 0;
                                        qIndex++;
                                        L = true;
                                    }
                                    if (L && !D) {
                                        if (ap.startWith(LabelItem)) {
                                            label = ap.substr(4);
                                        } else {
                                            if (qType == "radio" || qType == "likert") {
                                                itemValue++;
                                            }
                                            var O = null;
                                            var T = false;
                                            if (isCompact) {
                                                if (Y) {
                                                    c = ContainsAB(ap, lines, lineIndex, w);
                                                    Y = false;
                                                    curChar = 65;
                                                }
                                                if (c) {
                                                    var N = ap.toUpperCase();
                                                    var v = N.match(/[A-Z]{3,}/ig);
                                                    if (v) {
                                                        for (var B = 0; B < v.length; B++) {
                                                            var ak = v[B].length;
                                                            var K = "";
                                                            for (var ad = 0; ad < ak; ad++) {
                                                                K += "*";
                                                            }
                                                            N = N.replace(v[B], K);
                                                        }
                                                    }
                                                    var A = "";
                                                    var E = 0;
                                                    for (; curChar < 90; curChar++) {
                                                        var aq = String.fromCharCode(curChar);
                                                        var h = String.fromCharCode(curChar + 1);
                                                        var P = String.fromCharCode(curChar - 1);
                                                        var af = N.indexOf(aq);
                                                        var F = N.indexOf(h);
                                                        var q = N.indexOf(P);
                                                        var f = N.indexOf("其它");
                                                        if (f == -1) {
                                                            f = N.indexOf("其他");
                                                        }
                                                        if (F == -1) {
                                                            h = String.fromCharCode(curChar + 2);
                                                            F = N.indexOf(h);
                                                            if (F > -1) {
                                                                curChar++;
                                                            }
                                                        }
                                                        if (af > -1 && F > -1) {
                                                            A = ap.substring(af, F);
                                                            AddSelectItem(tempDataNode, A);
                                                        } else {
                                                            if (af > -1) {
                                                                A = ap.substring(af);
                                                                AddSelectItem(tempDataNode, A);
                                                            } else {
                                                                if (f > -1 && q == -1) {
                                                                    A = ap.substring(f);
                                                                    AddSelectItem(tempDataNode, A);
                                                                    break;
                                                                } else {
                                                                    break;
                                                                }
                                                            }
                                                        }
                                                    }
                                                    T = true;
                                                } else {
                                                    if (!isEnglish) {
                                                        var al = /(□|○|①|②|③|④|⑤|⑥|⑦|⑧)/ig;
                                                        O = ap.split(al);
                                                        var ab = false;
                                                        var R = 1;
                                                        if (O.length < 4) {
                                                            O = ap.split(/(\d\d?\.|\d\d?、|\(\d\d?\)|（\d\d?）)/ig);
                                                            if (O.length < 4) {
                                                                O = ap.split(/(\x20|\t)+/ig);
                                                                ab = true;
                                                                R = 0;
                                                            }
                                                        }
                                                        if (O.length > 1) {
                                                            T = true;
                                                            for (var ai = R; ai < O.length; ai++) {
                                                                if (ab) {
                                                                    AddSelectItem(tempDataNode, O[ai]);
                                                                } else {
                                                                    AddSelectItem(tempDataNode, O[ai] + O[ai + 1]);
                                                                    ai++;
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            if (!T) {
                                                AddSelectItem(tempDataNode, ap);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                if (I) {
                    tempDataNode._endLine = lineIndex;
                    if (aa.contains(LikertType) || aa.contains(ReverseLikertType) || aa.contains(LikertMatrixType) || aa.contains(RevLikertMatrixType)) {
                        var Q = aa.contains(RevLikertMatrixType) || aa.contains(ReverseLikertType);
                        var b = 1;
                        if (Q) {
                            b = tempDataNode._select.length - 1;
                        }
                        for (var s = 1; s < tempDataNode._select.length; s++) {
                            tempDataNode._select[s]._item_value = b;
                            if (Q) {
                                b--;
                            } else {
                                b++;
                            }
                        }
                    } else {
                        if (aa.contains(CeShiQType) || aa.contains(CeShiQCheckType) || isKaoShi) {
                            tempDataNode._hasvalue = true;
                            tempDataNode._isCeShi = true;
                            tempDataNode._ceshiDesc = "";
                            tempDataNode._ceshiValue = 5;
                            var o = /[\(（]?(\d+)分[\)）]?\s*$/;
                            var S = tempDataNode._title.match(o);
                            if (S && S[1]) {
                                tempDataNode._ceshiValue = parseInt(S[1]) || 5;
                                tempDataNode._title = tempDataNode._title.replace(o, "");
                            }
                            var an = /[\(（]\s*([A-Z])\s*[\)）]/;
                            var M = false;
                            if (tempDataNode._type == "check") {
                                an = /[\(（]\s*([A-Z]+)\s*[\)）]/;
                            }
                            var ao = tempDataNode._title.match(an);
                            if (ao && ao[1]) {
                                var m = ao[1];
                                for (var s = 1; s < tempDataNode._select.length; s++) {
                                    var ae = trim(tempDataNode._select[s]._item_title);
                                    for (var ac = 0; ac < m.length; ac++) {
                                        if (ae.startWith(m[ac])) {
                                            tempDataNode._select[s]._item_radio = true;
                                            M = true;
                                            break;
                                        }
                                    }
                                }
                            }
                            if (!M) {
                                tempDataNode._select[1]._item_radio = true;
                            } else {
                                tempDataNode._title = tempDataNode._title.replace(an, "（）");
                            }
                        }
                    }
                    if (tempDataNode._select && tempDataNode._numperrow >= tempDataNode._select.length) {
                        tempDataNode._numperrow = tempDataNode._select.length - 1;
                    }
                    createQ(tempDataNode);
                    tempDataNode = null;
                } else {
                    if (qType == "cut" || qType == "page") {
                        if (!isEmpty(n)) {
                            n = aa + "<br/>" + n;
                        } else {
                            n = aa;
                        }
                        if (qType == "cut") {
                            tempDataNode = AddCut(n);
                        } else {
                            tempDataNode = AddPage(n);
                        }
                        createQ(tempDataNode);
                    } else {
                        if (qType == "question") {
                            if (x == 1) {
                                for (; lineIndex < w; lineIndex++) {
                                    var ap = lines[lineIndex];
                                    if (!IsBlank(ap)) {
                                        aa += ap;
                                    }
                                }
                            }
                            tempDataNode = AddQuestion(aa, qIndex);
                            createQ(tempDataNode);
                            qIndex++;
                        }
                    }
                }
                titleProcessed = false;
            }
        }
        txtContent.value = "";
        if (X && window.parent.batAddQTimes == 1) {
            var aj = window.parent.document.getElementById("chkUseSelfTopic");
            if (!aj.checked) {
                aj.checked = true;
                aj.onclick();
            }
        }
        window.parent.PDF_close();
    } catch(am) {
        divMsg.innerHTML = "问卷格式不对，<a target='_blank' href='/help/help.aspx?helpid=138&h=1'>查看示例文本</a>";
        return;
    }
}
function clearTxt() {
    if (confirm("确认清空文本框内容吗？")) {
        txtContent.value = "";
    }
}
function createQ(a) {
    window.parent.lastAddNewQTime = new Date().getTime();
    var b = window.parent.createQ(a);
}
//function createQ(a) {
//    //window.parent.lastAddNewQTime = new Date().getTime();
//    if (QBodyTxtVal == undefined || QBodyTxtVal == null) {
//        var b = window.parent.createQ(a);
//    } else {
//        var b = createQ(a);
//    }
//}
function trim(a) {
    if (a && a.replace) {
        return a.replace(/(^[\s\u3000]*)|([\s\u3000]*$)/g, "");
    } else {
        return a;
    }
}
function toInt(a) {
    return parseInt(trim(a));
}
function isEmpty(a) {
    return trim(a) == "";
}
function isInt(a) {
    var b = /^-?[0-9]+$/;
    return b.test(a);
}
String.prototype.contains = function(a) {
    return this.indexOf(a) != -1;
};
String.prototype.endWith = function(a) {
    if (a == null || a == "" || this.length == 0 || a.length > this.length) {
        return false;
    }
    if (this.substring(this.length - a.length) == a) {
        return true;
    } else {
        return false;
    }
    return true;
};
String.prototype.startWith = function(a) {
    if (a == null || a == "" || this.length == 0 || a.length > this.length) {
        return false;
    }
    if (this.substr(0, a.length) == a) {
        return true;
    } else {
        return false;
    }
    return true;
};
function SBCCaseToNumberic(c) {
    var a = "";
    for (var b = 0; b < c.length; b++) {
        if (c.charCodeAt(b) == 12288) {
            a += String.fromCharCode(c.charCodeAt(b) - 12256);
            continue;
        }
        if (c.charCodeAt(b) > 65280 && c.charCodeAt(b) < 65375) {
            a += String.fromCharCode(c.charCodeAt(b) - 65248);
        } else {
            a += String.fromCharCode(c.charCodeAt(b));
        }
    }
    return a;
}
function DBC2SBC(b) {
    var e = b.value;
    var a;
    if (e.length <= 0) {
        return false;
    }
    qstr1 = "ＡＢＣＤＥＦＧＨＩＪＫＭＮＯＰＱＲＳＴＵＶＷＸＹＺａｂｃｄｅｆｇｈｉｊｋｍｎｏｐｑｒｓｔｕｖｗｘｙｚ１２３４５６７８９０［］（）";
    bstr1 = "ABCDEFGHIJKMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz1234567890[]()";
    var d = false;
    for (a = 0; a < e.length; a++) {
        var f = e.charAt(a);
        if (qstr1.indexOf(f) != -1) {
            e = e.replace(f, bstr1.charAt(qstr1.indexOf(f)));
            d = true;
        }
    }
    if (d) {
        b.value = e;
    }
}
function checkEnglish() {
    var d = txtContent.value.replace(/\n|\r/gi, " ");
    var b = d.match(/[a-z]+[\s\?\,\.]/gi);
    var c = 0;
    if (b) {
        c = b.length + 1;
    }
    var a = 0;
    b = d.match(/[\u4e00-\u9fa5]/gi);
    if (b) {
        a = b.length + 1;
    }
    var e = document.getElementById("divEnglish");
    if (c > a) {
        e.style.display = "";
        isEnglish = true;
        //cbEnglish.checked = true;
    }
}
/*cbEnglish.onclick = function() {
    isEnglish = cbEnglish.checked;
};*/

    txtContent.onpaste = function() {
        setTimeout(function() {
                DBC2SBC(txtContent);
                checkEnglish();
            },
            40);
    }


function GetStartDigit(a) {
    a = trim(a);
    var c = /^\s*([a-zA-Z]|问题|第)?\s*\d+|\(\d\)+|[\uFF10-\uFF19]+|（[\uFF10-\uFF19]+）/g;
    var f = -1;
    var b = c.exec(a);
    if (b) {
        var e = b[0];
        if (e.length > 1 && ((e.charAt(0) >= "a" && e.charAt(0) <= "z") || (e.charAt(0) >= "A" && e.charAt(0) <= "Z"))) {
            e = e.substr(1);
        }
        e = e.replace(/第\s*/, "").replace(/问题\s*/, "");
        var d = SBCCaseToNumberic(e);
        if (!isInt(d)) {
            f = -1;
        } else {
            f = toInt(d);
        }
    }
    if (isDigitBig) {
        c = /^\s*([一二三四五六七八九十]{1,3})/g;
        b = c.exec(a);
        if (b) {
            return ChineseNumberToArabicNumber(b[0]);
        }
    }
    return f;
}
function StartWithDigit(j) {
    var d = GetStartDigit(j);
    if (d == -1) {
        return IsSample(j);
    }
    if (d >= 1000) {
        return false;
    }
    var a = /^\s*\d+\s*[-－—~～]{1,3}\s*\d+/g;
    if (a.test(j) || /^\s*\d+[次万%千小年以岁元人本个后级GXM分]/.test(j)) {
        return false;
    }
    if (d == prevDigit + 1 && !choiceStartWithNumber) {
        if (qType == "matrix") {
            if (d == prevMatrixDigit + 1) {
                return false;
            }
            if (!StartWithQType(j)) {
                return false;
            }
        }
        prevDigit = d;
        choiceStartWithNumber = false;
        return true;
    }
    if (prevDigit == -1) {
        prevDigit = d;
    }
    if (qType == "matrix") {
        prevMatrixDigit = d;
    }
    a = /\d[\.、]|\(?\d\)|（?\d）/g;
    var e = j.match(a);
    if (e && e.length >= 2) {
        var b = true;
        for (var c = 0; c < e.length; c++) {
            var g = e[c];
            var h = toInt(g);
            if (prevChoiceD != 0) {
                var f = h - prevChoiceD;
                if (f == 0 || h / f - prevChoiceD / f != 1) {
                    b = false;
                }
            }
            prevChoiceD = h;
        }
        if (b) {
            return false;
        } else {
            prevChoiceD = 0;
        }
    }
    if (qType == "matrix") {
        if (!StartWithQType(j)) {
            return false;
        }
    }
    if (titleProcessed && qType != "cut" && d == 1) {
        choiceStartWithNumber = true;
    }
    if (choiceStartWithNumber) {
        return false;
    }
    return true;
}
function ChineseNumberToArabicNumber(a) {
    var d = /(^[一二三四五六七八九十]$)|(^十[一二三四五六七八九]$)|(^[二三四五六七八九]十?[一二三四五六七八九]{0,1}$)/;
    if (!d.exec(a)) {
        return - 1;
    }
    var b = -1;
    var c = "";
    var g = "一二三四五六七八九十";
    var f = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    var e = a.length;
    switch (e) {
        case 1:
            b = f[g.indexOf(a)];
            break;
        case 2:
            if (a[0] != "十") {
                c = f[g.indexOf(a[0])] + "";
                if (a[1] == "十") {
                    c += "0";
                } else {
                    c += f[g.indexOf(a[1])];
                }
                b = toInt(c);
            } else {
                c = "1";
                c += f[g.indexOf(a[1])];
                b = toInt(c);
            }
            break;
        case 3:
            c = f[g.indexOf(a[0])] + "";
            c += f[g.indexOf(a[2])] + "";
            b = toInt(c);
            break;
        default:
            break;
    }
    return b;
}
function StartWithQType(a) {
    if (a.contains(MatrixType) || a.contains(LikertMatrixType) || a.contains(RevLikertMatrixType) || a.contains("[矩阵单选题]") || a.contains(SumType) || a.contains(RadioQType) || a.contains(CeShiQType) || a.contains(CeShiQCheckType) || a.contains(SortType) || a.contains(TableType) || a.contains(GapFillType) || a.contains(GapFillTest) || a.contains(LikertType) || a.contains(ReverseLikertType) || a.contains(CutType) || a.contains(PageType) || IsCut(a)) {
        return true;
    }
    if (a.contains(AllQType)) {
        return true;
    }
    return false;
}
function IsCut(a) {
    a = trim(a);
    var b = /^\s*(基本信息|个人信息)/g;
    if (b.exec(a)) {
        return true;
    }
    if (isDigitBig) {
        return false;
    }
    b = /^\s*【?([一二三四五六七八九][\.。、\x20\t．:：]|[（(][一二三四五六七八九][)）]|第[一二三四五六七八九])/g;
    if (b.exec(a)) {
        var c = a.match(/[一二三四五六七八九]/g).length;
        if (c > 2) {
            return false;
        }
        return true;
    }
    return false;
}
var SampleArray = ["公司", "工作", "薪水", "收入", "区域", "职业", "职别", "年龄", "姓名", "性别", "婚", "学校", "年级", "专业", "院系", "邮件", "Email", "手机", "电话", "地址", "城市"];
function IsSample(a) {
    a = trim(a);
    if (a.endWith(":") || a.endWith("：")) {
        for (var b = 0; b < SampleArray.length; b++) {
            if (a.contains(SampleArray[b])) {
                return true;
            }
        }
    }
    return false;
}
function IsBlank(a) {
    if (a == undefined) {
        return false;
    }
    var b = /^(\-|=|_)+$/g;
    a = trim(a);
    if (b.exec(a)) {
        return true;
    }
    if (!isEmpty(a) && a != "\n") {
        return false;
    }
    return true;
}
function IsNumber(a) {
    if (a == "0" || a == "1" || a == "2" || a == "3" || a == "4" || a == "5" || a == "6" || a == "7" || a == "8" || a == "9") {
        return true;
    } else {
        return false;
    }
}
function isCheck(a) {
    if (a.contains("单选")) {
        return false;
    }
    if ((a.contains("多") || a.contains("复数") || a.contains("限") || a.contains("最少") || a.contains("至少")) && a.contains("选")) {
        return true;
    }
    if (a.contains("哪些")) {
        return true;
    }
    return false;
}
function AddQuestion(d, g) {
    if (d.contains(GapFillStr)) {
        return AddGapFill(d, g);
    }
    var c = new Object();
    c._type = "question";
    c._topic = g + "";
    if (d.contains(GapFillTest) || window.isKaoShi) {
        c._isCeShi = true;
        var b = /[\(（]?\s*([×错√对])\s*[\)）]?\s*$/;
        var a = d.match(b);
        if (a && a[1]) {
            c._type = "radio";
            c._title = d.replace(b, "");
            c._keyword = "";
            c._relation = "";
            c._hasvalue = true;
            c._ceshiDesc = "";
            c._ceshiValue = 5;
            c._hasjump = false;
            c._anytimejumpto = "0";
            //c._requir = true;
            c._requir = false;
            c._ins = "";
            c._randomChoice = false;
            c._verify = "";
            c._numperrow = 1;
            c._select = new Array();
            c._select.push(new Object());
            var f = a[1].contains("对") || a[1].contains("√");
            var e = new Object();
            e._item_title = "对";
            e._item_radio = f;
            e._item_value = "";
            e._item_jump = "0";
            e._item_tb = false;
            e._item_tbr = false;
            e._item_img = "";
            e._item_imgtext = false;
            e._item_desc = "";
            e._item_label = "";
            c._select.push(e);
            e = new Object();
            e._item_title = "错";
            e._item_radio = !f;
            e._item_value = "";
            e._item_jump = "0";
            e._item_tb = false;
            e._item_tbr = false;
            e._item_img = "";
            e._item_imgtext = false;
            e._item_desc = "";
            e._item_label = "";
            c._select.push(e);
            return c;
        }
    }
    c._title = ProcessTitle(d);
    c._keyword = "";
    c._relation = "";
    c._verify = "";
    c._tag = "";
    c._height = 1;
    c._maxword = "";
    c._requir = false;
    c._norepeat = false;
    c._default = "";
    c._ins = "";
    c._hasjump = false;
    c._anytimejumpto = "0";
    c._needOnly = false;
    c._hasList = false;
    c._listId = -1;
    c._width = "";
    c._underline = false;
    c._minword = "";
    c._startLine = lineIndex;
    c._endLine = lineIndex;
    return c;
}
function getGapFillCount(b) {
    var d = 0;
    var e = 0;
    var a = b.length;
    do {
        e = b.indexOf(GapFillStr, e);
        if (e != -1) {
            d++;
            e += GapFillStr.length;
            for (var c = e; c < a; c++) {
                if (b.charAt(c) != "_") {
                    break;
                }
                e++;
            }
        }
    } while ( e != - 1 );
    return d;
}
function replaceGapFill(l, b) {
    var d = 0;
    var a = 0;
    var g = new StringBuilder();
    var m = 0;
    do {
        a = d;
        d = l.indexOf(GapFillStr, d);
        var f = GapFillStr;
        if (d != -1) {
            var h = 0;
            g.append(l.substr(a, d - a));
            d += GapFillStr.length;
            for (var c = d; c < l.length; c++) {
                if (l[c] != "_") {
                    break;
                }
                h++;
                f += "_";
                d++;
            }
            var e = GapWidth + h * (GapWidth / 3);
            var k = false;
            if (b._rowVerify[m] && b._rowVerify[m]._verify == "日期") {
                e = 70;
                k = true;
            }
            var i = GapFillReplace.replace("width:" + GapWidth + "px", "width:" + e + "px");
            if (b._useTextBox) {
                i = i.replace("/>", " class='inputtext'/>");
            } else {
                i = i.replace("/>", " class='underline'/>");
            }
            g.append(i);
            m++;
        } else {
            if (a < l.length) {
                g.append(l.substr(a));
            }
        }
    } while ( d != - 1 );
    return g.toString();
}
function AddGapFill(b, d) {
    var c = getGapFillCount(b);
    var a = new Object();
    a._type = "gapfill";
    a._topic = d + "";
    a._verify = "";
    if (b.contains(GapFillTest) || window.isKaoShi) {
        a._isCeShi = true;
    }
    b = ProcessTitle(b);
    a._title = b;
    a._keyword = "";
    a._relation = "";
    a._tag = "";
    //a._requir = true;
    a._requir = false;
    a._gapcount = c;
    a._ins = "";
    a._hasjump = false;
    a._anytimejumpto = "0";
    a._useTextBox = false;
    a._rowVerify = new Array();
    a._startLine = lineIndex;
    a._endLine = lineIndex;
    return a;
}
function AddSelectTitle(d, e, f) {
    var c = new Object();
    c._startLine = lineIndex;
    c._tag = "";
    if (f == "sort") {
        c._type = "check";
        c._tag = "1";
        d = d.replace(SortType, "");
    } else {
        if (f == "likert") {
            c._type = "radio";
            c._tag = "101";
            d = d.replace(LikertType, "").replace(ReverseLikertType, "");
        } else {
            c._type = f;
            d = d.replace(CeShiQType, "").replace(CeShiQCheckType, "");
        }
    }
    c._topic = e + "";
    if (f == "check") {
        var a = /限选(\d)项/;
        var b = d.match(a);
        if (b && b[1] > 0) {
            c._lowLimit = b[1];
            c._upLimit = b[1];
            d = d.replace(a, "");
        }
        a = /最多选(\d)项/;
        b = d.match(a);
        if (b && b[1] > 0) {
            c._upLimit = b[1];
            c._lowLimit = "";
            d = d.replace(a, "");
        }
        a = /[最至]少选(\d)项/;
        b = d.match(a);
        if (b && b[1] > 0) {
            c._lowLimit = b[1];
            c._upLimit = "";
            d = d.replace(a, "");
        }
    }
    d = ProcessTitle(d);
    c._title = d;
    c._keyword = "";
    c._relation = "";
    if (f == "likert") {
        c._hasvalue = true;
    } else {
        c._hasvalue = false;
    }
    c._hasjump = false;
    c._anytimejumpto = "0";
    //c._requir = true;
    c._requir = false;
    c._ins = "";
    c._randomChoice = false;
    c._verify = "";
    if (numPerNow >= 6) {
        numPerNow = numPerNow / 2;
    }
    if (d == "您的性别：" && numPerNow == 1) {
        c._verify = "性别";
        numPerNow = 6;
    }
    c._numperrow = numPerNow;
    numPerNow = 1;
    c._select = new Array();
    c._select.push(new Object());
    return c;
}
function AddSelectItem(b, a) {
    a = trim(a).replace("□", "");
    if (!IsBlank(a)) {
        var d = false;
        if (a.endWith(GapFillStr) || a.endWith(GapFillStr + ")") || a.endWith(GapFillStr + "）")) {
            a = a.replace(/[_]/g, "");
            d = true;
        } else {
            if (a.contains("请注明") || a.contains("请说明")) {
                a = a.replace(/[(（]?(请注明|请说明|请填写)[)）]?/g, "");
                d = true;
            }
        }
        var c = new Object();
        c._item_title = a;
        c._item_radio = false;
        c._item_value = "";
        c._item_jump = "0";
        c._item_tb = d;
        c._item_tbr = false;
        if (d) {
            c._item_tbr = true;
        }
        c._item_img = "";
        c._item_imgtext = false;
        c._item_desc = "";
        c._item_label = label || "";
        label = "";
        b._select.push(c);
    }
}
function AddColumn(b, a) {
    if (isEmpty(trim(a))) {
        return;
    }
    if (!b._columntitle) {
        b._columntitle = a;
    } else {
        b._columntitle += "\n" + a;
    }
}
function AddMatrixTitle(b, c, d) {
    var a = new Object();
    a._startLine = lineIndex;
    a._type = "matrix";
    a._topic = c + "";
    a._keyword = "";
    a._relation = "";
    a._verify = "";
    if (b.contains(LikertMatrixType) || b.contains(RevLikertMatrixType)) {
        d = "101";
    }
    b = ProcessTitle(b);
    if (d == "303") {
        b = b.replace(TableType, "");
    } else {
        b = b.replace(MatrixType, "").replace(LikertMatrixType, "").replace(RevLikertMatrixType, "").replace("[矩阵单选题]", "");
    }
    a._tag = d;
    a._title = b;
    if (d == "303" || d == "101") {
        a._hasvalue = true;
    } else {
        a._hasvalue = false;
    }
    a._hasjump = false;
    a._anytimejumpto = "0";
    //a._requir = true;
    a._requir = false;
    a._ins = "";
    a._rowwidth = "";
    a._rowwidth2 = "";
    a._rowtitle = "";
    a._rowtitle2 = "";
    a._columntitle = "";
    a._select = new Array();
    a._select.push(new Object());
    return a;
}
function AddMatrixLine(b, a) {
    if (!IsBlank(a)) {
        if (!b._rowtitle) {
            b._rowtitle = "";
        }
        if (b._rowtitle) {
            b._rowtitle += "\n";
        }
        if (!isEmpty(label)) {
            b._rowtitle += DesignLabelItem + label + "\n";
            label = "";
        }
        b._rowtitle += a;
    }
}
function AddSumTitle(b, c) {
    var a = new Object();
    a._startLine = lineIndex;
    a._verify = "";
    a._type = "sum";
    a._topic = c + "";
    a._keyword = "";
    a._relation = "";
    b = ProcessTitle(b);
    b = b.replace(SumType, "");
    a._title = b;
    a._tag = "";
    a._hasjump = false;
    a._anytimejumpto = "0";
    //a._requir = true;
    a._requir = false;
    a._ins = "";
    a._rowwidth = 100;
    a._total = 100;
    return a;
}
function ContainsAB(a, k, j, h) {
    if (isEnglish) {
        return false;
    }
    var i = a.toUpperCase();
    var c = i.indexOf("A");
    var g = false;
    var f = false;
    if (c > -1) {
        g = true;
        if (c + 1 < i.length && i.charAt(c + 1) >= "A" && i.charAt(c + 1) <= "Z") {
            g = false;
        }
    }
    var e = false;
    var d = g && !i.contains("AB");
    if (d) {
        c = i.indexOf("B");
        if (c > -1) {
            f = true;
            if (c + 1 < i.length && i.charAt(c + 1) >= "A" && i.charAt(c + 1) <= "Z") {
                f = false;
            }
        }
        if (!f && j + 1 < h) {
            var b = k[j + 1].toUpperCase();
            c = b.indexOf("B");
            if (c > -1) {
                f = true;
                if (c + 1 < b.length && b.charAt(c + 1) >= "A" && b.charAt(c + 1) <= "Z") {
                    f = false;
                }
            }
        }
        if (f) {
            e = true;
        }
    }
    return e;
}
function replace_specialChar(a) {
    return a.replace(/(§)/g, "ξ").replace(/(¤)/g, "○").replace(/(〒)/g, "╤");
}
function regsplit(f, d) {
    var e = f.split(d),
        c = f.match(d),
        a = [e[0]];
    if (!c) {
        return a;
    }
    for (var b = 0; b < c.length; ++b) {
        a[2 * b + 1] = c[b];
        a[2 * b + 2] = e[b + 1];
    }
    return a;
}
function ProcessTitleItems(d) {
    if (isEnglish) {
        return false;
    }
    var e = false;
    var f = null;
    var o = d.toUpperCase();
    var a = d;
    var c = "radio";
    if (isCheck(d)) {
        c = "check";
    }
    var b = o.indexOf("A");
    var k = false;
    var i = false;
    if (b > -1) {
        k = true;
        if (b + 1 < o.length && o.charAt(b + 1) > "A" && o.charAt(b + 1) < "Z") {
            k = false;
        }
    }
    b = o.indexOf("B");
    if (b > -1) {
        i = true;
        if (b + 1 < o.length && o.charAt(b + 1) > "A" && o.charAt(b + 1) < "Z") {
            i = false;
        }
    }
    var h = k && i && !o.contains("AB");
    if (h) {
        f = regsplit(d, /[A-Z][^A-Z]/ig);
        a = f[0];
        e = true;
        numPerNow = (f.length - 1) / 2;
        tempDataNode = AddSelectTitle(a, qIndex, c);
        for (var g = 1; g < f.length; g += 2) {
            var l = f[g] + f[g + 1];
            AddSelectItem(tempDataNode, l);
        }
    } else {
        var n = /□|○|①|②|③|④|⑤|⑥|⑦|⑧/ig;
        f = d.split(n);
        if (f.length >= 3) {
            numPerNow = f.length - 1;
            var m = a.search(n);
            a = a.substr(0, m);
            tempDataNode = AddSelectTitle(a, qIndex, c);
            for (var g = 1; g < f.length; g += 1) {
                var l = f[g];
                if (!isEmpty(l)) {
                    AddSelectItem(tempDataNode, l);
                }
            }
            e = true;
        }
    }
    return e;
}
function ProcessTitle(a) {
    var d = 0;
    a = a.replace("[单选题]", "").replace("[复选题]", "").replace("[多选]", "").replace("[主观题]", "").replace("[问答题]", "").replace("[必答题]", "").replace("(可多选)", "").replace("[排序题]", "").replace("(多选)", "").replace("[矩阵题]", "").replace("[矩阵单选题]", "").replace("[段落说明]", "").replace("[表格题]", "").replace("[比重题]", "").replace("[分页栏]", "").replace(AllQType, "").replace("[测试填空题]", "");
    if (!isCompact && IsNumber(a.charAt(0))) {
        d++;
        for (var b = 1; b < a.length; b++) {
            if (IsNumber(a.charAt(b))) {
                d++;
            } else {
                var e = a.charAt(b);
                if (e == "." || e == "。" || e == "、" || e == " " || e == "．") {
                    d++;
                } else {
                    break;
                }
            }
        }
        return a.substr(d);
    } else {
        return a;
    }
}