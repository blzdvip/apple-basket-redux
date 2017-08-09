import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppleItem from '../components/AppleItem';
import actions from '../actions/appleActions';
import '../styles/appleBasket.scss';

class AppleBusket extends React.Component {

    /**
     * 计算当前已吃和未吃苹果的状态
     * 
     * @returns 
     * @memberof AppleBasket
     */
    calculateStatus() {
        let status = {
            appleNow: {
                quantity: 0,
                weight: 0
            },
            appleEaten: {
                quantity: 0,
                weight: 0
            }
        };
        this.props.appleBasket.apples.forEach((apple) => {
            let selector = apple.isEaten ? 'appleEaten' : 'appleNow';
            status[selector].quantity ++;
            status[selector].weight += apple.weight;
        });

        return status;
    }

    /**
     * 获取未吃苹果的组件数组
     * 
     * @param {any} apples 
     * @returns 
     * @memberof AppleBasket
     */
    getAppleItem(apples) {
        let data = [];
        apples.forEach((apple) => {
            if (!apple.isEaten) {
                data.push(<AppleItem apple={apple} eatApple={this.props.actions.eatApple} key={apple.id} />)
            }
        });
        
        if (!data.length) {
            data.push(<div className="empty-tip" key="empty">苹果篮子空空如也</div>);
        }

        return data;
    }

    render() {

        let { appleBasket, actions } = this.props;
        let { apples, isPicking } = appleBasket;
        let status = this.calculateStatus();
        let {
            appleNow: {quantity:notEatenQuantity,weight:notEatenWeight},
            appleEaten: {quantity:EatenQuantity,weight:EatenWeight}
        } = status;
        
        return (
            <div className="apple-basket">
                <div className="title">苹果篮子</div>

                <div className="stats">
                    <div className="section">
                        <div className="head">当前</div>
                        <div className="content">{notEatenQuantity}个苹果，{notEatenWeight}克</div>
                    </div>

                     <div className="section">
                        <div className="head">已吃掉</div>
                        <div className="content">{EatenQuantity}个苹果，{EatenWeight}克</div>
                    </div>
                </div>

                <div className="apple-list">
                    {this.getAppleItem(apples)}
                </div>

                <div className="btn-div">
                    <button className={isPicking ? 'disabled' : ''} onClick={actions.pickApple}>摘苹果</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    appleBasket: state.appleBasket
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

/**
 *  [mapStateToProps(state, [ownProps]): stateProps] (Function) 如果定义该参数，组件将会监听 Redux store 的变化。
 * 任何时候，只要 Redux store 发生改变，mapStateToProps 函数就会被调用。该回调函数必须返回一个纯对象，这个对象会与组件的 props 合并。
 * 
 * [mapDispatchToProps(dispatch, [ownProps]): dispatchProps] (Object or Function)
 */
//contect()连接 React 组件与 Redux store。
export default connect(mapStateToProps, mapDispatchToProps)(AppleBusket);