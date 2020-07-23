export interface MyStyle {
    primaryColor: string;
    secondaryColor: string;
    fontColor: string;
}

export interface FileData {
    filename: string;
    filecontent: string;
    contentType: string;
}

export function createDom(container: HTMLDivElement): HTMLButtonElement {
    let btn = document.createElement("button");
    btn.classList.add("downloadButton");
    btn.innerText = "DOWNLOAD";
    container.style.overflow = "hidden";
    container.appendChild(btn);
    return btn 
}

export function updateStyles(button: HTMLButtonElement, style: MyStyle): void {
    button.style.backgroundColor = style.primaryColor
    button.style.borderColor = style.secondaryColor
    button.style.color = style.fontColor
}