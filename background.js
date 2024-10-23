chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === 'pluginStatusChanged') {
    const isActive = message.status === 'ON';
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'toggleContentScript', isActive });
    });
  }
});
