const style = document.createElement('style');
style.innerHTML = `
  [data-click-to-react-component] {
    border: 2px solid #000;
  }
`
document.head.appendChild(style);

const mouseoverHandler = (e) => {
  const target = e.target;
  target.dataset.clickToReactComponent = 1;
  // 用js取不到fiber节点属性
  const reactFiberKey = Object.keys(target).find(key => key.startsWith('__react'));
};
const mouseoutHandler = (e) => {
  const target = e.target;
  delete target.dataset.clickToReactComponent;
};

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === 'toggleContentScript') {
    if (message.isActive) {
      document.addEventListener('mouseover', mouseoverHandler);
      document.addEventListener('mouseout', mouseoutHandler);
    } else {
      document.removeEventListener('mouseover', mouseoverHandler);
      document.removeEventListener('mouseout', mouseoutHandler);
    }
  }
});
