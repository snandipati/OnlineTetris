var
	tetris = {
		blockSize:       25,
		blockBorderSize: 3,
		mainWinWidth:    11,
		mainWinHeight:   20,
		levelUpScore:    100,//150

		level:   1,
		score:   0,
		singles: 0,
		doubles: 0,
		triples: 0,
		quads:   0,
		
		blocks:       [],
		stack:         [],
		stackAnimLine: [],
		stackAnimDrop: [],
		gameStart:    true,
		gameOver:     false,
		paused:       false,
		keyPressed:   false,
		shapeCount:   0,
		
	

		keyDrop:   32, // Space bar
		keyLeft:   37, // Left key
		keyRotate: 38, // Up key
		keyRight:  39, // Right key
		keyDown:   40, // Down key
		keyPause:  19, // Pause key
		keyStop:   27, // Esc key
		
		

		init: function()
		{
			tetris.mainWin = document.getElementById('tetris-main');
			tetris.nextWin = document.getElementById('tetris-next-inner');
			tetris.message = document.getElementById('tetris-message');			
			tetris.message.innerHTML = '<p>Welcome to Tetris game!!</p><br>';			
			var startButton = document.getElementById('Sbutton');
			startButton.onclick = tetris.keyListener;
			var pauseButton = document.getElementById('Pbutton');
			pauseButton.onclick = tetris.pauseGame;
			var endButton = document.getElementById('Ebutton');
			endButton.onclick = tetris.doGameOver;
			document.onkeydown = tetris.keyListener;
			document.getElementsByName('Name')[0].value = "";
			document.getElementsByName('Score')[0].value = 0;
			
		},

		newGame: function()
		{
			for ( var hor = 0; hor < tetris.mainWinWidth; hor ++ )
			{
				if ( !tetris.stack[hor] ) tetris.stack[hor] = [];

				tetris.stackAnimLine[hor] = [];
				tetris.stackAnimDrop[hor] = [];

				for ( var ver = 0; ver < tetris.mainWinHeight; ver ++ )
				{
					if ( tetris.stack[hor][ver] )
					{
						tetris.mainWin.removeChild(tetris.stack[hor][ver]);
					}

					tetris.stack[hor][ver] = false;

					tetris.stackAnimLine[hor][ver] = false;
					tetris.stackAnimDrop[hor][ver] = false;
				}
			}

			tetris.level   = 1;
			tetris.score   = 0;
			tetris.singles = 0;
			tetris.doubles = 0;
			tetris.triples = 0;
			tetris.quads   = 0;


			tetris.updateScore();

			tetris.newShape();
			
		
		},

		newShape: function()
		{
			tetris.shapeCount ++;

			tetris.shapeNum     = typeof(tetris.shapeNumNext) != 'undefined' ? tetris.shapeNumNext : Math.floor(Math.random() * 6);
			tetris.shapeNumNext = Math.floor(Math.random() * 7);
			tetris.shapeRot     = typeof(tetris.shapeRotNext) != 'undefined' ? tetris.shapeRotNext : Math.floor(Math.random() * 4);
			tetris.shapeRotNext = Math.floor(Math.random() * 4);
			tetris.shapePosHor  = Math.floor(Math.random() * ( tetris.mainWinWidth - 6 )) + 3;
			tetris.shapePosVer  = -1;

			tetris.drawShape();

			tetris.drawNext();

			tetris.shapeLanded = false;

			clearInterval(tetris.intval);

			tetris.intval = setInterval('tetris.timeStep()', 2000 / tetris.level);
		},

		newBrick: function(color, colorLight, colorDark)
		{
			var
				brick = document.createElement('div')
				;

			brick.setAttribute('style', 'background: ' + color + '; border-color: ' + colorLight + ' ' + colorDark + ' ' + colorDark + ' ' + colorLight + '; border-width: ' + tetris.blockBorderSize + 'px; border-style: solid; height: ' + ( tetris.blockSize - tetris.blockBorderSize * 2 ) + 'px; left: 0; top: 0; width: ' + ( tetris.blockSize - tetris.blockBorderSize * 2 ) + 'px; position: absolute;');

			return brick;
		},

		drawShape: function()
		{
			var
				brickCount = 0,
				move       = true;

			tetris.brickPos = [];

			for ( var ver = 0; ver < 4; ver ++ )
			{
				for ( var hor = 0; hor < 4; hor ++ )
				{
					if ( tetris.brickLib[tetris.shapeNum][ver * 4 + hor + tetris.shapeRot * 16] )
					{
						tetris.brickPos[brickCount] = {
							hor: hor + tetris.shapePosHor,
							ver: ver + tetris.shapePosVer
							}

						if ( tetris.collision(tetris.brickPos[brickCount].hor, tetris.brickPos[brickCount].ver) ) move = false;

						brickCount ++;
					}
				}
			}

			if ( move && !tetris.paused && !tetris.gameOver )
			{
				var prevBricks = tetris.blocks ? tetris.blocks.slice(0) : false;

				for ( var i = 0; i < brickCount; i ++ )
				{
					tetris.blocks[i] = tetris.newBrick(
						tetris.brickLib[tetris.shapeNum][64], tetris.brickLib[tetris.shapeNum][65], tetris.brickLib[tetris.shapeNum][66]
						);

					tetris.blocks[i].num = tetris.shapeCount;

					tetris.blocks[i].style.left = tetris.brickPos[i].hor * tetris.blockSize + 'px';
					tetris.blocks[i].style.top  = tetris.brickPos[i].ver * tetris.blockSize + 'px';
				}

				for ( var i = 0; i < brickCount; i ++ ) // Using seperate for-loops to reduce flickering
				{
					// Draw brick in new position
					tetris.mainWin.appendChild(tetris.blocks[i]);
				}

				for ( var i = 0; i < brickCount; i ++ )
				{
					// Remove brick in prev position
					if ( prevBricks[i] && prevBricks[i].num == tetris.shapeCount )
					{
						tetris.mainWin.removeChild(prevBricks[i]);
					}
				}

				tetris.prevShapeRot    = tetris.shapeRot;
				tetris.prevShapePosHor = tetris.shapePosHor;
				tetris.prevShapePosVer = tetris.shapePosVer;
				tetris.prevBrickPos    = tetris.brickPos.slice(0);
			}
			else
			{
				// Collision detected, keep shape in previous position
				tetris.shapeRot    = tetris.prevShapeRot;
				tetris.shapePosHor = tetris.prevShapePosHor;
				tetris.shapePosVer = tetris.prevShapePosVer;
				tetris.brickPos    = tetris.prevBrickPos.slice(0);
			}
		},
		
		
		

		drawNext: function()
		{
			tetris.nextWin.innerHTML = '';

			for ( var ver = 0; ver < 4; ver ++ )
			{
				for ( var hor = 0; hor < 4; hor ++ )
				{
					if ( tetris.brickLib[tetris.shapeNumNext][ver * 4 + hor + tetris.shapeRotNext * 16] )
					{
						brick = tetris.newBrick(
							tetris.brickLib[tetris.shapeNumNext][64], tetris.brickLib[tetris.shapeNumNext][65], tetris.brickLib[tetris.shapeNumNext][66]
							);

						brick.style.left = hor * tetris.blockSize + 'px';
						brick.style.top  = ver * tetris.blockSize + 'px';

						tetris.nextWin.appendChild(brick);
					}
				}
			}
		},

		collision: function(hor, ver)
		{
			// Left wall
			if ( hor < 0 )
			{
				if ( tetris.keyPressed == tetris.keyRotate )
				{
					// No room to rotate, try moving right
					if ( !tetris.collision(hor + 1, ver) )
					{
						tetris.shapePosHor ++;

						tetris.drawShape();

						return true;
					}
					else
					{
						tetris.shapeRot --;

						return true;
					}
				}

				return true;
			}

			// Right wall
			if ( hor >= tetris.mainWinWidth )
			{
				if ( tetris.keyPressed == tetris.keyRotate )
				{
					// No room to rotate, try moving left
					if ( !tetris.collision(hor - 1, ver) )
					{
						tetris.shapePosHor --;

						tetris.drawShape();

						return true;
					}
					else
					{
						tetris.shapeRot --;

						return true;
					}
				}

				return true;
			}

			// Floor
			if ( ver >= tetris.mainWinHeight )
			{
				if ( tetris.keyPressed != tetris.keyRotate ) tetris.shapePosVer --;

				tetris.shapeLanded = true;

				return true;
			}

			// Pile
			if ( tetris.stack[hor][ver] )
			{
				if ( tetris.shapePosVer > tetris.prevShapePosVer ) tetris.shapeLanded = true;

				return true;
			}

			return false;
		},

		timeStep: function()
		{
			tetris.shapePosVer ++;

			tetris.drawShape();

			if ( tetris.shapeLanded )
			{
				for ( var i in tetris.blocks )
				{
					tetris.stack[tetris.brickPos[i].hor][tetris.brickPos[i].ver] = tetris.blocks[i];
				}

				// Check for completed lines
				var lines = 0;

				for ( var ver = 0; ver < tetris.mainWinHeight; ver ++ )
				{
					var line = true;

					for ( var hor = 0; hor < tetris.mainWinWidth; hor ++ )
					{
						if ( !tetris.stack[hor][ver] ) line = false;
					}

					if ( line )
					{
						lines ++;

						// Remove line
						for ( var hor = 0; hor < tetris.mainWinWidth; hor ++ )
						{
							if ( tetris.stack[hor][ver] )
							{
								tetris.stackAnimLine[hor][ver] = tetris.stack[hor][ver];

								setTimeout('tetris.mainWin.removeChild(tetris.stackAnimLine[' + hor + '][' + ver + ']);', hor * 50);

								tetris.stack[hor][ver] = false;
							}
							
						}

						// Drop lines
						for ( var hor = 0; hor < tetris.mainWinWidth; hor ++ )
						{
							for ( var ver2 = ver; ver2 > 0; ver2 -- ) // From bottom to top
							{
								if ( tetris.stack[hor][ver2] )
								{
									tetris.stackAnimDrop[hor][ver2] = tetris.stack[hor][ver2];

									setTimeout('tetris.stackAnimDrop[' + hor + '][' + ver2 + '].style.top = ( ' + ver2 + ' + 1 ) * tetris.blockSize + \'px\';', tetris.mainWinWidth * 50);

									tetris.stack[hor][ver2 + 1] = tetris.stack[hor][ver2];
									tetris.stack[hor][ver2]     = false;
								}
								
							}
							
						}
					}
				}
				
				media.play( 'drop' );//added
				tetris.updateScore(lines);
				

				// Check for game over
				for ( var hor = 0; hor < tetris.mainWinWidth; hor ++ )
				{
					if ( tetris.stack[hor][0] )
					{
						tetris.doGameOver();

						return;
					}
				}

				tetris.newShape();
			}
		},

		updateScore: function(lines)
		{
			var oldScore = tetris.score;
			media.play( 'line' );//added

			if ( lines )
			{
				tetris.score += lines * lines + lines * 10;
			}
			document.getElementsByName('Score')[0].value = tetris.score?(tetris.score-1):0;
			for ( i = oldScore; i < tetris.score; i ++ )
			{
				setTimeout('document.getElementById(\'tetris-score\').innerHTML = \'' + i + '\';', ( i - oldScore ) * 20);				
			}

			tetris.level = Math.floor(tetris.score / tetris.levelUpScore) + 1;

			document.getElementById('tetris-level').innerHTML = tetris.level;

			if ( lines == 1 )
			{
				tetris.singles ++;

				document.getElementById('tetris-singles').innerHTML = tetris.singles;
			}

			if ( lines == 2 )
			{
				tetris.flashMessage('<p class="tetris-double">Double!</p>');

				tetris.doubles ++;

				document.getElementById('tetris-doubles').innerHTML = tetris.doubles;
			}

			if ( lines == 3 )
			{
				tetris.flashMessage('<p class="tetris-double">Triple!</p>');

				tetris.triples ++;

				document.getElementById('tetris-triples').innerHTML = tetris.triples;
			}

			if ( lines == 4 )
			{
				tetris.flashMessage('<p class="tetris-double">Tetris!</p>');

				tetris.quads ++;

				document.getElementById('tetris-quads').innerHTML = tetris.quads;
			}
		},

		flashMessage: function(message)
		{
			tetris.message.innerHTML = message;

			setTimeout('tetris.message.innerHTML = \'\';', 1000);
		},

		startGame: function(message)
		{
			tetris.gameStart = true;
			tetris.keyListener();
			//tetris.newGame();
		},

		pauseGame: function(message)
		{
			tetris.paused = true;

			tetris.message.innerHTML = '<p>Paused <span>Press Esc to resume</span></p>';
		},
		
		doGameOver: function()
		{
			clearInterval(tetris.intval);
			tetris.message.innerHTML = '<p>Game over</p>';
			media.stop( 'music' );//added
			media.play( 'gameover' );//added
			tetris.gameOver = true;
			var name = prompt("Enter your name", "");
			if (name) {
			    document.getElementsByName('Name')[0].value = name;
			} else {
			    document.getElementsByName('Name')[0].value = "Noname";
			}
			//Retrieve the form from HTML document
			form = document.getElementsByName('score-form')[0];
			form.submit();
		},

		keyListener: function(e)
		{
			if( !e ) // IE
			{
				e = window.event;
			}

			tetris.keyPressed = e.keyCode;

			if ( tetris.gameStart )
			{
				tetris.gameStart = false;

				tetris.message.innerHTML = '';

				tetris.newGame();
			}
			else
			{
				if ( tetris.gameOver && e.keyCode == tetris.keyDrop )
				{
					tetris.gameOver = false;

					tetris.message.innerHTML = '';

					tetris.newGame();
					document.getElementsByName('Name')[0].value = "";
				}
				else if ( !tetris.gameOver )
				{
					if ( e.keyCode == tetris.keyStop || e.keyCode == tetris.keyPause )
					{
						tetris.paused = !tetris.paused;

						if ( tetris.paused )
						{
							tetris.message.innerHTML = '<p>Paused<span>Press Esc to resume</span</p>';
						}
						else
						{
							tetris.message.innerHTML = '';
						}

						return false;
					}

					if ( !tetris.paused )
					{
						if ( e.keyCode == tetris.keyDrop )
						{
							clearInterval(tetris.intval);

							tetris.intval = setInterval('tetris.timeStep()', 20);

							return false;
						}

						if ( e.keyCode == tetris.keyLeft )
						{
							tetris.shapePosHor --;

							tetris.drawShape();

							return false;
						}

						if ( e.keyCode == tetris.keyRotate )
						{
							tetris.shapeRot = ( tetris.shapeRot + 1 ) % 4;

							tetris.drawShape();

							return false;
						}

						if( e.keyCode == tetris.keyRight )
						{
							tetris.shapePosHor ++;

							tetris.drawShape();

							return false;
						}

						if ( e.keyCode == tetris.keyDown )
						{
							tetris.shapePosVer ++;

							tetris.drawShape();

							return false;
						}
					}
				}
			}

			return true;
		},

		brickLib: {
			0: [
				1, 0, 0, 0,
				1, 0, 0, 0,
				1, 1, 0, 0,
				0, 0, 0, 0,

				1, 1, 1, 0,
				1, 0, 0, 0,
				0, 0, 0, 0,
				0, 0, 0, 0,

				0, 1, 1, 0,
				0, 0, 1, 0,
				0, 0, 1, 0,
				0, 0, 0, 0,

				0, 0, 0, 0,
				0, 0, 1, 0,
				1, 1, 1, 0,
				0, 0, 0, 0,
				
				'#F90', '#FC0', '#F60'
				],
			1: [
				0, 1, 0, 0,
				0, 1, 0, 0,
				0, 1, 0, 0,
				0, 1, 0, 0,

				0, 0, 0, 0,
				1, 1, 1, 1,
				0, 0, 0, 0,
				0, 0, 0, 0,

				0, 1, 0, 0,
				0, 1, 0, 0,
				0, 1, 0, 0,
				0, 1, 0, 0,

				0, 0, 0, 0,
				1, 1, 1, 1,
				0, 0, 0, 0,
				0, 0, 0, 0,
				
				'#C00', '#E00', '#B00'
				],

			2: [
				1, 1, 0, 0,
				1, 0, 0, 0,
				1, 0, 0, 0,
				0, 0, 0, 0,

				1, 1, 1, 0,
				0, 0, 1, 0,
				0, 0, 0, 0,
				0, 0, 0, 0,

				0, 0, 1, 0,
				0, 0, 1, 0,
				0, 1, 1, 0,
				0, 0, 0, 0,

				0, 0, 0, 0,
				1, 0, 0, 0,
				1, 1, 1, 0,
				0, 0, 0, 0,

				'#0C0', '#0E0', '#0A0'
				],

			3: [
				1, 0, 0, 0,
				1, 1, 0, 0,
				1, 0, 0, 0,
				0, 0, 0, 0,

				1, 1, 1, 0,
				0, 1, 0, 0,
				0, 0, 0, 0,
				0, 0, 0, 0,

				0, 0, 1, 0,
				0, 1, 1, 0,
				0, 0, 1, 0,
				0, 0, 0, 0,

				0, 0, 0, 0,
				0, 1, 0, 0,
				1, 1, 1, 0,
				0, 0, 0, 0,

				'#00C', '#00E', '#00A'
				],

			4: [
				1, 1, 0, 0,
				1, 1, 0, 0,
				0, 0, 0, 0,
				0, 0, 0, 0,

				1, 1, 0, 0,
				1, 1, 0, 0,
				0, 0, 0, 0,
				0, 0, 0, 0,

				1, 1, 0, 0,
				1, 1, 0, 0,
				0, 0, 0, 0,
				0, 0, 0, 0,

				1, 1, 0, 0,
				1, 1, 0, 0,
				0, 0, 0, 0,
				0, 0, 0, 0,

				'#60C', '#80E', '#40A'
				],

			5: [
				0, 1, 1, 0,
				1, 1, 0, 0,
				0, 0, 0, 0,
				0, 0, 0, 0,

				1, 0, 0, 0,
				1, 1, 0, 0,
				0, 1, 0, 0,
				0, 0, 0, 0,

				0, 1, 1, 0,
				1, 1, 0, 0,
				0, 0, 0, 0,
				0, 0, 0, 0,

				1, 0, 0, 0,
				1, 1, 0, 0,
				0, 1, 0, 0,
				0, 0, 0, 0,

				'#CCC', '#EEE', '#AAA'
				],

			6: [
				1, 1, 0, 0,
				0, 1, 1, 0,
				0, 0, 0, 0,
				0, 0, 0, 0,

				0, 1, 0, 0,
				1, 1, 0, 0,
				1, 0, 0, 0,
				0, 0, 0, 0,

				1, 1, 0, 0,
				0, 1, 1, 0,
				0, 0, 0, 0,
				0, 0, 0, 0,

				0, 1, 0, 0,
				1, 1, 0, 0,
				1, 0, 0, 0,
				0, 0, 0, 0,

				'#CC0', '#EE0', '#AA0'
				]
		}
	}

window.onload = tetris.init;
