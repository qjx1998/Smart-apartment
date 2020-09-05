import { userAuthService } from '../service/auth.service';
import store from '../store/index';

export default function setToken() {
    const userToken = userAuthService.get();

    if (userToken) {
        store.commit('user/setToken', userToken);
    }
}
