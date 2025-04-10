export function $string(x: Node): string {
    const stack = [];

    while (x.parentNode != null) {
        let sibCount = 0;
        let sibIndex = 0;

        for (let i = 0; i < x.parentNode.childNodes.length; i++) {
            const sib = x.parentNode.childNodes[i];

            if (sib.nodeName === x.nodeName) {
                if (sib === x) {
                    sibIndex = sibCount;
                }

                sibCount++;
            }
        }

        const nodeName = x.nodeName.toLowerCase();

        if (x instanceof Element) {
            if (x.hasAttribute("id") && x.id !== "") {
                stack.unshift(nodeName + "#" + x.id);
            } else if (sibCount > 1) {
                stack.unshift(nodeName + ":nth-of-type(" + (sibIndex + 1) + ")");
            } else {
                stack.unshift(nodeName);
            }
        } else {
            return "";
        }

        x = x.parentNode;
    }

    return stack.join(">");
}