//保存されたデータをロードし、変換します。
window.onload = function () {
    var storage = localStorage;
    document.getElementById("inputMorse").innerHTML = storage.getItem('savedInputMorse');
    document.getElementById("inputTon").innerHTML = storage.getItem('savedTon');
    document.getElementById("inputTu").innerHTML = storage.getItem('savedTu');
    document.getElementById("inputSpace").innerHTML = storage.getItem('savedSpace');
    conversion();
}

//ユーザーに入力されたデータをモールスに変換します。
function conversion() {

    //とん、つー、スペースの置き換えを行います。もしユーザーによる入力がない場合は、 ||右のものが使われます。
    let ton = document.getElementById("inputTon").value || "・",
        tu = document.getElementById("inputTu").value || "ー",
        space = document.getElementById("inputSpace").value || "  "

    //*モールス信号では、日本語と英語の信号が被っているものがあります。よって、日本語と英語が使える変換器を自称するからには、辞書を２つ作らないといけません。
    //英語のモールス辞書です。ton, tu, spaceは上記のものに置き換えられます。
    let englishDictionary = {
        "1": ton + tu + tu + tu + tu,
        "2": ton + ton + tu + tu + tu,
        "3": ton + ton + ton + tu + tu,
        "4": ton + ton + ton + ton + tu,
        "5": ton + ton + ton + ton + ton,
        "6": tu + ton + ton + ton + ton,
        "7": tu + tu + ton + ton + ton,
        "8": tu + tu + tu + ton + ton,
        "9": tu + tu + tu + tu + ton,
        "0": tu + tu + tu + tu + tu,
        "a": ton + tu,
        "b": tu + ton + ton + ton,
        "c": tu + ton + tu + ton,
        "d": tu + ton + ton,
        "e": ton,
        "f": ton + ton + tu + ton,
        "g": tu + tu + ton,
        "h": ton + ton + ton + ton,
        "i": ton + ton,
        "j": ton + ton + ton + tu,
        "k": tu + ton + tu,
        "l": ton + tu + ton + ton,
        "m": tu + tu,
        "n": tu + ton,
        "o": tu + tu + tu,
        "p": ton + tu + tu + ton,
        "q": tu + tu + ton + tu,
        "r": ton + tu + ton,
        "s": ton + ton + ton,
        "t": tu,
        "u": ton + ton + tu,
        "v": ton + ton + ton + tu,
        "w": ton + tu + tu,
        "x": tu + ton + ton + tu,
        "y": tu + ton + tu + tu,
        "z": tu + tu + ton + ton,
        ".": ton + tu + ton + tu + ton + tu,
        ",": tu + tu + ton + ton + tu + tu,
        ":": tu + tu + tu + ton + ton + ton,
        "?": ton + ton + tu + tu + ton + ton,
        "'": ton + tu + tu + tu + tu + ton,
        "-": tu + ton + ton + ton + ton + tu,
        "(": tu + ton + tu + tu + ton,
        ")": tu + ton + tu + tu + ton + tu,
        "/": tu + ton + ton + tu + ton,
        "=": tu + ton + ton + ton + tu,
        "+": ton + tu + ton + tu + ton,
        "\"": ton + tu + ton + ton + tu + ton,
        "@": ton + tu + tu + ton + tu + ton
    }

    //日本語のモールス辞書です。ton, tu, spaceは上記のものに置き換えられます。
    let japaneseDictionary = {
        "1": ton + tu + tu + tu + tu,
        "2": ton + ton + tu + tu + tu,
        "3": ton + ton + ton + tu + tu,
        "4": ton + ton + ton + ton + tu,
        "5": ton + ton + ton + ton + ton,
        "6": tu + ton + ton + ton + ton,
        "7": tu + tu + ton + ton + ton,
        "8": tu + tu + tu + ton + ton,
        "9": tu + tu + tu + tu + ton,
        "0": tu + tu + tu + tu + tu,
        "あ": tu + tu + ton + tu + tu,
        "い": ton + tu,
        "う": ton  + ton + tu,
        "え": tu + ton + tu + tu + tu,
        "お": ton + tu + ton + ton + ton,
        "か": ton + tu + ton + ton,
        "き": tu + ton + tu + ton + ton,
        "く": ton + ton + ton + tu,
        "け": tu + ton + tu + tu,
        "こ": tu + tu + tu + tu,
        "さ": tu + ton + tu + ton + tu,
        "し": tu + tu + ton + tu + ton,
        "す": tu + tu + tu + ton + tu,
        "せ": ton + tu + tu + tu + ton,
        "そ": tu + tu + tu + ton,
        "た": tu + ton,
        "ち": ton + ton + tu + ton,
        "つ": ton + tu + tu + ton,
        "て": ton + tu + ton + tu + tu,
        "と": ton + ton + tu + ton + ton,
        "な": ton + tu + ton,
        "に": tu + ton + tu + ton,
        "ぬ": ton + ton + ton + ton,
        "ね": tu + tu + ton + tu,
        "の": ton + ton + tu + tu,
        "は": tu + ton + ton + ton,
        "ひ": tu + tu + ton + ton + tu,
        "ふ": tu + tu + ton + ton,
        "へ": ton,
        "ほ": tu + ton + ton,
        "ま": tu + ton + ton + tu,
        "み": ton + ton + tu + ton + tu,
        "む": tu,
        "め": tu + ton + ton + ton + tu,
        "も": tu + ton + ton + tu + ton,
        "や": ton + tu + tu,
        "ゆ": tu + ton + ton + tu + tu,
        "よ": tu + tu,
        "ら": ton + ton + ton,
        "り": tu + ton + ton + tu + tu,
        "る": tu + ton + tu + tu + ton,
        "れ": tu + tu + tu,
        "ろ": ton + tu + ton + tu,
        "わ": tu + ton + tu,
        "ヰ": ton + tu + ton + ton + tu,
        "を": ton + tu + tu + tu,
        "ヱ": ton + tu + tu + ton + ton,
        "ん": ton + tu + ton + tu + ton,
        "゛": ton + ton,
        "゜": ton + ton + tu + tu + ton,
        "ー": ton + tu + tu + ton + tu,
        "、": ton + tu + ton + tu + ton + tu,
        "（": tu + ton + tu + tu + ton + tu,
        "）": ton + tu + ton + ton + tu + ton
    }

    //toggleLanguageENにチェックが入っているかどうかで、英語の辞書を使うか日本語の辞書を使うか判定します。
    var dictionary = document.getElementById("toggleLanguageEN").checked ? englishDictionary : japaneseDictionary;

    //このタブが閉じられ、そして再度開かれた時に保存されたデータをロードするために、データをセーブします。
    var storage = localStorage;
    storage.setItem('savedTon', document.getElementById("inputTon").value);
    storage.setItem('savedTu', document.getElementById("inputTu").value);
    storage.setItem('savedSpace', document.getElementById("inputSpace").value);
    storage.setItem('savedInputMorse', document.getElementById("inputMorse").value);

    /*
    もしも辞書が英語のものであった場合、inputMorseの中身を全て小文字化し、全ての文字を分割し配列に収めます。
    もしも辞書が日本語のものであった場合、inputMorseの中身をtransJapanese(後述)し、全ての文字を分解し配列に収めます。
    */
    if (dictionary == englishDictionary) inputArray = new String(document.getElementById("inputMorse").value).toLowerCase().split('');
    else inputArray = new String(transJapanese(document.getElementById("inputMorse").value)).split('');

    //分解された文字を1つ1つ確認し、辞書にあった場合は
    var outputArray = new Array();
    for (let i = 0; i < inputArray.length; i++) {
        if (dictionary[inputArray[i]]) outputArray.push(dictionary[inputArray[i]]);
        else outputArray.push(inputArray[i]);
    }


    document.getElementById("outputMorse").innerHTML = outputArray.join(space);
}

function transJapanese(txt) {
    var inputArray = new String(kanaToHira(txt)).split('');
    var outputArray = new Array();

    for (let i = 0; i < inputArray.length; i++) {
        outputArray.push(inputArray[i].normalize('NFD')[0]);
        if (inputArray[i].normalize('NFD')[1]) {
            if (inputArray[i].normalize('NFD')[1].charCodeAt(0) == 12441) outputArray.push('゛');
            else if (inputArray[i].normalize('NFD')[1].charCodeAt(0) == 12442) outputArray.push('゜')
        }
    }
    return outputArray.join('');
}

function kanaToHira(txt) {
    return txt.replace(/[\u30a1-\u30f6]/g, function(match) {
        var rplc = match.charCodeAt(0) - 0x60;
        return String.fromCharCode(rplc);
    });
}