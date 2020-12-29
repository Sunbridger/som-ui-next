const fs = require('fs');
const chalk = require('chalk');

const log = console.log;

function title(str) {
    return str.split('-').map(item => item.replace(/^\S/, s => s.toUpperCase())).join('');
}

/**
 * 判断文件是否存在
 * @param {String} path 路径
 * @param {String} type 类型 [dir|file]
 */
function checkStat(path, type = 'dir') {
    try {
        const stat = fs.statSync(path);
        return type === 'dir' ?
            stat.isDirectory() :
            stat.isFile();
    } catch (e) {
        return false;
    }
}

/**
 * 如果文件夹不存在则创建
 * @param {String} path 路径
 */
function mkDir(path) {
    const res = checkStat(path, 'dir');
    if (!res) {
        fs.mkdirSync(path);
    }
}

/**
 * 保存json文件
 * @param {String} path 路径
 * @param {Object} data 数据
 */
function setJsonFile(path, data) {
    const dataJson = JSON.stringify(data, null, 4);
    fs.writeFileSync(path, dataJson);
}

function success(msg, tag = 'Success') {
    log(`${chalk.bgGreen.black(tag)} ${chalk.green.bold(msg)}`);
}

function warn(msg, tag = 'Warn') {
    log(`${chalk.bgYellow.black(tag)} ${chalk.yellow.bold(msg)}`);
}

function error(msg, tag = 'Error') {
    log(`${chalk.bgRed.black(tag)} ${chalk.red.bold(msg)}`);
}

module.exports = {
    title,
    checkStat,
    mkDir,
    setJsonFile,
    success,
    warn,
    error
};
