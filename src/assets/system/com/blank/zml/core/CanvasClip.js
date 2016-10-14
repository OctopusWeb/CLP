ZML.CanvasClip = (function () {
    var CanvasClip = function (canvas, sourceImages) 
    {
        this.canvas = canvas;
        this.sourceImages = sourceImages;
        this.currentFrame = 0;
        this.totalFrame = sourceImages.length;

        this.setSourceImages = function(images)
		{
			this.sourceImages = images;
			this.totalFrame = sourceImages.length;
		}

        this.gotoAndStop = function (frame) {
            this.clear();
			var img = this.sourceImages[frame];
			var context = this.canvas.getContext("2d");
			var sx = 0;
			var sy = 0;
			var sw = 1230;
			var sh = 690;
			var ts = this.canvas.width/sw < this.canvas.height/sh ? this.canvas.width/sw : this.canvas.height/sh;
			var tw = sw*ts;
			var th = sh*ts;
			var tx = (this.canvas.width-tw)*0.5;
			var ty = (this.canvas.height-th)*0.5;
			context.drawImage(img,sx,sy,sw,sh,tx,ty,tw,th);
			this.currentFrame = frame;
        }

        this.clear = function () {
            this.canvas.width = this.canvas.width;
        }


        this.gotoAndStop(this.currentFrame);
    }
    return CanvasClip;
})();
