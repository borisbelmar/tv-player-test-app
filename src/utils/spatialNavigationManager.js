const singletonState = {
  currentElement: null,
  elements: []
}

const getClosestElementByDirection = (direction) => {
  const { currentElement, elements } = singletonState;
  const currentElementRect = currentElement.getBoundingClientRect();
  const currentElementCenter = {
    x: currentElementRect.left + currentElementRect.width / 2,
    y: currentElementRect.top + currentElementRect.height / 2,
  };

  const filterFuncs = {
    left: (elementCenter) => elementCenter.x < currentElementCenter.x,
    right: (elementCenter) => elementCenter.x > currentElementCenter.x,
    up: (elementCenter) => elementCenter.y < currentElementCenter.y,
    down: (elementCenter) => elementCenter.y > currentElementCenter.y,
    'up-left': (elementCenter) => elementCenter.x < currentElementCenter.x && elementCenter.y < currentElementCenter.y,
    'up-right': (elementCenter) => elementCenter.x > currentElementCenter.x && elementCenter.y < currentElementCenter.y,
    'down-left': (elementCenter) => elementCenter.x < currentElementCenter.x && elementCenter.y > currentElementCenter.y,
    'down-right': (elementCenter) => elementCenter.x > currentElementCenter.x && elementCenter.y > currentElementCenter.y,
  };

  let closestElement = null;
  let closestDistance = Number.MAX_SAFE_INTEGER;

  // Find closest element in given direction
  for (const element of elements) {
    const elementRect = element.getBoundingClientRect();
    const elementCenter = {
      x: elementRect.left + elementRect.width / 2,
      y: elementRect.top + elementRect.height / 2,
    };

    const filterFunc = filterFuncs[direction];
    if (filterFunc && filterFunc(elementCenter)) {
      const distance = Math.sqrt((elementCenter.x - currentElementCenter.x) ** 2 + (elementCenter.y - currentElementCenter.y) ** 2);

      if (distance < closestDistance) {
        closestElement = element;
        closestDistance = distance;
      }
    }
  }

  // If closest element not found, check other directions
  if (!closestElement) {
    if (direction === 'left') {
      closestElement = getClosestElementByDirection('up-left') || getClosestElementByDirection('down-left');
    } else if (direction === 'right') {
      closestElement = getClosestElementByDirection('up-right') || getClosestElementByDirection('down-right');
    } else if (direction === 'up') {
      closestElement = getClosestElementByDirection('up-left') || getClosestElementByDirection('up-right');
    } else if (direction === 'down') {
      closestElement = getClosestElementByDirection('down-left') || getClosestElementByDirection('down-right');
    }
  }

  return closestElement;
};


document.addEventListener('keydown', (event) => {
  const { key } = event

  const keyToDirection = {
    ArrowLeft: 'left',
    ArrowRight: 'right',
    ArrowUp: 'up',
    ArrowDown: 'down'
  }

  const element = getClosestElementByDirection(keyToDirection[key])

  if (element) {
    singletonState.currentElement = element
    element.focus()
  }
})

export default function spatialNavigationManager () {
  return {
    getFocusedElement: () => singletonState.currentElement,
    setFocus: (element) => {
      singletonState.currentElement = element
      element.focus()
    },
    registerElement (element) {
      singletonState.elements.push(element)
      if (!singletonState.currentElement) {
        singletonState.currentElement = element
        element.focus()
      }
    },
    unregisterElement (element) {
      singletonState.elements = singletonState.elements.filter((el) => el !== element)
      if (singletonState.currentElement === element) {
        singletonState.currentElement = singletonState.elements[0] || null
      }
    }
  }
}
