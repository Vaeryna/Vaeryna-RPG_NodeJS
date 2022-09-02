const body2Obj = chunk => {
    let body = {};
    let string = chunk.toString();
    if (!string.trim()) return body;
    string.split('&').forEach(param => {
        let elements = param.split('=');
        body[elements[0]] = elements[1];
    });
    return body;
};
export default body2Obj