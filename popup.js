document.addEventListener('DOMContentLoaded', function () {
  const toggleCheckbox = document.getElementById('chrome_extension_switch');

  toggleCheckbox.addEventListener('change', function () {
    const pluginStatus = toggleCheckbox.checked ? 'ON' : 'OFF';
    chrome.storage.sync.set({ pluginStatus }, function() {
      chrome.runtime.sendMessage({ action: 'pluginStatusChanged', status: pluginStatus });
    });
  });
});
