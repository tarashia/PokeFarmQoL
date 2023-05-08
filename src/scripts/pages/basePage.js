class Page {
    static init() {}

    // sets up a basic mutation observer with the given options for the specified element
    // when the mutation is observed, calls the provided callback with the detected mutation
    addObserver(watchElement, observeOptions, callback) {
        let observer = new MutationObserver(function (mutations) {
            callback(mutations);
        });
        observer.observe(watchElement, observeOptions);
    }
}