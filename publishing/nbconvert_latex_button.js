//----------------------------------------------------------------------------
//  Copyright (C) 2012  The IPython Development Team
//
//  Distributed under the terms of the BSD License.  The full license is in
//  the file COPYING, distributed as part of this software.
//----------------------------------------------------------------------------

// convert current notebook to html by calling "ipython nbconvert"
"using strict";
   
doNbconvert = function(){
    var kernel = IPython.notebook.kernel;
    var name = IPython.notebook.notebook_name;
    var path = IPython.notebook.notebook_path;
    var command = 'ip=get_ipython();import subprocess; subprocess.call("ipython nbconvert --to pdf --template latex_nocode ' + name + '",shell=True)';
    function callback(out_type, out_data){
      console.log('out:', out_data);
      //var url = '//'+location.host+'/~notebook/' + name + '.pdf'
      //win = window.open(url,name);
      var url = '/files/' + path.split('.ipynb')[0] + '.pdf';
      var win=window.open(url, '_blank');
      win.focus();} 
    //kernel.execute(command, {"output": callback},{silent:false});
    kernel.execute(command, { shell: { reply : callback } ,silent:false});
};

IPython.toolbar.add_buttons_group([
    {
        id : 'doNbconvert',
        label : 'Convert current notebook to PDF',
        icon : 'fa-print',
        callback : doNbconvert
    }   
]);

