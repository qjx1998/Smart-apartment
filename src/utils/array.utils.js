
const ArraysUtils = {
    /**
     * 判断数组是否为空
     *
     * @param array
     * @returns {boolean}
     */
    isNotEmpty(array) {
        if (array === null || array === undefined) {
            return false;
        }

        if (!Array.isArray(array)) {
            return false;
        }

        return array.length !== 0;
    },
    /**
     * 判断数组是否为空
     *
     * @param array
     * @returns {boolean}
     */
    isEmpty(array) {
        return !this.isNotEmpty(array);
    },
    /**
     * 使用原数组生成一个row行col列的二维数组
     * @param sourceArray
     * @param row
     * @param col
     * @returns {Array}
     */
    setArray(sourceArray, row, col) {
        const temArr = [];
        for (let i = 0; i < row; i++) {
            if (!temArr[i]) {
                temArr[i] = [];
            }
            for (let j = 0; j < col; j++) {
                sourceArray[i * col + j]
                    ? (temArr[i][j] = sourceArray[i * col + j])
                    : (temArr[i][j] = {});
            }
        }
        return temArr;
    },
    /**
     * 通过一个数字构建出从1到这个数的数组
     * @param number
     */
    formNumberLengthArr(number) {
        const arr = [];
        for (let i = 1; i <= number; i++) {
            arr.push(i);
        }
        return arr;
    }

};

export default ArraysUtils;
