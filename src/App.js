import React from "react";
import store from "./store";
import "./App.css";

class App extends React.Component {
    state = {
        value: "",
    };
    componentDidMount() {
        store.subscribe(() => {
            this.forceUpdate();
        });
    }
    handleConfirm = () => {
        const { value } = this.state;
        if (value) {
            const { dispatch } = store;
            dispatch({ type: "ADD_TODO", payload: { text: value } });
            dispatch({ type: "ADD", payload: 1 })
            this.setState({
                value: "",
            });
        }
    };
    handleChange = (e) => {
        this.setState({
            value: e.target.value,
        });
    };
    render() {
        const { value } = this.state;
        const { getState } = store;
        const { todoList, count } = getState();
        return (
            <div className="App">
                <input value={value} onChange={this.handleChange} />
                <button onClick={this.handleConfirm}>确定</button>
                {(todoList || []).map((todoItem, index) => {
                    const { text } = todoItem || {};
                    return <div key={index}>内容： {text}</div>;
                })}
                <div>countList: {count}</div>
            </div>
        );
    }
}

export default App;
