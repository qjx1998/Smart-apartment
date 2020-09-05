/**
 * 函数节流
 * @param fn
 */
const throttle = function(fn) {
    // 函数上次执行时间
    let lastTime = null;
    // 函数执行之间的间隔时间
    const gapTime = 2000;

    return function() {
        const nowTime = new Date();
        if (!lastTime || nowTime.getTime() - lastTime.getTime() > gapTime) {
            fn.call(this);
            lastTime = nowTime;
        }
    };
};

export default throttle;
