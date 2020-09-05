const getters = {
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
    token: state => state.user.token,
    userInfo: state => state.user.userInfo,
    language: state => state.app.language,
    changingPasswordVisible: state => state.user.changingPasswordVisible,
    existAuditingVisitor: state => state.visitor.existAuditingVisitor
};
export default getters;
