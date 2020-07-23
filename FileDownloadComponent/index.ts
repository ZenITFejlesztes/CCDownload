import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { MyStyle, createDom, updateStyles, FileData } from "./createDom";

export class FileDownloadComponent implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private hostContainer: HTMLDivElement;
    private context: ComponentFramework.Context<IInputs>;
    private notifyOutputChanged: () => void;
    private style: MyStyle = {
        primaryColor: "lightgray",
        secondaryColor: "gray",
        fontColor: "black"
    };
    private fontSize: number = 16;
    private topContainer: HTMLDivElement;
    private myButton: HTMLButtonElement;
    private fileData: FileData;

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary,
        container: HTMLDivElement
    ) {
        this.hostContainer = container;
        this.context = context;
        this.notifyOutputChanged = notifyOutputChanged;
        this.topContainer = document.createElement("div");
        this.myButton = createDom(this.topContainer);
        this.myButton.onclick = this.onBtnClick;
        this.topContainer.style.display = "flex";
        this.topContainer.style.flexDirection = "column";
        this.topContainer.style.justifyContent = "space-around";
        this.topContainer.style.alignItems = "stretch";
        
        container.appendChild(this.topContainer);
    }

    public updateView(context: ComponentFramework.Context<IInputs>): void {
        this.context = context;
        this.fontSize = Math.floor( Math.max( this.hostContainer.clientWidth, this.hostContainer.clientHeight ) / 10 );
        this.myButton.style.fontSize = `${this.fontSize}px`;

        this.style = {
            primaryColor: context.parameters.xPrimaryColor.raw || this.style.primaryColor,
            secondaryColor: context.parameters.xSecondaryColor.raw || this.style.secondaryColor,
            fontColor: context.parameters.xFontColor.raw || this.style.fontColor
        }
        updateStyles(this.myButton, this.style);

        this.fileData = {
            filename: context.parameters.xFileName.raw || this.fileData.filename,
            filecontent: context.parameters.xFileContent.raw || this.fileData.filecontent,
            contentType: context.parameters.xContentType.raw || this.fileData.contentType || "application/octet-stream"
        }
    }

    public getOutputs(): IOutputs {
        return {};
    }

    public destroy(): void {}

    private onBtnClick = (): void => {
        if (!this.fileData || !this.fileData.filecontent || !this.fileData.filename) return
        const dataURI = "data:" + this.fileData.contentType + ";base64," + this.fileData.filecontent
        const fileName = this.fileData.filename
        
        let link = document.createElement("a");
        link.download = fileName;
        link.href = dataURI;
        link.style.display = "none";
        this.hostContainer.appendChild(link);
        link.click();
        link.remove();
    }
}
