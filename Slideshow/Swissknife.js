export function removeAllChildren(parent) {
    /*
    Remove all the children of a parent node.
    */
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
};

export function randomInt(from, to) {
    return Math.floor(Math.random() * (Number(to) - Number(from) + 1)) + Number(from);
}

console.log(randomInt("3", "5"));