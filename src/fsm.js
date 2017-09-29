class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (config == undefined) throw new Error;

        this.initial = config.initial;
        this.activeState = config.initial;
        this.states = config.states;
        this.history = [];
        this.future = [];
        }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.activeState;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        let flag = 1;
        for (let key in this.states) {
            if (key == state) {
                this.history.push(this.activeState);
                this.activeState = state;
                flag = 0;
            }
        }
        this.future = [];
        if (flag) throw new Error;
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        let flag = 1;
        for (let key in this.states[this.activeState].transitions) {
            if (key == event) {
                flag = 0;
                this.history.push(this.activeState);
                this.activeState = this.states[this.activeState].transitions[event];
            }
        }
        this.future = [];
        if (flag) throw new Error;
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.activeState = this.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let arr = [];
        for (let key in this.states) {
            if (event == undefined) arr.push(key);
            else {
                for (let newkey in this.states[key].transitions) {
                    if (newkey == event) arr.push(key);
                }
            }
        }
        return arr;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.history.length == 0) return false;
        this.future.push(this.activeState);
        this.activeState = this.history[this.history.length - 1];
        this.history.pop();
        return true;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.future.length == 0) return false;
        this.history.push(this.activeState);
        this.activeState = this.future[this.future.length - 1];
        this.future.pop();
        return true;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.history = [];
        this.future = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/