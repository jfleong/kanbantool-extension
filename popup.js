/* Update the relevant fields with the new data */
function setDOMInfo(info) {
    column_checkboxes = '';
    workflow_options = info.workflow_options;
    swimlane_options = info.swimlane_options;
    container = document.getElementById('columns');
    for (var name in workflow_options) {
       var id = workflow_options[name]; 
       var checkbox = document.createElement('input');
       checkbox.type = "checkbox";
       checkbox.name = id;
       checkbox.value = id;
       checkbox.id = id;

       var label = document.createElement('label')
       label.htmlFor = id;
       label.appendChild(document.createTextNode(name));
       container.appendChild(checkbox);
       container.appendChild(label);
       container.appendChild(document.createElement('br'));
    }
    // //your processing here
    container = document.getElementById('rows');
    for (var name in swimlane_options) {
       var id = swimlane_options[name]; 
       var checkbox = document.createElement('input');
       checkbox.type = "checkbox";
       checkbox.name = id;
       checkbox.value = id;
       checkbox.id = id;

       var label = document.createElement('label')
       label.htmlFor = id;
       label.appendChild(document.createTextNode(name));
       container.appendChild(checkbox);
       container.appendChild(label);
       container.appendChild(document.createElement('br'));
    }
    // document.getElementById('columns').textContent = 'something htmlitcaly correct';
    // start constructing the checkboxes for columns
}

/* Once the DOM is ready... */
window.addEventListener("DOMContentLoaded", function() {
    /* ...query for the active tab... */
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        /* ...and send a request for the DOM info... */
        chrome.tabs.sendMessage(
                tabs[0].id,
                { from: "popup", subject: "DOMInfo" },
                /* ...also specifying a callback to be called 
                 *    from the receiving end (content script) */
                setDOMInfo);
    });
});
