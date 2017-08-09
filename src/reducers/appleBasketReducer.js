import { fromJS } from 'immutable';

const initialState = {
    isPicking: false,
    newAppleId: 3,
    apples: [
        {
            id: 0,
            weight: 233,
            isEaten: false
        },
        {
            id: 1,
            weight: 235,
            isEaten: true
        },
        {
            id: 2,
            weight: 256,
            isEaten: false
        }
    ]
};

export default (state = initialState, action) => {

    switch (action.type) {
        case 'apple/BEGIN_PICK_APPLE':
            //return fromJS(state).set('isPicking', ture).toJS();
            return Object.assign({}, state, {isPicking: true});
        case 'apple/DONE_PICK_APPLE':
            let newApple = {
                id: state.newAppleId,
                weight: action.payload,
                isEaten: false
            }
            //在apples中新增一个newApple， 将newAppleId增加1， 将isPicking设为false
            // return fromJS(state).update('apples', list => list.push(newApple))
            //                     .set('newAppleId', state.newAppleId +1)
            //                     .set('isPicking', false)
            //                     .toJS();

            return Object.assign({}, state, {
                apples: [
                    ...state.apples,
                    newApple
                ],
                newAppleId: state.newAppleId +1,
                isPicking: false
            });
        case 'apple/FAIL_PICK_APPLE':
            //return fromJS(state).set('isPicking', false).toJS();
            return Object.assign({}, state, {isPicking: true});
        case 'apple/EAT_APPLE':
            // 将id对应的索引值的数组的isEaten设为true， 表示已吃
            //return fromJS(state).setIn(['apples', action.payload, 'isEaten'], true).toJS();
            return Object.assign({}, state, {
                apples: [
                    ...state.apples.slice(0,action.payload),
                    Object.assign({}, state.apples[action.payload], {
                        isEaten: true
                    }),
                    ...state.apples.slice(action.payload + 1)
                ]
            })
        default:
            return state;
    }
};