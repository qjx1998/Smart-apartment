import visitorApplyService from '../../service/visitor.apply.service';

const state = {
    // 是否存在待审核的访客，默认值为false
    existAuditingVisitor: false
};

const mutations = {
    /**
     * 设置
     */
    setExistAuditingVisitor(state, existAuditingVisitor) {
        state.existAuditingVisitor = existAuditingVisitor;
    }
};

const actions = {
    async getExistAuditingVisitor({ commit }) {
        const existAuditingVisitor = await visitorApplyService.existAuditingState();
        commit('setExistAuditingVisitor', existAuditingVisitor);
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
