


export default  [
   
      {
        path:  "/home",
        name:  "/home",
        label:"首页",
      
        url: "/home",
        key: "/home",
        icon:'HomeOutlined',
        
      },
      {
        path:  "/user",
        name:  "/user",
        label:'用户数据',
      
        url: "/user",
        key: "/user",
        icon:  'UserOutlined',
        
      },
      {
        path:  "/show",
        name:  "/show",
        label:'数据显示',
        icon: 'BarChartOutlined',
        url: "/show",
        key: "/show",
        children:[
            {
                path:  "/show/table",
                name:  "/show/table",
                label:'表格',
              
                url: "/show/table",
                key: "/show/table",
               
                
              },
              {
                path:  "/show/collapse",
                name:  "/show/collapse",
                label:'折叠面板',
              
                url: "/show/collapse",
                key: "/show/collapse",
               
                
              },
        ]
       
        
      },
     
      {
        path:  "/form",
        name:  "/form",
        label:'表单',
        icon: 'FormOutlined',
        url: "/form",
        key: "/form",
        children:[
            {
                path:  "/form/basic",
                name:  "/form/basic",
                label:'基础表单',
              
                url: "/form/basic",
                key: "/form/basic",
               
                
              },
              {
                path:  "/form/step",
                name:  "/form/step",
                label:'步骤表单',
              
                url: "/form/step",
                key: "/form/step",
               
                
              },
        ]
       
        
      },
    
      {
        path:  "/nav",
        name:  "/nav",
        label:'导航',
        icon:  'FormOutlined',
        url: "/nav",
        key: "/nav",
        children:[
            {
                path:  "/nav/step",
                name:  "/nav/step",
                label:'步骤条',
              
                url: "/nav/step",
                key: "/nav/step",
               
                
              }
        ]
       
        
      },

     
]