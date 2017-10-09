import { IComponentController, IComponentOptions } from "angular";
// import CameraService from "./shared/camera.service";
import "./snap-me.component.scss";

class SnapMeController implements IComponentController {

	static $inject = [];
	private _video: any;
	// private picture: any;
	private patOpts: any;
	private channel: any;
	private webcamError: boolean;
	hiddenCanvas: any;
	ctx: any;
	patCanvas: any;
	ctxPat: any;
	picture: any;
	constructor() { }

	$onInit() {
		this.channel = {};
		this.patOpts = { x: 0, y: 0, w: 25, h: 25 };
		this.webcamError = false;
	}

	onError(error) {
		this.webcamError = error;
	}

	onSuccess() {
		this._video = this.channel.video;
		this.patOpts.w = this._video.width;
		this.patOpts.h = this._video.height;
	}

	onStream = function (stream) {
		console.log(stream)
		// You could do something manually with the stream.
	};

	makeSnapshot() {
		if (this._video) {
			this.patCanvas = document.querySelector('#snapshot');
			if (!this.patCanvas) { return };

			this.patCanvas.width = this._video.width;
			this.patCanvas.height = this._video.height;
			this.ctxPat = this.patCanvas.getContext('2d');
			this.picture = this.getVideoData(this.patOpts.x, this.patOpts.y, this.patOpts.w, this.patOpts.h);
			this.ctxPat.putImageData(this.picture, 0, 0);
			console.log(this.patCanvas.toDataURL());

		}

		// this.hiddenCanvas = document.createElement('canvas');
		// this.hiddenCanvas.width = this._video.width;
		// this.hiddenCanvas.height = this._video.height;
		// this.ctx = this.hiddenCanvas.getContext('2d');
		// this.ctx.drawImage(this._video, 0, 0, this._video.width, this._video.height);
		// console.log(this.hiddenCanvas.toDataURL());
	}


	getVideoData(x, y, w, h) {
		this.hiddenCanvas = document.createElement('canvas');
		this.hiddenCanvas.width = this._video.width;
		this.hiddenCanvas.height = this._video.height;
		this.ctx = this.hiddenCanvas.getContext('2d');
		this.ctx.drawImage(this._video, 0, 0, this._video.width, this._video.height);
		console.log(this.hiddenCanvas.toDataURL());
		return this.ctx.getImageData(x, y, w, h);
	};

}

const snapMeComponent: IComponentOptions = {
	controller: SnapMeController,
	template: require("./snap-me.component.html") as string
};

export default snapMeComponent;
