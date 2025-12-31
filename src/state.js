class GlobalState {
    constructor(){
        this.state = {
            physicsChapter: {
                "1st-year": 10,
                "2nd-year": 10,
            },
            mathsChapter: {
                "1st-year": 9,
                "2nd-year": 10,
            },
            subject: null,
            grade: null,
            topic: null,
            chapter: null,
            currentData: null,
        }

        this.listeners = [];
    };

    getState(){
        return { ...this.state }
    }

    setState(newState){
        this.state = { ...this.state, ...newState};
        this.notify();
    }

    subscribe(callback){
        this.listeners.push(callback);
    }

    unsubscribe(callback){
        this.listeners = this.listeners.filter(listener => listener !== callback);
    }

    notify(){
        this.listeners.forEach(callback => callback(this.state));
    }
}

// Create and export a single instance (singleton pattern)
const globalState = new GlobalState();
export default globalState;