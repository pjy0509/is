export const $style = (() => {
    const style = document.createElement("style");
    document.head.appendChild(style);

    return style.sheet!;
})();