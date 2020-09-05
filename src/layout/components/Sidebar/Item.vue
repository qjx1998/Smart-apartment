<script>
export default {
    name: 'MenuItem',
    functional: true,
    props: {
        icon: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        hasNewMessage: {
            type: Boolean,
            default: false
        }
    },
    render(h, context) {
        const { icon, title, hasNewMessage } = context.props;
        const vnodes = [];

        if (icon) {
            vnodes.push(<svg-icon icon-class={icon}/>);
        }

        if (title) {
            vnodes.push(<span slot='title'>{(title)}</span>);
        }
        // 添加红点提示存在新的申请
        if (hasNewMessage) {
            vnodes.push(<span class='has-new-message'></span>);
        }
        return vnodes;
    }
};
</script>
