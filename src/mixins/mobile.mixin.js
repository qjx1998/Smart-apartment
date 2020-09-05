import { NavBar } from 'vant';

export default {
    components: {
        [NavBar.name]: NavBar
    },
    methods: {
        /**
         * 返回上一个页面
         */
        goBack() {
            this.$router.go(-1);
        }
    }
};
