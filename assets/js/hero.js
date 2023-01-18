// Check if the hero heading is meant to be animated
document.querySelectorAll('.usa-hero__heading--alt').forEach(heroHeading => {
  // Return the common prefix of two strings
  function findCommonPrefix(str1, str2) {
    const strings = [str1, str2];
    strings.sort((a, b) => a.length - b.length);
    let lastCommonIndex = 0;
    for (let i = 0; i < strings[0].length; i++) {
      if (strings[0][i] === strings[1][i]) {
        lastCommonIndex = i;
      } else {
        break;
      }
    }
    return (strings[0].slice(0, lastCommonIndex));
  }

  // Execute animation from one string to another
  function animateString(targetElement, fromStr, toStr) {
    return new Promise((resolve, reject) => {
      targetElement.textContent = fromStr;
      let index = fromStr.length;

      let interval = setInterval(() => {
        if (targetElement.textContent === toStr) {
          clearInterval(interval);
          return resolve();
        }

        if (fromStr.length > toStr.length) {
          targetElement.textContent = fromStr.slice(0, index);
          index--;
        }

        if (fromStr.length < toStr.length) {
          targetElement.textContent = toStr.slice(0, index + 1);
          index++;
        }

      }, 150);
    });
  }

  // If there's a data-original-heading attribute on the heading, animate it
  const original = heroHeading.dataset.originalHeading;
  if (original) {
    const final = heroHeading.textContent;
    const common = findCommonPrefix(original, final);

    animateString(heroHeading, common, original).then(() => {
      animateString(heroHeading, original, common).then(() => {
        animateString(heroHeading, common, final);
      });
    });
  }
});
