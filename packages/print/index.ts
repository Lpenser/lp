
interface IPrintOption {
	printStyle?: string;
	printCSS?: string[];
	popTitle?: string;
}

class Print {
    private options!: IPrintOption | null;
	private printWindow: any = Window;
	private printDoc!: Document;
	private printHTML!: string;
	constructor() { }
	/**
	 * 开始打印
	 * @param printHTML 打印的HTML
	 */
	print(printHTML: string, options?: IPrintOption) {
		this.options = options ?? null;
		this.printHTML = printHTML;
		if (!this.printHTML) {
			return;
		}

		const timeoutId: number = window.setTimeout(() => {
			window.clearTimeout(timeoutId);
			this.createIframe();
			this.write();
			this.startPrint();
		}, 500);
	}

	/**
	 * 写入文档
	 */
	private write(): any {
		this.printDoc.open();
		this.printDoc.write(`${this.docType()}<html lang="en">${this.getHead()}${this.getBody()}</html>`);
		this.printDoc.close();
	}

	/**
	 * 获取DOCTYPE
	 * @returns {string}
	 */
	private docType(): string {
		return '';
	}

	/**
	 * 获取head
	 * @returns {string}
	 */
	private getHead(): string {
		let styles = '',
			links = '';
		// 打印内容的css文件
		if (this.options?.printCSS) {
			this.options?.printCSS.forEach((url: string) => {
				links += `<link media="print" href="${url}" rel="stylesheet">`;
			});
		}
		// 打印内容的style
		if (this.options?.printStyle) {
			styles = `<style>${this.options?.printStyle}</style>`;
		}
		return `<head><title>${this.options?.popTitle || '打印窗口'}</title>${styles}${links}</head>`;
	}


	/**
	 * 获取body
	 * @returns {string}
	 */
	private getBody(): string {
		return `<body><object id="eNgxPrintWB" viewastext style="display: none;" height="0"  classid="clsid:1663ed61-23eb-11d2-b92f-008048fdd814" codebase="../assets/plug-in/smsx.cab#Version=7,7,0,20"></object>${this.printHTML}</body>`;
	}



	/**
	 * 创建iframe
	 */
	private createIframe() {
		const oldFrame: any = document.getElementsByClassName('ngx-print-frame');
		if (oldFrame.length > 0) {
			oldFrame[0].parentNode.removeChild(oldFrame[0]);
		}
		try {
			const printIframe: any = document.createElement('iframe');
			document.body.appendChild(printIframe);
			printIframe.style.position = 'absolute';
			printIframe.style.border = '0';
			printIframe.style.width = '0';
			printIframe.style.height = '0';
			printIframe.style.left = '0';
			printIframe.style.top = '0';
			printIframe.style.zIndex = '-1';
			printIframe.className = 'ngx-print-frame';
			this.printWindow = printIframe.contentWindow;
			this.printDoc = printIframe.contentDocument ? printIframe.contentDocument :
				(printIframe.contentWindow ? printIframe.contentWindow.document : printIframe.document);
		}
		// tslint:disable-next-line:one-line
		catch (e) {
			throw new Error(e + '. iframes may not be supported in this browser.');
		}

		if (!this.printWindow) {
			throw new Error('Cannot find window.');
		}

		if (!this.printDoc) {
			throw new Error('Cannot find document.');
		}
	}

	/**
	 * 开始打印
	 */
	private startPrint() {
		const timeoutId: any = setTimeout(() => {
			this.printWindow.focus();
			this.printWindow.print();
			// if (!!window['ActiveXObject'] || 'ActiveXObject' in window) { // IE浏览器
			// 	if (!this.printWindow['eNgxPrintWB'].object) {
			// 		alert('首次使用打印功能控件安装中，请稍后再试');
			// 		return;
			// 	}
			// 	if (this.isPortrait) {
			// 		this.printWindow['eNgxPrintWB'].printing.portrait = true;
			// 	} else {
			// 		this.printWindow['eNgxPrintWB'].printing.portrait = false;
			// 	}
			// 	this.printWindow['eNgxPrintWB'].printing.header = '';
			// 	this.printWindow['eNgxPrintWB'].printing.footer = '';
			// 	this.printWindow['eNgxPrintWB'].printing.Preview();
			// } else {

			// 	this.printWindow.print();
			// }
			clearTimeout(timeoutId);

		}, 500);
	}
}


export default new Print();