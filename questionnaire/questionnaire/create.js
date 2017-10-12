/**
 * Created by jfhl on 2015/9/11.
 */
$El = function (element) {
    return (typeof (element) == 'object' ? element : document.getElementById(element));
};

$$Tag = function(a, c) {
    if (c) {
        var b = c.getElementsByTagName(a);
        if (!b || b.length == 0) {
            b = new Array();
            getbyTagName(c, a, b);
            return b;
        }
        return b;
    } else {
        return document.getElementsByTagName(a);
    }
};

//创建元素$ce,创建c元素，在c里注入d内容，在a中创建c
$ce = function(c, d, a) {
    var b = document.createElement(c);
    if (d) {
        b.innerHTML = d;
    }
    a.appendChild(b);
    return b;
};
//全局变量
var type_check = "多选题";
var EditorIndex = 1;
var hasDisplayEditTipTimes = 0;

var status_tip = $El("status_tip");
var topnav = $El("topnav");
var divSurvey = $El("sur");
var divMenu = $El("divMenu");
var questions = $El("question");
var firstPage = null;
var questionHolder = new Array();
var cur = null;
var curover = null;
var curinsert = null;
var langVer = 0;
var WjxActivity = new Object();
var DataArray = new Array();
var total_page = 0;
var total_question = 0;
var select_item_num = 0;
var isMergeAnswer = false;
var isCompleteLoad = false;
var referRelHT = new Object();
var designversion = "7";
var hasInsPromoteJump = false;
var lastAddNewQTime = null;
var prevcurmove = null;
var useShortCutAddNewQ = false;
var QIndentity = 1;
var status_tip_timeout = null;
var batAddQTimes = 0;
var bodyWidth = document.documentElement.clientWidth || document.body.clientWidth;


//操作的7按钮常量
var toolbar_start = "<ul class='stuff'>";
var toolbar_add = "<li><a href='javascript:void(0);' onclick='editQ(this);' title='您也可以双击题目来进行编辑'><span class='design-icon design-edit'></span><span>编辑</span></a></li>";
var toolbar_copy = "<li><a href='javascript:void(0);' onclick='curover.copyQ();' title='复制此题'><span class='design-icon design-copy'></span><span>复制</span></a></li>";
var toolbar_moveup = "<li><a href='javascript:void(0);' onclick='curover.moveUp();'  title='将此题上移'><span class='design-icon design-up'></span><span>上移</span></a></li>";
var toolbar_movedown = "<li><a href='javascript:void(0);' onclick='curover.moveDown();'  title='将此题下移'><span class='design-icon design-down'></span><span>下移</span></a></li>";
var toolbar_movefirst = "<li><a href='javascript:void(0);' onclick='curover.moveFirst();'  title='将此题移动到第一题'><span class='design-icon design-first'></span><span>最前</span></a></li>";
var toolbar_movelast = "<li><a href='javascript:void(0);' onclick='curover.moveLast();'  title='将此题移动到最后一题'><span class='design-icon design-last'></span><span>最后</span></a></li>";
var toolbar_del = "<li><a href='javascript:void(0);' onclick='curover.deleteQ();'  title='删除此题'><span class='design-icon design-delete'></span><span>删除</span></a></li>";
var toolbar_del_move = toolbar_del + toolbar_moveup + toolbar_movedown + toolbar_movefirst + toolbar_movelast;
var toolbar_end = "</ul>";

//获取该对象所在数组的index
Array.prototype.indexOf = function(c) {//c表示题目对象
    for (var b = 0,a = this.length; b < a; b++) {
        if (this[b] == c) {
            return b;
        }
    }
    return - 1;
};
Array.prototype.moveUp = function(b) {
    var a = this.indexOf(b);
    return this._moveElement(a, -1);
};
Array.prototype.moveFirst = function(b) {
    var a = this.indexOf(b);
    while (this._moveElement(a--, -1)) {}
};
Array.prototype.moveDown = function(b) {
    var a = this.indexOf(b);
    return this._moveElement(a, 1);
};
Array.prototype.moveLast = function(b) {
    var a = this.indexOf(b);
    while (this._moveElement(a++, 1)) {}
};
Array.prototype.moveTo = function(d, e) {
    var a = this.indexOf(d);
    var c = Math.abs(e - a);
    if (a < e) {
        for (var b = 0; b < c; b++) {
            this._moveElement(a++, 1);
        }
    } else {
        for (var b = 0; b < c; b++) {
            this._moveElement(a--, -1);
        }
    }
};

//标题的移入移出样式
initEventHandler();
function initEventHandler() {
    var a = $El("divId");
    a.onmouseover = function() {
        this.style.border = "2px solid #FDB553";
    };
    a.onmouseout = function() {
        this.style.border = "2px solid #ffffff";
    };
    //$El('pater_title').onclick=editTitle;
    for (var c = 0; c < questionHolder.length; c++) {
        var b = questionHolder[c];
        setQHandler(b);
    }
}
/*function editTitle() {
 alert(2);
 $El('pater_title').style.display='none';
 $El('pater_title_input').style.display='block';
 $El('pater_title_input').focus();
 }
 function tOnblur(){
 var otxt=$El('pater_title_input').value;
 $El('pater_title').style.display='block';
 $El('pater_title_input').style.display='none';
 $El('pater_title').innerHTML=otxt;
 }*/

//移动元素，a表示移动的对象的位置，d表示移动的矢量（d的值为n表示向下移动你个位置（负数为向上））
Array.prototype._moveElement = function(a, d) {
    var c, b;
    if (a < 0 || a >= this.length) {
        return false;
    }
    c = a + d;
    if (c < 0 || c >= this.length || c == a) {
        return false;
    }
    b = this[c];
    this[c] = this[a];
    this[a] = b;
    return true;
};
Array.prototype.insertAt = function(b, a) {
    this.splice(a, 0, b);
};
Array.prototype.insertBefore = function(b, a) {
    this.insertAt(b, this.indexOf(a));
};
Array.prototype.remove = function(a) {
    this.removeAt(this.indexOf(a));
    return a;
};
Array.prototype.removeAt = function(a) {
    var b = this[a];
    if (b) {
        this.splice(a, 1);
    }
    return b;
};

//string数组操作
function StringBuilder() {
    this._stringArray = new Array();
}
StringBuilder.prototype.append = function(a) {
    this._stringArray.push(a);
};
StringBuilder.prototype.toString = function(a) {
    a = a || "";
    return this._stringArray.join(a);
};
StringBuilder.prototype.clear = function() {
    this._stringArray.length = 0;
};
//处理键盘事件 禁止后退键（Backspace）密码或单行、多行文本框除外
function forbidBackSpace(f) {   //||是为了兼容IE的写法
    var c = f || window.event;
    var d = c.target || c.srcElement;
    var b = d.type || d.getAttribute("type");
    var a = c.keyCode == 8 && b != "password" && b != "text" && b != "textarea";    //keycode 8 = BackSpace键
    if (a) {
        return false;
    }
}
document.onkeydown = forbidBackSpace;
document.onkeypress = forbidBackSpace;

loadComplete();
//成功获得数据,然后记载js
function loadComplete() {
    show_status_tip("成功获得数据", 1000);
    setSidePos();
    divMenu.style.visibility = "visible";
    topnav.style.visibility = "visible";
    $importNoCache("./questionnaire/utility_new.js");//拖动js
}
function $importNoCache(a) {
    $import(a);
}
//插入js
function $import(b) {
    var a = document.createElement("script");
    a.setAttribute("src", b);
    a.setAttribute("type", "text/javascript");
    document.getElementsByTagName("head")[0].appendChild(a);
}
function setSidePos() {
    status_tip.style.left = getCoords(divSurvey).left + "px";
    var a = document.documentElement.clientHeight || document.body.clientHeight;
    divSurvey.style.height = a - 155 + "px";
}
function isEmpty(a) {
    return trim(a) == "";
}
function isInt(a) {
    var b = /^-?[0-9]+$/;
    return b.test(a);
}
function isPositive(a) {
    var b = /^\+?[1-9][0-9]*$/;
    return b.test(a);
}
function toInt(a) {
    return parseInt(trim(a));
}
function trim(a) {
    if (a && a.replace) {
        return a.replace(/(^\s*)|(\s*$)/g, "");
    } else {
        return a;
    }
}
function removeEventSimple(c, a, b) {
    if (c.removeEventListener) {
        c.removeEventListener(a, b, false);
    } else {
        if (c.detachEvent) {
            c.detachEvent("on" + a, b);
        }
    }
}
//添加监听事件
function addEventSimple(c, a, b) {
    if (c.addEventListener) {
        c.addEventListener(a, b, false);
    } else {
        if (c.attachEvent) {
            c.attachEvent("on" + a, b);
        }
    }
}

function replace_specialChar(a) {
    return a.replace(/(§)/g, "ξ").replace(/(¤)/g, "○").replace(/(〒)/g, "╤");
}

//输入框
function control_text(b) {
    var a = document.createElement("input");
    a.type = "text";
    //a.style.width = b * 10 + "px";
    a.className = "inputtext";
    return a;
}
//图片
function control_image(b) {
    var a = document.createElement("img");
    a.src = b;
    return a;
}
//checkbox
function control_check() {
    var a = document.createElement("input");
    a.type = "checkbox";
    a.tabIndex = "-1";
    return a;
}
//textarea
function control_textarea(c, b) {
    var a = document.createElement("textarea");
    a.wrap = "soft";
    a.rows = c?c:1;
    a.className = "inputtext";
    return a;
}
//button
function control_btn(b) {
    var a = document.createElement("input");
    a.type = "button";
    a.value = b;
    return a;
}
//radio
function control_radio(a) {
    if (navigator.appName.indexOf("Microsoft") != -1) {
        try {
            var c = document.createElement('<input type="radio" name="' + a + '" />');
            return c;
        } catch(b) {
            var c = document.createElement("input");
            c.type = "radio";
            c.name = a;
            return c;
        }
    } else {
        var c = document.createElement("input");
        c.type = "radio";
        c.name = a;
        return c;
    }
}


function getEditorIndex() {
    return EditorIndex++;
}
function setFloat(a) {
    a.className = "spanLeft";
}
function createFreQ(f) {
    var b = createFreQdataNode(f);
    var e = createQ(b);
    var d = !b._tag && (b._type == "radio");
    var a = b._type == "check";
    var g = /^[a-zA-Z_]+$/.test(f);
    if ((d || a) && g) {
        e.newAddQ = true;
    }
}

function createFreQdataNode(G) {
    var E;
    var f;
    switch (G) {
        case "radio":
            //E ="radio§1§请在此输入问题标题§undefined§1§false§false§§true§§§§§§选项1〒false〒1〒0〒false〒false〒〒false〒〒§选项2〒false〒2〒0〒false〒false〒〒false〒〒";
            E ="radio§1§请在此输入问题标题〒〒〒§0§1〒§false§false§0§true§§§0§§§选项" + (select_item_num+1) + "〒false〒1〒0〒〒〒〒〒〒§选项" + (select_item_num + 2) + "〒false〒2〒0〒〒〒〒〒〒";
            break;
        case "check":
            //E ="check§1§请在此输入问题标题§undefined§1§false§false§§true,,§§§§§§选项1〒false〒1〒0〒false〒false〒〒false〒〒§选项2〒false〒2〒0〒false〒false〒〒false〒〒";
            E ="check§1§请在此输入问题标题〒〒〒§0§1〒§false§false§0§true,,§§§0§§§选项" + (select_item_num+1) + "〒false〒1〒0〒〒〒〒〒〒〒§选项" + (select_item_num+2) + "〒false〒2〒0〒〒〒〒〒〒〒";
            break;
        case "toupiao":
            //E = "radio§1§2009最受关注的中文网站/应用/服务§undefined§1§false§false§§true§true〒50〒false〒true〒true§§§§§淘宝网〒false〒0〒0〒false〒false〒〒false〒〒§开心网〒false〒1〒0〒false〒false〒〒false〒〒§百度〒false〒1〒0〒false〒false〒〒false〒〒§腾讯〒false〒1〒0〒false〒false〒〒false〒〒§人人网〒false〒1〒0〒false〒false〒〒false〒〒";
            E = "radio§1§2009最受关注的中文网站/应用/服务〒〒〒§0§1〒§false§false§0§true§true〒50〒〒true〒true§§0§§§淘宝网〒false〒0〒0〒〒〒〒〒〒§开心网〒false〒1〒0〒〒〒〒〒〒§百度〒false〒1〒0〒〒〒〒〒〒§腾讯〒false〒1〒0〒〒〒〒〒〒§人人网〒false〒1〒0〒〒〒〒〒〒";
            break;
        case "question":
            //E = "question§1§请在此输入问题标题§0§1§§false§false§§§false§§§false§§§§§";
            E = "question§1§请在此输入问题标题〒〒§0§1§§false§false§§§false§§§§false§-1§§false§";
            break;
        case "shop":
            E = "shop§1§请选择商品：非官方大师公司的〒〒〒§0§1〒§false§false§0§false,shop§§§0§§§商品1〒false〒10〒〒true〒〒〒〒〒〒§商品2〒false〒10〒〒true〒〒〒〒〒〒§商品3〒false〒10〒〒true〒〒〒〒〒〒";
            break;
        default:
            break;
    }
    f = set_string_to_dataNode(E);
    return f;
}

//新增题目
function addNewQ(d, f, a, g) {
    var e;
    var c = d._type;
    e = create_question(d);
    setQHandler(e);
    setAttrHander(e);

    if (curinsert != null) {
        g = curinsert;
        resetInsertQ();
    }
    if (a) {
        g = curover;
    }
    if (!f) {
        if ((!isMergeAnswer) && g) {
            if (questions.lastChild == g) {
                questions.appendChild(e);
            } else {
                questions.insertBefore(e, g.nextSibling);
            }
            if (g == firstPage) {
                questionHolder.unshift(e);
            } else {
                questionHolder.insertBefore(e, g);
                questionHolder.moveUp(g);
            }
            updateTopic();
        } else {
            questions.appendChild(e);
            questionHolder.push(e);
            updateTopic();
        }
    } else {
        cur.parentNode.insertBefore(e, cur);
        e.isMergeNewAdded = cur.isMergeNewAdded;
        questionHolder[questionHolder.indexOf(cur)] = e;
        cur.deleteQ("noNeedConfirm");
        cur = null;
    }
    if (a && curover) {
        if (curover._referDivQ) {
            var b = curover._referDivQ;
            e._referDivQ = b;
            if (!b._referedArray) {
                b._referedArray = new Array();
            }
            if (b._referedArray.indexOf(e) == -1) {
                b._referedArray.push(e);
            }
            b._referedArray.sort(function(i, h) {
                return i.dataNode._topic - h.dataNode._topic;
            });
        }
    }
    return e;
}
//创建题目
function createQ(c, e, a) {
    if (cur) {
        cur.divTableOperation.style.visibility = "hidden";
    }
    var d = addNewQ(c, e, a);
    if (!isMergeAnswer && window.makeDrag) {
        makeDrag(d);
    }
    d.createOp();
    var b = new Date().getTime();
    if (!useShortCutAddNewQ) {
        if (lastAddNewQTime && !e) {
        } else {
            d.ondblclick();
        }
    } else {
        setMoveStyle(d);
    }
    d.focus();
    lastAddNewQTime = b;
    return d;
}
//复制题目
function copyQ() {
    if (this.validate) {
        this.validate();
    }
    if (!this.checkValid || this.checkValid()) {
        var a = copyNode(this.dataNode);
        a._hasjump = false;
        a._needOnly = false;
        a._hasList = false;
        a._listId = -1;
        a._referedTopics = "";
        createQ(a, false, true);
        show_status_tip("复制成功！", 4000);
    }
}

function copyNode(f) {
    var a = new Object();
    for (var c in f) {
        a[c] = f[c];
    }
    if (f._select) {
        a._select = new Array();
        for (var b = 1; b < f._select.length; b++) {
            a._select[b] = new Object();
            for (var d in f._select[b]) {
                a._select[b][d] = f._select[b][d];
            }
        }
    }
    return a;
}
//删除
function deleteQ(c) {
    var f = this.dataNode._type;
    if (c != "noNeedConfirm") {
        show_status_tip("可以通过Ctrl+Z恢复删除的问题", 4000);
    }
    total_question--;

    showhidebatq();
    if (this.tabAttr) {
        this.tabAttr.parentNode.removeChild(this.tabAttr);
        this.tabAttr = null;
        this.hasCreatedAttr = false;
    }
    if (c != "noNeedConfirm") {
        var d = questionHolder.indexOf(this);
    }
    this.className = "div_question div_question_mouseout";

    this.parentNode.removeChild(this);
    questionHolder.remove(this);
    updateTopic(this.dataNode._type);
    if (c != "noNeedConfirm") {
        new DeleteAction(this).exec();
    }
    if (cur == this) {
        cur = null;
    }
}
setBatchA();
//设置批量添加题目a链接
function setBatchA() {
    var b = document.getElementById("divbatchq");
    var a = b.getElementsByTagName("a")[0];
    a.innerHTML = "批量添加题目";
    a.onclick = function() {
        //第一个参数写出链接
        PDF_launch("addbatchq.html", 620, 480, null, "批量添加题目");
    };
}
//隐藏批量添加题目a链接
function showhidebatq() {
    var a = document.getElementById("divbatchq");
    if (!a) {
        return;
    }
    if (total_question > 0 || batAddQTimes > 0) {
        a.style.display = "";
    } else {
        a.style.display = "none";
    }
    setBatchA();
}
//创建题目开始
function create_question(f) {
    var af = f._type;
    var s = f._verify;
    var F = false;
    var g = false;
    var B = document.createElement("div");
    B.className = "div_question div_question_mouseout";
    total_question++;
    //B.id='question_'+total_question;
    B.dataNode = f;
    B.tabIndex = -1;
    var K = $ce("div", "", B);
    K.className = "div_preview";
    B.div_question_preview = K;
    var J = af == "question";
    var b = af == "check";
    var m = af == "radio";
    var h = af == "shop";
    var l = m || b || h;
    var ac = true;

    B.isMergeNewAdded = g;

    QIndentity++;
    showhidebatq();
    var k = document.createElement("div");
    var W = f._topic + "";
    W += ".";
    var D = $ce("div", W, k);
    B.divTopic = D;
    D.className = "div_topic_question";

    k.className = "div_title_question_all";
    var o = $ce("div", "", k);
    var Z = f._title;
    var U = $ce("span", Z, o);
    o.className = "div_title_question";
    B.get_div_title = function() {
        return U;
    };

    //必选提的红色*号
    var ad = $ce("span", "&nbsp;*", o);
    B.setreqstatus = function() {
        ad.className='needMark';
        ad.style.display = this.dataNode._requir ? "" : "none";
        return ad;
    };
    B.setreqstatus();
    //[多选题]标题上的
    if (b) {
        var ab = document.createElement("span");
        B.updateSpanCheck = function() {
            var aj = this.dataNode;
            if (!aj._isTouPiao) {
                ab.innerHTML += "[多选题]";
            }
            ab.className = "qtypetip";
        };
        B.updateSpanCheck();
        o.appendChild(ab);
    }
    K.appendChild(k);

    //选项【不带四个操作的，即上面的】
    var u = document.createElement("div");
    u.className = "div_table_radio_question";
    K.appendChild(u);
    if (J) {
        var y = control_textarea("1", "50");
        u.appendChild(y);
        //var I = null;
        B.showTextAreaUnder = function() {
            y.className = this.dataNode._underline ? "underline": "inputtext";
        };
        B.showTextAreaUnder();
        B.get_textarea = function() {
            return y;
        };
    }
    if(l){
        B.createTableRadio = function () {
            if(!h){
                var at = this.dataNode;
                var am = at._isTouPiao;
                var aZ = at._numperrow ? at._numperrow : 1;
                var aL = null;
                var aq = at._select;
                if (am) {
                    aL = new Array();
                    var aF = aq.length - 1;
                    var aj = 0;
                    for (var a9 = 1; a9 <= aF; a9++) {
                        aj += a9;
                    }
                    for (var a9 = 1; a9 <= aF; a9++) {
                        aL[a9 - 1] = 100 / aj * a9;
                    }
                }
                var aO = new StringBuilder();
                if (m || b) {
                    aO.append("<ul>");
                    var al;
                    var aQ = "%";
                    al = (100 / aZ) - 1;
                    var aE = false;
                    var ah = 1;
                    for (var a9 = 1; a9 < aq.length; a9++) {
                        aO.append("<li>");
                        if (!aq[a9]._item_img) {
                            if (am) {
                                //aO.append("<div style='float:left;width:" + at._touPiaoWidth + "%;'>");
                                aO.append("<div class='voteLeft'>");
                            }
                            if (m) {
                                aO.append("<input type='radio'");
                            } else {
                                aO.append("<input type='checkbox'");
                            }
                            aO.append("/>" + trim(aq[a9]._item_title));
                            if (am) {
                                aO.append("</div>");
                                aO.append("<div class='voteRight'>");
                                aO.append("<span>" + parseInt(aL[a9 - 1]) + "票</span>");
                                //addTouPiao(aO, at, aL, a9);
                            }
                        }
                        if (aq[a9]._item_tb) {
                            var defaultOtherText = "";
                            if (defaultOtherText) {
                                defaultOtherText = "";
                            }
                            aO.append(" <input type='text' class='underline' style='color:#999999;' value='" + defaultOtherText + "'/>");
                        }
                        if (aq[a9]._item_tbr) {
                            aO.append(" <span style='color: red;'> *</span>");
                        }
                        aO.append("</li>");
                        ah++;
                    }
                    aO.append("</ul>");
                }
                u.innerHTML = aO.toString("");
            }else{
                var aG = this.dataNode;
                var a5 = aG._isTouPiao;
                // var ax = aG._isCeShi;
                // var aH = aG._isCePing;
                var bE = aG._numperrow ? aG._numperrow : 1;
                var bc = aG._select;
                var aL = aG._tag;
                var aD = aG._displayThumb;
                var bt = a5 && aD && bc[1]._item_img;
                if (bt) {
                    bE = 4;
                }
                var bn = new StringBuilder();
                bn.append("<div  class='div_table_clear_top'></div>");
                if (aG._isShop) {
                    aR = true;
                    bn.append("<ul>");
                    for (var aP = 1; aP < bc.length; aP++) {
                        var aX = bc[aP]._item_title;
                        var aI = bc[aP]._item_value;
                        var bf = bc[aP]._item_img;
                        var aW = "";
                        if (aP > 1 && aP % 3 == 1) {
                            aW = " style='clear:both;'";
                        }
                        bn.append("<li class='shop-item' " + aW + ">");
                        if (bf) {
                            bn.append("<div class='img_place'><img src='" + bf + "' alt='' /></div>");
                        }
                        bn.append("<div class='text_place'>");
                        bn.append("<div class='item_name'>" + aX + "</div>");
                        bn.append('<p class="item_price">￥' + aI + "</p>");
                        bn.append('<p class="item_select"><span class="operation remove">-</span><input class="operation itemnum" value="0" disabled="disabled"><span class="operation add">+</span></p>');
                        bn.append("</div><div class='divclear'></div></li>");
                    }
                    bn.append("</ul>");
                }
                var aR = false;
                bn.append("<div class='div_table_clear_bottom'></div>");
                u.innerHTML = bn.toString("");
            }

        };
        B.createTableRadio(true);
    }

    //选择带填空
    //选择带填空
    var L = document.createElement("div");
    L.className = "div_ins_question spanLeft";
    L.innerHTML = "<a href='javascript:void(0);' onclick='insertQ(curover);' class='link-UF90' style='text-decoration:underline;'>在此题后插入新题</a>";
    L.style.visibility = "hidden";
    K.appendChild(L);
    B.divInsertOp = L;
    var aa = document.createElement("div");
    aa.className = "spanRight";
    //aa.style.visibility = "hidden";
    K.appendChild(aa);
    B.divTableOperation = aa;
    if (f._hasjump || f._relation) {
        B.divTableOperation.style.visibility = "";
    }
    $ce("div", "", K).className = "clb";
    cancelInputClick(B);
    return B;
}
function cancelInputClick(c) {
    var d = c.div_question_preview;
    var a = $$Tag("input", d);
    for (var b = 0; b < a.length; b++) {
        a[b].onclick = function() {
            if (this.checked) {
                this.checked = false;
                return false;
            }
        };
        a[b].onkeydown = function() {
            this.value = "";
            return false;
        };
    }
}

function set_string_to_dataNode(o) {
    var d = new Object();
    var b = new Array();
    b = o.split("§");
    d._type = b[0];
    switch (b[0]) {
        case "question":
            d._topic = b[1];
            var q = b[2].split("〒");
            d._title = q[0];
            d._tag = b[3];//0
            d._height = b[4] ? parseInt(b[4]) : 1;//b[4]=1
            if (b[6] == "true") {
                d._requir = true;
            } else {
                d._requir = false;
            }
            break;
        case "radio":
        case "check":
            d._type = b[0];
            d._topic = b[1];
            var q = b[2].split("〒");
            d._title = q[0];
            d._keyword = q.length == 2 ? q[1] : "";
            d._relation = q[2] || "";
            d._mainWidth = q[3] || "";
            d._tag = isInt(b[3]) ? toInt(b[3]) : 0;//0

            var s = b[4].split("〒");
            d._numperrow = isInt(s[0]) ? toInt(s[0]) : 1;
            d._randomChoice = false;
            if (s.length == 2) {
                d._randomChoice = s[1] == "true" ? true: false;
            }
            if (b[0] == "check" || b[0] == "radio") {
                var g = b[8].split(",");
                if (g[0] == "true") {
                    d._requir = true;
                } else {
                    d._requir = false;
                }
            }
            var e = b[9].split("〒");//''
            if (e[0] == "true") {
                d._isTouPiao = true;
                d._touPiaoWidth = isInt(e[1]) ? parseInt(e[1]) : 50;
                d._displayDesc = e[2] == "true";
                d._displayNum = e[3] == "true";
                d._displayPercent = e[4] == "true";
            }
            d._select = new Array();
            var a = 14;
            for (var p = a; p < b.length; p++) {
                var r = new Array();
                r = b[p].split("〒");
                //var k = p - a + 1;
                var k = p - a+1;
                d._select[k] = new Object();
                d._select[k]._item_title = r[0];
                //select_item_num++;
                d._select[k]._item_tb = false;
                d._select[k]._item_desc = "";
                if (r.length >= 9) {
                    d._select[k]._item_tb = r[4] == "true";
                    d._select[k]._item_desc = r[8];
                }
                select_item_num++;
            }
            break;
        case "shop":
            d._type = b[0];
            d._isShop = d._type == "shop";
            d._topic = b[1];
            var u = b[2].split("〒");
            d._title = u[0];
            d._keyword = u.length == 2 ? u[1] : "";
            d._relation = u[2] || "";
            d._mainWidth = u[3] || "";
            d._tag = isInt(b[3]) ? toInt(b[3]) : 0;

            var w = b[4].split("〒");
            d._numperrow = isInt(w[0]) ? toInt(w[0]) : 1;
            d._randomChoice = false;
            if (w.length == 2) {
                d._randomChoice = w[1] == "true" ? true : false;
            }
            if (b[5] == "true") {
                d._hasvalue = true;
            } else {
                d._hasvalue = false;
            }
            if (b[6] == "true") {
                d._hasjump = true;
            } else {
                d._hasjump = false;
            }
            d._anytimejumpto = b[7];
            if (b[8] == "true") {
                d._requir = true;
            } else {
                d._requir = false;
            }
            var g = b[9].split("〒");
            d._ins = b[10];
            var a = b[11].split(",");
            d._verify = a[0];
            if (a[1] == "true") {
                d._nocolumn = true;
            }
            d._referTopic = b[12];
            d._referedTopics = b[13];
            d._select = new Array();
            for (var t = 14; t < b.length; t++) {
                var v = new Array();
                v = b[t].split("〒");
                var m = t - 14 + 1;
                d._select[m] = new Object();
                d._select[m]._item_title = v[0];
                if (v[1] == "true") {
                    d._select[m]._item_radio = true;
                } else {
                    d._select[m]._item_radio = false;
                }
                d._select[m]._item_value = v[2];
                d._select[m]._item_jump = v[3];
                d._select[m]._item_tb = false;
                d._select[m]._item_tbr = false;
                d._select[m]._item_img = "";
                d._select[m]._item_imgtext = false;
                d._select[m]._item_desc = "";
                d._select[m]._item_label = "";
                if (v.length >= 9) {
                    d._select[m]._item_tb = v[4] == "true";
                    d._select[m]._item_tbr = v[5] == "true";
                    d._select[m]._item_img = v[6];
                    d._select[m]._item_imgtext = v[7] == "true";
                    d._select[m]._item_desc = v[8];
                    d._select[m]._item_label = v[9];
                    d._select[m]._item_huchi = v[10] == "true";
                }
                select_item_num++;
            }
            break;
        default:
            break;
    }
    return d;

}

//移动到题目上时触发
function qonmouseover(c) {
    if (!this.isEditing && !isMergeAnswer) {
        this.divInsertOp.style.visibility = "visible";
    }
    var b = this.className.toLowerCase();
    if (b.indexOf("div_question_onclick") < 0 && this != curinsert) {
        if (b.indexOf("div_question_error") < 0) {
            this.className = "div_question div_question_mouseover";
        } else {
            this.className = "div_question div_question_mouseover";
        }
    }
    this.createOp();
    curover = this;
    var a = this;
    if (hasDisplayEditTipTimes < 3) {
        hasDisplayEditTipTimes++;
        toolTipLayer.innerHTML = "提示：您可以通过“双击”题目来进行编辑";
        sb_setmenunav(toolTipLayer, true, this, true);
        this.hasDisplayEditTip = true;
    }
}
//移出题目
function qonmouseout(b) {
    this.divInsertOp.style.visibility = "hidden";
    var a = this.className.toLowerCase();
    if (a.indexOf("div_question_onclick") < 0 && this != curinsert) {
        if (a.indexOf("div_question_error") < 0) {
            this.className = "div_question div_question_mouseout";
        } else {
            this.className = "div_question div_question_mouseout div_question_error";
        }
    }
    if (this.hasDisplayEditTip) {
        sb_setmenunav(toolTipLayer, false, this);
        this.hasDisplayEditTip = false;
    }
    if (this.divTableOperation) {
        this.divTableOperation.style.visibility = "hidden";
    }
}
//调用移入移出
function mouseOverout(a) {
    a.onmouseover = qonmouseover;
    a.onmouseout = qonmouseout;
}

function setQHandler(a) {
    mouseOverout(a);
    a.createOp = createOp;
    a.ondblclick = qonclick;
    a.deleteQ = deleteQ;
}
function getCoords(a) {
    var d = a.getBoundingClientRect(),
        i = a.ownerDocument,
        f = i.body,
        e = i.documentElement,
        c = e.clientTop || f.clientTop || 0,
        g = e.clientLeft || f.clientLeft || 0,
        h = d.top + (self.pageYOffset || e.scrollTop || f.scrollTop) - c,
        b = d.left + (self.pageXOffset || e.scrollLeft || f.scrollLeft) - g;
    return {
        top: h,
        left: b
    };
}
function mouseCoords(a) {
    if (!a) {
        return;
    }
    if (a.pageX || a.pageY) {
        return {
            x: a.pageX,
            y: a.pageY
        };
    }
    return {
        x: a.clientX + document.body.scrollLeft - document.body.clientLeft,
        y: a.clientY + document.body.scrollTop - document.body.clientTop
    };
}
function show_status_tip(b, d) {
    clearTimeout(status_tip_timeout);
    status_tip.style.display = "block";
    status_tip.innerHTML = b;
    var a = document.documentElement.scrollTop || document.body.scrollTop;
    var c = document.documentElement.clientHeight || document.body.clientHeight;
    if (status_tip.hasSetWidth) {
        status_tip.style.width = "";
    }
    status_tip.style.top = a + c - status_tip.offsetHeight - 25 + "px";
    status_tip.style.width = (divSurvey.offsetWidth - 10) + "px";
    if (d > 0) {
        status_tip_timeout = setTimeout("status_tip.style.display='none';status_tip.style.width = '';status_tip.hasSetWidth=false;", d);
    }
}
//编辑题目
function editQ(a) {
    if (curover) {
        qonclick.call(curover);
    }
}

//改变7按钮中的第一个
function changeEditText(c, a) {
    if (!c) {
        return;
    }
    if (a) {
        var b = c.nextSibling;
        if (b.nodeType == 3) {
            b = b.nextSibling;
        }
        b.innerHTML = "完成";
        c.className = "design-icon design-finish";
    } else {
        c.className = "design-icon design-edit";
        var b = c.nextSibling;
        if (b.nodeType == 3) {
            b = b.nextSibling;
        }
        b.innerHTML = "编辑";
    }
}
//创建7个操作按钮
function createOp() {
    if (this.divTableOperation.OpCreated) {
        this.divTableOperation.style.visibility = "visible";
    } else {
        this.deleteQ = deleteQ;
        this.copyQ = copyQ;
        this.moveUp = moveUp;
        this.moveDown = moveDown;
        this.moveFirst = moveFirst;
        this.moveLast = moveLast;
        var c = this.divTableOperation;
        var a = this.dataNode._type;
        /*if (a == "page") {
         if (this.dataNode._topic > 1) {
         c.innerHTML = toolbar_start + toolbar_add + toolbar_del_move + toolbar_end;
         } else {
         c.innerHTML = toolbar_start + toolbar_add + toolbar_end;
         }
         } else {
         if (a == "cut") {
         c.innerHTML = toolbar_start + toolbar_add + toolbar_del_move + toolbar_end;
         } else {

         }
         }*/
        if (isMergeAnswer && !this.isMergeNewAdded) {
            c.innerHTML = toolbar_start + toolbar_add + toolbar_copy + toolbar_end;
        } else {
            if (isMergeAnswer) {
                c.innerHTML = toolbar_start + toolbar_add + toolbar_copy + toolbar_del + toolbar_movedown + toolbar_movelast + toolbar_end;
            } else {
                c.innerHTML = toolbar_start + toolbar_add + toolbar_copy + toolbar_del_move + toolbar_end;
            }
        }
        c.OpCreated = true;
        //this.divTableOperation.style.visibility = "visible";
        this.divTableOperation.style.visibility = "hidden";
        var b = $$Tag("span", c)[0];
        this.editQLink = b;
    }
}
//设置移动的样式
function setMoveStyle(b) {
    var a = b;
    setTimeout(function() {
            a.className = "div_question div_question_move";
            if (prevcurmove && prevcurmove != a && prevcurmove.className.toLowerCase() == "div_question div_question_move") {
                prevcurmove.className = "div_question div_question_mouseout";
            }
            prevcurmove = a;
            prevcurmove.divTableOperation.style.visibility = "hidden";
        },
        2);
}

function afterMove(b, a) {
    updateTopic(b.dataNode._type);
    b.onmouseout();
    b.focus();
    setMoveStyle(b);
}
//上移
function moveUp() {
    var c = this.dataNode._type;
    var a = questionHolder.indexOf(this);//questionHolder = new Array();//indexOf返回此对象的索引
    if (a > 0) {
        var f = questionHolder[a - 1];
        this.parentNode.insertBefore(this, f);
        questionHolder.moveUp(this);
        afterMove(this, f);
    } else {
        show_status_tip("第1题不能再上移", 2000);
    }
}
//下移
function moveDown() {
    var e = this.dataNode._type;
    var h = questionHolder.indexOf(this);
    if (h < questionHolder.length - 1) {
        var b = questionHolder[h + 1];
        this.parentNode.insertBefore(b, this);
        questionHolder.moveDown(this);
        afterMove(this, b);
    } else {
        show_status_tip("最后1题不能再下移", 2000);
    }
}
//移到顶部
function moveFirst() {
    var c = this.dataNode._type;
    var a = questionHolder.indexOf(this);
    if (a > 0) {
        var e = questionHolder[0];
        this.parentNode.insertBefore(this, e);
        questionHolder.moveFirst(this);
        afterMove(this, e);
    } else {
        show_status_tip("第1题不能再上移", 3000);
    }
}
//移到底部
function moveLast() {
    var b = questionHolder.indexOf(this);
    if (b < questionHolder.length - 1) {
        var d = questionHolder[questionHolder.length - 1];
        this.parentNode.insertBefore(this, d);
        this.parentNode.insertBefore(d, this);
        questionHolder.moveLast(this);
        afterMove(this, d);
    } else {
        show_status_tip("最后1题不能再下移", 2000);
    }
}
//设置插入点
function insertQ(c) {
    var a = curinsert == c;
    if (a) {
        resetInsertQ();
    } else {
        curinsert = c;
        var b = $$Tag("a", curinsert.divInsertOp)[0];
        if (b) {
            b.innerHTML = "取消插入点";
        }
        setMoveStyle(curinsert);
        show_status_tip("请在页面上方选择相应的题型插入到此题的后面", 5000);
    }
}
//与取消插入点
function resetInsertQ() {
    if (curinsert != null) {
        if (curinsert.className.toLowerCase() == "div_question div_question_move") {
            curinsert.className = "div_question div_question_mouseout";
        }
        var a = $$Tag("a", curinsert.divInsertOp)[0];
        if (a) {
            a.innerHTML = "在此题后插入新题";
        }
        curinsert = null;
    }
}
function cancelDblClick(d) {
    var a = d.tabAttr;
    if (a) {
        var b = $$Tag("input", a);
        for (var c = 0; c < b.length; c++) {
            b[c].ondblclick = function(f) {
                f = window.event || f;
                if (f) {
                    f.cancelBubble = true;
                    if (f.stopPropagation) {
                        f.stopPropagation();
                    }
                }
            };
        }
    }
}
var actionStack = new Array();
var actionIndex = 0;
function BaseAction() {}
BaseAction.prototype.exec = function() {
    actionStack[actionIndex++] = this;
};
BaseAction.prototype.undo = function() {
    return false;
};
BaseAction.prototype.redo = function() {
    return false;
};
function DeleteAction(b, a) {
    this.deleteDiv = b;
    this.prevDiv = a;
    this.status = "done";
}
DeleteAction.prototype = new BaseAction();
DeleteAction.prototype.undo = function() {
    if (this.status != "done") {
        return;
    }
    this.prevDiv.parentNode.insertBefore(this.deleteDiv, this.prevDiv);
    this.prevDiv.parentNode.insertBefore(this.prevDiv, this.deleteDiv);
    if (this.prevDiv == firstPage) {
        questionHolder.unshift(this.deleteDiv);
    } else {
        questionHolder.insertBefore(this.deleteDiv, this.prevDiv);
        questionHolder.moveUp(this.prevDiv);
    }
    updateTopic();
    this.deleteDiv.focus();
    this.status = "undone";
};
DeleteAction.prototype.redo = function() {
    if (this.status != "undone") {
        return;
    }
    this.deleteDiv.deleteQ();
    this.status = "done";
};
function undo() {
    if (actionIndex > 0) {
        actionStack[--actionIndex].undo();
    }
}
function redo() {
    if (actionIndex < actionStack.length) {
        actionStack[actionIndex++].redo();
    }
}

//题目点击
function qonclick() {
    try {
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
    } catch(a) {}
    this.className = "div_question div_question_onclick";
    this.title = "";
    resetInsertQ();
    this.divInsertOp.style.visibility = "hidden";
    if (cur != this || (cur == this && cur.isEditing)) {
        if (cur != null) {
            if (cur.updateItem) {
                cur.updateItem();
            }
            cur.className = "div_question div_question_mouseout";
            if (cur.hasCreatedAttr) {
                cur.tabAttr.style.display = "none";
            }
            cur.isEditing = false;
            cur.ondblclick = qonclick;
            /*cur.style.cursor = "move";*/
            changeEditText(cur.editQLink, false);
        }
        if (cur && cur.createAttr && (cur.checkValid && !cur.checkValid())) {
            cur.validate();
        }
        if (cur == this) {
            cur.focus();
            cancelInputClick(this);
            return false;
        }
    }
    cancelInputClick(this);
    cur = this;
    var b = this.dataNode;
    this.isEditing = true;
    this.ondblclick = null;
    hasDisplayEditTip = true;
    changeEditText(this.editQLink, true);
    if (this.hasCreatedAttr) {
        this.tabAttr.style.display = "";
        cancelDblClick(this);
        if (this.hasDisplaySelCheck) {
            this.updateSelCheck();
        }
        this.focus();
        setQTopPos(this);
    } else {
        if (this.createAttr) {
            var c = this;
            setTimeout(function() {
                    c.createAttr();
                    cancelDblClick(c);
                    //c.setDataNodeToDesign();
                    setQTopPos(c);
                },
                0);
        } else {
            show_status_tip("正在加载问题属性，请耐心等待....", 2000);
        }
    }
    return false;
}

function cancelInputClick(c) {
    var d = c.div_question_preview;
    var a = $$Tag("input", d);
    for (var b = 0; b < a.length; b++) {
        a[b].onclick = function() {
            if (this.checked) {
                this.checked = false;
                return false;
            }
        };
        a[b].onkeydown = function() {
            this.value = "";
            return false;
        };
    }
}
//获取IE版本
function getIEVersion() {
    var a = navigator.userAgent.match(/(?:MSIE |Trident\/.*; rv:)(\d+)/);
    return a ? parseInt(a[1]) : undefined;
}
function setQTopPos(c) {
    var g = 0;
    var f = document.documentElement.clientHeight || document.body.clientHeight;
    g = c.offsetTop + c.offsetHeight - f + 10;
    if (c.offsetHeight < f - 100) {
        g += 100;
    }
    var d = document.getElementById("pater_desc");
    var e = getIEVersion();
    var b = e && (!document.documentMode || document.documentMode < 8);
    var a = e <= 7 || b;
    if (a) {
        g += 85;
    }
    if (e) {
        setTimeout(function() {
                divSurvey.scrollTop = g;
            },
            400);
    } else {
        divSurvey.scrollTop = g;
    }
}
function sb_setmenunav(a, b, e, c) {
    var h = $El(a);
    if (!h) {
        return;
    }
    if (b) {
        if (h.timeArray) {
            window.clearTimeout(h.timeArray);
            h.timeArray = 0;
        }
        h.style.display = "block";
        if (!h.onmouseover) {
            h.onmouseover = function() {
                sb_setmenunav(a, true);
            };
            h.onmouseout = function() {
                sb_setmenunav(a, false);
            };
        }
        if (c) {
            var j = window.event || sb_setmenunav.caller.arguments[0];
            var i = mouseCoords(j);
            h.style.left = i.x + 1 + "px";
            h.style.top = i.y + 1 + "px";
        } else {
            if (e) {
                var g = e;
                if (g.parentNode.tagName.toLowerCase() == "li") {
                    g = e.parentNode;
                }
                var m = getCoords(g);
                var k = m.left;
                var f = m.top + g.offsetHeight;
                var l = document.documentElement.clientHeight || document.body.clientHeight;
                if (k + h.offsetWidth > bodyWidth) {
                    k = bodyWidth - h.offsetWidth - 30;
                }
                if (e.nextObj) {
                    f = m.top - 33;
                }
                if (f + h.offsetHeight > l) {
                    h.style.height = l - 10 - f + "px";
                }
                h.style.left = k + "px";
                h.style.top = f + "px";
            }
        }
    }
    if (e && e.tagName.toLowerCase() == "a") {
        h.needSaveClass = e;
        h.prevClass = e.className;
    } else {
        if (h.needSaveClass) {
            if (b) {
                h.needSaveClass.className = h.prevClass ? h.prevClass + " hover": "hover";
            } else {
                h.needSaveClass.className = h.prevClass || "";
            }
        }
    }
    if (!b) {
        h.timeArray = window.setTimeout(function() {
            h.style.display = "none";
            h.style.height = "";
        },200);
    }
}
//创建属性
function createAttr() {
    var ai = new Date().getTime();
    var d1;
    var B = document.createElement("div");
    this.appendChild(B);
    var aF = document.createDocumentFragment();
    this.tabAttr = B;
    var cz = this;
    var m = this.dataNode;
    var cw = m._type;
    var cV = this.dataNode._tag || 0;
    var cG = cw == "question";
    var bn = cw == "check";
    var aI = cw == "radio";
    var cM = cw == "shop";
    var aW = aI && cV;
    var dQ = bn && cV;
    var dT = aI || bn || cM; ;
    var ec =true;
    var dx = m._verify || "0";


    var bE = m._isTouPiao;
    var aa = this.get_div_title();
    var cY = new Array();
    this.option_radio = cY;
    var aB = document.createElement("div");
    aB.className = "div_title_attr_question";
    var c1 = document.createElement("div");
    c1.className='ml15';
    var ad = m._title == "请在此输入问题标题";
    var c = m._title.indexOf("<") > -1;
    if (!c) {
        var ab = $ce("div", "<span >&nbsp;<b >题目标题</b></span>", c1);
        ab.className='question-title-txt';
    }
    var bq = $ce("div", "", c1);
    bq.className='question-title-area';
    var G = control_textarea();
    G.className='inputtext';
    if (ad) {
        G.defValue = m._title;
    }
    if (ec) {
        G.title = "例如：您最喜欢的车型？";
        G.value = m.title;
    }
    var w = "tc" + m._type + getEditorIndex();
    G.value = m._title;
    G.id = w;
    bq.appendChild(G);
    G.onkeyup = G.onchange = function() {
        cz.checkTitle();
    };
    G.onfocus = function() {
        if (this.value == "请在此输入问题标题") {
            this.value = "";
        }
    };
    G.onblur = function() {
        if (!this.value && cz.dataNode._type != "page") {
            this.value = this.defValue || "";
            cz.checkTitle();
        }
    };
    //必答题
    if (ec) {
        var dN = $ce("div", "", c1);
        dN.className = "bixuan";
        this.getQType = function () {
            var i = cz.dataNode._type;
            if (i == "question") {
                return "文本题";
            } else if (i == "radio") {
                return "单选题";
            }else if (i == "check") {
                return "多选题";
            }else if (i == "shop") {
                return "商品题";
            }
            return "";
        };
        var l = control_check();
        l.title = "用户在填写问卷时必须回答这道题";
        var dr = document.createTextNode("必答题");
        dN.appendChild(l);
        dN.appendChild(dr);
        if (cz.dataNode._requir) {
            l.checked = true;
        }
        l.onclick = function () {
            cz.dataNode._requir = this.checked;
            cz.setreqstatus();
        };
        this.get_requir = function () {
            return l;
        };
    }
    aB.appendChild(c1);
    aF.appendChild(aB);
    if(dT){
        var db = document.createElement("div");
        db.className='ml15 clb pt8';
        aB.appendChild(db);
    }
    var dU = false;
    for (var dF = 0; dF < questionHolder.length; dF++) {
        var I = questionHolder[dF].dataNode;
        var d1 = I._topic;
        if (d1 - this.dataNode._topic < 0 && I._type == "check") {
            dU = true;
            break;
        } else {
            if (d1 - this.dataNode._topic >= 0) {
                break;
            }
        }
    }
    if (dT) {
        this.setNotNewAdd = function() {
            if (!cz.newAddQ) {
                return;
            }
            c0.style.display = "";
            cz.newAddQ = false;
        };
        this.addNewItem = function() {
            var i = cY.length;
            cY[i - 1].get_item_add().onclick();
        };
        var aV = document.createElement("table");
        aV.className = "table-option";
        aV.cellSpacing = "3";
        aV.cellPadding = "3";
        var cr = aV.insertRow( - 1);
        cY[0] = cr;
        var bc = (m._type == "check" || m._type == "radio" );
        var D = cr.insertCell( - 1);
        D.className='translate-option';

        var dD = $ce("span", "", D);

        /*xiaoqiang*/
        if (cM) {
            dD.innerHTML = "商品名称";
        } else {
            var dP = $ce("a", "题目选项<img src='images/arrownone.gif' alt=''>", dD);
            dP.title = "交换选项文字";
            dP.href = "javascript:void(0);";
            dP.onclick = function() {
                var ei = false;
                var j = false;
                if (aW ||  cV == 303) {
                    j = true;
                }
                var eh = 1;
                var i = cY.length - 1;
                while (eh < i) {
                    var dw = cY[i].get_item_title().value;
                    cY[i].get_item_title().value = cY[eh].get_item_title().value;
                    cY[eh].get_item_title().value = dw;
                    if (ei) {
                        dw = cY[i].get_item_value().value;
                        cY[i].get_item_value().value = cY[eh].get_item_value().value;
                        cY[eh].get_item_value().value = dw;
                        if (cY[i].get_item_novalue()) {
                            dw = cY[i].get_item_novalue().checked;
                            cY[i].get_item_novalue().checked = cY[eh].get_item_novalue().checked;
                            cY[eh].get_item_novalue().checked = dw;
                        }
                    }
                    eh++;
                    i--;
                }
                cur.updateItem();
                return false;
            };
        }
        //先不删
        /*if (cw == "radio") {
         var cZ = control_check();
         cZ.onclick = function() {
         if (cz.defaultCheckSet) {
         cz.defaultCheckSet();
         }
         cz.updateItem();
         };
         }*/

        if (bc && (!m._isTouPiao)) {
            var dj = cr.insertCell( - 1);
            var al = $ce("span", "<b>可填空</b>", dj);
            dj.style.width = "70px";
        }
        if (cM) {
            var an = cr.insertCell(-1);
            imgwidth = "60px";
            $ce("span", "商品图片", an);
            an.style.width = imgwidth;

            var aw = cr.insertCell(-1);
            var bp = $ce("span", "", aw);
            var c5 = $ce("span", "", bp);
            c5.style.cursor = "pointer";
            c5.innerHTML = "商品价格";
        }
        /*xiaoqiang*/

        var a1 = cr.insertCell( - 1);
        a1.className='operationTxt';
        $ce("span", "操作", a1);
        if (bn || cM) {
            for (var dE = 1; dE < m._select.length; dE++) {
                cY[dE] = new creat_item(cz, dE, aV, "check", false, m._select[dE]);
            }
        } else {
            for (var dE = 1; dE < m._select.length; dE++) {
                cY[dE] = new creat_item(cz, dE, aV, "radio", false, m._select[dE]);
            }
        }
        this.checkItemTitle = function() {
            var i = true;
            this.isItemTitleValid = true;
            return true;
        };
        var xZ=document.createElement('div');
        xZ.className='add-option-btn';
        var cx = $ce("span", "", xZ);
        xZ.className='spanLeft';
        var ah = "<a href='javascript:cur.addNewItem();' class='titlelnk' style='text-decoration:none;'><span class='choiceimg design-icon design-add' ></span><b>新增选项</b></a>&nbsp;&nbsp;";
        cx.innerHTML = ah;
        db.appendChild(aV);
        db.appendChild(xZ);
        /*this.initFreOptions = function(ei) {
         var eh = "";
         var dw = /^选项\d+$/;
         var j = 0;
         for (var i = 1; i < cY.length; i++) {
         var ej = trim(cY[i].get_item_title().value);
         if (!ej) {
         continue;
         }
         if (dw.test(ej)) {
         continue;
         }
         if (j > 0) {
         eh += "\n";
         }
         eh += ej;
         j++;
         }
         if (eh) {
         ei.value = eh + "\n";
         }
         };*/
        /*this.setFreOptions = function(ei) {
         var ej = ei.split("\n");
         if (ei == "每行一个选项，可以添加多个选项") {
         return;
         }
         var ek = new Array();
         for (var eh = 0; eh < ej.length; eh++) {
         if (ej[eh] && trim(ej[eh])) {
         ek.push(ej[eh]);
         }
         }
         for (var eh = ek.length; eh < 2; eh++) {
         ek[eh] = "选项" + (eh + 1);
         }
         for (var j = 0; j < ek.length; j++) {
         if (cY[j + 1]) {
         cY[j + 1].get_item_title().value = trim(ek[j]);
         continue;
         }
         if (bn) {
         cY[j + 1] = new creat_item(this, j + 1, aV, "check", false, null);
         } else {
         cY[j + 1] = new creat_item(this, j + 1, aV, "radio", false, null);
         }
         cY[j + 1].get_item_title().value = trim(ek[j]);
         cY[j + 1].get_item_value().value = j + 1;
         }
         var dw = cY.length - 1;
         for (var j = dw; j > ek.length; j--) {
         aV.deleteRow(j);
         cY.length = cY.length - 1;
         }
         this.updateItem();
         this.setNotNewAdd();
         setQTopPos(this);
         };*/
        this.updateItem = function(el) {
            var ei = true;
            if (!this.checkItemTitle()) {
                ei = false;
            }
            if (!ei) {
                return;
            }
            var ek = this.dataNode;
            ek._select = new Array();
            var eh = !ek._tag && (ek._type == "check" || ek._type == "radio" || ek._type == "radio_down");
            for (var dw = 1; dw < cY.length; dw++) {
                ek._select[dw] = new Object();
                var ej = cY[dw].get_item_title();
                var i = replace_specialChar(trim(ej.value));
                if (i != ej.value) {
                    ej.value = i;
                }
                ek._select[dw]._item_title = ej.value.replace(/\</g, "&lt;");
                ek._select[dw]._item_radio = false;
                ek._select[dw]._item_value = trim(cY[dw].get_item_value().value);
                ek._select[dw]._item_jump = 0;
                ek._select[dw]._item_tb = false;
                ek._select[dw]._item_tbr = false;
                ek._select[dw]._item_img = "";
                ek._select[dw]._item_imgtext = false;
                ek._select[dw]._item_desc = "";
                ek._select[dw]._item_label = "";

                //选择带填空
                if (cY[dw].get_item_tb()) {
                    ek._select[dw]._item_tb = cY[dw].get_item_tb().checked;
                }
                //img
                if (cY[dw].get_item_img()) {
                    ek._select[dw]._item_img = cY[dw].get_item_img().value = replace_specialChar(trim(cY[dw].get_item_img().value));
                }

            }
            if (!el) {
                this.createTableRadio(true);
            }
        };
    }
    var c0 = document.createElement("div");
    c0.className='subBtn';
    var ba = control_btn("完成编辑");
    ba.className = "submitbutton";
    ba.onclick = function() {
        qonclick.call(cz);
    };
    if (this.newAddQ) {}
    c0.appendChild(ba);
    aB.appendChild(c0);
    B.appendChild(aF);
    this.hasCreatedAttr = true;
    this.checkTitle = function() {
        var dw = G.value;
        if (!this.hasEditBox && /\r\n|\n|\r/.test(dw)) {
            dw = G.value = dw.replace(/\r\n|\n|\r/g, "<br />");
            //d6.onclick();
        }
        aa.innerHTML = dw;
        this.dataNode._title = G.value;
        this.isTitleValid = true;
        return true;
    };
    this.checkValid = function() {
        var ej = this.isTitleValid == undefined || this.isTitleValid;
        if (cG) {
            var j = this.isDefaultValid == undefined || this.isDefaultValid;
            return ej && j;
        } else {
            var em = this.isItemTitleValid == undefined || this.isItemTitleValid;
            return em &&  ej ;
        }
    };
    this.validate = function() {

        this.checkTitle();
    };
}
//创建元素
function creat_item(H, L, A, ag, F, I) {
    var R = L;
    var W;
    var k = A.insertRow(R);
    var s = k.insertCell( - 1);
    var a = control_text();
    //a.tabIndex = 1;
    a.title = "回车添加新选项，上下键编辑前后选项";
    if (F) {
        select_item_num++;
    }
    a.value = I ? I._item_title: "选项" + select_item_num;
    if (!I&&cur.dataNode._isShop) {
        console.log(cur.dataNode)
        var B = "商品" + R;
        var O = false;
        for (var aa = 1; aa < cur.dataNode._select.length; aa++) {
            if (cur.dataNode._select[aa]._item_title == B) {
                O = true;
                break;
            }
        }
        if (!O) {
            a.value = B;
        }
    }
    a.className += " choicetxt";
    a.onchange = a.onblur = function() {
        if (!this.value) {
            this.value = this.initText || "";
        }
        if (cur && cur.updateItem) {
            cur.updateItem();
        }
    };
    a.onfocus = function() {
        if (!this.initText) {
            this.initText = this.value;
        }
        var j = /^选项\d+$/;
        if (j.test(this.value)) {
            this.value = "";
        }
    };
    a.onkeydown = function(ah) {
        var j = ah || window.event;
        if (j.keyCode == 13) {
            X.onclick();
        } else {
            if (j.keyCode == 40) {
                if (R < cur.option_radio.length - 1) {
                    cur.option_radio[R + 1].get_item_title().focus();
                    cur.option_radio[R + 1].get_item_title().select();
                }
            } else {
                if (j.keyCode == 38) {
                    if (R > 1) {
                        cur.option_radio[R - 1].get_item_title().focus();
                        cur.option_radio[R - 1].get_item_title().select();
                    }
                }
            }
        }
        return true;
    };
    s.appendChild(a);
    s.className = 'optionInput';
    //选择带填空
    var u = cur || H;
    var Q = (u.dataNode._type == "check" || u.dataNode._type == "radio")&&(!u.dataNode._isTouPiao);
    if (Q) {
        var x = k.insertCell( - 1);
        var U = $ce("span", "", x);
        U.style.verticalAlign = "bottom";
        var t = control_check();
        t.style.verticalAlign = "bottom";
        t.title = "允许填空";
        U.appendChild(t);
        t.checked = I ? I._item_tb: false;

        t.onclick = function() {
            cur.updateItem();
        };
    }
    //选择带填空结束
    if (cur.dataNode._isShop) {
        if (true) {
            var y = k.insertCell(-1);
            y.align = "center";
            var af = document.createElement("input");
            af.type = "hidden";
            af.value = I ? I._item_img : "";
            y.appendChild(af);
            var P = document.createElement("span");
            P.title = "添加图片";
            P.className = "choiceimg design-icon design-img";
            y.appendChild(P);
            if (af.value) {
                P.title = "编辑图片";
                P.className = "choiceimg design-icon design-imgedit";
            }
            if (af.value) {
                A.rows[0].cells[1].style.width = "52px";
            }
            function p(ak) {
                if (ak == undefined) {
                    return;
                }
                var ai = cur.option_radio[R].get_item_img();
                ai.value = ak;
                P.className = ak ? "choiceimg design-icon design-imgedit" : "choiceimg design-icon design-img";
                A.rows[0].cells[1].style.width = "52px";
                cur.updateItem();
                if (cur.setchoiceWidth) {
                    cur.setchoiceWidth();
                }
            }

            P.onclick = function () {
                itemImage = cur.option_radio[R].get_item_img().value;
                PDF_launch("uploadimg.html?design=1&activity=" + activityID, 650, 460, p, cur.option_radio[R].get_item_title().value);
            };
        }
    }
    var z1 = k.insertCell(-1);
    z1.align = "left";
    var d = $ce("span", "&nbsp;", z1);
    var n = control_text("4");
    n.maxLength = 12;
    n.title = "在此可以设置每个选项的分数（请输入整数）";
    n.title = "设置商品价格";
    n.value = I ? I._item_value : R;
    d.appendChild(n);
    if(!cur.dataNode._isShop){
        z1.style.display = "none";
    }
    n.onchange = n.onblur = function () {
        /*if (!this.value || parseFloat(this.value) != this.value) {
            this.value = 10;
        }*/
        cur.updateItem();
    };
    n.onkeydown = function (ai) {
        var j = ai || window.event;
        if (j.keyCode == 13) {
            X.onclick();
        } else {
            if (j.keyCode == 40) {
                if (R < cur.option_radio.length - 1) {
                    cur.option_radio[R + 1].get_item_value().select();
                }
            } else {
                if (j.keyCode == 38) {
                    if (R > 1) {
                        cur.option_radio[R - 1].get_item_value().select();
                    }
                }
            }
        }
    };

    var J = k.insertCell( - 1);
    var X = document.createElement("span");
    X.title = "在此选项下面插入一个新的选项";
    X.className = "choiceimg design-icon design-add";
    var e = document.createElement("span");
    e.title = "删除当前选项（最少保留2个选项）";
    e.className = "choiceimg design-icon design-minus";
    var V = document.createElement("span");
    V.title = "将当前选项上移一个位置";
    V.className = "choiceimg design-icon design-up";
    var D = document.createElement("span");
    D.title = "将当前选项下移一个位置";
    D.className = "choiceimg design-icon design-down";
    J.className='operationBtn';
    J.appendChild(X);
    J.appendChild(e);
    J.appendChild(V);
    J.appendChild(D);
    X.onclick = function() {
        for (var j = cur.option_radio.length - 1; j > R; j--) {
            cur.option_radio[j].set_item_num(j + 1);
            cur.option_radio[j + 1] = cur.option_radio[j];
        }
        if (ag == "radio") {
            cur.option_radio[R + 1] = new creat_item(cur, R + 1, A, "radio", true);
        }
        if (ag == "check") {
            cur.option_radio[R + 1] = new creat_item(cur, R + 1, A, "check", true);
        }
        cur.updateItem();
        cur.option_radio[R + 1].get_item_title().select();
    };
    e.onclick = function() {
        if (cur.option_radio.length > 3) {
            A.deleteRow(R);
            for (var ah = R + 1; ah < cur.option_radio.length; ah++) {
                cur.option_radio[ah].set_item_num(ah - 1);
                cur.option_radio[ah - 1] = cur.option_radio[ah];
            }
            cur.option_radio.length--;
            cur.updateItem();
        } else {
            show_status_tip("选择题至少要有两个选项", 3000);
        }
    };
    V.onclick = function() {
        if ((R - 1) > 0) {
            c(cur.option_radio[R], cur.option_radio[R - 1]);
            q(cur.option_radio[R], cur.option_radio[R - 1]);
            cur.updateItem();
        }
    };
    D.onclick = function() {
        if ((R + 1) < cur.option_radio.length) {
            c(cur.option_radio[R], cur.option_radio[R + 1]);
            q(cur.option_radio[R], cur.option_radio[R + 1]);
            cur.updateItem();
        }
    };
    function c(ai, j) {
        var ah = ai.get_item_title().value;
        ai.get_item_title().value = j.get_item_title().value;
        j.get_item_title().value = ah;
    }
    function q(ai, j) {
        var ah = ai.get_item_value().value;
        ai.get_item_value().value = j.get_item_value().value;
        j.get_item_value().value = ah;
        if (ai.get_item_novalue()) {
            ah = ai.get_item_novalue().checked;
            ai.get_item_novalue().checked = j.get_item_novalue().checked;
            j.get_item_novalue().checked = ah;
        }
        if (ai.get_item_tb()) {
            ah = ai.get_item_tb().checked;
            ai.get_item_tb().checked = j.get_item_tb().checked;
            j.get_item_tb().checked = ah;
        }
    }
    //反填图片
    function setImage(b, a) {
        PDF_close(b);
    }
    //选择带填空
    this.get_item_tb = function() {
        return t;
    };
    //选择带填空

    this.get_item_add = function() {
        return X;
    };
    this.get_item_del = function() {
        return e;
    };
    this.get_item_table = function() {
        return W;
    };
    this.get_item_tr = function() {
        return k;
    };
    this.set_item_num = function(j) {
        R = j;
    };
    this.get_item_num = function() {
        return R;
    };
    this.get_item_title = function() {
        return a;
    };
    this.get_item_value = function() {
        return n;
    };
    this.get_item_novalue = function() {
        return '';
    };
    this.get_item_img = function () {
        return af;
    };
    return true;
}

function setCepingTip(b, a) {
    qtypeLayer.innerHTML = a;
    b.nextObj = 1;
    sb_setmenunav(qtypeLayer, true, b);
    b.onmouseout = function() {
        sb_setmenunav(qtypeLayer, false, b);
    };
}

function setAttrHander(a) {
    a.createAttr = createAttr;
}

function getbyTagName(b, c, e) {
    var d;
    for (var a = 0; a < b.childNodes.length; a++) {
        d = b.childNodes[a];
        if (d.tagName === c) {
            e.push(d);
        }
        if (d.childNodes.length > 0 && d.nodeType == 1) {
            getbyTagName(d, c, e);
        }
    }
}
//页数,序号
function updateTopic(k) {
    var a = 1;
    for (var e = 0; e < questionHolder.length; e++) { //questionHolder = new Array();
        var d = questionHolder[e].dataNode;
        var f = d._type;
        if (f != "page" && f != "cut") {
            if (d._topic - a != 0) {
                if (d._hasjump) {
                    /*if (d._anytimejumpto - 1 > 0) {
                     d._anytimejumpto = parseInt(d._anytimejumpto) + (a - d._topic);
                     if (questionHolder[e].setAnyTimeJumpTo) {
                     questionHolder[e].setAnyTimeJumpTo();
                     }
                     } else {
                     if (d._select) {
                     for (var m = 1; m < d._select.length; m++) {
                     if (d._select[m]._item_jump - 1 > 0) {
                     d._select[m]._item_jump = parseInt(d._select[m]._item_jump) + (a - d._topic);
                     }
                     }
                     }
                     }*/
                } else {
                    if (d._relation) {
                        var j = d._relation.split(",");
                        var h = parseInt(j[0]);
                        var n = curinsert && curinsert.dataNode._topic < h;
                        if (!n) {
                            n = curover && curover.dataNode._topic < h;
                        }
                        if (n) {
                            h = h + (a - d._topic);
                            var c = h + "," + j[1];
                            d._relation = c;
                            var g = questionHolder[e].getRelation();
                            var l = questionHolder[e].RelationIns;
                            if (g) {
                                l.innerHTML = g[0];
                                l.title = g[1];
                            }
                            curinsert = null;
                        }
                    }
                }
            }
            d._topic = a;
            if (questionHolder[e].divTopic) {
                questionHolder[e].divTopic.innerHTML = a;
                if (a - 100 < 0) {
                    questionHolder[e].divTopic.innerHTML = a + ".";
                }
            }
            if (questionHolder[e]._referDivQ) {
                if (questionHolder[e].createTableRadio) {
                    questionHolder[e].createTableRadio();
                } else {
                    if (questionHolder[e].createSum) {
                        questionHolder[e].createSum();
                    }
                }
                if (questionHolder[e].updateReferQ) {
                    questionHolder[e].updateReferQ();
                    questionHolder[e].updateSelCheck();
                }
            }
            a++;
        }
    }
}
