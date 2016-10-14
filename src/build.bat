set releaseDir=bin-release

set indexFile=release.html

rmdir %releaseDir% /s/q
md %releaseDir%

copy %indexFile% %releaseDir%\
ren %releaseDir%\%indexFile% index.html

xcopy assets %releaseDir%\assets\ /y/s

java -jar compiler.jar ^
--js %releaseDir%\assets\system\com\blank\zml\ZML.js ^
--js %releaseDir%\assets\system\com\blank\zml\core\UserSelectControl.js ^
--js %releaseDir%\assets\system\com\blank\zml\components\Loading.js ^
--js %releaseDir%\assets\system\com\blank\zml\core\Preloader.js ^
--js %releaseDir%\assets\system\com\blank\zml\core\CoreURL.js ^
--js %releaseDir%\assets\system\com\blank\zml\core\CoreEvent.js ^
--js %releaseDir%\assets\system\com\blank\zml\core\Compatible.js ^
--js %releaseDir%\assets\system\com\blank\zml\events\Event.js ^
--js %releaseDir%\assets\system\com\blank\zml\events\CanvasEvent.js ^
--js %releaseDir%\assets\system\com\blank\zml\events\MovieClipEvent.js ^
--js %releaseDir%\assets\system\com\blank\zml\events\NavigationEvent.js ^
--js %releaseDir%\assets\system\com\blank\zml\events\Events.js ^
--js %releaseDir%\assets\system\com\blank\zml\events\VideoEvent.js ^
--js %releaseDir%\assets\system\com\blank\zml\events\BroadcastCenter.js ^
--js %releaseDir%\assets\system\com\blank\zml\core\AssetsManager.js ^
--js %releaseDir%\assets\system\com\blank\zml\core\ButtonEffectMap.js ^
--js %releaseDir%\assets\system\com\blank\zml\components\ImageAsset.js ^
--js %releaseDir%\assets\system\com\blank\zml\components\BasicCanvas.js ^
--js %releaseDir%\assets\system\com\blank\zml\components\RootContainer.js ^
--js %releaseDir%\assets\system\com\blank\zml\components\BasicMovieClip.js ^
--js %releaseDir%\assets\system\com\blank\zml\components\Application.js ^
--js %releaseDir%\assets\system\com\blank\zml\components\BasicComponent.js ^
--js %releaseDir%\assets\system\com\blank\zml\components\HtmlCanvas.js ^
--js %releaseDir%\assets\system\com\blank\zml\components\ImageCanvas.js ^
--js %releaseDir%\assets\system\com\blank\zml\components\Button.js ^
--js %releaseDir%\assets\system\com\blank\zml\components\ImageButton.js ^
--js %releaseDir%\assets\system\com\blank\zml\components\Label.js ^
--js %releaseDir%\assets\system\com\blank\zml\components\VideoCanvas.js ^
--js %releaseDir%\assets\system\com\blank\zml\core\navigationManagers\transition\None.js ^
--js %releaseDir%\assets\system\com\blank\zml\core\navigationManagers\transition\TransitionMap.js ^
--js %releaseDir%\assets\system\com\blank\zml\core\navigationManagers\NavigationManagerBase.js ^
--js %releaseDir%\assets\system\com\blank\zml\core\navigationManagers\DefaultNavigationManager.js ^
--js %releaseDir%\assets\system\com\blank\zml\core\navigationManagers\BasicNavigationManager.js ^
--js %releaseDir%\assets\system\com\blank\zml\core\NavigationManagerMap.js ^
--js %releaseDir%\assets\system\com\blank\zml\core\NavigationController.js ^
--js %releaseDir%\assets\system\com\blank\zml\core\FactoryMap.js ^
--js_output_file %releaseDir%\assets\system\zml.1.0.min.js

set tmpPlugin=%releaseDir%\assets\system\plugins-\
xcopy %releaseDir%\assets\system\plugins %tmpPlugin% /y/s

java -jar compiler.jar ^
--js %releaseDir%\assets\system\plugins\Alert.js ^
--js_output_file %tmpPlugin%Alert.js

java -jar compiler.jar ^
--js %releaseDir%\assets\system\plugins\Alpha.js ^
--js_output_file %tmpPlugin%Alpha.js

java -jar compiler.jar ^
--js %releaseDir%\assets\system\plugins\Eval.js ^
--js_output_file %tmpPlugin%Eval.js

java -jar compiler.jar ^
--js %releaseDir%\assets\system\plugins\Transform.js ^
--js_output_file %tmpPlugin%Transform.js

java -jar compiler.jar ^
--js %releaseDir%\assets\system\plugins\Tween.js ^
--js_output_file %tmpPlugin%Tween.js

java -jar compiler.jar ^
--js %releaseDir%\assets\system\plugins\buttonEffects\Alpha.js ^
--js_output_file %tmpPlugin%buttonEffects\Alpha.js

java -jar compiler.jar ^
--js %releaseDir%\assets\system\plugins\transitions\Alpha.js ^
--js_output_file %tmpPlugin%transitions\Alpha.js

java -jar compiler.jar ^
--js %releaseDir%\assets\system\plugins\transitions\Fly.js ^
--js_output_file %tmpPlugin%transitions\Fly.js

java -jar compiler.jar ^
--js %releaseDir%\assets\system\plugins\transitions\MoveIn.js ^
--js_output_file %tmpPlugin%transitions\MoveIn.js

java -jar compiler.jar ^
--js %releaseDir%\assets\system\plugins\transitions\Random.js ^
--js_output_file %tmpPlugin%transitions\Random.js

java -jar compiler.jar ^
--js %releaseDir%\assets\system\plugins\transitions\Reverse.js ^
--js_output_file %tmpPlugin%transitions\Reverse.js

java -jar compiler.jar ^
--js %releaseDir%\assets\system\plugins\ECharts.js ^
--js_output_file %tmpPlugin%ECharts.js

rmdir %releaseDir%\assets\system\plugins /s/q
ren %tmpPlugin% plugins
rmdir %releaseDir%\assets\system\com /s/q