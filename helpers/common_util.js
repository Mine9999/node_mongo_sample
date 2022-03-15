/** 現在月を返却する */
module.exports.nowMonth = () => {
    'use strict'
    let date = new Date;
    let output = "";

    output += (date.getMonth() + 1);
    return output;
}

/** Dateオブジェクトをyyyymmdd形式のStringにする */
module.exports.yyyymmdd = (_date) => {
    'use strict'
    let date = (!_date) ? new Date() : new Date(_date);

    let output = "";
    output += date.getFullYear();
    output += String(date.getMonth() + 1).length > 1 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);
    output += String(date.getDate()).length > 1 ? date.getDate() : "0" + date.getDate();

    return output;
}

/** 指定日数前の年月日をyyyymmddの形式で返却する */
module.exports.dateBefore = (_date, _before) => {
    'use strict'
    let date = (!_date) ? new Date() : new Date(_date);
    date.setDate(date.getDate() - _before);

    let output = "";
    output += date.getFullYear();
    output += String(date.getMonth() + 1).length > 1 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);
    output += String(date.getDate()).length > 1 ? date.getDate() : "0" + date.getDate();

    return output;

}

/** yyyymmdd形式をその日の23時59分59秒の形にする */
module.exports.toDateEnd = (_chkdate) => {
    let _year = _chkdate.slice(0, 4);
    let _month = _chkdate.slice(4, 6);
    let _date = _chkdate.slice(6);

    return _year + "-" + _month + "-" + _date + "T23:59:59";
}

/**
 * 指定ヶ月分の年月リストを作成する（yyyymmのList形式）
 * @param {String} _date 当日以外を開始日にする場合に指定する
 * @param {Number} how_months 何ヶ月分のリストを作るか数値で指定
 */
module.exports.createMonthList = (_date, how_months) => {
    'use strict'
    let date = (!_date) ? new Date() : new Date(_date);

    let output = new Array();
    for (let i = 0; i < how_months; i++){
        let tmp_yyyymm = "";
        tmp_yyyymm += date.getFullYear();
        tmp_yyyymm += String(date.getMonth() + 1).length > 1 ? String(date.getMonth() + 1) : "0" + String(date.getMonth() + 1);
       
        output.push(tmp_yyyymm);
        date.setDate(1);
        date.setMonth(date.getMonth() + 1);
    }

    return output;

}