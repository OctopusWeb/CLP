const electron = require('electron');
	$(window).keyup(function(e){
		switch(e.keyCode)
		{
			case 122:
			fullScreen();
			break;
		}
	});
	
	function fullScreen()
	{
		var currentWin = electron.remote.BrowserWindow.getFocusedWindow();
			currentWin.setFullScreen(!currentWin.isFullScreen());
	}
	
	fullScreen();