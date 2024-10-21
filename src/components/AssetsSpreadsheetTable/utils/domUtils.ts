export const focusOnElement = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) element.focus();
};
