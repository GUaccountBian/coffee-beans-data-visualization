function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      element.textContent = Math.floor(progress * (end - start) + start);
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    window.requestAnimationFrame(step);
  }
  
  const valueElements = document.querySelectorAll(".value");
  
  valueElements.forEach((valueElement, index) => {
    const targetValue = parseInt(valueElement.textContent, 10);
    animateValue(valueElement, 0, targetValue, 1000);
});