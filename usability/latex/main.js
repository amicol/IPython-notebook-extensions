console.log("--loading LaTeX caption extension--")

var CellToolbar= IPython.CellToolbar;

var flag_name = 'LaTeX Caption';
var latex_caption = CellToolbar.utils.input_ui_generator(flag_name,
 // setter
 function(cell, value){
     // we check that the _draft namespace exist and create it if needed
     if (cell.metadata.listingCaption == undefined){cell.metadata.listingCaption = {}}
        // set the value
        cell.metadata.listingCaption.caption = value
     },
 //getter
 function(cell){ var ns = cell.metadata.listingCaption;
     // if the _draft namespace does not exist return undefined
     // (will be interpreted as false by checkbox) otherwise
     // return the value
     return (ns == undefined)? undefined: ns.caption
     }
 );

flag_name = 'LaTeX Label'
var latex_label = CellToolbar.utils.input_ui_generator(flag_name,
 // setter
 function(cell, value){
     // we check that the listingCaption namespace exist and create it if needed
     if (cell.metadata.listingCaption == undefined){cell.metadata.listingCaption = {}}
        // set the value
        cell.metadata.listingCaption.label = value
     },
 //getter
 function(cell){ var ns = cell.metadata.listingCaption;
     // if the listingCaption namespace does not exist return undefined
     // (will be interpreted as false by checkbox) otherwise
     // return the value
     return (ns == undefined)? undefined: ns.label
     }
 );

CellToolbar.register_callback('latex_caption.inpb', latex_caption);
CellToolbar.register_callback('latex_label.inpb', latex_label);
CellToolbar.register_preset('LaTeX figure options', ['latex_caption.inpb','latex_label.inpb']);

console.log("initialisation LaTeX caption loaded correctly")

