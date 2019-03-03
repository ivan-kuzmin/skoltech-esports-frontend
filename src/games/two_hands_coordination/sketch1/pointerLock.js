export default function pointerLock(p) {
  // определяем, поддерживается ли pointerLock
  const havePointerLock = 'pointerLockElement' in document ||
  		                    'mozPointerLockElement' in document ||
  	                   	  'webkitPointerLockElement' in document;

  // Элемент, для которого будем включать pointerLock
  const requestedElement = document.getElementById('canvas-container');

  // Танцы с префиксами для методов включения/выключения pointerLock
  requestedElement.requestPointerLock = requestedElement.requestPointerLock || requestedElement.mozRequestPointerLock || requestedElement.webkitRequestPointerLock;
  document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock || document.webkitExitPointerLock;

  const isLocked = function(){
  	return requestedElement === document.pointerLockElement || requestedElement === document.mozPointerLockElement || requestedElement === document.webkitPointerLockElement;
  }

  requestedElement.addEventListener('click', function(){
  	if(!isLocked()){
  		requestedElement.requestPointerLock();
      p.pointerLockActive = true                      // ----------------------------- has p
  	} else {
  		document.exitPointerLock();
      p.pointerLockActive = false                     // ----------------------------- has p
  	}
  }, false);

  const changeCallback = function() {
  	if(!havePointerLock){
  		alert('Ваш браузер не поддерживает pointer-lock');
  		return;
  	}
  	if (isLocked()) {
  		document.addEventListener("mousemove", moveCallback, false);
  		document.body.classList.add('locked');
  	} else {
  		document.removeEventListener("mousemove", moveCallback, false);
  		document.body.classList.remove('locked');
  	}
  }

  document.addEventListener('pointerlockchange', changeCallback, false);
  document.addEventListener('mozpointerlockchange', changeCallback, false);
  document.addEventListener('webkitpointerlockchange', changeCallback, false);

  const moveCallback = function(e) {
  	const x = e.movementX || e.mozMovementX || e.webkitMovementX || 0;
  	const y = e.movementY || e.mozMovementY || e.webkitMovementY || 0;
    p.moveCallback(x, y)                              // ----------------------------- has p
  }
}
