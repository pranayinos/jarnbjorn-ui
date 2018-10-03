import { all, takeEvery, put, fork } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { getToken, clearToken } from '../../helpers/utility';
import actions from './actions';

const fakeApiCall = true; // auth0 or express JWT

export function* loginRequest() {
  yield takeEvery('LOGIN_REQUEST', function*() {
    if (fakeApiCall) {
      yield put({
        type: actions.LOGIN_SUCCESS,
        authToken: '9084ebce-3990-4550-957d-734827a4bcd1'
        // profile: 'Profile'
      });
    } else {
      yield put({ type: actions.LOGIN_ERROR });
    }
  });
}

export function* loginSuccess() {
  yield takeEvery(actions.LOGIN_SUCCESS, function*(payload) {
    yield localStorage.setItem('auth_token', payload.access_token);
    yield localStorage.setItem('refresh_token', payload.refresh_token);
  });
}

export function* loginError() {
  yield takeEvery(actions.LOGIN_ERROR, function*() {});
}

export function* logout() {
  yield takeEvery(actions.LOGOUT, function*() {
    clearToken();
    yield put(push('/'));
  });
}
export function* checkAuthorization() {
  yield takeEvery(actions.CHECK_AUTHORIZATION, function*() {
    const token = getToken().get('access_token');
    if (token) {
      yield put({
        type: actions.LOGIN_SUCCESS,
        token
        // profile: 'Profile'
      });
    }
  });
}
export default function* rootSaga() {
  yield all([
    fork(checkAuthorization),
    fork(loginRequest),
    fork(loginSuccess),
    fork(loginError),
    fork(logout)
  ]);
}
