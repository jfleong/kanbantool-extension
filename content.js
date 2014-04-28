/* Inform the backgrund page that 
 * this tab should have a page-action */
chrome.runtime.sendMessage({
    from: "content",
    subject: "showPageAction"
});

///////////////////////////////////////////////////////////////////////////
// This method currently will get the workflow options out of order because
// of the way that the kanban board can be constructed
//
// it gets all the leafs in order which will be a problem if you have nested
// workflow options
///////////////////////////////////////////////////////////////////////////
/* Listen for message from the popup */
chrome.runtime.onMessage.addListener(function(msg, sender, response) {
    /* First, validate the message's structure */
    if (msg.from && (msg.from === "popup")
            && msg.subject && (msg.subject === "DOMInfo")) {
        var workflow_options = {};
        var leaves = document.getElementsByClassName('leaf');
        for (i = 0; i < leaves.length; i += 1 ) {
            leaf = leaves[i];
            id_string = leaf.getAttribute('id');
            workflow_id = id_string.substring(0, id_string.length - 3); 
            columnName = leaf.getElementsByClassName('hide_when_collapsed')[0].firstElementChild.innerHTML;
            // remove the extra div at the end
            columnName = columnName.replace(/<div(.*?)<\/div>/gi, '');
            // remove the hyphen and spaces in the front
            columnName = columnName.replace(/-/gi,'').trim();
            workflow_options[columnName] = workflow_id;
            alert(columnName + ' - ' + workflow_id);
        }
        var swimlane_options = {};
        var swimlanes = document.getElementsByClassName('swimlane_header');
        for (i = 0; i < swimlanes.length; i += 1 ) {
            swimlane = swimlanes[i];
            id_string = swimlane.getAttribute('id');
            swimlane_id = id_string.substring(0, id_string.length - 3); 
            swimlane_name = swimlane.firstElementChild.getAttribute('title');
            swimlane_options[swimlane_name] = swimlane_id;
        }
        data = {
            "workflow_options" : workflow_options,
            "swimlane_options" : swimlane_options
        };
        response(data);
    }
});


///////////////////////////////////////////////////////////////////////////
// This is another attempt using not leafs but more traversing
///////////////////////////////////////////////////////////////////////////

// /* Listen for message from the popup */
// chrome.runtime.onMessage.addListener(function(msg, sender, response) {
//     /* First, validate the message's structure */
//     if (msg.from && (msg.from === "popup") && msg.subject && (msg.subject === "DOMInfo")) {
//         data = {};
//         var workflow_options = {};
//         var boardHeading = document.getElementById('board_heading');
//         headingRows = boardHeading.getElementsByTagName('tr');
//         for (i = 1; i < headingRows.length; i++) {
//             tr = headingRows[i];
//             columns = tr.getElementsByTagName('th');
//             for (j = 0; j < columns.length; j++) {
//                 th = columns[j];
//                 if (th.classList.contains('board_handler_cell')) {
//                     // these are filler cells
//                     continue; 
//                 }
//                 isLeaf = th.classList.contains('leaf');
//                 if (!isLeaf) {
//                     // i wanna go down

//                 }
//                 else {
//                     id_string = th.getAttribute('id');
//                     workflow_id = id_string.substring(0, id_string.length - 3); 
//                     columnName = th.getElementsByClassName('hide_when_collapsed')[0].firstElementChild.innerText;
//                     console.log(columnName);
//                     workflow_options[columnName] = workflow_id;
//                 }
//             }
//         }
//         var swimlane_options = {};
//         var swimlanes = document.getElementsByClassName('swimlane_header');
//         for (i = 0; i < swimlanes.length; i += 1 ) {
//             swimlane = swimlanes[i];
//             id_string = swimlane.getAttribute('id');
//             swimlane_id = id_string.substring(0, id_string.length - 3); 
//             swimlane_name = swimlane.firstElementChild.getAttribute('title');
//             swimlane_options[swimlane_name] = swimlane_id;
//         }
//         data = {
//             "workflow_options" : workflow_options,
//             "swimlane_options" : swimlane_options
//         };
//         response(data);
//     }
// });

