class TimeUtils {
    /**
     * 获取上个周的周一和周日
     * @returns {{sunday: Date, monday: Date}}
     */
    static getLastWeek() {
        const date = new Date();
        const day = date.getDay();
        const lastMonday = new Date().setDate(date.getDate() - 6 - day);
        const lastSunday = new Date().setDate(date.getDate() - day + 1);
        return {
            beginDate: this.formatDateToParam(new Date(lastMonday)),
            endDate: this.formatDateToParam(new Date(lastSunday))
        };
    }

    /**
     * 获取这个周的周一和today
     * @returns {{sunday: Date, monday: Date}}
     */
    static getThisWeek() {
        const date = new Date();
        const day = date.getDay();
        const diff = date.getDate() - day + (day === 0 ? -6 : 1);
        let thisMonday = new Date().setDate(diff);
        thisMonday = new Date(thisMonday);
        // 获取本周0点时间
        const year = thisMonday.getFullYear();
        const month = thisMonday.getMonth();
        const thisDate = thisMonday.getDate();
        thisMonday = new Date(year, month, thisDate);
        return {
            beginDate: this.formatDateToParam(thisMonday),
            endDate: this.formatDateToParam(date, 'yyyy-mm-ddThh:mm:ss')
        };
    }

    /**
     * 获取这个月的第一天和today
     * @returns {{firstDay: Date, lastDay: Date}}
     */
    static getThisMonth() {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        return {
            beginDate: this.formatDateToParam(firstDay),
            endDate: this.formatDateToParam(date, 'yyyy-mm-ddThh:mm:ss')
        };
    }

    /**
     * 获取上一个小时和当前时间节点
     * @returns {{lastHour: Date, now: Date}}
     */
    static getLastHour() {
        const date = new Date();
        const lastHour = new Date(date.getTime() - 1000 * 60 * 60);
        return {
            beginDate: this.formatDateToParam(lastHour, 'yyyy-mm-ddThh:mm:ss'),
            endDate: this.formatDateToParam(date, 'yyyy-mm-ddThh:mm:ss')
        };
    }

    /**
     * 获取今天0点和现在
     * @returns {{today: Date, now: Date}}
     */
    static getToday() {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        const today = new Date(year, month, day);
        return {
            beginDate: this.formatDateToParam(today, 'yyyy-mm-ddThh:mm:ss'),
            endDate: this.formatDateToParam(date, 'yyyy-mm-ddThh:mm:ss')
        };
    }

    /**
     * 格式化时间为请求格参数格式
     */
    static formatDateToParam(date, type) {
        const year = date.getFullYear();
        let month = date.getMonth() + 1;
        (month / 10) < 1 && (month = `0${month}`);
        let day = date.getDate();
        (day / 10) < 1 && (day = `0${day}`);
        // 若传入的时间格式为yyyy-mm-ddThh:mm:ss
        if (type === 'yyyy-mm-ddThh:mm:ss') {
            const hour = date.getHours();
            const hh = (hour / 10) < 1 ? `0${hour}` : hour;
            const minute = date.getMinutes();
            const mm = (minute / 10) < 1 ? `0${minute}` : minute;
            const second = date.getSeconds();
            const ss = (second / 10) < 1 ? `0${second}` : second;
            return `${year}-${month}-${day}T${hh}:${mm}:${ss}`;
        }
        return `${year}-${month}-${day}T00:00:00`;
    }

    /**
     * 获取当前时间
     */
    static getNow() {
        return this.formatDateToParam(new Date(), 'yyyy-mm-ddThh:mm:ss');
    }
}

export default TimeUtils;

export class DateUtils {
    /**
     * 获取昨天日期
     */
    static getLastDayDate() {
        const now = new Date();
        const nowTime = now.getTime();
        const lastDayTime = nowTime - 24 * 60 * 60 * 1000;
        const lastDay = new Date();
        lastDay.setTime(lastDayTime);
        return TimeUtils.formatDateToParam(lastDay);
    }
}

