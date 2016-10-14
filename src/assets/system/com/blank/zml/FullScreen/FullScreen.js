const electron = require('electron');
$(window).keyup(function(e){
	switch(e.keyCode)
	{
		case 122:
		var currentWin = electron.remote.BrowserWindow.getFocusedWindow();
		currentWin.setFullScreen(!currentWin.isFullScreen());
		break;
	}
});

